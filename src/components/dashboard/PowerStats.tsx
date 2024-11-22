import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Cpu, Zap, Power, DollarSign, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const stats = [
  {
    title: "Ladunek",
    value: "13,819",
    unit: "MW",
    icon: Power,
    description: "↗️ +5.2% od ostatniego dnia",
    details: [
      { label: "Szczyt dzienny", value: "14,234 MW" },
      { label: "Minimum", value: "12,567 MW" },
      { label: "Średnia", value: "13,456 MW" },
    ],
  },
  {
    title: "Obciążenie netto",
    value: "12,423",
    unit: "MW",
    icon: Zap,
    description: "↘️ -0.8% od ostatniej godziny",
    details: [
      { label: "Szczyt", value: "13,100 MW" },
      { label: "Minimum dzienne", value: "11,890 MW" },
      { label: "Prognoza", value: "12,500 MW" },
    ],
  },
  {
    title: "Cena",
    value: "27.82",
    unit: "/MWh",
    icon: DollarSign,
    description: "↗️ +2.4% od ostatniego odczytu",
    details: [
      { label: "Maksymalna", value: "32.45 /MWh" },
      { label: "Minimalna", value: "24.12 /MWh" },
      { label: "Średnia dzienna", value: "26.98 /MWh" },
    ],
  },
  {
    title: "Główne źródło",
    value: "Gaz ziemny",
    icon: Flame,
    description: "67.3% udziału w miksie",
    details: [
      { label: "Wydajność", value: "94.2%" },
      { label: "Emisja CO2", value: "450 g/kWh" },
      { label: "Moc nominalna", value: "15,000 MW" },
    ],
  },
  {
    title: "Pobór",
    value: "245.8",
    unit: "kWh",
    icon: Zap,
    description: "↗️ +5.2% od ostatniego dnia",
    details: [
      { label: "Szczyt dzienny", value: "42.3 kWh" },
      { label: "Średnia godzinowa", value: "14.4 kWh" },
      { label: "Prognoza dzienna", value: "350.8 kWh" },
    ],
  },
  {
    title: "Wydajność sieci",
    value: "94.2",
    unit: "%",
    icon: Cpu,
    description: "↘️ -0.8% od ostatniej godziny",
    details: [
      { label: "Straty", value: "5.8%" },
      { label: "Przepustowość", value: "89.2 Mb/s" },
      { label: "Opóźnienie", value: "24ms" },
    ],
  },
  {
    title: "Stan Magazynowania",
    value: "78.5",
    unit: "%",
    icon: Battery,
    description: "↗️ +2.4% od ostatniego odczytu",
    details: [
      { label: "Pojemność całkowita", value: "500 kWh" },
      { label: "Dostępna energia", value: "410 kWh" },
      { label: "Czas do pełnego", value: "2.5h" },
    ],
  },
  {
    title: "Obciążenie sieci",
    value: "67.3",
    unit: "%",
    icon: Cpu,
    description: "↗️ +1.2% od ostatniej godziny",
    details: [
      { label: "Maksymalne", value: "85%" },
      { label: "Minimalne", value: "45%" },
      { label: "Średnie", value: "62%" },
    ],
  },
];

export const PowerStats = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="col-span-1"
        >
          <Card
            className="cursor-pointer transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value}
                {stat.unit && <span className="text-sm ml-1">{stat.unit}</span>}
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              
              {expandedCard === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-2"
                >
                  {stat.details.map((detail, detailIndex) => (
                    <div
                      key={detail.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {detail.label}
                      </span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </>
    </>
  );
};