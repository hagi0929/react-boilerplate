import CountryFilterPanel from "@/features/country-list/components/country-filter-panel";
import CountryGrid from "@/features/country-list/components/country-grid";
import QuickStatPanel from "@/shared/components/quick-stat-panel";

function CountriesPage() {
	return (
		<div className="px-4 max-w-screen-xl mx-auto w-full py-6 space-y-6">
			<CountryFilterPanel />
			<CountryGrid />
			<QuickStatPanel />
		</div>
	);
}

export default CountriesPage;
