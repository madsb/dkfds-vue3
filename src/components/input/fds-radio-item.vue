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

/**
 * Radio item component implementing DKFDS v11 individual radio button specifications.
 *
 * Represents a single radio button option within a radio group with support
 * for conditional content display, accessibility attributes, and coordinated
 * state management. Automatically integrates with parent FdsRadioGroup for
 * shared naming and selection state following DKFDS radio patterns.
 *
 * @component
 * @example Basic radio item (used within FdsRadioGroup)
 * ```vue
 * <FdsRadioGroup v-model="selectedValue" label="Options">
 *   <FdsRadioItem value="option1">First Option</FdsRadioItem>
 *   <FdsRadioItem value="option2">Second Option</FdsRadioItem>
 * </FdsRadioGroup>
 * ```
 *
 * @example Radio item with conditional content
 * ```vue
 * <FdsRadioGroup v-model="travelMethod" label="How will you travel?">
 *   <FdsRadioItem value="car">Car</FdsRadioItem>
 *   <FdsRadioItem value="other">Other
 *     <template #content>
 *       <FdsLabel>Please specify:</FdsLabel>
 *       <FdsInput v-model="otherMethod" />
 *     </template>
 *   </FdsRadioItem>
 * </FdsRadioGroup>
 * ```
 *
 * @example Radio item with custom index
 * ```vue
 * <FdsRadioItem
 *   value="custom"
 *   index="custom-option"
 *   :disabled="isDisabled"
 * >
 *   Custom Option
 * </FdsRadioItem>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/radioknap/} DKFDS Radio Button Documentation
 */

const slots = useSlots()

export interface FdsRadioItemProps {
  /**
   * Radio button value for selection.
   * When selected, this value is emitted to the parent radio group.
   */
  value: string | number | boolean
  /**
   * Index identifier for unique ID generation.
   * Used to create unique radio IDs when multiple items exist.
   * @default undefined (auto-generated)
   */
  index?: string
  /**
   * Unique identifier for the radio item.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /**
   * Whether the radio button is disabled.
   * Prevents user interaction and applies disabled styling.
   * @default false
   */
  disabled?: boolean
  /**
   * Name attribute for the radio input.
   * Usually injected from parent FdsRadioGroup.
   * @default undefined (uses injected group name)
   */
  name?: string
}

const { value, index, id, disabled = false, name } = defineProps<FdsRadioItemProps>()

const emit = defineEmits<{
  /**
   * Emitted when radio button loses focus.
   * Useful for triggering validation after user interaction.
   */
  dirty: [value: boolean]
  /**
   * Emitted on change event.
   * Provides access to the raw DOM change event.
   */
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
