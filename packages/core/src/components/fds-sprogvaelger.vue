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
import { FdsLanguageItem } from '@madsb/dkfds-vue3-utils'
import FdsIkon from './fds-ikon.vue'

interface ExtendedFdsLanguageItem extends FdsLanguageItem {
  href?: string
}

interface Props {
  modelValue: ExtendedFdsLanguageItem[]
  autoSetLang?: boolean
  preventDefault?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoSetLang: false,
  preventDefault: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: ExtendedFdsLanguageItem[]]
  'language-change': [language: ExtendedFdsLanguageItem]
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
