---
title: FdsInputLimit
description: Character limit indicator component implementing DKFDS v11 character constraint specifications with real-time feedback, warning states, and accessibility support
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: [character-limit, textarea, input, feedback, validation, accessibility, danish]
---

# FdsInputLimit

Character limit indicator component implementing DKFDS v11 character constraint specifications. Provides real-time character count feedback with warning and error states, automatically integrating with form controls to display remaining characters, warn when approaching limits, and indicate when limits are exceeded. Supports customizable thresholds and messaging following DKFDS patterns.

## Installation

```bash
npm install @madsb/dkfds-vue3
```

```typescript
import { FdsInputLimit } from '@madsb/dkfds-vue3'
```

## Quick Start

```vue
<template>
  <div>
    <!-- Basic character limit -->
    <FdsTextarea v-model="description" maxlength="200" />
    <FdsInputLimit v-model="description" :limit="200" />
    
    <!-- In form group -->
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel>Kommentar</FdsLabel>
        <FdsTextarea v-model="comment" :id="formid" />
        <FdsInputLimit v-model="comment" :limit="300" />
      </template>
    </FdsFormgroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsInputLimit, FdsTextarea, FdsFormgroup, FdsLabel } from '@madsb/dkfds-vue3'

const description = ref('')
const comment = ref('')
</script>
```

## Props

| Prop             | Type                                                   | Default                                                                                               | Required | Description                                                                                      |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `modelValue`     | `string \| null`                                       | `null`                                                                                                | No       | Current input value to count characters for. Should be bound to same v-model as input/textarea. |
| `limit`          | `number`                                               | -                                                                                                     | Yes      | Maximum number of characters allowed. Used to calculate remaining characters and exceeded state.  |
| `id`             | `string`                                               | `undefined`                                                                                           | No       | Custom ID for limit message element. Uses injected hintId + '-limit' if not provided.           |
| `warningThreshold` | `number`                                             | `0.8`                                                                                                 | No       | Warning threshold as percentage of limit (0-1). When reached, displays warning styling.         |
| `messages`       | `FdsInputLimitMessages`                                | `{ initial: 'Du kan indtaste op til {limit} tegn', remaining: 'Du har {remaining} tegn tilbage', warning: 'Du har {remaining} tegn tilbage', exceeded: 'Du har {exceeded} tegn for meget' }` | No       | Custom messages for different states with template variables support.                            |

## Events

This component does not emit any events. It's a read-only feedback component that reacts to the `modelValue` prop changes.

## Slots

This component does not provide any slots. All messaging is handled through the `messages` prop configuration.

## Usage Examples

### Basic Character Limit with Textarea

```vue
<template>
  <div>
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel for="description">Beskriv dit ærinde</FdsLabel>
        <FdsHint>Beskriv kort hvad dit ærinde handler om</FdsHint>
        <FdsTextarea 
          v-model="description" 
          :id="formid"
          rows="4"
          placeholder="Skriv din beskrivelse her..."
        />
        <FdsInputLimit v-model="description" :limit="500" />
      </template>
    </FdsFormgroup>
    
    <div class="mt-3">
      <p><strong>Nuværende længde:</strong> {{ description.length }} tegn</p>
      <p><strong>Status:</strong> {{ getStatus(description) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsInputLimit, FdsTextarea, FdsFormgroup, FdsLabel, FdsHint } from '@madsb/dkfds-vue3'

const description = ref('')

const getStatus = (text: string) => {
  if (text.length > 500) return 'Over grænsen'
  if (text.length >= 400) return 'Nærmer sig grænsen'
  return 'Indenfor grænsen'
}
</script>
```

### Input Field with Character Limit

```vue
<template>
  <div>
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel for="title">Titel</FdsLabel>
        <FdsHint>Kort og beskrivende titel</FdsHint>
        <FdsInput 
          v-model="title" 
          :id="formid"
          placeholder="Indtast titel..."
        />
        <FdsInputLimit v-model="title" :limit="100" />
      </template>
    </FdsFormgroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsInputLimit, FdsInput, FdsFormgroup, FdsLabel, FdsHint } from '@madsb/dkfds-vue3'

const title = ref('')
</script>
```

### Custom Warning Threshold

```vue
<template>
  <div>
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel for="summary">Sammendrag</FdsLabel>
        <FdsTextarea 
          v-model="summary" 
          :id="formid"
          rows="3"
        />
        <!-- Warning appears at 90% instead of default 80% -->
        <FdsInputLimit 
          v-model="summary" 
          :limit="200" 
          :warningThreshold="0.9"
        />
      </template>
    </FdsFormgroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsInputLimit, FdsTextarea, FdsFormgroup, FdsLabel } from '@madsb/dkfds-vue3'

const summary = ref('')
</script>
```

