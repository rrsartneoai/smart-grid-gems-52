import { Battery, Cloud, Cpu, Network, Power, Zap } from "lucide-react";
import { Company } from "@/types/company";

export const ekoEnergiaPlus: Company = {
  id: "1",
  name: "EkoEnergia Plus",
  stats: [
    {
      title: "Moc całkowita",
      value: "2.4",
      unit: "MW",
      icon: Power,
      description: "Aktualna moc całkowita systemu",
      details: [
        { label: "Szczyt dzienny", value: "2.8 MW" },
        { label: "Minimum nocne", value: "0.9 MW" },
        { label: "Średnia 24h", value: "1.9 MW" }
      ]
    },
    {
      title: "Wydajność",
      value: "87",
      unit: "%",
      icon: Zap,
      description: "Ogólna wydajność systemu",
      details: [
        { label: "Straty przesyłowe", value: "3%" },
        { label: "Sprawność konwersji", value: "92%" },
        { label: "Dostępność", value: "99.9%" }
      ]
    },
    {
      title: "Stan baterii",
      value: "75",
      unit: "%",
      icon: Battery,
      description: "Stan naładowania magazynów energii",
      details: [
        { label: "Temperatura", value: "23°C" },
        { label: "Cykle ładowania", value: "1,234" },
        { label: "Żywotność", value: "89%" }
      ]
    },
    {
      title: "Obciążenie sieci",
      value: "65",
      unit: "%",
      icon: Network,
      description: "Aktualne obciążenie sieci",
      details: [
        { label: "Punkty szczytowe", value: "82%" },
        { label: "Stabilność", value: "97%" },
        { label: "Rezerwa mocy", value: "35%" }
      ]
    }
  ],
  energyData: [
    { name: "00:00", consumption: 2400, production: 2000, efficiency: 83 },
    { name: "03:00", consumption: 1398, production: 1200, efficiency: 86 },
    { name: "06:00", consumption: 9800, production: 8500, efficiency: 87 },
    { name: "09:00", consumption: 3908, production: 3500, efficiency: 90 },
    { name: "12:00", consumption: 4800, production: 4200, efficiency: 88 },
    { name: "15:00", consumption: 3800, production: 3400, efficiency: 89 },
    { name: "18:00", consumption: 4300, production: 3800, efficiency: 88 },
    { name: "21:00", consumption: 2400, production: 2100, efficiency: 87 },
  ],
};