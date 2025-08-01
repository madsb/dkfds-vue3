<template>
  <input
    :id="formid"
    v-model="refValue"
    type="date"
    class="form-input form-input-date"
    :name="formid"
    @input="onInput"
    @blur="$emit('dirty', true)"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { formId } from 'dkfds-vue3-utils';

const {
  id = null,
  modelValue = '',
} = defineProps<{
  id?: string | null;
  /** JSON Date */
  modelValue?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  dirty: [value: boolean];
  valid: [isValid: boolean];
}>();
const { formid } = formId(id);
const refValue = ref(modelValue);

const isDateValid = (dateString: string) => {
  const date = Date.parse(dateString);
  return !Number.isNaN(date);
};

const onValid = () => emit('valid', isDateValid(refValue.value));

const onInput = () => {
  onValid();
  emit('update:modelValue', refValue.value);
};
</script>