### Custom Messages

```vue
<template>
  <div>
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel for="feedback">Feedback</FdsLabel>
        <FdsTextarea 
          v-model="feedback" 
          :id="formid"
          rows="5"
        />
        <FdsInputLimit 
          v-model="feedback" 
          :limit="1000"
          :messages="{
            initial: 'Maksimalt {limit} tegn tilladt',
            remaining: 'Der er {remaining} tegn tilbage',
            warning: 'Kun {remaining} tegn tilbage - vær opmærksom på længden',
            exceeded: 'Teksten er {exceeded} tegn for lang'
          }"
        />
      </template>
    </FdsFormgroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FdsInputLimit, FdsTextarea, FdsFormgroup, FdsLabel } from '@madsb/dkfds-vue3'

const feedback = ref('')
</script>
```

### Multiple Input Fields with Different Limits

```vue
<template>
  <div class="space-y-4">
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel for="name">Navn</FdsLabel>
        <FdsInput 
          v-model="form.name" 
          :id="formid"
          placeholder="Dit fulde navn"
        />
        <FdsInputLimit v-model="form.name" :limit="50" />
      </template>
    </FdsFormgroup>
    
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel for="email">E-mail</FdsLabel>
        <FdsInput 
          v-model="form.email" 
          :id="formid"
          type="email"
          placeholder="din@email.dk"
        />
        <FdsInputLimit v-model="form.email" :limit="100" />
      </template>
    </FdsFormgroup>
    
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel for="message">Besked</FdsLabel>
        <FdsTextarea 
          v-model="form.message" 
          :id="formid"
          rows="6"
          placeholder="Din besked..."
        />
        <FdsInputLimit v-model="form.message" :limit="2000" :warningThreshold="0.85" />
      </template>
    </FdsFormgroup>
    
    <div class="mt-4">
      <h4>Formular status:</h4>
      <ul>
        <li>Navn: {{ form.name.length }}/50 tegn</li>
        <li>E-mail: {{ form.email.length }}/100 tegn</li>
        <li>Besked: {{ form.message.length }}/2000 tegn</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { FdsInputLimit, FdsInput, FdsTextarea, FdsFormgroup, FdsLabel } from '@madsb/dkfds-vue3'

const form = reactive({
  name: '',
  email: '',
  message: ''
})
</script>
```

### Form Validation Integration

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <FdsFormgroup :isValid="validation.description.isValid">
      <template #default="{ formid }">
        <FdsLabel for="description">Produktbeskrivelse</FdsLabel>
        <FdsHint>Beskriv produktet i detaljer</FdsHint>
        <FdsTextarea 
          v-model="form.description" 
          :id="formid"
          rows="8"
          @blur="validateDescription"
          :class="{ 'error': !validation.description.isValid }"
        />
        <FdsInputLimit v-model="form.description" :limit="maxLength" />
        <FdsFejlmeddelelse v-if="!validation.description.isValid">
          {{ validation.description.message }}
        </FdsFejlmeddelelse>
      </template>
    </FdsFormgroup>
    
    <div class="form-actions mt-4">
      <FdsButton type="submit" variant="primary" :disabled="!isFormValid">
        Gem beskrivelse
      </FdsButton>
      <FdsButton type="button" variant="secondary" @click="clearForm">
        Ryd
      </FdsButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { 
  FdsInputLimit, 
  FdsTextarea, 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint,
  FdsFejlmeddelelse,
  FdsButton 
} from '@madsb/dkfds-vue3'

const maxLength = 500

const form = reactive({
  description: ''
})

const validation = ref({
  description: { isValid: true, message: '' }
})

const isFormValid = computed(() => {
  return form.description.trim().length > 0 && 
         form.description.length <= maxLength &&
         validation.value.description.isValid
})

const validateDescription = () => {
  const desc = form.description.trim()
  const field = validation.value.description
  
  if (desc.length === 0) {
    field.isValid = false
    field.message = 'Beskrivelse er påkrævet'
  } else if (desc.length < 10) {
    field.isValid = false
    field.message = 'Beskrivelsen skal være mindst 10 tegn'
  } else if (desc.length > maxLength) {
    field.isValid = false
    field.message = `Beskrivelsen må maksimalt være ${maxLength} tegn`
  } else {
    field.isValid = true
    field.message = ''
  }
}

