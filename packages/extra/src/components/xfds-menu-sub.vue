<template>
  <ul
    class="sidenav-sub_list"
    role="menu">
    <li
      v-for="child of modelValue"
      :key="child.key"
      role="none"
      :class="[{ active: child.active }, { disabled: child.disabled }]"
    >
      <a
        :href="`${child.href ? child.href : 'javascript:void(0);'}`"
        :title="child.title"
        role="menuitem"
        @click="navigate(child)"
      >
        {{ child.title }}
      </a>
      <xfds-menu-sub
        v-if="child.active && child.children && child.children.length > 0"
        v-model="child.children"
        @navigate="navigateup"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">

import { FdsNavigationItem } from 'dkfds-vue3-utils';
import navigationService from './../service/navigation.service';

const {
  modelValue,
} = defineProps<{
  modelValue: Array<FdsNavigationItem>;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: Array<FdsNavigationItem>];
  navigate: [key: string];
}>();

const navigateup = (key: string) => {
  emit('navigate', navigationService.resolveKey(key, modelValue));
};

const navigate = (item: FdsNavigationItem) => {
  if (item.disabled) {
    return;
  }
  const list = modelValue.map((f) => ({ ...f, active: f.key === item.key }));
  emit('update:modelValue', list);
  emit('navigate', item.key);
};
</script>

<style scoped lang="scss"></style>
