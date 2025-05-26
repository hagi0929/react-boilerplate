import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";

export default function QuickStatPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total Countries", value: "195" },
            { label: "World Population", value: "7.9B" },
            { label: "Continents", value: "6" },
            { label: "Currencies", value: "180" },
          ].map((stat, idx) => (
            <div className="text-center space-y-2" key={stat.label}>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              {idx < 3 && (
                <Separator orientation="vertical" className="hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
