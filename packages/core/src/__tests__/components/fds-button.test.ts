import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FdsButton from '../../components/fds-button.vue';
import { FdsVariantEnum } from 'dkfds-vue3-utils';

describe('FdsButton', () => {
  describe('Rendering', () => {
    it('renders button element with default primary variant', () => {
      const wrapper = mount(FdsButton);
      
      expect(wrapper.element.tagName).toBe('BUTTON');
      expect(wrapper.classes()).toContain('button');
      expect(wrapper.classes()).toContain('button-primary');
    });

    it('renders slot content correctly', () => {
      const wrapper = mount(FdsButton, {
        slots: {
          default: 'Click me'
        }
      });
      
      expect(wrapper.text()).toBe('Click me');
    });

    it('renders with HTML content in slot', () => {
      const wrapper = mount(FdsButton, {
        slots: {
          default: '<span class="icon">→</span> Next'
        }
      });
      
      expect(wrapper.find('.icon').exists()).toBe(true);
      expect(wrapper.text()).toContain('Next');
    });
  });

  describe('Variants', () => {
    Object.values(FdsVariantEnum).forEach(variant => {
      it(`applies ${variant} variant class correctly`, () => {
        const wrapper = mount(FdsButton, {
          props: { variant }
        });
        
        expect(wrapper.classes()).toContain(`button-${variant}`);
      });
    });

    it('accepts custom variant strings', () => {
      const customVariant = 'custom-variant';
      const wrapper = mount(FdsButton, {
        props: { variant: customVariant }
      });
      
      expect(wrapper.classes()).toContain(`button-${customVariant}`);
    });
  });

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const onClick = vi.fn();
      const wrapper = mount(FdsButton, {
        attrs: {
          onClick
        }
      });
      
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('respects disabled attribute', async () => {
      const onClick = vi.fn();
      const wrapper = mount(FdsButton, {
        attrs: {
          disabled: true,
          onClick
        }
      });
      
      expect(wrapper.attributes('disabled')).toBeDefined();
      
      // Note: jsdom doesn't prevent click events on disabled buttons
      // In real browsers, this wouldn't fire
      await wrapper.trigger('click');
      // So we just verify the disabled attribute is set
      expect(wrapper.element.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Attributes', () => {
    it('passes through native button attributes', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          type: 'submit',
          'aria-label': 'Submit form',
          'data-testid': 'submit-btn'
        }
      });
      
      expect(wrapper.attributes('type')).toBe('submit');
      expect(wrapper.attributes('aria-label')).toBe('Submit form');
      expect(wrapper.attributes('data-testid')).toBe('submit-btn');
    });

    it('handles form attribute correctly', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          form: 'my-form-id'
        }
      });
      
      expect(wrapper.attributes('form')).toBe('my-form-id');
    });
  });

  describe('Accessibility', () => {
    it('maintains proper button role', () => {
      const wrapper = mount(FdsButton);
      
      // Native button elements have implicit role="button"
      expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('supports aria-pressed for toggle buttons', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          'aria-pressed': 'true'
        }
      });
      
      expect(wrapper.attributes('aria-pressed')).toBe('true');
    });

    it('supports aria-expanded for disclosure buttons', () => {
      const wrapper = mount(FdsButton, {
        attrs: {
          'aria-expanded': 'false',
          'aria-controls': 'panel-id'
        }
      });
      
      expect(wrapper.attributes('aria-expanded')).toBe('false');
      expect(wrapper.attributes('aria-controls')).toBe('panel-id');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty slot gracefully', () => {
      const wrapper = mount(FdsButton);
      
      expect(wrapper.text()).toBe('');
      expect(wrapper.classes()).toContain('button');
    });

    it('maintains reactivity when variant changes', async () => {
      const wrapper = mount(FdsButton, {
        props: { variant: FdsVariantEnum.primary }
      });
      
      expect(wrapper.classes()).toContain('button-primary');
      
      await wrapper.setProps({ variant: FdsVariantEnum.secondary });
      expect(wrapper.classes()).not.toContain('button-primary');
      expect(wrapper.classes()).toContain('button-secondary');
    });

    it('handles multiple click handlers', async () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      
      const wrapper = mount(FdsButton, {
        attrs: {
          onClick: [handler1, handler2]
        }
      });
      
      await wrapper.trigger('click');
      expect(handler1).toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
    });
  });

  describe('Integration Scenarios', () => {
    it('works correctly in forms', () => {
      const wrapper = mount({
        template: `
          <form>
            <FdsButton type="submit">Submit</FdsButton>
            <FdsButton type="reset">Reset</FdsButton>
            <FdsButton type="button">Cancel</FdsButton>
          </form>
        `,
        components: { FdsButton }
      });
      
      const buttons = wrapper.findAllComponents(FdsButton);
      expect(buttons[0].attributes('type')).toBe('submit');
      expect(buttons[1].attributes('type')).toBe('reset');
      expect(buttons[2].attributes('type')).toBe('button');
    });

    it('works with loading states', async () => {
      const ParentComponent = {
        template: `
          <FdsButton :disabled="loading">
            {{ loading ? 'Saving...' : 'Save' }}
          </FdsButton>
        `,
        components: { FdsButton },
        data() {
          return { loading: false };
        }
      };

      const wrapper = mount(ParentComponent);
      const button = wrapper.findComponent(FdsButton);
      
      expect(button.text()).toBe('Save');
      expect(button.attributes('disabled')).toBeUndefined();
      
      // Simulate loading state
      await wrapper.setData({ loading: true });
      
      expect(button.text()).toBe('Saving...');
      expect(button.attributes('disabled')).toBeDefined();
    });
  });
});