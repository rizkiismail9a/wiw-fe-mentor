<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const darkToggle = useToggle(isDark);
</script>
<template>
  <nav
    id="navbar"
    class="bg-light-mode-bg dark:bg-dark-mode-elements shadow p-4 flex justify-between h-[80px] items-center"
  >
    <h1 class="font-extrabold dark:text-dark-mode-text text-light-mode-text">
      What in the world?
    </h1>
    <div class="flex items-center gap-2 cursor-pointer" @click="darkToggle()">
      <ion-icon v-if="!isDark" name="moon-outline" class="font-semibold" />
      <ion-icon v-else name="moon" class="text-white" />
      <span
        class="font-semibold text-sm text-light-mode-text leading-normal dark:text-dark-mode-text"
        >Dark Mode</span
      >
    </div>
  </nav>
</template>
