import { ref, computed, watch, type Ref, type ComputedRef, getCurrentInstance } from 'vue'

/**
 * Navigation item interface for menu structures
 */
export interface NavigationItem {
  /** Unique identifier for the navigation item */
  key: string
  /** Display title for the navigation item */
  title: string
  /** Optional icon identifier */
  icon?: string
  /** Whether the item is disabled */
  disabled?: boolean
  /** Optional href for direct links */
  href?: string
  /** Child navigation items for nested menus */
  children?: NavigationItem[]
  /** Additional metadata */
  meta?: Record<string, any>
}

/**
 * Options for useNavigation composable
 */
export interface UseNavigationOptions {
  /** Custom route name resolver */
  routeResolver?: (key: string) => string
  /** Custom key matcher for route names */
  keyMatcher?: (key: string, routeName: string) => boolean
  /** Whether to sync with route automatically */
  autoSync?: boolean
  /** Whether to handle nested navigation */
  nested?: boolean
}

/**
 * Return type for useNavigation composable
 */
export interface UseNavigationReturn {
  /** Navigation items */
  items: Ref<NavigationItem[]>
  /** Currently active item key */
  activeKey: Ref<string>
  /** Currently active navigation item */
  currentItem: ComputedRef<NavigationItem | undefined>
  /** Navigate to a specific item */
  navigate: (key: string) => void
  /** Check if an item is active */
  isActive: (key: string) => boolean
  /** Set active item without navigation */
  setActive: (key: string) => void
  /** Find item by key */
  findItem: (key: string) => NavigationItem | undefined
  /** Get breadcrumb trail to current item */
  breadcrumbs: ComputedRef<NavigationItem[]>
}

/**
 * Composable for managing navigation state and behavior
 * Provides a clean API for navigation menus with Vue Router integration
 * 
 * @example
 * ```vue
 * const nav = useNavigation([
 *   { key: 'home', title: 'Home' },
 *   { key: 'about', title: 'About' }
 * ])
 * ```
 */
export function useNavigation(
  items: NavigationItem[],
  options: UseNavigationOptions = {}
): UseNavigationReturn {
  const {
    routeResolver = defaultRouteResolver,
    keyMatcher = defaultKeyMatcher,
    autoSync = true,
    nested = false
  } = options

  // Get router instance from Vue app if available
  const instance = getCurrentInstance()
  const router = instance?.appContext.app.config.globalProperties.$router
  const route = instance?.appContext.app.config.globalProperties.$route
  
  const navigationItems = ref<NavigationItem[]>(items)
  const activeKey = ref<string>('')

  /**
   * Find an item by key, including nested items
   */
  const findItem = (key: string, searchItems: NavigationItem[] = navigationItems.value): NavigationItem | undefined => {
    for (const item of searchItems) {
      if (item.key === key) {
        return item
      }
      if (nested && item.children) {
        const found = findItem(key, item.children)
        if (found) return found
      }
    }
    return undefined
  }

  /**
   * Find item that matches current route
   */
  const findMatchingItem = (routeName: string, searchItems: NavigationItem[] = navigationItems.value): NavigationItem | undefined => {
    for (const item of searchItems) {
      if (keyMatcher(item.key, routeName)) {
        return item
      }
      if (nested && item.children) {
        const found = findMatchingItem(routeName, item.children)
        if (found) return found
      }
    }
    return undefined
  }

  /**
   * Get the currently active navigation item
   */
  const currentItem = computed(() => findItem(activeKey.value))

  /**
   * Check if a specific key is active
   */
  const isActive = (key: string): boolean => {
    if (activeKey.value === key) return true
    
    // For nested navigation, check if any parent is active
    if (nested) {
      const breadcrumbKeys = breadcrumbs.value.map(item => item.key)
      return breadcrumbKeys.includes(key)
    }
    
    return false
  }

  /**
   * Set active item without navigation
   */
  const setActive = (key: string) => {
    const item = findItem(key)
    if (item && !item.disabled) {
      activeKey.value = key
    }
  }

  /**
   * Navigate to a specific item
   */
  const navigate = (key: string) => {
    const item = findItem(key)
    if (!item || item.disabled) return

    activeKey.value = key

    // Use href if provided, otherwise use router if available
    if (item.href) {
      if (item.href.startsWith('http')) {
        window.open(item.href, '_blank')
      } else {
        window.location.href = item.href
      }
    } else if (router) {
      const routeName = routeResolver(key)
      router.push({ name: routeName }).catch(() => {
        // Fallback to path-based navigation if name doesn't exist
        router.push({ path: `/${key.replace(/^\//, '')}` })
      })
    } else {
      // Fallback to hash navigation if no router
      window.location.hash = `#/${key.replace(/^\//, '')}`
    }
  }

  /**
   * Build breadcrumb trail to current item
   */
  const breadcrumbs = computed((): NavigationItem[] => {
    if (!nested || !activeKey.value) return []
    
    const trail: NavigationItem[] = []
    
    const buildTrail = (items: NavigationItem[], target: string): boolean => {
      for (const item of items) {
        if (item.key === target) {
          trail.push(item)
          return true
        }
        if (item.children) {
          if (buildTrail(item.children, target)) {
            trail.unshift(item)
            return true
          }
        }
      }
      return false
    }
    
    buildTrail(navigationItems.value, activeKey.value)
    return trail
  })

  // Auto-sync with route if router is available
  if (autoSync && route) {
    watch(
      () => route.name,
      (name) => {
        if (!name) return
        const routeName = String(name)
        const item = findMatchingItem(routeName)
        if (item) {
          activeKey.value = item.key
        }
      },
      { immediate: true }
    )
  }

  return {
    items: navigationItems,
    activeKey,
    currentItem,
    navigate,
    isActive,
    setActive,
    findItem,
    breadcrumbs
  }
}

/**
 * Default route resolver - converts key to route name
 */
function defaultRouteResolver(key: string): string {
  // Remove special characters and convert to route name format
  return key.replace(/[^a-zA-Z0-9]/g, '')
}

/**
 * Default key matcher - matches key with route name
 */
function defaultKeyMatcher(key: string, routeName: string): boolean {
  // Direct match
  if (key === routeName) return true
  
  // Try without prefix (e.g., 'komponent' prefix)
  const keyWithoutPrefix = key.replace(/^[a-z]+/, '')
  const routeWithoutPrefix = routeName.replace(/^[a-z]+/, '')
  if (keyWithoutPrefix === routeWithoutPrefix) return true
  
  // Try normalized comparison
  const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '')
  const normalizedRoute = routeName.toLowerCase().replace(/[^a-z0-9]/g, '')
  return normalizedKey === normalizedRoute
}

/**
 * Utility to set all items to inactive
 */
export function resetActiveState(items: NavigationItem[]): NavigationItem[] {
  return items.map(item => ({
    ...item,
    children: item.children ? resetActiveState(item.children) : undefined
  }))
}

/**
 * Utility to find and activate a specific item
 */
export function setActiveItem(items: NavigationItem[], targetKey: string): NavigationItem[] {
  return items.map(item => ({
    ...item,
    children: item.children ? setActiveItem(item.children, targetKey) : undefined
  }))
}