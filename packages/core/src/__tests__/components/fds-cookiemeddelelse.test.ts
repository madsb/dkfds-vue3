import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FdsCookiemeddelelse from '../../components/fds-cookiemeddelelse.vue';
import { testAccessibility } from '../../../../../test-shared/test-utils';

// Stub FdsButton component for testing
const FdsButtonStub = {
  name: 'FdsButton',
  template: '<button class="button" :class="`button-${variant}`" @click="$emit(\'click\')"><slot /></button>',
  props: ['variant']
};

describe('FdsCookiemeddelelse', () => {
  const mountOptions = {
    global: {
      stubs: {
        'fds-button': FdsButtonStub
      }
    }
  };

  describe('Rendering', () => {
    it('renders without errors', () => {
      const wrapper = mount(FdsCookiemeddelelse, mountOptions);
      
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.cookie-container').exists()).toBe(true);
      expect(wrapper.find('.cookie-message').exists()).toBe(true);
    });

    it('renders default header text', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      const heading = wrapper.find('#cookie-message-heading');
      expect(heading.text()).toBe('Fortæl os om du accepterer cookies');
    });

    it('renders default body text', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      const text = wrapper.find('#cookie-message-text');
      expect(text.text()).toContain('Vi indsamler statistik ved hjælp af cookies');
      expect(text.text()).toContain('Alle indsamlede data anonymiseres');
    });

    it('renders accept and cancel buttons by default', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      const buttons = wrapper.findAllComponents(FdsButtonStub);
      expect(buttons).toHaveLength(2);
      expect(buttons[0].text()).toBe('Accepter cookies');
      expect(buttons[1].text()).toBe('Nej tak til cookies');
    });
  });

  describe('Props', () => {
    it('uses custom header when provided', () => {
      const customHeader = 'Custom Cookie Header';
      const wrapper = mount(FdsCookiemeddelelse, {
        props: {
          header: customHeader
        },
        ...mountOptions
      });
      
      const heading = wrapper.find('#cookie-message-heading');
      expect(heading.text()).toBe(customHeader);
    });

    it('handles empty string header', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        props: {
          header: ''
        },
        ...mountOptions
      });
      
      const heading = wrapper.find('#cookie-message-heading');
      expect(heading.text()).toBe('');
    });
  });

  describe('Events', () => {
    it('emits accept event with true when accept button is clicked', async () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      const acceptButton = wrapper.findAllComponents(FdsButtonStub)[0];
      await acceptButton.trigger('click');
      
      expect(wrapper.emitted('accept')).toBeTruthy();
      expect(wrapper.emitted('accept')?.[0]).toEqual([true]);
    });

    it('emits cancel event with true when cancel button is clicked', async () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      const cancelButton = wrapper.findAllComponents(FdsButtonStub)[1];
      await cancelButton.trigger('click');
      
      expect(wrapper.emitted('cancel')).toBeTruthy();
      expect(wrapper.emitted('cancel')?.[0]).toEqual([true]);
    });

    it('does not emit events on initial render', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      expect(wrapper.emitted('accept')).toBeFalsy();
      expect(wrapper.emitted('cancel')).toBeFalsy();
    });
  });

  describe('Slots', () => {
    it('uses custom header slot content when provided', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        slots: {
          header: '<h2 id="custom-heading">Custom Slot Header</h2>'
        },
        ...mountOptions
      });
      
      expect(wrapper.find('#custom-heading').text()).toBe('Custom Slot Header');
      expect(wrapper.find('#cookie-message-heading').exists()).toBe(false);
    });

    it('uses custom default slot content when provided', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        slots: {
          default: '<p id="custom-text">Custom cookie message text</p>'
        },
        ...mountOptions
      });
      
      expect(wrapper.find('#custom-text').text()).toBe('Custom cookie message text');
      expect(wrapper.find('#cookie-message-text').exists()).toBe(false);
    });

    it('uses custom actions slot content when provided', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        slots: {
          actions: '<button id="custom-button">Custom Action</button>'
        },
        ...mountOptions
      });
      
      expect(wrapper.find('#custom-button').text()).toBe('Custom Action');
      expect(wrapper.findAllComponents(FdsButtonStub)).toHaveLength(0);
    });

    it('can override all slots simultaneously', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        slots: {
          header: '<h3>Slot Header</h3>',
          default: '<p>Slot Content</p>',
          actions: '<button>Slot Button</button>'
        },
        ...mountOptions
      });
      
      expect(wrapper.find('h3').text()).toBe('Slot Header');
      expect(wrapper.find('p').text()).toBe('Slot Content');
      expect(wrapper.find('button').text()).toBe('Slot Button');
      expect(wrapper.findAllComponents(FdsButtonStub)).toHaveLength(0);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      const container = wrapper.find('.cookie-container');
      expect(container.attributes('role')).toBe('complementary');
      expect(container.attributes('aria-labelledby')).toBe('cookie-message-heading');
      expect(container.attributes('aria-describedby')).toBe('cookie-message-text');
    });

    it('maintains ARIA relationship with custom header prop', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        props: {
          header: 'Custom Header'
        },
        ...mountOptions
      });
      
      const container = wrapper.find('.cookie-container');
      const heading = wrapper.find('#cookie-message-heading');
      
      expect(container.attributes('aria-labelledby')).toBe('cookie-message-heading');
      expect(heading.exists()).toBe(true);
    });

    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsCookiemeddelelse />
          </main>
        `,
        components: { FdsCookiemeddelelse }
      };

      await testAccessibility(TestWrapper, {
        global: {
          stubs: {
            'fds-button': FdsButtonStub
          }
        }
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles component without any props or slots', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('.cookie-container').exists()).toBe(true);
      expect(wrapper.findAllComponents(FdsButtonStub)).toHaveLength(2);
    });

    it('preserves button variant styling', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      const buttons = wrapper.findAllComponents(FdsButtonStub);
      expect(buttons[0].props('variant')).toBe('secondary');
      expect(buttons[1].props('variant')).toBe('secondary');
    });

    it('maintains proper structure with mixed slots', () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        props: {
          header: 'Prop Header'
        },
        slots: {
          default: '<p>Custom content</p>'
        },
        ...mountOptions
      });
      
      expect(wrapper.find('#cookie-message-heading').text()).toBe('Prop Header');
      expect(wrapper.find('p').text()).toBe('Custom content');
      expect(wrapper.findAllComponents(FdsButtonStub)).toHaveLength(2);
    });
  });

  describe('Integration', () => {
    it('works with parent component event handling', async () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        ...mountOptions
      });
      
      // Test accept event
      const buttons = wrapper.findAllComponents(FdsButtonStub);
      await buttons[0].trigger('click');
      
      expect(wrapper.emitted('accept')).toBeTruthy();
      expect(wrapper.emitted('accept')?.[0]).toEqual([true]);
      
      // Test cancel event
      await buttons[1].trigger('click');
      
      expect(wrapper.emitted('cancel')).toBeTruthy();
      expect(wrapper.emitted('cancel')?.[0]).toEqual([true]);
    });

    it('supports dynamic header updates', async () => {
      const wrapper = mount(FdsCookiemeddelelse, {
        props: {
          header: 'Initial Header'
        },
        ...mountOptions
      });
      
      expect(wrapper.find('#cookie-message-heading').text()).toBe('Initial Header');
      
      await wrapper.setProps({ header: 'Updated Header' });
      expect(wrapper.find('#cookie-message-heading').text()).toBe('Updated Header');
    });

    it('renders correctly in a form context', () => {
      const FormWrapper = {
        template: `
          <form>
            <FdsCookiemeddelelse />
          </form>
        `,
        components: { FdsCookiemeddelelse }
      };
      
      const wrapper = mount(FormWrapper, {
        global: {
          stubs: {
            'fds-button': FdsButtonStub
          }
        }
      });
      expect(wrapper.find('.cookie-container').exists()).toBe(true);
      expect(wrapper.findAllComponents(FdsButtonStub)).toHaveLength(2);
    });
  });
});