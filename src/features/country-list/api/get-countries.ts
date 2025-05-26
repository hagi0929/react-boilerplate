import type { countryObj } from "@/shared/models/country";

export const getCountries: () => Promise<countryObj[]> = async () => {
  const url = new URL("https://restcountries.com/v3.1/all");
  url.searchParams.append("fields", "name,capital,population,flag,cca3,area,region");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const response = await fetch(url.toString(), requestOptions);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  const responseData = await response.json();
  console.log(responseData);
  
  const countries: countryObj[] = responseData.map((country: any) => ({
    name: country.name.official,
    capital: country.capital[0] ?? "unknown",
    population: country.population,
    flag: country.flag,
    code: country.cca3,
    region: country.region,
  }));
  console.log(countries);

  return countries;
};
