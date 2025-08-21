<template>
  <div class="container page-container">
    <div class="row">
      <aside class="col-12 col-lg-3 sidebar-col">
        <nav>
          <fds-menu>
            <fds-menu-item
              v-for="item in nav.items.value"
              :key="item.key"
              :href="`#/anbefalinger/${item.key.replace('anbefalinger', '')}`"
              :active="nav.isActive(item.key)"
              @click.prevent="nav.navigate(item.key)"
            >
              {{ item.title }}
            </fds-menu-item>
          </fds-menu>
        </nav>
      </aside>
      <div class="col-12 col-lg-9">
        <div class="subheading">Anbefalinger</div>
        <h1 v-if="nav.currentItem.value" :id="nav.currentItem.value.key">
          {{ nav.currentItem.value.title }}
        </h1>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FdsMenu, FdsMenuItem } from 'dkfds-vue3'
import { useNavigation, type NavigationItem } from 'dkfds-vue3/utils'

const navigationItems: NavigationItem[] = [
  {
    key: 'anbefalingernavigation',
    title: 'Navigation',
  },
]

// Use navigation composable with simplified configuration
const nav = useNavigation(navigationItems)
</script>
<style lang="scss" scoped></style>
