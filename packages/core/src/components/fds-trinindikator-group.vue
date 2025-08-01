<template>
  <div
    class="overflow-menu overflow-menu--open-right"
    :class="lgNoResponsive">
    <button
      :id="`button_${formid}`"
      class="button-overflow-menu js-dropdown"
      :data-js-target="`#${formid}`"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <slot name="header">
        {{ header }}
      </slot>
      <svg
        class="icon-svg"
        aria-hidden="true"
        focusable="false">
        <use :xlink:href="`#${icon}`"></use>
      </svg>
    </button>
    <div
      :id="formid"
      class="overflow-menu-inner"
      aria-hidden="true">
      <nav>
        <fds-menu>
          <slot />
        </fds-menu>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 *
 * Komponent for Trin indikator
 * https://designsystem.dk/komponenter/trin/
 *
 * */

import { computed, onMounted } from 'vue';

import { formId, dropdown } from 'dkfds-vue3-utils';

const {
  header = 'Trin', // TODO: overvej interpolation
  id = null,
  icon = 'arrow-drop-down',
  size = 'large',
} = defineProps<{
  header?: string;
  id?: string | null;
  icon?: string;
  size?: 'small' | 'large';
}>();

const { formid } = formId(id, true);

const lgNoResponsive = computed(() =>
  size === 'large' ? 'overflow-menu--lg-no-responsive' : '',
);

onMounted(async () => {
  new dropdown(document.getElementById(`button_${formid.value}`)).init();
});
</script>
