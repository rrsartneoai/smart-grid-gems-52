import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, ReferenceLine } from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const data = [
  { time: "00:00", consumption: 240, generation: 120, efficiency: 50 },
  { time: "04:00", consumption: 180, generation: 180, efficiency: 100 },
  { time: "08:00", consumption: 300, generation: 250, efficiency: 83 },
  { time: "12:00", consumption: 450, generation: 400, efficiency: 89 },
  { time: "16:00", consumption: 500, generation: 380, efficiency: 76 },
  { time: "20:00", consumption: 380, generation: 220, efficiency: 58 },
];

type MetricType = "all" | "consumption" | "generation" | "efficiency";

export const EnergyChart = () => {
  const [activeMetric, setActiveMetric] = useState<MetricType>("all");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const getVisibleMetrics = () => {
    switch (activeMetric) {
      case "consumption":
        return ["consumption"];
      case "generation":
        return ["generation"];
      case "efficiency":
        return ["efficiency"];
      default:
        return ["consumption", "generation"];
    }
  };

  const metrics = [
    { id: "all", label: "Wszystkie" },
    { id: "consumption", label: "Zużycie" },
    { id: "generation", label: "Generacja" },
    { id: "efficiency", label: "Wydajność" },
  ];

  return (
    <Card className="col-span-4 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Zużycie vs. Generacja Energii</span>
          <div className="flex gap-2">
            {metrics.map((metric) => (
              <Button
                key={metric.id}
                variant={activeMetric === metric.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMetric(metric.id as MetricType)}
                className="dark:border-gray-600"
              >
                {metric.label}
              </Button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data}
              onMouseMove={(e) => {
                if (e.activeTooltipIndex !== undefined) {
                  setHoveredPoint(e.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}kWh`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="grid gap-2">
                          <div className="font-medium">{label}</div>
                          {payload.map((entry, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="font-medium">
                                  {entry.name === "consumption"
                                    ? "Zużycie"
                                    : entry.name === "generation"
                                    ? "Generacja"
                                    : "Wydajność"}
                                </span>
                              </div>
                              <span className="font-medium">
                                {entry.value}
                                {entry.name === "efficiency" ? "%" : "kWh"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                content={({ payload }) => (
                  <div className="flex justify-center gap-4 py-2">
                    {payload?.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm font-medium dark:text-gray-300">
                          {entry.value === "consumption"
                            ? "Zużycie"
                            : entry.value === "generation"
                            ? "Generacja"
                            : "Wydajność"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              />
              {getVisibleMetrics().includes("consumption") && (
                <Line
                  type="monotone"
                  dataKey="consumption"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
              {getVisibleMetrics().includes("generation") && (
                <Line
                  type="monotone"
                  dataKey="generation"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
              {getVisibleMetrics().includes("efficiency") && (
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#ffc658"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
              {hoveredPoint !== null && (
                <ReferenceLine
                  x={data[hoveredPoint].time}
                  stroke="#888888"
                  strokeDasharray="3 3"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
};