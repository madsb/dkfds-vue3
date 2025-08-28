<template>
  <div class="component-code" aria-hidden="true">
    <legend v-if="header">
      {{ header }}
    </legend>
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Preview code section component implementing DKFDS v11 code documentation specifications.
 *
 * Container for displaying code examples within component documentation. Designed to work
 * with FdsPreview parent component to create comprehensive component documentation with
 * live examples and corresponding code.
 *
 * @component
 * @example Basic code section
 * ```vue
 * <FdsPreview header="Button Example">
 *   <FdsPreviewExample>
 *     <FdsButton>Click me</FdsButton>
 *   </FdsPreviewExample>
 *   <FdsPreviewCode header="HTML">
 *     <FdsPre code="<FdsButton>Click me</FdsButton>" />
 *   </FdsPreviewCode>
 * </FdsPreview>
 * ```
 *
 * @example Multiple code sections
 * ```vue
 * <FdsPreview header="Form Example">
 *   <FdsPreviewExample>
 *     <FdsInput v-model="value" placeholder="Enter text" />
 *   </FdsPreviewExample>
 *   <FdsPreviewCode header="Vue Template">
 *     <FdsPre code="<FdsInput v-model=\"value\" placeholder=\"Enter text\" />" />
 *   </FdsPreviewCode>
 *   <FdsPreviewCode header="JavaScript">
 *     <FdsPre code="const value = ref('')" />
 *   </FdsPreviewCode>
 * </FdsPreview>
 * ```
 *
 * @example Code section without header
 * ```vue
 * <FdsPreviewCode>
 *   <FdsPre :json="{ type: 'success', message: 'Operation completed' }" />
 * </FdsPreviewCode>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/} DKFDS Documentation
 */
export interface FdsPreviewCodeProps {
  /**
   * Optional header text for the code section
   * Useful for distinguishing between different code examples (HTML, CSS, JS)
   * @default null
   */
  header?: string | null
}

const { header = null } = defineProps<FdsPreviewCodeProps>()
</script>
