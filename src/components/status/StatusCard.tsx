import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";

interface StatusCardProps {
  title: string;
  items: Array<{
    label: string;
    value: number;
    icon: React.ComponentType<any>;
    description: string;
    onClick?: () => void;
  }>;
}

export const StatusCard = ({ title, items }: StatusCardProps) => {
  return (
    <Card className="p-6 bg-card hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-2 cursor-pointer" onClick={item.onClick}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusIndicator value={item.value} />
                <span className="text-sm font-semibold">{item.value}%</span>
              </div>
            </div>
            <Progress value={item.value} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
};

const StatusIndicator = ({ value }: { value: number }) => {
  if (value >= 80) return <span className="text-success">●</span>;
  if (value >= 50) return <span className="text-warning">●</span>;
  return <span className="text-danger">●</span>;
};