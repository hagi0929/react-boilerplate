import { useQuery } from "@tanstack/react-query";
import { getCountryDetails } from "../api/get-country-detail";

export const useCountryDetails = (countryCode: string) => {
	return useQuery({
		queryKey: ["country-details", countryCode],
		queryFn: () => getCountryDetails(countryCode),
		enabled: !!countryCode,
		staleTime: 1000 * 60 * 5,
	});
};
