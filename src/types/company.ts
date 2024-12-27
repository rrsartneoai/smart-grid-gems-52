import { LucideIcon } from "lucide-react";

export interface CompanyStats {
  title: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  description: string;
  details: { label: string; value: string }[];
}

export interface EnergyData {
  name: string;
  consumption: number;
  production: number;
  efficiency: number;
}

export interface Company {
  id: string; // Zmieniono z number na string
  name: string;
  stats: CompanyStats[];
  energyData: EnergyData[];
}

export interface CompanyStoreState {
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string) => void;
}