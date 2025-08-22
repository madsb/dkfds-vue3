import { describe, it, expect, vi } from 'vitest'
import { createApp, h, provide } from 'vue'
import getFormId from '../../composable/formId'

describe('formId composable', () => {
  // Helper to test with injection context
  function withInjection(provideValue: string | null, callback: () => any) {
    let result: any
    const app = createApp({
      setup() {
        if (provideValue !== null) {
          provide('formid', provideValue)
        }
        // Create a child component that calls the callback in its setup
        return () => h({
          setup() {
            result = callback()
            return () => h('div')
          },
        })
      },
    })
    
    const container = document.createElement('div')
    app.mount(container)
    app.unmount()
    
    return result
  }

  it('should return localId when no injection is provided', () => {
    const { formid } = getFormId('local-id-456')
    expect(formid.value).toBe('local-id-456')
  })

  it('should return injected formid when provided through injection', () => {
    const result = withInjection('injected-id-123', () => getFormId(undefined))
    expect(result.formid.value).toBe('injected-id-123')
  })

  it('should prefer injected formid over localId when both are provided', () => {
    const result = withInjection('injected-id-preferred', () => getFormId('local-id-789'))
    expect(result.formid.value).toBe('injected-id-preferred')
  })

  it('should generate auto ID when autogenId is true and no ID is provided', () => {
    const { formid } = getFormId(undefined, true)
    expect(formid.value).toMatch(/^fid_[a-z0-9]+$/)
    expect(formid.value).not.toContain('-')
  })

  it('should use localId even when autogenId is true if localId is provided', () => {
    const { formid } = getFormId('local-id', true)
    expect(formid.value).toBe('local-id')
  })

  it('should throw error when no ID is provided and autogenId is false', () => {
    const { formid } = getFormId(undefined, false)
    expect(() => formid.value).toThrow('Form id is not set. Did you forget formgroup')
  })

  it('should not throw error when localId is provided and autogenId is false', () => {
    const { formid } = getFormId('valid-id', false)
    expect(() => formid.value).not.toThrow()
    expect(formid.value).toBe('valid-id')
  })

  it('should handle empty string localId', () => {
    const { formid } = getFormId('', true)
    // Empty string is still a value, so it should use it
    expect(formid.value).toBe('')
  })

  it('should generate unique auto IDs', () => {
    const { formid: id1 } = getFormId(undefined, true)
    const { formid: id2 } = getFormId(undefined, true)
    
    // Both should match the pattern but be different IDs
    expect(id1.value).toMatch(/^fid_[a-z0-9]+$/)
    expect(id2.value).toMatch(/^fid_[a-z0-9]+$/)
    expect(id1.value).not.toBe(id2.value)
  })
})