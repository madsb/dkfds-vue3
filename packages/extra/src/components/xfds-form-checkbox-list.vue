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
        v-for="(checkbox, index) of value"
        :key="index">
        <input
          :id="'checkbox-' + formid + '-' + index"
          v-model="checkbox.checked"
          type="checkbox"
          class="form-checkbox checkbox-large"
          :name="'checkbox' + formid"
          :disabled="checkbox.disabled"
          @change="handleInput"
          @blur="touchedEvent"
        />
        <label :for="'checkbox-' + formid + '-' + index">
          {{ checkbox.title }}
        </label>

        <div
          v-if="$slots[checkbox.value] && checkbox.checked"
          class="checkbox-content mt-2 ml-4 py-4"
        >
          <slot
            :name="checkbox.value"
            :checkboxvalue="value" />
        </div>
      </li>
    </ul>
  </xfds-form-group>
</template>

<script setup lang="ts">
import { FdsCheckboxItem, formId } from 'dkfds-vue3-utils';
import { ref, watch } from 'vue';

const {
  modelValue,
  label = '',
  hint = '',
  tooltip = null,
  isValid = true,
  errorMessage = null,
} = defineProps<{
  modelValue: Array<FdsCheckboxItem>;
  label?: string;
  hint?: string;
  tooltip?: string | null;
  isValid?: boolean;
  errorMessage?: string | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: Array<FdsCheckboxItem>];
  dirty: [value: boolean];
  valid: [value: boolean];
  input: [value: Array<FdsCheckboxItem>];
}>();

const dirty = ref(false);

const touchedEvent = () => {
  dirty.value = true;
  emit('dirty', true);
};

const value = ref(modelValue);
const { formid } = formId(undefined, true);

const handleInput = () => {
  emit('update:modelValue', value.value);
};

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
