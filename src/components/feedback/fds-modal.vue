<template>
  <dialog :id="`${dialogId}`" ref="refDialog" :aria-labelledby="`modal_${dialogId}_title`">
    <div :id="`modal_${dialogId}`" class="fds-modal" aria-hidden="false" aria-modal="true">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <h2 :id="`modal_${dialogId}_title`" class="modal-title">
              {{ header }}
            </h2>
            <button v-if="closeable" class="modal-close function-link" @click="hideModal">
              <fds-ikon icon="close" :decorative="true" />Luk
            </button>
          </slot>
        </div>
        <div class="modal-body">
          <slot />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="button button-primary" @click="handleAccept">
              {{ acceptText }}
            </button>
            <button class="button button-secondary" @click="handleCancel">
              {{ cancelText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
/**
 * Modal component implementing DKFDS v11 dialog specifications.
 *
 * Accessible modal dialog using native HTML dialog element with focus management.
 * Supports customizable actions, closeable behavior, and proper ARIA attributes.
 *
 * @component
 * @example Basic modal with actions
 * ```vue
 * <FdsModal
 *   ref="modalRef"
 *   header="Confirm Action"
 *   accept-text="Confirm"
 *   cancel-text="Cancel"
 *   @accept="handleConfirm"
 *   @cancel="handleCancel"
 * >
 *   Are you sure you want to proceed with this action?
 * </FdsModal>
 *
 * <!-- Open modal from button -->
 * <FdsButton @click="modalRef.showModal()">Open Modal</FdsButton>
 * ```
 *
 * @example Non-closeable modal
 * ```vue
 * <FdsModal
 *   ref="termsModal"
 *   header="Terms and Conditions"
 *   :closeable="false"
 *   accept-text="I Agree"
 *   :show-cancel="false"
 *   @accept="acceptTerms"
 * >
 *   <p>You must accept the terms to continue...</p>
 * </FdsModal>
 * ```
 *
 * @example Custom footer actions
 * ```vue
 * <FdsModal header="Custom Actions">
 *   <template #default>
 *     Modal content here
 *   </template>
 *   <template #footer>
 *     <FdsButton variant="primary" @click="save">Save</FdsButton>
 *     <FdsButton variant="secondary" @click="saveAndClose">Save & Close</FdsButton>
 *     <FdsButton variant="tertiary" @click="cancel">Cancel</FdsButton>
 *   </template>
 * </FdsModal>
 * ```
 *
 * @example Custom header
 * ```vue
 * <FdsModal>
 *   <template #header>
 *     <div class="custom-header">
 *       <h2>Custom Modal Title</h2>
 *       <span class="modal-subtitle">Additional information</span>
 *     </div>
 *   </template>
 *   <template #default>
 *     Modal body content
 *   </template>
 * </FdsModal>
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/modal/} DKFDS Modal Documentation
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog} HTML Dialog Element
 */

import { generateId } from '../../composables'
import { computed, ref, onMounted } from 'vue'
import FdsIkon from '../layout/fds-ikon.vue'

export interface FdsModalProps {
  /**
   * Modal header text
   * Displayed as the dialog title
   */
  header?: string

  /**
   * Unique identifier for the modal dialog
   * Auto-generated if not provided
   */
  id?: string

  /**
   * Allow modal to be closed with X button or ESC key
   * @default true
   */
  closeable?: boolean

  /**
   * Text for the primary action button
   * @default 'OK'
   */
  acceptText?: string
  /** Text for cancel button */
  cancelText?: string
}

const {
  header,
  id,
  closeable = true,
  acceptText = 'Godkend',
  cancelText = 'Annuller',
} = defineProps<FdsModalProps>()

const emit = defineEmits<{
  close: []
  accept: []
  cancel: []
}>()

const refDialog = ref(null)
const dialogId = generateId(id)
const htmlDialog = computed(() => refDialog.value as unknown as HTMLDialogElement)

const showModal = () => {
  htmlDialog.value.showModal()
}
const hideModal = () => {
  htmlDialog.value.close()
  emit('close')
}

defineExpose({
  hideModal,
  showModal,
})

onMounted(() => {
  if (closeable) {
    // cancel is exposed by HTMLDialogElement
    htmlDialog.value.addEventListener('cancel', () => {
      hideModal()
    })
  }
})

const handleAccept = () => {
  emit('accept')
  hideModal()
}

const handleCancel = () => {
  hideModal()
  emit('cancel')
}
</script>
