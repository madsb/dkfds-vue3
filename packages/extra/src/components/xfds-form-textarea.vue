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
    <fds-textarea
      v-model="value"
      v-bind="attrs"
      :maxlength="maxlength"
      :rowlength="rowlength"
      :rows="rows"
      @update:model-value="handleInput"
      @dirty="touchedEvent"
    ></fds-textarea>
  </xfds-form-group>
</template>

<script setup lang="ts">
import { ref, useAttrs, watch } from 'vue'
import { FdsTextarea } from 'dkfds-vue3-core'
const attrs = useAttrs()

const {
  modelValue,
  id = null, // eslint-disable-line no-unused-vars
  rows = 5,
  rowlength = 80,
  maxlength = 4000,
  label = '',
  hint = '',
  tooltip = null,
  isValid = true,
  errorMessage = null,
} = defineProps<{
  modelValue: string
  id?: string | null
  rows?: number
  rowlength?: number
  maxlength?: number
  label?: string
  hint?: string
  tooltip?: string | null
  isValid?: boolean
  errorMessage?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  dirty: [value: boolean]
  valid: [value: boolean]
  input: [value: string]
}>()

const value = ref(modelValue)
const dirty = ref(false)

const touchedEvent = () => {
  dirty.value = true
}

const handleInput = () => emit('update:modelValue', value.value)

watch(
  () => [modelValue],
  () => {
    value.value = modelValue
  },
  {
    immediate: true,
  },
)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
