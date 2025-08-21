<template>
  <fieldset :aria-labelledby="legendId" :aria-describedby="helpTextId || undefined">
    <legend :id="legendId" class="form-label">
      <slot name="label">
        {{ props.label }}
      </slot>
    </legend>
    <div v-if="props.helpText || $slots.help" :id="helpTextId" class="form-hint">
      <slot name="help">
        {{ props.helpText }}
      </slot>
    </div>
    <div :id="formid" role="radiogroup">
      <slot />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { provide, computed, useSlots } from 'vue'
import { formId } from 'dkfds-vue3-utils'

interface Props {
  /** The v-model value */
  modelValue?: string | number | boolean | null
  /** Unique identifier */
  id?: string | null
  /** Label for the radio group */
  label: string
  /** Help text for the radio group */
  helpText?: string
  /** Name attribute for all radio buttons in the group */
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  id: null,
  helpText: '',
  name: undefined,
})

const emit = defineEmits<{
  /** Emitted when selection changes */
  'update:modelValue': [value: string | number | boolean]
  /** Emitted when any radio loses focus */
  dirty: [isDirty: boolean]
}>()

const slots = useSlots()
const { formid } = formId(props.id, true)

// Generate IDs for accessibility
const legendId = computed(() => `${formid.value}-legend`)
const helpTextId = computed(() => (props.helpText || slots.help ? `${formid.value}-help` : null))

// Provide radio name to children
const radioName = computed(() => props.name || `radio-${formid.value}`)

const value = computed(() => props.modelValue)

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
