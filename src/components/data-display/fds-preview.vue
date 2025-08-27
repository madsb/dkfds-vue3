<template>
  <div class="component-preview component-preview-details mb-4" :aria-label="header">
    <div class="component-link">
      {{ header }}

      <a v-if="href" :href="href" target="designsystem">
        {{ linkText }}
      </a>
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
/**
 * Preview container component implementing DKFDS v11 component preview specifications.
 * 
 * Container for demonstrating and documenting component examples with optional links to 
 * design system documentation. Designed for documentation sites, style guides, and 
 * component libraries to showcase components in isolation.
 * 
 * @component
 * @example Basic component preview
 * ```vue
 * <FdsPreview header="Button Component">
 *   <FdsButton>Example Button</FdsButton>
 * </FdsPreview>
 * ```
 * 
 * @example Preview with design system link
 * ```vue
 * <FdsPreview 
 *   header="Alert Component"
 *   href="https://designsystem.dk/komponenter/alerts/"
 *   link-text="View in Design System"
 * >
 *   <FdsAlert type="success">Success message example</FdsAlert>
 * </FdsPreview>
 * ```
 * 
 * @example Multiple component examples
 * ```vue
 * <FdsPreview header="Form Components">
 *   <FdsFormGroup>
 *     <FdsLabel>Example Label</FdsLabel>
 *     <FdsInput placeholder="Example input" />
 *   </FdsFormGroup>
 *   <FdsButton class="mt-3">Submit</FdsButton>
 * </FdsPreview>
 * ```
 * 
 * @example Documentation preview layout
 * ```vue
 * <div class="documentation">
 *   <FdsPreview 
 *     header="Navigation Components"
 *     href="/docs/navigation"
 *     link-text="Full Documentation"
 *   >
 *     <FdsBreadcrumb :items="breadcrumbItems" />
 *     <FdsMenu :items="menuItems" />
 *   </FdsPreview>
 * </div>
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/} DKFDS Documentation
 */
export interface FdsPreviewProps {
  /** 
   * Header text describing the component or example being previewed
   * Displayed prominently above the preview content
   */
  header?: string
  /** 
   * Optional URL linking to related documentation or design system page
   * Opens in 'designsystem' target window when provided
   */
  href?: string
  /** 
   * Custom text for the documentation link
   * Only shown when href prop is provided
   * @default 'Design System'
   */
  linkText?: string
}

const {
  header,
  href,
  linkText = 'Design System',
} = defineProps<FdsPreviewProps>()
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
