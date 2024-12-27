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
    { timestamp: "00:00", consumption: 2400 },
    { timestamp: "03:00", consumption: 1398 },
    { timestamp: "06:00", consumption: 9800 },
    { timestamp: "09:00", consumption: 3908 },
    { timestamp: "12:00", consumption: 4800 },
    { timestamp: "15:00", consumption: 3800 },
    { timestamp: "18:00", consumption: 4300 },
    { timestamp: "21:00", consumption: 2400 },
  ],
};