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
import { formId } from 'dkfds-vue3-utils'

import { ref, watch, computed } from 'vue'

const { id = null, modelValue = '' } = defineProps<{
  id?: string | null
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  dirty: [isDirty: boolean]
  change: [event: Event]
}>()

const { formid } = formId(id, true)
const refElement = ref(null)
const dirty = ref(false)

// Create a computed property for v-model binding
const selectedValue = computed({
  get: () => modelValue,
  set: (value: string) => emit('update:modelValue', value)
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
