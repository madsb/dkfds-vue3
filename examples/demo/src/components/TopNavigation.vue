<template>
  <div class="navigation-menu contains-search">
    <div class="navigation-menu-inner container">
      <nav class="nav">
        <!-- Start: Hovedmenu -->
        <ul class="mainmenu" role="menu">
          <li role="none" :class="[{ active: isPartOfMenu('forside') }]">
            <fds-nav-link title="Link title" @click="nav.navigate('forside')">
              Forside
            </fds-nav-link>
          </li>
          <li role="none" :class="[{ active: isPartOfMenu('komponenter') }]">
            <fds-nav-link title="Link title" @click="nav.navigate('komponenter')">
              Komponenter
            </fds-nav-link>
          </li>

          <li role="none" :class="[{ active: isPartOfMenu('anbefalinger') }]">
            <fds-nav-link title="Link title" @click="nav.navigate('anbefalinger')">
              Anbefalinger
            </fds-nav-link>
          </li>
          <li role="none" :class="[{ active: isPartOfMenu('about') }]">
            <fds-nav-link title="Link title" @click="nav.navigate('about')">
              Fællesskab
            </fds-nav-link>
          </li>
        </ul>
        <!-- Slut: Hovedmenu -->
      </nav>
    </div>
  </div>
  <!-- Slut: Navigation -->
</template>

<script setup lang="ts">
import { useNavigation, type NavigationItem } from 'dkfds-vue3/utils'
import { useRoute } from 'vue-router'

const route = useRoute()

// Define main navigation items
const navigationItems: NavigationItem[] = [
  { key: 'forside', title: 'Forside' },
  { key: 'komponenter', title: 'Komponenter' },
  { key: 'anbefalinger', title: 'Anbefalinger' },
  { key: 'about', title: 'Fællesskab' },
]

// Use navigation composable
const nav = useNavigation(navigationItems)

// Check if current route is part of a menu section
const isPartOfMenu = (name: string): boolean => {
  if (!route) return false

  // Direct match with current route name
  if (route.name === name) return true

  // Check if the current route is a child of this menu item
  // For example, 'komponentaccordions' should match 'komponenter'
  const routeName = String(route.name || '')

  // For 'komponenter', check if route starts with 'komponent'
  if (name === 'komponenter' && routeName.startsWith('komponent')) {
    return true
  }

  // For 'anbefalinger', check if route starts with 'anbefalinger'
  if (name === 'anbefalinger' && routeName.startsWith('anbefalinger')) {
    return true
  }

  // Check matched routes (for nested routes)
  if (route.matched && route.matched.length > 0) {
    return route.matched.some((r) => r.name === name)
  }

  return false
}
</script>
