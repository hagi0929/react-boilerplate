import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/shared/components/ui/command";
import { Input } from "@/shared/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Check, Globe2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useCountryFilterOption } from "../hooks/use-country-filter-option";
import useCountryListStore from "../store/country-list-store";


export default function CountryFilterPanel() {
	const { regions: regionOptions } = useCountryFilterOption();
	const regions = ["All"].concat(regionOptions ?? []);
	const { setFilterByField, resetFilterByField, filter } = useCountryListStore();

	const selectedRegion = filter.region ?? "All";

	// --- Separated local search state for the input ---
	const [localSearch, setLocalSearch] = useState(filter.search ?? "");

	// If filter.search changes elsewhere, keep input in sync
	useEffect(() => {
		setLocalSearch(filter.search ?? "");
	}, [filter.search]);

	// Debounce updating the store's filter.search value
	useEffect(() => {
		const timeout = setTimeout(() => {
			setFilterByField("search", localSearch);
		}, 200); // 200ms debounce, adjust if you like
		return () => clearTimeout(timeout);
	}, [localSearch, setFilterByField]);

	// For region popover search
	const [regionSearch, setRegionSearch] = useState("");
	const filteredRegions = regions.filter((region) =>
		region.toLowerCase().includes(regionSearch.toLowerCase()),
	);

	const handleRegionSelect = (region: string) => {
		if (region === "All") {
			resetFilterByField("region");
		} else {
			setFilterByField("region", region);
		}
	};

	return (
		<Card>
			<CardContent>
				<div className="flex flex-col sm:flex-row gap-4 items-center">
					<div className="relative flex-1 w-full">
						<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search countries..."
							className="pl-10"
							value={localSearch}
							onChange={e => setLocalSearch(e.target.value)}
						/>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="w-full sm:min-w-40 sm:w-auto truncate"
								title={selectedRegion === "All" ? "Filter by Region" : selectedRegion}
							>
								<Globe2 className="mr-2 h-4 w-4" />
								<span className="truncate block max-w-[8rem] text-left">
									{selectedRegion === "All" ? "Filter by Region" : selectedRegion}
								</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-56">
							<Command>
								<CommandInput
									placeholder="Search regions..."
									value={regionSearch}
									onValueChange={setRegionSearch}
								/>
								<CommandList>
									<CommandEmpty>No region found.</CommandEmpty>
									<CommandGroup>
										{filteredRegions.map((region) => (
											<CommandItem
												key={region}
												onSelect={() => handleRegionSelect(region)}
											>
												{region}
												{region === selectedRegion && (
													<Check className="ml-auto h-4 w-4 text-primary" />
												)}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</div>
			</CardContent>
		</Card>
	);
}
