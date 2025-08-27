---
title: FdsToggleSwitch
description: Toggle switch component implementing DKFDS v11 switch specifications with on/off binary control, proper accessibility attributes, and customizable text labels
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [toggle, switch, binary, settings, accessibility, form]
---

# FdsToggleSwitch

Toggle switch component implementing DKFDS v11 switch specifications. Provides an on/off binary control with proper accessibility attributes and customizable text labels. Uses ARIA switch role for optimal screen reader support and follows DKFDS toggle switch interaction patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsToggleSwitch } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <div>
    <!-- Basic toggle switch -->
    <FdsToggleSwitch v-model="isEnabled" />
    
    <!-- Toggle switch with custom labels -->
    <FdsToggleSwitch 
      v-model="notifications" 
      onText="Enabled"
      offText="Disabled"
    />
    
    <!-- Toggle switch with custom content -->
    <FdsToggleSwitch v-model="darkMode">
      {{ darkMode ? 'Dark Mode On' : 'Dark Mode Off' }}
    </FdsToggleSwitch>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsToggleSwitch } from '@madsb/dkfds-vue3'

const isEnabled = ref(false)
const notifications = ref(true)
const darkMode = ref(false)
</script>
```

## Props

| Prop         | Type      | Default               | Required | Description                                                                                      |
| ------------ | --------- | --------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `id`         | `string`  | `undefined`           | No       | Unique identifier for the toggle switch. If not provided, will be auto-generated.               |
| `modelValue` | `boolean` | `false`               | No       | The v-model boolean value for two-way data binding. True represents "on", false represents "off". |
| `disabled`   | `boolean` | `false`               | No       | Whether the toggle switch is disabled. Prevents user interaction and applies disabled styling.   |
| `offText`    | `string`  | `'Fra'`               | No       | Text to display when toggle is in the "off" state. Only used if no slot content is provided.   |
| `onText`     | `string`  | `'Til'`               | No       | Text to display when toggle is in the "on" state. Only used if no slot content is provided.    |
| `class`      | `string`  | `''`                  | No       | Additional CSS classes to apply to the toggle switch.                                           |

## Events

| Event               | Payload       | Description                                                           |
| ------------------- | ------------- | --------------------------------------------------------------------- |
| `update:modelValue` | `boolean`     | Emitted when toggle state changes. Used for v-model two-way data binding. |
| `click`             | `MouseEvent`  | Emitted on click event. Provides access to the raw DOM click event.  |

## Slots

| Slot      | Slot Props | Description                                                                                          |
| --------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| `default` | None       | Custom content for the toggle switch. If provided, overrides the onText/offText props.              |

## Usage Examples

### Basic Toggle Switches

```vue
<template>
  <div class="space-y-4">
    <!-- Simple on/off toggle -->
    <div>
      <FdsToggleSwitch v-model="simpleToggle" />
      <p>Status: {{ simpleToggle ? 'On' : 'Off' }}</p>
    </div>
    
    <!-- Toggle with custom Danish labels -->
    <div>
      <FdsToggleSwitch 
        v-model="emailNotifications" 
        onText="Aktiveret"
        offText="Deaktiveret"
      />
      <p>Email notifikationer: {{ emailNotifications ? 'Aktiveret' : 'Deaktiveret' }}</p>
    </div>
    
    <!-- Toggle with English labels -->
    <div>
      <FdsToggleSwitch 
        v-model="pushNotifications" 
        onText="Enabled"
        offText="Disabled"
      />
      <p>Push notifications: {{ pushNotifications ? 'Enabled' : 'Disabled' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsToggleSwitch } from '@madsb/dkfds-vue3'

const simpleToggle = ref(false)
const emailNotifications = ref(true)
const pushNotifications = ref(false)
</script>
```

### Toggle Switches with Custom Content

```vue
<template>
  <div class="space-y-4">
    <!-- Toggle with dynamic content -->
    <FdsToggleSwitch v-model="darkMode">
      <span :class="darkMode ? 'text-light' : 'text-dark'">
        {{ darkMode ? '🌙 Mørk tilstand' : '☀️ Lys tilstand' }}
      </span>
    </FdsToggleSwitch>
    
    <!-- Toggle with status indicators -->
    <FdsToggleSwitch v-model="dataCollection">
      <div class="d-flex align-items-center">
        <span class="status-indicator" :class="dataCollection ? 'active' : 'inactive'"></span>
        <span class="ms-2">
          Dataindsamling {{ dataCollection ? 'tilladt' : 'forbudt' }}
        </span>
      </div>
    </FdsToggleSwitch>
    
    <!-- Toggle with detailed state -->
    <FdsToggleSwitch v-model="autoSave">
      <div>
        <strong>Automatisk gemning:</strong>
        <small class="d-block text-muted">
          {{ autoSave ? 'Dine ændringer gemmes automatisk' : 'Du skal gemme manuelt' }}
        </small>
      </div>
    </FdsToggleSwitch>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsToggleSwitch } from '@madsb/dkfds-vue3'

