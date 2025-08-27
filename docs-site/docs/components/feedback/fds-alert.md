---
title: FdsAlert
description: DKFDS v11 alert component for displaying important messages with different severity levels and accessibility support
category: feedback
dkfds: true
accessibility: WCAG 2.1 AA
tags: [alerts, messages, notifications, feedback, accessibility, aria, dismissible]
---

# FdsAlert

DKFDS v11 compliant alert component for displaying important messages to users with different severity levels (info, success, warning, error). Supports both dismissible and persistent alerts with proper ARIA attributes for accessibility and screen reader announcements.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsAlert variant="info">
    Your information has been saved successfully.
  </FdsAlert>
</template>

<script setup>
import { FdsAlert } from '@madsb/dkfds-vue3'
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `header` | `string \| null` | `null` | No | Optional header text displayed as prominent heading above alert content |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | No | Alert variant determining visual style and semantic meaning |
| `showIcon` | `boolean` | `false` | No | Show icon matching the alert variant for visual reinforcement |
| `closeable` | `boolean` | `false` | No | Allow users to dismiss the alert with close button |

### Alert Variants

Each variant provides distinct visual styling and semantic meaning:

- **info** - General informational messages, system status updates
- **success** - Positive feedback, successful operations, confirmations
- **warning** - Important notices, potential issues requiring attention  
- **error** - Critical errors, validation failures, system problems

### Icon Integration

When `showIcon` is enabled, alerts display contextual icons:

- **info**: Information icon with "Information" aria-label
- **success**: Success/checkmark icon with "Succes" aria-label 
- **warning**: Warning triangle icon with "Advarsel" aria-label
- **error**: Error/X icon with "Fejl" aria-label

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `close` | `(closed: boolean)` | Emitted when alert is dismissed - only fired when closeable is true and user clicks close button |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `header` | None | Custom header content (overrides header prop for complex header layouts) |
| `default` | None | Main alert content and message text |
| `button` | None | Custom close button content (default shows close icon + "Luk" text) |

### Slot Priority

- Header slot takes precedence over header prop
- Default slot provides main alert content
- Button slot only renders when closeable is true

## Usage Examples

### Basic Alert Types

```vue
<template>
  <!-- Info alert -->
  <FdsAlert variant="info">
    Din session udløber om 5 minutter.
  </FdsAlert>

  <!-- Success alert -->
  <FdsAlert variant="success" show-icon>
    Din ansøgning er blevet sendt og vil blive behandlet inden for 3 arbejdsdage.
  </FdsAlert>

  <!-- Warning alert -->
  <FdsAlert variant="warning" show-icon>
    Nogle af dine oplysninger kan være forældede. Tjek og opdater om nødvendigt.
  </FdsAlert>

  <!-- Error alert -->
  <FdsAlert variant="error" show-icon>
    Der opstod en fejl under behandling af din anmodning. Prøv igen senere.
  </FdsAlert>
</template>
```

### Alert with Header

```vue
<FdsAlert 
  variant="success" 
  header="Betaling gennemført"
  show-icon
>
  Din betaling er blevet behandlet og en kvittering er sendt til din e-mail.
</FdsAlert>
```

### Dismissible Alert

```vue
<template>
  <FdsAlert 
    variant="warning" 
    closeable 
    show-icon
    @close="handleAlertClose"
  >
    Vær opmærksom på at dine ændringer ikke er gemt endnu.
  </FdsAlert>
</template>

<script setup>
const handleAlertClose = (closed) => {
  console.log('Alert closed:', closed)
  // Handle alert dismissal logic
}
</script>
```

### Custom Header Content

```vue
<FdsAlert variant="info">
  <template #header>
    <h3>
      <FdsIkon icon="notification" />
      Systemvedligeholdelse planlagt
    </h3>
  </template>
  
  Vi forventer kortvarig nedetid søndag mellem 02:00-04:00 
  på grund af planlagt systemvedligeholdelse.
</FdsAlert>
```

### Custom Close Button

```vue
<FdsAlert 
  variant="info" 
  closeable
>
  <template #button>
    <FdsButton variant="secondary" size="small">
      <FdsIkon icon="close" />
      Luk besked
    </FdsButton>
  </template>
  
  Du har 3 nye beskeder i din digitale postkasse.
</FdsAlert>
```

### Government Service Alerts

