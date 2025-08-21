import { describe, it, expect } from 'vitest'
import {
  validateAllErrorMessage,
  numberMax,
  numberMin,
  charactersMaxLength,
  charactersMinLength,
  charactersEqualsLength,
  validCVR,
} from '../../utils/validate-utils'

describe('validate-utils', () => {
  describe('validateAllErrorMessage', () => {
    it('should return empty array when all validations pass', () => {
      const validator = validateAllErrorMessage(
        () => null,
        () => null,
        () => null,
      )

      expect(validator('test')).toEqual([])
    })

    it('should return array of error messages when validations fail', () => {
      const validator = validateAllErrorMessage(
        () => 'Error 1',
        () => null,
        () => 'Error 2',
      )

      expect(validator('test')).toEqual(['Error 1', 'Error 2'])
    })

    it('should handle single validation error', () => {
      const validator = validateAllErrorMessage(() => 'Single error')

      expect(validator('test')).toEqual(['Single error'])
    })
  })

  describe('numberMax', () => {
    it('should return null when number is less than max', () => {
      const validator = numberMax(100)
      expect(validator(50)).toBeNull()
    })

    it('should return null when number equals max', () => {
      const validator = numberMax(100)
      expect(validator(100)).toBeNull()
    })

    it('should return error when number exceeds max', () => {
      const validator = numberMax(100)
      expect(validator(101)).toBe('Feltet må overstige 100.')
    })
  })

  describe('numberMin', () => {
    it('should return null when number is greater than min', () => {
      const validator = numberMin(10)
      expect(validator(50)).toBeNull()
    })

    it('should return error when number equals min', () => {
      const validator = numberMin(10)
      expect(validator(10)).toBe('Feltet må ikke være mindre end 10.')
    })

    it('should return error when number is less than min', () => {
      const validator = numberMin(10)
      expect(validator(5)).toBe('Feltet må ikke være mindre end 10.')
    })
  })

  describe('charactersMaxLength', () => {
    it('should return null when string length is less than max', () => {
      const validator = charactersMaxLength(10)
      expect(validator('test')).toBeNull()
    })

    it('should return null when string length equals max', () => {
      const validator = charactersMaxLength(4)
      expect(validator('test')).toBeNull()
    })

    it('should return error when string length exceeds max', () => {
      const validator = charactersMaxLength(3)
      expect(validator('test')).toBe('Feltet må ikke være længere end 3 tegn.')
    })
  })

  describe('charactersMinLength', () => {
    it('should return null when string length is greater than min', () => {
      const validator = charactersMinLength(3)
      expect(validator('test')).toBeNull()
    })

    it('should return null when string length equals min', () => {
      const validator = charactersMinLength(4)
      expect(validator('test')).toBeNull()
    })

    it('should return error when string length is less than min', () => {
      const validator = charactersMinLength(5)
      expect(validator('test')).toBe('Feltet må ikke være kortere end 5 tegn.')
    })
  })

  describe('charactersEqualsLength', () => {
    it('should return null when string length equals expected', () => {
      const validator = charactersEqualsLength(4)
      expect(validator('test')).toBeNull()
    })

    it('should return error when string length does not equal expected', () => {
      const validator = charactersEqualsLength(5)
      expect(validator('test')).toBe('Feltet skal være nøjagtigt 5 tegn.')
    })

    it('should use custom type in error message', () => {
      const validator = charactersEqualsLength(8, 'cifre')
      expect(validator('1234567')).toBe('Feltet skal være nøjagtigt 8 cifre.')
    })
  })

  describe('validCVR', () => {
    it('should return null for valid CVR numbers', () => {
      expect(validCVR('12345678')).toBeNull()
      expect(validCVR('98765432')).toBeNull()
    })

    it('should return error for invalid CVR numbers', () => {
      expect(validCVR('00000000')).toBe('CVR nummer er ikke korrekt angivet') // Cannot start with 0
      expect(validCVR('1234567')).toBe('CVR nummer er ikke korrekt angivet') // Too short
      expect(validCVR('123456789')).toBe('CVR nummer er ikke korrekt angivet') // Too long
      expect(validCVR('1234567a')).toBe('CVR nummer er ikke korrekt angivet') // Contains letters
      expect(validCVR('')).toBe('CVR nummer er ikke korrekt angivet') // Empty
    })
  })
})
