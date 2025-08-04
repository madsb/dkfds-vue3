import { vi } from 'vitest';

// Setup for utility tests (no DOM required)
// Add any global mocks or configurations needed for utility testing

// Mock crypto for uuid tests if needed
if (!globalThis.crypto) {
  globalThis.crypto = {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
  } as Crypto;
}