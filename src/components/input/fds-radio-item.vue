<template>
  <div class="form-group-radio">
    <input
      v-bind="$attrs"
      :id="radioId"
      type="radio"
      :name="radioName"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      class="form-radio"
      :aria-describedby="computedAriaDescribedby"
      :aria-controls="hasContent ? `collapse-${radioId}` : undefined"
      :data-controls="hasContent ? `collapse-${radioId}` : undefined"
      @change="handleChange"
      @blur="handleBlur"
    />
    <label :for="radioId" class="form-label">
      <slot />
    </label>

    <div
      v-if="hasContent && isChecked"
      :id="`collapse-${radioId}`"
      :aria-hidden="!isChecked"
      class="radio-content"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, useSlots, isRef, type Ref } from 'vue'
import { formId, generateId } from '../../composables'

const slots = useSlots()

interface Props {
  /** Radio button value */
  value: string | number | boolean
  /** Index for unique ID generation */
  index?: string
  /** Unique identifier */
  id?: string
  /** Whether the radio is disabled */
  disabled?: boolean
  /** Name attribute (usually injected from group) */
  name?: string
}

const { value, index, id, disabled = false, name } = defineProps<Props>()

const emit = defineEmits<{
  /** Emitted when radio loses focus */
  dirty: [value: boolean]
  /** Emitted on change event */
  change: [event: Event]
}>()
// Inject from radio group
const injGroupEmit = inject<((_value: string | number | boolean) => void) | undefined>(
  'provideGroupEmit',
  undefined,
)
const injGroupValue = inject<
  Ref<string | number | boolean | null> | string | number | boolean | null
>('provideGroupValue', null)
const injGroupName = inject<Ref<string> | string>('provideGroupName', '')

const { formid } = formId(id, true)
const indexIdRef = generateId(index)
const indexId = indexIdRef ? indexIdRef.value : 'item'

// Generate unique radio ID
const radioId = computed(() => `radio-${formid.value}-${indexId}`)

// Use injected name or prop name
const radioName = computed(() => {
  const groupName = isRef(injGroupName) ? injGroupName.value : injGroupName
  return name || groupName || `radio-${formid.value}`
})

// Check if content slot is provided
const hasContent = computed(() => !!slots.content)

// Check if this radio is selected
const isChecked = computed(() => {
  const groupValue = isRef(injGroupValue) ? injGroupValue.value : injGroupValue
  return value === groupValue
})

// Inject aria-describedby from formgroup if available
const injectedAriaDescribedby = inject<string | Ref<string> | undefined>(
  'ariaDescribedby',
  undefined,
)

const computedAriaDescribedby = computed((): string | undefined => {
  // Use explicitly provided aria-describedby from attrs
  const attrs = (slots as any).$attrs
  if (attrs && attrs['aria-describedby']) {
    return attrs['aria-describedby'] as string
  }
  // Otherwise use injected value from formgroup
  if (injectedAriaDescribedby) {
    return isRef(injectedAriaDescribedby) ? injectedAriaDescribedby.value : injectedAriaDescribedby
  }
  return undefined
})

/**
 * Handle radio change
 */
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement

  if (injGroupEmit) {
    injGroupEmit(target.value)
  }

  emit('change', event)
  emit('dirty', true)
}

/**
 * Handle blur event
 */
const handleBlur = () => {
  emit('dirty', true)
}
</script>

<style scoped lang="scss"></style>
