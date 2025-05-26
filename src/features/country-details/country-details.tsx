import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { Separator } from "@/shared/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import {
	ArrowLeft,
	Building,
	DollarSign,
	ExternalLink,
	Globe,
	Languages,
	MapPin,
	Phone,
	Ruler,
	Users,
} from "lucide-react";
import { useCountryDetails } from "./hooks/use-country-details";
import type { CountryData } from "./models/country";

const route = getRouteApi("/country/$countryCode");

const formatPopulation = (population?: number) => {
	if (!population) return "-";
	if (population >= 1_000_000_000)
		return `${(population / 1_000_000_000).toFixed(2).replace(/\.00$/, "")}B`;
	if (population >= 1_000_000)
		return `${(population / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
	if (population >= 1_000)
		return `${(population / 1_000).toFixed(2).replace(/\.00$/, "")}K`;
	return population.toLocaleString();
};

const formatArea = (area?: number) => area?.toLocaleString() + " km²" ?? "-";

const getCallingCode = (idd?: { root: string; suffixes: string[] }) =>
	idd ? `${idd.root}${idd.suffixes?.[0] ?? ""}` : "-";

const getPrimaryLanguage = (languages?: Record<string, string>) =>
	Object.values(languages ?? {})[0] ?? "-";

const getPrimaryCurrency = (
	currencies?: Record<string, { symbol: string; name: string }>,
) => {
	if (!currencies) return { code: "-", name: "-", symbol: "-" };
	const code = Object.keys(currencies)[0];
	const currency = currencies[code];
	return {
		code: code ?? "-",
		name: currency?.name ?? "-",
		symbol: currency?.symbol ?? "-",
	};
};

function CountryDetails() {
	const { countryCode } = route.useParams();
	const { data: country, isLoading } = useCountryDetails(countryCode);

	if (isLoading || !country) return null;

	const primaryCurrency = getPrimaryCurrency(country.currencies);
	const primaryLanguage = getPrimaryLanguage(country.languages);
	const callingCode = getCallingCode(country.idd);

	return (
		<div className="px-4 max-w-screen-xl mx-auto w-full py-6 space-y-6">
			{/* Back */}
      <div>
        <Link to="/country">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Countries
          </Button>
        </Link>
      </div>

			{/* Header */}
			<Card>
				<CardHeader>
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
						<Avatar className="h-20 w-20">
							<AvatarImage
								src={country.flags?.png ?? "/placeholder.svg"}
								alt={`${country.name?.common ?? ""} flag`}
							/>
							<AvatarFallback className="text-4xl">
								{country.flag ?? "🏳️"}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 space-y-2">
							<CardTitle className="text-3xl font-bold">
								{country.name?.common ?? "-"}
							</CardTitle>
							<CardDescription className="text-lg">
								{country.name?.official ?? "-"}
							</CardDescription>
							<div className="flex flex-wrap gap-2">
								{country.region && (
									<Badge variant="secondary">{country.region}</Badge>
								)}
								{country.subregion && (
									<Badge variant="outline">{country.subregion}</Badge>
								)}
								{country.independent && (
									<Badge variant="default">Independent</Badge>
								)}
								{country.landlocked && (
									<Badge variant="destructive">Landlocked</Badge>
								)}
							</div>
						</div>
					</div>
				</CardHeader>
			</Card>

			{/* Metrics */}
			<div className="grid gap-4 md:grid-cols-3">
				{[
					{
						icon: <Users className="mr-2 h-4 w-4" />,
						title: "Population",
						value: formatPopulation(country.population),
						sub: `${country.population?.toLocaleString() ?? "-"} people`,
						progress: Math.min(
							((country.population ?? 0) / 1_000_000_000) * 100,
							100,
						),
					},
					{
						icon: <Ruler className="mr-2 h-4 w-4" />,
						title: "Area",
						value: formatArea(country.area),
						sub: "Total land area",
						progress: Math.min(((country.area ?? 0) / 10_000_000) * 100, 100),
					},
					{
						icon: <DollarSign className="mr-2 h-4 w-4" />,
						title: "Currency",
						value: primaryCurrency.symbol,
						sub: primaryCurrency.name,
						badge: primaryCurrency.code,
					},
				].map((item, index) => (
					<Card key={index}>
						<CardHeader className="pb-3">
							<CardTitle className="text-base flex items-center">
								{item.icon}
								{item.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{item.value}</div>
							{item.sub && (
								<div className="text-sm text-muted-foreground mt-1">
									{item.sub}
								</div>
							)}
							{item.progress !== undefined && (
								<Progress value={item.progress} className="mt-2" />
							)}
							{item.badge && (
								<Badge variant="outline" className="mt-2">
									{item.badge}
								</Badge>
							)}
						</CardContent>
					</Card>
				))}
			</div>

			{/* Geographic Info */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<MapPin className="mr-2 h-5 w-5" />
						Geographic Information
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{[
						["Capital", country.capital?.join(", ") ?? "-"],
						["Region", country.region],
						["Subregion", country.subregion],
						["Coordinates", `${country.latlng?.[0]}°, ${country.latlng?.[1]}°`],
						["Landlocked", country.landlocked ? "Yes" : "No"],
					].map(([label, value], idx) => (
						<div key={idx}>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">{label}</span>
								<span className="font-medium">{value ?? "-"}</span>
							</div>
							<Separator />
						</div>
					))}
				</CardContent>
			</Card>

			{/* Cultural Info */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Languages className="mr-2 h-5 w-5" />
						Cultural Information
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex justify-between items-start">
						<span className="text-muted-foreground">Languages</span>
						<div className="flex flex-wrap gap-1 justify-end">
							{Object.values(country.languages ?? {}).map((lang) => (
								<Badge key={lang} variant="outline">
									{lang}
								</Badge>
							))}
						</div>
					</div>
					<Separator />
					<div className="flex justify-between items-center">
						<span className="text-muted-foreground">Primary Language</span>
						<span className="font-medium">{primaryLanguage}</span>
					</div>
					<Separator />
					<div className="flex justify-between items-center">
						<span className="text-muted-foreground">Top Level Domain</span>
						<Badge variant="outline" className="font-mono">
							{country.tld?.join(", ") ?? "-"}
						</Badge>
					</div>
				</CardContent>
			</Card>

			{/* Government */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Building className="mr-2 h-5 w-5" />
						Government & Status
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex justify-between items-center">
						<span className="text-muted-foreground">Independence</span>
						<Badge variant={country.independent ? "default" : "secondary"}>
							{country.independent ? "Independent" : "Dependent"}
						</Badge>
					</div>
					<Separator />
					<div className="flex justify-between items-center">
						<span className="text-muted-foreground">ISO Code</span>
						<div className="flex gap-2">
							<Badge variant="outline">{country.cca2 ?? "-"}</Badge>
							<Badge variant="outline">{country.ccn3 ?? "-"}</Badge>
						</div>
					</div>
					{country.borders && (
						<>
							<Separator />
							<div className="flex justify-between items-start">
								<span className="text-muted-foreground">Borders</span>
								<div className="flex flex-wrap gap-1 justify-end">
									{country.borders.map((border) => (
										<Badge key={border} variant="outline">
											{border}
										</Badge>
									))}
								</div>
							</div>
						</>
					)}
				</CardContent>
			</Card>

			{/* Contact & Time */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Phone className="mr-2 h-5 w-5" />
						Contact & Time
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex justify-between items-center">
						<span className="text-muted-foreground">Calling Code</span>
						<Badge variant="outline" className="font-mono">
							{callingCode}
						</Badge>
					</div>
					<Separator />
					<div className="flex justify-between items-start">
						<span className="text-muted-foreground">Timezones</span>
						<div className="flex flex-wrap gap-1 justify-end">
							{country.timezones?.map((tz) => (
								<Badge key={tz} variant="outline" className="font-mono text-xs">
									{tz}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* External Links */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Globe className="mr-2 h-5 w-5" />
						External Resources
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-4">
						{country.maps?.googleMaps && (
							<a
								href={country.maps.googleMaps}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button variant="outline" size="sm">
									<ExternalLink className="mr-2 h-4 w-4" />
									Google Maps
								</Button>
							</a>
						)}
						{country.maps?.openStreetMaps && (
							<a
								href={country.maps.openStreetMaps}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button variant="outline" size="sm">
									<ExternalLink className="mr-2 h-4 w-4" />
									OpenStreetMap
								</Button>
							</a>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default CountryDetails;
