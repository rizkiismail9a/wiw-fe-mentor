<script setup lang="ts">
import { ref, watch } from 'vue';

const emits = defineEmits<{
  select: [data: string];
}>();

const selectedRegion = ref<string>('Filter by Region');
const showOptions = ref<boolean>(false);
const regionOptions = ref<{ label: string; value: string }[]>([
  {
    label: 'Africa',
    value: 'Africa',
  },
  {
    label: 'America',
    value: 'America',
  },
  {
    label: 'Asia',
    value: 'Asia',
  },
  {
    label: 'Europe',
    value: 'Europe',
  },
  {
    label: 'Oceania',
    value: 'Oceania',
  },
]);

// Once the selectedRegion variable is changed, throw the value to parent component
watch(selectedRegion, (value) => {
  if (value) {
    emits('select', value);
  }
});
</script>
<template>
  <div
    class="bg-light-mode-elements w-[200px] p-3 shadow-sm flex justify-between items-center relative rounded dark:bg-dark-mode-elements"
    @click="showOptions = !showOptions"
  >
    <div class="text-sm dark:text-dark-mode-text font-semibold">
      {{ selectedRegion }}
    </div>
    <ion-icon
      name="chevron-down-outline"
      class="text-sm dark:text-dark-mode-text"
    />

    <div
      v-if="showOptions"
      class="bg-light-mode-elements dark:bg-dark-mode-elements dark:text-dark-mode-text absolute flex flex-col gap-2 p-4 w-full rounded shadow-sm -bottom-[210px] left-0"
    >
      <span
        v-for="opt in regionOptions"
        :key="opt.value"
        @click="selectedRegion = opt.value"
        class="cursor-pointer hover:bg-slate-500/5 text-sm font-semibold p-1"
      >
        {{ opt.label }}
      </span>
    </div>
  </div>

  <select
    v-model="selectedRegion"
    name="region"
    id="select-region"
    class="focus:outline-none w-[30px] hidden"
  >
    <option value="Filter by Region" disabled selected hidden></option>
    <option v-for="opt in regionOptions" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>
