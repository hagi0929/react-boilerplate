import {
	ErrorComponent,
	type ErrorComponentProps,
	Link,
	Outlet,
	createFileRoute,
	getRouteApi,
} from "@tanstack/react-router";

const route = getRouteApi('/country/$countryCode')

function CountryDetails() {
	const { countryCode } = route.useParams();
	return (
		<div className="space-y-2">
			<h4 className="text-xl font-bold underline">{countryCode}</h4>
			<div className="text-sm">{"post.body"}</div>
		</div>
	);
}

export default CountryDetails;
