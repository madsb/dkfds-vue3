import { App, Plugin } from 'vue'

// Import all components from organized structure
import {
  // Forms
  FdsFormgroup,
  FdsLabel,
  FdsHint,
  FdsFejlmeddelelse,
  // Input
  FdsInput,
  FdsInputNumber,
  FdsInputLimit,
  FdsTextarea,
  FdsCheckbox,
  FdsRadioGroup,
  FdsRadioItem,
  FdsToggleSwitch,
  FdsDropdown,
  FdsDatoVaelger,
  FdsDatoFelter,
  FdsFileUpload,
  // Navigation
  FdsBreadcrumb,
  FdsPaginering,
  FdsTrinindikatorGroup,
  FdsTrinindikatorStep,
  FdsFaneblade,
  FdsFanebladeTab,
  FdsFanebladePanel,
  FdsFanebladeNav,
  FdsFanebladeNavItem,
  FdsNavLink,
  FdsTilbageLink,
  FdsTilTop,
  FdsMenu,
  FdsMenuItem,
  FdsOverflowMenu,
  // Feedback
  FdsAlert,
  FdsToast,
  FdsToastContainer,
  FdsModal,
  FdsFejlopsummering,
  FdsSpinner,
  FdsTooltip,
  // Data Display
  FdsAccordion,
  FdsAccordionGroup,
  FdsCard,
  FdsCardGroup,
  FdsDetaljer,
  FdsBadge,
  FdsTag,
  FdsList,
  FdsListItem,
  FdsPre,
  FdsPreview,
  FdsPreviewCode,
  FdsPreviewExample,
  FdsPreviewItem,
  // Layout
  FdsCookiemeddelelse,
  FdsSprogvaelger,
  FdsButton,
  FdsFunktionslink,
  FdsIkon,
  FdsIconCollection,
} from './components'

const components = {
  // Forms
  FdsFormgroup,
  FdsLabel,
  FdsHint,
  FdsFejlmeddelelse,
  // Input
  FdsInput,
  FdsInputNumber,
  FdsInputLimit,
  FdsTextarea,
  FdsCheckbox,
  FdsRadioGroup,
  FdsRadioItem,
  FdsToggleSwitch,
  FdsDropdown,
  FdsDatoVaelger,
  FdsDatoFelter,
  FdsFileUpload,
  // Navigation
  FdsBreadcrumb,
  FdsPaginering,
  FdsTrinindikatorGroup,
  FdsTrinindikatorStep,
  FdsFaneblade,
  FdsFanebladeTab,
  FdsFanebladePanel,
  FdsFanebladeNav,
  FdsFanebladeNavItem,
  FdsNavLink,
  FdsTilbageLink,
  FdsTilTop,
  FdsMenu,
  FdsMenuItem,
  FdsOverflowMenu,
  // Feedback
  FdsAlert,
  FdsToast,
  FdsToastContainer,
  FdsModal,
  FdsFejlopsummering,
  FdsSpinner,
  FdsTooltip,
  // Data Display
  FdsAccordion,
  FdsAccordionGroup,
  FdsCard,
  FdsCardGroup,
  FdsDetaljer,
  FdsBadge,
  FdsTag,
  FdsList,
  FdsListItem,
  FdsPre,
  FdsPreview,
  FdsPreviewCode,
  FdsPreviewExample,
  FdsPreviewItem,
  // Layout
  FdsCookiemeddelelse,
  FdsSprogvaelger,
  FdsButton,
  FdsFunktionslink,
  FdsIkon,
  FdsIconCollection,
}

// Alias with English names (create as type alias instead)
export type FdsLanguageSelector = typeof FdsSprogvaelger

const install: Plugin = {
  install(app: App) {
    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component)
    })
  },
}

export { install }
export default install

// Export composables
export { useToast } from './composables/useToast'
export type { ToastOptions } from './composables/useToast'

// Export component types
export type { BreadcrumbItem } from './components/navigation/fds-breadcrumb.vue'

// Re-export utils (so /utils subpath works)
export * from './utils'

// Export all components individually
export {
  // Forms
  FdsFormgroup,
  FdsLabel,
  FdsHint,
  FdsFejlmeddelelse,
  // Input
  FdsInput,
  FdsInputNumber,
  FdsInputLimit,
  FdsTextarea,
  FdsCheckbox,
  FdsRadioGroup,
  FdsRadioItem,
  FdsToggleSwitch,
  FdsDropdown,
  FdsDatoVaelger,
  FdsDatoFelter,
  FdsFileUpload,
  // Navigation
  FdsBreadcrumb,
  FdsPaginering,
  FdsTrinindikatorGroup,
  FdsTrinindikatorStep,
  FdsFaneblade,
  FdsFanebladeTab,
  FdsFanebladePanel,
  FdsFanebladeNav,
  FdsFanebladeNavItem,
  FdsNavLink,
  FdsTilbageLink,
  FdsTilTop,
  FdsMenu,
  FdsMenuItem,
  FdsOverflowMenu,
  // Feedback
  FdsAlert,
  FdsToast,
  FdsToastContainer,
  FdsModal,
  FdsFejlopsummering,
  FdsSpinner,
  FdsTooltip,
  // Data Display
  FdsAccordion,
  FdsAccordionGroup,
  FdsCard,
  FdsCardGroup,
  FdsDetaljer,
  FdsBadge,
  FdsTag,
  FdsList,
  FdsListItem,
  FdsPre,
  FdsPreview,
  FdsPreviewCode,
  FdsPreviewExample,
  FdsPreviewItem,
  // Layout
  FdsCookiemeddelelse,
  FdsButton,
  FdsFunktionslink,
  FdsIkon,
  FdsIconCollection,
  FdsSprogvaelger,
}

// Export composables
export * from './composables'

// Export utils
export * from './utils'

// Export types
export * from './types'
