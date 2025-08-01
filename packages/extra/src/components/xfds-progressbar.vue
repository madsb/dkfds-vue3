<template>
  <transition name="progress">
    <div class="progress-bar">
      <div
        class="progress-bar-fill"
        :class="`progress-${variant}`"
        :style="`width: ${progress}%;`"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <slot v-if="showProgress">
          {{ progress }}%
        </slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const {
  procent = 0,
  variant = 'primary',
  showProgress = true,
} = defineProps<{
  procent?: number | string;
  variant?: string;
  showProgress?: boolean;
}>();

const progress = computed(() => {
  if (typeof procent === 'string') {
    return 0;
  }
  const val = Math.floor(Math.abs(procent));
  return val > 100 ? 100 : val;
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
