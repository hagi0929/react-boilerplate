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
import { Globe2, Search } from "lucide-react";

const regions = ["All", "Americas", "Europe", "Asia", "Oceania"];

export default function CountryFilterPanel() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search countries..." className="pl-10" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Globe2 className="mr-2 h-4 w-4" />
                Filter by Region
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <Command>
                <CommandInput placeholder="Search regions..." />
                <CommandList>
                  <CommandEmpty>No region found.</CommandEmpty>
                  <CommandGroup>
                    {regions.map((region) => (
                      <CommandItem key={region}>{region}</CommandItem>
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
