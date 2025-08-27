---
title: FdsFaneblade
description: Tab container component implementing DKFDS v11 tab specifications with slot-based architecture
category: navigation
dkfds: true
accessibility: WCAG 2.1 AA
tags: [tabs, navigation, container, accessibility, faneblade]
---

# FdsFaneblade

Tab container component implementing DKFDS v11 tab specifications. Provides a container structure for tab navigation with proper ARIA roles and semantic organization.

Uses slot-based architecture where tabs go in the "tabs" slot and corresponding panels go in the "panels" slot. This ensures proper DKFDS v11 structure with tabs and panels as sibling elements.

## Installation

This component is part of the DKFDS Vue 3 component library.

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        id="tab1" 
        label="First Tab" 
        :active="activeTab === 'tab1'"
        @click="setActiveTab" 
      />
      <fds-faneblade-tab 
        id="tab2" 
        label="Second Tab" 
        :active="activeTab === 'tab2'"
        @click="setActiveTab"
      />
    </template>
    <template #panels>
      <fds-faneblade-panel 
        id="tab1" 
        :active="activeTab === 'tab1'"
      >
        Content for first tab
      </fds-faneblade-panel>
      <fds-faneblade-panel 
        id="tab2" 
        :active="activeTab === 'tab2'"
      >
        Content for second tab
      </fds-faneblade-panel>
    </template>
  </fds-faneblade>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('tab1')

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}
</script>
```

## Props

This component has no props - it uses a slot-based architecture for composability.

## Events

This component does not emit any events directly. Event handling is managed by child components.

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `tabs` | None | Container for tab buttons (fds-faneblade-tab components) |
| `panels` | None | Container for tab panels (fds-faneblade-panel components) |

## Usage Examples

### Basic Tab Structure

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        id="personal-info"
        label="Personal Information"
        :active="currentTab === 'personal-info'"
        @click="switchTab"
      />
      <fds-faneblade-tab 
        id="contact"
        label="Contact Details"
        :active="currentTab === 'contact'"
        @click="switchTab"
      />
      <fds-faneblade-tab 
        id="preferences"
        label="Preferences"
        :active="currentTab === 'preferences'"
        @click="switchTab"
      />
    </template>
    <template #panels>
      <fds-faneblade-panel 
        id="personal-info" 
        :active="currentTab === 'personal-info'"
      >
        <h2>Personal Information</h2>
        <p>Enter your personal details here...</p>
      </fds-faneblade-panel>
      <fds-faneblade-panel 
        id="contact" 
        :active="currentTab === 'contact'"
      >
        <h2>Contact Details</h2>
        <p>Enter your contact information...</p>
      </fds-faneblade-panel>
      <fds-faneblade-panel 
        id="preferences" 
        :active="currentTab === 'preferences'"
      >
        <h2>User Preferences</h2>
        <p>Configure your preferences...</p>
      </fds-faneblade-panel>
    </template>
  </fds-faneblade>
</template>

<script setup>
import { ref } from 'vue'

const currentTab = ref('personal-info')

const switchTab = (tabId) => {
  currentTab.value = tabId
}
</script>
```

### Tabs with Icons and Dynamic Content

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        v-for="tab in tabs" 
        :key="tab.id"
        :id="tab.id" 
        :label="tab.label" 
        :icon="tab.icon"
        :active="activeTab === tab.id"
        @click="setActiveTab" 
      />
    </template>
    <template #panels>
      <fds-faneblade-panel 
        v-for="tab in tabs" 
        :key="tab.id"
        :id="tab.id" 
        :active="activeTab === tab.id"
      >
        <component :is="tab.component" />
      </fds-faneblade-panel>
    </template>
  </fds-faneblade>
</template>

<script setup>
import { ref } from 'vue'
import UserProfile from './components/UserProfile.vue'
import Settings from './components/Settings.vue'
import Notifications from './components/Notifications.vue'

const activeTab = ref('profile')

