import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTranslation } from "react-i18next";

interface ChartProps {
  data: Array<{
    time: string;
    consumption: number;
    efficiency: number;
  }>;
}

export function CorrelationChart({ data }: ChartProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-6 bg-[#0a0f1c] border-[#1f2937]">
      <h3 className="text-lg font-semibold mb-4 text-white">Analiza korelacji</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend 
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ 
                paddingTop: "20px",
                color: '#fff'
              }}
            />
            <Bar 
              dataKey="consumption" 
              name="Zużycie" 
              fill="#818cf8" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="efficiency" 
              name="Wydajność" 
              fill="#34d399"
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}