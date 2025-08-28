import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsCard from '../../components/data-display/fds-card.vue'
import { testAccessibility } from '../../test-utils'

// Mock RouterLink component for Vue Router tests
import { h } from 'vue'

const MockRouterLink = {
  name: 'RouterLink',
  props: ['to'],
  inheritAttrs: false,
  setup(props: any, { attrs, slots }: any) {
    return () =>
      h(
        'a',
        {
          ...attrs,
          href: props.to,
        },
        slots.default ? slots.default() : [],
      )
  },
}

describe('FdsCard', () => {
  describe('Rendering', () => {
    it('renders as section element by default', () => {
      const wrapper = mount(FdsCard)

      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.find('section').classes()).toContain('card')
      expect(wrapper.find('a').exists()).toBe(false)
    })

    it('renders as anchor element when to is provided', () => {
      const wrapper = mount(FdsCard, {
        props: { to: 'https://example.com' },
      })

      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
      expect(wrapper.find('a').classes()).toContain('card')
      expect(wrapper.find('section').exists()).toBe(false)
    })

    it('renders card content wrapper', () => {
      const wrapper = mount(FdsCard)

      expect(wrapper.find('.card-content').exists()).toBe(true)
    })

    it('applies long variant class when specified', () => {
      const wrapper = mount(FdsCard, {
        props: { variant: 'long' },
      })

      expect(wrapper.find('.card').classes()).toContain('long')
    })
  })

  describe('Props', () => {
    it('applies default arrow-forward icon for internal navigation cards', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '/internal-page',
          header: 'Internal Link',
        },
      })

      const icon = wrapper.find('.card-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.find('use').attributes('href')).toBe('#arrow-forward')
    })

    it('applies default open-in-new icon for external links', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: 'https://example.com',
          header: 'External Link',
        },
      })

      const icon = wrapper.find('.card-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.find('use').attributes('href')).toBe('#open-in-new')
    })

    it('applies open-in-new icon when external prop is true', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '/page',
          external: true,
          header: 'External Link',
        },
      })

      const icon = wrapper.find('.card-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.find('use').attributes('href')).toBe('#open-in-new')
    })

    it('allows icon prop to override default icons', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: 'https://example.com',
          icon: 'download',
          header: 'Download Link',
        },
      })

      const icon = wrapper.find('.card-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.find('use').attributes('href')).toBe('#download')
    })

    it('shows no icon for regular cards without explicit icon prop', () => {
      const wrapper = mount(FdsCard, {
        props: {
          header: 'Regular Card',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(false)
    })

    it('renders header with default h2 tag', () => {
      const wrapper = mount(FdsCard, {
        props: { header: 'Card Title' },
      })

      const heading = wrapper.find('.card-heading')
      expect(heading.exists()).toBe(true)
      expect(heading.element.tagName).toBe('H2')
      expect(heading.text()).toBe('Card Title')
    })

    it('renders header with custom tag', () => {
      const wrapper = mount(FdsCard, {
        props: {
          header: 'Card Title',
          headerTag: 'h3',
        },
      })

      const heading = wrapper.find('.card-heading')
      expect(heading.element.tagName).toBe('H3')
    })

    it('renders subheader when provided', () => {
      const wrapper = mount(FdsCard, {
        props: { subheader: 'Card Subtitle' },
      })

      const subheading = wrapper.find('.card-subheading')
      expect(subheading.exists()).toBe(true)
      expect(subheading.text()).toBe('Card Subtitle')
    })

    it('renders explicit icon for navigation cards', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '/page',
          icon: 'chevron-right',
        },
      })

      const icon = wrapper.find('.card-icon')
      expect(icon.exists()).toBe(true)
      expect(icon.find('use').attributes('href')).toBe('#chevron-right')
      expect(icon.attributes('focusable')).toBe('false')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('ignores icon prop without to prop', () => {
      const wrapper = mount(FdsCard, {
        props: { icon: 'arrow-forward' },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(false)
    })

    it('accepts all header tag variants', () => {
      const tags = ['h2', 'h3', 'h4', 'h5', 'h6'] as const

      tags.forEach((tag) => {
        const wrapper = mount(FdsCard, {
          props: {
            header: 'Title',
            headerTag: tag,
          },
        })

        expect(wrapper.find('.card-heading').element.tagName).toBe(tag.toUpperCase())
      })
    })
  })

  describe('Slots', () => {
    it('renders header slot', () => {
      const wrapper = mount(FdsCard, {
        slots: {
          header: '<h3 class="custom-header">Custom Header</h3>',
        },
      })

      expect(wrapper.find('.custom-header').exists()).toBe(true)
      expect(wrapper.find('.card-heading').exists()).toBe(false)
    })

    it('renders content slot', () => {
      const wrapper = mount(FdsCard, {
        slots: {
          content: '<p class="card-description">Card description text</p>',
        },
      })

      expect(wrapper.find('.card-description').exists()).toBe(true)
      expect(wrapper.find('.card-description').text()).toBe('Card description text')
    })

    it('renders default slot', () => {
      const wrapper = mount(FdsCard, {
        slots: {
          default: '<p>Default slot content</p>',
        },
      })

      expect(wrapper.find('p').exists()).toBe(true)
      expect(wrapper.find('p').text()).toBe('Default slot content')
    })

    it('renders image slot', () => {
      const wrapper = mount(FdsCard, {
        slots: {
          image: '<img src="test.jpg" alt="Test image" />',
        },
      })

      const imageWrapper = wrapper.find('.card-image')
      expect(imageWrapper.exists()).toBe(true)
      expect(imageWrapper.find('img').exists()).toBe(true)
      expect(imageWrapper.find('img').attributes('src')).toBe('test.jpg')
    })

    it('renders actions slot only for regular cards', () => {
      const actionsSlot = '<button>Action</button>'

      // Regular card - should render actions
      const regularCard = mount(FdsCard, {
        slots: {
          actions: actionsSlot,
        },
      })

      expect(regularCard.find('.card-actions').exists()).toBe(true)
      expect(regularCard.find('.card-actions button').exists()).toBe(true)

      // Navigation card - should not render actions
      const navCard = mount(FdsCard, {
        props: { to: '/page' },
        slots: {
          actions: actionsSlot,
        },
      })

      expect(navCard.find('.card-actions').exists()).toBe(false)
    })

    it('renders multiple slots together', () => {
      const wrapper = mount(FdsCard, {
        props: {
          header: 'Card Title',
          subheader: 'Subtitle',
        },
        slots: {
          image: '<img src="test.jpg" alt="Test" />',
          content: '<p>Content</p>',
          default: '<span>Extra info</span>',
          actions: '<button>Click me</button>',
        },
      })

      expect(wrapper.find('.card-image').exists()).toBe(true)
      expect(wrapper.find('.card-heading').text()).toBe('Card Title')
      expect(wrapper.find('.card-subheading').text()).toBe('Subtitle')
      expect(wrapper.find('p').text()).toBe('Content')
      // Default slot content is just text, not wrapped in span
      expect(wrapper.find('.card-content').text()).toContain('Extra info')
      expect(wrapper.find('.card-actions button').text()).toBe('Click me')
    })
  })

  describe('Accessibility', () => {
    it('maintains semantic structure for regular cards', () => {
      const wrapper = mount(FdsCard, {
        props: { header: 'Card Title' },
      })

      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(true)
    })

    it('maintains semantic structure for navigation cards', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '/page',
          header: 'Link Card',
        },
      })

      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.find('a h2').exists()).toBe(true)
    })

    it('sets proper ARIA attributes on icons', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '/page',
          icon: 'arrow-forward',
        },
      })

      const icon = wrapper.find('.card-icon')
      expect(icon.attributes('focusable')).toBe('false')
      expect(icon.attributes('aria-hidden')).toBe('true')
    })

    it('passes accessibility tests', async () => {
      // Wrap in main landmark to satisfy axe region rule
      const TestWrapper = {
        template: `
          <main>
            <FdsCard 
              header="Accessible Card"
              subheader="With subtitle"
              href="/page"
            >
              <template #content>
                <p>Card content description</p>
              </template>
            </FdsCard>
          </main>
        `,
        components: { FdsCard },
      }

      await testAccessibility(TestWrapper)
    })

    it('supports ARIA attributes passthrough', () => {
      const wrapper = mount(FdsCard, {
        attrs: {
          'aria-label': 'Featured article',
          'aria-describedby': 'card-description',
        },
      })

      const card = wrapper.find('.card')
      expect(card.attributes('aria-label')).toBe('Featured article')
      expect(card.attributes('aria-describedby')).toBe('card-description')
    })
  })

  describe('Edge Cases', () => {
    it('handles null props gracefully', () => {
      const wrapper = mount(FdsCard, {
        props: {
          header: null,
          subheader: null,
          href: null,
          icon: null,
          variant: null,
        },
      })

      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.find('.card-heading').exists()).toBe(false)
      expect(wrapper.find('.card-subheading').exists()).toBe(false)
      expect(wrapper.find('a').exists()).toBe(false)
      expect(wrapper.find('.card-icon').exists()).toBe(false)
      expect(wrapper.find('.card').classes()).not.toContain('long')
    })

    it('renders without any props or slots', () => {
      const wrapper = mount(FdsCard)

      expect(wrapper.find('.card').exists()).toBe(true)
      expect(wrapper.find('.card-content').exists()).toBe(true)
      expect(wrapper.text()).toBe('')
    })

    it('handles empty string props', () => {
      const wrapper = mount(FdsCard, {
        props: {
          header: '',
          subheader: '',
          href: '',
        },
      })

      // Empty strings should be treated as falsy
      expect(wrapper.find('.card-heading').exists()).toBe(false)
      expect(wrapper.find('.card-subheading').exists()).toBe(false)
      expect(wrapper.find('a').exists()).toBe(false)
    })

    it('prioritizes header slot over header prop', () => {
      const wrapper = mount(FdsCard, {
        props: { header: 'Prop Header' },
        slots: {
          header: '<h3>Slot Header</h3>',
        },
      })

      expect(wrapper.find('h3').text()).toBe('Slot Header')
      expect(wrapper.text()).not.toContain('Prop Header')
    })
  })

  describe('Integration Scenarios', () => {
    it('works as article card with full content', () => {
      const wrapper = mount(FdsCard, {
        props: {
          header: 'Article Title',
          subheader: 'Published today',
          headerTag: 'h3',
        },
        slots: {
          image: '<img src="article.jpg" alt="Article image" />',
          content: '<p>Article excerpt goes here...</p>',
          actions: '<a href="/read-more">Read more</a>',
        },
      })

      expect(wrapper.find('.card-image img').exists()).toBe(true)
      expect(wrapper.find('h3').text()).toBe('Article Title')
      expect(wrapper.find('.card-subheading').text()).toBe('Published today')
      expect(wrapper.find('p').text()).toBe('Article excerpt goes here...')
      expect(wrapper.find('.card-actions a').text()).toBe('Read more')
    })

    it('works as navigation card with icon', () => {
      const wrapper = mount(FdsCard, {
        props: {
          header: 'Go to Dashboard',
          to: '/dashboard',
          icon: 'arrow-forward',
        },
        slots: {
          content: '<p>Access your personal dashboard</p>',
        },
      })

      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe('/dashboard')
      expect(link.find('h2').text()).toBe('Go to Dashboard')
      expect(link.find('p').text()).toBe('Access your personal dashboard')
      expect(link.find('.card-icon use').attributes('href')).toBe('#arrow-forward')
    })

    it('works in a card grid layout', () => {
      const GridComponent = {
        template: `
          <div class="card-grid">
            <FdsCard 
              v-for="item in items" 
              :key="item.id"
              :header="item.title"
              :to="item.link"
              icon="arrow-forward"
            >
              <template #content>
                <p>{{ item.description }}</p>
              </template>
            </FdsCard>
          </div>
        `,
        components: { FdsCard },
        data() {
          return {
            items: [
              { id: 1, title: 'Service 1', description: 'Description 1', link: '/service-1' },
              { id: 2, title: 'Service 2', description: 'Description 2', link: '/service-2' },
              { id: 3, title: 'Service 3', description: 'Description 3', link: '/service-3' },
            ],
          }
        },
      }

      const wrapper = mount(GridComponent)
      const cards = wrapper.findAllComponents(FdsCard)

      expect(cards).toHaveLength(3)
      expect(cards[0].find('h2').text()).toBe('Service 1')
      expect(cards[1].find('h2').text()).toBe('Service 2')
      expect(cards[2].find('h2').text()).toBe('Service 3')

      cards.forEach((card, index) => {
        expect(card.find('a').attributes('href')).toBe(`/service-${index + 1}`)
        expect(card.find('.card-icon').exists()).toBe(true)
      })
    })

    it('supports external link with new tab icon', () => {
      const wrapper = mount(FdsCard, {
        props: {
          header: 'External Resource',
          to: 'https://external-site.com',
          icon: 'open-in-new',
        },
        attrs: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      })

      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe('https://external-site.com')
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
      expect(link.find('.card-icon use').attributes('href')).toBe('#open-in-new')
    })
  })

  describe('Attributes Passthrough', () => {
    it('passes through HTML attributes', () => {
      const wrapper = mount(FdsCard, {
        attrs: {
          id: 'featured-card',
          'data-testid': 'card-component',
          class: 'custom-class',
        },
      })

      const card = wrapper.find('.card')
      expect(card.attributes('id')).toBe('featured-card')
      expect(card.attributes('data-testid')).toBe('card-component')
      expect(card.classes()).toContain('card')
      expect(card.classes()).toContain('custom-class')
    })

    it('passes link attributes for navigation cards', () => {
      const wrapper = mount(FdsCard, {
        props: { to: '/page' },
        attrs: {
          target: '_blank',
          download: true,
          hreflang: 'en',
        },
      })

      const link = wrapper.find('a')
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('download')).toBeDefined()
      expect(link.attributes('hreflang')).toBe('en')
    })
  })

  describe('Vue Router Integration', () => {
    it('uses RouterLink when Vue Router is available', () => {
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      const wrapper = mount(FdsCard, {
        props: {
          to: '/dashboard',
          header: 'Dashboard',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
          stubs: {
            RouterLink: MockRouterLink,
          },
        },
      })

      const routerLink = wrapper.findComponent(MockRouterLink)
      expect(routerLink.exists()).toBe(true)
      expect(routerLink.props('to')).toBe('/dashboard')
    })

    it('falls back to anchor tag when Vue Router is not available', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '/dashboard',
          header: 'Dashboard',
        },
      })

      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.find('a').attributes('href')).toBe('/dashboard')
      expect(wrapper.findComponent(MockRouterLink).exists()).toBe(false)
    })

    it('uses anchor tag when external prop is true even with Vue Router', () => {
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      const wrapper = mount(FdsCard, {
        props: {
          to: 'https://external-site.com',
          external: true,
          header: 'External Link',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })

      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.find('a').attributes('href')).toBe('https://external-site.com')
      expect(wrapper.findComponent(MockRouterLink).exists()).toBe(false)
    })

    it('detects external URLs automatically', () => {
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      // Test http:// URL
      const httpWrapper = mount(FdsCard, {
        props: {
          to: 'http://example.com',
          header: 'HTTP External',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })
      expect(httpWrapper.find('a').exists()).toBe(true)
      expect(httpWrapper.find('a').attributes('href')).toBe('http://example.com')

      // Test https:// URL
      const httpsWrapper = mount(FdsCard, {
        props: {
          to: 'https://example.com',
          header: 'HTTPS External',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })
      expect(httpsWrapper.find('a').exists()).toBe(true)
      expect(httpsWrapper.find('a').attributes('href')).toBe('https://example.com')

      // Test domain without protocol
      const domainWrapper = mount(FdsCard, {
        props: {
          to: 'example.com',
          header: 'Domain External',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })
      expect(domainWrapper.find('a').exists()).toBe(true)
      expect(domainWrapper.find('a').attributes('href')).toBe('example.com')

      // Test protocol-relative URL
      const protocolRelativeWrapper = mount(FdsCard, {
        props: {
          to: '//example.com',
          header: 'Protocol Relative',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })
      expect(protocolRelativeWrapper.find('a').exists()).toBe(true)
      expect(protocolRelativeWrapper.find('a').attributes('href')).toBe('//example.com')

      // Test mailto:
      const mailtoWrapper = mount(FdsCard, {
        props: {
          to: 'mailto:test@example.com',
          header: 'Email Link',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })
      expect(mailtoWrapper.find('a').exists()).toBe(true)
      expect(mailtoWrapper.find('a').attributes('href')).toBe('mailto:test@example.com')
    })

    it('treats internal paths as router links when Vue Router is available', () => {
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      // Test root-relative path
      const rootRelativeWrapper = mount(FdsCard, {
        props: {
          to: '/page',
          header: 'Internal Page',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })
      // Should use RouterLink for internal paths
      expect(rootRelativeWrapper.find('a').exists()).toBe(true)
      expect(rootRelativeWrapper.find('a').attributes('href')).toBe('/page')

      // Test hash link
      const hashWrapper = mount(FdsCard, {
        props: {
          to: '#section',
          header: 'Hash Link',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })
      expect(hashWrapper.find('a').attributes('href')).toBe('#section')
    })

    it('handles router location objects with RouterLink', () => {
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      const routerLocation = {
        name: 'dashboard',
        params: { id: '123' },
      }

      const wrapper = mount(FdsCard, {
        props: {
          to: routerLocation,
          header: 'Dashboard',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
          stubs: {
            RouterLink: MockRouterLink,
          },
        },
      })

      const routerLink = wrapper.findComponent(MockRouterLink)
      expect(routerLink.exists()).toBe(true)
      expect(routerLink.props('to')).toEqual(routerLocation)
    })

    it('handles partial router injection (missing $route)', () => {
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }

      const wrapper = mount(FdsCard, {
        props: {
          to: '/page',
          header: 'Page',
        },
        global: {
          provide: {
            $router: mockRouter,
          },
        },
      })

      // Should fallback to anchor when $route is missing
      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.find('a').attributes('href')).toBe('/page')
    })

    it('handles router without RouterLink component', () => {
      const mockRouter = {}
      const mockRoute = { path: '/current' }

      const wrapper = mount(FdsCard, {
        props: {
          to: '/page',
          header: 'Page',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
        },
      })

      // Should fallback to anchor when RouterLink is not available
      expect(wrapper.find('a').exists()).toBe(true)
      expect(wrapper.find('a').attributes('href')).toBe('/page')
    })

    it('preserves all card functionality with router integration', () => {
      const mockRouter = {
        constructor: { RouterLink: MockRouterLink },
      }
      const mockRoute = { path: '/current' }

      const wrapper = mount(FdsCard, {
        props: {
          to: '/dashboard',
          header: 'Dashboard Card',
          subheader: 'Subtitle',
          icon: 'arrow-forward',
          variant: 'long',
        },
        slots: {
          image: '<img src="test.jpg" alt="Test" />',
          content: '<p>Card content</p>',
        },
        global: {
          provide: {
            $router: mockRouter,
            $route: mockRoute,
          },
          stubs: {
            RouterLink: MockRouterLink,
          },
        },
      })

      // Card structure should remain intact
      expect(wrapper.find('.card').classes()).toContain('long')
      expect(wrapper.find('.card-image').exists()).toBe(true)
      expect(wrapper.find('.card-heading').text()).toBe('Dashboard Card')
      expect(wrapper.find('.card-subheading').text()).toBe('Subtitle')
      expect(wrapper.find('p').text()).toBe('Card content')
      expect(wrapper.find('.card-icon').exists()).toBe(true)
    })
  })

  describe('Smart Icon Default Behavior', () => {
    it('provides arrow-forward icon for internal links by default', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '/internal-page',
          header: 'Internal Link',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(true)
      expect(wrapper.find('use').attributes('href')).toBe('#arrow-forward')
    })

    it('provides open-in-new icon for external links by default', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: 'https://external-site.com',
          header: 'External Link',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(true)
      expect(wrapper.find('use').attributes('href')).toBe('#open-in-new')
    })

    it('detects and uses open-in-new icon for domain URLs without protocol', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: 'example.com',
          header: 'Domain URL',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(true)
      expect(wrapper.find('use').attributes('href')).toBe('#open-in-new')
    })

    it('detects and uses open-in-new icon for protocol-relative URLs', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '//example.com',
          header: 'Protocol Relative',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(true)
      expect(wrapper.find('use').attributes('href')).toBe('#open-in-new')
    })

    it('detects and uses open-in-new icon for mailto links', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: 'mailto:test@example.com',
          header: 'Email Link',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(true)
      expect(wrapper.find('use').attributes('href')).toBe('#open-in-new')
    })

    it('allows manual override of icon for internal links', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '/internal-page',
          header: 'Internal Link',
          icon: 'open-in-new',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(true)
      expect(wrapper.find('use').attributes('href')).toBe('#open-in-new')
    })

    it('allows manual override of icon for external links', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: 'https://external-site.com',
          header: 'External Link',
          icon: 'arrow-forward',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(true)
      expect(wrapper.find('use').attributes('href')).toBe('#arrow-forward')
    })

    it('shows no icon when to prop is not provided', () => {
      const wrapper = mount(FdsCard, {
        props: {
          header: 'No Link Card',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(false)
    })

    it('respects explicitly setting icon to empty string', () => {
      const wrapper = mount(FdsCard, {
        props: {
          to: '/page',
          header: 'Link without icon',
          icon: '',
        },
      })

      expect(wrapper.find('.card-icon').exists()).toBe(false)
    })
  })
})
