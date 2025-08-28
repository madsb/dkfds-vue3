<template>
  <div class="language-switcher">
    <div class="container">
      <ul aria-label="Vælg sprog fra listen">
        <li v-for="(language, index) of sortedLanguages" :key="index">
          <a
            :href="language.href || `?lang=${language.lang}`"
            :lang="language.lang"
            :aria-label="language.ariaLabel"
            :class="{ active: language.active }"
            @click="handleLanguageChange(language, $event)"
          >
            <fds-ikon v-if="language.active" icon="check" :decorative="true" />
            {{ language.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { FdsLanguageItem } from '../../types'
import FdsIkon from './fds-ikon.vue'

/**
 * Language selector component implementing DKFDS v11 sprogvælger specifications.
 *
 * Provides language switching functionality with automatic document language
 * attribute management and accessibility features. Active language is displayed
 * first with a checkmark icon. Supports both programmatic and URL-based language
 * switching with customizable href generation or event-based handling.
 *
 * @component
 * @example Basic language selector
 * ```vue
 * <fds-sprogvaelger
 *   v-model="languages"
 *   @language-change="handleLanguageChange"
 * />
 * ```
 *
 * @example With custom URLs and auto lang attribute
 * ```vue
 * <fds-sprogvaelger
 *   v-model="languagesWithUrls"
 *   :auto-set-lang="true"
 *   :prevent-default="false"
 *   @lang="updateAppLanguage"
 * />
 * ```
 *
 * @example Event-driven language switching
 * ```vue
 * <fds-sprogvaelger
 *   v-model="availableLanguages"
 *   :prevent-default="true"
 *   @language-change="switchLanguage"
 * />
 *
 * // Script section:
 * // const switchLanguage = (language) => {
 * //   // Custom language switching logic
 * //   i18n.locale.value = language.lang
 * //   router.push({ params: { locale: language.lang } })
 * // }
 * ```
 *
 * @see {@link https://designsystem.dk/komponenter/sprogvælger/} DKFDS Language Selector Documentation
 */

interface ExtendedFdsLanguageItem extends FdsLanguageItem {
  /**
   * Custom URL for language switching
   * Optional href for each language. If not provided, uses default query parameter format.
   */
  href?: string
}

export interface FdsSprogvaelgerProps {
  /**
   * Array of available languages
   * Each language object should include lang, title, and active properties.
   * Optionally include href for custom navigation URLs.
   */
  modelValue: ExtendedFdsLanguageItem[]
  /**
   * Automatically set document language attribute
   * Updates document.documentElement.lang when language changes.
   * @default false
   */
  autoSetLang?: boolean
  /**
   * Prevent default link navigation behavior
   * When true, prevents navigation and allows event-based handling only.
   * @default true
   */
  preventDefault?: boolean
}

const props = withDefaults(defineProps<FdsSprogvaelgerProps>(), {
  autoSetLang: false,
  preventDefault: true,
})

const emit = defineEmits<{
  /**
   * Emitted when the language array is updated
   * Updates the v-model with the new active language state.
   *
   * @param value - Updated array of language objects with new active states
   */
  'update:modelValue': [value: ExtendedFdsLanguageItem[]]
  /**
   * Emitted when a language is selected
   * Provides the complete language object that was selected.
   *
   * @param language - The selected language object
   */
  'language-change': [language: ExtendedFdsLanguageItem]
  /**
   * Emitted when language code changes
   * Provides just the language code for simple language handling.
   *
   * @param lang - The language code (e.g., 'da', 'en')
   */
  lang: [lang: string]
}>()

// Sort languages with active language first
const sortedLanguages = computed(() => {
  const languages = [...props.modelValue]
  const activeIndex = languages.findIndex((lang) => lang.active)

  if (activeIndex > 0) {
    const activeLanguage = languages.splice(activeIndex, 1)[0]
    languages.unshift(activeLanguage)
  }

  return languages
})

const handleLanguageChange = (language: ExtendedFdsLanguageItem, event: MouseEvent) => {
  if (props.preventDefault || !language.href) {
    event.preventDefault()
  }

  if (language.active) {
    return // Don't change if already active
  }

  const updatedLanguages = props.modelValue.map((lang) => ({
    ...lang,
    active: lang.lang === language.lang,
  }))

  if (props.autoSetLang) {
    document.documentElement.setAttribute('lang', language.lang)
  }

  emit('update:modelValue', updatedLanguages)
  emit('language-change', language)
  emit('lang', language.lang)
}

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    const activeLanguage = newValue.find((lang) => lang.active)
    if (activeLanguage && props.autoSetLang) {
      document.documentElement.setAttribute('lang', activeLanguage.lang)
    }
  },
  { immediate: true },
)
</script>

<style scoped lang="scss"></style>
