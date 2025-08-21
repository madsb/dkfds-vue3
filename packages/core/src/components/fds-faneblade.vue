<template>
  <div class="tab-container">
    <div class="tab-list" role="tablist">
      <slot name="tabs" />
    </div>
    <slot name="panels" />
  </div>
</template>

<script setup lang="ts">
// This component now expects tabs in the "tabs" slot and panels in the "panels" slot
// This allows proper DKFDS v11 structure with tabs and panels as siblings
</script>

<style scoped lang="scss"></style>
