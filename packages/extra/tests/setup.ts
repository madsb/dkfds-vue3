import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import { expect } from 'vitest';

// Extend Vitest matchers with axe matchers
expect.extend(matchers);

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

// Configure Vue Test Utils
config.global.stubs = {
  transition: false,
  'transition-group': false,
};

// Add any global test utilities
declare global {
  function flushPromises(): Promise<void>;
}

globalThis.flushPromises = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};