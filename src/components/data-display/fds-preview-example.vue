<template>
  <div class="component-example" aria-label="Eksempel">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Preview example section component implementing DKFDS v11 component example specifications.
 *
 * Container for displaying live component examples within documentation previews. Provides
 * proper semantic markup and accessibility labeling for interactive examples. Designed to
 * work with FdsPreview and FdsPreviewCode for complete documentation layouts.
 *
 * @component
 * @example Basic example section
 * ```vue
 * <FdsPreview header="Button Variants">
 *   <FdsPreviewExample>
 *     <FdsButton>Primary Button</FdsButton>
 *     <FdsButton variant="secondary">Secondary</FdsButton>
 *     <FdsButton variant="tertiary">Tertiary</FdsButton>
 *   </FdsPreviewExample>
 * </FdsPreview>
 * ```
 *
 * @example Interactive form example
 * ```vue
 * <FdsPreview header="Form Components">
 *   <FdsPreviewExample>
 *     <FdsFormGroup>
 *       <FdsLabel for="demo-input">Demo Input</FdsLabel>
 *       <FdsInput id="demo-input" v-model="demoValue" />
 *     </FdsFormGroup>
 *     <FdsButton @click="submitDemo">Submit</FdsButton>
 *   </FdsPreviewExample>
 *   <FdsPreviewCode>
 *     <FdsPre :code="formExampleCode" />
 *   </FdsPreviewCode>
 * </FdsPreview>
 * ```
 *
 * @example Complex layout example
 * ```vue
 * <FdsPreview header="Card Layout">
 *   <FdsPreviewExample>
 *     <FdsCardGroup type="deck">
 *       <FdsCard header="Card 1">Example content</FdsCard>
 *       <FdsCard header="Card 2">More content</FdsCard>
 *       <FdsCard header="Card 3">Final content</FdsCard>
 *     </FdsCardGroup>
 *   </FdsPreviewExample>
 * </FdsPreview>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/} DKFDS Documentation
 */
</script>
