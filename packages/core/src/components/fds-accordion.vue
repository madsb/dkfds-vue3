<template>
  <div class="accordion-single">
    <component :is="headerTag">
      <button
        :id="formid"
        class="accordion-button"
        :class="getVariantClass"
        :aria-expanded="`${refExpanded ? 'true' : 'false'}`"
        :aria-controls="`acc_${formid}`"
        @click="refExpanded = !refExpanded"
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
  </div>
</template>

<script setup lang="ts">
import { formId } from 'dkfds-vue3-utils';
import { ref, computed } from 'vue';

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

const refExpanded = ref(expanded);

const { formid } = formId(undefined, true);

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
</script>
