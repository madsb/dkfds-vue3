---
title: FdsCheckbox
description: Checkbox component implementing DKFDS v11 checkbox specifications with single and multiple selection, conditional content display, and comprehensive accessibility support
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [form, checkbox, selection, conditional, validation, accessibility]
---

# FdsCheckbox

Checkbox component implementing DKFDS v11 checkbox specifications. Provides single and multiple selection checkboxes with conditional content display, accessibility support, and proper form integration. Supports boolean, string, and array models for flexible data binding patterns following DKFDS checkbox behavior.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsCheckbox } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <div>
    <!-- Single checkbox -->
    <FdsCheckbox v-model="acceptTerms">
      I accept the terms and conditions
    </FdsCheckbox>
    
    <!-- Checkbox group -->
    <fieldset>
      <legend class="form-label">Select your interests</legend>
      <FdsCheckbox v-model="interests" value="sports">Sports</FdsCheckbox>
      <FdsCheckbox v-model="interests" value="music">Music</FdsCheckbox>
      <FdsCheckbox v-model="interests" value="travel">Travel</FdsCheckbox>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsCheckbox } from '@madsb/dkfds-vue3'

const acceptTerms = ref(false)
const interests = ref<string[]>([])
</script>
```

## Props

| Prop         | Type                             | Default               | Required | Description                                                                                                           |
| ------------ | -------------------------------- | --------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `id`         | `string`                         | `undefined`           | No       | Unique identifier for the checkbox. If not provided, will be auto-generated.                                         |
| `modelValue` | `boolean \| string \| string[]`  | `false`               | No       | The v-model value for two-way data binding. Boolean for single checkbox, string[] for checkbox group.                |
| `value`      | `string \| number \| boolean`    | `true`                | No       | Checkbox value for form submission and array models. When modelValue is an array, this value is added/removed.      |
| `name`       | `string`                         | `undefined`           | No       | Name attribute for form submission. If not provided, uses the generated form ID.                                     |
| `disabled`   | `boolean`                        | `false`               | No       | Whether the checkbox is disabled. Prevents user interaction and applies disabled styling.                            |

## Events

| Event              | Payload                             | Description                                                                      |
| ------------------ | ----------------------------------- | -------------------------------------------------------------------------------- |
| `update:modelValue` | `boolean \| string \| string[]`     | Emitted when checkbox state changes. Used for v-model two-way data binding.     |
| `dirty`            | `boolean`                           | Emitted when checkbox loses focus. Useful for triggering validation after user interaction. |
| `change`           | `Event`                             | Emitted on change event. Provides access to the raw DOM change event.          |

## Slots

| Slot      | Slot Props | Description                                                                                          |
| --------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| `default` | None       | The label text content for the checkbox. Can contain plain text or HTML elements.                   |
| `content` | None       | Conditional content that is displayed when the checkbox is checked. Hidden when unchecked.          |

## Usage Examples

### Basic Single Checkbox

```vue
<template>
  <div>
    <FdsCheckbox v-model="newsletterSignup">
      Subscribe to newsletter
    </FdsCheckbox>
    
    <p>Status: {{ newsletterSignup ? 'Subscribed' : 'Not subscribed' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsCheckbox } from '@madsb/dkfds-vue3'

const newsletterSignup = ref(false)
</script>
```

### Checkbox with Conditional Content

```vue
<template>
  <FdsCheckbox v-model="hasAllergies">
    I have allergies
    <template #content>
      <div class="mt-2">
        <FdsFormgroup>
          <FdsLabel>Please specify your allergies:</FdsLabel>
          <FdsTextarea 
            v-model="allergyDetails" 
            placeholder="e.g., Nuts, Shellfish, Dairy..."
            rows="3"
          />
        </FdsFormgroup>
      </div>
    </template>
  </FdsCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsCheckbox, FdsFormgroup, FdsLabel, FdsTextarea } from '@madsb/dkfds-vue3'

