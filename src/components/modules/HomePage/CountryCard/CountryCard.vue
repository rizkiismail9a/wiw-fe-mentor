<script setup lang="ts">
import { Countries } from '@/types/countries.types';

defineProps<{
  country: Countries;
}>();
</script>
<template>
  <div
    class="bg-white w-[230px] h-[320px] rounded-md overflow-hidden shadow-md cursor-pointer dark:bg-dark-mode-elements"
  >
    <div class="w-full" aria-label="contry-flag">
      <img :src="country.flags.png" :alt="country.flags.alt" />
    </div>
    <div class="p-3 flex flex-col gap-3">
      <div aria-label="contry-name" class="font-bold dark:text-dark-mode-text">
        {{ country.name.official }}
      </div>
      <div
        aria-label="country-data"
        class="flex flex-col gap-2 items-start text-xs dark:text-dark-mode-text"
      >
        <div data-section="population" class="flex gap-1">
          <span class="font-semibold">Population:</span>
          <span>{{ country.population.toLocaleString('en-GB') }}</span>
        </div>
        <div data-section="region" class="flex gap-1">
          <span class="font-semibold">Region:</span>
          <span>{{ country.region }}</span>
        </div>
        <div data-section="Capital" class="flex gap-1">
          <span class="font-semibold">Capital:</span>
          <span>{{ country.capital[0] ?? 'unkonwn' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
