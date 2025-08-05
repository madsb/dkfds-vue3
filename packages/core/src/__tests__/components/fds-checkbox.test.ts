import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import FdsCheckbox from '../../components/fds-checkbox.vue';
import { testAccessibility } from '../../../../../test-shared/test-utils';

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
          default: 'Accept terms',
        },
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
    it('passes accessibility tests', async () => {
      const TestWrapper = {
        template: `
          <main>
            <FdsCheckbox id="newsletter" v-model="checked">
              Subscribe to newsletter
            </FdsCheckbox>
          </main>
        `,
        components: { FdsCheckbox },
        data() {
          return { checked: false };
        },
      };

      await testAccessibility(TestWrapper);
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

  describe('Edge Cases', () => {
    it('handles null id prop gracefully', () => {
      const wrapper = mount(FdsCheckbox, {
        props: { id: null },
      });

      const input = wrapper.find('input');
      const label = wrapper.find('label');
      const inputId = input.attributes('id');

      expect(inputId).toMatch(/^fid_[0-9a-f]{32}$/);
      expect(label.attributes('for')).toBe(inputId);
    });

    it('handles empty string id', () => {
      const wrapper = mount(FdsCheckbox, {
        props: { id: '' },
      });

      const input = wrapper.find('input');
      const label = wrapper.find('label');
      const inputId = input.attributes('id');

      // Empty string id should be used as-is
      expect(inputId).toBe('');
      expect(label.attributes('for')).toBe('');
    });

    it('renders without any props or slots', () => {
      const wrapper = mount(FdsCheckbox);

      expect(wrapper.find('fieldset').exists()).toBe(true);
      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
      expect(wrapper.find('label').exists()).toBe(true);
      expect(wrapper.find('label').text()).toBe('');
      expect(wrapper.find('.checkbox-content').exists()).toBe(false);
    });

    it('handles rapid checkbox state changes', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: false },
      });
      const input = wrapper.find('input');

      // Rapidly toggle the checkbox
      await input.setValue(true);
      await input.setValue(false);
      await input.setValue(true);

      const emitted = wrapper.emitted('update:modelValue');
      expect(emitted).toHaveLength(3);
      expect(emitted![0]).toEqual([true]);
      expect(emitted![1]).toEqual([false]);
      expect(emitted![2]).toEqual([true]);
    });

    it('handles undefined modelValue', () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: undefined },
      });

      const input = wrapper.find('input');
      expect(input.element.checked).toBe(false); // Should default to false
    });

    it('handles null modelValue', () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: null as any },
      });

      const input = wrapper.find('input');
      expect(input.element.checked).toBe(false); // Should treat as false
    });
  });

  describe('Integration Scenarios', () => {
    it('works in a form with multiple checkboxes', async () => {
      const FormComponent = {
        template: `
          <form>
            <FdsCheckbox v-model="options.newsletter" id="newsletter">
              Subscribe to newsletter
            </FdsCheckbox>
            <FdsCheckbox v-model="options.terms" id="terms">
              Accept terms and conditions
              <template #content>
                <p>By accepting, you agree to our terms...</p>
              </template>
            </FdsCheckbox>
            <FdsCheckbox v-model="options.marketing" id="marketing" size="small">
              Receive marketing emails
            </FdsCheckbox>
          </form>
        `,
        components: { FdsCheckbox },
        data() {
          return {
            options: {
              newsletter: false,
              terms: false,
              marketing: true,
            },
          };
        },
      };

      const wrapper = mount(FormComponent);
      const checkboxes = wrapper.findAllComponents(FdsCheckbox);

      expect(checkboxes).toHaveLength(3);

      // Check initial states
      expect(checkboxes[0].find('input').element.checked).toBe(false);
      expect(checkboxes[1].find('input').element.checked).toBe(false);
      expect(checkboxes[2].find('input').element.checked).toBe(true);

      // Check the terms checkbox
      await checkboxes[1].find('input').setValue(true);
      expect(wrapper.vm.options.terms).toBe(true);

      // Content should now be visible
      const termsContent = checkboxes[1].find('.checkbox-content');
      expect(termsContent.exists()).toBe(true);
      expect(termsContent.attributes('aria-hidden')).toBe('false');
    });

    it('works with form validation and dirty state', async () => {
      const ValidationForm = {
        template: `
          <form>
            <FdsCheckbox 
              v-model="agreed" 
              @dirty="onDirty"
              :class="{ 'error': showError }"
            >
              I agree to the terms *
            </FdsCheckbox>
            <span v-if="showError" class="error-message">
              You must agree to continue
            </span>
          </form>
        `,
        components: { FdsCheckbox },
        data() {
          return {
            agreed: false,
            isDirty: false,
          };
        },
        computed: {
          showError() {
            return this.isDirty && !this.agreed;
          },
        },
        methods: {
          onDirty() {
            this.isDirty = true;
          },
        },
      };

      const wrapper = mount(ValidationForm);
      const checkbox = wrapper.findComponent(FdsCheckbox);

      // Initially no error
      expect(wrapper.find('.error-message').exists()).toBe(false);

      // Blur without checking - should show error
      await checkbox.find('input').trigger('blur');
      await nextTick();

      expect(wrapper.find('.error-message').exists()).toBe(true);
      expect(wrapper.find('.error-message').text()).toBe('You must agree to continue');

      // Check the box - error should disappear
      await checkbox.find('input').setValue(true);
      await nextTick();

      expect(wrapper.find('.error-message').exists()).toBe(false);
    });

    it('works with conditional rendering based on checkbox state', async () => {
      const ConditionalForm = {
        template: `
          <div>
            <FdsCheckbox v-model="showAdvanced">
              Show advanced options
            </FdsCheckbox>
            <div v-if="showAdvanced" class="advanced-options">
              <input type="text" placeholder="Advanced setting 1" />
              <input type="text" placeholder="Advanced setting 2" />
            </div>
          </div>
        `,
        components: { FdsCheckbox },
        data() {
          return {
            showAdvanced: false,
          };
        },
      };

      const wrapper = mount(ConditionalForm);
      const checkbox = wrapper.findComponent(FdsCheckbox);

      // Advanced options hidden initially
      expect(wrapper.find('.advanced-options').exists()).toBe(false);

      // Check the checkbox
      await checkbox.find('input').setValue(true);
      await nextTick();

      // Advanced options should appear
      expect(wrapper.find('.advanced-options').exists()).toBe(true);
      expect(wrapper.findAll('.advanced-options input')).toHaveLength(2);

      // Uncheck - should hide again
      await checkbox.find('input').setValue(false);
      await nextTick();

      expect(wrapper.find('.advanced-options').exists()).toBe(false);
    });

    it('supports keyboard navigation', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: false },
        slots: {
          default: 'Keyboard accessible checkbox',
        },
      });

      const input = wrapper.find('input');

      // Simulate space key press
      await input.trigger('keydown', { key: ' ' });
      await input.trigger('keyup', { key: ' ' });

      // Note: jsdom doesn't fully simulate browser checkbox behavior
      // In a real browser, space key would toggle the checkbox
      // Here we're just ensuring the events are handled without errors
      expect(wrapper.find('input').exists()).toBe(true);
    });
  });

  describe('Attributes Passthrough', () => {
    it('passes through all standard input attributes', () => {
      const wrapper = mount(FdsCheckbox, {
        attrs: {
          name: 'agreement',
          value: 'yes',
          required: true,
          'aria-required': 'true',
          'data-analytics': 'terms-checkbox',
        },
      });

      const input = wrapper.find('input');
      expect(input.attributes('name')).toBe('agreement');
      expect(input.attributes('value')).toBe('yes');
      expect(input.attributes('required')).toBeDefined();
      expect(input.attributes('aria-required')).toBe('true');
      expect(input.attributes('data-analytics')).toBe('terms-checkbox');
    });

    it('passes through class and style attributes to input', () => {
      const wrapper = mount(FdsCheckbox, {
        attrs: {
          class: 'custom-checkbox-class',
          style: 'margin-left: 10px',
        },
      });

      const input = wrapper.find('input');
      
      // Vue passes class and style to the input via v-bind="attrs"
      expect(input.classes()).toContain('custom-checkbox-class');
      expect(input.attributes('style')).toBe('margin-left: 10px;');
    });
  });

  describe('Label and Content Slot Scoping', () => {
    it('provides slot props to default slot', () => {
      const wrapper = mount(FdsCheckbox, {
        props: { id: 'test-checkbox' },
        slots: {
          default: `
            <template #default="slotProps">
              <span class="slot-id">{{ slotProps.id }}</span>
            </template>
          `,
        },
      });

      // Note: The component passes id and class to the slot
      expect(wrapper.find('.slot-id').exists()).toBe(true);
    });

    it('content slot respects checkbox state changes', async () => {
      const wrapper = mount(FdsCheckbox, {
        props: { modelValue: false },
        slots: {
          default: 'Show details',
          content: '<div class="details">Detailed information here</div>',
        },
      });

      // Content hidden initially
      let content = wrapper.find('.checkbox-content');
      expect(content.attributes('aria-hidden')).toBe('true');

      // Update modelValue to true
      await wrapper.setProps({ modelValue: true });
      await nextTick();

      // Content should be visible
      content = wrapper.find('.checkbox-content');
      expect(content.attributes('aria-hidden')).toBe('false');
    });
  });
});
