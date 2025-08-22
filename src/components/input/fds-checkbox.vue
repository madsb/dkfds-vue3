<template>
  <div class="form-group-checkbox">
    <input
      v-bind="attrs"
      :id="formid"
      type="checkbox"
      :class="checkboxClass"
      :checked="isChecked"
      :name="name || formid"
      :value="value"
      :disabled="disabled"
      :aria-describedby="computedAriaDescribedby"
      :aria-controls="hasContent ? `collapse-${formid}` : undefined"
      :data-controls="hasContent ? `collapse-${formid}` : undefined"
      @change="handleChange"
      @blur="handleBlur"
    />
    <label :for="formid" class="form-label">
      <slot></slot>
    </label>
    <div
      v-if="hasContent"
      :id="`collapse-${formid}`"
      :aria-hidden="!isChecked ? 'true' : 'false'"
      class="checkbox-content"
      :style="!isChecked ? 'display: none;' : undefined"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots, inject, isRef, type Ref } from 'vue'
import { formId } from '../../composables'

const attrs = useAttrs()
const slots = useSlots()

interface Props {
  /** Unique identifier for the checkbox */
  id?: string
  /** The v-model value */
  modelValue?: boolean | string | string[]
  /** Checkbox value for form submission */
  value?: string | number | boolean
  /** Name attribute for form submission */
  name?: string
  /** Whether the checkbox is disabled */
  disabled?: boolean
}

const {
  id,
  modelValue = false,
  value = true,
  name,
  disabled = false,
} = defineProps<Props>()

const emit = defineEmits<{
  /** Emitted when checkbox state changes */
  'update:modelValue': [value: boolean | string | string[]]
  /** Emitted when checkbox loses focus */
  dirty: [isDirty: boolean]
  /** Emitted on change event */
  change: [event: Event]
}>()

const { formid } = formId(id, true)

// Check if content slot is provided
const hasContent = computed(() => !!slots.content)

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

/**
 * Compute checkbox classes
 */
const checkboxClass = computed((): string => {
  return 'form-checkbox'
})

/**
 * Determine if checkbox is checked
 */
const isChecked = computed((): boolean => {
  if (Array.isArray(modelValue)) {
    return modelValue.includes(value as string)
  }
  if (typeof modelValue === 'boolean') {
    return modelValue
  }
  return modelValue === value
})

/**
 * Handle checkbox change
 */
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (Array.isArray(modelValue)) {
    const newValue = [...modelValue]
    if (checked) {
      if (!newValue.includes(value as string)) {
        newValue.push(value as string)
      }
    } else {
      const index = newValue.indexOf(value as string)
      if (index > -1) {
        newValue.splice(index, 1)
      }
    }
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', checked)
  }

  emit('change', event)
}

/**
 * Handle blur event
 */
const handleBlur = () => {
  emit('dirty', true)
}
</script>
