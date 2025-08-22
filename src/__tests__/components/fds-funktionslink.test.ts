import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsFunktionslink from '../../components/layout/fds-funktionslink.vue'
import { testAccessibility } from '../../test-utils'

describe('FdsFunktionslink', () => {
  describe('Rendering', () => {
    it('renders as button by default when no href provided', () => {
      const wrapper = mount(FdsFunktionslink)
      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.attributes('type')).toBe('button')
    })

    it('renders as link when href is provided', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { href: 'https://example.com' },
      })
      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('https://example.com')
    })

    it('renders with correct DKFDS class', () => {
      const wrapper = mount(FdsFunktionslink)
      expect(wrapper.classes()).toContain('function-link')
    })

    it('renders slot content', () => {
      const wrapper = mount(FdsFunktionslink, {
        slots: {
          default: 'Print denne side',
        },
      })
      expect(wrapper.text()).toBe('Print denne side')
    })

    it('renders icon when provided', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { icon: 'print' },
      })
      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
      expect(svg.classes()).toContain('icon-svg')
      expect(svg.find('use').attributes('href')).toBe('#print')
    })

    it('does not render icon when not provided', () => {
      const wrapper = mount(FdsFunktionslink)
      expect(wrapper.find('svg').exists()).toBe(false)
    })

    it('renders icon with correct accessibility attributes', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { icon: 'download' },
      })
      const svg = wrapper.find('svg')
      expect(svg.attributes('focusable')).toBe('false')
      expect(svg.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('Props', () => {
    describe('type prop', () => {
      it('forces button element when type="button"', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: {
            type: 'button',
            href: 'https://example.com', // Should be ignored
          },
        })
        expect(wrapper.element.tagName).toBe('BUTTON')
        expect(wrapper.attributes('href')).toBeUndefined()
      })

      it('forces link element when type="link"', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { type: 'link' },
        })
        expect(wrapper.element.tagName).toBe('A')
      })
    })

    describe('href prop', () => {
      it('auto-detects link element when href is provided', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { href: '/page' },
        })
        expect(wrapper.element.tagName).toBe('A')
        expect(wrapper.attributes('href')).toBe('/page')
      })

      it('handles empty href', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { href: '' },
        })
        expect(wrapper.element.tagName).toBe('BUTTON')
      })
    })

    describe('title prop', () => {
      it('adds title attribute when provided', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { title: 'Klik for at printe' },
        })
        expect(wrapper.attributes('title')).toBe('Klik for at printe')
      })

      it('omits title attribute when not provided', () => {
        const wrapper = mount(FdsFunktionslink)
        expect(wrapper.attributes('title')).toBeUndefined()
      })
    })

    describe('disabled prop', () => {
      it('applies disabled attribute to button', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { disabled: true },
        })
        expect(wrapper.element.tagName).toBe('BUTTON')
        expect(wrapper.attributes('disabled')).toBeDefined()
      })

      it('does not apply disabled to link elements', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: {
            href: 'https://example.com',
            disabled: true,
          },
        })
        expect(wrapper.element.tagName).toBe('A')
        expect(wrapper.attributes('disabled')).toBeUndefined()
      })
    })

    describe('target prop', () => {
      it('applies target attribute to links', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: {
            href: 'https://example.com',
            target: '_blank',
          },
        })
        expect(wrapper.attributes('target')).toBe('_blank')
      })

      it('does not apply target to button elements', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { target: '_blank' },
        })
        expect(wrapper.element.tagName).toBe('BUTTON')
        expect(wrapper.attributes('target')).toBeUndefined()
      })
    })

    describe('rel prop', () => {
      it('applies rel attribute to links', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: {
            href: 'https://example.com',
            rel: 'noopener noreferrer',
          },
        })
        expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
      })

      it('does not apply rel to button elements', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { rel: 'noopener' },
        })
        expect(wrapper.element.tagName).toBe('BUTTON')
        expect(wrapper.attributes('rel')).toBeUndefined()
      })
    })

    describe('icon prop', () => {
      it('supports various DKFDS icons', () => {
        const icons = ['print', 'download', 'save', 'delete', 'close']
        icons.forEach((icon) => {
          const wrapper = mount(FdsFunktionslink, {
            props: { icon },
          })
          expect(wrapper.find('use').attributes('href')).toBe(`#${icon}`)
        })
      })
    })

    describe('iconRight prop', () => {
      it('defaults to false', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { icon: 'print' },
          slots: { default: 'Print' },
        })
        const html = wrapper.html()
        const iconIndex = html.indexOf('<svg')
        const textIndex = html.indexOf('Print')
        expect(iconIndex).toBeLessThan(textIndex)
      })

      it('positions icon after text when true', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { icon: 'print', iconRight: true },
          slots: { default: 'Print' },
        })
        const html = wrapper.html()
        const iconIndex = html.indexOf('<svg')
        const textIndex = html.indexOf('Print')
        expect(textIndex).toBeLessThan(iconIndex)
      })

      it('renders only one icon when iconRight is specified', () => {
        const wrapper = mount(FdsFunktionslink, {
          props: { icon: 'save', iconRight: true },
          slots: { default: 'Save' },
        })
        const svgs = wrapper.findAll('svg')
        expect(svgs.length).toBe(1)
      })
    })
  })

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(FdsFunktionslink)
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.[0][0]).toBeInstanceOf(MouseEvent)
    })

    it('prevents default for button elements without href', async () => {
      const wrapper = mount(FdsFunktionslink)
      const event = new MouseEvent('click')
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      await wrapper.element.dispatchEvent(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('does not prevent default for links with href', async () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { href: 'https://example.com' },
      })
      const event = new MouseEvent('click')
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      await wrapper.element.dispatchEvent(event)

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('handles click on disabled button', async () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { disabled: true },
      })
      await wrapper.trigger('click')
      // Disabled buttons don't emit click events
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsFunktionslink, {
        slots: {
          default: 'Gem kladde',
        },
      })
      expect(wrapper.text()).toBe('Gem kladde')
    })

    it('renders complex slot content', () => {
      const wrapper = mount(FdsFunktionslink, {
        slots: {
          default: '<span>Download <strong>PDF</strong></span>',
        },
      })
      expect(wrapper.find('span').exists()).toBe(true)
      expect(wrapper.find('strong').text()).toBe('PDF')
    })

    it('renders icon before slot content by default', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { icon: 'print' },
        slots: {
          default: 'Print',
        },
      })
      const html = wrapper.html()
      const iconIndex = html.indexOf('<svg')
      const textIndex = html.indexOf('Print')
      expect(iconIndex).toBeLessThan(textIndex)
    })

    it('renders icon after slot content when iconRight is true', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { icon: 'print', iconRight: true },
        slots: {
          default: 'Print',
        },
      })
      const html = wrapper.html()
      const iconIndex = html.indexOf('<svg')
      const textIndex = html.indexOf('Print')
      expect(textIndex).toBeLessThan(iconIndex)
    })
  })

  describe('Accessibility', () => {
    it('button has correct type attribute', () => {
      const wrapper = mount(FdsFunktionslink)
      expect(wrapper.attributes('type')).toBe('button')
    })

    it('link is keyboard accessible', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { href: 'https://example.com' },
      })
      // Links are naturally keyboard accessible
      expect(wrapper.element.tagName).toBe('A')
    })

    it('respects title attribute for screen readers', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: {
          icon: 'print',
          title: 'Print denne side',
        },
        slots: {
          default: 'Print',
        },
      })
      expect(wrapper.attributes('title')).toBe('Print denne side')
    })

    it('icon is hidden from screen readers', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { icon: 'download' },
      })
      const svg = wrapper.find('svg')
      expect(svg.attributes('aria-hidden')).toBe('true')
      expect(svg.attributes('focusable')).toBe('false')
    })

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsFunktionslink href="https://example.com" icon="print">
              Print denne side
            </FdsFunktionslink>
          </main>
        `,
        components: { FdsFunktionslink },
      }

      await testAccessibility(TestWrapper)
    })
  })

  describe('Edge Cases', () => {
    it('handles missing props gracefully', () => {
      const wrapper = mount(FdsFunktionslink)
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('handles empty slots', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: { icon: 'save' },
      })
      expect(wrapper.text()).toBe('')
      expect(wrapper.find('svg').exists()).toBe(true)
    })

    it('handles all target values', () => {
      const targets: Array<'_blank' | '_self' | '_parent' | '_top'> = [
        '_blank',
        '_self',
        '_parent',
        '_top',
      ]
      targets.forEach((target) => {
        const wrapper = mount(FdsFunktionslink, {
          props: {
            href: 'https://example.com',
            target,
          },
        })
        expect(wrapper.attributes('target')).toBe(target)
      })
    })

    it('handles type override with href', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: {
          type: 'button',
          href: 'https://example.com',
        },
      })
      // Type prop takes precedence
      expect(wrapper.element.tagName).toBe('BUTTON')
      expect(wrapper.attributes('href')).toBeUndefined()
    })
  })

  describe('Integration', () => {
    it('works as print function', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: {
          icon: 'print',
          title: 'Print denne side',
        },
        slots: {
          default: 'Print',
        },
      })
      expect(wrapper.find('svg use').attributes('href')).toBe('#print')
      expect(wrapper.text()).toBe('Print')
      expect(wrapper.attributes('title')).toBe('Print denne side')
    })

    it('works as download link', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: {
          href: '/download/document.pdf',
          icon: 'download',
          title: 'Download PDF',
        },
        slots: {
          default: 'Download',
        },
      })
      expect(wrapper.element.tagName).toBe('A')
      expect(wrapper.attributes('href')).toBe('/download/document.pdf')
      expect(wrapper.find('svg use').attributes('href')).toBe('#download')
    })

    it('works as save draft button', async () => {
      const handleSave = vi.fn()
      const wrapper = mount(FdsFunktionslink, {
        props: {
          icon: 'save',
          title: 'Gem kladde',
        },
        slots: {
          default: 'Gem kladde',
        },
        attrs: {
          onClick: handleSave,
        },
      })

      await wrapper.trigger('click')
      expect(handleSave).toHaveBeenCalled()
    })

    it('works as external link with target blank', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: {
          href: 'https://external.com',
          target: '_blank',
          rel: 'noopener noreferrer',
          icon: 'open-in-new',
        },
        slots: {
          default: 'Åbn i nyt vindue',
        },
      })
      expect(wrapper.attributes('target')).toBe('_blank')
      expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
    })

    it('works with icon positioned on the right', () => {
      const wrapper = mount(FdsFunktionslink, {
        props: {
          icon: 'arrow-right',
          iconRight: true,
          title: 'Gå videre',
        },
        slots: {
          default: 'Næste',
        },
      })
      const html = wrapper.html()
      const textIndex = html.indexOf('Næste')
      const iconIndex = html.indexOf('<svg')
      expect(textIndex).toBeLessThan(iconIndex)
      expect(wrapper.find('svg use').attributes('href')).toBe('#arrow-right')
    })
  })
})
