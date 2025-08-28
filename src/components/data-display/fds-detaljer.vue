<template>
  <details class="details">
    <summary class="details-summary">
      <slot name="header">
        {{ header }}
      </slot>
    </summary>
    <div class="details-text">
      <slot />
    </div>
  </details>
</template>
<script setup lang="ts">
/**
 * Details/disclosure component implementing DKFDS v11 detaljer specifications.
 *
 * Provides a collapsible content section using native HTML details/summary elements for optimal
 * accessibility and browser support. Useful for FAQ sections, progressive disclosure of information,
 * and optional content that doesn't need to be visible by default.
 *
 * @component
 * @example Basic details with default header
 * ```vue
 * <FdsDetaljer>
 *   This content is hidden by default and can be expanded by the user.
 * </FdsDetaljer>
 * ```
 *
 * @example Custom header text
 * ```vue
 * <FdsDetaljer header="Frequently Asked Questions">
 *   <p>Here are answers to common questions about our service.</p>
 *   <ul>
 *     <li>Question 1: Answer 1</li>
 *     <li>Question 2: Answer 2</li>
 *   </ul>
 * </FdsDetaljer>
 * ```
 *
 * @example Custom header slot with rich content
 * ```vue
 * <FdsDetaljer>
 *   <template #header>
 *     <strong>Advanced Settings</strong>
 *     <span class="text-muted">(Optional)</span>
 *   </template>
 *
 *   <FdsFormGroup>
 *     <FdsLabel>Advanced Option</FdsLabel>
 *     <FdsInput v-model="advancedSetting" />
 *   </FdsFormGroup>
 * </FdsDetaljer>
 * ```
 *
 * @example Multiple details sections
 * ```vue
 * <div>
 *   <FdsDetaljer header="Privacy Policy">
 *     Privacy policy content...
 *   </FdsDetaljer>
 *
 *   <FdsDetaljer header="Terms of Service">
 *     Terms of service content...
 *   </FdsDetaljer>
 *
 *   <FdsDetaljer header="Cookie Policy">
 *     Cookie policy information...
 *   </FdsDetaljer>
 * </div>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/detaljer/} DKFDS Details Documentation
 */
export interface FdsDetaljerProps {
  /**
   * Header text displayed in the clickable summary area
   * This text invites users to expand the details section
   * @default 'Mere information'
   */
  header?: string
}

const {
  /** Overskrift */
  header = 'Mere information',
} = defineProps<FdsDetaljerProps>()
</script>