const darkMode = ref(false)
const dataCollection = ref(false)
const autoSave = ref(true)
</script>

<style scoped>
.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.status-indicator.active {
  background-color: #28a745;
}

.status-indicator.inactive {
  background-color: #dc3545;
}
</style>
```

### Form Integration with Labels and Descriptions

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Toggle switch in form group -->
    <FdsFormgroup>
      <template #default="{ formid, ariaDescribedby }">
        <FdsLabel :forId="formid">Email Notifications</FdsLabel>
        <FdsHint>Receive email updates about your account activity</FdsHint>
        <FdsToggleSwitch 
          v-model="settings.emailNotifications" 
          :id="formid"
          onText="On"
          offText="Off"
        />
      </template>
    </FdsFormgroup>
    
    <!-- Multiple toggle switches with descriptions -->
    <fieldset>
      <legend class="form-label">Privacy Settings</legend>
      
      <FdsFormgroup>
        <template #default="{ formid }">
          <FdsLabel :forId="formid">Public Profile</FdsLabel>
          <FdsHint>Make your profile visible to other users</FdsHint>
          <FdsToggleSwitch 
            v-model="settings.publicProfile" 
            :id="formid"
            onText="Synlig"
            offText="Skjult"
          />
        </template>
      </FdsFormgroup>
      
      <FdsFormgroup>
        <template #default="{ formid }">
          <FdsLabel :forId="formid">Location Tracking</FdsLabel>
          <FdsHint>Allow the app to track your location for better service</FdsHint>
          <FdsToggleSwitch 
            v-model="settings.locationTracking" 
            :id="formid"
          >
            <span class="d-flex align-items-center">
              <i class="icon" :class="settings.locationTracking ? 'icon-location' : 'icon-location-off'"></i>
              <span class="ms-2">
                {{ settings.locationTracking ? 'Lokation aktiv' : 'Lokation inaktiv' }}
              </span>
            </span>
          </FdsToggleSwitch>
        </template>
      </FdsFormgroup>
    </fieldset>
    
    <!-- Settings summary -->
    <div class="mt-4 p-3 bg-light border">
      <h4>Current Settings</h4>
      <ul class="list-unstyled">
        <li>Email Notifications: <strong>{{ settings.emailNotifications ? 'Enabled' : 'Disabled' }}</strong></li>
        <li>Public Profile: <strong>{{ settings.publicProfile ? 'Visible' : 'Hidden' }}</strong></li>
        <li>Location Tracking: <strong>{{ settings.locationTracking ? 'Active' : 'Inactive' }}</strong></li>
      </ul>
    </div>
    
    <div class="form-actions mt-4">
      <FdsButton type="submit" variant="primary">
        Save Settings
      </FdsButton>
      <FdsButton type="button" variant="secondary" @click="resetSettings">
        Reset to Defaults
      </FdsButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  FdsToggleSwitch, 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint, 
  FdsButton 
} from '@madsb/dkfds-vue3'

const settings = reactive({
  emailNotifications: true,
  publicProfile: false,
  locationTracking: false
})

const handleSubmit = () => {
  console.log('Settings saved:', settings)
  // Handle form submission
}

const resetSettings = () => {
  settings.emailNotifications = true
  settings.publicProfile = false
  settings.locationTracking = false
}
</script>
```

### Disabled Toggle Switches

```vue
<template>
  <div class="space-y-4">
    <h3>Disabled Toggle Switches</h3>
    
    <!-- Disabled in off state -->
    <div>
      <FdsToggleSwitch 
        :model-value="false" 
        :disabled="true"
        onText="Enabled"
        offText="Disabled"
      />
      <p class="text-muted">This toggle is disabled in the off state</p>
    </div>
    
    <!-- Disabled in on state -->
    <div>
      <FdsToggleSwitch 
        :model-value="true" 
        :disabled="true"
        onText="Enabled"
        offText="Disabled"
      />
      <p class="text-muted">This toggle is disabled in the on state</p>
    </div>
    
    <!-- Conditionally disabled -->
    <div>
      <FdsToggleSwitch v-model="enableAdvanced">
        Enable Advanced Features
      </FdsToggleSwitch>
      
      <div class="mt-3">
        <FdsToggleSwitch 
          v-model="advancedFeature1" 
          :disabled="!enableAdvanced"
        >
          Advanced Feature 1
        </FdsToggleSwitch>
        
        <FdsToggleSwitch 
          v-model="advancedFeature2" 
          :disabled="!enableAdvanced"
        >
          Advanced Feature 2
        </FdsToggleSwitch>
      </div>
      
      <p class="text-muted mt-2">
        Advanced features are {{ enableAdvanced ? 'available' : 'unavailable' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsToggleSwitch } from '@madsb/dkfds-vue3'

const enableAdvanced = ref(false)
const advancedFeature1 = ref(false)
const advancedFeature2 = ref(false)
</script>
```

