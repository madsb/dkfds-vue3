<template>
  <fieldset>
    <legend class="form-label">
      <slot name="label">
        {{ label }}
      </slot>
    </legend>
    <ul :id="formid" class="nobullet-list">
      <li v-for="(radio, index) of list" :key="index">
        <input
          :id="'radio-' + formid + '-' + index"
          type="radio"
          :name="'radio' + formid"
          :value="radio.value"
          :disabled="radio.disabled"
          :aria-disabled="radio.ariaDisabled"
          :checked="value === radio.value.toString()"
          class="form-radio radio-large"
          @change="handleInput"
          @blur="$emit('dirty', true)"
        />
        <label :for="'radio-' + formid + '-' + index">
          {{ radio.title }}
        </label>

        <div
          v-if="$slots[radio.value] && modelValue === radio.value.toString()"
          class="radio-content mt-2 ml-4 py-4"
        >
          <slot :name="radio.value" :radiovalue="value" />
        </div>
      </li>
    </ul>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsOptionItem } from 'dkfds-vue3-utils'
import { formId } from 'dkfds-vue3-utils'

const {
  modelValue = null,
  list,
  id = null,
  label,
} = defineProps<{
  modelValue?: string | null
  list: Array<FdsOptionItem>
  id?: string | null
  label: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  dirty: [value: boolean]
}>()

const { formid } = formId(id)
const value = ref(modelValue)

const handleInput = (event: Event) =>
  emit('update:modelValue', (event?.target as HTMLInputElement).value)
</script>

<style scoped lang="scss"></style>
