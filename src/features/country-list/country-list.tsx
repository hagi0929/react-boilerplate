import CountryFilterPanel from "@/features/country-list/components/country-filter-panel";
import CountryGrid from "@/features/country-list/components/country-grid";
import QuickStatPanel from "@/shared/components/quick-stat-panel";
import { createFileRoute } from "@tanstack/react-router";

const countries = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    capital: "Washington, D.C.",
    population: 331900000,
    region: "Americas",
    subregion: "North America",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    capital: "London",
    population: 67800000,
    region: "Europe",
    subregion: "Northern Europe",
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    capital: "Tokyo",
    population: 125800000,
    region: "Asia",
    subregion: "Eastern Asia",
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    capital: "Berlin",
    population: 83200000,
    region: "Europe",
    subregion: "Western Europe",
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    capital: "Paris",
    population: 68000000,
    region: "Europe",
    subregion: "Western Europe",
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    capital: "Brasília",
    population: 215300000,
    region: "Americas",
    subregion: "South America",
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    capital: "New Delhi",
    population: 1380000000,
    region: "Asia",
    subregion: "Southern Asia",
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    capital: "Beijing",
    population: 1440000000,
    region: "Asia",
    subregion: "Eastern Asia",
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    capital: "Canberra",
    population: 25700000,
    region: "Oceania",
    subregion: "Australia and New Zealand",
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    capital: "Ottawa",
    population: 38200000,
    region: "Americas",
    subregion: "North America",
  },
];

const regions = ["All", "Americas", "Europe", "Asia", "Oceania"];

function CountriesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl p-6 space-y-6">
      <CountryFilterPanel />
      <CountryGrid countries={countries} />
      <QuickStatPanel />
    </div>
  );
}

export default CountriesPage;