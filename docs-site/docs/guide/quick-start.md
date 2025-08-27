# Quick Start

This guide will help you build your first form using DKFDS Vue 3 components in just a few minutes.

## Basic Form

Let's create a contact form with validation:

<div class="component-demo">
  <FdsFormgroup>
    <FdsLabel for="quick-name">Fulde navn *</FdsLabel>
    <FdsHint>Indtast dit for- og efternavn</FdsHint>
    <FdsInput 
      id="quick-name"
      placeholder="F.eks. Anders Andersen"
      required
    />
  </FdsFormgroup>

  <FdsFormgroup>
    <FdsLabel for="quick-email">E-mail *</FdsLabel>
    <FdsInput 
      id="quick-email" 
      type="email"
      placeholder="din@email.dk"
      required
    />
  </FdsFormgroup>

  <FdsFormgroup>
    <FdsLabel for="quick-phone">Telefonnummer</FdsLabel>
    <FdsHint>8 cifre uden mellemrum</FdsHint>
    <FdsInput 
      id="quick-phone" 
      type="tel"
      placeholder="12345678"
      pattern="[0-9]{8}"
    />
  </FdsFormgroup>

  <FdsFormgroup>
    <FdsLabel for="quick-message">Besked</FdsLabel>
    <FdsTextarea 
      id="quick-message"
      placeholder="Skriv din besked her..."
      rows="4"
    />
  </FdsFormgroup>

  <FdsCheckbox>
    Jeg accepterer behandling af personoplysninger
  </FdsCheckbox>

  <div style="margin-top: 24px;">
    <FdsButton variant="primary" style="margin-right: 16px;">
      Send besked
    </FdsButton>
    <FdsButton variant="secondary">
      Annuller
    </FdsButton>
  </div>
</div>

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <FdsFormgroup>
      <FdsLabel for="name">Fulde navn *</FdsLabel>
      <FdsHint>Indtast dit for- og efternavn</FdsHint>
      <FdsInput 
        id="name"
        v-model="form.name"
        placeholder="F.eks. Anders Andersen"
        required
      />
      <FdsFejlmeddelelse v-if="errors.name">
        {{ errors.name }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>

    <FdsFormgroup>
      <FdsLabel for="email">E-mail *</FdsLabel>
      <FdsInput 
        id="email" 
        v-model="form.email"
        type="email"
        placeholder="din@email.dk"
        required
      />
      <FdsFejlmeddelelse v-if="errors.email">
        {{ errors.email }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>

    <FdsFormgroup>
      <FdsLabel for="phone">Telefonnummer</FdsLabel>
      <FdsHint>8 cifre uden mellemrum</FdsHint>
      <FdsInput 
        id="phone" 
        v-model="form.phone"
        type="tel"
        placeholder="12345678"
        pattern="[0-9]{8}"
      />
    </FdsFormgroup>

    <FdsFormgroup>
      <FdsLabel for="message">Besked</FdsLabel>
      <FdsTextarea 
        id="message"
        v-model="form.message"
        placeholder="Skriv din besked her..."
        rows="4"
      />
    </FdsFormgroup>

    <FdsCheckbox v-model="form.consent">
      Jeg accepterer behandling af personoplysninger
    </FdsCheckbox>

    <div class="button-group">
      <FdsButton 
        variant="primary" 
        type="submit"
        :disabled="!isFormValid"
      >
        Send besked
      </FdsButton>
      <FdsButton variant="secondary" @click="resetForm">
        Annuller
      </FdsButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  FdsFormgroup,
  FdsLabel,
  FdsHint,
  FdsInput,
  FdsTextarea,
  FdsCheckbox,
  FdsButton,
  FdsFejlmeddelelse
} from '@madsb/dkfds-vue3'

interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false
})

const errors = ref<Partial<ContactForm>>({})

const isFormValid = computed(() => {
  return form.value.name && 
         form.value.email && 
         form.value.consent &&
         Object.keys(errors.value).length === 0
})

const validateForm = (): boolean => {
  const newErrors: Partial<ContactForm> = {}

  if (!form.value.name.trim()) {
    newErrors.name = 'Navn er påkrævet'
  }

  if (!form.value.email.trim()) {
    newErrors.email = 'E-mail er påkrævet'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    newErrors.email = 'Indtast en gyldig e-mail adresse'
  }

  if (form.value.phone && !/^\d{8}$/.test(form.value.phone)) {
    newErrors.phone = 'Telefonnummer skal være 8 cifre'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    console.log('Form submitted:', form.value)
    // Handle form submission here
    resetForm()
  }
}

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  }
  errors.value = {}
}
</script>

