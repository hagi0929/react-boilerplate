export interface CountryData {
	name: {
		common: string;
		official: string;
		nativeName?: Record<string, { official: string; common: string }>;
	};
	tld: string[];
	cca2: string;
	ccn3: string;
	independent: boolean;
	currencies: Record<string, { symbol: string; name: string }>;
	idd: {
		root: string;
		suffixes: string[];
	};
	capital: string[];
	region: string;
	subregion: string;
	languages: Record<string, string>;
	latlng: [number, number];
	landlocked: boolean;
	borders?: string[];
	area: number;
	population: number;
	flag: string;
	flags: {
		png: string;
		svg: string;
		alt: string;
	};
	coatOfArms?: {
		png: string;
		svg: string;
	};
	timezones: string[];
	continents: string[];
	maps: {
		googleMaps: string;
		openStreetMaps: string;
	};
	capitalInfo: {
		latlng: [number, number];
	};
}
