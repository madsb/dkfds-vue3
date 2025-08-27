<template>
  <select
    :id="formid"
    ref="refElement"
    v-model="selectedValue"
    class="form-select"
    :class="{ dirty: dirty }"
    :name="formid"
    @change="onInput"
    @blur="onDirty"
  >
    <slot />
  </select>
</template>

<script setup lang="ts">
import { formId } from '../../composables'
import { ref, computed } from 'vue'

/**
 * Dropdown select component implementing DKFDS v11 select field specifications.
 * 
 * Provides a native select dropdown with v-model binding, dirty state tracking,
 * and proper form integration. Uses slots for option content to maintain
 * flexibility while providing consistent DKFDS styling and behavior.
 * 
 * @component
 * @example Basic dropdown with options
 * ```vue
 * <FdsDropdown v-model="selectedCountry">
 *   <option value="">Choose a country</option>
 *   <option value="dk">Denmark</option>
 *   <option value="no">Norway</option>
 *   <option value="se">Sweden</option>
 * </FdsDropdown>
 * ```
 * 
 * @example In form group with label
 * ```vue
 * <FdsFormgroup :isValid="countryValid">
 *   <template #default="{ formid, ariaDescribedby }">
 *     <FdsLabel :forId="formid" :required="true">Country</FdsLabel>
 *     <FdsHint>Select your country of residence</FdsHint>
 *     <FdsDropdown v-model="selectedCountry" :id="formid">
 *       <option value="">Please select...</option>
 *       <option value="dk">Denmark</option>
 *       <option value="no">Norway</option>
 *       <option value="se">Sweden</option>
 *       <option value="fi">Finland</option>
 *     </FdsDropdown>
 *     <FdsFejlmeddelelse v-if="!countryValid">Please select a country</FdsFejlmeddelelse>
 *   </template>
 * </FdsFormgroup>
 * ```
 * 
 * @example Dropdown with dynamic options
 * ```vue
 * <FdsDropdown v-model="selectedCity" @change="handleCityChange">
 *   <option value="">Select a city</option>
 *   <option v-for="city in cities" :key="city.id" :value="city.id">
 *     {{ city.name }}
 *   </option>
 * </FdsDropdown>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/inputfelter/} DKFDS Input Fields Documentation
 */

export interface FdsDropdownProps {
  /** 
   * Unique identifier for the dropdown.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /** 
   * The v-model value for two-way data binding.
   * Represents the currently selected option value.
   * @default ''
   */
  modelValue?: string
}

const { id, modelValue = '' } = defineProps<FdsDropdownProps>()

const emit = defineEmits<{
  /** 
   * Emitted when selection changes.
   * Used for v-model two-way data binding.
   */
  'update:modelValue': [value: string]
  /** 
   * Emitted when dropdown loses focus.
   * Useful for triggering validation after user interaction.
   */
  dirty: [isDirty: boolean]
  /** 
   * Emitted on change event.
   * Provides access to the raw DOM change event.
   */
  change: [event: Event]
}>()

const { formid } = formId(id, true)
const refElement = ref(null)
const dirty = ref(false)

// Create a computed property for v-model binding
const selectedValue = computed({
  get: () => modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

const onInput = (event: Event) => {
  // The v-model binding already handles the emit, so we just need to emit the change event
  emit('change', event)
}

const onDirty = () => {
  dirty.value = true
  emit('dirty', true)
}
</script>

<style scoped lang="scss"></style>
