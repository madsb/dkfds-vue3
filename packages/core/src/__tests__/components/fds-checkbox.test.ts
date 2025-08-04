import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from 'vitest-axe';
import { nextTick } from 'vue';
import FdsCheckbox from '../../components/fds-checkbox.vue';

describe('FdsCheckbox', () => {
  describe('Rendering', () => {
    it('should render fieldset with checkbox input and label', () => {
      const wrapper = mount(FdsCheckbox);
      
      expect(wrapper.find('fieldset').exists()).toBe(true);
      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
      expect(wrapper.find('label').exists()).toBe(true);
    });

    it('should have correct base classes', () => {
      const wrapper = mount(FdsCheckbox);
      const input = wrapper.find('input');
      
      expect(input.classes()).toContain('form-checkbox');
    });

    it('should generate unique ID when not provided', () => {
      const wrapper = mount(FdsCheckbox);
      const input = wrapper.find('input');
      const label = wrapper.find('label');
      
      const inputId = input.attributes('id');
      expect(inputId).toMatch(/^fid_[0-9a-f]{32}$/);
      expect(label.attributes('for')).toBe(inputId);
    });

    it('should use provided ID', () => {
      const customId = 'my-checkbox';
      const wrapper = mount(FdsCheckbox, {
        props: { id: customId },
      });
      
      const input = wrapper.find('input');
      const label = wrapper.find('label');
      
      expect(input.attributes('id')).toBe(customId);
      expect(label.attributes('for')).toBe(customId);
    });
  });

  describe('Props', () => {
    it('should apply large size by default', () => {
      const wrapper = mount(FdsCheckbox);
      const input = wrapper.find('input');
      
      expect(input.classes()).toContain('checkbox-large');
    });

    it('should apply small size when specified', () => {
      const wrapper = mount(FdsCheckbox, {
        props: { size: 'small' },
      });
      const input = wrapper.find('input');
      
      expect(input.classes()).not.toContain('checkbox-large');
    });

    it('should bind modelValue to checked state', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: true },
      });
      const input = wrapper.find('input');
      
      expect(input.element.checked).toBe(true);
    });

    it('should update checked state when modelValue changes', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: false },
      });
      const input = wrapper.find('input');
      
      expect(input.element.checked).toBe(false);
      
      await wrapper.setProps({ modelValue: true });
      await nextTick();
      
      expect(input.element.checked).toBe(true);
    });
  });

  describe('Events', () => {
    it('should emit update:modelValue when checkbox is checked', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: false },
      });
      const input = wrapper.find('input');
      
      await input.setValue(true);
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
    });

    it('should emit update:modelValue when checkbox is unchecked', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: true },
      });
      const input = wrapper.find('input');
      
      await input.setValue(false);
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([false]);
    });

    it('should emit dirty on blur', async () => {
      const wrapper = mount(FdsCheckbox);
      const input = wrapper.find('input');
      
      await input.trigger('blur');
      
      expect(wrapper.emitted('dirty')).toBeTruthy();
      expect(wrapper.emitted('dirty')![0]).toEqual([true]);
    });
  });

  describe('Slots', () => {
    it('should render default slot as label content', () => {
      const wrapper = mount(FdsCheckbox, {
        slots: {
          default: 'Accept terms'
        }
      });
      expect(wrapper.find('label').text()).toContain('Accept terms');
    });

    it('should render content slot when checkbox is checked', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: true },
        slots: {
          content: '<div class="terms">Terms and conditions details</div>',
        },
      });
      
      const content = wrapper.find('.checkbox-content');
      expect(content.exists()).toBe(true);
      expect(content.find('.terms').exists()).toBe(true);
      expect(content.attributes('aria-hidden')).toBe('false');
    });

    it('should hide content slot when checkbox is unchecked', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: false },
        slots: {
          content: '<div class="terms">Terms and conditions details</div>',
        },
      });
      
      const content = wrapper.find('.checkbox-content');
      expect(content.attributes('aria-hidden')).toBe('true');
    });

    it('should toggle content visibility based on checkbox state', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: false },
        slots: {
          content: 'Additional content',
        },
      });
      
      const content = wrapper.find('.checkbox-content');
      expect(content.attributes('aria-hidden')).toBe('true');
      
      await wrapper.setProps({ modelValue: true });
      await nextTick();
      
      expect(content.attributes('aria-hidden')).toBe('false');
    });
  });

  describe('Attributes', () => {
    it('should pass through HTML attributes', () => {
      const wrapper = mount(FdsCheckbox, {
        attrs: {
          disabled: true,
          'data-testid': 'my-checkbox',
          'aria-describedby': 'help-text',
        },
      });
      
      const input = wrapper.find('input');
      expect(input.attributes('disabled')).toBeDefined();
      expect(input.attributes('data-testid')).toBe('my-checkbox');
      expect(input.attributes('aria-describedby')).toBe('help-text');
    });
  });

  describe('Accessibility', () => {
    it('should be accessible with label', async () => {
      const wrapper = mount(FdsCheckbox, {
        slots: {
          default: 'Subscribe to newsletter',
        },
      });
      
      // For component testing, disable page-level rules
      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false }, // Disable landmark check for component tests
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('should properly associate label with input', () => {
      const wrapper = mount(FdsCheckbox, {
        props: { id: 'test-checkbox' },
        slots: { default: 'Test label' },
      });
      
      const input = wrapper.find('input');
      const label = wrapper.find('label');
      
      expect(input.attributes('id')).toBe('test-checkbox');
      expect(label.attributes('for')).toBe('test-checkbox');
    });

    it('should have proper ARIA attributes for content toggle', () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: true },
        slots: {
          content: 'Extra content',
        },
      });
      
      const content = wrapper.find('.checkbox-content');
      const expectedId = `collapse-${wrapper.find('input').attributes('id')}`;
      
      expect(content.attributes('id')).toBe(expectedId);
      expect(content.attributes('aria-hidden')).toBe('false');
    });
  });

  describe('v-model Integration', () => {
    it('should work with v-model', async () => {
      const TestComponent = {
        template: `
          <div>
            <fds-checkbox v-model="checked">Accept</fds-checkbox>
            <span class="status">{{ checked ? 'Checked' : 'Unchecked' }}</span>
          </div>
        `,
        components: { FdsCheckbox },
        data() {
          return { checked: false };
        },
      };
      
      const wrapper = mount(TestComponent);
      const checkbox = wrapper.findComponent(FdsCheckbox);
      const status = wrapper.find('.status');
      
      expect(status.text()).toBe('Unchecked');
      
      await checkbox.find('input').setValue(true);
      await nextTick();
      
      expect(status.text()).toBe('Checked');
    });
  });
});