### Event Handling and Validation

```vue
<template>
  <div>
    <h3>Event Handling Examples</h3>
    
    <!-- Basic event handling -->
    <FdsToggleSwitch 
      v-model="termsAccepted" 
      @click="handleTermsClick"
      @update:modelValue="handleTermsChange"
    >
      I accept the terms and conditions
    </FdsToggleSwitch>
    
    <!-- Validation with error state -->
    <FdsFormgroup :isValid="validation.terms.isValid">
      <FdsToggleSwitch 
        v-model="agreementAccepted" 
        @update:modelValue="validateAgreement"
        :class="{ 'error': !validation.terms.isValid }"
      >
        I agree to the user agreement *
      </FdsToggleSwitch>
      <FdsFejlmeddelelse v-if="!validation.terms.isValid">
        {{ validation.terms.message }}
      </FdsFejlmeddelelse>
    </FdsFormgroup>
    
    <!-- Confirmation dialog -->
    <FdsToggleSwitch 
      v-model="criticalSetting" 
      @click="handleCriticalToggle"
    >
      <span class="text-warning">
        <i class="icon-warning"></i> Critical System Setting
      </span>
    </FdsToggleSwitch>
    
    <!-- Event log for debugging -->
    <div class="mt-4 p-3 bg-light border" v-if="eventLog.length > 0">
      <h4>Event Log</h4>
      <ul class="list-unstyled">
        <li v-for="(event, index) in eventLog" :key="index" class="small">
          <code>{{ event.timestamp }}</code>: {{ event.message }}
        </li>
      </ul>
      <FdsButton 
        type="button" 
        variant="secondary" 
        size="small" 
        @click="clearEventLog"
      >
        Clear Log
      </FdsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  FdsToggleSwitch, 
  FdsFormgroup, 
  FdsFejlmeddelelse, 
  FdsButton 
} from '@madsb/dkfds-vue3'

const termsAccepted = ref(false)
const agreementAccepted = ref(false)
const criticalSetting = ref(false)

const validation = reactive({
  terms: { isValid: true, message: '' }
})

const eventLog = ref<Array<{ timestamp: string; message: string }>>([])

const addToEventLog = (message: string) => {
  eventLog.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    message
  })
  
  // Keep only last 10 events
  if (eventLog.value.length > 10) {
    eventLog.value = eventLog.value.slice(0, 10)
  }
}

const handleTermsClick = (event: MouseEvent) => {
  addToEventLog(`Terms toggle clicked, will be: ${!termsAccepted.value}`)
}

const handleTermsChange = (value: boolean) => {
  addToEventLog(`Terms changed to: ${value}`)
}

const validateAgreement = (value: boolean) => {
  validation.terms.isValid = value
  validation.terms.message = value ? '' : 'You must accept the user agreement to continue'
  addToEventLog(`Agreement validation: ${value ? 'Valid' : 'Invalid'}`)
}

const handleCriticalToggle = (event: MouseEvent) => {
  const newValue = !criticalSetting.value
  
  if (newValue && !confirm('Are you sure you want to enable this critical setting? This may affect system performance.')) {
    event.preventDefault()
    addToEventLog('Critical setting change cancelled by user')
    return false
  }
  
  addToEventLog(`Critical setting will change to: ${newValue}`)
}

const clearEventLog = () => {
  eventLog.value = []
}
</script>
```

### Advanced Usage with State Management

