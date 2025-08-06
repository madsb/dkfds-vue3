<template>
  <div :class="`${cssClass}`">
    <div v-if="prefix" class="form-input-prefix" aria-hidden="true">
      {{ prefix }}
    </div>
    <input
      v-bind="attrs"
      :id="formid"
      v-model="inputValue"
      type="text"
      class="form-input d-flex"
      :name="formid"
      :aria-describedby="computedAriaDescribedby"
      @blur="$emit('dirty', true)"
    />
    <div v-if="suffix" class="form-input-suffix" aria-hidden="true">
      {{ suffix }}
    </div>
    <slot name="button" />
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs, inject, isRef, type Ref } from 'vue'
import { formId } from 'dkfds-vue3-utils'

const attrs = useAttrs()

const {
  id = null,
  modelValue = '',
  suffix = null,
  prefix = null,
} = defineProps<{
  id?: string | null
  modelValue?: string
  suffix?: string | null
  prefix?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  dirty: [isDirty: boolean]
  input: [event: Event]
}>()
const slots = useSlots()

const { formid } = formId(id, true)

// Inject aria-describedby from formgroup if available
const injectedAriaDescribedby = inject<string | Ref<string> | undefined>(
  'ariaDescribedby',
  undefined,
)
const computedAriaDescribedby = computed((): string | undefined => {
  // Use explicitly provided aria-describedby from attrs
  if (attrs['aria-describedby']) {
    return attrs['aria-describedby'] as string
  }
  // Otherwise use injected value from formgroup
  if (injectedAriaDescribedby) {
    return isRef(injectedAriaDescribedby) ? injectedAriaDescribedby.value : injectedAriaDescribedby
  }
  return undefined
})

const cssClass = computed((): string => {
  if (suffix) {
    return 'form-input-wrapper form-input-wrapper--suffix'
  }
  if (prefix) {
    return 'form-input-wrapper form-input-wrapper--prefix'
  }
  if (slots.button) {
    return 'search'
  }
  return 'flex-items-center'
})

const inputValue = computed({
  get() {
    return modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})
</script>

<style scoped lang="scss"></style>
