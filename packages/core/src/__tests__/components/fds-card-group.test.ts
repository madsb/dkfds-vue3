import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FdsCardGroup from '../../components/fds-card-group.vue'
import { testAccessibility } from '../../../../../test-shared/test-utils'

describe('FdsCardGroup', () => {
  describe('Rendering', () => {
    it('renders wrapper div with card-group class', () => {
      const wrapper = mount(FdsCardGroup)

      expect(wrapper.find('div').exists()).toBe(true)
      expect(wrapper.find('div').classes()).toContain('card-group')
    })

    it('renders with normal class by default', () => {
      const wrapper = mount(FdsCardGroup)

      expect(wrapper.find('div').classes()).toContain('card-group')
      expect(wrapper.find('div').classes()).toContain('normal')
    })

    it('renders without errors when empty', () => {
      const wrapper = mount(FdsCardGroup)

      expect(wrapper.find('.card-group').exists()).toBe(true)
      expect(wrapper.text()).toBe('')
    })
  })

  describe('Props', () => {
    it('applies deck class when type is deck', () => {
      const wrapper = mount(FdsCardGroup, {
        props: { type: 'deck' },
      })

      expect(wrapper.find('div').classes()).toContain('card-group')
      expect(wrapper.find('div').classes()).toContain('deck')
      expect(wrapper.find('div').classes()).not.toContain('normal')
    })

    it('applies columns class when type is columns', () => {
      const wrapper = mount(FdsCardGroup, {
        props: { type: 'columns' },
      })

      expect(wrapper.find('div').classes()).toContain('card-group')
      expect(wrapper.find('div').classes()).toContain('columns')
      expect(wrapper.find('div').classes()).not.toContain('normal')
    })

    it('applies normal class when type is null', () => {
      const wrapper = mount(FdsCardGroup, {
        props: { type: null },
      })

      expect(wrapper.find('div').classes()).toContain('card-group')
      expect(wrapper.find('div').classes()).toContain('normal')
    })

    it('applies normal class when type prop is not provided', () => {
      const wrapper = mount(FdsCardGroup)

      expect(wrapper.find('div').classes()).toContain('normal')
    })

    it('handles all valid type values', () => {
      const types: Array<'deck' | 'columns' | null> = ['deck', 'columns', null]

      types.forEach((type) => {
        const wrapper = mount(FdsCardGroup, {
          props: { type },
        })

        const expectedClass = type ?? 'normal'
        expect(wrapper.find('div').classes()).toContain(expectedClass)
      })
    })
  })

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsCardGroup, {
        slots: {
          default: '<div class="test-card">Card content</div>',
        },
      })

      expect(wrapper.find('.test-card').exists()).toBe(true)
      expect(wrapper.find('.test-card').text()).toBe('Card content')
    })

    it('renders multiple cards in slot', () => {
      const wrapper = mount(FdsCardGroup, {
        slots: {
          default: `
            <div class="card">Card 1</div>
            <div class="card">Card 2</div>
            <div class="card">Card 3</div>
          `,
        },
      })

      const cards = wrapper.findAll('.card')
      expect(cards).toHaveLength(3)
      expect(cards[0].text()).toBe('Card 1')
      expect(cards[1].text()).toBe('Card 2')
      expect(cards[2].text()).toBe('Card 3')
    })

    it('renders complex component content in slot', () => {
      const ComplexContent = {
        template: `
          <article class="custom-article">
            <h2>Article Title</h2>
            <p>Article content</p>
          </article>
        `,
      }

      const wrapper = mount(FdsCardGroup, {
        slots: {
          default: ComplexContent,
        },
      })

      expect(wrapper.find('.custom-article').exists()).toBe(true)
      expect(wrapper.find('h2').text()).toBe('Article Title')
      expect(wrapper.find('p').text()).toBe('Article content')
    })
  })

  describe('Accessibility', () => {
    it('passes accessibility tests with deck layout', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsCardGroup type="deck">
              <div class="card">
                <h2>Card 1</h2>
                <p>Card content 1</p>
              </div>
              <div class="card">
                <h2>Card 2</h2>
                <p>Card content 2</p>
              </div>
            </FdsCardGroup>
          </main>
        `,
        components: { FdsCardGroup },
      }

      await testAccessibility(TestWrapper)
    })

    it('passes accessibility tests with columns layout', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsCardGroup type="columns">
              <div class="card">
                <h2>Card 1</h2>
                <p>Card content 1</p>
              </div>
              <div class="card">
                <h2>Card 2</h2>
                <p>Card content 2</p>
              </div>
            </FdsCardGroup>
          </main>
        `,
        components: { FdsCardGroup },
      }

      await testAccessibility(TestWrapper)
    })

    it('maintains semantic structure with nested content', () => {
      const wrapper = mount(FdsCardGroup, {
        slots: {
          default: `
            <section class="card">
              <h2>Section Title</h2>
              <p>Content</p>
            </section>
          `,
        },
      })

      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(true)
      expect(wrapper.find('p').exists()).toBe(true)
    })

    it('supports ARIA attributes passthrough', () => {
      const wrapper = mount(FdsCardGroup, {
        attrs: {
          'aria-label': 'Featured cards',
          role: 'region',
        },
      })

      const cardGroup = wrapper.find('.card-group')
      expect(cardGroup.attributes('aria-label')).toBe('Featured cards')
      expect(cardGroup.attributes('role')).toBe('region')
    })
  })

  describe('Edge Cases', () => {
    it('handles undefined type prop', () => {
      const wrapper = mount(FdsCardGroup, {
        props: { type: undefined },
      })

      expect(wrapper.find('div').classes()).toContain('normal')
    })

    it('renders without any content', () => {
      const wrapper = mount(FdsCardGroup)

      expect(wrapper.find('.card-group').exists()).toBe(true)
      expect(wrapper.html()).toBe('<div class="card-group normal"></div>')
    })

    it('handles empty slot content', () => {
      const wrapper = mount(FdsCardGroup, {
        slots: {
          default: '',
        },
      })

      expect(wrapper.find('.card-group').exists()).toBe(true)
      expect(wrapper.text()).toBe('')
    })

    it('preserves whitespace in slot content', () => {
      const wrapper = mount(FdsCardGroup, {
        slots: {
          default: '  <div>  Spaced content  </div>  ',
        },
      })

      expect(wrapper.find('div div').text()).toBe('Spaced content')
    })
  })

  describe('Integration Scenarios', () => {
    it('works with FdsCard components in deck layout', () => {
      // Mock FdsCard component
      const FdsCard = {
        template: '<div class="card"><slot /></div>',
      }

      const CardDeck = {
        template: `
          <FdsCardGroup type="deck">
            <FdsCard v-for="i in 3" :key="i">
              Card {{ i }}
            </FdsCard>
          </FdsCardGroup>
        `,
        components: { FdsCardGroup, FdsCard },
      }

      const wrapper = mount(CardDeck)

      expect(wrapper.find('.card-group.deck').exists()).toBe(true)
      const cards = wrapper.findAll('.card')
      expect(cards).toHaveLength(3)
      expect(cards[0].text()).toBe('Card 1')
      expect(cards[1].text()).toBe('Card 2')
      expect(cards[2].text()).toBe('Card 3')
    })

    it('works with FdsCard components in columns layout', () => {
      const FdsCard = {
        template: '<article class="card"><slot /></article>',
      }

      const CardColumns = {
        template: `
          <FdsCardGroup type="columns">
            <FdsCard v-for="item in items" :key="item.id">
              <h3>{{ item.title }}</h3>
              <p>{{ item.content }}</p>
            </FdsCard>
          </FdsCardGroup>
        `,
        components: { FdsCardGroup, FdsCard },
        data() {
          return {
            items: [
              { id: 1, title: 'First', content: 'First card content' },
              { id: 2, title: 'Second', content: 'Second card content' },
              { id: 3, title: 'Third', content: 'Third card content' },
              { id: 4, title: 'Fourth', content: 'Fourth card content' },
            ],
          }
        },
      }

      const wrapper = mount(CardColumns)

      expect(wrapper.find('.card-group.columns').exists()).toBe(true)
      const cards = wrapper.findAll('.card')
      expect(cards).toHaveLength(4)
      expect(cards[0].find('h3').text()).toBe('First')
      expect(cards[3].find('p').text()).toBe('Fourth card content')
    })

    it('supports dynamic type switching', async () => {
      const DynamicCardGroup = {
        template: `
          <FdsCardGroup :type="layoutType">
            <div class="card">Card 1</div>
            <div class="card">Card 2</div>
          </FdsCardGroup>
        `,
        components: { FdsCardGroup },
        data() {
          return {
            layoutType: null as 'deck' | 'columns' | null,
          }
        },
      }

      const wrapper = mount(DynamicCardGroup)

      // Initial state
      expect(wrapper.find('.card-group').classes()).toContain('normal')

      // Switch to deck
      await wrapper.setData({ layoutType: 'deck' })
      expect(wrapper.find('.card-group').classes()).toContain('deck')
      expect(wrapper.find('.card-group').classes()).not.toContain('normal')

      // Switch to columns
      await wrapper.setData({ layoutType: 'columns' })
      expect(wrapper.find('.card-group').classes()).toContain('columns')
      expect(wrapper.find('.card-group').classes()).not.toContain('deck')

      // Switch back to normal
      await wrapper.setData({ layoutType: null })
      expect(wrapper.find('.card-group').classes()).toContain('normal')
    })

    it('works with nested card groups', () => {
      const NestedGroups = {
        template: `
          <FdsCardGroup type="deck">
            <div class="main-section">
              <h2>Section 1</h2>
              <FdsCardGroup type="columns">
                <div class="card">Nested Card 1</div>
                <div class="card">Nested Card 2</div>
              </FdsCardGroup>
            </div>
            <div class="main-section">
              <h2>Section 2</h2>
              <FdsCardGroup type="columns">
                <div class="card">Nested Card 3</div>
                <div class="card">Nested Card 4</div>
              </FdsCardGroup>
            </div>
          </FdsCardGroup>
        `,
        components: { FdsCardGroup },
      }

      const wrapper = mount(NestedGroups)

      // Check outer group
      expect(wrapper.find('.card-group.deck').exists()).toBe(true)

      // Check nested groups
      const nestedGroups = wrapper.findAll('.card-group.columns')
      expect(nestedGroups).toHaveLength(2)

      // Check all cards
      const cards = wrapper.findAll('.card')
      expect(cards).toHaveLength(4)
    })

    it('maintains layout when cards are added dynamically', async () => {
      const DynamicCards = {
        template: `
          <FdsCardGroup type="deck">
            <div v-for="card in cards" :key="card.id" class="card">
              {{ card.text }}
            </div>
          </FdsCardGroup>
        `,
        components: { FdsCardGroup },
        data() {
          return {
            cards: [
              { id: 1, text: 'Card 1' },
              { id: 2, text: 'Card 2' },
            ],
          }
        },
      }

      const wrapper = mount(DynamicCards)

      // Initial cards
      expect(wrapper.findAll('.card')).toHaveLength(2)
      expect(wrapper.find('.card-group').classes()).toContain('deck')

      // Add more cards
      await wrapper.setData({
        cards: [
          { id: 1, text: 'Card 1' },
          { id: 2, text: 'Card 2' },
          { id: 3, text: 'Card 3' },
          { id: 4, text: 'Card 4' },
        ],
      })

      expect(wrapper.findAll('.card')).toHaveLength(4)
      expect(wrapper.find('.card-group').classes()).toContain('deck')
    })
  })

  describe('Attributes Passthrough', () => {
    it('passes through HTML attributes', () => {
      const wrapper = mount(FdsCardGroup, {
        attrs: {
          id: 'featured-cards',
          'data-testid': 'card-group',
          class: 'custom-wrapper',
        },
      })

      const cardGroup = wrapper.find('.card-group')
      expect(cardGroup.attributes('id')).toBe('featured-cards')
      expect(cardGroup.attributes('data-testid')).toBe('card-group')
      expect(cardGroup.classes()).toContain('card-group')
      expect(cardGroup.classes()).toContain('normal')
      expect(cardGroup.classes()).toContain('custom-wrapper')
    })

    it('merges classes correctly', () => {
      const wrapper = mount(FdsCardGroup, {
        props: { type: 'deck' },
        attrs: {
          class: 'my-custom-class another-class',
        },
      })

      const cardGroup = wrapper.find('.card-group')
      expect(cardGroup.classes()).toContain('card-group')
      expect(cardGroup.classes()).toContain('deck')
      expect(cardGroup.classes()).toContain('my-custom-class')
      expect(cardGroup.classes()).toContain('another-class')
    })

    it('passes style attribute', () => {
      const wrapper = mount(FdsCardGroup, {
        attrs: {
          style: 'margin-top: 20px; padding: 10px;',
        },
      })

      const cardGroup = wrapper.find('.card-group')
      expect(cardGroup.attributes('style')).toBe('margin-top: 20px; padding: 10px;')
    })
  })
})
