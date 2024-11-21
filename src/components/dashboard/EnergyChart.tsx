import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "00:00", consumption: 240, generation: 120 },
  { time: "04:00", consumption: 180, generation: 180 },
  { time: "08:00", consumption: 300, generation: 250 },
  { time: "12:00", consumption: 450, generation: 400 },
  { time: "16:00", consumption: 500, generation: 380 },
  { time: "20:00", consumption: 380, generation: 220 },
];

export const EnergyChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Zużycie vs. Generacja Energii</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
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
            <Tooltip />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="generation"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};