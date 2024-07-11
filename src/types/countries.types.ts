export type Countries = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      ind: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  region: string;
  population: number;
  area: number;
};
