import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from "react-i18next";

const COLORS = ['#3b82f6', '#34d399', '#fbbf24', '#ef4444'];

interface ChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function EnergySourcesChart({ data }: ChartProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-6 bg-[#0a0f1c] border-[#1f2937]">
      <h3 className="text-lg font-semibold mb-4 text-white">Źródła energii</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}