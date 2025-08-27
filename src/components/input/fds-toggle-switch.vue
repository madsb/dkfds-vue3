<template>
  <button
    :id="formid"
    type="button"
    class="toggle-switch"
    :class="toggleSwitchClass"
    role="switch"
    :aria-checked="modelValue ? 'true' : 'false'"
    :aria-describedby="computedAriaDescribedby"
    :disabled="disabled"
    @click="handleToggle"
  >
    <span>
      <slot>{{ modelValue ? onText : offText }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, inject, isRef, type Ref } from 'vue'
import { formId } from '../../composables'

/**
 * Toggle switch component implementing DKFDS v11 switch specifications.
 * 
 * Provides an on/off binary control with proper accessibility attributes
 * and customizable text labels. Uses ARIA switch role for optimal screen
 * reader support and follows DKFDS toggle switch interaction patterns.
 * 
 * @component
 * @example Basic toggle switch
 * ```vue
 * <FdsToggleSwitch v-model="isEnabled" />
 * ```
 * 
 * @example Toggle switch with custom labels
 * ```vue
 * <FdsToggleSwitch 
 *   v-model="notifications" 
 *   onText="Enabled"
 *   offText="Disabled"
 * />
 * ```
 * 
 * @example Toggle switch with custom content
 * ```vue
 * <FdsToggleSwitch v-model="darkMode">
 *   {{ darkMode ? 'Dark Mode On' : 'Dark Mode Off' }}
 * </FdsToggleSwitch>
 * ```
 * 
 * @example In form group with label and description
 * ```vue
 * <FdsFormgroup>
 *   <template #default="{ formid, ariaDescribedby }">
 *     <FdsLabel :forId="formid">Email Notifications</FdsLabel>
 *     <FdsHint>Receive email updates about your account</FdsHint>
 *     <FdsToggleSwitch 
 *       v-model="emailNotifications" 
 *       :id="formid"
 *       onText="On"
 *       offText="Off"
 *     />
 *   </template>
 * </FdsFormgroup>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/inputfelter/} DKFDS Input Fields Documentation
 */

export interface FdsToggleSwitchProps {
  /** 
   * Unique identifier for the toggle switch.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /** 
   * The v-model boolean value for two-way data binding.
   * True represents the "on" state, false represents "off".
   * @default false
   */
  modelValue?: boolean
  /** 
   * Whether the toggle switch is disabled.
   * Prevents user interaction and applies disabled styling.
   * @default false
   */
  disabled?: boolean
  /** 
   * Text to display when toggle is in the "off" state.
   * Only used if no slot content is provided.
   * @default 'Fra' (Danish for 'Off')
   */
  offText?: string
  /** 
   * Text to display when toggle is in the "on" state.
   * Only used if no slot content is provided.
   * @default 'Til' (Danish for 'On')
   */
  onText?: string
  /** 
   * Additional CSS classes to apply to the toggle switch.
   * @default ''
   */
  class?: string
}

const {
  id,
  modelValue = false,
  disabled = false,
  offText = 'Fra',
  onText = 'Til',
  class: className = '',
} = defineProps<FdsToggleSwitchProps>()

const emit = defineEmits<{
  /** 
   * Emitted when toggle state changes.
   * Used for v-model two-way data binding.
   */
  'update:modelValue': [value: boolean]
  /** 
   * Emitted on click event.
   * Provides access to the raw DOM click event.
   */
  click: [event: MouseEvent]
}>()

const { formid } = formId(id, true)

// Inject aria-describedby from formgroup if available
const injectedAriaDescribedby = inject<string | Ref<string> | undefined>(
  'ariaDescribedby',
  undefined,
)
const computedAriaDescribedby = computed((): string | undefined => {
  if (injectedAriaDescribedby) {
    return isRef(injectedAriaDescribedby) ? injectedAriaDescribedby.value : injectedAriaDescribedby
  }
  return undefined
})

/**
 * Compute toggle switch classes
 */
const toggleSwitchClass = computed((): string => {
  const classes: string[] = []

  if (className) {
    classes.push(className)
  }

  return classes.join(' ')
})

/**
 * Handle toggle state change
 */
const handleToggle = (event: MouseEvent) => {
  if (disabled) return

  const newValue = !modelValue
  emit('update:modelValue', newValue)
  emit('click', event)
}
</script>

<style scoped lang="scss"></style>
