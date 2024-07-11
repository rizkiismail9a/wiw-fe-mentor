export type CountryName = {
  common: string;
  official: string;
  nativeName: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
};

export type Countries = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: CountryName;
  capital: string[];
  region: string;
  population: number;
  area: number;
};

export type DetailCountry = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: CountryName;
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  population: number;
  borders: string[];
};
