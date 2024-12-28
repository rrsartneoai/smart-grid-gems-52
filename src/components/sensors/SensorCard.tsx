import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SensorCardProps {
  icon: ReactNode;
  name: string;
  value: string;
  unit: string;
  status: "Good" | "Warning";
  description: string;
}

export const SensorCard = ({ icon, name, value, unit, status, description }: SensorCardProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className="p-4 hover:scale-105 transition-transform duration-200">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground">{icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{name}</span>
                <Badge
                  variant="outline"
                  className={`${
                    status === "Good"
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  }`}
                >
                  {status}
                </Badge>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-semibold">{value}</span>
                <span className="text-sm text-muted-foreground">{unit}</span>
              </div>
            </div>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px] text-sm">
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);