---
title: FdsCookiemeddelelse
description: Cookie notice component implementing DKFDS v11 cookiemeddelelse specifications with compliant cookie consent interface
category: layout
dkfds: true
accessibility: WCAG 2.1 AA
tags: [cookie, consent, privacy, gdpr, compliance, legal]
---

# FdsCookiemeddelelse

Cookie notice component implementing DKFDS v11 cookiemeddelelse specifications. Provides compliant cookie consent interface with customizable content and actions. Features proper accessibility attributes, semantic structure, and flexible slots for custom content and action buttons. Default implementation includes accept and reject options with standard Danish text.

## Installation

The FdsCookiemeddelelse component is part of the DKFDS Vue 3 library and is available when you install the package:

```bash
npm install @madsb/dkfds-vue3
# or
pnpm add @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <!-- Basic cookie notice -->
  <FdsCookiemeddelelse 
    @accept="acceptCookies"
    @cancel="rejectCookies"
  />
  
  <!-- Custom header -->
  <FdsCookiemeddelelse 
    header="Cookie Settings"
    @accept="handleCookieAccept"
    @cancel="handleCookieReject"
  />
</template>

<script setup>
import { FdsCookiemeddelelse } from '@madsb/dkfds-vue3'

const acceptCookies = (value) => {
  console.log('Cookies accepted:', value) // true
  // Store consent preference
  localStorage.setItem('cookieConsent', 'accepted')
  // Hide cookie notice
}

const rejectCookies = (value) => {
  console.log('Cookies rejected:', value) // true
  // Store rejection preference
  localStorage.setItem('cookieConsent', 'rejected')
  // Hide cookie notice
}

const handleCookieAccept = (value) => {
  // Custom accept logic
}

const handleCookieReject = (value) => {
  // Custom reject logic
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `header` | `string` | `'Fortæl os om du accepterer cookies'` | No | Header text for the cookie notice. Main heading displayed at the top of the cookie notice. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `accept` | `boolean` (always `true`) | Emitted when user accepts cookies. Fired when the accept button is clicked. |
| `cancel` | `boolean` (always `true`) | Emitted when user rejects cookies. Fired when the cancel/reject button is clicked. |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `default` | None | Cookie notice content text. Defaults to Danish text about data collection and anonymization with link to cookie policy. |
| `header` | None | Cookie notice header content. Allows custom heading markup instead of the default h3 with `header` prop text. |
| `actions` | None | Cookie action buttons. Defaults to "Accepter cookies" and "Nej tak til cookies" buttons with secondary variant. |

## Usage Examples

### Basic Cookie Notice with Event Handlers

```vue
<template>
  <FdsCookiemeddelelse 
    v-if="!cookieConsent"
    @accept="acceptCookies"
    @cancel="rejectCookies"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FdsCookiemeddelelse } from '@madsb/dkfds-vue3'

const cookieConsent = ref(null)

// Check existing consent on mount
onMounted(() => {
  cookieConsent.value = localStorage.getItem('cookieConsent')
})

const acceptCookies = (value) => {
  localStorage.setItem('cookieConsent', 'accepted')
  cookieConsent.value = 'accepted'
  
  // Enable analytics, marketing cookies, etc.
  enableCookieTracking()
}

const rejectCookies = (value) => {
  localStorage.setItem('cookieConsent', 'rejected') 
  cookieConsent.value = 'rejected'
  
  // Only essential cookies
  disableNonEssentialCookies()
}

const enableCookieTracking = () => {
  // Initialize Google Analytics, etc.
}

const disableNonEssentialCookies = () => {
  // Remove tracking scripts, clear existing cookies
}
</script>
```

### Custom Header and Content

```vue
<template>
  <FdsCookiemeddelelse 
    header="Cookie Settings"
    @accept="handleCookieAccept"
    @cancel="handleCookieReject"
  >
    <p>We use cookies to improve your experience and analyze site usage.</p>
    <a href="/privacy-policy">Read our privacy policy</a>
  </FdsCookiemeddelelse>
</template>

<script setup>
import { FdsCookiemeddelelse } from '@madsb/dkfds-vue3'

const handleCookieAccept = (value) => {
  // Custom accept logic
  console.log('User accepted cookies')
}

