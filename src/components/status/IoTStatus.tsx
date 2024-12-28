import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Signal, Network, Database } from "lucide-react";
import { StatusHeader } from "./StatusHeader";
import { StatusCard } from "./StatusCard";
import { DeviceStatusDetail } from "./DeviceStatusDetail";
import { SystemPerformanceDetail } from "./SystemPerformanceDetail";
import { Button } from "@/components/ui/button";

export function IoTStatus() {
  const [activeView, setActiveView] = useState<'overview' | 'devices' | 'system'>('overview');

  const deviceItems = [
    {
      label: "Aktywne urządzenia",
      value: 85,
      icon: Cpu,
      description: "Liczba urządzeń obecnie online",
      onClick: () => setActiveView('devices')
    },
    {
      label: "Połączenie sieciowe",
      value: 92,
      icon: Network,
      description: "Stabilność połączenia sieciowego",
      onClick: () => setActiveView('devices')
    },
    {
      label: "Jakość sygnału",
      value: 78,
      icon: Signal,
      description: "Siła i jakość sygnału IoT",
      onClick: () => setActiveView('devices')
    }
  ];

  const systemItems = [
    {
      label: "Użycie CPU",
      value: 45,
      icon: Cpu,
      description: "Obecne obciążenie CPU",
      onClick: () => setActiveView('system')
    },
    {
      label: "Użycie pamięci",
      value: 60,
      icon: Database,
      description: "Wykorzystanie pamięci RAM",
      onClick: () => setActiveView('system')
    },
    {
      label: "Opóźnienie sieci",
      value: 25,
      icon: Network,
      description: "Opóźnienie połączenia sieciowego",
      onClick: () => setActiveView('system')
    }
  ];

  if (activeView === 'devices') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setActiveView('overview')}
            className="mb-4"
          >
            ← Powrót do przeglądu
          </Button>
        </div>
        <DeviceStatusDetail />
      </motion.div>
    );
  }

  if (activeView === 'system') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setActiveView('overview')}
            className="mb-4"
          >
            ← Powrót do przeglądu
          </Button>
        </div>
        <SystemPerformanceDetail />
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6"
    >
      <StatusHeader />
      <div className="grid gap-6 md:grid-cols-2">
        <StatusCard title="Status urządzeń" items={deviceItems} />
        <StatusCard title="Wydajność systemu" items={systemItems} />
      </div>
    </motion.div>
  );
}