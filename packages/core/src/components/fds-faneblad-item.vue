<template>
  <button
    :id="`tab_${formId}`"
    :aria-controls="`tabpanel_${formId}`"
    class="tabnav-item"
    :class="[{ active: selected }]"
    role="tab"
    :aria-selected="selected"
    @click="onFanButtonClick"
  >
    <slot name="header">
      <span>
        {{ header }}
      </span>
    </slot>
  </button>
  <section
    :id="`tabpanel_${formId}`"
    tabindex="0"
    class="tabnav-panel"
    role="tabpanel"
    :aria-hidden="!selected"
    :aria-labelledby="`tab_${formId}`"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { uuid } from 'dkfds-vue3-utils';

/**
 * Faneknap aktiv
 */
/**
 * Faneknap overskrift
 */
const {
  /** Faneknap aktiv */
  selected = false,
  id,
  /** Faneknap overskrift */
  header = 'Fane',
} = defineProps<{
  selected?: boolean;
  id: string;
  header?: string;
}>();

const emit = defineEmits<{
  click: [id: string];
  navigate: [id: string];
}>();

const onFanButtonClick = () => {
  emit('click', id);
  emit('navigate', id);
};

const formId = ref(id ?? uuid());
</script>

<style scoped lang="scss"></style>
