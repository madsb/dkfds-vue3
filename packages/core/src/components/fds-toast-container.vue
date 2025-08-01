<template>
  <div
    :id="id"
    class="toast-container"></div>
</template>

<script setup lang="ts">


const {
  id = 'main-toaster',
  position = 'top-right',
} = defineProps<{
  id?: string;
  position?: string;
}>();
</script>

<style scoped lang="scss"></style>
