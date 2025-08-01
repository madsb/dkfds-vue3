<template>
  <textarea
    :id="formid"
    v-model="inputValue"
    class="form-input"
    :maxlength="maxlength"
    :rows="getRows"
    :name="formid"
    @blur="$emit('dirty', true)"
  ></textarea>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formId } from 'dkfds-vue3-utils';

const {
  modelValue,
  id = null,
  rows = 5,
  maxRows = 10,
  rowlength = 80,
  maxlength = 4000,
} = defineProps<{
  modelValue: string;
  id?: string | null;
  rows?: number;
  maxRows?: number;
  rowlength?: number;
  maxlength?: number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
  dirty: [isDirty: boolean];
  input: [event: Event];
}>();

const { formid } = formId(id, true);

const getRows = computed(() => {
  if (!modelValue) {
    return rows;
  }
  const newlineRows = modelValue.split(/\r?\n/).length;

  const textLengthRow = Math.floor(modelValue.length / rowlength) + 1;
  const result = newlineRows > textLengthRow ? newlineRows : textLengthRow;

  if (result < maxRows) {
    return result < rows ? rows : result;
  }
  return maxRows;
});

const inputValue = computed({
  get() {
    return modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>

<style scoped lang="scss"></style>
