<template>
  <div :key="formid" class="form-group" :class="{ 'form-error': compValid === false }">
    <slot :formid="formid" :ariaDescribedby="ariaDescribedby" />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide, ref } from 'vue'
import { formId } from 'dkfds-vue3-utils'

const { id = null, isValid = true } = defineProps<{
  id?: string | null
  isValid?: boolean
}>()

/**
 * Form id der bruges i slots
 * eg. label for input element
 */
const { formid } = formId(id, true)

/**
 * Generate IDs for hint and error elements
 */
const hintId = computed(() => `${formid.value}-hint`)
const errorId = computed(() => `${formid.value}-error`)

/**
 * Build aria-describedby value for input elements
 * Combines hint and error IDs when applicable
 */
const ariaDescribedby = computed(() => {
  const ids: string[] = []
  // Add hint ID (always present for consistency)
  ids.push(hintId.value)
  // Add error ID when invalid
  if (compValid.value === false) {
    ids.push(errorId.value)
  }
  return ids.join(' ').trim()
})

/**
 * Provide for underliggende elementer
 * eg. label for input element
 */
provide('formid', formid)
provide('hintId', hintId)
provide('errorId', errorId)
provide('ariaDescribedby', ariaDescribedby)

const injIsValid = ref<boolean | null>(inject('provideIsValid', null))

const compValid = computed(() => injIsValid.value ?? isValid)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