```vue
<template>
  <!-- Application status alert -->
  <FdsAlert 
    variant="success" 
    header="Ansøgning modtaget"
    show-icon
  >
    <p>Din ansøgning om pas er modtaget med sagsnummer <strong>PAS-2024-001234</strong>.</p>
    <p>Du vil modtage besked når din ansøgning er klar til afhentning.</p>
  </FdsAlert>

  <!-- Service disruption warning -->
  <FdsAlert 
    variant="warning" 
    header="Begrænset servicetilgængelighed"
    show-icon
    closeable
  >
    <p>På grund af tekniske problemer kan der forekomme længere svartider 
       i perioden 15:00-17:00 i dag.</p>
    <p>Vi arbejder på at løse problemet hurtigst muligt.</p>
  </FdsAlert>

  <!-- Account security alert -->
  <FdsAlert 
    variant="error" 
    header="Login fejl"
    show-icon
  >
    <p>Din konto er midlertidigt spærret på grund af flere fejlslagne login-forsøg.</p>
    <p>Kontakt support eller prøv igen om 30 minutter.</p>
  </FdsAlert>
</template>
```

### Form Validation Alerts

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Validation error alert -->
    <FdsAlert 
      v-if="validationErrors.length"
      variant="error" 
      header="Ret følgende fejl før indsendelse"
      show-icon
    >
      <ul>
        <li v-for="error in validationErrors" :key="error">
          {{ error }}
        </li>
      </ul>
    </FdsAlert>

    <!-- Success confirmation -->
    <FdsAlert 
      v-if="formSubmitted"
      variant="success" 
      header="Formularen er sendt"
      show-icon
      closeable
    >
      Tak for din indsendelse. Du vil modtage en bekræftelse på e-mail.
    </FdsAlert>

    <!-- Form fields... -->
  </form>
</template>

<script setup>
import { ref } from 'vue'

const validationErrors = ref([])
const formSubmitted = ref(false)

const handleSubmit = () => {
  // Form validation and submission logic
}
</script>
```

### Data Processing Alerts

```vue
<template>
  <!-- Processing status -->
  <FdsAlert 
    v-if="isProcessing"
    variant="info"
    show-icon
  >
    <template #header>
      <h3>
        <FdsSpinner size="small" />
        Behandler din anmodning
      </h3>
    </template>
    Dette kan tage op til 30 sekunder. Luk ikke vinduet.
  </FdsAlert>

  <!-- Process completion -->
  <FdsAlert 
    v-if="processCompleted"
    variant="success"
    header="Behandling fuldført"
    show-icon
    closeable
  >
    Din fil er blevet uploadet og behandlet med succes. 
    Download din kvittering nedenfor.
  </FdsAlert>
</template>
```

## Alert Severity Levels

### Information Alerts (info)
Used for general informational messages that provide helpful context:

```vue
<!-- Session timeout warning -->
<FdsAlert variant="info" closeable>
  Din session udløber om 10 minutter. Gem dit arbejde.
</FdsAlert>

<!-- Feature announcement -->
<FdsAlert variant="info" header="Ny funktionalitet">
  Vi har tilføjet mulighed for at gemme udkast af dine ansøgninger.
</FdsAlert>
```

### Success Alerts (success)
Used to confirm successful operations and positive outcomes:

```vue
<!-- Successful form submission -->
<FdsAlert variant="success" show-icon closeable>
  Din ansøgning er sendt og du vil modtage bekræftelse på e-mail.
</FdsAlert>

<!-- Account update confirmation -->
<FdsAlert variant="success" header="Profil opdateret" show-icon>
  Dine kontaktoplysninger er blevet opdateret i systemet.
</FdsAlert>
```

### Warning Alerts (warning)
Used for important notices that require user attention but aren't errors:

```vue
<!-- Data validation warning -->
<FdsAlert variant="warning" show-icon>
  Nogle af dine oplysninger ser ud til at være forældede. 
  Tjek venligst og opdater om nødvendigt.
</FdsAlert>

<!-- Service limitation notice -->
<FdsAlert variant="warning" header="Begrænset service" show-icon closeable>
  På grund af høj belastning kan der være længere ventetid end normalt.
</FdsAlert>
```

### Error Alerts (error)
Used for critical errors, validation failures, and system problems:

```vue
<!-- System error -->
<FdsAlert variant="error" show-icon>
  Der opstod en uventet fejl. Prøv igen om lidt eller kontakt support.
</FdsAlert>

<!-- Validation error -->
<FdsAlert variant="error" header="Formular indeholder fejl" show-icon>
  Ret de markerede fejl før du kan fortsætte med din ansøgning.
