<template>
  <ul class="bordered-list">
    <li
      v-for="(file, index) of list"
      :key="index"
      class="d-flex justify-content-between">
      <fds-funktionslink
        v-if="canDownload"
        :icon="getFileIcon(file)"
        @click="onDownloadFile(file)">
        {{ file.filename }}
      </fds-funktionslink>

      <label
        v-if="!canDownload"
        for=""
        class="disabled">
        <svg
          class="icon-svg mr-3"
          focusable="false"
          aria-hidden="true">
          <use :xlink:href="`#${getFileIcon(file)}`" />
        </svg>
        <template v-if="file.label">
          {{ file.label }}
        </template>
        <template v-else>
          {{ file.filename }}
        </template>
      </label>
      <button
        v-if="canDelete"
        class="function-link"
        @click="onDeleteFile(file)">
        <svg
          class="icon-svg"
          aria-hidden="true">
          <use xlink:href="#trash-can"></use></svg>
        Slet
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
// PropType no longer needed
import { FdsFunktionslink } from 'dkfds-vue3-core';
import { FdsFileModel } from 'dkfds-vue3-utils';

const {
  list,
  icons = {
    pdf: 'file-pdf',
    image: 'file-image',
    doc: 'file-word',
    odt: 'file-word',
    xls: 'file-excel',
  },
  defaultIcon = 'insert-drive-file',
  canDelete = true,
  canDownload = true,
  // TODO: download prop method?
} = defineProps<{
  list: Array<FdsFileModel>;
  icons?: Record<string, string>;
  defaultIcon?: string;
  canDelete?: boolean;
  canDownload?: boolean;
}>();

const emit = defineEmits<{
  download: [file: FdsFileModel];
  delete: [file: FdsFileModel];
}>();

const keys = Object.keys(icons) as (keyof typeof icons)[];

const onDeleteFile = (f: FdsFileModel) => emit('delete', f);
const onDownloadFile = (f: FdsFileModel) => emit('download', f);

const getFileIcon = (f: FdsFileModel): string => {
  const key = keys.find((k) => f.type.includes(k));
  if (key) {
    return icons[key];
  }
  return defaultIcon;
};
</script>

<style scoped lang="scss">
.border-list-dashed {
  border: 1px dashed #757575;
  border-radius: 5px;
  > li {
    padding-left: 8px;
    padding-right: 8px;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
