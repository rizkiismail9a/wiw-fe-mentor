<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits<{
  search: [data: string];
}>();

const typedName = ref<string>('');

// Throw the typed name country to parent component
const submit = () => {
  emits('search', typedName.value.trim());
};
</script>
<template>
  <form
    id="input-wrapper"
    @submit.prevent="submit"
    class="flex items-center rounded gap-4 dark:bg-dark-mode-elements bg-light-mode-elements shadow-sm py-4 px-6 w-full sm:w-[400px]"
  >
    <ion-icon name="search-outline" class="dark:text-dark-mode-text" />
    <input
      v-model="typedName"
      type="text"
      placeholder="Search for a country..."
      class="bg-transparent text-sm dark:text-dark-mode-text focus:outline-none"
    />
  </form>
</template>
