<template>
  <div>
    <slot name="header">
      <button
        v-if="false"
        class="accordion-bulk-button"
        :data-accordion-bulk-expand="!refExpanded"
        @click="onToggle"
      >
        {{ `${refExpanded ? expandedText : collapsedText}` }}
      </button>
    </slot>
    <div class="accordion-group">
      <slot :group-active="refExpanded" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue';

const {
  /** Tekst ved Lukket tilstand - Åbn alle */
  collapsedText = 'Åbn alle',
  /** Tekst ved Åben tilstand - Luk alle */
  expandedText = 'Luk alle',
} = defineProps<{
  collapsedText?: string;
  expandedText?: string;
}>();

// TODO: Overvej single select (collapse andre) og multiselect (multi default) ?
// TODO: Group expand/

const refExpanded = ref(false);
const compExpanded = computed(() => refExpanded.value);
provide('provideGroupExpanded', compExpanded);

const onToggle = () => {
  refExpanded.value = !refExpanded.value;
};
</script>

<style lang="scss"></style>
