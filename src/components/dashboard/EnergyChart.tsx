import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "00:00", value: 400 },
  { name: "04:00", value: 300 },
  { name: "08:00", value: 600 },
  { name: "12:00", value: 800 },
  { name: "16:00", value: 700 },
  { name: "20:00", value: 500 },
  { name: "23:59", value: 400 },
];

export function EnergyChart() {
  return (
    <Card className="col-span-4 p-6">
      <h3 className="mb-4 text-lg font-semibold">Zużycie energii (24h)</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}