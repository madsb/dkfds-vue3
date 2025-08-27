---
title: FdsFileUpload
description: File upload component implementing DKFDS v11 file input specifications with comprehensive validation, progress tracking, and accessibility support
category: input
dkfds: true
accessibility: WCAG 2.1 AA
tags: file-upload, input, validation, accessibility, multiple-files, drag-drop
---

# FdsFileUpload

File upload component implementing DKFDS v11 file input specifications. Provides comprehensive file upload functionality with validation, progress tracking, file list management, and accessibility support. Features include file type/size validation, multiple file support, and proper error handling following DKFDS file upload patterns.

<!-- Verified against source -->

## Installation

```bash
npm install @madsb/dkfds-vue3
```

## Quick Start

```vue
<template>
  <FdsFileUpload 
    label="Upload your documents" 
    :accept="['.pdf', '.doc', '.docx']"
    @upload="handleFileUpload"
  />
</template>

<script setup>
import { FdsFileUpload } from '@madsb/dkfds-vue3'

const handleFileUpload = (files) => {
  console.log('Uploaded files:', files)
}
</script>
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | `undefined` (auto-generated) | No | Unique identifier for the file input |
| `name` | `string` | `''` | No | Input name attribute for form submission |
| `label` | `string` | `'Vælg fil'` | No | Label text displayed above the file input |
| `showLabel` | `boolean` | `true` | No | Whether to show the label element |
| `hint` | `string` | `''` | No | Hint text to provide guidance to users |
| `accept` | `string[]` | `['image/png', 'image/jpg', 'image/jpeg', '.pdf', '.doc', '.docx', '.odt']` | No | Array of accepted file types (MIME types or extensions) |
| `multiple` | `boolean` | `false` | No | Enable selection of multiple files |
| `maxFileSize` | `number` | `5242880` (5MB) | No | Maximum file size allowed in bytes |
| `maxFiles` | `number` | `10` | No | Maximum number of files that can be selected |
| `disabled` | `boolean` | `false` | No | Whether the file input is disabled |
| `required` | `boolean` | `false` | No | Whether the file input is required |
| `error` | `string` | `''` | No | Error message to display |
| `removeContentHeaders` | `boolean` | `false` | No | Remove content headers from base64 data |
| `showFileList` | `boolean` | `true` | No | Display list of selected files |
| `removable` | `boolean` | `true` | No | Allow users to remove selected files |
| `requiredText` | `string` | `'Obligatorisk felt'` | No | Text for the required field indicator |
| `ariaLive` | `'polite' \| 'assertive'` | `'polite'` | No | ARIA live region politeness for error announcements |
| `fileListAriaLabel` | `string` | `'Valgte filer'` | No | ARIA label for the selected files list |
| `removeFileText` | `string` | `'Fjern fil'` | No | Text for the remove file button accessible label |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `blur` | `FocusEvent` | Emitted when file input loses focus |
| `focus` | `FocusEvent` | Emitted when file input gains focus |
| `upload` | `FdsFileInputModel[]` | Emitted when files are successfully processed and uploaded |
| `error` | `{ type: 'size' \| 'type' \| 'count' \| 'generic'; message: string; file?: File }` | Emitted when a file validation or processing error occurs |
| `dirty` | `boolean` | Emitted when input becomes dirty (user has interacted) |
| `remove-file` | `[index: number, file: File]` | Emitted when a file is removed from the selected files list |

## Slots

| Slot | Slot Props | Description |
|------|------------|-------------|
| `hint` | None | Custom hint content displayed below the label |

## TypeScript Interfaces

```typescript
interface FdsFileUploadProps {
  id?: string
  name?: string
  label?: string
  showLabel?: boolean
  hint?: string
  accept?: string[]
  multiple?: boolean
  maxFileSize?: number
  maxFiles?: number
  disabled?: boolean
  required?: boolean
  error?: string
  removeContentHeaders?: boolean
  showFileList?: boolean
  removable?: boolean
  requiredText?: string
  ariaLive?: 'polite' | 'assertive'
  fileListAriaLabel?: string
  removeFileText?: string
}

interface FdsFileInputModel {
  filename: string
  type: string
  size: number
  data: string // base64 encoded file data
}
```

## Usage Examples

### Basic File Upload

```vue
<template>
  <FdsFileUpload 
    label="Upload your documents" 
    :accept="['.pdf', '.doc', '.docx']"
    @upload="handleFileUpload"
  />
</template>

<script setup>
import { FdsFileUpload } from '@madsb/dkfds-vue3'

const handleFileUpload = (files) => {
  files.forEach(file => {
    console.log(`File: ${file.filename}, Size: ${file.size}, Type: ${file.type}`)
  })
}
</script>
```

### Multiple Files with Size Limits

```vue
<template>
  <FdsFileUpload
    label="Upload images"
    :accept="['image/png', 'image/jpeg', 'image/jpg']"
    :multiple="true"
    :max-file-size="2097152"
    :max-files="5"
    @upload="handleFileUpload"
    @error="handleUploadError"
  />
</template>

<script setup>
import { FdsFileUpload } from '@madsb/dkfds-vue3'

const handleFileUpload = (files) => {
  console.log('Uploaded images:', files)
}

