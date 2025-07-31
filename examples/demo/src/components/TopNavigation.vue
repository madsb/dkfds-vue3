<template>
  <div class="navigation-menu contains-search">
    <div class="navigation-menu-inner container">
      <nav class="nav">
        <!-- Start: Hovedmenu -->
        <ul class="mainmenu" role="menu">
          <li role="none" :class="[{ current: isPartOfMenu('forside') }]">
            <fds-nav-link title="Link title" @click="router.push({ name: 'forside' })">
              Forside
            </fds-nav-link>
          </li>
          <li role="none" :class="[{ current: isPartOfMenu('komponenter') }]">
            <fds-nav-link title="Link title" @click="router.push({ name: 'komponenter' })">
              Komponenter
            </fds-nav-link>
          </li>
          <li role="none" :class="[{ current: isPartOfMenu('ekstrakomponenter') }]">
            <fds-nav-link title="Link title" @click="router.push({ name: 'ekstrakomponenter' })">
              Ekstra Komponenter
            </fds-nav-link>
          </li>
          <li role="none" :class="[{ current: isPartOfMenu('boblere') }]">
            <fds-nav-link title="Gå til boblere" @click="router.push({ name: 'boblere' })">
              Boblere
            </fds-nav-link>
          </li>

          <li role="none" :class="[{ current: isPartOfMenu('anbefalinger') }]">
            <fds-nav-link title="Link title" @click="router.push({ name: 'anbefalinger' })">
              Anbefalinger
            </fds-nav-link>
          </li>
          <li role="none" :class="[{ current: isPartOfMenu('about') }]">
            <fds-nav-link title="Link title" @click="router.push({ name: 'about' })">
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
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isPartOfMenu = (name: string): boolean => {
  if (route) {
    const [parent] = route.matched;

    if (parent && parent.name === name) {
      return true;
    }
    if (route.name) {
      return route.name === name;
    }
  }

  return false;
};
</script>