const hasAllergies = ref(false)
const allergyDetails = ref('')
</script>
```

### Checkbox Group with Array Model

```vue
<template>
  <fieldset>
    <legend class="form-label">Select your interests</legend>
    <div class="form-hint">You can select multiple options</div>
    
    <FdsCheckbox v-model="interests" value="sports">
      Sports and Fitness
    </FdsCheckbox>
    
    <FdsCheckbox v-model="interests" value="culture">
      Arts and Culture
    </FdsCheckbox>
    
    <FdsCheckbox v-model="interests" value="technology">
      Technology
      <template #content>
        <div class="mt-2">
          <FdsFormgroup>
            <FdsLabel>Which technologies interest you?</FdsLabel>
            <FdsInput 
              v-model="techDetails" 
              placeholder="e.g., AI, Web Development, Mobile Apps"
            />
          </FdsFormgroup>
        </div>
      </template>
    </FdsCheckbox>
    
    <FdsCheckbox v-model="interests" value="other">
      Other
    </FdsCheckbox>
    
    <div class="mt-3">
      <strong>Selected interests:</strong> {{ interests.join(', ') || 'None' }}
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsCheckbox, FdsFormgroup, FdsLabel, FdsInput } from '@madsb/dkfds-vue3'

const interests = ref<string[]>([])
const techDetails = ref('')
</script>
```

### Form Integration with Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <FdsFormgroup :isValid="validation.terms.isValid">
      <FdsCheckbox 
        v-model="form.acceptTerms" 
        @dirty="validateTerms"
        :class="{ 'error': !validation.terms.isValid }"
      >
        I accept the <a href="/terms" target="_blank">terms and conditions</a> *
      </FdsCheckbox>
      <FdsFejlmeddelelse v-if="!validation.terms.isValid">
        {{ validation.terms.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>
    
    <FdsFormgroup :isValid="validation.privacy.isValid">
      <FdsCheckbox 
        v-model="form.acceptPrivacy" 
        @dirty="validatePrivacy"
        :class="{ 'error': !validation.privacy.isValid }"
      >
        I accept the <a href="/privacy" target="_blank">privacy policy</a> *
      </FdsCheckbox>
      <FdsFejlmeddelelse v-if="!validation.privacy.isValid">
        {{ validation.privacy.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>
    
    <FdsCheckbox v-model="form.marketing">
      Send me marketing emails (optional)
      <template #content>
        <div class="mt-2">
          <FdsFormgroup>
            <FdsLabel>Email frequency:</FdsLabel>
            <FdsRadioGroup v-model="form.marketingFrequency">
              <FdsRadioItem value="weekly">Weekly</FdsRadioItem>
              <FdsRadioItem value="monthly">Monthly</FdsRadioItem>
              <FdsRadioItem value="quarterly">Quarterly</FdsRadioItem>
            </FdsRadioGroup>
          </FdsFormgroup>
        </div>
      </template>
    </FdsCheckbox>
    
    <div class="form-actions mt-4">
      <FdsButton type="submit" variant="primary" :disabled="!isFormValid">
        Submit Registration
      </FdsButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { 
  FdsCheckbox, 
  FdsFormgroup, 
  FdsFejlmeddelelse, 
  FdsLabel,
  FdsRadioGroup,
  FdsRadioItem,
  FdsButton 
} from '@madsb/dkfds-vue3'

const form = reactive({
  acceptTerms: false,
  acceptPrivacy: false,
  marketing: false,
  marketingFrequency: 'monthly'
})

const validation = ref({
  terms: { isValid: true, message: '' },
  privacy: { isValid: true, message: '' }
})

const isFormValid = computed(() => 
  form.acceptTerms && 
  form.acceptPrivacy && 
  validation.value.terms.isValid && 
  validation.value.privacy.isValid
)

const validateTerms = () => {
  const field = validation.value.terms
  field.isValid = form.acceptTerms
  field.message = field.isValid ? '' : 'You must accept the terms and conditions to continue'
}

const validatePrivacy = () => {
  const field = validation.value.privacy
  field.isValid = form.acceptPrivacy
  field.message = field.isValid ? '' : 'You must accept the privacy policy to continue'
}

const handleSubmit = () => {
  validateTerms()
  validatePrivacy()
  
  if (isFormValid.value) {
    console.log('Form submitted:', form)
    // Handle form submission
  }
}
</script>
```

### Disabled Checkboxes

