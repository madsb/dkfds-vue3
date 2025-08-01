<template>
  <fds-formgroup :is-valid="compValid">
    <slot name="label">
      <fds-label v-if="label">
        {{ label }}
      </fds-label>
    </slot>
    <slot name="tooltip">
      <fds-tooltip
        v-if="tooltip"
        class="ml-2">
        {{ tooltip }}
      </fds-tooltip>
    </slot>

    <slot name="fejlmeddelelse">
      <fds-fejlmeddelelse v-if="!compValid">
        {{ compErrorMessage }}
      </fds-fejlmeddelelse>
    </slot>
    <slot name="hint">
      <fds-hint>{{ hint }}</fds-hint>
    </slot>
    <slot />
  </fds-formgroup>
</template>

<script setup lang="ts">
import { computed,  inject, ref } from 'vue';
import { FdsFormgroup, FdsLabel, FdsFejlmeddelelse, FdsTooltip, FdsHint } from 'dkfds-vue3-core'

const {
  label = '',
  hint = '',
  tooltip = null,
  isValid = true,
  errorMessage = null,
} = defineProps<{
  label?: string;
  hint?: string;
  tooltip?: string | null;
  isValid?: boolean;
  errorMessage?: string | null;
}>();

const injIsValid = ref<boolean | null>(inject('provideIsValid', null));
const injErrorMessage = ref<string | null>(inject('provideErrorMessage', null));

const compValid = computed(() => injIsValid.value ?? isValid);
const compErrorMessage = computed(() => injErrorMessage.value ?? errorMessage);
</script>
