import { FloatingChatbot } from "../FloatingChatbot";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { Wifi, WifiOff, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function IoTStatus() {
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  // Adjust devices based on company ID
  const devices = [
    {
      id: 1,
      name: `Smart Meter #${selectedCompanyId}`,
      status: "online",
      lastUpdate: "2 min ago",
      signal: 95 - (selectedCompanyId * 5),
      battery: 80 - (selectedCompanyId * 3),
    },
    {
      id: 2,
      name: `Energy Monitor #${selectedCompanyId}`,
      status: selectedCompanyId % 2 === 0 ? "warning" : "online",
      lastUpdate: "5 min ago",
      signal: 65 - (selectedCompanyId * 2),
      battery: 30 + (selectedCompanyId * 5),
    },
    {
      id: 3,
      name: `Power Sensor #${selectedCompanyId}`,
      status: selectedCompanyId % 3 === 0 ? "offline" : "online",
      lastUpdate: "1 hour ago",
      signal: selectedCompanyId % 3 === 0 ? 0 : 75,
      battery: 15 + (selectedCompanyId * 4),
    },
    {
      id: 4,
      name: `Grid Analyzer #${selectedCompanyId}`,
      status: "online",
      lastUpdate: "1 min ago",
      signal: 88 - (selectedCompanyId * 3),
      battery: 90 - (selectedCompanyId * 2),
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
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "offline":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "warning":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <div className="relative">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6"
      >
        Status urządzeń IoT - {selectedCompany?.name}
      </motion.h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {devices.map((device, index) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 hover:shadow-lg transition-shadow">
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
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Signal</span>
                    <span className="font-medium">{device.signal}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${device.signal}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Battery</span>
                    <span className="font-medium">{device.battery}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${device.battery}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        device.battery > 50
                          ? "bg-green-500"
                          : device.battery > 20
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}