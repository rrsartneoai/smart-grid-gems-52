import { Company } from "@/types/company";
import { Activity, Battery, Cpu, DollarSign, Flame, Gauge, Power, Zap } from "lucide-react";

export const ekoEnergiaPlus: Company = {
  id: "3", // Changed from number to string
  stats: [
    {
      title: "Ladunek",
      value: "18,923",
      unit: "MW",
      icon: Power,
      description: "↗️ +4.5% od ostatniego dnia",
      details: [
        { label: "Szczyt dzienny", value: "19,234 MW" },
        { label: "Minimum", value: "17,567 MW" },
        { label: "Średnia", value: "18,456 MW" },
      ],
    },
    {
      title: "Obciążenie netto",
      value: "17,456",
      unit: "MW",
      icon: Zap,
      description: "↘️ -1.0% od ostatniej godziny",
      details: [
        { label: "Szczyt", value: "18,000 MW" },
        { label: "Minimum dzienne", value: "16,500 MW" },
        { label: "Prognoza", value: "17,000 MW" },
      ],
    },
    {
      title: "Cena",
      value: "29.00",
      unit: "/MWh",
      icon: DollarSign,
      description: "↗️ +1.0% od ostatniego odczytu",
      details: [
        { label: "Maksymalna", value: "31.00 /MWh" },
        { label: "Minimalna", value: "28.00 /MWh" },
        { label: "Średnia dzienna", value: "29.50 /MWh" },
      ],
    },
    {
      title: "Główne źródło",
      value: "Energia wiatrowa",
      icon: Flame,
      description: "80% udziału w miksie",
      details: [
        { label: "Wydajność", value: "95%" },
        { label: "Emisja CO2", value: "150 g/kWh" },
        { label: "Moc nominalna", value: "18,000 MW" },
      ],
    },
    {
      title: "Częstotliwość sieci",
      value: "50.01",
      unit: "Hz",
      icon: Activity,
      description: "Stabilna częstotliwość",
      details: [
        { label: "Min", value: "49.97 Hz" },
        { label: "Max", value: "50.03 Hz" },
        { label: "Średnia", value: "50.00 Hz" },
      ],
    },
    {
      title: "Wydajność systemu",
      value: "94.5",
      unit: "%",
      icon: Gauge,
      description: "Wysoka wydajność",
      details: [
        { label: "Dzienna", value: "94.2%" },
        { label: "Tygodniowa", value: "94.8%" },
        { label: "Miesięczna", value: "94.3%" },
      ],
    },
    {
      title: "Status baterii",
      value: "85",
      unit: "%",
      icon: Battery,
      description: "Optymalny poziom",
      details: [
        { label: "Czas ładowania", value: "2.5h" },
        { label: "Pojemność", value: "500 kWh" },
        { label: "Żywotność", value: "95%" },
      ],
    },
    {
      title: "Wydajność CPU",
      value: "78",
      unit: "%",
      icon: Cpu,
      description: "Normalne obciążenie",
      details: [
        { label: "Temperatura", value: "45°C" },
        { label: "Wykorzystanie RAM", value: "6.2 GB" },
        { label: "Procesy", value: "124" },
      ],
    }
  ],
  energyData: [
    { name: "00:00", consumption: 550, production: 500, efficiency: 91 },
    { name: "04:00", consumption: 480, production: 450, efficiency: 94 },
    { name: "08:00", consumption: 750, production: 700, efficiency: 93 },
    { name: "12:00", consumption: 950, production: 900, efficiency: 95 },
    { name: "16:00", consumption: 850, production: 800, efficiency: 94 },
    { name: "20:00", consumption: 650, production: 600, efficiency: 92 },
    { name: "23:59", consumption: 550, production: 500, efficiency: 91 },
  ],
};