```vue
<template>
  <div>
    <h3>User Preferences Dashboard</h3>
    
    <!-- Notification Settings -->
    <div class="settings-group">
      <h4>Notification Settings</h4>
      
      <FdsToggleSwitch 
        v-model="preferences.notifications.email" 
        @update:modelValue="savePreferences"
      >
        Email Notifications
      </FdsToggleSwitch>
      
      <FdsToggleSwitch 
        v-model="preferences.notifications.push" 
        @update:modelValue="savePreferences"
        :disabled="!preferences.notifications.email"
      >
        Push Notifications
        <template v-if="!preferences.notifications.email">
          (Requires email notifications)
        </template>
      </FdsToggleSwitch>
      
      <FdsToggleSwitch 
        v-model="preferences.notifications.sms" 
        @update:modelValue="savePreferences"
      >
        SMS Notifications
      </FdsToggleSwitch>
    </div>
    
    <!-- Privacy Settings -->
    <div class="settings-group">
      <h4>Privacy Settings</h4>
      
      <FdsToggleSwitch 
        v-model="preferences.privacy.profileVisible" 
        @update:modelValue="savePreferences"
      >
        Public Profile
      </FdsToggleSwitch>
      
      <FdsToggleSwitch 
        v-model="preferences.privacy.shareActivity" 
        @update:modelValue="savePreferences"
        :disabled="!preferences.privacy.profileVisible"
      >
        Share Activity Status
      </FdsToggleSwitch>
      
      <FdsToggleSwitch 
        v-model="preferences.privacy.allowContact" 
        @update:modelValue="savePreferences"
      >
        Allow Contact from Other Users
      </FdsToggleSwitch>
    </div>
    
    <!-- System Settings -->
    <div class="settings-group">
      <h4>System Settings</h4>
      
      <FdsToggleSwitch 
        v-model="preferences.system.darkMode" 
        @update:modelValue="handleDarkModeChange"
      >
        <span class="d-flex align-items-center">
          {{ preferences.system.darkMode ? '🌙' : '☀️' }}
          <span class="ms-2">
            {{ preferences.system.darkMode ? 'Dark Mode' : 'Light Mode' }}
          </span>
        </span>
      </FdsToggleSwitch>
      
      <FdsToggleSwitch 
        v-model="preferences.system.autoSave" 
        @update:modelValue="savePreferences"
      >
        Auto-save Changes
      </FdsToggleSwitch>
      
      <FdsToggleSwitch 
        v-model="preferences.system.soundEnabled" 
        @update:modelValue="savePreferences"
      >
        Sound Effects
      </FdsToggleSwitch>
    </div>
    
    <!-- Save status -->
    <div class="mt-4" v-if="saveStatus">
      <FdsAlert :variant="saveStatus.type">
        {{ saveStatus.message }}
      </FdsAlert>
    </div>
    
    <!-- Reset button -->
    <div class="mt-4">
      <FdsButton 
        type="button" 
        variant="secondary" 
        @click="resetToDefaults"
      >
        Reset to Defaults
      </FdsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import { 
  FdsToggleSwitch, 
  FdsButton, 
  FdsAlert 
} from '@madsb/dkfds-vue3'

interface UserPreferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    shareActivity: boolean
    allowContact: boolean
  }
  system: {
    darkMode: boolean
    autoSave: boolean
    soundEnabled: boolean
  }
}

const preferences = reactive<UserPreferences>({
  notifications: {
    email: true,
    push: false,
    sms: false
  },
  privacy: {
    profileVisible: false,
    shareActivity: false,
    allowContact: true
  },
  system: {
    darkMode: false,
    autoSave: true,
    soundEnabled: true
  }
})

const saveStatus = ref<{ type: 'success' | 'error'; message: string } | null>(null)

// Auto-disable dependent settings
watch(() => preferences.notifications.email, (emailEnabled) => {
  if (!emailEnabled) {
    preferences.notifications.push = false
  }
})

watch(() => preferences.privacy.profileVisible, (profileVisible) => {
  if (!profileVisible) {
    preferences.privacy.shareActivity = false
  }
})

const savePreferences = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Store in localStorage for demo
    localStorage.setItem('userPreferences', JSON.stringify(preferences))
    
    saveStatus.value = {
      type: 'success',
      message: 'Preferences saved successfully!'
    }
    
    // Clear status after 3 seconds
    setTimeout(() => {
      saveStatus.value = null
    }, 3000)
    
  } catch (error) {
    saveStatus.value = {
      type: 'error',
      message: 'Failed to save preferences. Please try again.'
    }
  }
}

const handleDarkModeChange = (enabled: boolean) => {
  // Apply dark mode immediately
  document.body.classList.toggle('dark-mode', enabled)
  
  // Save preferences
  savePreferences()
}

const resetToDefaults = () => {
  if (confirm('Are you sure you want to reset all preferences to default values?')) {
    preferences.notifications.email = true
    preferences.notifications.push = false
    preferences.notifications.sms = false
    
    preferences.privacy.profileVisible = false
    preferences.privacy.shareActivity = false
    preferences.privacy.allowContact = true
    
    preferences.system.darkMode = false
    preferences.system.autoSave = true
    preferences.system.soundEnabled = true
    
    // Remove dark mode class
    document.body.classList.remove('dark-mode')
    
    savePreferences()
  }
}

// Load preferences on mount
const loadPreferences = () => {
  try {
    const saved = localStorage.getItem('userPreferences')
    if (saved) {
      const parsed = JSON.parse(saved)
      Object.assign(preferences, parsed)
      
      // Apply dark mode if enabled
      if (preferences.system.darkMode) {
        document.body.classList.add('dark-mode')
      }
    }
  } catch (error) {
    console.warn('Failed to load user preferences:', error)
  }
}

// Load preferences on component mount
nextTick(loadPreferences)
</script>

<style scoped>
.settings-group {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.settings-group:last-child {
  border-bottom: none;
}

.settings-group h4 {
  margin-bottom: 1rem;
  color: #495057;
}
</style>
```

