import { useCountryList } from "../hooks/use-country-list";
import CountryCard from "./country-card";

export default function CountryGrid() {
	const { data } = useCountryList();
  const countries = data ?? []
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{countries.map((country) => (
				<CountryCard key={country.code} country={country} />
			))}
		</div>
	);
}
