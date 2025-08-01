<template>
  <ul
    class="sidenav-list mb-6"
    role="menu">
    <fds-menu-item
      v-for="(item, index) of tabsList"
      :id="item.key"
      :key="item.key"
      :class="[{ disabled: item.disabled }]"
      :active="item.active"
      :icon="item.icon"
      :hint="item.hint"
      :index="showIndex ? index : null"
      @navigate="navigate(item)"
    >
      {{ item.title }}
      <template #submenu>
        <xfds-menu-sub
          v-if="item.active && item.children && item.children.length > 0"
          v-model="item.children"
          @navigate="subnavigation"
        />
      </template>
    </fds-menu-item>
  </ul>
</template>

<script setup lang="ts">
import { FdsMenuItem } from 'dkfds-vue3-core';
import { FdsNavigationItem } from 'dkfds-vue3-utils';
import { computed,   onMounted, ref, watch } from 'vue';
import navigationService from './../service/navigation.service';

const {
  modelValue,
  showIndex = false,
  navigateFirst = false,
} = defineProps<{
  modelValue: Array<FdsNavigationItem>;
  showIndex?: boolean;
  navigateFirst?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: Array<FdsNavigationItem>];
  navigate: [key: string];
}>();
const filteredList = computed(() => modelValue.filter((f) => !f.ignore));
const currentKey = ref('');
const tabsList = ref<Array<FdsNavigationItem>>(filteredList.value);

const subnavigation = (key: string) => {
  emit('navigate', navigationService.resolveKey(key, modelValue));
};

const navigate = (item: FdsNavigationItem) => {
  if (item.disabled) {
    return;
  }

  tabsList.value = navigationService.setActive(tabsList.value, item.key);
  currentKey.value = item.key;

  emit('update:modelValue', tabsList.value);
  emit('navigate', currentKey.value);
};

onMounted(() => {
  const item = navigationService.findFirstActiveItem(tabsList.value, navigateFirst);
  if (item) {
    navigate(item);
  }
});

watch(
  () => [modelValue],
  () => {
    tabsList.value = filteredList.value;
  },
  {
    immediate: true,
  },
);
</script>

<style scoped lang="scss"></style>