const handleCookieReject = (value) => {
  // Custom reject logic
  console.log('User rejected cookies')
}
</script>
```

### Advanced Cookie Notice with Custom Actions

```vue
<template>
  <FdsCookiemeddelelse>
    <template #header>
      <h3 class="h3 mt-0 mb-3">Cookie Preferences</h3>
      <p class="text-small">Choose which cookies you want to accept</p>
    </template>
    
    <div class="cookie-content">
      <p>We use different types of cookies. You can choose which ones to accept:</p>
      <ul>
        <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
        <li><strong>Analytics cookies:</strong> Help us understand how you use our site</li>
        <li><strong>Marketing cookies:</strong> Used for targeted advertising</li>
      </ul>
    </div>
    
    <template #actions>
      <div class="cookie-action-grid">
        <FdsButton variant="primary" @click="acceptAll">
          Accept All
        </FdsButton>
        <FdsButton variant="secondary" @click="showSettings">
          Customize Settings
        </FdsButton>
        <FdsButton variant="tertiary" @click="rejectAll">
          Essential Only
        </FdsButton>
      </div>
    </template>
  </FdsCookiemeddelelse>
</template>

<script setup>
import { FdsCookiemeddelelse, FdsButton } from '@madsb/dkfds-vue3'

const acceptAll = () => {
  setCookiePreferences({
    essential: true,
    analytics: true,
    marketing: true
  })
}

const rejectAll = () => {
  setCookiePreferences({
    essential: true,
    analytics: false,
    marketing: false
  })
}

const showSettings = () => {
  // Show detailed cookie settings modal
  openCookieSettingsModal()
}

const setCookiePreferences = (preferences) => {
  localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
  // Apply preferences
  applyCookieSettings(preferences)
}

const openCookieSettingsModal = () => {
  // Implementation for detailed cookie settings
}

const applyCookieSettings = (preferences) => {
  // Apply cookie settings based on preferences
}
</script>

<style scoped>
.cookie-action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.cookie-content ul {
  margin-left: 1.5rem;
}

.cookie-content li {
  margin-bottom: 0.5rem;
}
</style>
```

### GDPR Compliant Implementation

```vue
<template>
  <FdsCookiemeddelelse
    v-if="showCookieNotice"
    header="Vi respekterer dit privatliv"
    @accept="acceptCookies"
    @cancel="rejectCookies"
  >
    <div class="gdpr-content">
      <p>
        Vi bruger cookies for at forbedre din oplevelse på vores hjemmeside. 
        Alle indsamlede data anonymiseres og bruges kun til statistisk analyse.
      </p>
      <p>
        <strong>Dine rettigheder:</strong> Du kan til enhver tid ændre eller trække dit samtykke tilbage.
      </p>
      <div class="cookie-links">
        <a href="/privatlivspolitik">Læs vores privatlivspolitik</a> | 
        <a href="/cookie-politik">Detaljeret cookie-politik</a>
      </div>
    </div>
  </FdsCookiemeddelelse>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FdsCookiemeddelelse } from '@madsb/dkfds-vue3'

const showCookieNotice = ref(false)

onMounted(() => {
  // Check if user has already made a choice
  const consent = localStorage.getItem('gdpr-cookie-consent')
  const consentTimestamp = localStorage.getItem('gdpr-consent-timestamp')
  
  // Show notice if no consent or consent is older than 1 year
  if (!consent || isConsentExpired(consentTimestamp)) {
    showCookieNotice.value = true
  }
})

const acceptCookies = (value) => {
  recordConsent('accepted')
  showCookieNotice.value = false
  initializeAnalytics()
}

const rejectCookies = (value) => {
  recordConsent('rejected')
  showCookieNotice.value = false
  clearNonEssentialCookies()
}

const recordConsent = (choice) => {
  const timestamp = new Date().toISOString()
  
  localStorage.setItem('gdpr-cookie-consent', choice)
  localStorage.setItem('gdpr-consent-timestamp', timestamp)
  localStorage.setItem('gdpr-consent-version', '1.0')
  
  // Log consent for audit purposes (anonymized)
  logConsentChoice(choice, timestamp)
}

const isConsentExpired = (timestamp) => {
  if (!timestamp) return true
  
  const consentDate = new Date(timestamp)
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  
  return consentDate < oneYearAgo
}

const initializeAnalytics = () => {
  // Initialize Google Analytics or other tracking
  console.log('Analytics enabled')
}

const clearNonEssentialCookies = () => {
  // Remove analytics cookies, marketing cookies, etc.
  console.log('Non-essential cookies cleared')
}

