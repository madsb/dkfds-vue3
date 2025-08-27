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

/**
 * Radio group component implementing DKFDS v11 radio button specifications.
 * 
 * Provides a semantic fieldset for grouping related radio button options with
 * proper accessibility attributes, label management, and coordinated selection
 * state. Manages the shared name attribute and value synchronization for
 * child radio items following DKFDS radio group patterns.
 * 
 * @component
 * @example Basic radio group
 * ```vue
 * <FdsRadioGroup v-model="selectedOption" label="Choose an option">
 *   <FdsRadioItem value="option1">Option 1</FdsRadioItem>
 *   <FdsRadioItem value="option2">Option 2</FdsRadioItem>
 *   <FdsRadioItem value="option3">Option 3</FdsRadioItem>
 * </FdsRadioGroup>
 * ```
 * 
 * @example Radio group with help text
 * ```vue
 * <FdsRadioGroup 
 *   v-model="paymentMethod" 
 *   label="Payment Method"
 *   helpText="Select your preferred payment option"
 * >
 *   <FdsRadioItem value="card">Credit Card</FdsRadioItem>
 *   <FdsRadioItem value="bank">Bank Transfer</FdsRadioItem>
 *   <FdsRadioItem value="cash">Cash</FdsRadioItem>
 * </FdsRadioGroup>
 * ```
 * 
 * @example Radio group with conditional content
 * ```vue
 * <FdsRadioGroup v-model="contactMethod" label="How should we contact you?">
 *   <FdsRadioItem value="email">Email</FdsRadioItem>
 *   <FdsRadioItem value="phone">Phone
 *     <template #content>
 *       <FdsLabel>Phone number</FdsLabel>
 *       <FdsInput v-model="phoneNumber" type="tel" />
 *     </template>
 *   </FdsRadioItem>
 * </FdsRadioGroup>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/radioknap/} DKFDS Radio Button Documentation
 */

export interface FdsRadioGroupProps {
  /** 
   * The v-model value for two-way data binding.
   * Represents the currently selected radio option value.
   * @default null
   */
  modelValue?: string | number | boolean | null
  /** 
   * Unique identifier for the radio group.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /** 
   * Label for the radio group displayed in the legend.
   * Required for accessibility and user clarity.
   */
  label: string
  /** 
   * Help text providing additional context for the radio group.
   * Displayed below the legend and linked via aria-describedby.
   * @default ''
   */
  helpText?: string
  /** 
   * Name attribute for all radio buttons in the group.
   * If not provided, uses the generated form ID.
   * @default undefined (uses 'radio-{formid}')
   */
  name?: string
}

const { modelValue, id, label, helpText = '', name } = defineProps<FdsRadioGroupProps>()

const emit = defineEmits<{
  /** 
   * Emitted when radio selection changes.
   * Used for v-model two-way data binding.
   */
  'update:modelValue': [value: string | number | boolean]
  /** 
   * Emitted when any radio button in the group loses focus.
   * Useful for triggering validation after user interaction.
   */
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
