<template>
  <button :id="formid" class="tag" :class="{ 'tag-icon': icon }">
    <slot />
    <svg v-if="icon" class="icon-svg" aria-hidden="true" @click="handleIconClick">
      <use :href="`#${icon}`"></use>
    </svg>
  </button>
</template>
<script setup lang="ts">
/**
 *
 * Komponent for Tags
 * https://designsystem.dk/komponenter/tags/
 *
 * */

import { formId } from 'dkfds-vue3-utils';

const { icon = null, id = null } = defineProps<{
  icon?: string | null;
  id?: string | null;
}>();

const emit = defineEmits<{
  iconClick: [formId: string];
}>();

const { formid } = formId(id, true);

const handleIconClick = () => {
  emit('iconClick', formid.value);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
