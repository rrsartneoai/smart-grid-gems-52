import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MetricProps {
  metrics: Array<{
    label: string;
    value: number;
    change: number;
    icon: any;
  }>;
}

export function PerformanceMetrics({ metrics }: MetricProps) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <metric.icon className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-medium">{t(metric.label)}</h3>
            </div>
            <Badge variant="secondary" className="gap-1">
              {metric.change > 0 ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span className={metric.change > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(metric.change)}%
              </span>
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t("current")}</span>
              <span className="font-medium">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        </Card>
      ))}
    </div>
  );
}