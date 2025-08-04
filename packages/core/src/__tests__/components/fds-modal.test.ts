import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import FdsModal from '../../components/fds-modal.vue';

describe('FdsModal', () => {
  beforeEach(() => {
    // Dialog methods are already mocked in the shared setup
  });

  afterEach(() => {
    // Clean up any open dialogs
    document.querySelectorAll('dialog').forEach((dialog) => {
      if (dialog.open) dialog.close();
    });
  });

  describe('Rendering', () => {
    it('renders dialog element with proper structure', () => {
      const wrapper = mount(FdsModal);

      expect(wrapper.find('dialog').exists()).toBe(true);
      expect(wrapper.find('.fds-modal').exists()).toBe(true);
      expect(wrapper.find('.modal-content').exists()).toBe(true);
      expect(wrapper.find('.modal-header').exists()).toBe(true);
      expect(wrapper.find('.modal-body').exists()).toBe(true);
      expect(wrapper.find('.modal-footer').exists()).toBe(true);
    });

    it('generates unique ID when not provided', () => {
      const wrapper1 = mount(FdsModal);
      const wrapper2 = mount(FdsModal);

      const id1 = wrapper1.find('dialog').attributes('id');
      const id2 = wrapper2.find('dialog').attributes('id');

      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('uses provided ID', () => {
      const customId = 'my-modal';
      const wrapper = mount(FdsModal, {
        props: { id: customId },
      });

      expect(wrapper.find('dialog').attributes('id')).toBe(customId);
    });
  });

  describe('Header', () => {
    it('renders header text when provided', () => {
      const wrapper = mount(FdsModal, {
        props: { header: 'Modal Title' },
      });

      const title = wrapper.find('.modal-title');
      expect(title.exists()).toBe(true);
      expect(title.text()).toBe('Modal Title');
    });

    it('renders close button by default', () => {
      const wrapper = mount(FdsModal);

      const closeBtn = wrapper.find('.modal-close');
      expect(closeBtn.exists()).toBe(true);
      expect(closeBtn.text()).toContain('Luk');
    });

    it('hides close button when closeable is false', () => {
      const wrapper = mount(FdsModal, {
        props: { closeable: false },
      });

      expect(wrapper.find('.modal-close').exists()).toBe(false);
    });

    it('allows custom header via slot', () => {
      const wrapper = mount(FdsModal, {
        slots: {
          header: '<h3>Custom Header</h3>',
        },
      });

      expect(wrapper.find('h3').text()).toBe('Custom Header');
      expect(wrapper.find('.modal-title').exists()).toBe(false);
    });
  });

  describe('Body Content', () => {
    it('renders body slot content', () => {
      const wrapper = mount(FdsModal, {
        slots: {
          default: '<p>Modal content goes here</p>',
        },
      });

      const body = wrapper.find('.modal-body');
      expect(body.find('p').text()).toBe('Modal content goes here');
    });

    it('supports complex content in body', () => {
      const wrapper = mount(FdsModal, {
        slots: {
          default: `
            <form>
              <input type="text" name="field1" />
              <textarea name="field2"></textarea>
            </form>
          `,
        },
      });

      const body = wrapper.find('.modal-body');
      expect(body.find('form').exists()).toBe(true);
      expect(body.find('input').exists()).toBe(true);
      expect(body.find('textarea').exists()).toBe(true);
    });
  });

  describe('Footer', () => {
    it('renders default footer buttons', () => {
      const wrapper = mount(FdsModal);

      const buttons = wrapper.findAll('.modal-footer button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0].text()).toBe('Godkend');
      expect(buttons[0].classes()).toContain('button-primary');
      expect(buttons[1].text()).toBe('Annuller');
      expect(buttons[1].classes()).toContain('button-secondary');
    });

    it('uses custom button text', () => {
      const wrapper = mount(FdsModal, {
        props: {
          acceptText: 'Gem',
          cancelText: 'Afbryd',
        },
      });

      const buttons = wrapper.findAll('.modal-footer button');
      expect(buttons[0].text()).toBe('Gem');
      expect(buttons[1].text()).toBe('Afbryd');
    });

    it('allows custom footer via slot', () => {
      const wrapper = mount(FdsModal, {
        slots: {
          footer: '<button class="custom-btn">Custom Action</button>',
        },
      });

      expect(wrapper.find('.custom-btn').text()).toBe('Custom Action');
      expect(wrapper.findAll('.modal-footer button')).toHaveLength(1);
    });
  });

  describe('Modal Control', () => {
    it('exposes showModal method', () => {
      const wrapper = mount(FdsModal);

      expect(wrapper.vm.showModal).toBeDefined();
      expect(typeof wrapper.vm.showModal).toBe('function');
    });

    it('exposes hideModal method', () => {
      const wrapper = mount(FdsModal);

      expect(wrapper.vm.hideModal).toBeDefined();
      expect(typeof wrapper.vm.hideModal).toBe('function');
    });

    it('calls dialog.showModal when showModal is called', async () => {
      const wrapper = mount(FdsModal);
      const dialog = wrapper.find('dialog').element as HTMLDialogElement;
      const showModalSpy = vi.spyOn(dialog, 'showModal');

      wrapper.vm.showModal();

      expect(showModalSpy).toHaveBeenCalled();
    });

    it('calls dialog.close when hideModal is called', async () => {
      const wrapper = mount(FdsModal);
      const dialog = wrapper.find('dialog').element as HTMLDialogElement;
      const closeSpy = vi.spyOn(dialog, 'close');

      wrapper.vm.showModal();
      wrapper.vm.hideModal();

      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('Events', () => {
    it('emits close event when modal is closed', async () => {
      const wrapper = mount(FdsModal);

      wrapper.vm.hideModal();

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')).toHaveLength(1);
    });

    it('emits accept event when accept button is clicked', async () => {
      const wrapper = mount(FdsModal);
      const acceptBtn = wrapper.findAll('.modal-footer button')[0];

      await acceptBtn.trigger('click');

      expect(wrapper.emitted('accept')).toBeTruthy();
      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('emits cancel event when cancel button is clicked', async () => {
      const wrapper = mount(FdsModal);
      const cancelBtn = wrapper.findAll('.modal-footer button')[1];

      await cancelBtn.trigger('click');

      expect(wrapper.emitted('cancel')).toBeTruthy();
      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('emits close event when X button is clicked', async () => {
      const wrapper = mount(FdsModal);
      const closeBtn = wrapper.find('.modal-close');

      await closeBtn.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('handles ESC key when closeable', async () => {
      const wrapper = mount(FdsModal, {
        props: { closeable: true },
      });
      const dialog = wrapper.find('dialog').element as HTMLDialogElement;

      // Mount sets up the event listener
      await wrapper.vm.$nextTick();

      // Simulate ESC key press (dialog 'cancel' event)
      const cancelEvent = new Event('cancel');
      dialog.dispatchEvent(cancelEvent);

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('does not set up ESC handler when not closeable', async () => {
      const wrapper = mount(FdsModal, {
        props: { closeable: false },
      });
      const dialog = wrapper.find('dialog').element as HTMLDialogElement;

      await wrapper.vm.$nextTick();

      const cancelEvent = new Event('cancel');
      dialog.dispatchEvent(cancelEvent);

      // Should not emit close since closeable is false
      expect(wrapper.emitted('close')).toBeFalsy();
    });
  });

  describe('Accessibility', () => {
    it('sets proper ARIA attributes', () => {
      const wrapper = mount(FdsModal, {
        props: { header: 'Test Modal' },
      });

      const dialog = wrapper.find('dialog');
      const modal = wrapper.find('.fds-modal');
      const title = wrapper.find('.modal-title');

      expect(dialog.attributes('aria-labelledby')).toContain('title');
      expect(modal.attributes('aria-hidden')).toBe('false');
      expect(modal.attributes('aria-modal')).toBe('true');
      expect(title.attributes('id')).toContain('title');
    });

    it('maintains focus management', async () => {
      const wrapper = mount(FdsModal);
      const dialog = wrapper.find('dialog').element as HTMLDialogElement;

      // When modal opens, dialog element should receive focus
      wrapper.vm.showModal();

      // Note: jsdom doesn't fully implement focus management
      // In a real browser, focus would be trapped within the dialog
      expect(dialog.open).toBe(true);
    });

    it('close button has accessible text', () => {
      const wrapper = mount(FdsModal);
      const closeBtn = wrapper.find('.modal-close');

      expect(closeBtn.text()).toContain('Luk');
      expect(closeBtn.find('svg').attributes('aria-hidden')).toBe('true');
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid open/close calls', async () => {
      const wrapper = mount(FdsModal);

      wrapper.vm.showModal();
      wrapper.vm.hideModal();
      wrapper.vm.showModal();
      wrapper.vm.hideModal();

      expect(wrapper.emitted('close')).toHaveLength(2);
    });

    it('handles null header gracefully', () => {
      const wrapper = mount(FdsModal, {
        props: { header: null },
      });

      const title = wrapper.find('.modal-title');
      expect(title.text()).toBe('');
    });

    it('works without any props', () => {
      const wrapper = mount(FdsModal);

      expect(wrapper.find('dialog').exists()).toBe(true);
      expect(wrapper.find('.modal-close').exists()).toBe(true);
      expect(wrapper.findAll('.modal-footer button')).toHaveLength(2);
    });
  });

  describe('Integration Scenarios', () => {
    it('works as confirmation dialog', async () => {
      const onConfirm = vi.fn();
      const onCancel = vi.fn();

      const wrapper = mount({
        template: `
          <div>
            <button @click="$refs.modal.showModal()">Delete Item</button>
            <FdsModal
              ref="modal"
              header="Bekræft sletning"
              accept-text="Slet"
              cancel-text="Behold"
              @accept="handleConfirm"
              @cancel="handleCancel"
            >
              Er du sikker på, at du vil slette dette element?
            </FdsModal>
          </div>
        `,
        components: { FdsModal },
        methods: {
          handleConfirm() {
            onConfirm();
          },
          handleCancel() {
            onCancel();
          },
        },
      });

      // Open modal
      await wrapper.find('button').trigger('click');

      // Confirm deletion
      const modal = wrapper.findComponent(FdsModal);
      await modal.findAll('.modal-footer button')[0].trigger('click');

      expect(onConfirm).toHaveBeenCalled();
      expect(onCancel).not.toHaveBeenCalled();
    });

    it('works with form submission', async () => {
      const onSubmit = vi.fn();

      const wrapper = mount({
        template: `
          <FdsModal ref="modal" header="User Form">
            <form @submit.prevent="handleSubmit">
              <input v-model="name" required />
              <input v-model="email" type="email" required />
            </form>
            <template #footer>
              <button @click="submitForm" class="button button-primary">
                Save
              </button>
            </template>
          </FdsModal>
        `,
        components: { FdsModal },
        data() {
          return {
            name: '',
            email: '',
          };
        },
        methods: {
          handleSubmit() {
            onSubmit({ name: this.name, email: this.email });
            this.$refs.modal.hideModal();
          },
          submitForm() {
            this.handleSubmit();
          },
        },
      });

      const modal = wrapper.findComponent(FdsModal);
      modal.vm.showModal();

      // Fill form
      const inputs = wrapper.findAll('input');
      await inputs[0].setValue('John Doe');
      await inputs[1].setValue('john@example.com');

      // Submit
      await wrapper.find('.button-primary').trigger('click');

      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
      });
    });

    it('prevents interaction with background when open', () => {
      const wrapper = mount(FdsModal);
      const dialog = wrapper.find('dialog').element as HTMLDialogElement;

      wrapper.vm.showModal();

      // When using showModal(), the dialog should be modal
      // meaning interaction with elements outside is prevented
      expect(dialog.open).toBe(true);

      // Note: Full backdrop click behavior would need browser testing
      // as jsdom doesn't fully implement dialog backdrop
    });
  });
});
