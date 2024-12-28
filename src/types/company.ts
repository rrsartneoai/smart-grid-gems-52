export interface EnergyData {
  name: string;
  consumption: string;
  production: string;
  efficiency: string;
  value: string;
  timestamp?: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  stats: Stat[];
  energyData: EnergyData[];
  historicalData: HistoricalData[];
}

export interface Stat {
  title: string;
  value: number;
  unit: string;
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
