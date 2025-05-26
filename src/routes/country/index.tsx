import CountriesPage from "@/features/country-list/country-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/country/")({
  component: CountriesPage,
});