const logConsentChoice = (choice, timestamp) => {
  // Log to audit system (ensure data is anonymized)
  console.log(`Consent ${choice} at ${timestamp}`)
}
</script>

<style scoped>
.gdpr-content p {
  margin-bottom: 1rem;
}

.cookie-links {
  margin-top: 1rem;
  font-size: 0.9rem;
}

.cookie-links a {
  color: var(--color-primary);
  text-decoration: underline;
}
</style>
```

## TypeScript Interface

```typescript
export interface FdsCookiemeddelelseProps {
  /** 
   * Header text for the cookie notice
   * Main heading displayed at the top of the cookie notice.
   * @default 'Fortæl os om du accepterer cookies'
   */
  header?: string
}

// Event types
type CookieConsentEvent = (value: boolean) => void

interface FdsCookiemeddelelseEmits {
  /**
   * Emitted when user accepts cookies
   * Fired when the accept button is clicked.
   * 
   * @param value - Always true to indicate acceptance
   */
  accept: CookieConsentEvent
  /**
   * Emitted when user rejects cookies
   * Fired when the cancel/reject button is clicked.
   * 
   * @param value - Always true to indicate rejection
   */
  cancel: CookieConsentEvent
}
```

## Accessibility

The FdsCookiemeddelelse component implements comprehensive accessibility features following DKFDS and WCAG guidelines:

### WCAG 2.1 AA Compliance

- ✅ **Semantic structure**: Uses `role="complementary"` for proper landmark identification
- ✅ **ARIA labeling**: `aria-labelledby` and `aria-describedby` for screen reader context
- ✅ **Keyboard navigation**: Full keyboard accessibility for all interactive elements
- ✅ **Focus management**: Clear focus indicators and logical tab order
- ✅ **Color contrast**: Meets WCAG AA contrast requirements (4.5:1 minimum)

### Screen Reader Support

- **Landmark identification**: `role="complementary"` identifies cookie notice as supplementary content
- **Contextual information**: Header and content properly associated through ARIA
- **Action clarity**: Button text clearly describes the action (accept/reject cookies)
- **Content structure**: Logical heading hierarchy and paragraph structure

### Keyboard Navigation

- **Tab order**: Natural tab flow through header, content, and action buttons
- **Action buttons**: Standard button keyboard interaction (Enter/Space to activate)
- **Focus indicators**: Clear visual indication of focused elements
- **Skip functionality**: Can be dismissed using standard button interaction

### Danish Government Requirements

- Complies with Danish accessibility legislation and GDPR requirements
- Supports assistive technologies commonly used in Denmark
- Provides clear information about cookie usage in Danish language
- Ensures informed consent with accessible controls

## DKFDS Guidelines

### Cookie Notice Standards

The component follows official DKFDS cookiemeddelelse specifications:

```html
<!-- DKFDS structure -->
<div class="cookie-container" role="complementary">
  <div class="cookie-message">
    <div class="cookie-text">
      <div class="h3">Header</div>
      <p>Content</p>
    </div>
    <div class="cookie-actions">
      <ul class="inline-list">
        <li><button class="button button-secondary">Accept</button></li>
        <li><button class="button button-secondary">Reject</button></li>
      </ul>
    </div>
  </div>
</div>
```

### Design Tokens

- **Typography**: Uses DKFDS heading classes (`h3`) and standard paragraph styles
- **Buttons**: Implements secondary button variant for cookie actions
- **Spacing**: Follows DKFDS margin and padding system (`mt-0`, `mb-3`, `ml-4`)
- **Layout**: Uses inline list pattern for action button grouping

### Legal Compliance

- **GDPR compliance**: Enables informed consent with clear accept/reject options
- **Cookie categorization**: Supports granular cookie preferences through slots
- **Audit trail**: Events enable consent logging for legal compliance
- **Accessibility**: Ensures equal access to cookie consent for all users

### Responsive Behavior

- **Mobile optimization**: Button layout adapts to smaller screens
- **Touch targets**: Adequate button sizes for touch interaction
- **Readability**: Text sizing and spacing optimized across devices

## Related Components

- [**FdsButton**](../input/fds-button) - Action buttons used for cookie consent actions
- [**FdsModal**](../feedback/fds-modal) - Modal component for detailed cookie settings
- [**FdsAlert**](../feedback/fds-alert) - Alert component for cookie-related notifications

<!-- Verified against source -->