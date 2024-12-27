import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceArea,
} from "recharts";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function EnergyChart() {
  const { toast } = useToast();
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );
  const [zoomLeft, setZoomLeft] = useState(null);
  const [zoomRight, setZoomRight] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = (area) => {
    if (area.left === area.right || area.left === undefined) {
      setZoomLeft(null);
      setZoomRight(null);
      setIsZoomed(false);
      return;
    }

    setZoomLeft(area.left);
    setZoomRight(area.right);
    setIsZoomed(true);
  };

  const handleResetZoom = () => {
    setZoomLeft(null);
    setZoomRight(null);
    setIsZoomed(false);
  };

  const handleRefresh = () => {
    toast({
      title: "Dane odświeżone",
      description: "Wykres został zaktualizowany o najnowsze dane",
    });
  };

  return (
    <Card className="col-span-4 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Zużycie energii - {selectedCompany?.name}
        </h3>
        <div className="flex gap-2">
          {isZoomed && (
            <Button variant="outline" onClick={handleResetZoom} size="sm">
              Reset zoom
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Odśwież
          </Button>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={selectedCompany?.energyData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onMouseDown={(e) => setZoomLeft(e?.activeLabel)}
            onMouseMove={(e) => isZoomed && setZoomRight(e?.activeLabel)}
            onMouseUp={() => handleZoom({ left: zoomLeft, right: zoomRight })}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
              domain={isZoomed ? [zoomLeft, zoomRight] : ['auto', 'auto']}
            />
            <YAxis tick={{ fontSize: 12 }} tickMargin={10} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="consumption"
              name="Zużycie"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="production"
              name="Produkcja"
              stroke="#34d399"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="efficiency"
              name="Wydajność (%)"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            {zoomLeft && zoomRight && (
              <ReferenceArea
                x1={zoomLeft}
                x2={zoomRight}
                strokeOpacity={0.3}
                fill="rgba(96, 165, 250, 0.1)"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}