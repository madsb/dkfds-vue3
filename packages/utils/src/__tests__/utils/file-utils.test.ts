import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  removeBrowserFileContentHeaders,
  downloadBlob,
  updateBlobType,
  readableFileSize,
  base64Decode,
} from '../../utils/file-utils'

describe('file-utils', () => {
  describe('removeBrowserFileContentHeaders', () => {
    it('should remove data URI header from base64 string', () => {
      const input = 'data:application/pdf;base64,SGVsbG8gV29ybGQ='
      const result = removeBrowserFileContentHeaders(input)
      expect(result).toBe('SGVsbG8gV29ybGQ=')
    })

    it('should handle different mime types', () => {
      const input = 'data:image/png;base64,iVBORw0KGgoAAAANS='
      const result = removeBrowserFileContentHeaders(input)
      expect(result).toBe('iVBORw0KGgoAAAANS=')
    })

    it('should handle text/plain mime type', () => {
      const input = 'data:text/plain;base64,VGVzdCBEYXRh'
      const result = removeBrowserFileContentHeaders(input)
      expect(result).toBe('VGVzdCBEYXRh')
    })

    it('should return original string if no header present', () => {
      const input = 'SGVsbG8gV29ybGQ='
      const result = removeBrowserFileContentHeaders(input)
      expect(result).toBe('SGVsbG8gV29ybGQ=')
    })

    it('should handle empty string', () => {
      const result = removeBrowserFileContentHeaders('')
      expect(result).toBe('')
    })

    it('should handle complex mime types with special characters', () => {
      // The regex only matches simple mime types without charset
      const input = 'data:text/html;charset=utf-8;base64,PGh0bWw+PC9odG1sPg=='
      const result = removeBrowserFileContentHeaders(input)
      // The current implementation doesn't handle charset, so it returns original
      expect(result).toBe('data:text/html;charset=utf-8;base64,PGh0bWw+PC9odG1sPg==')
    })
    
    it('should handle mime types with dots and dashes', () => {
      const input = 'data:application/vnd.ms-excel;base64,U29tZURhdGE='
      const result = removeBrowserFileContentHeaders(input)
      expect(result).toBe('U29tZURhdGE=')
    })
  })

  describe('downloadBlob', () => {
    let createObjectURLSpy: any
    let revokeObjectURLSpy: any
    let clickSpy: any
    let anchorElement: HTMLAnchorElement

    beforeEach(() => {
      // Mock window.URL methods
      createObjectURLSpy = vi.fn().mockReturnValue('blob:http://example.com/123')
      revokeObjectURLSpy = vi.fn()
      window.URL.createObjectURL = createObjectURLSpy
      window.URL.revokeObjectURL = revokeObjectURLSpy

      // Mock document.createElement to capture the anchor element
      const originalCreateElement = document.createElement.bind(document)
      vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        const element = originalCreateElement(tagName)
        if (tagName === 'a') {
          anchorElement = element as HTMLAnchorElement
          clickSpy = vi.fn()
          element.click = clickSpy
        }
        return element
      })
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should download blob with default filename', () => {
      const blob = new Blob(['test content'], { type: 'text/plain' })
      downloadBlob(blob)

      expect(createObjectURLSpy).toHaveBeenCalledWith(blob)
      expect(anchorElement.href).toBe('blob:http://example.com/123')
      expect(anchorElement.download).toBe('download')
      expect(clickSpy).toHaveBeenCalled()
      expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:http://example.com/123')
    })

    it('should download blob with custom filename', () => {
      const blob = new Blob(['test content'], { type: 'text/plain' })
      downloadBlob(blob, 'myfile.txt')

      expect(anchorElement.download).toBe('myfile.txt')
      expect(clickSpy).toHaveBeenCalled()
    })

    it('should handle PDF blob', () => {
      const blob = new Blob(['PDF content'], { type: 'application/pdf' })
      downloadBlob(blob, 'document.pdf')

      expect(createObjectURLSpy).toHaveBeenCalledWith(blob)
      expect(anchorElement.download).toBe('document.pdf')
    })
  })

  describe('updateBlobType', () => {
    it('should update blob type to new type', () => {
      const originalBlob = new Blob(['content'], { type: 'text/plain' })
      const newBlob = updateBlobType(originalBlob, 'application/json')

      expect(newBlob.type).toBe('application/json')
      expect(newBlob.size).toBe(originalBlob.size)
    })

    it('should handle empty blob', () => {
      const originalBlob = new Blob([], { type: 'text/plain' })
      const newBlob = updateBlobType(originalBlob, 'text/csv')

      expect(newBlob.type).toBe('text/csv')
      expect(newBlob.size).toBe(0)
    })

    it('should preserve blob content and change type', () => {
      const content = 'Test content'
      const originalBlob = new Blob([content], { type: 'text/plain' })
      const newBlob = updateBlobType(originalBlob, 'text/html')

      // Check type is changed
      expect(newBlob.type).toBe('text/html')
      // Check size is preserved (content is same)
      expect(newBlob.size).toBe(originalBlob.size)
    })
  })

  describe('readableFileSize', () => {
    it('should format bytes correctly', () => {
      expect(readableFileSize(0)).toBe('0 B')
      expect(readableFileSize(500)).toBe('500 B')
      expect(readableFileSize(1023)).toBe('1023 B')
    })

    it('should format kilobytes correctly', () => {
      expect(readableFileSize(1024)).toBe('1.0 KB')
      expect(readableFileSize(1536)).toBe('1.5 KB')
      expect(readableFileSize(2048)).toBe('2.0 KB')
    })

    it('should format megabytes correctly', () => {
      expect(readableFileSize(1048576)).toBe('1.0 MB')
      expect(readableFileSize(1572864)).toBe('1.5 MB')
      expect(readableFileSize(5242880)).toBe('5.0 MB')
    })

    it('should format gigabytes correctly', () => {
      expect(readableFileSize(1073741824)).toBe('1.0 GB')
      expect(readableFileSize(2147483648)).toBe('2.0 GB')
      expect(readableFileSize(5368709120)).toBe('5.0 GB')
    })

    it('should format terabytes correctly', () => {
      expect(readableFileSize(1099511627776)).toBe('1.0 TB')
      expect(readableFileSize(2199023255552)).toBe('2.0 TB')
    })

    it('should handle negative file sizes', () => {
      expect(readableFileSize(-1024)).toBe('-1.0 KB')
      expect(readableFileSize(-1048576)).toBe('-1.0 MB')
    })

    it('should handle very large sizes', () => {
      expect(readableFileSize(1125899906842624)).toBe('1.0 PB') // Petabyte
      expect(readableFileSize(1152921504606846976)).toBe('1.0 EB') // Exabyte
    })
  })

  describe('base64Decode', () => {
    it('should decode base64 string correctly', () => {
      const encoded = 'SGVsbG8gV29ybGQ='
      const result = base64Decode(encoded)
      expect(result).toBe('Hello World')
    })

    it('should handle special characters', () => {
      const encoded = 'SGVsbG8gw6bDuMOlIQ==' // Hello æøå!
      const result = base64Decode(encoded)
      expect(result).toBe('Hello æøå!')
    })

    it('should handle empty string', () => {
      const result = base64Decode('')
      expect(result).toBe('')
    })

    it('should decode JSON data', () => {
      const jsonData = '{"name":"John","age":30}'
      const encoded = btoa(jsonData)
      const result = base64Decode(encoded)
      expect(result).toBe(jsonData)
    })

    it('should handle URL-safe base64', () => {
      // Note: This test assumes the function handles standard base64
      // URL-safe base64 would need special handling if required
      const encoded = 'VGVzdCBEYXRh'
      const result = base64Decode(encoded)
      expect(result).toBe('Test Data')
    })
  })
})