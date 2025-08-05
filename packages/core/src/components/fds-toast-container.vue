<template>
  <div :id="id" class="toast-container"></div>
</template>

<script setup lang="ts">
const { id = 'main-toaster' } = defineProps<{
  id?: string
}>()
</script>

<style scoped lang="scss"></style>
