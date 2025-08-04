import { mount, VueWrapper, MountingOptions } from '@vue/test-utils';
import { render, RenderOptions } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { ComponentPublicInstance } from 'vue';

export { mount, VueWrapper } from '@vue/test-utils';
export { render, screen, waitFor, fireEvent } from '@testing-library/vue';
export { userEvent };

// Helper to mount component with common defaults
export function mountComponent<T extends ComponentPublicInstance>(
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

// Helper to render component with Testing Library
export function renderComponent(
  component: any,
  options: RenderOptions = {}
) {
  const user = userEvent.setup();
  const result = render(component, options);
  
  return {
    ...result,
    user,
  };
}

// Helper to test component slots
export async function testSlot(
  component: any,
  slotName: string,
  slotContent: string,
  expectedSelector?: string
) {
  const wrapper = mountComponent(component, {
    slots: {
      [slotName]: slotContent,
    },
  });

  const target = expectedSelector ? wrapper.find(expectedSelector) : wrapper;
  expect(target.text()).toContain(slotContent);
  
  return wrapper;
}

// Helper to test component props
export async function testProp(
  component: any,
  propName: string,
  propValue: any,
  assertion: (wrapper: VueWrapper) => void | Promise<void>
) {
  const wrapper = mountComponent(component, {
    props: {
      [propName]: propValue,
    },
  });

  await assertion(wrapper);
  
  return wrapper;
}

// Helper to test emitted events
export async function testEvent(
  component: any,
  triggerAction: (wrapper: VueWrapper) => void | Promise<void>,
  eventName: string,
  expectedPayload?: any
) {
  const wrapper = mountComponent(component);
  
  await triggerAction(wrapper);
  
  expect(wrapper.emitted()).toHaveProperty(eventName);
  
  if (expectedPayload !== undefined) {
    expect(wrapper.emitted()[eventName]?.[0]).toEqual([expectedPayload]);
  }
  
  return wrapper;
}

// Helper to wait for next tick
export function nextTick() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

// Helper to create mock functions with vi
export { vi } from 'vitest';