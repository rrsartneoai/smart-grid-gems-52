export interface EnergyData {
  name: string;
  consumption: number;
  production: number;
  efficiency: number;
}

export interface Company {
  id: string;
  name: string;
  description?: string;
  stats: Stat[];
  energyData: EnergyData[];
  historicalData?: HistoricalData[];
}

export interface Stat {
  title: string;
  value: number | string;
  unit?: string;
  description: string;
  icon: React.ElementType;
  details: Detail[];
}

export interface Detail {
  label: string;
  value: string;
}

export interface HistoricalData {
  value: string;
  timestamp: string;
}

export interface CompanyStoreState {
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;
}