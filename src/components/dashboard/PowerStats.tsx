import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Cpu, Zap } from "lucide-react";

const stats = [
  {
    title: "Całkowite Zużycie",
    value: "345.2 kWh",
    icon: Zap,
    description: "↗️ +2.1% od ostatniego dnia",
  },
  {
    title: "Obciążenie Sieci",
    value: "76%",
    icon: Cpu,
    description: "↘️ -0.4% od ostatniej godziny",
  },
  {
    title: "Stan Magazynowania",
    value: "82%",
    icon: Battery,
    description: "↗️ +12% od ostatniego odczytu",
  },
];

export const PowerStats = () => {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};