import type { CountryData } from "../models/country";

export const getCountryDetails = async (
	countryCode: string,
): Promise<CountryData> => {
	const response = await fetch(
		`https://restcountries.com/v3.1/alpha/${countryCode}`,
	);

	if (!response.ok) {
		throw new Error(`Error fetching country details: ${response.statusText}`);
	}

	const data = await response.json();

	// The API returns an array, even for a single country code
	if (!Array.isArray(data) || data.length === 0) {
		throw new Error(`No country found for code: ${countryCode}`);
	}

	return data[0] as CountryData;
};
