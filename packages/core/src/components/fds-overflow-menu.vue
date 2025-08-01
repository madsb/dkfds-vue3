<template>
  <div class="overflow-menu">
    <button
      :id="`button_${formid}`"
      class="button-overflow-menu js-dropdown"
      :data-js-target="`${formid}`"
      aria-haspopup="true"
      :aria-expanded="false"
    >
      <span
        >{{ header }}
        <svg class="icon-svg" aria-hidden="true" focusable="false">
          <use :href="`#${icon}`"></use>
        </svg>
      </span>
    </button>
    <div :id="formid" class="overflow-menu-inner collapsed" :aria-hidden="true">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 *
 * Komponent for Overflowmenu
 * https://designsystem.dk/komponenter/overflowmenu/
 *
 * */
import { onMounted } from 'vue';

import { formId, dropdown } from 'dkfds-vue3-utils';

const {
  header = null,
  id = null,
  icon = 'more-vert',
} = defineProps<{
  header?: string | null;
  id?: string | null;
  icon?: string;
}>();

const { formid } = formId(id, true);

onMounted(async () => {
  new dropdown(document.getElementById(`button_${formid.value}`)).init();
});
</script>
