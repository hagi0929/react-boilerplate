import { useMemo } from 'react';
import { useCountryList } from './use-country-list';

export const useCountryFilterOption = () => {
  const { data: countries, isLoading, error } = useCountryList();

  const regions = useMemo(() => {
    if (!countries) return [];
    const uniqueRegions = new Set(countries.map((country) => country.region));
    return Array.from(uniqueRegions).filter((region) => region);
  }, [countries]);

  return { regions, isLoading, error };
};