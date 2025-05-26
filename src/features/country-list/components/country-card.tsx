import type { countryObj } from "@/shared/models/country";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "@tanstack/react-router";
import { MapPin, Users } from "lucide-react";
import type React from "react";
import ItemCard from "../../../shared/components/item-card";
import { Badge } from "../../../shared/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../shared/components/ui/card";

interface CountryCardProps {
	country: countryObj;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
	return (
		<Link key={country.code} to={`/country/${country.code.toLowerCase()}`}>
			<ItemCard
				header={
					<div className="flex items-center space-x-3">
						<Avatar className="h-12 w-12">
							<AvatarFallback className="text-2xl">
								{country.flag}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<CardTitle className="text-lg truncate">{country.name}</CardTitle>
							<CardDescription className="flex items-center">
								<MapPin className="mr-1 h-3 w-3" />
								{country.capital}
							</CardDescription>
						</div>
					</div>
				}
				content={
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">Population</span>
							<div className="flex items-center">
								<Users className="mr-1 h-3 w-3 text-muted-foreground" />
								<span className="text-sm font-medium">
									{country.population}
								</span>
							</div>
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">Region</span>
							<Badge variant="secondary">{country.region}</Badge>
						</div>
					</div>
				}
			/>
		</Link>
	);
};

export default CountryCard;