const handleSubmit = () => {
  validateDescription()
  
  if (isFormValid.value) {
    console.log('Form submitted:', form)
    // Handle form submission
  }
}

const clearForm = () => {
  form.description = ''
  validation.value.description = { isValid: true, message: '' }
}
</script>
```

### Dynamic Character Limits

```vue
<template>
  <div>
    <div class="mb-4">
      <FdsFormgroup>
        <FdsLabel>Vælg grænse:</FdsLabel>
        <FdsSelect v-model="selectedLimit">
          <option value="100">Kort (100 tegn)</option>
          <option value="500">Medium (500 tegn)</option>
          <option value="1000">Lang (1000 tegn)</option>
          <option value="2000">Meget lang (2000 tegn)</option>
        </FdsSelect>
      </FdsFormgroup>
    </div>
    
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel for="content">Indhold</FdsLabel>
        <FdsHint>Skriv dit indhold - grænsen justeres automatisk</FdsHint>
        <FdsTextarea 
          v-model="content" 
          :id="formid"
          rows="10"
        />
        <FdsInputLimit 
          v-model="content" 
          :limit="Number(selectedLimit)"
          :messages="{
            initial: 'Du kan skrive op til {limit} tegn i alt',
            remaining: '{remaining} tegn tilbage af {limit}',
            warning: 'Kun {remaining} tegn tilbage - du nærmer dig grænsen',
            exceeded: 'Du har skrevet {exceeded} tegn for meget (maksimalt {limit} tegn)'
          }"
        />
      </template>
    </FdsFormgroup>
    
    <div class="mt-3">
      <FdsAlert 
        v-if="content.length > Number(selectedLimit)"
        variant="error"
      >
        Teksten er for lang! Reducer indholdet med {{ content.length - Number(selectedLimit) }} tegn.
      </FdsAlert>
      <FdsAlert 
        v-else-if="content.length >= Number(selectedLimit) * 0.9"
        variant="warning"
      >
        Du nærmer dig tegngrænsen. {{ Number(selectedLimit) - content.length }} tegn tilbage.
      </FdsAlert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  FdsInputLimit, 
  FdsTextarea, 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint,
  FdsSelect,
  FdsAlert 
} from '@madsb/dkfds-vue3'

const selectedLimit = ref('500')
const content = ref('')
</script>
```

### Integration with Rich Text or Special Characters

```vue
<template>
  <div>
    <FdsFormgroup>
      <template #default="{ formid }">
        <FdsLabel for="message">Besked med specialtegn</FdsLabel>
        <FdsHint>Inklusiv emojis og specialtegn</FdsHint>
        <FdsTextarea 
          v-model="message" 
          :id="formid"
          rows="6"
          placeholder="Skriv din besked her... 😊"
        />
        <FdsInputLimit v-model="message" :limit="280" />
      </template>
    </FdsFormgroup>
    
    <div class="mt-3">
      <h4>Karakter analyse:</h4>
      <ul>
        <li>Totalt antal tegn: {{ message.length }}</li>
        <li>Antal ord: {{ getWordCount(message) }}</li>
        <li>Antal linjer: {{ getLineCount(message) }}</li>
        <li>Uden mellemrum: {{ message.replace(/\s/g, '').length }}</li>
      </ul>
    </div>
    
    <div class="mt-3">
      <FdsButton @click="addEmoji">Tilføj emoji 😊</FdsButton>
      <FdsButton @click="addDanishChars" variant="secondary">
        Tilføj danske tegn (æøå)
      </FdsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  FdsInputLimit, 
  FdsTextarea, 
  FdsFormgroup, 
  FdsLabel, 
  FdsHint,
  FdsButton 
} from '@madsb/dkfds-vue3'

const message = ref('')

const getWordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

const getLineCount = (text: string): number => {
  return text.split('\n').length
}

const addEmoji = () => {
  const emojis = ['😊', '👍', '❤️', '🎉', '🌟', '🇩🇰']
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
  message.value += ` ${randomEmoji}`
}

