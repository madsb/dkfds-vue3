<template>
  <fieldset>
    <legend class="form-label">
      <slot name="label">
        {{ label }}
      </slot>
    </legend>
    <ul class="nobullet-list">
      <li v-for="(radio, index) of choices" :key="index">
        <input
          :id="'radio-' + formid + '-' + index"
          type="radio"
          :name="'radio' + formid"
          :value="radio.value"
          :disabled="radio.disabled"
          :checked="isValueSet && modelValue?.toString() === radio.value.toString()"
          class="form-radio radio-large"
          @change="handleInput"
        />
        <label :for="'radio-' + formid + '-' + index">
          {{ radio.title }}
        </label>

        <div
          v-if="
            isValueSet &&
            $slots[radio.value.toString()] &&
            modelValue?.toString() === radio.value.toString()
          "
          class="radio-content mt-2 ml-4 py-4"
          :class="{ disabled: disabled }"
        >
          <slot :name="radio.value.toString()" :radiovalue="modelValue?.toString()" />
        </div>
      </li>
    </ul>
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FdsOptionItem } from 'dkfds-vue3-utils'
import { formId } from 'dkfds-vue3-utils'

const {
  modelValue = undefined,
  trueLabel = 'Ja',
  falseLabel = 'Nej',
  disabled = false,
  id = null,
  label,
} = defineProps<{
  modelValue?: boolean | undefined | null
  trueLabel?: string
  falseLabel?: string
  disabled?: boolean
  id?: string | null
  label: string
}>()

const choices: Array<FdsOptionItem> = [
  {
    title: trueLabel,
    value: 'true',
    disabled: disabled,
  },
  {
    title: falseLabel,
    value: 'false',
    disabled: disabled,
  },
]

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  dirty: [value: boolean]
}>()

const { formid } = formId(id, true)

const isValueSet = computed(() => modelValue !== undefined && modelValue !== null)

const handleInput = (event: Event) =>
  emit('update:modelValue', (event?.target as HTMLInputElement).value === 'true')
</script>

<style scoped lang="scss"></style>
