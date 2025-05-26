import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../api/get-countries";

export const useCountryList = () => {
	return useQuery({
		queryKey: ["country-list"],
		queryFn: getCountries,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};
