<template>
  <fieldset>
    <input
      :id="formid"
      type="checkbox"
      class="form-checkbox"
      :checked="refValue"
      :class="{ 'checkbox-large': size === 'large' }"
      v-bind="attrs"
      @input="onInput"
      @blur="$emit('dirty', true)"
    />
    <label :for="formid" class="hand">
      <slot :id="formid" class="hand"></slot>
    </label>
    <div
      v-if="$slots.content"
      :id="`collapse-${formid}`"
      :aria-hidden="!refValue"
      class="checkbox-content checkbox-content-large"
    >
      <slot name="content" />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch, useAttrs } from 'vue'
import { formId } from 'dkfds-vue3-utils'

const attrs = useAttrs()

const {
  id = null,
  modelValue = false,
  /** Vis som lille checkbox */
  size = 'large',
} = defineProps<{
  id?: string | null
  modelValue?: boolean
  size?: 'small' | 'large'
}>()

const emit = defineEmits<{
  'update:modelValue': [checked: boolean]
  dirty: [isDirty: boolean]
}>()

const { formid } = formId(id, true)
const refValue = ref(modelValue)

const onInput = (event: Event) =>
  emit('update:modelValue', (event?.target as HTMLInputElement).checked)

watch(
  () => [modelValue],
  () => {
    refValue.value = modelValue
  },
  {
    immediate: true,
  },
)
</script>
