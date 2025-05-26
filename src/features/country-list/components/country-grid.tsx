import { useCountryList } from "../hooks/use-country-list";
import useCountryListStore from "../store/country-list-store";
import CountryCard from "./country-card";

export default function CountryGrid() {
	const { data } = useCountryList();
	const countries = data ?? [];

	const { filter } = useCountryListStore();

	const filteredCountries = countries.filter((country) => {
		const regionMatch =
			!filter.region || filter.region === "All" || country.region === filter.region;

		const searchValue = filter.search?.toLowerCase().trim() ?? "";
		const searchMatch =
			!searchValue ||
			country.name.toLowerCase().includes(searchValue) ||
			country.code.toLowerCase().includes(searchValue) ||
			country.capital.toLowerCase().includes(searchValue);

		return regionMatch && searchMatch;
	});

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{filteredCountries.map((country) => (
				<CountryCard key={country.code} country={country} />
			))}
		</div>
	);
}