</FdsAlert>
```

## Dismissible vs Permanent Alerts

### Dismissible Alerts

Use dismissible alerts for:
- Non-critical information that users can choose to hide
- Temporary status updates
- Contextual help messages
- Feature announcements

```vue
<FdsAlert variant="info" closeable @close="onAlertDismiss">
  Tip: Du kan gemme dine ændringer som udkast ved at klikke "Gem som udkast".
</FdsAlert>
```

### Permanent Alerts

Use permanent alerts for:
- Critical system errors
- Important validation messages
- Security notices that users must acknowledge differently
- Process status updates

```vue
<!-- Critical error - should not be dismissible -->
<FdsAlert variant="error" show-icon>
  Din session er udløbet af sikkerhedsmæssige årsager. Log ind igen for at fortsætte.
</FdsAlert>

<!-- Important validation - dismissible only after correction -->
<FdsAlert variant="error" header="Påkrævet information mangler">
  Du skal udfylde alle obligatoriske felter før du kan fortsætte.
</FdsAlert>
```

## Accessibility

### WCAG 2.1 AA Compliance

The FdsAlert component implements comprehensive accessibility features:

#### ARIA Support
- **role="alert"**: Automatically applied to warning and error alerts for immediate screen reader announcement
- **Semantic HTML**: Uses proper heading elements and button elements for screen readers
- **Icon accessibility**: Icons include appropriate aria-labels in Danish

#### Screen Reader Announcements

```vue
<!-- Error alert automatically gets role="alert" -->
<FdsAlert variant="error">
  <!-- Screen readers announce this immediately -->
  Der opstod en fejl under behandling af din anmodning.
</FdsAlert>

<!-- Info alert uses standard content flow -->
<FdsAlert variant="info">
  <!-- Screen readers read this when encountered -->
  Din ændringer er gemt som udkast.
</FdsAlert>
```

#### Keyboard Navigation
- **Focus management**: Close buttons are properly focusable with keyboard navigation
- **Enter/Space activation**: Close buttons respond to both Enter and Space key presses
- **Tab order**: Natural tab progression through alert content

#### Visual Accessibility
- **High contrast**: Meets DKFDS color contrast requirements (4.5:1 minimum)
- **Text scaling**: Supports zoom up to 200% without content loss
- **Color independence**: Alert meaning not conveyed through color alone (icons and text provide context)

### Best Practices

```vue
<template>
  <!-- Use proper heading hierarchy -->
  <section>
    <h2>Ansøgningsstatus</h2>
    
    <FdsAlert variant="success" show-icon>
      <template #header>
        <h3>Ansøgning godkendt</h3>
      </template>
      Din ansøgning er blevet godkendt og behandlet.
    </FdsAlert>
  </section>

  <!-- Provide clear, actionable error messages -->
  <FdsAlert variant="error" show-icon>
    <template #header>
      <h3>Upload fejlede</h3>
    </template>
    
    <p>Filen kunne ikke uploades. Kontroller at:</p>
    <ul>
      <li>Filen er under 10MB</li>
      <li>Filtypen er PDF, JPG eller PNG</li>
      <li>Du har en stabil internetforbindelse</li>
    </ul>
    
    <p>Prøv at uploade filen igen eller kontakt support hvis problemet fortsætter.</p>
  </FdsAlert>

  <!-- Use appropriate alert levels -->
  <FdsAlert variant="warning" show-icon closeable>
    <!-- Warning for important but non-critical information -->
    Husk at bekræfte din e-mailadresse for at modtage vigtige opdateringer.
  </FdsAlert>
</template>
```

### Focus Management

```vue
<template>
  <FdsAlert 
    ref="alertRef"
    variant="error" 
    closeable
    @close="handleAlertClose"
  >
    Kritisk fejl opstod under behandling.
  </FdsAlert>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const alertRef = ref(null)

// Focus management for dynamic alerts
const showErrorAlert = async () => {
  await nextTick()
  // Focus alert for screen reader announcement
  if (alertRef.value) {
    alertRef.value.$el.focus()
  }
}

