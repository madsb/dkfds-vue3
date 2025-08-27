<template>
  <!-- Navigation card (link wrapper) -->
  <component
    :is="getLinkComponent()"
    v-if="to"
    v-bind="getLinkProps()"
    :class="['card', { long: variant === 'long' }]"
  >
    <div v-if="$slots.image" class="card-image">
      <slot name="image" />
    </div>

    <div class="card-content">
      <span v-if="subheader" class="card-subheading">
        {{ subheader }}
      </span>

      <slot name="header">
        <component :is="headerTag" v-if="header" class="card-heading">
          {{ header }}
        </component>
      </slot>

      <slot name="content" />

      <slot />
    </div>

    <!-- Navigation icon -->
    <fds-ikon v-if="getIcon" :icon="getIcon" class="card-icon" :decorative="true" />
  </component>

  <!-- Regular card (section wrapper) -->
  <section v-else :class="['card', { long: variant === 'long' }]">
    <div v-if="$slots.image" class="card-image">
      <slot name="image" />
    </div>

    <div class="card-content">
      <span v-if="subheader" class="card-subheading">
        {{ subheader }}
      </span>

      <slot name="header">
        <component :is="headerTag" v-if="header" class="card-heading">
          {{ header }}
        </component>
      </slot>

      <slot name="content" />

      <slot />

      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import type { Component } from 'vue'
import FdsIkon from '../layout/fds-ikon.vue'

export interface FdsCardProps {
  /** 
   * Main heading text for the card
   * Displayed prominently in the card header area
   */
  header?: string
  /** 
   * HTML heading tag level for semantic structure
   * Choose appropriate level based on document hierarchy
   * @values 'h2', 'h3', 'h4', 'h5', 'h6'
   * @default 'h2'
   */
  headerTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** 
   * Secondary text displayed above the main header
   * Useful for categories, dates, or supplementary information
   */
  subheader?: string
  /** 
   * Navigation destination for clickable cards
   * Supports string URLs for external links or Vue Router location objects
   * When provided, the entire card becomes a clickable link
   */
  to?: string | Record<string, any>
  /** 
   * Force external link behavior even when Vue Router is available
   * Useful for absolute URLs that should not use client-side routing
   * @default false
   */
  external?: boolean
  /** 
   * Icon displayed for navigation cards
   * Defaults to 'arrow-forward' for internal links, 'open-in-new' for external
   * Set to empty string or null to hide icon
   */
  icon?: string
  /** 
   * Visual variant affecting card layout and styling
   * Long variant provides extended layout for detailed content
   * @values 'long'
   */
  variant?: 'long'
}

/**
 * Card component implementing DKFDS v11 card specifications.
 * 
 * Versatile content container supporting both static content display and navigation functionality.
 * Features intelligent link handling for Vue Router integration, automatic external link detection,
 * and flexible content organization with image, header, content, and action slots.
 * 
 * @component
 * @example Basic content card
 * ```vue
 * <FdsCard 
 *   header="Card Title" 
 *   subheader="Category"
 * >
 *   <p>This is the main content of the card.</p>
 *   <template #actions>
 *     <FdsButton>Action Button</FdsButton>
 *   </template>
 * </FdsCard>
 * ```
 * 
 * @example Navigation card with Vue Router
 * ```vue
 * <FdsCard 
 *   header="Article Title"
 *   subheader="News"
 *   :to="{ name: 'article', params: { id: 123 } }"
 *   icon="arrow-forward"
 * >
 *   <template #image>
 *     <img src="/article-image.jpg" alt="Article preview" />
 *   </template>
 *   Brief description of the article content...
 * </FdsCard>
 * ```
 * 
 * @example External link card
 * ```vue
 * <FdsCard 
 *   header="External Resource"
 *   to="https://example.com/resource"
 *   icon="open-in-new"
 * >
 *   This card links to an external website.
 * </FdsCard>
 * ```
 * 
 * @example Long variant card with custom header tag
 * ```vue
 * <FdsCard 
 *   variant="long"
 *   header="Detailed Information"
 *   header-tag="h3"
 *   subheader="Documentation"
 * >
 *   <template #image>
 *     <img src="/hero-image.jpg" alt="Documentation hero" />
 *   </template>
 *   Extended content that benefits from the long card layout...
 * </FdsCard>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/cards/} DKFDS Card Documentation
 */
const {
  /** Overskrift */
  header = undefined,
  headerTag = 'h2',
  /** Under overskrift */
  subheader = undefined,
  /** Link for navigation card - supports both regular URLs and Vue Router locations */
  to = undefined,
  /** Force use of standard anchor tag even if Vue Router is available */
  external = false,
  /** Icon for navigation card (e.g., 'arrow-forward', 'open-in-new') */
  icon = undefined,
  /** Card variant */
  variant = undefined,
} = defineProps<FdsCardProps>()

// Check if Vue Router is available
const $router = inject<any>('$router', null)
const $route = inject<any>('$route', null)

// Determine if we have Vue Router available and should use it
const hasRouter = computed(() => {
  return $router !== null && $route !== null
})

// Determine if the link is external
const isExternalLink = computed(() => {
  // If explicitly set as external, respect that
  if (external) return true
  
  // If not a string, it's a router location object (internal)
  if (typeof to !== 'string') return false
  
  // Check for various external URL patterns
  const url = to as string
  
  // Common protocol patterns for external links
  if (url.startsWith('http://') || url.startsWith('https://')) return true
  if (url.startsWith('ftp://') || url.startsWith('ftps://')) return true
  if (url.startsWith('mailto:') || url.startsWith('tel:')) return true
  if (url.startsWith('//')) return true // Protocol-relative URLs
  
  // Check if it looks like a domain (contains dot and doesn't start with /)
  // This catches cases like "example.com" or "subdomain.example.com"
  if (!url.startsWith('/') && !url.startsWith('#') && url.includes('.')) {
    // Basic check for domain-like pattern
    const domainPattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+/
    if (domainPattern.test(url)) return true
  }
  
  // Default to internal
  return false
})

// Get the appropriate link component (router-link or 'a' tag)
const getLinkComponent = (): Component | string => {
  // Use standard anchor for external links or when router is not available
  if (isExternalLink.value || !hasRouter.value) {
    return 'a'
  }

  // Try to get RouterLink component from Vue Router
  try {
    // Vue Router 4 (Vue 3)
    const RouterLink = $router?.options?.linkComponent || $router?.constructor?.RouterLink
    if (RouterLink) {
      return RouterLink as Component
    }
  } catch {
    // Fallback if we can't access RouterLink
  }

  // Fallback to anchor tag
  return 'a'
}

// Get the appropriate props for the link component
const getLinkProps = () => {
  const isAnchor = getLinkComponent() === 'a'
  
  if (isAnchor) {
    return { href: to }
  } else {
    return { to }
  }
}

// Determine the icon to use based on link type
const getIcon = computed(() => {
  // If icon is explicitly set, use it
  if (icon !== undefined) {
    return icon
  }
  
  // If there's a link, provide smart defaults
  if (to) {
    // External links get open-in-new icon by default
    if (isExternalLink.value) {
      return 'open-in-new'
    }
    // Internal navigation gets arrow-forward by default
    return 'arrow-forward'
  }
  
  // No link, no icon
  return undefined
})
</script>
