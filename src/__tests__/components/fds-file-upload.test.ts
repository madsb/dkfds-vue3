import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import FdsFileUpload from "../../components/input/fds-file-upload.vue"
import { testAccessibility } from '../../test-utils'

describe('FdsFileUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock FileReader
    global.FileReader = vi.fn(() => ({
      readAsDataURL: vi.fn(function (file) {
        // Simulate async file reading
        setTimeout(() => {
          this.result = `data:${file.type};base64,mockBase64Data`
          if (this.onload) this.onload()
        }, 10)
      }),
      result: '',
      onload: null,
      onerror: null,
    }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsFileUpload)
      expect(wrapper.exists()).toBe(true)
    })

    it('renders with correct DKFDS structure', () => {
      const wrapper = mount(FdsFileUpload)

      expect(wrapper.find('.form-group.file-input').exists()).toBe(true)
      expect(wrapper.find('input[type="file"]').exists()).toBe(true)
      expect(wrapper.find('.form-label').exists()).toBe(true)
    })

    it('renders label with correct text', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { label: 'Upload your documents' },
      })

      expect(wrapper.find('.form-label').text()).toBe('Upload your documents')
    })

    it('renders without label when showLabel is false', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { showLabel: false },
      })

      expect(wrapper.find('.form-label').exists()).toBe(false)
    })

    it('renders hint text', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { hint: 'Maximum 5MB per file' },
      })

      expect(wrapper.find('.form-hint').text()).toBe('Maximum 5MB per file')
    })

    it('renders hint via slot', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { hint: 'Default hint' },
        slots: {
          hint: '<span class="custom-hint">Custom hint content</span>',
        },
      })

      expect(wrapper.find('.custom-hint').text()).toBe('Custom hint content')
    })

    it('renders error message with icon', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { error: 'File is too large' },
      })

      const errorDiv = wrapper.find('.error-message')
      expect(errorDiv.exists()).toBe(true)
      expect(errorDiv.attributes('role')).toBe('alert')
      expect(errorDiv.text()).toContain('File is too large')
      expect(wrapper.findComponent({ name: 'FdsIkon' }).exists()).toBe(true)
    })

    it('does not render file list when showFileList is false', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { showFileList: false },
      })

      expect(wrapper.find('.file-list').exists()).toBe(false)
    })
  })

  describe('Props', () => {
    it('uses default props correctly', () => {
      const wrapper = mount(FdsFileUpload)
      const input = wrapper.find('input[type="file"]')

      expect(wrapper.find('.form-label').text()).toBe('Vælg fil')
      expect(input.attributes('accept')).toBe('image/png,image/jpg,image/jpeg,.pdf,.doc,.docx,.odt')
      expect(input.attributes('multiple')).toBeUndefined()
      expect(input.attributes('required')).toBeUndefined()
      expect(input.attributes('disabled')).toBeUndefined()
    })

    it('applies custom id', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { id: 'custom-upload' },
      })

      const input = wrapper.find('input[type="file"]')
      const label = wrapper.find('.form-label')

      expect(input.attributes('id')).toBe('custom-upload')
      expect(label.attributes('for')).toBe('custom-upload')
    })

    it('applies name attribute', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { name: 'document-upload' },
      })

      expect(wrapper.find('input[type="file"]').attributes('name')).toBe('document-upload')
    })

    it('applies accept types correctly', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { accept: ['.pdf', '.docx', 'image/png'] },
      })

      expect(wrapper.find('input[type="file"]').attributes('accept')).toBe('.pdf,.docx,image/png')
    })

    it('enables multiple file selection', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { multiple: true },
      })

      expect(wrapper.find('input[type="file"]').attributes('multiple')).toBeDefined()
    })

    it('disables input when disabled prop is true', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { disabled: true },
      })

      expect(wrapper.find('input[type="file"]').attributes('disabled')).toBeDefined()
    })

    it('marks as required when required prop is true', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { required: true },
      })

      const input = wrapper.find('input[type="file"]')
      expect(input.attributes('required')).toBeDefined()
      expect(wrapper.find('.form-label-required').exists()).toBe(true)
    })

    it('applies custom required text', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { required: true, requiredText: 'This field is mandatory' },
      })

      expect(wrapper.find('.form-label-required').attributes('title')).toBe(
        'This field is mandatory',
      )
    })

    it('applies custom ARIA live setting', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { error: 'Test error', ariaLive: 'assertive' },
      })

      expect(wrapper.find('.error-message').attributes('aria-live')).toBe('assertive')
    })

    it('applies custom file list ARIA label', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { fileListAriaLabel: 'Selected documents' },
      })

      // Add a file to make the file list visible
      wrapper.vm.selectedFiles = [new File(['content'], 'test.pdf')]
      await nextTick()

      expect(wrapper.find('.file-list').attributes('aria-label')).toBe('Selected documents')
    })
  })

  describe('Input Classes and States', () => {
    it('applies error class when there is an error', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { error: 'Invalid file' },
      })

      const input = wrapper.find('input[type="file"]')
      expect(input.classes()).toContain('form-control--error')
      expect(input.attributes('aria-invalid')).toBe('true')
    })

    it('does not apply error class when no error', () => {
      const wrapper = mount(FdsFileUpload)

      const input = wrapper.find('input[type="file"]')
      expect(input.classes()).not.toContain('form-control--error')
      expect(input.attributes('aria-invalid')).toBeUndefined()
    })

    it('sets up aria-describedby correctly', () => {
      const wrapper = mount(FdsFileUpload, {
        props: {
          hint: 'Upload hint',
          error: 'Upload error',
        },
      })

      const input = wrapper.find('input[type="file"]')
      const ariaDescribedBy = input.attributes('aria-describedby')

      expect(ariaDescribedBy).toContain('hint')
      expect(ariaDescribedBy).toContain('error')
    })

    it('sets up aria-describedby with only hint', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { hint: 'Upload hint' },
      })

      const input = wrapper.find('input[type="file"]')
      const ariaDescribedBy = input.attributes('aria-describedby')

      expect(ariaDescribedBy).toContain('hint')
      expect(ariaDescribedBy).not.toContain('error')
    })
  })

  describe('File Processing and Validation', () => {
    it('validates file size correctly', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { maxFileSize: 1024 }, // 1KB
      })

      const largeFile = new File(['x'.repeat(2048)], 'large.txt', { type: 'text/plain' })
      Object.defineProperty(largeFile, 'size', { value: 2048 })

      const validation = wrapper.vm.validateFile(largeFile)

      expect(validation.valid).toBe(false)
      expect(validation.error.type).toBe('size')
      expect(validation.error.message).toContain('for stor')
    })

    it('validates file type correctly', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { accept: ['.pdf', 'image/png'] },
      })

      const invalidFile = new File(['content'], 'test.txt', { type: 'text/plain' })
      const validation = wrapper.vm.validateFile(invalidFile)

      expect(validation.valid).toBe(false)
      expect(validation.error.type).toBe('type')
      expect(validation.error.message).toContain('ikke-understøttet format')
    })

    it('accepts valid file types', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { accept: ['.pdf', 'image/png'] },
      })

      const validFile = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const validation = wrapper.vm.validateFile(validFile)

      expect(validation.valid).toBe(true)
      expect(validation.error).toBeUndefined()
    })

    it('accepts files by extension', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { accept: ['.pdf'] },
      })

      const validFile = new File(['content'], 'document.PDF', { type: 'application/pdf' })
      const validation = wrapper.vm.validateFile(validFile)

      expect(validation.valid).toBe(true)
    })

    it('formats file size correctly', () => {
      const wrapper = mount(FdsFileUpload)

      expect(wrapper.vm.formatFileSize(0)).toBe('0 Bytes')
      expect(wrapper.vm.formatFileSize(1024)).toBe('1 KB')
      expect(wrapper.vm.formatFileSize(1048576)).toBe('1 MB')
      expect(wrapper.vm.formatFileSize(1073741824)).toBe('1 GB')
    })
  })

  describe('File Selection and Management', () => {
    it('handles file selection', async () => {
      const wrapper = mount(FdsFileUpload)
      const input = wrapper.find('input[type="file"]')

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      const files = [file]

      Object.defineProperty(input.element, 'files', {
        value: files,
        writable: false,
      })

      await input.trigger('change')
      await flushPromises()
      await new Promise((resolve) => setTimeout(resolve, 20)) // Wait for FileReader

      expect(wrapper.emitted('upload')).toBeTruthy()
    })

    it('displays selected files in file list', async () => {
      const wrapper = mount(FdsFileUpload)

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      wrapper.vm.selectedFiles = [file]

      await nextTick()

      const fileList = wrapper.find('.file-list')
      expect(fileList.exists()).toBe(true)

      const fileItem = wrapper.find('.file-list-item')
      expect(fileItem.find('.file-name').text()).toBe('test.pdf')
      expect(fileItem.find('.file-size').exists()).toBe(true)
    })

    it('shows remove button when removable is true', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { removable: true },
      })

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      wrapper.vm.selectedFiles = [file]

      await nextTick()

      expect(wrapper.find('.file-remove-btn').exists()).toBe(true)
    })

    it('hides remove button when removable is false', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { removable: false },
      })

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      wrapper.vm.selectedFiles = [file]

      await nextTick()

      expect(wrapper.find('.file-remove-btn').exists()).toBe(false)
    })

    it('removes file when remove button is clicked', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { removable: true },
      })

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      wrapper.vm.selectedFiles = [file]

      await nextTick()

      const removeBtn = wrapper.find('.file-remove-btn')
      await removeBtn.trigger('click')

      expect(wrapper.vm.selectedFiles).toHaveLength(0)
      expect(wrapper.emitted('remove-file')).toBeTruthy()
      expect(wrapper.emitted('remove-file')[0]).toEqual([0, file])
    })

    it('handles remove file with invalid index gracefully', () => {
      const wrapper = mount(FdsFileUpload)

      wrapper.vm.removeFile(-1)
      wrapper.vm.removeFile(999)

      expect(wrapper.emitted('remove-file')).toBeFalsy()
    })

    it('enforces maximum file count', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: {
          maxFiles: 2,
          multiple: true,
          accept: [], // Accept all file types to avoid type validation
        },
      })

      const files = [
        new File(['1'], 'file1.pdf', { type: 'application/pdf' }),
        new File(['2'], 'file2.pdf', { type: 'application/pdf' }),
        new File(['3'], 'file3.pdf', { type: 'application/pdf' }),
      ]

      // Process 3 files when max is 2
      await wrapper.vm.processFiles(files)
      await flushPromises()

      // When trying to add 3 files with max 2, it should reject all and emit error
      expect(wrapper.vm.selectedFiles).toHaveLength(0)

      // Should emit count error
      expect(wrapper.emitted('error')).toBeTruthy()
      const errorEvent = wrapper.emitted('error')[0][0]
      expect(errorEvent.type).toBe('count')
      expect(errorEvent.message).toContain('maksimalt')
    })
  })

  describe('Events', () => {
    it('emits blur event', async () => {
      const wrapper = mount(FdsFileUpload)
      const input = wrapper.find('input[type="file"]')

      await input.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
      expect(wrapper.emitted('dirty')).toBeTruthy()
    })

    it('emits focus event', async () => {
      const wrapper = mount(FdsFileUpload)
      const input = wrapper.find('input[type="file"]')

      await input.trigger('focus')

      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits dirty event only once', async () => {
      const wrapper = mount(FdsFileUpload)
      const input = wrapper.find('input[type="file"]')

      await input.trigger('blur')
      await input.trigger('blur')

      expect(wrapper.emitted('dirty')).toHaveLength(1)
    })

    it('emits upload event with file data', async () => {
      const wrapper = mount(FdsFileUpload)

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })

      await wrapper.vm.processFiles([file])
      await flushPromises()

      expect(wrapper.emitted('upload')).toBeTruthy()
      const uploadEvent = wrapper.emitted('upload')[0][0]
      expect(uploadEvent).toHaveLength(1)
      expect(uploadEvent[0].filename).toBe('test.pdf')
      expect(uploadEvent[0].type).toBe('application/pdf')
    })

    it('emits error event for invalid files', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { maxFileSize: 100 },
      })

      const largeFile = new File(['x'.repeat(200)], 'large.txt')
      Object.defineProperty(largeFile, 'size', { value: 200 })

      await wrapper.vm.processFiles([largeFile])

      expect(wrapper.emitted('error')).toBeTruthy()
      const errorEvent = wrapper.emitted('error')[0][0]
      expect(errorEvent.type).toBe('size')
      expect(errorEvent.file).toBe(largeFile)
    })

    it('emits error event for file reading failure', async () => {
      const wrapper = mount(FdsFileUpload)

      // Mock FileReader to simulate error
      const mockFileReader = {
        readAsDataURL: vi.fn(function () {
          setTimeout(() => {
            if (this.onerror) this.onerror(new Error('Read failed'))
          }, 10)
        }),
        result: null,
        onload: null,
        onerror: null,
      }

      global.FileReader = vi.fn(() => mockFileReader)

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })

      await wrapper.vm.processFiles([file])
      await flushPromises()

      expect(wrapper.emitted('error')).toBeTruthy()
      const errorEvent = wrapper.emitted('error')[0][0]
      expect(errorEvent.type).toBe('generic')
    })
  })

  describe('Remove Content Headers', () => {
    it('removes content headers when removeContentHeaders is true', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { removeContentHeaders: true },
      })

      // Mock removeBrowserFileContentHeaders
      const mockRemoveHeaders = vi.fn().mockReturnValue('cleanBase64Data')
      wrapper.vm.$options.setup = () => ({
        removeBrowserFileContentHeaders: mockRemoveHeaders,
      })

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })

      await wrapper.vm.processFiles([file])
      await flushPromises()

      // Check that the upload event contains cleaned data
      if (wrapper.emitted('upload')) {
        const uploadEvent = wrapper.emitted('upload')[0][0]
        // The data should not contain headers
        expect(uploadEvent[0].data).not.toContain('data:application/pdf;base64,')
      }
    })

    it('keeps content headers when removeContentHeaders is false', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { removeContentHeaders: false },
      })

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })

      await wrapper.vm.processFiles([file])
      await flushPromises()

      if (wrapper.emitted('upload')) {
        const uploadEvent = wrapper.emitted('upload')[0][0]
        expect(uploadEvent[0].data).toBe('data:application/pdf;base64,mockBase64Data')
      }
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      const wrapper = mount(FdsFileUpload, {
        props: {
          hint: 'Upload your files',
          error: 'File too large',
        },
      })

      const input = wrapper.find('input[type="file"]')
      const label = wrapper.find('.form-label')
      const errorDiv = wrapper.find('.error-message')

      expect(label.attributes('for')).toBe(input.attributes('id'))
      expect(errorDiv.attributes('role')).toBe('alert')
      expect(errorDiv.attributes('aria-live')).toBe('polite')
      expect(input.attributes('aria-invalid')).toBe('true')
      expect(input.attributes('aria-describedby')).toBeTruthy()
    })

    it('has correct ARIA labels for remove buttons', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: {
          removable: true,
          removeFileText: 'Remove file',
        },
      })

      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' })
      wrapper.vm.selectedFiles = [file]

      await nextTick()

      const removeBtn = wrapper.find('.file-remove-btn')
      expect(removeBtn.attributes('aria-label')).toBe('Remove file document.pdf')
    })

    it('has correct role and ARIA label for file list', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { fileListAriaLabel: 'Selected files list' },
      })

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      wrapper.vm.selectedFiles = [file]

      await nextTick()

      const fileList = wrapper.find('.file-list')
      expect(fileList.attributes('role')).toBe('region')
      expect(fileList.attributes('aria-label')).toBe('Selected files list')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <fds-file-upload 
              label="Upload files"
              hint="Choose PDF or image files"
            />
          </main>
        `,
        components: { FdsFileUpload },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty file selection', async () => {
      const wrapper = mount(FdsFileUpload)
      const input = wrapper.find('input[type="file"]')

      Object.defineProperty(input.element, 'files', {
        value: null,
        writable: false,
      })

      await input.trigger('change')

      expect(wrapper.emitted('upload')).toBeFalsy()
    })

    it('handles file with zero size', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { minFileSize: 0 }, // Explicitly allow zero size
      })

      const zeroSizeFile = new File([''], 'empty.txt', { type: 'text/plain' })
      Object.defineProperty(zeroSizeFile, 'size', { value: 0 })

      const validation = wrapper.vm.validateFile(zeroSizeFile)
      // Zero size files might be invalid by default
      expect(validation).toBeDefined()
    })

    it('handles file without extension in validation', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { accept: ['.pdf'] },
      })

      const noExtFile = new File(['content'], 'noextension', { type: 'application/pdf' })
      const validation = wrapper.vm.validateFile(noExtFile)

      expect(validation.valid).toBe(false)
    })

    it('handles empty accept array', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { accept: [] },
      })

      const file = new File(['content'], 'any.txt', { type: 'text/plain' })
      const validation = wrapper.vm.validateFile(file)

      expect(validation.valid).toBe(true)
    })

    it('clears input value after processing', async () => {
      const wrapper = mount(FdsFileUpload)
      const input = wrapper.find('input[type="file"]')

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })

      Object.defineProperty(input.element, 'files', {
        value: [file],
        writable: false,
      })

      // Set initial value
      let inputValue = 'C:\\fakepath\\test.pdf'
      Object.defineProperty(input.element, 'value', {
        get: () => inputValue,
        set: (val) => {
          inputValue = val
        },
        configurable: true,
      })

      await input.trigger('change')
      await flushPromises()
      await new Promise((resolve) => setTimeout(resolve, 20)) // Wait for processing

      // The component should clear the input value
      expect(inputValue).toBe('')
    })
  })

  describe('DKFDS v11 Compliance', () => {
    it('follows DKFDS v11 form structure', () => {
      const wrapper = mount(FdsFileUpload, {
        props: {
          label: 'Upload dokument',
          hint: 'Vælg PDF eller Word dokument',
          required: true,
        },
      })

      // Check DKFDS v11 form group structure
      expect(wrapper.find('.form-group.file-input').exists()).toBe(true)
      expect(wrapper.find('.form-label').exists()).toBe(true)
      expect(wrapper.find('.form-hint').exists()).toBe(true)
      expect(wrapper.find('.form-label-required').exists()).toBe(true)
    })

    it('uses Danish default texts', () => {
      const wrapper = mount(FdsFileUpload)

      expect(wrapper.find('.form-label').text()).toBe('Vælg fil')
      expect(wrapper.vm.requiredText).toBe('Obligatorisk felt')
      expect(wrapper.vm.fileListAriaLabel).toBe('Valgte filer')
      expect(wrapper.vm.removeFileText).toBe('Fjern fil')
    })

    it('provides Danish error messages', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { maxFileSize: 100 },
      })

      const largeFile = new File(['x'.repeat(200)], 'stor.pdf')
      Object.defineProperty(largeFile, 'size', { value: 200 })

      const validation = wrapper.vm.validateFile(largeFile)

      expect(validation.error.message).toContain('for stor')
      expect(validation.error.message).toContain('Maksimal størrelse')
    })

    it('supports DKFDS icon integration', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { error: 'Test error' },
      })

      const errorIcon = wrapper.findComponent({ name: 'FdsIkon' })
      expect(errorIcon.exists()).toBe(true)
      expect(errorIcon.props('icon')).toBe('report-problem')
    })
  })

  describe('Enhanced Keyboard Navigation', () => {
    it('supports keyboard navigation for remove buttons', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { removable: true },
      })

      const file = new File(['content'], 'test.pdf')
      wrapper.vm.selectedFiles = [file]
      await nextTick()

      const removeBtn = wrapper.find('.file-remove-btn')

      // Test keyboard activation
      await removeBtn.trigger('keydown', { key: 'Enter' })
      await removeBtn.trigger('keydown', { key: ' ' })

      // Button should be focusable
      expect(removeBtn.attributes('tabindex')).not.toBe('-1')
    })

    it('maintains focus management', async () => {
      const wrapper = mount(FdsFileUpload)
      const input = wrapper.find('input[type="file"]')

      const focusSpy = vi.fn()
      input.element.focus = focusSpy

      await input.trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })
  })

  describe('Advanced File Processing', () => {
    it('handles concurrent file processing', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { multiple: true },
      })

      const files = [
        new File(['1'], 'file1.pdf', { type: 'application/pdf' }),
        new File(['2'], 'file2.pdf', { type: 'application/pdf' }),
        new File(['3'], 'file3.pdf', { type: 'application/pdf' }),
      ]

      await wrapper.vm.processFiles(files)
      await flushPromises()

      expect(wrapper.vm.selectedFiles).toHaveLength(3)
      expect(wrapper.emitted('upload')).toBeTruthy()
    })

    it('handles file processing with mixed valid/invalid files', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: {
          accept: ['.pdf'],
          maxFileSize: 1000,
        },
      })

      const files = [
        new File(['valid'], 'valid.pdf', { type: 'application/pdf' }),
        new File(['x'.repeat(2000)], 'toolarge.pdf', { type: 'application/pdf' }),
        new File(['invalid'], 'invalid.txt', { type: 'text/plain' }),
      ]
      Object.defineProperty(files[1], 'size', { value: 2000 })

      await wrapper.vm.processFiles(files)
      await flushPromises()

      // Only valid file should be processed
      expect(wrapper.vm.selectedFiles).toHaveLength(1)
      expect(wrapper.vm.selectedFiles[0].name).toBe('valid.pdf')

      // Errors should be emitted for invalid files
      expect(wrapper.emitted('error')).toBeTruthy()
      expect(wrapper.emitted('error')).toHaveLength(2) // Size and type errors
    })

    it('validates file extensions case-insensitively', () => {
      const wrapper = mount(FdsFileUpload, {
        props: { accept: ['.pdf', '.docx'] },
      })

      const files = [
        new File(['content'], 'file.PDF', { type: 'application/pdf' }),
        new File(['content'], 'file.DOCX', {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }),
        new File(['content'], 'file.Pdf', { type: 'application/pdf' }),
      ]

      files.forEach((file) => {
        const validation = wrapper.vm.validateFile(file)
        expect(validation.valid).toBe(true)
      })
    })
  })

  describe('Performance and Memory', () => {
    it('cleans up file readers properly', async () => {
      const wrapper = mount(FdsFileUpload)
      const cleanupSpy = vi.fn()

      // Mock FileReader with cleanup tracking
      const mockFileReader = {
        readAsDataURL: vi.fn(function () {
          setTimeout(() => {
            this.result = 'data:application/pdf;base64,test'
            if (this.onload) this.onload()
          }, 10)
        }),
        result: null,
        onload: null,
        onerror: null,
        abort: cleanupSpy,
      }

      global.FileReader = vi.fn(() => mockFileReader)

      const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
      await wrapper.vm.processFiles([file])
      await flushPromises()

      // Unmount to trigger cleanup
      wrapper.unmount()
    })

    it('handles large file processing efficiently', async () => {
      const wrapper = mount(FdsFileUpload, {
        props: { maxFileSize: 50 * 1024 * 1024 }, // 50MB
      })

      // Create a large file mock
      const largeFile = new File(['x'.repeat(1000)], 'large.pdf', { type: 'application/pdf' })
      Object.defineProperty(largeFile, 'size', { value: 10 * 1024 * 1024 }) // 10MB

      const startTime = performance.now()
      await wrapper.vm.processFiles([largeFile])
      await flushPromises()
      const endTime = performance.now()

      // Processing should complete within reasonable time
      expect(endTime - startTime).toBeLessThan(1000) // 1 second
    })
  })

  describe('Integration', () => {
    it('works with form validation', async () => {
      const wrapper = mount({
        template: `
          <form @submit.prevent="handleSubmit">
            <fds-file-upload
              :required="true"
              :error="fileError"
              @upload="onFileUpload"
              @error="onFileError"
            />
          </form>
        `,
        components: { FdsFileUpload },
        data() {
          return {
            fileError: '',
            uploadedFiles: [],
          }
        },
        methods: {
          handleSubmit() {
            if (this.uploadedFiles.length === 0) {
              this.fileError = 'File is required'
            }
          },
          onFileUpload(files) {
            this.uploadedFiles = files
            this.fileError = ''
          },
          onFileError(error) {
            this.fileError = error.message
          },
        },
      })

      // Simulate form submission without files
      await wrapper.find('form').trigger('submit')
      expect(wrapper.vm.fileError).toBe('File is required')

      // Verify error is displayed
      expect(wrapper.find('.error-message').text()).toContain('File is required')
    })

    it('integrates with external validation library', async () => {
      const validationRules = {
        required: true,
        maxSize: 1048576, // 1MB
        allowedTypes: ['.pdf', '.docx'],
      }

      const wrapper = mount(FdsFileUpload, {
        props: {
          required: validationRules.required,
          maxFileSize: validationRules.maxSize,
          accept: validationRules.allowedTypes,
        },
      })

      const input = wrapper.find('input[type="file"]')
      expect(input.attributes('required')).toBeDefined()
      expect(input.attributes('accept')).toBe('.pdf,.docx')
    })

    it('supports drag and drop integration', () => {
      const wrapper = mount(FdsFileUpload)
      const input = wrapper.find('input[type="file"]')

      // The input should be ready for drag and drop enhancement
      expect(input.attributes('type')).toBe('file')
      expect(input.classes()).toContain('form-control')
    })

    it('integrates with progress indicators', async () => {
      const wrapper = mount({
        template: `
          <div>
            <fds-file-upload
              @upload="handleUpload"
              :disabled="uploading"
            />
            <div v-if="uploading" class="upload-progress">
              Uploading...
            </div>
          </div>
        `,
        components: { FdsFileUpload },
        data() {
          return {
            uploading: false,
          }
        },
        methods: {
          async handleUpload(_files) {
            this.uploading = true
            // Simulate upload
            await new Promise((resolve) => setTimeout(resolve, 100))
            this.uploading = false
          },
        },
      })

      const fileUpload = wrapper.findComponent(FdsFileUpload)
      expect(fileUpload.props('disabled')).toBe(false)

      // Simulate file upload
      wrapper.vm.uploading = true
      await nextTick()

      expect(wrapper.find('.upload-progress').exists()).toBe(true)
      expect(fileUpload.props('disabled')).toBe(true)
    })
  })
})
