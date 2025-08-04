import { mount, VueWrapper, MountingOptions, flushPromises } from '@vue/test-utils';
import { vi } from 'vitest';

// Re-export commonly used utilities that tests actually use
export { mount, VueWrapper, flushPromises } from '@vue/test-utils';
export { vi } from 'vitest';

/**
 * Mount a Vue component with transition stubs for better test performance
 * Only use this if your component has transitions that slow down tests
 */
export function mountComponent<T>(
  component: any,
  options: MountingOptions<any> = {}
): VueWrapper<T> {
  return mount(component, {
    ...options,
    global: {
      ...options.global,
      stubs: {
        transition: false,
        'transition-group': false,
        ...options.global?.stubs,
      },
    },
  });
}

/**
 * Test component accessibility with axe
 * Useful for ensuring DKFDS components meet accessibility standards
 */
export async function testAccessibility(component: any, options?: MountingOptions<any>) {
  const { axe } = await import('vitest-axe');
  const wrapper = mount(component, options);
  const results = await axe(wrapper.element);
  
  expect(results).toHaveNoViolations();
  
  return wrapper;
}