import { mount, VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'

export interface MountOptions {
  props?: Record<string, any>
  slots?: Record<string, any>
  global?: {
    stubs?: Record<string, any>
    provide?: Record<string, any>
  }
}

export function mountComponent<T extends ComponentPublicInstance>(
  component: any,
  options: MountOptions = {}
): VueWrapper<T> {
  return mount(component, {
    ...options,
    global: {
      ...options.global,
      stubs: {
        transition: false,
        ...options.global?.stubs
      }
    }
  }) as VueWrapper<T>
}

export async function waitForAsync(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0))
}

export function findByTestId(wrapper: VueWrapper, testId: string) {
  return wrapper.find(`[data-testid="${testId}"]`)
}

export function findAllByTestId(wrapper: VueWrapper, testId: string) {
  return wrapper.findAll(`[data-testid="${testId}"]`)
}

export async function triggerClick(wrapper: VueWrapper, selector: string) {
  await wrapper.find(selector).trigger('click')
  await wrapper.vm.$nextTick()
}

export async function setInputValue(wrapper: VueWrapper, selector: string, value: string) {
  const input = wrapper.find(selector)
  await input.setValue(value)
  await wrapper.vm.$nextTick()
}

export function hasClass(element: VueWrapper | any, className: string): boolean {
  return element.classes().includes(className)
}

export function expectEmit(wrapper: VueWrapper, eventName: string, payload?: any) {
  const emitted = wrapper.emitted(eventName)
  expect(emitted).toBeTruthy()
  if (payload !== undefined && emitted) {
    expect(emitted[0]).toEqual([payload])
  }
}

export function expectNoEmit(wrapper: VueWrapper, eventName: string) {
  const emitted = wrapper.emitted(eventName)
  expect(emitted).toBeFalsy()
}