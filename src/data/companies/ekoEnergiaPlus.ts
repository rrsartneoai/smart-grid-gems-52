import { Company, EnergyData } from "@/types/company";
import { Battery, Cpu, Activity } from "lucide-react";

const energyData: EnergyData[] = [
  {
    name: "Zużycie energii",
    consumption: "450",
    production: "600",
    efficiency: "75",
    value: "450",
    timestamp: "2024-03-10T10:00:00"
  },
  {
    name: "Produkcja energii",
    consumption: "600",
    production: "600",
    efficiency: "100",
    value: "600",
    timestamp: "2024-03-10T10:00:00"
  },
  {
    name: "Efektywność",
    consumption: "450",
    production: "600",
    efficiency: "75",
    value: "75",
    timestamp: "2024-03-10T10:00:00"
  }
];

const historicalData = [
  { value: "42", timestamp: "2024-03-10T10:00:00" },
  { value: "45", timestamp: "2024-03-10T11:00:00" },
  { value: "48", timestamp: "2024-03-10T12:00:00" },
  { value: "51", timestamp: "2024-03-10T13:00:00" },
  { value: "53", timestamp: "2024-03-10T14:00:00" },
  { value: "55", timestamp: "2024-03-10T15:00:00" },
  { value: "58", timestamp: "2024-03-10T16:00:00" },
  { value: "60", timestamp: "2024-03-10T17:00:00" }
];

export const ekoEnergiaPlus: Company = {
  id: "eko-energia-plus",
  name: "Eko Energia Plus",
  description: "Dostawca zielonej energii",
  stats: [
    {
      title: "Zużycie energii",
      value: 450,
      unit: "kWh",
      description: "Aktualne zużycie energii",
      icon: Battery,
      details: [
        { label: "Szczyt dzienny", value: "520 kWh" },
        { label: "Minimum nocne", value: "180 kWh" },
        { label: "Średnia 7-dniowa", value: "385 kWh" }
      ]
    },
    {
      title: "Produkcja energii",
      value: 600,
      unit: "kWh",
      description: "Aktualna produkcja energii",
      icon: Cpu,
      details: [
        { label: "Panele słoneczne", value: "420 kWh" },
        { label: "Turbiny wiatrowe", value: "180 kWh" },
        { label: "Sprawność systemu", value: "92%" }
      ]
    },
    {
      title: "Efektywność",
      value: 75,
      unit: "%",
      description: "Ogólna efektywność systemu",
      icon: Activity,
      details: [
        { label: "Straty przesyłowe", value: "8%" },
        { label: "Wykorzystanie energii", value: "67%" },
        { label: "Potencjał optymalizacji", value: "15%" }
      ]
    }
  ],
  energyData,
  historicalData
};