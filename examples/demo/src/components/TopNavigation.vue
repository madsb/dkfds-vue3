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

        <div class="portal-info-mobile">
          <p class="user">Christian Emil Vestergaard Christensen</p>
          <p>Københavns Urmager og Værksted v/Martin Elsig</p>
          <a href="#" class="button button-secondary alert-leave" role="button"> Log af </a>
        </div>

        <div class="solution-info-mobile">
          <p class="h5 authority-name">Myndighedsnavn</p>
          <p>
            Support: 12 34 56 78 ·
            <a href="#" class="icon-link function-link alert-leave"
              >Kontakt<svg class="icon-svg" aria-hidden="true" focusable="false">
                <use xlink:href="#open-in-new"></use>
              </svg>
            </a>
          </p>
        </div>
      </nav>
    </div>
  </div>
  <!-- Slut: Navigation -->
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { navigation } from 'dkfds-vue3/utils';

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

new navigation().init();
</script>