const handleAlertClose = () => {
  // Return focus to triggering element if needed
  document.getElementById('submit-button')?.focus()
}
</script>
```

## DKFDS Guidelines

### DKFDS v11 Alert Specifications

The FdsAlert component implements official DKFDS v11 message/notification patterns:

#### Visual Design Principles
- **Consistent styling**: Uses DKFDS color palette and typography scale
- **Clear hierarchy**: Header, icon, content, and actions follow DKFDS layout patterns
- **Responsive behavior**: Adapts to different screen sizes while maintaining readability

#### Content Guidelines
- **Concise messaging**: Keep alert text brief and actionable
- **Danish language**: Use proper Danish terminology and conventions
- **Government tone**: Professional, helpful, and citizen-focused language

#### Interaction Patterns
- **Optional dismissal**: Closeable alerts include standard "Luk" (Close) button
- **Consistent iconography**: Uses DKFDS icon system with semantic meaning
- **Smooth transitions**: Fade animations follow DKFDS motion guidelines

### Government Service Patterns

```vue
<!-- Citizen service status -->
<FdsAlert 
  variant="info" 
  header="Ny besked i Digital Post"
  show-icon
  closeable
>
  Du har modtaget en ny besked fra Borgerservice.dk. 
  Log ind for at læse den.
</FdsAlert>

<!-- Business service notification -->
<FdsAlert 
  variant="warning"
  header="CVR-opdatering påkrævet"
  show-icon
>
  Dine virksomhedsoplysninger skal opdateres senest den 31. december.
  Undgå bøde ved at opdatere rettidigt.
</FdsAlert>

<!-- Municipal service confirmation -->
<FdsAlert 
  variant="success"
  header="Adresseændring registreret"
  show-icon
>
  <p>Din nye adresse er registreret og alle relevante myndigheder er informeret:</p>
  <ul>
    <li>Folkeregister</li>
    <li>SKAT</li>  
    <li>Kommune administration</li>
    <li>Valglister</li>
  </ul>
</FdsAlert>
```

### Notification Patterns

```vue
<template>
  <!-- System maintenance notice -->
  <FdsAlert 
    variant="warning"
    header="Planlagt vedligeholdelse"
    show-icon
    closeable
  >
    <p><strong>Søndag 15. januar 02:00-04:00</strong></p>
    <p>Borgerservice.dk vil være utilgængeligt på grund af systemvedligeholdelse.</p>
    <p>Vi beklager eventuelle ulemper.</p>
  </FdsAlert>

  <!-- Service update announcement -->
  <FdsAlert 
    variant="info"
    header="Nye digitale services"
    show-icon
    closeable
  >
    <p>Vi har lanceret forbedrede services for ansøgning om pas og kørekort.</p>
    <p>Oplev hurtigere sagsbehandling og bedre brugeroplevelse.</p>
  </FdsAlert>

  <!-- Legal compliance notice -->
  <FdsAlert 
    variant="warning"
    header="Cookiesamtykke påkrævet"
    show-icon
  >
    <p>Denne hjemmeside bruger cookies for at forbedre din oplevelse.</p>
    <p>Ved at fortsætte accepterer du vores cookiepolitik.</p>
    
    <template #button>
      <FdsButton variant="primary" @click="acceptCookies">
        Accepter cookies
      </FdsButton>
    </template>
  </FdsAlert>
</template>
```

### Multi-language Support

```vue
<!-- Danish (primary) -->
<FdsAlert variant="success" header="Ansøgning sendt" show-icon>
  Din ansøgning er modtaget og vil blive behandlet inden for 5 arbejdsdage.
</FdsAlert>

<!-- English (for international users) -->
<FdsAlert variant="success" header="Application submitted" show-icon>
  Your application has been received and will be processed within 5 business days.
</FdsAlert>

<!-- German (for border region services) -->
<FdsAlert variant="success" header="Antrag eingereicht" show-icon>
  Ihr Antrag wurde erhalten und wird innerhalb von 5 Werktagen bearbeitet.
</FdsAlert>
```

## Integration Examples

### With Forms

```vue
<template>
  <form @submit.prevent="submitForm">
    <!-- Form validation alerts -->
    <FdsAlert 
      v-if="formErrors.length"
      variant="error"
      header="Ret følgende fejl"
      show-icon
    >
      <ul>
        <li v-for="error in formErrors" :key="error.field">
          <a :href="`#${error.field}`">{{ error.message }}</a>
        </li>
      </ul>
    </FdsAlert>

    <!-- Form success confirmation -->
    <FdsAlert 
      v-if="formSubmitted"
      variant="success"
      header="Ansøgning sendt"
      show-icon
      closeable
    >
      Din ansøgning med sagsnummer {{ applicationNumber }} er modtaget.
    </FdsAlert>

    <!-- Form fields... -->
  </form>
