/**
 * Toast Composable for DKFDS Vue3
 * Provides programmatic control of toast notifications
 */
import { ref, reactive, nextTick, App, createApp, h } from 'vue'
import FdsToast from '../components/fds-toast.vue'
import { generateId } from 'dkfds-vue3-utils'

export interface ToastOptions {
  type?: 'info' | 'success' | 'warning' | 'error'
  heading?: string
  message: string
  closable?: boolean
  autoDismiss?: number
  onClick?: (event: MouseEvent) => void
}

export interface Toast {
  id: string
  options: ToastOptions
  element?: HTMLElement
  component?: any
}

// Global toast store
const toasts = ref<Toast[]>([])
const containerId = 'fds-toast-container'

// Ensure container exists
const ensureContainer = () => {
  let container = document.getElementById(containerId)
  if (!container) {
    container = document.createElement('div')
    container.id = containerId
    container.className = 'toast-container'
    container.setAttribute('aria-live', 'assertive')
    container.setAttribute('aria-atomic', 'false')
    container.setAttribute('aria-relevant', 'additions')

    // Insert as first child of main, or body if no main
    const main = document.querySelector('main')
    if (main) {
      main.insertBefore(container, main.firstChild)
    } else {
      document.body.insertBefore(container, document.body.firstChild)
    }
  }
  return container
}

// Show a toast
const showToast = async (options: ToastOptions): Promise<string> => {
  const container = ensureContainer()
  const id = generateId('toast').value

  // Create toast element wrapper
  const toastWrapper = document.createElement('div')
  container.appendChild(toastWrapper)

  // Create Vue app instance for the toast
  const app = createApp({
    setup() {
      const visible = ref(false)

      const handleClose = () => {
        visible.value = false
        setTimeout(() => {
          removeToast(id)
        }, 300) // Wait for animation to complete
      }

      const handleClick = (event: MouseEvent) => {
        if (options.onClick) {
          options.onClick(event)
        }
      }

      // Show toast after mounting
      nextTick(() => {
        visible.value = true
      })

      return () =>
        h(FdsToast, {
          id,
          type: options.type || 'info',
          heading: options.heading,
          message: options.message,
          closable: options.closable !== false,
          autoDismiss: options.autoDismiss || 0,
          visible: visible.value,
          'onUpdate:visible': (value: boolean) => {
            visible.value = value
          },
          onClose: handleClose,
          onClick: handleClick,
        })
    },
  })

  // Mount the toast
  const instance = app.mount(toastWrapper)

  // Store toast reference
  const toast: Toast = {
    id,
    options,
    element: toastWrapper,
    component: app,
  }

  toasts.value.push(toast)

  return id
}

// Remove a toast
const removeToast = (id: string) => {
  const index = toasts.value.findIndex((t) => t.id === id)
  if (index > -1) {
    const toast = toasts.value[index]

    // Unmount and remove the component
    if (toast.component) {
      toast.component.unmount()
    }
    if (toast.element && toast.element.parentNode) {
      toast.element.parentNode.removeChild(toast.element)
    }

    // Remove from store
    toasts.value.splice(index, 1)
  }
}

// Remove all toasts
const clearAllToasts = () => {
  toasts.value.forEach((toast) => {
    if (toast.component) {
      toast.component.unmount()
    }
    if (toast.element && toast.element.parentNode) {
      toast.element.parentNode.removeChild(toast.element)
    }
  })
  toasts.value = []
}

// Convenience methods for different toast types
const showInfo = (message: string, options?: Partial<ToastOptions>) => {
  return showToast({ ...options, message, type: 'info' })
}

const showSuccess = (message: string, options?: Partial<ToastOptions>) => {
  return showToast({ ...options, message, type: 'success' })
}

const showWarning = (message: string, options?: Partial<ToastOptions>) => {
  return showToast({ ...options, message, type: 'warning' })
}

const showError = (message: string, options?: Partial<ToastOptions>) => {
  return showToast({ ...options, message, type: 'error' })
}

// Main composable
export const useToast = () => {
  return {
    showToast,
    removeToast,
    clearAllToasts,
    showInfo,
    showSuccess,
    showWarning,
    showError,
    toasts: toasts,
  }
}
