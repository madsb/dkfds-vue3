<template>
  <select
    :id="formid"
    ref="refElement"
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

import { ref, onMounted } from 'vue'

const { id = null, modelValue: _modelValue = '' } = defineProps<{
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

const onInput = (event: Event) =>
  emit('update:modelValue', (event?.target as HTMLInputElement).value)
const onDirty = () => {
  dirty.value = true
  emit('dirty', true)
}

onMounted(() => {
  ;(refElement.value as any).dispatchEvent(new Event('change'))
})
</script>

<style scoped lang="scss"></style>