</template>
```

### With Data Loading

```vue
<template>
  <!-- Loading state -->
  <FdsAlert 
    v-if="isLoading"
    variant="info"
  >
    <template #header>
      <h3>
        <FdsSpinner size="small" />
        Henter dine data
      </h3>
    </template>
    Vent venligst mens vi henter dine oplysninger...
  </FdsAlert>

  <!-- Error state -->
  <FdsAlert 
    v-if="loadError"
    variant="error"
    header="Kunne ikke hente data"
    show-icon
  >
    <p>{{ loadError }}</p>
    <template #button>
      <FdsButton variant="secondary" @click="retryLoad">
        Prøv igen
      </FdsButton>
    </template>
  </FdsAlert>

  <!-- Data content... -->
</template>
```

### With Toast Integration

```vue
<script setup>
import { useToast } from '@madsb/dkfds-vue3'

const toast = useToast()

// Convert alert to toast for temporary notifications
const showTemporaryAlert = () => {
  toast.info({
    heading: 'Automatisk gem',
    message: 'Dine ændringer er automatisk gemt',
    autoDismiss: 3000
  })
}

// Critical alerts remain as persistent components
const showCriticalAlert = () => {
  // Use FdsAlert component for persistent critical messages
  // Toast for temporary, non-critical updates
}
</script>
```

## Advanced Customization

### Custom Alert Styling

```scss
// Custom DKFDS-compliant alert styling
.alert {
  border-radius: var(--dkfds-border-radius-medium);
  padding: var(--dkfds-spacing-6);
  margin-bottom: var(--dkfds-spacing-4);

  // Enhanced animation
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.3s ease;
  }

  &.fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
  }

  &.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }

  // Custom variant styling
  &.alert-info {
    background-color: var(--dkfds-color-info-light);
    border-left: 4px solid var(--dkfds-color-info);
  }

  &.alert-success {
    background-color: var(--dkfds-color-success-light);
    border-left: 4px solid var(--dkfds-color-success);
  }

  &.alert-warning {
    background-color: var(--dkfds-color-warning-light);
    border-left: 4px solid var(--dkfds-color-warning);
  }

  &.alert-error {
    background-color: var(--dkfds-color-error-light);
    border-left: 4px solid var(--dkfds-color-error);
  }
}
```

### Custom Alert Components

```vue
<!-- ApplicationStatusAlert.vue -->
<template>
  <FdsAlert 
    :variant="statusVariant"
    :header="statusHeader"
    show-icon
    :closeable="isDismissible"
    @close="$emit('dismiss')"
  >
    <p><strong>Sagsnummer:</strong> {{ applicationNumber }}</p>
    <p><strong>Status:</strong> {{ statusText }}</p>
    <p v-if="estimatedCompletion">
      <strong>Forventet færdiggørelse:</strong> {{ estimatedCompletion }}
    </p>
    
    <div v-if="availableActions.length" class="alert-actions">
      <FdsButton 
        v-for="action in availableActions"
        :key="action.key"
        :variant="action.variant"
        @click="$emit('action', action.key)"
      >
        {{ action.label }}
      </FdsButton>
    </div>
  </FdsAlert>
</template>

<script setup>
const props = defineProps({
  applicationNumber: String,
  status: String,
  estimatedCompletion: String,
  availableActions: Array
})

const emit = defineEmits(['dismiss', 'action'])

// Computed properties for dynamic alert configuration
const statusVariant = computed(() => {
  const variants = {
    'pending': 'info',
    'processing': 'info', 
    'approved': 'success',
    'rejected': 'error',
    'requires_action': 'warning'
  }
  return variants[props.status] || 'info'
})

const statusHeader = computed(() => {
  const headers = {
    'pending': 'Ansøgning modtaget',
    'processing': 'Under behandling',
    'approved': 'Ansøgning godkendt',
    'rejected': 'Ansøgning afvist',
    'requires_action': 'Handling påkrævet'
  }
  return headers[props.status] || 'Ansøgningsstatus'
})

const isDismissible = computed(() => {
  return !['rejected', 'requires_action'].includes(props.status)
})
</script>
```

## Related Components

- **[FdsToast](/components/feedback/fds-toast.md)** - Temporary notification overlay system
- **[FdsModal](/components/feedback/fds-modal.md)** - Modal dialogs for complex alerts requiring user interaction
- **[FdsIkon](/components/layout/fds-ikon.md)** - Icon system used for alert visual indicators
- **[FdsButton](/components/layout/fds-button.md)** - Action buttons used in custom alert actions
- **[FdsSpinner](/components/feedback/fds-spinner.md)** - Loading indicators for processing alerts

<!-- Verified against source -->