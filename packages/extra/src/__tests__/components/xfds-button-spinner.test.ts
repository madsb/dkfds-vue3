import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';
import XfdsButtonSpinner from '../../components/xfds-button-spinner.vue';
import { mountComponent, testSlot } from '../../../tests/test-utils';

describe('XfdsButtonSpinner', () => {
  describe('Rendering', () => {
    it('should render a button element', () => {
      const wrapper = mountComponent(XfdsButtonSpinner);
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('should have correct base classes', () => {
      const wrapper = mountComponent(XfdsButtonSpinner);
      expect(wrapper.find('button').classes()).toContain('button');
    });

    it('should apply secondary variant by default', () => {
      const wrapper = mountComponent(XfdsButtonSpinner);
      expect(wrapper.find('button').classes()).toContain('button-secondary');
    });
  });

  describe('Props', () => {
    it('should apply different variants', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { variant: 'primary' },
      });
      expect(wrapper.find('button').classes()).toContain('button-primary');
    });

    it('should show spinner when showSpinner is true', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { showSpinner: true },
      });
      expect(wrapper.find('.inner-spinner').exists()).toBe(true);
    });

    it('should apply white spinner class for primary variant', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { showSpinner: true, variant: 'primary' },
      });
      expect(wrapper.find('.inner-spinner').classes()).toContain('inner-spinner-white');
    });

    it('should disable button when showSpinner is true', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { showSpinner: true },
      });
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    });

    it('should disable button when disabled prop is true', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { disabled: true },
      });
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    });

    it('should show spinner text when provided', () => {
      const spinnerText = 'Loading...';
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { showSpinner: true, spinnerText },
      });
      expect(wrapper.text()).toContain(spinnerText);
    });

    it('should show icon when provided and not spinning', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { icon: 'check' },
      });
      const svg = wrapper.find('svg.rightside-icon');
      expect(svg.exists()).toBe(true);
      expect(svg.find('use').attributes('href')).toBe('#check');
    });

    it('should hide icon when spinning', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { icon: 'check', showSpinner: true },
      });
      expect(wrapper.find('svg.rightside-icon').exists()).toBe(false);
    });

    it('should show overlay when useoverlay is true and spinning', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { showSpinner: true, useoverlay: true },
      });
      expect(wrapper.find('.spinneroverlay').exists()).toBe(true);
    });
  });

  describe('Slots', () => {
    it('should render default slot when not spinning', async () => {
      await testSlot(XfdsButtonSpinner, 'default', 'Click me', 'button');
    });

    it('should render default slot when spinning without spinnerText', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { showSpinner: true },
        slots: { default: 'Original text' },
      });
      expect(wrapper.text()).toContain('Original text');
    });

    it('should not render default slot when spinning with spinnerText', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { showSpinner: true, spinnerText: 'Loading...' },
        slots: { default: 'Original text' },
      });
      expect(wrapper.text()).not.toContain('Original text');
      expect(wrapper.text()).toContain('Loading...');
    });
  });

  describe('Events', () => {
    it('should emit click event when clicked', async () => {
      const wrapper = mountComponent(XfdsButtonSpinner);
      
      await wrapper.find('button').trigger('click');
      
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('should pass MouseEvent in click emission', async () => {
      const wrapper = mountComponent(XfdsButtonSpinner);
      
      await wrapper.find('button').trigger('click');
      
      const clickEvent = wrapper.emitted('click')![0][0];
      expect(clickEvent).toBeInstanceOf(MouseEvent);
    });
  });

  describe('Accessibility', () => {
    it('should be accessible with text content', async () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        slots: { default: 'Submit' },
      });
      
      const results = await axe(wrapper.element, {
        rules: {
          region: { enabled: false },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes for icon', () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { icon: 'check' },
      });
      
      const svg = wrapper.find('svg');
      expect(svg.attributes('focusable')).toBe('false');
      expect(svg.attributes('aria-hidden')).toBe('true');
    });
  });

  describe('Interaction States', () => {
    it('should transition from normal to spinner state', async () => {
      const wrapper = mountComponent(XfdsButtonSpinner, {
        props: { showSpinner: false },
        slots: { default: 'Submit' },
      });
      
      expect(wrapper.find('.inner-spinner').exists()).toBe(false);
      expect(wrapper.find('button').attributes('disabled')).toBeUndefined();
      
      await wrapper.setProps({ showSpinner: true });
      
      expect(wrapper.find('.inner-spinner').exists()).toBe(true);
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    });
  });
});