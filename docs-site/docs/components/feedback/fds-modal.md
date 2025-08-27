---
title: FdsModal
description: Accessible modal dialog component implementing DKFDS v11 specifications with focus management and keyboard interaction
category: feedback
dkfds: true
accessibility: WCAG 2.1 AA
tags: [modal, dialog, overlay, popup, confirmation]
---

# FdsModal

Accessible modal dialog component implementing DKFDS v11 specifications with focus management and keyboard interaction.

The FdsModal component uses the native HTML `dialog` element to provide a fully accessible modal dialog with proper ARIA attributes, focus management, and keyboard interaction patterns. It follows DKFDS specifications for government services and supports both confirmation dialogs and custom content modals.

## Installation

Import the component in your Vue application:

```typescript
import { FdsModal } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <div>
    <!-- Trigger button -->
    <FdsButton @click="modalRef.showModal()">Open Modal</FdsButton>
    
    <!-- Modal component -->
    <FdsModal 
      ref="modalRef"
      header="Confirm Action"
      accept-text="Confirm"
      cancel-text="Cancel"
      @accept="handleConfirm"
      @cancel="handleCancel"
    >
      Are you sure you want to proceed with this action?
    </FdsModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsModal, FdsButton } from '@madsb/dkfds-vue3'

const modalRef = ref<InstanceType<typeof FdsModal>>()

function handleConfirm() {
  console.log('User confirmed the action')
}

function handleCancel() {
  console.log('User cancelled the action')
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| `header` | `string` | - | No | Modal header text displayed as the dialog title |
| `id` | `string` | Auto-generated | No | Unique identifier for the modal dialog |
| `closeable` | `boolean` | `true` | No | Allow modal to be closed with X button or ESC key |
| `acceptText` | `string` | `'Godkend'` | No | Text for the primary action button |
| `cancelText` | `string` | `'Annuller'` | No | Text for the cancel button |

## Events

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `close` | `void` | Fired when modal is closed through any method (ESC key, close button, or programmatically) |
| `accept` | `void` | Fired when primary action button is clicked |
| `cancel` | `void` | Fired when cancel button is clicked or modal is dismissed |

## Slots

| Slot | Slot Props | Description |
| ---- | ---------- | ----------- |
| `header` | - | Custom header content replacing the default title and close button |
| `default` | - | Main modal content area (modal body) |
| `footer` | - | Custom footer content replacing the default action buttons |

## Exposed Methods

| Method | Description |
| ------ | ----------- |
| `showModal()` | Opens the modal dialog |
| `hideModal()` | Closes the modal dialog |

## Usage Examples

### Basic Confirmation Modal

```vue
<template>
  <div>
    <FdsButton @click="confirmDelete" variant="danger">Delete Item</FdsButton>
    
    <FdsModal 
      ref="deleteModal"
      header="Confirm Deletion"
      accept-text="Delete"
      cancel-text="Cancel"
      @accept="performDelete"
      @cancel="cancelDelete"
    >
      <p>Are you sure you want to delete this item?</p>
      <p><strong>This action cannot be undone.</strong></p>
    </FdsModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsModal, FdsButton } from '@madsb/dkfds-vue3'

const deleteModal = ref<InstanceType<typeof FdsModal>>()

function confirmDelete() {
  deleteModal.value?.showModal()
}

function performDelete() {
  // Perform deletion
  console.log('Item deleted')
}

function cancelDelete() {
  console.log('Deletion cancelled')
}
</script>
```

### Non-closeable Modal

Use for critical information that requires user acknowledgment:

```vue
<template>
  <FdsModal 
    ref="termsModal"
    header="Terms and Conditions"
    :closeable="false"
    accept-text="I Accept"
    cancel-text="I Decline"
    @accept="acceptTerms"
    @cancel="declineTerms"
  >
    <div class="terms-content">
      <p>By using this service, you agree to our terms and conditions...</p>
      <ul>
        <li>Data will be processed according to GDPR</li>
        <li>Session cookies are required for functionality</li>
        <li>User data is stored securely</li>
      </ul>
    </div>
  </FdsModal>
</template>

<script setup lang="ts">
function acceptTerms() {
  // User accepted terms
  localStorage.setItem('termsAccepted', 'true')
}

