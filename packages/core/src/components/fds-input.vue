<template>
  <div :class="wrapperClass">
    <div v-if="props.prefix" class="form-input-prefix" aria-hidden="true">
      {{ props.prefix }}
    </div>
    <input
      v-bind="attrs"
      :id="formid"
      v-model="inputValue"
      :type="props.type"
      :class="inputClass"
      :name="formid"
      :aria-describedby="computedAriaDescribedby"
      @input="handleInput"
      @blur="handleBlur"
    />
    <div v-if="props.suffix" class="form-input-suffix" aria-hidden="true">
      {{ props.suffix }}
    </div>
    <slot name="button" />
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs, inject, isRef, type Ref } from 'vue'
import { formId } from 'dkfds-vue3-utils'

const attrs = useAttrs()

interface Props {
  /** Unique identifier for the input */
  id?: string | null
  /** The v-model value */
  modelValue?: string
  /** Suffix text displayed after the input */
  suffix?: string | null
  /** Prefix text displayed before the input */
  prefix?: string | null
  /** Input type attribute */
  type?: string
  /** Width class for input sizing */
  widthClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
  modelValue: '',
  suffix: null,
  prefix: null,
  type: 'text',
  widthClass: '',
})

const emit = defineEmits<{
  /** Emitted when input value changes */
  'update:modelValue': [value: string]
  /** Emitted when input loses focus */
  dirty: [isDirty: boolean]
  /** Emitted on input event */
  input: [event: Event]
}>()
const slots = useSlots()

const { formid } = formId(props.id, true)

// Inject aria-describedby from formgroup if available
const injectedAriaDescribedby = inject<string | Ref<string> | undefined>(
  'ariaDescribedby',
  undefined,
)
const computedAriaDescribedby = computed((): string | undefined => {
  // Use explicitly provided aria-describedby from attrs
  if (attrs['aria-describedby']) {
    return attrs['aria-describedby'] as string
  }
  // Otherwise use injected value from formgroup
  if (injectedAriaDescribedby) {
    return isRef(injectedAriaDescribedby) ? injectedAriaDescribedby.value : injectedAriaDescribedby
  }
  return undefined
})

/**
 * Compute wrapper classes based on props
 */
const wrapperClass = computed((): string => {
  const classes: string[] = []

  if (props.suffix) {
    classes.push('form-input-wrapper', 'form-input-wrapper--suffix')
  } else if (props.prefix) {
    classes.push('form-input-wrapper', 'form-input-wrapper--prefix')
  } else if (slots.button) {
    classes.push('search')
  }

  return classes.join(' ')
})

/**
 * Compute input classes including width classes
 */
const inputClass = computed((): string => {
  const classes = ['form-input']

  if (props.widthClass) {
    classes.push(props.widthClass)
  }

  return classes.join(' ')
})

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  },
})

/**
 * Handle input event
 */
const handleInput = (event: Event) => {
  emit('input', event)
}

/**
 * Handle blur event
 */
const handleBlur = () => {
  emit('dirty', true)
}
</script>

<style scoped lang="scss"></style>