```vue
<template>
  <div class="space-y-3">
    <FdsCheckbox :model-value="false" :disabled="true">
      Disabled unchecked checkbox
    </FdsCheckbox>
    
    <FdsCheckbox :model-value="true" :disabled="true">
      Disabled checked checkbox
    </FdsCheckbox>
    
    <FdsCheckbox v-model="conditionallyDisabled" :disabled="!enableCheckbox">
      Conditionally disabled checkbox
    </FdsCheckbox>
    
    <FdsCheckbox v-model="enableCheckbox">
      Enable the checkbox above
    </FdsCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsCheckbox } from '@madsb/dkfds-vue3'

const conditionallyDisabled = ref(false)
const enableCheckbox = ref(false)
</script>
```

### Custom Values and Names

```vue
<template>
  <form>
    <!-- String values for checkbox group -->
    <fieldset>
      <legend class="form-label">Preferred contact methods</legend>
      
      <FdsCheckbox 
        v-model="contactMethods" 
        value="email"
        name="contact_preference"
      >
        Email
      </FdsCheckbox>
      
      <FdsCheckbox 
        v-model="contactMethods" 
        value="phone"
        name="contact_preference"
      >
        Phone
      </FdsCheckbox>
      
      <FdsCheckbox 
        v-model="contactMethods" 
        value="sms"
        name="contact_preference"
      >
        SMS
      </FdsCheckbox>
      
      <FdsCheckbox 
        v-model="contactMethods" 
        value="post"
        name="contact_preference"
      >
        Post Mail
      </FdsCheckbox>
    </fieldset>
    
    <!-- Boolean with custom true value -->
    <FdsCheckbox 
      v-model="subscriptionLevel" 
      value="premium"
      name="subscription"
    >
      Upgrade to premium subscription
    </FdsCheckbox>
    
    <div class="mt-3">
      <p><strong>Contact methods:</strong> {{ contactMethods.join(', ') || 'None selected' }}</p>
      <p><strong>Subscription:</strong> {{ subscriptionLevel ? 'Premium' : 'Basic' }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsCheckbox } from '@madsb/dkfds-vue3'

const contactMethods = ref<string[]>([])
const subscriptionLevel = ref(false)
</script>
```

### Advanced Integration with Dynamic Content

```vue
<template>
  <div>
    <h3>Service Configuration</h3>
    
    <FdsCheckbox v-model="services" value="email-service">
      Email Service
      <template #content>
        <div class="mt-3 p-3 bg-light">
          <FdsFormgroup>
            <FdsLabel>SMTP Server:</FdsLabel>
            <FdsInput v-model="config.emailService.smtp" placeholder="smtp.example.com" />
          </FdsFormgroup>
          
          <FdsFormgroup>
            <FdsLabel>Port:</FdsLabel>
            <FdsInputNumber v-model="config.emailService.port" :min="1" :max="65535" />
          </FdsFormgroup>
          
          <FdsCheckbox v-model="config.emailService.ssl">
            Use SSL/TLS encryption
          </FdsCheckbox>
        </div>
      </template>
    </FdsCheckbox>
    
    <FdsCheckbox v-model="services" value="sms-service">
      SMS Service
      <template #content>
        <div class="mt-3 p-3 bg-light">
          <FdsFormgroup>
            <FdsLabel>API Key:</FdsLabel>
            <FdsInput 
              v-model="config.smsService.apiKey" 
              type="password" 
              placeholder="Enter API key"
            />
          </FdsFormgroup>
          
          <FdsFormgroup>
            <FdsLabel>Sender ID:</FdsLabel>
            <FdsInput v-model="config.smsService.senderId" placeholder="YourCompany" />
          </FdsFormgroup>
        </div>
      </template>
    </FdsCheckbox>
    
    <FdsCheckbox v-model="services" value="push-service">
      Push Notifications
      <template #content>
        <div class="mt-3 p-3 bg-light">
          <FdsAlert variant="info">
            Push notifications require additional setup in your app configuration.
          </FdsAlert>
          
          <FdsFormgroup>
            <FdsLabel>Firebase Server Key:</FdsLabel>
            <FdsTextarea 
              v-model="config.pushService.serverKey" 
              rows="3"
              placeholder="Enter Firebase server key"
            />
          </FdsFormgroup>
        </div>
      </template>
    </FdsCheckbox>
    
    <div class="mt-4">
      <h4>Active Services: {{ services.length }}</h4>
      <ul v-if="services.length > 0">
        <li v-for="service in services" :key="service">
          {{ service.replace('-', ' ').toUpperCase() }}
        </li>
      </ul>
      <p v-else class="text-muted">No services selected</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  FdsCheckbox, 
  FdsFormgroup, 
  FdsLabel, 
  FdsInput, 
  FdsInputNumber, 
  FdsTextarea, 
  FdsAlert 
} from '@madsb/dkfds-vue3'

const services = ref<string[]>([])

const config = reactive({
  emailService: {
    smtp: '',
    port: 587,
    ssl: true
  },
  smsService: {
    apiKey: '',
    senderId: ''
  },
  pushService: {
    serverKey: ''
  }
})
</script>
```

