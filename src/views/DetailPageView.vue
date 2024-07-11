<script setup lang="ts">
import CountriesServices from '@/services/countriesServices';
import { CountryName, DetailCountry } from '@/types/countries.types';
import { AxiosError } from 'axios';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(async () => {
  await searchCountries();
});

const country = ref<DetailCountry>();
const borders = ref<{ name: CountryName }[]>();

const firstNativeName = computed(() => {
  if (country.value && country.value.name.nativeName) {
    const firstKey = Object.keys(country.value.name.nativeName)[0];
    return country.value.name.nativeName[firstKey].common;
  }
  return '';
});

const getCurrencies = computed(() => {
  if (country.value && country.value.currencies) {
    const firstKey = Object.keys(country.value.currencies)[0];
    return country.value.currencies[firstKey].name;
  }
  return '';
});

const getLanguages = computed(() => {
  if (country.value && country.value.languages) {
    const languages = Object.values(country.value.languages).join(', ');

    return languages;
  }

  return '';
});

// Find some countries by its name
const searchCountries = async (): Promise<void> => {
  try {
    const { data } = await CountriesServices.findCountriesByName(
      route.params.name as string,
      {
        fields:
          'name,population,region,subregion,capital,flags,tld,currencies,languages,borders',
      },
    );
    country.value = data[0];

    // Get also the border countries
    await getBorderCountry();
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      country.value = undefined;
    }
  }
};

// Find the country names based on its cca3
const getBorderCountry = async (): Promise<void> => {
  try {
    const codes = country.value?.borders.join(',');

    const { data } = await CountriesServices.findCountryByCode({
      fields: 'name',
      codes,
    });

    borders.value = data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      country.value = undefined;
    }
  }
};

watch(route, async (value) => {
  if (value) {
    await searchCountries();
  }
});
</script>
<template>
  <div
    id="detail-page"
    class="flex flex-col gap-20 p-9 sm:mx-auto sm:p-20 w-full"
  >
    <router-link
      to="/"
      class="flex items-center gap-2 bg-light-mode-elements shadow-lg w-[100px] px-5 py-1 text-sm cursor-pointer dark:bg-dark-mode-elements dark:text-dark-mode-text"
    >
      <ion-icon name="arrow-back-outline" />
      <span>Back</span>
    </router-link>

    <div
      class="flex flex-col sm:flex-row gap-10 sm:justify-between sm:items-center p-0 w-full max-w-[1440px]"
    >
      <!-- images -->
      <div class="flex items-center">
        <img
          :src="country?.flags.png"
          :alt="country?.flags.alt"
          id="country-flag"
          class="w-full sm:w-[800px] object-cover"
        />
      </div>

      <div class="dark:text-dark-mode-text flex flex-col gap-5">
        <div class="font-bold text-lg sm:text-4xl">
          {{ country?.name.official }}
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 tracking-[0.24px]"
        >
          <!-- First Section -->
          <div class="flex flex-col gap-2 text-sm sm:text-lg">
            <div>
              <span class="leading-normal font-semibold">Native Name: </span>
              <span class="font-light">{{ firstNativeName }}</span>
            </div>
            <div>
              <span class="leading-normal font-semibold">Population: </span>
              <span class="font-light">{{
                country?.population.toLocaleString('en-GB')
              }}</span>
            </div>
            <div>
              <span class="leading-normal font-semibold">Region: </span>
              <span class="font-light">{{ country?.region }}</span>
            </div>
            <div>
              <span class="leading-normal font-semibold">Sub Region: </span>
              <span class="font-light">{{ country?.subregion }}</span>
            </div>
          </div>

          <!-- Second Section -->
          <div class="flex flex-col gap-2 text-sm sm:text-lg">
            <div>
              <span class="leading-normal font-semibold">
                Top Level Domain:
              </span>
              <span class="font-light">{{ country?.tld[0] }}</span>
            </div>
            <div>
              <span class="leading-normal font-semibold"> Currencies: </span>
              <span class="font-light">{{ getCurrencies }}</span>
            </div>
            <div>
              <span class="leading-normal font-semibold"> Languages: </span>
              <span class="font-light">
                {{ getLanguages }}
              </span>
            </div>
          </div>
        </div>

        <footer
          class="flex flex-col sm:flex-row gap-2 dark:text-dark-mode-text"
        >
          <div class="font-bold text-base leading-normal tracking-[0.24px]">
            Border Countries:
          </div>
          <div class="grid grid-cols-3 gap-3">
            <router-link
              v-for="border in borders"
              :key="border.name.common"
              :to="`/${border.name.official}`"
              class="bg-light-mode-elements shadow-lg p-1 text-center text-sm cursor-pointer rounded-sm dark:bg-dark-mode-elements dark:text-dark-mode-text"
            >
              <span>{{ border.name.common ?? '-' }}</span>
            </router-link>
          </div>
        </footer>
      </div>

      <!-- Footer -->
    </div>
  </div>
</template>
