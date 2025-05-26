import { create } from "zustand";

interface Country {
	id: number;
	name: string;
}

interface CountryListState {
	filter: CountryFilterModel;
}

const defaultFilter: CountryFilterModel = {
  name: "",
  continent: ""
};
const useCountryListStore = create<
	CountryListState & { filter: CountryFilterModel }
>(() => ({
	filter: { ...defaultFilter },
}));

export default useCountryListStore;
