import { describe, it, expect } from 'vitest'
import uuid from '../../utils/uuid'

describe('uuid', () => {
  it('should generate a valid UUID v4 format', () => {
    const id = uuid()
    // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    // where y is one of [8, 9, A, or B]
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    expect(id).toMatch(uuidRegex)
  })

  it('should generate unique IDs', () => {
    const ids = new Set<string>()
    const count = 1000

    for (let i = 0; i < count; i++) {
      ids.add(uuid())
    }

    // All generated IDs should be unique
    expect(ids.size).toBe(count)
  })

  it('should have correct length', () => {
    const id = uuid()
    // UUID length should be 36 characters (32 hex + 4 hyphens)
    expect(id.length).toBe(36)
  })

  it('should have hyphens in correct positions', () => {
    const id = uuid()
    expect(id[8]).toBe('-')
    expect(id[13]).toBe('-')
    expect(id[18]).toBe('-')
    expect(id[23]).toBe('-')
  })

  it('should have version 4 identifier', () => {
    const id = uuid()
    // Character at position 14 should be '4' for version 4
    expect(id[14]).toBe('4')
  })

  it('should have correct variant bits', () => {
    const id = uuid()
    // Character at position 19 should be one of [8, 9, a, b]
    const variantChar = id[19].toLowerCase()
    expect(['8', '9', 'a', 'b']).toContain(variantChar)
  })
})
