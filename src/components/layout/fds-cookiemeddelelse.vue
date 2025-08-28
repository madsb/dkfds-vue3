<template>
  <div
    class="cookie-container"
    role="complementary"
    aria-labelledby="cookie-message-heading"
    aria-describedby="cookie-message-text"
  >
    <div class="cookie-message">
      <div class="cookie-text">
        <slot name="header">
          <div id="cookie-message-heading" class="h3 mt-0 mb-3">
            {{ header }}
          </div>
        </slot>
        <slot>
          <p id="cookie-message-text" class="mt-0">
            Vi indsamler statistik ved hjælp af cookies. Alle indsamlede data anonymiseres.
            <a href="#"> Læs mere om vores brug af cookies. </a>
          </p>
        </slot>
      </div>
      <div class="cookie-actions">
        <slot name="actions">
          <ul class="inline-list">
            <li>
              <fds-button variant="secondary" @click="$emit('accept', true)">
                Accepter cookies
              </fds-button>
            </li>
            <li class="ml-4">
              <fds-button variant="secondary" @click="$emit('cancel', true)">
                Nej tak til cookies
              </fds-button>
            </li>
          </ul>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Cookie notice component implementing DKFDS v11 cookiemeddelelse specifications.
 *
 * Provides compliant cookie consent interface with customizable content and actions.
 * Features proper accessibility attributes, semantic structure, and flexible slots
 * for custom content and action buttons. Default implementation includes accept
 * and reject options with standard Danish text.
 *
 * @component
 * @example Basic cookie notice
 * ```vue
 * <fds-cookiemeddelelse
 *   @accept="acceptCookies"
 *   @cancel="rejectCookies"
 * />
 * ```
 *
 * @example Custom header and content
 * ```vue
 * <fds-cookiemeddelelse
 *   header="Cookie Settings"
 *   @accept="handleCookieAccept"
 *   @cancel="handleCookieReject"
 * >
 *   <p>We use cookies to improve your experience and analyze site usage.</p>
 *   <a href="/privacy-policy">Read our privacy policy</a>
 * </fds-cookiemeddelelse>
 * ```
 *
 * @example Custom actions
 * ```vue
 * <fds-cookiemeddelelse>
 *   <template #header>
 *     <h3>Cookie Preferences</h3>
 *   </template>
 *
 *   <p>We use different types of cookies. You can choose which ones to accept.</p>
 *
 *   <template #actions>
 *     <fds-button @click="acceptAll">Accept All</fds-button>
 *     <fds-button variant="secondary" @click="showSettings">Customize</fds-button>
 *     <fds-button variant="tertiary" @click="rejectAll">Reject All</fds-button>
 *   </template>
 * </fds-cookiemeddelelse>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/cookiemeddelelse/} DKFDS Cookie Notice Documentation
 */
export interface FdsCookiemeddelelseProps {
  /**
   * Header text for the cookie notice
   * Main heading displayed at the top of the cookie notice.
   * @default 'Fortæl os om du accepterer cookies'
   */
  header?: string
}

const { header = 'Fortæl os om du accepterer cookies' } = defineProps<FdsCookiemeddelelseProps>()

defineEmits<{
  /**
   * Emitted when user accepts cookies
   * Fired when the accept button is clicked.
   *
   * @param value - Always true to indicate acceptance
   */
  accept: [value: boolean]
  /**
   * Emitted when user rejects cookies
   * Fired when the cancel/reject button is clicked.
   *
   * @param value - Always true to indicate rejection
   */
  cancel: [value: boolean]
}>()
</script>
