<template>
  <div class="form-group file-input">
    <label v-if="showLabel" class="form-label" :for="formid">
      {{ label }}
      <abbr v-if="required" :title="requiredText" class="form-label-required">*</abbr>
    </label>

    <div v-if="hint" class="form-hint">
      <slot name="hint">
        {{ hint }}
      </slot>
    </div>

    <div v-if="hasError && errorMessage" class="error-message" role="alert" :aria-live="ariaLive">
      <fds-ikon icon="report-problem" decorative />
      <span class="error-message-text">{{ errorMessage }}</span>
    </div>

    <input
      :id="formid"
      type="file"
      :name="name || formid"
      :accept="acceptedTypes"
      :multiple="multiple"
      :disabled="disabled"
      :required="required"
      :class="inputClasses"
      :aria-describedby="ariaDescribedBy"
      :aria-invalid="hasError ? 'true' : undefined"
      @blur="handleBlur"
      @change="handleFileChange"
      @focus="handleFocus"
    />

    <div
      v-if="showFileList && selectedFiles.length > 0"
      class="file-list"
      role="region"
      :aria-label="fileListAriaLabel"
    >
      <ul class="file-list-items">
        <li
          v-for="(file, index) in selectedFiles"
          :key="`${file.name}-${index}`"
          class="file-list-item"
        >
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">({{ formatFileSize(file.size) }})</span>
          <button
            v-if="removable"
            type="button"
            class="button-unstyled file-remove-btn"
            :aria-label="`${removeFileText} ${file.name}`"
            @click="removeFile(index)"
          >
            <fds-ikon icon="close" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { removeBrowserFileContentHeaders, formId } from 'dkfds-vue3-utils'
import { FdsFileInputModel } from 'dkfds-vue3-utils'
import FdsIkon from './fds-ikon.vue'

/**
 * File upload component following DKFDS v11 specifications
 *
 * @component FdsFileUpload
 * @example
 * <fds-file-upload
 *   label="Upload your documents"
 *   accept=".pdf,.doc,.docx"
 *   :multiple="true"
 *   :max-file-size="5242880"
 *   @upload="handleUpload"
 *   @error="handleError"
 * />
 */

export interface Props {
  /** Unique identifier for the input */
  id?: string
  /** Input name attribute */
  name?: string
  /** Label text for the file input */
  label?: string
  /** Show/hide the label */
  showLabel?: boolean
  /** Hint text to help users */
  hint?: string
  /** Accepted file types (MIME types or extensions) */
  accept?: string[]
  /** Enable multiple file selection */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxFileSize?: number
  /** Maximum number of files */
  maxFiles?: number
  /** Disable the input */
  disabled?: boolean
  /** Mark as required */
  required?: boolean
  /** Error message */
  error?: string
  /** Remove content headers from base64 data */
  removeContentHeaders?: boolean
  /** Show selected files list */
  showFileList?: boolean
  /** Allow removing selected files */
  removable?: boolean
  /** Text for required fields */
  requiredText?: string
  /** ARIA live region politeness */
  ariaLive?: 'polite' | 'assertive'
  /** ARIA label for file list */
  fileListAriaLabel?: string
  /** Text for remove file button */
  removeFileText?: string
}

const {
  id,
  name = '',
  label = 'Vælg fil',
  showLabel = true,
  hint = '',
  accept = ['image/png', 'image/jpg', 'image/jpeg', '.pdf', '.doc', '.docx', '.odt'],
  multiple = false,
  maxFileSize = 5242880, // 5MB
  maxFiles = 10,
  disabled = false,
  required = false,
  error = '',
  removeContentHeaders = false,
  showFileList = true,
  removable = true,
  requiredText = 'Obligatorisk felt',
  ariaLive = 'polite',
  fileListAriaLabel = 'Valgte filer',
  removeFileText = 'Fjern fil',
} = defineProps<Props>()

const emit = defineEmits<{
  /** Emitted when input loses focus */
  blur: [event: FocusEvent]
  /** Emitted when input gains focus */
  focus: [event: FocusEvent]
  /** Emitted when files are uploaded */
  upload: [files: FdsFileInputModel[]]
  /** Emitted when an error occurs */
  error: [error: { type: 'size' | 'type' | 'count' | 'generic'; message: string; file?: File }]
  /** Emitted when input becomes dirty */
  dirty: [value: boolean]
  /** Emitted when files are removed */
  'remove-file': [index: number, file: File]
}>()