function declineTerms() {
  // Redirect user away or show alternative
  window.location.href = '/alternative-service'
}
</script>
```

### Custom Header with Icon

```vue
<template>
  <FdsModal @accept="handleSuccess" @cancel="handleCancel">
    <template #header>
      <div class="custom-header">
        <FdsIkon icon="check-circle" class="success-icon" />
        <div>
          <h2 id="modal_success_title" class="modal-title">Operation Successful</h2>
          <p class="modal-subtitle">Your request has been processed</p>
        </div>
        <button class="modal-close function-link" @click="handleClose">
          <FdsIkon icon="close" :decorative="true" />Luk
        </button>
      </div>
    </template>
    
    <p>Your application has been submitted successfully and will be reviewed within 3-5 business days.</p>
    <p>You will receive an email confirmation at <strong>user@example.dk</strong></p>
  </FdsModal>
</template>

<style scoped>
.custom-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.success-icon {
  color: var(--success-color);
  font-size: 1.5rem;
}

.modal-subtitle {
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  margin: 0;
}
</style>
```

### Custom Footer with Multiple Actions

```vue
<template>
  <FdsModal header="Save Document">
    <template #default>
      <p>Choose how to save your document:</p>
      <FdsRadioGroup v-model="saveOption" name="save-type">
        <FdsRadio value="draft">Save as draft</FdsRadio>
        <FdsRadio value="final">Save as final version</FdsRadio>
        <FdsRadio value="template">Save as template</FdsRadio>
      </FdsRadioGroup>
    </template>
    
    <template #footer>
      <FdsButton variant="primary" @click="save">
        Save Document
      </FdsButton>
      <FdsButton variant="secondary" @click="saveAndClose">
        Save & Close
      </FdsButton>
      <FdsButton variant="tertiary" @click="cancel">
        Cancel
      </FdsButton>
    </template>
  </FdsModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const saveOption = ref('draft')

function save() {
  console.log(`Saving as ${saveOption.value}`)
}

function saveAndClose() {
  save()
  // Close modal programmatically
}

function cancel() {
  // Handle cancel
}
</script>
```

### Form Validation Modal

```vue
<template>
  <FdsModal 
    ref="formModal"
    header="Submit Application"
    accept-text="Submit"
    cancel-text="Continue Editing"
    @accept="submitForm"
    @cancel="continueEditing"
  >
    <div class="validation-summary">
      <h3>Please review your application:</h3>
      
      <div v-if="errors.length > 0" class="alert alert-warning">
        <h4>Required fields missing:</h4>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      
      <div v-else class="alert alert-success">
        <p>All required information has been provided.</p>
      </div>
      
      <dl class="summary-list">
        <dt>Full Name:</dt>
        <dd>{{ formData.name }}</dd>
        
        <dt>Email:</dt>
        <dd>{{ formData.email }}</dd>
        
        <dt>Phone:</dt>
        <dd>{{ formData.phone }}</dd>
      </dl>
    </div>
  </FdsModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const formData = ref({
  name: 'Anna Nielsen',
  email: 'anna@example.dk',
  phone: '+45 12 34 56 78'
})

const errors = computed(() => {
  const errorList = []
  if (!formData.value.name) errorList.push('Full name is required')
  if (!formData.value.email) errorList.push('Email address is required')
  if (!formData.value.phone) errorList.push('Phone number is required')
  return errorList
})

function submitForm() {
  if (errors.value.length === 0) {
    // Submit the form
    console.log('Form submitted:', formData.value)
  }
}

function continueEditing() {
  // Return to form editing
  console.log('Continue editing form')
}
</script>

<style scoped>
.validation-summary {
  max-height: 400px;
  overflow-y: auto;
}

.summary-list {
  margin-top: 1rem;
}

.summary-list dt {
  font-weight: bold;
  margin-top: 0.5rem;
}