const tabs = [
  {
    id: 'profile',
    label: 'Profile',
    icon: 'person',
    component: UserProfile
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    component: Settings
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'notifications',
    component: Notifications
  }
]

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}
</script>
```

### Form with Validation in Tabs

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        id="step1"
        label="Basic Info"
        :active="currentStep === 'step1'"
        @click="changeStep"
      />
      <fds-faneblade-tab 
        id="step2"
        label="Contact"
        :active="currentStep === 'step2'"
        @click="changeStep"
      />
      <fds-faneblade-tab 
        id="step3"
        label="Review"
        :active="currentStep === 'step3'"
        @click="changeStep"
      />
    </template>
    <template #panels>
      <fds-faneblade-panel 
        id="step1" 
        :active="currentStep === 'step1'"
      >
        <fds-formgroup>
          <fds-label for="name">Full Name</fds-label>
          <fds-input id="name" v-model="formData.name" />
        </fds-formgroup>
        <fds-formgroup>
          <fds-label for="age">Age</fds-label>
          <fds-input-number id="age" v-model="formData.age" />
        </fds-formgroup>
      </fds-faneblade-panel>
      <fds-faneblade-panel 
        id="step2" 
        :active="currentStep === 'step2'"
      >
        <fds-formgroup>
          <fds-label for="email">Email</fds-label>
          <fds-input id="email" type="email" v-model="formData.email" />
        </fds-formgroup>
        <fds-formgroup>
          <fds-label for="phone">Phone</fds-label>
          <fds-input id="phone" v-model="formData.phone" />
        </fds-formgroup>
      </fds-faneblade-panel>
      <fds-faneblade-panel 
        id="step3" 
        :active="currentStep === 'step3'"
      >
        <h3>Review Your Information</h3>
        <p><strong>Name:</strong> {{ formData.name }}</p>
        <p><strong>Age:</strong> {{ formData.age }}</p>
        <p><strong>Email:</strong> {{ formData.email }}</p>
        <p><strong>Phone:</strong> {{ formData.phone }}</p>
        <fds-button @click="submitForm">Submit Application</fds-button>
      </fds-faneblade-panel>
    </template>
  </fds-faneblade>
</template>

<script setup>
import { ref, reactive } from 'vue'

const currentStep = ref('step1')
const formData = reactive({
  name: '',
  age: null,
  email: '',
  phone: ''
})

const changeStep = (stepId) => {
  currentStep.value = stepId
}

const submitForm = () => {
  console.log('Form submitted:', formData)
}
</script>
```

### Conditional Tab Content

```vue
<template>
  <fds-faneblade>
    <template #tabs>
      <fds-faneblade-tab 
        v-if="showBasicInfo"
        id="basic"
        label="Basic Information"
        :active="activeTab === 'basic'"
        @click="switchTab"
      />
      <fds-faneblade-tab 
        id="advanced"
        label="Advanced Settings"
        :active="activeTab === 'advanced'"
        @click="switchTab"
      />
      <fds-faneblade-tab 
        v-if="userRole === 'admin'"
        id="admin"
        label="Admin Panel"
        :active="activeTab === 'admin'"
        @click="switchTab"
      />
    </template>
    <template #panels>
      <fds-faneblade-panel 
        v-if="showBasicInfo"
        id="basic" 
        :active="activeTab === 'basic'"
      >
        <p>Basic information panel content...</p>
      </fds-faneblade-panel>
      <fds-faneblade-panel 
        id="advanced" 
        :active="activeTab === 'advanced'"
      >
        <p>Advanced settings panel content...</p>
      </fds-faneblade-panel>
      <fds-faneblade-panel 
        v-if="userRole === 'admin'"
        id="admin" 
        :active="activeTab === 'admin'"
      >
        <p>Admin panel content (restricted access)...</p>
      </fds-faneblade-panel>
    </template>
  </fds-faneblade>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('basic')
const showBasicInfo = ref(true)
const userRole = ref('admin') // Could be 'user' or 'admin'

const switchTab = (tabId) => {
  activeTab.value = tabId
}
</script>
```

## Accessibility

The FdsFaneblade component implements WCAG 2.1 AA compliance features:

### ARIA Implementation
- **Role Management**: Container uses proper `tablist` role for the tab container
- **Keyboard Navigation**: Supports standard tab navigation patterns when used with child components
- **Focus Management**: Proper focus handling through child tab and panel components
- **Screen Reader Support**: Semantic structure with proper ARIA relationships

### Accessibility Features
- **Semantic Structure**: Proper HTML structure following DKFDS v11 specifications
- **Focus Indicators**: Visual focus indicators on interactive elements (via child components)
- **High Contrast**: Compatible with high contrast themes
- **Screen Reader**: Descriptive labels and roles for assistive technologies

### Keyboard Navigation
- **Tab Key**: Navigate between tabs
- **Enter/Space**: Activate selected tab (handled by child components)
- **Arrow Keys**: Navigate between tabs (can be implemented in parent logic)

## DKFDS Guidelines

This component follows the official DKFDS specifications for tab navigation:

### Design Principles
- **Slot-Based Architecture**: Flexible composition pattern allowing custom tab and panel content
- **Semantic HTML**: Uses proper HTML structure with ARIA roles for accessibility
- **DKFDS v11 Compliance**: Follows the latest Danish Design System specifications

### Usage Guidelines
- Use consistent tab labeling that clearly describes panel content
- Ensure all tabs have corresponding panels with matching IDs
- Maintain logical tab order that reflects user workflow
- Consider responsive behavior for mobile devices

### Best Practices
- Keep tab labels concise and descriptive
- Use icons sparingly and only when they enhance understanding
- Ensure content is meaningful even when JavaScript is disabled
- Test with screen readers and keyboard-only navigation

## Related Components

- [FdsFanebladeTab](/components/navigation/fds-faneblade-tab) - Individual tab button component
- [FdsFanebladePanel](/components/navigation/fds-faneblade-panel) - Tab panel content component
- [FdsFanebladeNav](/components/navigation/fds-faneblade-nav) - Navigation-based tab implementation
- [FdsFanebladeNavItem](/components/navigation/fds-faneblade-nav-item) - Navigation tab item
- [FdsButton](/components/input/fds-button) - Button component for custom actions
- [FdsIkon](/components/layout/fds-ikon) - Icon component used in tabs

<!-- Verified against source -->