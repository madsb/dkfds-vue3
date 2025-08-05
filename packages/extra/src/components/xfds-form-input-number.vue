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
    <fds-input-number
      v-model="value"
      type="number"
      v-bind="{
        attrs,
        suffix,
        prefix,
        readonly,
      }"
      @update:model-value="handleInput"
      @dirty="touchedEvent"
    />
  </xfds-form-group>
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import { FdsInputNumber } from 'dkfds-vue3-core'
const attrs = useAttrs()

const {
  id = null, // eslint-disable-line no-unused-vars
  label = '',
  hint = '',
  tooltip = null,
  isValid = true,
  errorMessage = null,
  readonly = false,
  modelValue = 0,
  suffix = null,
  prefix = null,
} = defineProps<{
  id?: string | null
  label?: string
  hint?: string
  tooltip?: string | null
  isValid?: boolean
  errorMessage?: string | null
  readonly?: boolean
  modelValue?: number | string
  suffix?: string | null
  prefix?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | string]
  dirty: [value: boolean]
  valid: [value: boolean]
  input: [value: number | string]
}>()

const value = ref(modelValue)
const dirty = ref(false)

const touchedEvent = () => {
  dirty.value = true
}

const handleInput = () => emit('update:modelValue', value.value)
</script>

<style scoped lang="scss"></style>
