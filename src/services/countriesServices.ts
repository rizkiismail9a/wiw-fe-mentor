import { FilterParameters } from "@/types/filter.types";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const API = ({ params = {}, headers = {} } = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_COUNTRIES_API,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    params,
  });

  return instance;
};

const CountriesServices = {
  getAllCountries: (params: FilterParameters): Promise<AxiosResponse> => {
    return API({ params }).get("/all");
  },
};

export default CountriesServices;
