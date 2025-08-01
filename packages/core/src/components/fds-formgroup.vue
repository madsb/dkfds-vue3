<template>
  <div
    :key="formid"
    class="form-group"
    :class="{ 'form-error': compValid === false }">
    <slot :formid="formid" />
  </div>
</template>

<script setup lang="ts">
import { computed,  inject, provide, ref } from 'vue';
import { formId } from 'dkfds-vue3-utils';

const {
  id = null,
  isValid = true,
} = defineProps<{
  id?: string | null;
  isValid?: boolean;
}>();

/**
 * Form id der bruges i slots
 * eg. label for input element
 */
const { formid } = formId(id, true);
/**
 * Provide for underliggende elementer
 * eg. label for input element
 */
provide('formid', formid);

const injIsValid = ref<boolean | null>(inject('provideIsValid', null));

const compValid = computed(() => injIsValid.value ?? isValid);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
