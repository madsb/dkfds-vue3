<template>
  <div class="component-description">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Preview description item component implementing DKFDS v11 component description specifications.
 *
 * Container for descriptive text and documentation content within component previews.
 * Provides semantic wrapper for explanatory content, usage notes, and component
 * descriptions. Works within FdsPreview layouts for comprehensive documentation.
 *
 * @component
 * @example Basic description item
 * ```vue
 * <FdsPreview header="Alert Component">
 *   <FdsPreviewItem>
 *     <p>Alerts provide important messages to users with contextual styling.</p>
 *   </FdsPreviewItem>
 *   <FdsPreviewExample>
 *     <FdsAlert type="success">Success message</FdsAlert>
 *   </FdsPreviewExample>
 * </FdsPreview>
 * ```
 *
 * @example Detailed component documentation
 * ```vue
 * <FdsPreview header="Form Input">
 *   <FdsPreviewItem>
 *     <h4>Usage Guidelines</h4>
 *     <ul>
 *       <li>Always pair with a label for accessibility</li>
 *       <li>Use appropriate input types for validation</li>
 *       <li>Provide clear placeholder text when needed</li>
 *     </ul>
 *   </FdsPreviewItem>
 *   <FdsPreviewExample>
 *     <FdsFormGroup>
 *       <FdsLabel>Email Address</FdsLabel>
 *       <FdsInput type="email" placeholder="user@example.com" />
 *     </FdsFormGroup>
 *   </FdsPreviewExample>
 * </FdsPreview>
 * ```
 *
 * @example Multiple description sections
 * ```vue
 * <FdsPreview header="Button Component">
 *   <FdsPreviewItem>
 *     <p><strong>Primary buttons</strong> are for main actions.</p>
 *   </FdsPreviewItem>
 *   <FdsPreviewExample>
 *     <FdsButton>Primary Action</FdsButton>
 *   </FdsPreviewExample>
 *   <FdsPreviewItem>
 *     <p><strong>Secondary buttons</strong> are for alternative actions.</p>
 *   </FdsPreviewItem>
 *   <FdsPreviewExample>
 *     <FdsButton variant="secondary">Secondary Action</FdsButton>
 *   </FdsPreviewExample>
 * </FdsPreview>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/} DKFDS Documentation
 */
</script>