const { formid } = formId(id, true)
const selectedFiles = ref<File[]>([])
const isDirty = ref(false)
const hintId = computed(() => (hint ? `${formid.value}-hint` : undefined))
const errorId = computed(() => (hasError.value ? `${formid.value}-error` : undefined))

const acceptedTypes = computed(() => accept.join(','))

const hasError = computed(() => Boolean(error))

const errorMessage = computed(() => error)

const inputClasses = computed(() => ({
  'form-control': true,
  'form-control--error': hasError.value,
}))

const ariaDescribedBy = computed(() => {
  const ids = []
  if (hintId.value) ids.push(hintId.value)
  if (errorId.value) ids.push(errorId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const handleBlur = (event: FocusEvent) => {
  if (!isDirty.value) {
    isDirty.value = true
    emit('dirty', true)
  }
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const validateFile = (
  file: File,
): { valid: boolean; error?: { type: string; message: string } } => {
  // Check file size
  if (file.size > maxFileSize) {
    return {
      valid: false,
      error: {
        type: 'size',
        message: `Filen "${file.name}" er for stor. Maksimal størrelse er ${formatFileSize(maxFileSize)}.`,
      },
    }
  }

  // Check file type if specified
  if (accept.length > 0) {
    const isValidType = accept.some((acceptedType) => {
      if (acceptedType.startsWith('.')) {
        return file.name.toLowerCase().endsWith(acceptedType.toLowerCase())
      }
      return file.type === acceptedType
    })

    if (!isValidType) {
      return {
        valid: false,
        error: {
          type: 'type',
          message: `Filen "${file.name}" har et ikke-understøttet format. Tilladte formater: ${accept.join(', ')}.`,
        },
      }
    }
  }

  return { valid: true }
}

const removeFile = (index: number) => {
  if (index >= 0 && index < selectedFiles.value.length) {
    const removedFile = selectedFiles.value[index]
    selectedFiles.value.splice(index, 1)
    emit('remove-file', index, removedFile)
  }
}

const processFiles = async (files: File[]) => {
  const validFiles: File[] = []
  const fileModels: FdsFileInputModel[] = []

  for (const file of files) {
    const validation = validateFile(file)
    if (!validation.valid && validation.error) {
      emit('error', {
        type: validation.error.type as 'size' | 'type' | 'count' | 'generic',
        message: validation.error.message,
        file,
      })
      continue
    }
    validFiles.push(file)
  }

  // Check total file count
  if (selectedFiles.value.length + validFiles.length > maxFiles) {
    emit('error', {
      type: 'count',
      message: `Du kan maksimalt vælge ${maxFiles} filer.`,
    })
    return
  }

  // Process valid files
  for (const file of validFiles) {
    try {
      const reader = new FileReader()
      const result = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
      })

      const data = removeContentHeaders ? removeBrowserFileContentHeaders(result) : result

      const fileModel: FdsFileInputModel = {
        filename: file.name,
        type: file.type,
        size: file.size,
        data,
      }

      fileModels.push(fileModel)
      selectedFiles.value.push(file)
    } catch (_error) {
      emit('error', {
        type: 'generic',
        message: `Fejl ved læsning af fil "${file.name}".`,
        file,
      })
    }
  }

  if (fileModels.length > 0) {
    emit('upload', fileModels)
  }
}

const handleFileChange = async (event: Event) => {
  if (!isDirty.value) {
    isDirty.value = true
    emit('dirty', true)
  }

  const target = event.target as HTMLInputElement
  const { files } = target

  if (!files || files.length === 0) {
    return
  }

  const fileArray = Array.from(files)
  await processFiles(fileArray)

  // Clear the input value to allow selecting the same file again
  target.value = ''
}
</script>

<style scoped lang="scss">
.file-input {
  .file-list {
    margin-top: 0.5rem;

    .file-list-items {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .file-list-item {
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e0e0e0;

      &:last-child {
        border-bottom: none;
      }
    }

    .file-name {
      flex: 1;
      font-weight: 500;
    }

    .file-size {
      margin-left: 0.5rem;
      color: #666;
      font-size: 0.875rem;
    }

    .file-remove-btn {
      margin-left: 0.5rem;
      padding: 0.25rem;
      color: #d32f2f;

      &:hover {
        background-color: #f5f5f5;
      }

      &:focus {
        outline: 2px solid #0077c8;
        outline-offset: 2px;
      }
    }
  }
}
</style>
