<template>
  <fieldset :aria-labelledby="legendId" :aria-describedby="helpTextId || undefined">
    <legend :id="legendId" class="form-label">
      <slot name="label">
        {{ label }}
      </slot>
    </legend>
    <div v-if="helpText || $slots.help" :id="helpTextId" class="form-hint">
      <slot name="help">
        {{ helpText }}
      </slot>
    </div>
    <div :id="formid" role="radiogroup">
      <slot />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { provide, computed, useSlots } from 'vue'
import { formId } from '../../composables'

export interface FdsRadioGroupProps {
  /** The v-model value */
  modelValue?: string | number | boolean | null
  /** Unique identifier */
  id?: string
  /** Label for the radio group */
  label: string
  /** Help text for the radio group */
  helpText?: string
  /** Name attribute for all radio buttons in the group */
  name?: string
}

const { modelValue, id, label, helpText = '', name } = defineProps<FdsRadioGroupProps>()

const emit = defineEmits<{
  /** Emitted when selection changes */
  'update:modelValue': [value: string | number | boolean]
  /** Emitted when any radio loses focus */
  dirty: [isDirty: boolean]
}>()

const slots = useSlots()
const { formid } = formId(id, true)

// Generate IDs for accessibility
const legendId = computed(() => `${formid.value}-legend`)
const helpTextId = computed(() => (helpText || slots.help ? `${formid.value}-help` : undefined))

// Provide radio name to children
const radioName = computed(() => name || `radio-${formid.value}`)

const value = computed(() => modelValue)

const exposeEmit = (newValue: string | number | boolean) => {
  emit('update:modelValue', newValue)
}

// Provide values to child radio items
provide('provideGroupEmit', exposeEmit)
provide('provideGroupValue', value)
provide('provideGroupName', radioName)

// Provide aria-describedby if help text exists
if (helpTextId.value) {
  provide('ariaDescribedby', helpTextId)
}
</script>

<style scoped lang="scss"></style>
