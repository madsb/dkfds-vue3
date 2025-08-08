<template>
  <div>
    <h2 class="h3">Toastbeskeder</h2>
    <p>
      Toastbeskeder bruges til at vise midlertidige notifikationer til brugeren. De kan være
      informative, succesfulde, advarsler eller fejlmeddelelser.
    </p>

    <fds-preview>
      <fds-preview-item title="Toastbeskeder">
        <div class="button-group">
          <fds-button @click="showInfoToast">Vis info toast</fds-button>
          <fds-button variant="secondary" @click="showSuccessToast">Vis succes toast</fds-button>
          <fds-button variant="tertiary" @click="showWarningToast">Vis advarsel toast</fds-button>
          <fds-button variant="quaternary" @click="showErrorToast">Vis fejl toast</fds-button>
        </div>

        <h3 class="h4 mt-5">Toast med forskellige indstillinger</h3>
        <div class="button-group">
          <fds-button @click="showAutoToast">Auto-dismiss toast (3 sek)</fds-button>
          <fds-button variant="secondary" @click="showPersistentToast">
            Vedvarende toast
          </fds-button>
          <fds-button variant="tertiary" @click="showClickableToast">
            Klikbar toast
          </fds-button>
        </div>

        <h3 class="h4 mt-5">Håndtering</h3>
        <div class="button-group">
          <fds-button variant="quaternary" @click="clearAll">Ryd alle toasts</fds-button>
        </div>
      </fds-preview-item>

      <fds-preview-code>
        <pre v-text="codeExample" />
      </fds-preview-code>
    </fds-preview>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useToast } from 'dkfds-vue3'

const { showInfo, showSuccess, showWarning, showError, showToast, clearAllToasts } = useToast()

// Ensure toast container is added to the page on mount
onMounted(() => {
  // The container will be automatically created by useToast when needed
})

const showInfoToast = () => {
  showInfo('Dette er en informativ besked til brugeren.', {
    heading: 'Information',
  })
}

const showSuccessToast = () => {
  showSuccess('Handlingen blev gennemført.', {
    heading: 'Succes!',
  })
}

const showWarningToast = () => {
  showWarning('Vær opmærksom på denne vigtige information.', {
    heading: 'Advarsel',
  })
}

const showErrorToast = () => {
  showError('Der opstod en fejl. Prøv venligst igen.', {
    heading: 'Fejl',
  })
}

const showAutoToast = () => {
  showToast({
    type: 'info',
    heading: 'Auto-dismiss',
    message: 'Denne besked forsvinder automatisk efter 3 sekunder.',
    autoDismiss: 3000,
  })
}

const showPersistentToast = () => {
  showToast({
    type: 'warning',
    heading: 'Vedvarende besked',
    message: 'Denne besked forsvinder ikke automatisk.',
    closable: true,
  })
}

const showClickableToast = () => {
  showToast({
    type: 'info',
    heading: 'Klikbar toast',
    message: 'Klik på denne besked for at se en handling.',
    onClick: () => {
      alert('Du klikkede på toasten!')
    },
  })
}

const clearAll = () => {
  clearAllToasts()
}

const codeExample = `<template>
  <!-- Toast container placeres automatisk i app -->
  <!-- Ingen manuel container nødvendig når du bruger composable -->
</template>

<script setup>
import { useToast } from 'dkfds-vue3'

const { showInfo, showSuccess, showWarning, showError, showToast, clearAllToasts } = useToast()

// Vis forskellige toast typer
showInfo('Informativ besked')
showSuccess('Handlingen lykkedes!', { heading: 'Succes!' })
showWarning('Advarsel', { heading: 'Pas på!' })
showError('Der opstod en fejl', { heading: 'Fejl' })

// Vis toast med auto-dismiss
showToast({
  type: 'info',
  heading: 'Auto-dismiss',
  message: 'Forsvinder efter 3 sekunder',
  autoDismiss: 3000
})

// Vis klikbar toast
showToast({
  type: 'info',
  heading: 'Klikbar',
  message: 'Klik for handling',
  onClick: () => console.log('Toast klikket!')
})

// Ryd alle toasts
clearAllToasts()
</scri${''}pt>`
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