.summary-list dd {
  margin-left: 0;
  margin-bottom: 0.5rem;
  color: var(--text-color-secondary);
}
</style>
```

## Accessibility

The FdsModal component implements comprehensive accessibility features following WCAG 2.1 AA standards:

### Focus Management

- **Focus Trapping**: Focus is trapped within the modal when open
- **Initial Focus**: Focus moves to the first focusable element in the modal
- **Focus Return**: Focus returns to the trigger element when modal closes
- **Tab Navigation**: Tab cycles through focusable elements within modal

### ARIA Attributes

- `aria-modal="true"` - Indicates modal behavior
- `aria-labelledby` - References the modal title element
- `aria-hidden="false"` - Explicitly shows modal content to screen readers
- `role="dialog"` - Implicit through `<dialog>` element

### Keyboard Interaction

| Key | Action |
| --- | ------ |
| `Escape` | Closes the modal (if `closeable` is true) |
| `Tab` | Moves focus to next focusable element within modal |
| `Shift + Tab` | Moves focus to previous focusable element within modal |
| `Enter` / `Space` | Activates buttons and other interactive elements |

### Screen Reader Support

- Modal title is properly announced when opened
- Modal content is accessible to screen readers
- Close button includes descriptive text ("Luk")
- Action buttons have clear, descriptive labels

## Backdrop Behavior

The modal uses the native `<dialog>` element's backdrop functionality:

- **Backdrop Click**: Clicking outside the modal content does not close it by default
- **ESC Key**: Closes the modal if `closeable` is true
- **Programmatic Control**: Use exposed `showModal()` and `hideModal()` methods

## Modal Sizing and Responsive Behavior

The modal adapts to different screen sizes following DKFDS responsive patterns:

### Desktop (> 768px)
- Modal centers in viewport
- Maximum width with comfortable margins
- Adequate padding around content

### Mobile (≤ 768px)
- Modal takes nearly full screen width
- Optimized touch targets
- Scrollable content area if needed

### Custom Sizing

```vue
<style scoped>
:deep(.fds-modal) {
  /* Custom modal width */
  max-width: 600px;
}

:deep(.modal-body) {
  /* Custom content height with scroll */
  max-height: 400px;
  overflow-y: auto;
}
</style>
```

## Integration with Forms

### Confirmation Dialogs

```vue
<template>
  <form @submit.prevent="showConfirmation">
    <!-- Form fields -->
    <FdsButton type="submit">Submit Application</FdsButton>
  </form>
  
  <FdsModal 
    ref="confirmModal"
    header="Confirm Submission"
    accept-text="Submit Now"
    cancel-text="Review Again"
    @accept="finalSubmit"
  >
    <p>Are you ready to submit your application?</p>
    <p><strong>You will not be able to make changes after submission.</strong></p>
  </FdsModal>
</template>

<script setup lang="ts">
function showConfirmation() {
  confirmModal.value?.showModal()
}

function finalSubmit() {
  // Perform actual form submission
  submitToServer()
}
</script>
```

### Validation Errors

```vue
<template>
  <FdsModal 
    header="Validation Errors"
    accept-text="Fix Errors"
    :show-cancel="false"
    @accept="focusFirstError"
  >
    <div class="alert alert-error">
      <h3>Please correct the following errors:</h3>
      <ul>
        <li v-for="error in validationErrors" :key="error.field">
          <strong>{{ error.fieldName }}:</strong> {{ error.message }}
        </li>
      </ul>
    </div>
  </FdsModal>
</template>
```

## DKFDS Guidelines

The FdsModal component follows DKFDS v11 specifications:

### Design Principles

- **Purposeful**: Only use modals for critical interactions that require immediate attention
- **Accessible**: Full keyboard navigation and screen reader support
- **Clear Actions**: Buttons have clear, action-oriented labels
- **Consistent**: Follows DKFDS button and typography styles

### Content Guidelines

- **Clear Headlines**: Use descriptive headers that explain the modal purpose
- **Concise Content**: Keep modal content focused and brief
- **Action-Oriented**: Use action verbs for button labels (Submit, Delete, Save)
- **Danish Language**: Default text uses Danish labels following government standards

### Visual Design

- **Modal Backdrop**: Semi-transparent overlay to focus attention
- **Content Container**: White background with appropriate padding
- **Button Placement**: Primary action on the left, secondary on the right
- **Close Affordance**: X button in top right when closeable

## Related Components

- **FdsAlert** - For non-modal user feedback
- **FdsToast** - For temporary notifications
- **FdsButton** - For modal trigger and action buttons
- **FdsFormGroup** - For forms within modals

<!-- Verified against source -->