<template>
  <fds-menu class="discrete-icon">
    <fds-menu-item
      v-for="item in nav.items.value"
      :key="item.key"
      :href="`#/komponenter/${item.key.replace('komponent', '')}`"
      :active="nav.isActive(item.key)"
      @click.prevent="nav.navigate(item.key)"
    >
      {{ item.title }}
    </fds-menu-item>
  </fds-menu>
</template>

<script setup lang="ts">
import { FdsMenu, FdsMenuItem } from 'dkfds-vue3'
import { useNavigation, type NavigationItem } from 'dkfds-vue3/utils'
import { sort } from 'fast-sort'
import { watch } from 'vue'

defineProps({
  header: {
    type: String,
    default: '',
  },
  jsonString: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['currentItem'])

// Navigation items
const navigationItems: NavigationItem[] = 
  sort([
    {
      key: 'komponentaccordions',
      title: 'Accordions',
    },
    {
      key: 'komponentbadges',
      title: 'Badges',
    },
    {
      key: 'komponentbeskeder',
      title: 'Beskeder (Alerts)',
    },
    {
      key: 'komponentbroedkrumme',
      title: 'Brødkrumme',
    },
    {
      key: 'komponentcards',
      title: 'Cards',
    },
    {
      key: 'komponentcookie',
      title: 'Cookiemeddelelse',
    },
    {
      key: 'komponentdatoangivelse',
      title: 'Datofelter',
    },
    {
      key: 'komponentdatovaelger',
      title: 'Datovælger',
    },
    {
      key: 'komponentdetaljer',
      title: 'Detaljer',
    },
    {
      key: 'komponentdropdown',
      title: 'Dropdown-menu',
    },
    {
      key: 'komponentfaneblade',
      title: 'Faneblade (Tabs)',
    },
    {
      key: 'komponentfejlmeddelelser',
      title: 'Fejlmeddelelser',
    },
    {
      key: 'komponentfejlopsummering',
      title: 'Fejlopsummering',
    },

    {
      key: 'komponentfooters',
      title: 'Footers',
      icon: 'engineering',
    },
    {
      key: 'komponentformgruppe',
      title: 'Form gruppe',
    },

    {
      key: 'komponentfunktionslink',
      title: 'Funktionslink',
    },
    {
      key: 'komponentheaders',
      title: 'Headers',
      icon: 'engineering',
    },
    {
      key: 'komponentikon',
      title: 'Ikoner',
    },
    {
      key: 'komponentfelter',
      title: 'Inputfelter',
    },
    {
      key: 'komponentknapper',
      title: 'Knapper (Buttons)',
    },
    {
      key: 'komponentlist',
      title: 'Liste',
    },
    {
      key: 'komponentspinner',
      title: 'Loading spinner',
    },
    {
      key: 'komponentmodalvindue',
      title: 'Modalvindue',
    },
    {
      key: 'komponentnavigation',
      title: 'Navigation',
    },
    {
      key: 'komponenttoast',
      title: 'Toastbeskeder',
    },
    {
      key: 'komponentoverflow',
      title: 'Overflow menu',
    },
    {
      key: 'komponentpaginering',
      title: 'Paginering',
    },
    {
      key: 'komponentradioknap',
      title: 'Radioknap',
    },

    {
      key: 'komponentskip',
      title: 'Gå til sidens indhold (Skip-link)',
    },

    {
      key: 'komponentsprogvaelger',
      title: 'Sprogvælger',
    },
    {
      key: 'komponentsoegefelt',
      title: 'Søgefelt',
    },
    {
      key: 'komponenttilbage',
      title: 'Tilbage link',
    },
    {
      key: 'komponenttabeller',
      title: 'Tabeller',
      icon: 'feedback',
    },
    {
      key: 'komponenttags',
      title: 'Tags',
    },
    {
      key: 'komponenttekstomraade',
      title: 'Tekstområde',
    },
    {
      key: 'komponenttiltop',
      title: 'Tilbage til toppen',
    },
    {
      key: 'komponenttjekboks',
      title: 'Tjekboks',
    },
    {
      key: 'komponenttoggle',
      title: 'Toggle switch',
    },
    {
      key: 'komponenttooltip',
      title: 'Tooltip',
    },
    {
      key: 'komponenttrinindikatorer',
      title: 'Trinindikatorer',
    },
    {
      key: 'komponentvedhaeft',
      title: 'Vedhæft fil',
    },
    {
      key: 'komponentvenstremenu',
      title: 'Venstremenu',
    },
  ] as NavigationItem[]).asc((a) => a.title)

// Use navigation composable
const nav = useNavigation(navigationItems, {
  routeResolver: (key) => key, // Routes use the same key format
  keyMatcher: (key, routeName) => {
    // Direct match
    if (key === routeName) return true
    // Match with 'komponent' prefix variations
    return key.replace('komponent', '') === routeName.replace('komponent', '')
  }
})

// Emit current item when it changes
watch(nav.currentItem, (item) => {
  if (item) {
    emits('currentItem', item)
  }
}, { immediate: true })
</script>
<style lang="scss">
.sidenav-list {
  &.discrete-icon {
    > li:not(.current, :hover) .icon-svg {
      fill: #b5b5b5;
    }
  }
}
</style>
