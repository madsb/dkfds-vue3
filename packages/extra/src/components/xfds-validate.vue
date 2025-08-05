<template>
  <section :id="validateId" ref="refElement" class="validate-form-group">
    <slot
      :is-valid="isValid"
      :is-valid-wait-for-dirty="isValidWaitForDirty"
      :error-message="errorMessage"
    />
  </section>
</template>

<script setup lang="ts">
import { generateId, validateAllErrorMessage } from 'dkfds-vue3-utils'
import { computed, onMounted, provide, ref, watch } from 'vue'
import { ValidatorItem } from '../service/validator.service'

const {
  modelValue = null,
  id = null,
  validateFlow = 'normal', // eslint-disable-line no-unused-vars
  dirty = false,
  useAutoDirty = true,
  validations = [
    (input: unknown) => {
      if (!input) {
        return 'Indtast data'
      }
      return null
    },
  ],
} = defineProps<{
  modelValue?: string | number | Array<unknown> | null
  id?: string | null
  validateFlow?: string
  dirty?: boolean
  useAutoDirty?: boolean
  validations?: Array<(_?: unknown) => string | null>
}>()

const emit = defineEmits<{
  valid: [isValid: boolean]
  validated: [item: ValidatorItem]
}>()

const isValid = ref(false)
const isValidWaitForDirty = ref(true)
const errorMessage = ref('')
const errorMessages = ref<Array<string>>([])
const refElement = ref(null)
const localDirty = ref(false)

const validateId = generateId(id)
/**
 * Provide for underliggende Inputs
 * Hhv om validering gik godt eller fejlbesked
 */
provide('provideIsValid', isValidWaitForDirty)
provide('provideErrorMessage', errorMessage)

onMounted(() => {
  if (!refElement.value || !useAutoDirty) {
    return
  }
  ;(refElement.value as HTMLElement)
    .querySelector('input, select')
    ?.addEventListener('blur', () => {
      localDirty.value = true
    })
})

// const hasValue = (): boolean => {
//   if (typeof props.modelValue === 'string') {
//     return props.modelValue.length > 0;
//   }
//   if (Array.isArray(props.modelValue)) {
//     return false;
//   }
//   return false;
// };

const updateCollection = () => {
  const currentItem = {
    key: validateId.value,
    type: '',
    valid: isValid.value,
    reasons: errorMessages.value,
    dirty: localDirty.value,
  } as ValidatorItem

  emit('validated', currentItem)
}

const touched = computed(() => localDirty.value || dirty)

const isFormValid = () => {
  isValid.value = true
  isValidWaitForDirty.value = true
  errorMessage.value = ''
  errorMessages.value = []
  if (validations) {
    const vals = [...validations]
    const result: string[] = validateAllErrorMessage(...vals)(modelValue)

    if (result.length > 0) {
      ;[errorMessage.value] = result
      errorMessages.value = result
      isValid.value = false
      if (touched.value) {
        isValidWaitForDirty.value = false
      }
    }
  }
  updateCollection()

  emit('valid', isValid.value)
}

watch(
  () => modelValue,
  () => {
    isFormValid()
  },
  {
    immediate: true,
    deep: true,
  },
)
watch(
  () => localDirty,
  () => {
    isFormValid()
  },
  {
    deep: true,
  },
)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