<style scoped>
.button-group {
  margin-top: 24px;
  display: flex;
  gap: 16px;
}
</style>
```

## Key Concepts

### Form Structure
Every form field should be wrapped in `FdsFormgroup` for proper spacing and accessibility:

```vue
<FdsFormgroup>
  <FdsLabel for="field-id">Label Text</FdsLabel>
  <FdsHint>Optional help text</FdsHint>
  <FdsInput id="field-id" v-model="value" />
  <FdsFejlmeddelelse v-if="error">Error message</FdsFejlmeddelelse>
</FdsFormgroup>
```

### Accessibility
- Always use `FdsLabel` with `for` attribute matching input `id`
- Add `FdsHint` for additional guidance
- Show `FdsFejlmeddelelse` for validation errors
- Use semantic form elements and proper ARIA attributes

### Validation
Client-side validation should be user-friendly:

```typescript
const validateEmail = (email: string): string | null => {
  if (!email) return 'E-mail er påkrævet'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Indtast en gyldig e-mail adresse'
  }
  return null
}
```

## Input Types

### Text Input
```vue
<FdsInput 
  v-model="value"
  type="text"
  placeholder="Placeholder text"
  maxlength="100"
/>
```

### Number Input
```vue
<FdsInputNumber 
  v-model="amount"
  :min="0"
  :max="1000"
  step="0.01"
  prefix="kr."
/>
```

### Textarea
```vue
<FdsTextarea 
  v-model="text"
  rows="4"
  maxlength="500"
/>
```

### Dropdown
```vue
<FdsDropdown 
  v-model="selected"
  placeholder="Vælg en mulighed"
>
  <option value="1">Mulighed 1</option>
  <option value="2">Mulighed 2</option>
  <option value="3">Mulighed 3</option>
</FdsDropdown>
```

### Checkboxes & Radio
```vue
<!-- Single checkbox -->
<FdsCheckbox v-model="agree">
  Jeg accepterer vilkårene
</FdsCheckbox>

<!-- Radio group -->
<FdsRadioGroup v-model="choice" name="options">
  <FdsRadioItem value="yes">Ja</FdsRadioItem>
  <FdsRadioItem value="no">Nej</FdsRadioItem>
  <FdsRadioItem value="maybe">Måske</FdsRadioItem>
</FdsRadioGroup>
```

## Common Patterns

### Required Fields
Mark required fields in the label and add validation:

```vue
<FdsLabel for="required-field">Field Name *</FdsLabel>
<FdsInput 
  id="required-field"
  v-model="value"
  required
  aria-required="true"
/>
```

### Conditional Fields
Show/hide fields based on other inputs:

```vue
<FdsCheckbox v-model="needsDetails">
  Jeg har brug for yderligere oplysninger
</FdsCheckbox>

<FdsFormgroup v-if="needsDetails">
  <FdsLabel for="details">Yderligere oplysninger</FdsLabel>
  <FdsTextarea id="details" v-model="details" />
</FdsFormgroup>
```

### Loading States
Show loading state during submission:

```vue
<FdsButton 
  variant="primary"
  :disabled="isSubmitting"
  @click="submit"
>
  <FdsSpinner v-if="isSubmitting" size="small" />
  {{ isSubmitting ? 'Sender...' : 'Send' }}
</FdsButton>
```

## Next Steps

Now that you've built your first form, explore more advanced topics:

- [Theming →](./theming) - Customize appearance
- [Accessibility →](./accessibility) - Ensure WCAG compliance
- [Components →](/components/) - Browse all components
- [API Reference →](/api/) - Detailed component APIs

## Tips

### Performance
- Use individual imports for better tree-shaking
- Implement proper form validation to reduce server load
- Consider using `v-model.lazy` for less frequent updates

### User Experience  
- Provide clear error messages in Danish
- Use appropriate input types (email, tel, url)
- Add helpful placeholder text and hints
- Consider using `FdsToast` for success messages

### Styling
- Leverage DKFDS design tokens for consistency
- Use proper spacing with `FdsFormgroup`
- Follow Danish government style guidelines