<template>
  <div :class="`${cssClass}`">
    <div v-if="prefix" class="form-input-prefix" aria-hidden="true">
      {{ prefix }}
    </div>
    <input
      v-bind="attrs"
      :id="formid"
      v-model="inputValue"
      class="form-input d-flex"
      :name="formid"
      type="number"
      @blur="$emit('dirty', true)"
      @focus="($event.target as any).select()"
    />
    <div v-if="suffix" class="form-input-suffix" aria-hidden="true">
      {{ suffix }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { formId } from 'dkfds-vue3-utils'

const attrs = useAttrs()
const {
  id = null,
  modelValue = 0,
  suffix = null,
  prefix = null,
} = defineProps<{
  id?: string | null
  modelValue?: number | string
  suffix?: string | null
  prefix?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | string]
  dirty: [value: boolean]
  input: [event: Event]
}>()

const { formid } = formId(id, true)

const cssClass = computed((): string => {
  if (suffix) {
    return 'form-input-wrapper form-input-wrapper--suffix'
  }
  if (prefix) {
    return 'form-input-wrapper form-input-wrapper--prefix'
  }
  return 'flex-items-center'
})

const inputValue = computed({
  get() {
    return Number.isNaN(modelValue) ? 0 : modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})
</script>

<style scoped lang="scss"></style>