## Accessibility

FdsCheckbox implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### Keyboard Navigation

- **Space key**: Toggles checkbox state when focused
- **Tab navigation**: Checkbox receives focus in natural tab order
- **Enter key**: Submits parent form (standard browser behavior)
- **Focus management**: Clear visual focus indicators with proper contrast ratios

### Screen Reader Support

- **Semantic markup**: Uses proper `<input type="checkbox">` elements
- **Label association**: Automatic association through `for` and `id` attributes
- **State announcement**: Screen readers announce checked/unchecked state changes
- **Group context**: Supports `fieldset` and `legend` for checkbox groups

### ARIA Support

- **aria-describedby**: Automatic injection from parent FdsFormgroup context
- **aria-controls**: Points to conditional content when `content` slot is used
- **aria-hidden**: Properly manages visibility of conditional content
- **data-controls**: Backup attribute for DKFDS behavior scripts

### Conditional Content Accessibility

- **Progressive disclosure**: Content is revealed/hidden based on checkbox state
- **Focus management**: Focus remains on checkbox when toggling content
- **Screen reader friendly**: Content changes are properly announced
- **Visual indicators**: Clear visual connection between checkbox and conditional content

## DKFDS Guidelines

FdsCheckbox follows the Danish Common Design System specifications:

### Design System Integration

- **Semantic classes**: Uses standard `form-checkbox` and `form-group-checkbox` CSS classes
- **Visual consistency**: Follows DKFDS checkbox styling and spacing specifications
- **Theme compatibility**: Works seamlessly with both VirkDK and BorgerDK themes
- **Icon integration**: Uses DKFDS standard checkmark icons and styling

### Form Structure Standards

- **DKFDS v11 compliance**: Implements latest DKFDS checkbox specifications
- **Group patterns**: Supports standard fieldset/legend patterns for checkbox groups
- **Conditional content**: Follows DKFDS patterns for progressive disclosure
- **Form integration**: Designed to work with other DKFDS form components

### Behavior Scripts Integration

- **DKFDS behaviors**: Compatible with official DKFDS JavaScript behaviors
- **Progressive enhancement**: Works without JavaScript while enhanced with Vue reactivity
- **Event compatibility**: Emits standard DOM events for DKFDS script integration
- **Attribute support**: Uses `data-controls` and other DKFDS-specific attributes

### Danish Language Conventions

- **Content patterns**: Examples use Danish terminology and patterns
- **User experience**: Follows Danish government self-service solution conventions
- **Cultural adaptation**: Supports Danish public sector requirements
- **Accessibility standards**: Meets Danish accessibility requirements

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form group container with validation context and error handling
- **[FdsLabel](/components/forms/fds-label)** - Form labels with required field indicators and proper association
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)** - Error messages for form validation
- **[FdsHint](/components/forms/fds-hint)** - Helper text and guidance for form fields
- **[FdsRadioGroup](/components/input/fds-radio-group)** - Radio button groups for single selection
- **[FdsToggleSwitch](/components/input/fds-toggle-switch)** - Toggle switches for binary settings

## TypeScript Support

```typescript
import type { FdsCheckboxProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsCheckboxProps {
  id?: string
  modelValue?: boolean | string | string[]
  value?: string | number | boolean
  name?: string
  disabled?: boolean
}

// Event payload types
type CheckboxChangePayload = boolean | string | string[]

// Usage in component
const checkboxProps: FdsCheckboxProps = {
  id: 'my-checkbox',
  modelValue: [],
  value: 'option1',
  disabled: false
}

// Reactive references with proper typing
const singleCheckbox = ref<boolean>(false)
const checkboxGroup = ref<string[]>([])
const stringValue = ref<string>('')
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/input/fds-checkbox.vue -->