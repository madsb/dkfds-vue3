<template>
  <xfds-form-group
    v-bind="{
      label,
      hint,
      tooltip,
      isValid,
      errorMessage,
    }"
  >
    <ul
      :id="formid"
      class="nobullet-list">
      <li
        v-for="(radio, index) of options"
        :key="index">
        <input
          :id="'radio-' + formid + '-' + index"
          type="radio"
          class="form-radio radio-large"
          :name="'radio' + formid"
          :value="radio.value"
          :disabled="radio.disabled"
          :checked="value === radio.value.toString()"
          @change="handleInput"
          @blur="touchedEvent"
        />
        <label :for="'radio-' + formid + '-' + index">
          {{ radio.title }}
        </label>

        <div
          v-if="$slots[radio.value] && modelValue === radio.value.toString()"
          class="radio-content mt-2 ml-4 py-4"
        >
          <slot
            :name="radio.value"
            :radiovalue="value" />
        </div>
      </li>
    </ul>
  </xfds-form-group>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { FdsOptionItem } from 'dkfds-vue3-utils';
import { formId } from 'dkfds-vue3-utils';

const {
  id = null,
  label = '',
  hint = '',
  tooltip = null,
  isValid = true,
  errorMessage = null,
  modelValue = '',
  options = [],
} = defineProps<{
  id?: string | null;
  label?: string;
  hint?: string;
  tooltip?: string | null;
  isValid?: boolean;
  errorMessage?: string | null;
  modelValue?: string;
  options?: FdsOptionItem[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  dirty: [value: boolean];
  valid: [value: boolean];
  input: [value: string];
}>();

const value = ref(modelValue);
const dirty = ref(false);

const touchedEvent = () => {
  dirty.value = true;
};

const { formid } = formId(id, true);

const handleInput = (event: Event) =>
  emit('update:modelValue', (event?.target as HTMLInputElement).value);

watch(
  () => [modelValue],
  () => {
    value.value = modelValue;
  },
  {
    immediate: true,
  },
);
</script>

<style scoped lang="scss"></style>
