<template>
  <!-- 
    DKFDS v11 uses Material Symbols and provides its own icon definitions.
    This component ensures the base SVG icons from DKFDS are available.
    The icons are loaded from the DKFDS package automatically.
  -->
  <div class="hide-base-svg" v-html="iconSvg"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const iconSvg = ref('');

onMounted(async () => {
  try {
    // Try to load the icon SVG from DKFDS v11
    // The icons should be available in the DKFDS package
    // This is a placeholder - in production, icons would be loaded from DKFDS
    const response = await fetch('/node_modules/dkfds/dist/img/svg-icons/all-svg-icons.svg');
    if (response.ok) {
      iconSvg.value = await response.text();
    }
  } catch (error) {
    console.warn('Could not load DKFDS icon collection:', error);
    // Icons will be loaded through DKFDS CSS/JS instead
  }
});
</script>