import { config } from '@vue/test-utils';
import { vi } from 'vitest';
import * as matchers from 'vitest-axe/matchers';
import { expect } from 'vitest';

// Extend Vitest matchers with axe matchers for accessibility testing
expect.extend(matchers);

// Mock window.matchMedia - commonly needed for responsive components
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

// Mock IntersectionObserver - needed for components that use visibility detection
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

// Mock ResizeObserver - needed for components that respond to size changes
class ResizeObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserverMock,
});

// Mock HTMLDialogElement methods - not supported in jsdom
if (typeof HTMLDialogElement !== 'undefined') {
  HTMLDialogElement.prototype.showModal = vi.fn(function(this: HTMLDialogElement) {
    this.open = true;
  });
  
  HTMLDialogElement.prototype.close = vi.fn(function(this: HTMLDialogElement) {
    this.open = false;
  });
}

// Configure Vue Test Utils global settings
config.global.stubs = {
  // Stub out transitions for faster tests
  transition: false,
  'transition-group': false,
};

// Add global test utilities
declare global {
  function flushPromises(): Promise<void>;
}

// Utility to flush all pending promises
globalThis.flushPromises = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
};