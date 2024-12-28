import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation } from "react-i18next";

interface ChartProps {
  data: Array<{
    time: string;
    efficiency: number;
    consumption: number;
    production: number;
  }>;
}

export function PerformanceChart({ data }: ChartProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t("wydajnośćWCzasie")}</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: "20px" }}
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              name={t("efficiency")}
              stroke="#ef4444"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="consumption"
              name={t("consumption")}
              stroke="#34d399"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="production"
              name={t("production")}
              stroke="#60a5fa"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}