import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import FdsButton from '../../components/fds-button.vue';
import { mountComponent, testSlot, testProp } from '../../../tests/test-utils';

describe('FdsButton', () => {
  describe('Rendering', () => {
    it('should render a button element', () => {
      const wrapper = mountComponent(FdsButton);
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('should have correct base class', () => {
      const wrapper = mountComponent(FdsButton);
      expect(wrapper.classes()).toContain('button');
    });
  });

  describe('Props', () => {
    it('should apply primary variant by default', () => {
      const wrapper = mountComponent(FdsButton);
      expect(wrapper.classes()).toContain('button-primary');
    });

    it('should apply secondary variant when specified', async () => {
      await testProp(FdsButton, 'variant', 'secondary', (wrapper) => {
        expect(wrapper.classes()).toContain('button-secondary');
      });
    });

    it('should apply tertiary variant when specified', async () => {
      await testProp(FdsButton, 'variant', 'tertiary', (wrapper) => {
        expect(wrapper.classes()).toContain('button-tertiary');
      });
    });

    it('should apply custom variant class', async () => {
      await testProp(FdsButton, 'variant', 'custom-variant', (wrapper) => {
        expect(wrapper.classes()).toContain('button-custom-variant');
      });
    });
  });

  describe('Slots', () => {
    it('should render default slot content', async () => {
      await testSlot(FdsButton, 'default', 'Click me', 'button');
    });

    it('should render complex slot content', () => {
      const wrapper = mountComponent(FdsButton, {
        slots: {
          default: '<span class="icon">🚀</span> Launch',
        },
      });
      expect(wrapper.find('.icon').exists()).toBe(true);
      expect(wrapper.text()).toContain('Launch');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible with text content', async () => {
      const wrapper = mountComponent(FdsButton, {
        slots: {
          default: 'Submit',
        },
      });
      
      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('should be accessible with different variants', async () => {
      const variants = ['primary', 'secondary', 'tertiary'];
      
      for (const variant of variants) {
        const wrapper = mountComponent(FdsButton, {
          props: { variant },
          slots: { default: 'Button text' },
        });
        
        const results = await axe(wrapper.element, {
          rules: {
            region: { enabled: false },
          },
        });
        expect(results).toHaveNoViolations();
      }
    });
  });

  describe('Interaction', () => {
    it('should handle click events', async () => {
      const wrapper = mountComponent(FdsButton, {
        slots: { default: 'Click me' },
      });
      
      await wrapper.trigger('click');
      
      // Vue Test Utils captures native DOM events
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('should be focusable', () => {
      const wrapper = mountComponent(FdsButton);
      const button = wrapper.find('button');
      
      expect(button.element.tagName).toBe('BUTTON');
      // Buttons are focusable by default
    });
  });

  describe('DKFDS Integration', () => {
    it('should have correct button structure for DKFDS styling', () => {
      const wrapper = mountComponent(FdsButton, {
        props: { variant: 'primary' },
        slots: { default: 'DKFDS Button' },
      });
      
      const button = wrapper.find('button');
      expect(button.classes()).toEqual(['button', 'button-primary']);
      expect(button.text()).toBe('DKFDS Button');
    });
  });
});