## Accessibility

FdsToggleSwitch implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### Keyboard Navigation

- **Space key**: Toggles switch state when focused
- **Enter key**: Toggles switch state when focused (follows ARIA switch pattern)
- **Tab navigation**: Switch receives focus in natural tab order
- **Focus management**: Clear visual focus indicators with proper contrast ratios

### Screen Reader Support

- **ARIA switch role**: Uses `role="switch"` for proper semantic meaning
- **State announcement**: `aria-checked` attribute announces current state (true/false)
- **Label association**: Automatic ID generation and proper labeling
- **Content changes**: Screen readers announce state changes and content updates

### ARIA Support

- **aria-checked**: Indicates current switch state (`"true"` or `"false"`)
- **aria-describedby**: Automatic injection from parent FdsFormgroup context
- **role="switch"**: Semantic role for toggle switch behavior
- **Keyboard support**: Full keyboard accessibility following ARIA switch pattern

### Focus Management

- **Visual indicators**: Clear focus outline with sufficient contrast
- **Focus retention**: Focus remains on switch during state changes
- **Logical order**: Participates in natural tab order
- **No focus traps**: Focus moves naturally through the interface

## DKFDS Guidelines

FdsToggleSwitch follows the Danish Common Design System specifications:

### Design System Integration

- **Semantic classes**: Uses standard `toggle-switch` CSS class
- **Visual consistency**: Follows DKFDS toggle switch styling and spacing specifications
- **Theme compatibility**: Works seamlessly with both VirkDK and BorgerDK themes
- **State indicators**: Uses DKFDS standard visual states and transitions

### Form Structure Standards

- **DKFDS v11 compliance**: Implements latest DKFDS switch specifications
- **Form integration**: Designed to work with other DKFDS form components
- **Button semantics**: Uses `<button>` element with proper ARIA attributes
- **State management**: Follows DKFDS patterns for binary controls

### Behavior Scripts Integration

- **DKFDS behaviors**: Compatible with official DKFDS JavaScript behaviors
- **Progressive enhancement**: Works without JavaScript while enhanced with Vue reactivity
- **Event compatibility**: Emits standard DOM events for DKFDS script integration
- **Attribute support**: Uses standard HTML attributes and ARIA properties

### Danish Language Conventions

- **Default labels**: Danish "Til"/"Fra" (On/Off) as default text
- **Cultural adaptation**: Supports Danish public sector requirements
- **Content patterns**: Examples use Danish terminology and patterns
- **Accessibility standards**: Meets Danish accessibility requirements

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form group container with validation context and error handling
- **[FdsLabel](/components/forms/fds-label)** - Form labels with required field indicators and proper association
- **[FdsHint](/components/forms/fds-hint)** - Helper text and guidance for form fields
- **[FdsCheckbox](/components/input/fds-checkbox)** - Checkboxes for boolean selection with conditional content
- **[FdsRadioGroup](/components/input/fds-radio-group)** - Radio button groups for single selection from multiple options
- **[FdsButton](/components/input/fds-button)** - Buttons for actions and form submission

## TypeScript Support

```typescript
import type { FdsToggleSwitchProps } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsToggleSwitchProps {
  id?: string
  modelValue?: boolean
  disabled?: boolean
  offText?: string
  onText?: string
  class?: string
}

// Event payload types
type ToggleSwitchChangePayload = boolean
type ToggleSwitchClickPayload = MouseEvent

// Usage in component
const toggleProps: FdsToggleSwitchProps = {
  id: 'my-toggle',
  modelValue: false,
  disabled: false,
  onText: 'Enabled',
  offText: 'Disabled'
}

// Reactive references with proper typing
const toggleState = ref<boolean>(false)
const isDisabled = ref<boolean>(false)
const customClass = ref<string>('my-custom-toggle')
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/input/fds-toggle-switch.vue -->