import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu, Signal, Network } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const mockHistoricalData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  activeDevices: Math.floor(Math.random() * 20) + 70,
  networkConnection: Math.floor(Math.random() * 15) + 80,
  signalQuality: Math.floor(Math.random() * 25) + 60,
}));

export const DeviceStatusDetail = () => {
  const { toast } = useToast();

  const handleExport = (format: 'pdf' | 'csv') => {
    toast({
      title: "Export initiated",
      description: `Exporting data as ${format.toUpperCase()}...`,
    });
    // Implement actual export logic here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Device Status Details</h2>
        <div className="space-x-2">
          <Button onClick={() => handleExport('pdf')}>Export PDF</Button>
          <Button onClick={() => handleExport('csv')}>Export CSV</Button>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Historical Data</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="activeDevices" 
                name="Active Devices" 
                stroke="#ef4444" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="networkConnection" 
                name="Network Connection" 
                stroke="#34d399" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="signalQuality" 
                name="Signal Quality" 
                stroke="#60a5fa" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Cpu, label: "Active Devices", value: 85 },
          { icon: Network, label: "Network Connection", value: 92 },
          { icon: Signal, label: "Signal Quality", value: 78 }
        ].map((item, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <item.icon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{item.label}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current</span>
                <span className="font-medium">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};