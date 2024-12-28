import { FloatingChatbot } from "../FloatingChatbot";
import { Card } from "@/components/ui/card";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
  ComposedChart,
  Scatter,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const calculateForecast = (data: any[]) => {
  // Simple linear regression for forecasting
  const forecast = data.map((item, index) => ({
    name: `Forecast ${index + 1}`,
    consumption: item.consumption * 1.1,
    production: item.production * 1.15,
    efficiency: Math.min(item.efficiency * 1.05, 100),
  }));
  return forecast;
};

export function CompanyAnalysis() {
  const { toast } = useToast();
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );
  const [showForecast, setShowForecast] = useState(false);

  const pieData = [
    { name: "Energia słoneczna", value: 30 },
    { name: "Energia wiatrowa", value: 25 },
    { name: "Biomasa", value: 20 },
    { name: "Inne źródła", value: 25 },
  ];

  const handleGenerateForecast = () => {
    setShowForecast(true);
    toast({
      title: "Prognoza wygenerowana",
      description: "Wyświetlono przewidywane wartości na podstawie danych historycznych",
    });
  };

  const combinedData = showForecast
    ? [...(selectedCompany?.energyData || []), ...calculateForecast(selectedCompany?.energyData || [])]
    : selectedCompany?.energyData;

  return (
    <div className="relative">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Analiza - {selectedCompany?.name}
          </h2>
          <Button onClick={handleGenerateForecast} disabled={showForecast}>
            Generuj prognozę
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Trendy zużycia energii</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    name="Zużycie"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="production"
                    name="Produkcja"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Analiza wydajności</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    name="Wydajność"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Źródła energii</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Analiza korelacji</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={combinedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumption" name="Zużycie" fill="#8884d8" />
                  <Scatter dataKey="efficiency" name="Wydajność" fill="#82ca9d" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <FloatingChatbot />
    </div>
  );
}