const handleUploadError = (error) => {
  console.error(`Upload error (${error.type}): ${error.message}`)
}
</script>
```

### Form Integration with Validation

```vue
<template>
  <FdsFormgroup :isValid="filesValid">
    <template #default="{ formid }">
      <FdsLabel :forId="formid" :required="true">Attach Documents</FdsLabel>
      <FdsHint>Upload PDF or Word documents (max 5MB each)</FdsHint>
      <FdsFileUpload
        :id="formid"
        :accept="['.pdf', '.doc', '.docx']"
        :multiple="true"
        :max-file-size="5242880"
        :required="true"
        @upload="handleDocuments"
        @error="handleFileError"
        @dirty="validateFiles"
      />
      <FdsFejlmeddelelse v-if="!filesValid">Please upload at least one document</FdsFejlmeddelelse>
    </template>
  </FdsFormgroup>
</template>

<script setup>
import { ref } from 'vue'
import { FdsFileUpload, FdsFormgroup, FdsLabel, FdsHint, FdsFejlmeddelelse } from '@madsb/dkfds-vue3'

const filesValid = ref(true)
const uploadedFiles = ref([])

const handleDocuments = (files) => {
  uploadedFiles.value = files
  validateFiles()
}

const handleFileError = (error) => {
  console.error('File error:', error)
  filesValid.value = false
}

const validateFiles = () => {
  filesValid.value = uploadedFiles.value.length > 0
}
</script>
```

### Custom File List with Removal

```vue
<template>
  <FdsFileUpload
    label="Profile Images"
    :accept="['image/*']"
    :multiple="true"
    :removable="true"
    :show-file-list="true"
    remove-file-text="Remove image"
    file-list-aria-label="Selected profile images"
    @remove-file="handleFileRemoval"
    @upload="handleImageUpload"
  >
    <template #hint>
      Upload profile images in PNG, JPEG, or JPG format
    </template>
  </FdsFileUpload>
</template>

<script setup>
import { FdsFileUpload } from '@madsb/dkfds-vue3'

const handleImageUpload = (files) => {
  console.log('Profile images uploaded:', files)
}

const handleFileRemoval = (index, file) => {
  console.log(`Removed file at index ${index}:`, file.name)
}
</script>
```

### File Processing with Content Headers

```vue
<template>
  <FdsFileUpload
    label="Upload for Processing"
    :accept="['.csv', '.json', '.xml']"
    :remove-content-headers="true"
    @upload="processFiles"
    @error="handleProcessingError"
  />
</template>

<script setup>
import { FdsFileUpload } from '@madsb/dkfds-vue3'

const processFiles = (files) => {
  files.forEach(file => {
    // file.data is base64 without MIME headers when removeContentHeaders is true
    console.log(`Processing ${file.filename}: ${file.data.substring(0, 100)}...`)
  })
}

const handleProcessingError = (error) => {
  alert(`Processing failed: ${error.message}`)
}
</script>
```

## Accessibility

The `FdsFileUpload` component implements comprehensive accessibility features:

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full keyboard support for file selection and removal
- **Screen Reader Support**: Proper labeling and ARIA attributes
- **Focus Management**: Clear focus indicators and logical tab order
- **Error Announcements**: Live regions for error messages

### Accessibility Features

- **Semantic HTML**: Uses proper `label`, `input[type="file"]`, and list structures
- **ARIA Attributes**: 
  - `aria-describedby` links hint and error messages
  - `aria-invalid` indicates validation state
  - `aria-live` for error announcements
  - `aria-label` for file list and remove buttons
- **Error Handling**: Clear error messages with appropriate severity levels
- **Visual Indicators**: Required fields marked with asterisk and proper styling

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Tab` | Navigate to/from the file input |
| `Space/Enter` | Open file selection dialog |
| `Tab` (in file list) | Navigate through remove buttons |
| `Space/Enter` (on remove button) | Remove selected file |

## DKFDS Guidelines

This component follows the official DKFDS v11 file upload specifications:

### Design Patterns

- **Visual Hierarchy**: Proper spacing and typography following DKFDS tokens
- **Error States**: Standardized error styling with icons and colors
- **Interactive Elements**: DKFDS-compliant button and input styling
- **File Validation**: Built-in validation for size, type, and count limits

### Localization

- Default Danish text following DKFDS language guidelines
- Support for custom text overrides for multilingual applications
- Proper formatting for file sizes using Danish conventions

### Implementation Notes

- Maintains DKFDS HTML structure and CSS classes
- Integrates with DKFDS form components (`FdsFormgroup`, `FdsLabel`, `FdsHint`)
- Follows DKFDS error handling patterns
- Compatible with both VirkDK and BorgerDK themes

## Related Components

- **[FdsFormgroup](/components/forms/fds-formgroup)** - Form structure and validation
- **[FdsLabel](/components/forms/fds-label)** - Form field labeling
- **[FdsHint](/components/forms/fds-hint)** - User guidance text
- **[FdsFejlmeddelelse](/components/feedback/fds-fejlmeddelelse)** - Error messages
- **[FdsIkon](/components/layout/fds-ikon)** - Icons for UI elements