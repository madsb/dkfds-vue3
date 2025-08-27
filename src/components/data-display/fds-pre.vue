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
/**
 * Pre-formatted text component implementing DKFDS v11 code display specifications.
 * 
 * Displays formatted code, JSON, or pre-formatted text with proper syntax highlighting support.
 * Features automatic JSON formatting, scrollable containers for long content, and optional
 * headers for context. Designed for technical documentation and data display.
 * 
 * @component
 * @example Basic code display
 * ```vue
 * <FdsPre code="const hello = 'world';" header="JavaScript Example" />
 * ```
 * 
 * @example JSON object formatting
 * ```vue
 * <FdsPre 
 *   :json="{ name: 'John', age: 30, city: 'Copenhagen' }" 
 *   header="User Data"
 * />
 * ```
 * 
 * @example Slot content for complex formatting
 * ```vue
 * <FdsPre header="Configuration File">
 *   server:
 *     host: localhost
 *     port: 3000
 *   database:
 *     type: postgresql
 *     url: postgres://localhost/mydb
 * </FdsPre>
 * ```
 * 
 * @example Large JSON with overflow warning
 * ```vue
 * <FdsPre 
 *   :json="largeDataObject" 
 *   header="API Response"
 * />
 * <!-- Shows warning if content exceeds 65,535 characters -->
 * ```
 * 
 * @see {@link https://designsystem.dk/komponenter/} DKFDS Documentation (Pre/Code components)
 */
export interface FdsPreProps {
  /** 
   * JavaScript object to display as formatted JSON
   * Automatically stringified with proper indentation
   * Takes precedence over code prop when both are provided
   */
  json?: object | null
  /** 
   * Raw code string to display with monospace formatting
   * Used when json prop is not provided
   */
  code?: string | null
  /** 
   * Optional header text displayed above the code block
   * Useful for providing context or identifying the content type
   */
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
