import { FloatingChatbot } from "../FloatingChatbot";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { Wifi, WifiOff, AlertTriangle, CheckCircle2 } from "lucide-react";

export function IoTStatus() {
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  const devices = [
    {
      id: 1,
      name: "Smart Meter #1",
      status: "online",
      lastUpdate: "2 min ago",
      signal: 95,
      battery: 80,
    },
    {
      id: 2,
      name: "Energy Monitor #2",
      status: "warning",
      lastUpdate: "5 min ago",
      signal: 65,
      battery: 30,
    },
    {
      id: 3,
      name: "Power Sensor #3",
      status: "offline",
      lastUpdate: "1 hour ago",
      signal: 0,
      battery: 15,
    },
    {
      id: 4,
      name: "Grid Analyzer #4",
      status: "online",
      lastUpdate: "1 min ago",
      signal: 88,
      battery: 90,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Wifi className="h-4 w-4 text-green-500" />;
      case "offline":
        return <WifiOff className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6">
        Status urządzeń IoT - {selectedCompany?.name}
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {devices.map((device) => (
          <Card key={device.id} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold">{device.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Last update: {device.lastUpdate}
                </p>
              </div>
              <Badge variant="outline" className={getStatusColor(device.status)}>
                {getStatusIcon(device.status)}
                <span className="ml-1 capitalize">{device.status}</span>
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Signal</span>
                <div className="flex items-center">
                  <span className="font-medium">{device.signal}%</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full ml-2">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${device.signal}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Battery</span>
                <div className="flex items-center">
                  <span className="font-medium">{device.battery}%</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full ml-2">
                    <div
                      className={`h-full rounded-full ${
                        device.battery > 50
                          ? "bg-green-500"
                          : device.battery > 20
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${device.battery}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <FloatingChatbot />
    </div>
  );
}