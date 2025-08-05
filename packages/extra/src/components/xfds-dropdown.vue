<template>
  <select :id="formid" class="form-select" :name="formid" @change="onInput" @blur="onDirty">
    <option v-if="optionHeader" :value="refValue">
      {{ optionHeader }}
    </option>
    <option
      v-for="(o, i) in options"
      :key="i"
      :value="o.value"
      :disabled="o.disabled"
      :selected="o.value === refValue"
    >
      {{ o.title }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { FdsOptionItem } from 'dkfds-vue3-utils'
import { formId } from 'dkfds-vue3-utils'

const {
  id = null,
  modelValue = '',
  /**
   * Første option - default: Vælg
   * */
  optionHeader = 'Vælg',
  /**
   * Dropdown options / valgmuligheder
   * */
  options = [],
} = defineProps<{
  id?: string | null
  modelValue?: string
  optionHeader?: string
  options?: Array<FdsOptionItem>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  dirty: [value: boolean]
  change: [value: string]
}>()

const refValue = ref(modelValue)
const { formid } = formId(id, true)

const onDirty = () => {
  emit('dirty', true)
}

const onInput = (event: Event) =>
  emit('update:modelValue', (event?.target as HTMLInputElement).value)

watch(
  () => [modelValue],
  () => {
    refValue.value = modelValue
  },
  {
    immediate: true,
  },
)
</script>

<style scoped lang="scss"></style>
