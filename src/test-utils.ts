import { mount, type MountingOptions } from '@vue/test-utils'
import { expect } from 'vitest'
import 'vitest-axe/extend-expect'

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
