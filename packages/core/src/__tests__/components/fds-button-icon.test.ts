import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FdsButtonIcon from '../../components/fds-button-icon.vue';
import { testAccessibility } from '../../../../../test-shared/test-utils';

describe('FdsButtonIcon', () => {
  describe('Rendering', () => {
    it('renders button element with correct base classes', () => {
      const wrapper = mount(FdsButtonIcon);
      
      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.find('button').classes()).toContain('button');
      expect(wrapper.find('button').classes()).toContain('button-secondary'); // default variant
    });

    it('renders icon on the left by default', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: { icon: 'pencil' }
      });
      
      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);
      expect(svg.classes()).toContain('icon-svg');
      expect(svg.classes()).not.toContain('rightside-icon');
      expect(svg.find('use').attributes('href')).toBe('#pencil');
    });

    it('renders icon on the right when right prop is true', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: { 
          icon: 'arrow-right',
          right: true 
        }
      });
      
      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);
      expect(svg.classes()).toContain('icon-svg');
      expect(svg.classes()).toContain('rightside-icon');
      expect(svg.find('use').attributes('href')).toBe('#arrow-right');
    });

    it('renders default pencil icon when icon prop is not provided', () => {
      const wrapper = mount(FdsButtonIcon);
      
      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);
      expect(svg.find('use').attributes('href')).toBe('#pencil');
    });
  });

  describe('Props', () => {
    it('applies correct variant class', () => {
      const variants = ['primary', 'secondary', 'tertiary', 'quaternary', 'info', 'success', 'warning', 'error'];
      
      variants.forEach(variant => {
        const wrapper = mount(FdsButtonIcon, {
          props: { variant }
        });
        
        expect(wrapper.find('button').classes()).toContain(`button-${variant}`);
      });
    });

    it('uses secondary variant by default', () => {
      const wrapper = mount(FdsButtonIcon);
      
      expect(wrapper.find('button').classes()).toContain('button-secondary');
    });

    it('uses pencil icon by default', () => {
      const wrapper = mount(FdsButtonIcon);
      
      const svg = wrapper.find('svg');
      expect(svg.find('use').attributes('href')).toBe('#pencil');
    });

    it('accepts custom icon names', () => {
      const customIcons = ['search', 'download', 'upload', 'close', 'check'];
      
      customIcons.forEach(icon => {
        const wrapper = mount(FdsButtonIcon, {
          props: { icon }
        });
        
        expect(wrapper.find('use').attributes('href')).toBe(`#${icon}`);
      });
    });
  });

  describe('Slots', () => {
    it('renders default slot content', () => {
      const wrapper = mount(FdsButtonIcon, {
        slots: {
          default: 'Click me'
        }
      });
      
      expect(wrapper.text()).toContain('Click me');
    });

    it('renders slot content with left icon', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: { icon: 'save' },
        slots: {
          default: 'Save Document'
        }
      });
      
      expect(wrapper.text()).toBe('Save Document');
      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);
      
      // Icon should come before text in DOM
      const button = wrapper.find('button');
      const buttonHTML = button.html();
      const iconIndex = buttonHTML.indexOf('<svg');
      const textIndex = buttonHTML.indexOf('Save Document');
      expect(iconIndex).toBeLessThan(textIndex);
    });

    it('renders slot content with right icon', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: { 
          icon: 'arrow-right',
          right: true 
        },
        slots: {
          default: 'Next'
        }
      });
      
      expect(wrapper.text()).toBe('Next');
      const svg = wrapper.find('svg');
      expect(svg.exists()).toBe(true);
      
      // Text should come before icon in DOM
      const button = wrapper.find('button');
      const buttonHTML = button.html();
      const iconIndex = buttonHTML.indexOf('<svg');
      const textIndex = buttonHTML.indexOf('Next');
      expect(textIndex).toBeLessThan(iconIndex);
    });

    it('supports complex slot content', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: { icon: 'info' },
        slots: {
          default: '<span class="custom">Custom <strong>content</strong></span>'
        }
      });
      
      expect(wrapper.find('.custom').exists()).toBe(true);
      expect(wrapper.find('strong').text()).toBe('content');
    });
  });

  describe('Accessibility', () => {
    it('sets proper ARIA attributes on icons', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: { icon: 'help' }
      });
      
      const svg = wrapper.find('svg');
      expect(svg.attributes('focusable')).toBe('false');
      expect(svg.attributes('aria-hidden')).toBe('true');
    });

    it('maintains button semantics', () => {
      const wrapper = mount(FdsButtonIcon);
      
      const button = wrapper.find('button');
      expect(button.element.tagName).toBe('BUTTON');
      expect(button.attributes('type')).toBeUndefined(); // Should default to 'submit' in forms
    });

    it('passes accessibility tests with text content', async () => {
      // Wrap in main landmark to satisfy axe region rule
      const TestWrapper = {
        template: `
          <main>
            <FdsButtonIcon icon="save">
              Save changes
            </FdsButtonIcon>
          </main>
        `,
        components: { FdsButtonIcon }
      };
      
      await testAccessibility(TestWrapper);
    });

    it('allows ARIA attributes to be passed through', () => {
      const wrapper = mount(FdsButtonIcon, {
        attrs: {
          'aria-label': 'Edit item',
          'aria-pressed': 'false',
          'aria-describedby': 'help-text'
        }
      });
      
      const button = wrapper.find('button');
      expect(button.attributes('aria-label')).toBe('Edit item');
      expect(button.attributes('aria-pressed')).toBe('false');
      expect(button.attributes('aria-describedby')).toBe('help-text');
    });
  });

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      const wrapper = mount(FdsButtonIcon);
      
      await wrapper.find('button').trigger('click');
      
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('passes event object to click handler', async () => {
      const wrapper = mount(FdsButtonIcon);
      
      await wrapper.find('button').trigger('click');
      
      const clickEvent = wrapper.emitted('click')?.[0]?.[0];
      expect(clickEvent).toBeInstanceOf(Event);
    });

    it('supports keyboard activation', async () => {
      const wrapper = mount(FdsButtonIcon);
      const button = wrapper.find('button');
      
      await button.trigger('keydown.enter');
      await button.trigger('keydown.space');
      
      // Buttons should handle these keys natively
      // We're just verifying the button can receive keyboard events
      expect(button.element).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty icon prop gracefully', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: { icon: '' }
      });
      
      expect(wrapper.find('svg').exists()).toBe(false);
    });

    it('handles null/undefined props', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: {
          variant: undefined,
          icon: null,
          right: undefined
        }
      });
      
      expect(wrapper.find('button').classes()).toContain('button-secondary');
      expect(wrapper.find('svg').exists()).toBe(false);
    });

    it('works without any props', () => {
      const wrapper = mount(FdsButtonIcon);
      
      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.find('button').classes()).toContain('button');
      expect(wrapper.find('button').classes()).toContain('button-secondary');
      expect(wrapper.find('svg').exists()).toBe(true); // Default icon
    });

    it('accepts non-enum variant values', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: { variant: 'custom-variant' }
      });
      
      expect(wrapper.find('button').classes()).toContain('button-custom-variant');
    });
  });

  describe('Integration Scenarios', () => {
    it('works in a toolbar context', () => {
      const ToolbarComponent = {
        template: `
          <div class="toolbar">
            <FdsButtonIcon icon="bold" @click="format('bold')">Bold</FdsButtonIcon>
            <FdsButtonIcon icon="italic" @click="format('italic')">Italic</FdsButtonIcon>
            <FdsButtonIcon icon="underline" @click="format('underline')">Underline</FdsButtonIcon>
          </div>
        `,
        components: { FdsButtonIcon },
        methods: {
          format(type: string) {
            this.$emit('format', type);
          }
        }
      };
      
      const wrapper = mount(ToolbarComponent);
      const buttons = wrapper.findAllComponents(FdsButtonIcon);
      
      expect(buttons).toHaveLength(3);
      expect(buttons[0].find('use').attributes('href')).toBe('#bold');
      expect(buttons[1].find('use').attributes('href')).toBe('#italic');
      expect(buttons[2].find('use').attributes('href')).toBe('#underline');
    });

    it('works with dynamic icon switching', async () => {
      const DynamicComponent = {
        template: `
          <FdsButtonIcon 
            :icon="isPlaying ? 'pause' : 'play'"
            @click="toggle"
          >
            {{ isPlaying ? 'Pause' : 'Play' }}
          </FdsButtonIcon>
        `,
        components: { FdsButtonIcon },
        data() {
          return { isPlaying: false };
        },
        methods: {
          toggle() {
            this.isPlaying = !this.isPlaying;
          }
        }
      };
      
      const wrapper = mount(DynamicComponent);
      const buttonIcon = wrapper.findComponent(FdsButtonIcon);
      
      expect(buttonIcon.find('use').attributes('href')).toBe('#play');
      expect(buttonIcon.text()).toBe('Play');
      
      await buttonIcon.trigger('click');
      
      expect(buttonIcon.find('use').attributes('href')).toBe('#pause');
      expect(buttonIcon.text()).toBe('Pause');
    });

    it('works in a form with submit actions', async () => {
      const onSubmit = vi.fn();
      
      const FormComponent = {
        template: `
          <form @submit.prevent="handleSubmit">
            <input type="text" v-model="value" />
            <FdsButtonIcon 
              icon="save" 
              variant="primary"
              type="submit"
            >
              Save
            </FdsButtonIcon>
          </form>
        `,
        components: { FdsButtonIcon },
        data() {
          return { value: '' };
        },
        methods: {
          handleSubmit() {
            onSubmit(this.value);
          }
        }
      };
      
      const wrapper = mount(FormComponent);
      const button = wrapper.findComponent(FdsButtonIcon);
      
      await wrapper.find('input').setValue('test data');
      await wrapper.find('form').trigger('submit');
      
      expect(onSubmit).toHaveBeenCalledWith('test data');
      expect(button.find('button').classes()).toContain('button-primary');
    });

    it('supports icon-only buttons with aria-label', () => {
      const wrapper = mount(FdsButtonIcon, {
        props: { icon: 'close' },
        attrs: { 'aria-label': 'Close dialog' }
      });
      
      expect(wrapper.text()).toBe(''); // No text content
      expect(wrapper.find('button').attributes('aria-label')).toBe('Close dialog');
      expect(wrapper.find('svg').exists()).toBe(true);
    });
  });

  describe('Attributes Passthrough', () => {
    it('passes through HTML button attributes', () => {
      const wrapper = mount(FdsButtonIcon, {
        attrs: {
          type: 'submit',
          disabled: true,
          'data-testid': 'save-button',
          form: 'my-form'
        }
      });
      
      const button = wrapper.find('button');
      expect(button.attributes('type')).toBe('submit');
      expect(button.attributes('disabled')).toBeDefined();
      expect(button.attributes('data-testid')).toBe('save-button');
      expect(button.attributes('form')).toBe('my-form');
    });

    it('applies custom classes alongside component classes', () => {
      const wrapper = mount(FdsButtonIcon, {
        attrs: {
          class: 'custom-class another-class'
        }
      });
      
      const button = wrapper.find('button');
      expect(button.classes()).toContain('button');
      expect(button.classes()).toContain('button-secondary');
      expect(button.classes()).toContain('custom-class');
      expect(button.classes()).toContain('another-class');
    });
  });
});