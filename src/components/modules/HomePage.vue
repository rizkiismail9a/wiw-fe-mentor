<script setup lang="ts">
import CountriesServices from '@/services/countriesServices';
import CountryCard from './CountryCard/CountryCard.vue';
import { onMounted, ref } from 'vue';
import { Countries } from '@/types/countries.types';

onMounted(async () => {
  await getAllCountries();
});

const countries = ref<Countries[]>();

// Get all data of countries available
const getAllCountries = async () => {
  try {
    const { data } = await CountriesServices.getAllCountries({
      fields: 'name,population,region,capital,flags',
    });

    countries.value = data;
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div class="p-6 grid sm:grid-cols-4 grid-cols-1 gap-9 items-center">
    <div v-for="country in countries" :key="country.area" class="w-fit m-auto">
      <CountryCard :country="country" />
    </div>
  </div>
</template>
