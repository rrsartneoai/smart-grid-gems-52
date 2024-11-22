import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const stats = [
  {
    title: "Całkowite Zużycie",
    value: "345.2 kWh",
    icon: Zap,
    description: "↗️ +2.1% od ostatniego dnia",
    details: [
      { label: "Szczyt dzienny", value: "42.3 kWh" },
      { label: "Średnia godzinowa", value: "14.4 kWh" },
      { label: "Prognoza dzienna", value: "350.8 kWh" },
    ],
  },
  {
    title: "Obciążenie Sieci",
    value: "76%",
    icon: Cpu,
    description: "↘️ -0.4% od ostatniej godziny",
    details: [
      { label: "Aktywne połączenia", value: "1,234" },
      { label: "Przepustowość", value: "89.2 Mb/s" },
      { label: "Opóźnienie", value: "24ms" },
    ],
  },
  {
    title: "Stan Magazynowania",
    value: "82%",
    icon: Battery,
    description: "↗️ +12% od ostatniego odczytu",
    details: [
      { label: "Pojemność całkowita", value: "500 kWh" },
      { label: "Dostępna energia", value: "410 kWh" },
      { label: "Czas do pełnego", value: "2.5h" },
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
              <div className="text-2xl font-bold">{stat.value}</div>
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
      ))}
    </>
  );
};