const addDanishChars = () => {
  const danishWords = ['ægte', 'økonomi', 'ålborg', 'kærlighed', 'hårdt', 'løsning']
  const randomWord = danishWords[Math.floor(Math.random() * danishWords.length)]
  message.value += ` ${randomWord}`
}
</script>
```

## Accessibility

FdsInputLimit implements comprehensive accessibility features following WCAG 2.1 AA guidelines:

### Screen Reader Support

- **Dynamic announcements**: Uses `aria-live="polite"` for character count updates and `aria-live="assertive"` when limit exceeded
- **Initial context**: Provides screen reader-only initial message with total character limit
- **State changes**: Announces remaining characters and exceeded state changes appropriately
- **Integration**: Automatically integrates with form group context for proper labeling

### Keyboard Navigation

- **Non-interactive**: Component doesn't interfere with keyboard navigation of associated input fields
- **Focus management**: Doesn't steal focus from input/textarea elements
- **Natural flow**: Maintains natural tab order and focus progression

### ARIA Support

- **aria-live regions**: Proper live region setup for dynamic character count announcements
- **ID management**: Automatic ID generation and association with form controls
- **Context integration**: Works with injected `hintId` from parent form group components
- **Screen reader text**: Provides initial context through screen reader-only text

### Visual Accessibility

- **Color coding**: Uses semantic colors (warning yellow, error red) with sufficient contrast
- **Multiple indicators**: Combines color with text messages for accessibility
- **Clear messaging**: Provides clear numerical feedback in addition to color changes
- **Contrast compliance**: Uses CSS custom properties that meet WCAG color contrast requirements

## DKFDS Guidelines

FdsInputLimit follows the Danish Common Design System specifications:

### Design System Integration

- **DKFDS v11 compliance**: Implements latest DKFDS character constraint specifications
- **Semantic classes**: Uses standard `form-hint` and `character-limit` CSS classes
- **Theme compatibility**: Works seamlessly with both VirkDK and BorgerDK themes
- **Visual consistency**: Follows DKFDS styling patterns for form feedback

### Danish Language Support

- **Default Danish messages**: Provides proper Danish language defaults for all message states
- **Cultural adaptation**: Uses Danish terminology and phrasing patterns
- **Template variables**: Supports `{limit}`, `{remaining}`, and `{exceeded}` placeholders for dynamic content
- **Localization ready**: Easy to customize messages for different Danish contexts

### Form Integration Standards

- **Form group compatibility**: Designed to work within DKFDS form group patterns
- **Hint text patterns**: Follows DKFDS conventions for supplementary form information
- **Progressive disclosure**: Provides feedback without overwhelming the user interface
- **Error state integration**: Compatible with DKFDS error handling patterns

### Behavior Script Integration

- **DKFDS behaviors**: Compatible with official DKFDS JavaScript behavior scripts
- **Progressive enhancement**: Functions without JavaScript while enhanced with Vue reactivity
- **Event compatibility**: Uses standard DOM events for integration with other DKFDS components
- **Attribute conventions**: Uses proper DKFDS data attributes and ID patterns

## Related Components

- **[FdsTextarea](/components/input/fds-textarea)** - Multi-line text input that commonly uses character limits
- **[FdsInput](/components/input/fds-input)** - Single-line text input that can benefit from character counting
- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form group container that provides context for character limit integration
- **[FdsHint](/components/forms/fds-hint)** - Helper text component that works alongside character limits
- **[FdsFejlmeddelelse](/components/forms/fds-fejlmeddelelse)** - Error messages for validation when character limits are violated

## TypeScript Support

```typescript
import type { FdsInputLimitProps, FdsInputLimitMessages } from '@madsb/dkfds-vue3'

// Component props interface
interface FdsInputLimitProps {
  modelValue?: string | null
  limit: number
  id?: string
  warningThreshold?: number
  messages?: FdsInputLimitMessages
}

// Message configuration interface
interface FdsInputLimitMessages {
  initial?: string
  remaining?: string
  warning?: string
  exceeded?: string
}

// Usage in component with proper typing
const props: FdsInputLimitProps = {
  limit: 500,
  warningThreshold: 0.8,
  messages: {
    initial: 'Du kan indtaste op til {limit} tegn',
    remaining: 'Du har {remaining} tegn tilbage',
    warning: 'Du har {remaining} tegn tilbage',
    exceeded: 'Du har {exceeded} tegn for meget'
  }
}

// Reactive references with proper typing
const inputValue = ref<string>('')
const characterLimit = ref<number>(200)
const customMessages = ref<FdsInputLimitMessages>({
  initial: 'Maximum {limit} characters allowed',
  remaining: '{remaining} characters remaining',
  warning: 'Only {remaining} characters left',
  exceeded: '{exceeded} characters over the limit'
})
```

<!-- Verified against source: /Users/madsbjerre/Development/dkfds-vue3/src/components/input/fds-input-limit.vue -->