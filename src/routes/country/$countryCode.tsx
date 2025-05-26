import CountryDetails from "@/features/country-details/country-details";
import {
	ErrorComponent,
	type ErrorComponentProps,
	Link,
	Outlet,
	createFileRoute,
} from "@tanstack/react-router";

export const Route = createFileRoute("/country/$countryCode")({
	errorComponent: PostErrorComponent,
	component: CountryDetails,
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
	return (
		<div>
			FUCK NOT WORKING
			<ErrorComponent error={error} />
		</div>
	);
}

