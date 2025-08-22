import { mount, type MountingOptions } from '@vue/test-utils'

/**
 * Test component for accessibility violations using axe
 */
export async function testAccessibility(component: any, options?: MountingOptions<any>) {
  const { axe } = await import('vitest-axe')
  const wrapper = mount(component, options)
  const results = await axe(wrapper.element)
  
  expect(results).toHaveNoViolations()
  
  return wrapper
}