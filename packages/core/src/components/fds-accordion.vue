<template>
  <component
    :is="isInGroup ? 'li' : 'div'"
    :class="isInGroup ? '' : 'accordion'"
  >
    <component :is="headerTag">
      <button
        :id="formid"
        class="accordion-button"
        :class="getVariantClass"
        :aria-expanded="`${refExpanded ? 'true' : 'false'}`"
        :aria-controls="`acc_${formid}`"
        @click="toggleAccordion"
      >
        <slot name="header">
          {{ header }}
          <span
            v-if="variant && ['error', 'warning', 'success'].includes(variant)"
            class="accordion-icon"
          >
            <span
              v-if="variantText !== null"
              class="icon_text">
              {{ variantText === '' ? getIconText : variantText }}
            </span>
            <svg
              class="icon-svg"
              focusable="false"
              aria-hidden="true">
              <use :xlink:href="`#${getIcon}`"></use>
            </svg>
          </span>
        </slot>
      </button>
    </component>

    <div
      :id="`acc_${formid}`"
      role="region"
      :aria-labelledby="formid"
      :aria-hidden="`${refExpanded ? 'false' : 'true'}`"
      class="accordion-content"
    >
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
import { formId } from 'dkfds-vue3-utils';
import { ref, computed, inject, watch } from 'vue';

const {
  /** Overskrift */
  header = null,
  /** Hjælpetekst */
  hint: _hint = '',
  /** Er Accordion Åben = aktiv */
  expanded = false,
  headerTag = 'h2',
  /** Variant - ikon der vises til højre */
  variant = null,
  /** Tilhørende tekst til varianten */
  variantText = '',
} = defineProps<{
  header?: string | null;
  hint?: string;
  expanded?: boolean;
  headerTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'success' | 'warning' | 'error' | null;
  variantText?: string;
}>();

const emit = defineEmits<{
  'accordion-toggle': [expanded: boolean];
}>();

const refExpanded = ref(expanded);
const groupExpanded = inject('provideGroupExpanded', null);

// Detect if this accordion is inside a group
const isInGroup = computed(() => groupExpanded !== null);

const { formid } = formId(undefined, true);

// Watch for group expand/collapse
if (groupExpanded) {
  watch(groupExpanded, (newValue) => {
    if (newValue !== refExpanded.value) {
      refExpanded.value = newValue;
      emit('accordion-toggle', refExpanded.value);
    }
  });
}

const icons = {
  success: 'check-circle',
  warning: 'report-problem',
  error: 'highlight-off',
};

const defaultVariantText = {
  success: 'Success',
  warning: 'Advarsel',
  error: 'Fejl',
};

const getVariantClass = computed(() => (variant ? `accordion-${variant}` : ''));
const getIcon = computed(() => icons[variant as keyof typeof icons]);
const getIconText = computed(() => defaultVariantText[variant as keyof typeof icons]);

const toggleAccordion = () => {
  refExpanded.value = !refExpanded.value;
  emit('accordion-toggle', refExpanded.value);
};
</script>
