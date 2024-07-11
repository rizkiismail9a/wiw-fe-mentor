<script setup lang="ts">
import CountriesServices from '@/services/countriesServices';
import CountryCard from './CountryCard/CountryCard.vue';
import InputSearch from '@/components/modules/HomePage/InputSearch/InputSearch.vue';
import { Countries } from '@/types/countries.types';
import { onMounted, ref } from 'vue';
import { AxiosError } from 'axios';
import DropDown from './DropDown/DropDown.vue';

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

// Find some countries by its name
const searchCountries = async (event: string): Promise<void> => {
  try {
    if (event.length) {
      const { data } = await CountriesServices.findCountriesByName(event, {
        fields: 'name,population,region,capital,flags',
      });

      countries.value = data;
    } else {
      await getAllCountries();
    }
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      countries.value = [];
    }
  }
};

// Find some countries by its region
const findCountriesByRegion = async (event: string): Promise<void> => {
  try {
    if (event.length) {
      const { data } = await CountriesServices.findCountriesByRegion(
        event.toLocaleLowerCase(),
        {
          fields: 'name,population,region,capital,flags',
        },
      );

      countries.value = data;
    } else {
      await getAllCountries();
    }
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      countries.value = [];
    }
  }
};
</script>
<template>
  <div class="p-6">
    <div
      class="flex flex-col sm:flex-row sm:justify-between items-start sm:px-11 gap-12"
    >
      <InputSearch @search="searchCountries" />
      <DropDown @select="findCountriesByRegion" />
    </div>
    <div class="py-6 grid sm:grid-cols-4 grid-cols-1 gap-9 items-center">
      <div
        v-for="country in countries"
        :key="country.area"
        class="w-fit m-auto"
      >
        <CountryCard :country="country" />
      </div>
    </div>
  </div>
</template>
