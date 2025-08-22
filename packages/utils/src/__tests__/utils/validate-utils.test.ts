import { describe, it, expect } from 'vitest'
import {
  validateAllErrorMessage,
  numberMax,
  numberMin,
  charactersMaxLength,
  charactersMinLength,
  charactersEqualsLength,
  validCVR,
  validCPR,
  validSagsnummer,
  hasContent,
  validEmail,
  noSpace,
  notEmpty,
  arrayHasItems,
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

  describe('validCPR', () => {
    it('should return null for valid CPR numbers', () => {
      expect(validCPR('0101701234')).toBeNull() // Valid date format
      expect(validCPR('010170-1234')).toBeNull() // With dash
      expect(validCPR('3112991234')).toBeNull() // December 31st
    })

    it('should return error for invalid CPR numbers', () => {
      expect(validCPR('3202991234')).toBe('CPR nummer er ikke korrekt angivet') // Invalid date (32nd)
      expect(validCPR('0000001234')).toBe('CPR nummer er ikke korrekt angivet') // Invalid date
      expect(validCPR('12345')).toBe('CPR nummer er ikke korrekt angivet') // Too short
      expect(validCPR('')).toBe('CPR nummer er ikke korrekt angivet') // Empty
    })
  })

  describe('validSagsnummer', () => {
    it('should return null for valid sagsnummer', () => {
      expect(validSagsnummer('A12-AB-34-CD')).toBeNull()
      expect(validSagsnummer('X99-ZZ-99-YY-01')).toBeNull()
      expect(validSagsnummer('B01-AA-01-BB-01-CC')).toBeNull()
    })

    it('should return error for invalid sagsnummer', () => {
      expect(validSagsnummer('Z12-AB-34-CD')).toBe('Sagsnummer ikke korrekt angivet') // Invalid start letter
      expect(validSagsnummer('A12-AB-34')).toBe('Sagsnummer ikke korrekt angivet') // Too short
      expect(validSagsnummer('A12-12-34-CD')).toBe('Sagsnummer ikke korrekt angivet') // Numbers instead of letters
      expect(validSagsnummer('')).toBe('Sagsnummer ikke korrekt angivet') // Empty
    })
  })

  describe('hasContent', () => {
    it('should return null for non-empty strings', () => {
      expect(hasContent('text')).toBeNull()
      expect(hasContent('  text  ')).toBeNull()
      expect(hasContent('multiple words')).toBeNull()
    })

    it('should return error for empty or whitespace-only strings', () => {
      expect(hasContent('')).toBe('Feltet må ikke være tomt.')
      expect(hasContent('   ')).toBe('Feltet må ikke være tomt.')
      expect(hasContent('\t\n')).toBe('Feltet må ikke være tomt.')
    })
  })

  describe('validEmail', () => {
    it('should return null for valid email addresses', () => {
      expect(validEmail('test@example.com')).toBeNull()
      expect(validEmail('user.name@domain.co.uk')).toBeNull()
      expect(validEmail('user+tag@example.org')).toBeNull()
    })

    it('should return error for invalid email addresses', () => {
      expect(validEmail('notanemail')).toBe('Email er ikke korrekt angivet')
      expect(validEmail('missing@domain')).toBe('Email er ikke korrekt angivet')
      expect(validEmail('@example.com')).toBe('Email er ikke korrekt angivet')
      expect(validEmail('user@')).toBe('Email er ikke korrekt angivet')
      expect(validEmail('')).toBe('Email er ikke korrekt angivet')
    })
  })

  describe('noSpace', () => {
    it('should return null for strings without spaces', () => {
      expect(noSpace('test')).toBeNull()
      expect(noSpace('test123')).toBeNull()
      expect(noSpace('')).toBeNull()
    })

    it('should return error for strings with spaces', () => {
      expect(noSpace('test 123')).toBe('Feltet må ikke har mellemrum.')
      expect(noSpace(' ')).toBe('Feltet må ikke har mellemrum.')
      expect(noSpace('multiple word string')).toBe('Feltet må ikke har mellemrum.')
    })
  })

  describe('notEmpty', () => {
    it('should return true when all strings are not empty', () => {
      expect(notEmpty('a', 'b', 'c')).toBe(true)
      expect(notEmpty('test')).toBe(true)
      expect(notEmpty('  text  ', '  more  ')).toBe(true)
    })

    it('should return false when any string is empty', () => {
      expect(notEmpty('a', '', 'c')).toBe(false)
      expect(notEmpty('')).toBe(false)
      expect(notEmpty('   ', 'text')).toBe(false)
      expect(notEmpty('a', 'b', '   ')).toBe(false)
    })
  })

  describe('arrayHasItems', () => {
    it('should return null when array has checked items', () => {
      const items = [
        { title: 'Item 1', value: '1', checked: true },
        { title: 'Item 2', value: '2', checked: false },
      ]
      expect(arrayHasItems(items)).toBeNull()
    })

    it('should return error when no items are checked', () => {
      const items = [
        { title: 'Item 1', value: '1', checked: false },
        { title: 'Item 2', value: '2', checked: false },
      ]
      expect(arrayHasItems(items)).toBe('Angiv venligst et valg')
    })

    it('should return error for empty array', () => {
      expect(arrayHasItems([])).toBe('Angiv venligst et valg')
    })

    it('should return error for non-array input', () => {
      expect(arrayHasItems('not an array')).toBe('Ukendt indhold')
      expect(arrayHasItems(null)).toBe('Ukendt indhold')
      expect(arrayHasItems(undefined)).toBe('Ukendt indhold')
    })
  })
})
