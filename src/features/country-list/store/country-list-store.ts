import { create } from "zustand";
import { devtools } from 'zustand/middleware'

interface CountryFilterModel {
  search: string;
  region: string | null;
}

interface CountryListState {
  filter: CountryFilterModel;
  setFilter: (newFilter: Partial<CountryFilterModel>) => void;
  setFilterByField: <K extends keyof CountryFilterModel>(field: K, value: CountryFilterModel[K]) => void;
  resetFilter: () => void;
  resetFilterByField: <K extends keyof CountryFilterModel>(field: K) => void;
}

const defaultFilter: CountryFilterModel = {
  search: "",
  region: null
};

const useCountryListStore = create<CountryListState>()(devtools<CountryListState>((set) => ({
  filter: { ...defaultFilter },
  setFilter: (newFilter) => set((state) => ({
    filter: { ...state.filter, ...newFilter }
  })),
  setFilterByField: (field, value) => set((state) => ({
    filter: { ...state.filter, [field]: value }
  })),
  resetFilter: () => set(() => ({
    filter: { ...defaultFilter }
  })),
  resetFilterByField: (field) => set((state) => ({
    filter: { ...state.filter, [field]: defaultFilter[field] }
  }))
})));

export default useCountryListStore;
