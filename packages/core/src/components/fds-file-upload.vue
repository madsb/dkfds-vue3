<template>
  <input
    :id="formid"
    type="file"
    :name="formid"
    :accept="contenttypes.join(',')"
    @blur="onDirty"
    @change="onFileChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { removeBrowserFileContentHeaders } from 'dkfds-vue3-utils';
import { FdsFileInputModel } from 'dkfds-vue3-utils';
import { formId } from 'dkfds-vue3-utils';

const {
  id = null,
  contenttypes = ['image/png', 'image/jpg', 'image/jpeg', '.pdf', '.doc', '.docx', '.odt'],
  removeContentHeaders = false,
} = defineProps<{
  id?: string | null;
  contenttypes?: string[];
  removeContentHeaders?: boolean;
}>();

const emit = defineEmits<{
  dirty: [value: boolean];
  upload: [file: FdsFileInputModel];
  error: [error: any];
}>();

const { formid } = formId(id);
const file = ref<File | null>();

const onDirty = () => emit('dirty', true);

const clearFile = () => {
  file.value = null;
};

const onFileChange = ($event: Event) => {
  onDirty();
  const target = $event.target as HTMLInputElement;

  const { files } = target;
  if (!files || files.length === 0) {
    return;
  }

  // TODO: håndtere flere filer - pt kun den første
  [file.value] = files as unknown as any[];

  const reader = new FileReader();
  reader.readAsDataURL(file.value);
  reader.onload = async () => {
    const data = removeContentHeaders
      ? removeBrowserFileContentHeaders(reader.result?.toString() ?? '')
      : reader.result?.toString();

    const fileObj = {
      filename: files[0].name, // test.pdf
      type: files[0].type, // application/pdf
      size: files[0].size,
      data,
    } as FdsFileInputModel;

    try {
      emit('upload', fileObj);
    } catch (error) {
      console.error(error);
      emit('error', error);
    }
    clearFile();
  };
};
</script>

<style scoped lang="scss"></style>
