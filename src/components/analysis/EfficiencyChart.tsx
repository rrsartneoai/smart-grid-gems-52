import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from "react-i18next";

interface ChartProps {
  data: Array<{
    time: string;
    efficiency: number;
  }>;
}

export function EfficiencyChart({ data }: ChartProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-6 bg-[#0a0f1c] border-[#1f2937]">
      <h3 className="text-lg font-semibold mb-4 text-white">Analiza wydajności</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area
              type="monotone"
              dataKey="efficiency"
              name="Wydajność"
              stroke="#818cf8"
              fill="#818cf8"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}