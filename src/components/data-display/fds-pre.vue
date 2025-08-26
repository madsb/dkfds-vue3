<template>
  <div class="fds-pre">
    <fieldset class="form-group">
      <legend v-if="header" class="form-label">
        {{ header }}
      </legend>
      <div class="form-input" :style="containerStyles">
        <pre v-if="json" class="code" :style="preStyles" v-text="formatJson(json)" />
        <pre v-else-if="code" class="code" :style="preStyles" v-text="code" />
        <pre v-else class="code" :style="preStyles"><slot /></pre>
      </div>
      <span v-if="json && formatJson(json).length > 65535" class="form-hint mt-2">
        JSON indeholder elementer over 65.535 tegn og noget data vil ikke blive vist
      </span>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
export interface FdsPreProps {
  /** JSON object to display formatted */
  json?: object | null
  /** Code string to display */
  code?: string | null
  /** Header text for the code block */
  header?: string
}

defineProps<FdsPreProps>()

/**
 * Format JSON with proper indentation
 */
const formatJson = (obj: object | null): string => {
  if (!obj) return ''
  try {
    return JSON.stringify(obj, null, 2)
  } catch (error) {
    console.error('Error formatting JSON:', error)
    return String(obj)
  }
}

// Inline styles to avoid SCSS dependency issues
const containerStyles = {
  backgroundColor: '#f5f5f5',
  border: '1px solid #dcdcdc',
  borderRadius: '4px',
  overflowX: 'auto' as const,
}

const preStyles = {
  margin: '0',
  padding: '1rem',
  fontFamily: "'Courier New', Courier, monospace",
  lineHeight: '1.5',
  whiteSpace: 'pre' as const,
  overflowWrap: 'normal' as const,
  backgroundColor: 'transparent',
  border: 'none',
}
</script>

<style scoped lang="scss"></style>
