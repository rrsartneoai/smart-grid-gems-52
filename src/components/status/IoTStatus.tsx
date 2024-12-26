import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Wind, Activity } from "lucide-react";

export function IoTStatus() {
  const { selectedCompanyId } = useCompanyStore();
  const company = companiesData.find((c) => c.id === selectedCompanyId);

  if (!company) return null;

  const iotData = [
    {
      title: "Temperatura",
      value: "23.5°C",
      icon: Thermometer,
      color: "text-red-500",
      status: "Normalna",
    },
    {
      title: "Wilgotność",
      value: "45%",
      icon: Droplets,
      color: "text-blue-500",
      status: "Optymalna",
    },
    {
      title: "Jakość powietrza",
      value: "Dobra",
      icon: Wind,
      color: "text-green-500",
      status: "PM2.5: 15µg/m³",
    },
    {
      title: "Aktywność",
      value: "Online",
      icon: Activity,
      color: "text-purple-500",
      status: "Wszystkie systemy sprawne",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {iotData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.status}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}