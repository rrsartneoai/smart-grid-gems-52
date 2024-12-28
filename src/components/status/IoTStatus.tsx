import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu, Signal, Network, Database, Clock, Activity } from "lucide-react";
import { motion } from "framer-motion";

const StatusIndicator = ({ value }: { value: number }) => {
  const getColor = (value: number) => {
    if (value >= 80) return "bg-success";
    if (value >= 50) return "bg-warning";
    return "bg-danger";
  };

  return (
    <div className={`w-2 h-2 rounded-full ${getColor(value)} animate-pulse`} />
  );
};

const ProgressItem = ({ 
  label, 
  value, 
  icon: Icon, 
  description 
}: { 
  label: string; 
  value: number; 
  icon: any;
  description: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusIndicator value={value} />
        <span className="text-sm font-semibold">{value}%</span>
      </div>
    </div>
    <Progress 
      value={value} 
      className="h-2 bg-secondary"
      style={{
        background: 'hsl(var(--secondary))',
      }}
    />
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

export function IoTStatus() {
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  const getOverallStatus = (values: number[]) => {
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    if (average >= 80) return "Optymalny";
    if (average >= 50) return "Wymaga uwagi";
    return "Krytyczny";
  };

  const deviceStatus = [85, 92, 78];
  const systemStatus = [45, 60, 25];
  const overallStatus = getOverallStatus([...deviceStatus, ...systemStatus]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Status IoT - {selectedCompany?.name}
          </h2>
          <div className="flex items-center gap-2">
            <StatusIndicator value={deviceStatus[0]} />
            <span className="text-sm text-muted-foreground">
              Status ogólny: {overallStatus}
            </span>
          </div>
        </div>
        <div className="text-right">
          <Clock className="inline-block w-4 h-4 text-muted-foreground mr-1" />
          <span className="text-xs text-muted-foreground">
            Ostatnia aktualizacja: 5 min temu
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Status Urządzeń</h3>
          </div>
          <div className="space-y-6">
            <ProgressItem
              label="Aktywne urządzenia"
              value={85}
              icon={Cpu}
              description="Liczba urządzeń aktualnie online"
            />
            <ProgressItem
              label="Połączenie z siecią"
              value={92}
              icon={Network}
              description="Stabilność połączenia sieciowego"
            />
            <ProgressItem
              label="Jakość sygnału"
              value={78}
              icon={Signal}
              description="Siła i jakość sygnału IoT"
            />
          </div>
        </Card>

        <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Wydajność Systemu</h3>
          </div>
          <div className="space-y-6">
            <ProgressItem
              label="Wykorzystanie CPU"
              value={45}
              icon={Cpu}
              description="Aktualne obciążenie procesora"
            />
            <ProgressItem
              label="Wykorzystanie pamięci"
              value={60}
              icon={Database}
              description="Zużycie pamięci RAM"
            />
            <ProgressItem
              label="Opóźnienie sieci"
              value={25}
              icon={Network}
              description="Latencja połączenia sieciowego"
            />
          </div>
        </Card>
      </div>
    </motion.div>
  );
}