<template>
  <div class="card-group" :class="getClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Card group container implementing DKFDS v11 card group specifications.
 *
 * Layout container for organizing multiple cards with responsive grid behavior.
 * Provides different layout types for various design needs and automatically
 * handles card spacing and alignment. Essential for dashboard and content listing interfaces.
 *
 * @component
 * @example Basic card group with default layout
 * ```vue
 * <FdsCardGroup>
 *   <FdsCard header="Card 1">Content for first card</FdsCard>
 *   <FdsCard header="Card 2">Content for second card</FdsCard>
 *   <FdsCard header="Card 3">Content for third card</FdsCard>
 * </FdsCardGroup>
 * ```
 *
 * @example Deck layout for uniform card heights
 * ```vue
 * <FdsCardGroup type="deck">
 *   <FdsCard header="Short Content">Brief description</FdsCard>
 *   <FdsCard header="Longer Content">
 *     This card has much more content that extends to multiple lines
 *     and potentially several paragraphs of information.
 *   </FdsCard>
 *   <FdsCard header="Medium Content">Moderate amount of content</FdsCard>
 * </FdsCardGroup>
 * ```
 *
 * @example Columns layout for masonry-style arrangement
 * ```vue
 * <FdsCardGroup type="columns">
 *   <FdsCard header="News Article" subheader="Today">
 *     Latest news content with varying lengths
 *   </FdsCard>
 *   <FdsCard header="Quick Update" subheader="2 hours ago">
 *     Brief update
 *   </FdsCard>
 *   <FdsCard header="Feature Story" subheader="Yesterday">
 *     Longer feature story with detailed content that spans multiple lines
 *   </FdsCard>
 * </FdsCardGroup>
 * ```
 *
 * @example Navigation cards in group
 * ```vue
 * <FdsCardGroup type="deck">
 *   <FdsCard header="Services" to="/services" icon="arrow-forward">
 *     Explore our available services
 *   </FdsCard>
 *   <FdsCard header="Support" to="/support" icon="arrow-forward">
 *     Get help with your account
 *   </FdsCard>
 *   <FdsCard header="Documentation" to="https://docs.example.com" icon="open-in-new">
 *     Read our comprehensive guides
 *   </FdsCard>
 * </FdsCardGroup>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/cards/} DKFDS Card Documentation
 */
import { computed } from 'vue'

export interface FdsCardGroupProps {
  /**
   * Layout type controlling card arrangement and behavior
   * - 'deck': Cards maintain equal heights in each row
   * - 'columns': Masonry-style layout with natural content flow
   * - null: Default grid layout with natural card heights
   * @values 'deck', 'columns', null
   * @default null
   */
  type?: 'deck' | 'columns' | null
}

const { type = null } = defineProps<FdsCardGroupProps>()

const getClass = computed(() => type ?? 'normal')
</script>
