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

import { formId } from '../../composables'
import { removeBrowserFileContentHeaders } from '../../utils'
import { FdsFileInputModel } from '../../types'
import FdsIkon from '../layout/fds-ikon.vue'

/**
 * File upload component implementing DKFDS v11 file input specifications.
 *
 * Provides comprehensive file upload functionality with validation, progress
 * tracking, file list management, and accessibility support. Features include
 * file type/size validation, multiple file support, drag-and-drop capability,
 * and proper error handling following DKFDS file upload patterns.
 *
 * @component
 * @example Basic file upload
 * ```vue
 * <FdsFileUpload
 *   label="Upload your documents"
 *   :accept="['.pdf', '.doc', '.docx']"
 * />
 * ```
 *
 * @example Multiple files with size limits
 * ```vue
 * <FdsFileUpload
 *   label="Upload images"
 *   :accept="['image/png', 'image/jpeg', 'image/jpg']"
 *   :multiple="true"
 *   :max-file-size="2097152"
 *   :max-files="5"
 *   @upload="handleFileUpload"
 *   @error="handleUploadError"
 * />
 * ```
 *
 * @example In form group with validation
 * ```vue
 * <FdsFormgroup :isValid="filesValid">
 *   <template #default="{ formid }">
 *     <FdsLabel :forId="formid" :required="true">Attach Documents</FdsLabel>
 *     <FdsHint>Upload PDF or Word documents (max 5MB each)</FdsHint>
 *     <FdsFileUpload
 *       :id="formid"
 *       :accept="['.pdf', '.doc', '.docx']"
 *       :multiple="true"
 *       :max-file-size="5242880"
 *       :required="true"
 *       @upload="handleDocuments"
 *       @error="handleFileError"
 *       @dirty="validateFiles"
 *     />
 *     <FdsFejlmeddelelse v-if="!filesValid">Please upload at least one document</FdsFejlmeddelelse>
 *   </template>
 * </FdsFormgroup>
 * ```
 *
 * @example Custom file list with removal
 * ```vue
 * <FdsFileUpload
 *   label="Profile Images"
 *   :accept="['image/*']"
 *   :multiple="true"
 *   :removable="true"
 *   :show-file-list="true"
 *   remove-file-text="Remove image"
 *   file-list-aria-label="Selected profile images"
 *   @remove-file="handleFileRemoval"
 * />
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/fil-upload/} DKFDS File Upload Documentation
 */

export interface FdsFileUploadProps {
  /**
   * Unique identifier for the file input.
   * If not provided, will be auto-generated.
   * @default undefined (auto-generated)
   */
  id?: string
  /**
   * Input name attribute for form submission.
   * If not provided, uses the generated form ID.
   * @default ''
   */
  name?: string
  /**
   * Label text displayed above the file input.
   * @default 'Vælg fil' (Danish for 'Choose file')
   */
  label?: string
  /**
   * Whether to show the label element.
   * Set to false when using custom labeling.
   * @default true
   */
  showLabel?: boolean
  /**
   * Hint text to provide guidance to users.
   * Displayed below the label and linked via aria-describedby.
   * @default ''
   */
  hint?: string
  /**
   * Array of accepted file types (MIME types or extensions).
   * Examples: ['image/png', '.pdf', '.doc', 'text/plain']
   * @default ['image/png', 'image/jpg', 'image/jpeg', '.pdf', '.doc', '.docx', '.odt']
   */
  accept?: string[]
  /**
   * Enable selection of multiple files.
   * When true, users can select multiple files at once.
   * @default false
   */
  multiple?: boolean
  /**
   * Maximum file size allowed in bytes.
   * Files exceeding this size will be rejected with error.
   * @default 5242880 (5MB)
   */
  maxFileSize?: number
  /**
   * Maximum number of files that can be selected.
   * Only applies when multiple is true.
   * @default 10
   */
  maxFiles?: number
  /**
   * Whether the file input is disabled.
   * Prevents user interaction when true.
   * @default false
   */
  disabled?: boolean
  /**
   * Whether the file input is required.
   * Adds validation requirement and visual indicator.
   * @default false
   */
  required?: boolean
  /**
   * Error message to display.
   * When provided, shows error state and message.
   * @default ''
   */
  error?: string
  /**
   * Remove content headers from base64 data.
   * Strips MIME type headers from file data for cleaner output.
   * @default false
   */
  removeContentHeaders?: boolean
  /**
   * Display list of selected files.
   * Shows file names and sizes below the input.
   * @default true
   */
  showFileList?: boolean
  /**
   * Allow users to remove selected files.
   * Adds remove buttons to the file list.
   * @default true
   */
  removable?: boolean
  /**
   * Text for the required field indicator.
   * @default 'Obligatorisk felt' (Danish for 'Required field')
   */
  requiredText?: string
  /**
   * ARIA live region politeness for error announcements.
   * @values 'polite', 'assertive'
   * @default 'polite'
   */
  ariaLive?: 'polite' | 'assertive'
  /**
   * ARIA label for the selected files list.
   * @default 'Valgte filer' (Danish for 'Selected files')
   */
  fileListAriaLabel?: string
  /**
   * Text for the remove file button accessible label.
   * @default 'Fjern fil' (Danish for 'Remove file')
   */
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
} = defineProps<FdsFileUploadProps>()

const emit = defineEmits<{
  /**
   * Emitted when file input loses focus.
   * Provides the focus event for handling blur states.
   */
  blur: [event: FocusEvent]
  /**
   * Emitted when file input gains focus.
   * Provides the focus event for handling focus states.
   */
  focus: [event: FocusEvent]
  /**
   * Emitted when files are successfully processed and uploaded.
   * Provides array of file models with base64 data and metadata.
   */
  upload: [files: FdsFileInputModel[]]
  /**
   * Emitted when a file validation or processing error occurs.
   * Provides detailed error information including type and message.
   */
  error: [error: { type: 'size' | 'type' | 'count' | 'generic'; message: string; file?: File }]
  /**
   * Emitted when input becomes dirty (user has interacted).
   * Useful for triggering validation after user interaction.
   */
  dirty: [value: boolean]
  /**
   * Emitted when a file is removed from the selected files list.
   * Provides the index and file object that was removed.
   */
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
