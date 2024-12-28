import { LucideIcon } from "lucide-react";

export interface EnergyData {
  name: string;
  consumption: number;
  production: number;
  efficiency: number;
  timestamp?: string; // Make timestamp optional to maintain compatibility
}

export interface Company {
  id: string;
  name: string;
  stats: Array<{
    title: string;
    value: number | string;
    unit?: string;
    icon: LucideIcon;
    description: string;
    details: Array<{
      label: string;
      value: string;
    }>;
  }>;
  energyData: EnergyData[];
}