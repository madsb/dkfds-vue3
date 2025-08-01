<template>
  <div
    :id="id"
    class="toast-container"></div>
</template>

<script setup lang="ts">


defineProps({
  id: {
    type: String,
    default: 'main-toaster',
  },
  position: {
    type: String,
    default: 'top-right',
  },
});
</script>

<style scoped lang="scss"></style>
