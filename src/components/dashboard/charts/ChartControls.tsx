import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart2, LineChart as LineChartIcon, ZoomIn } from "lucide-react";
import { ChartControlsProps } from "./types";

export const ChartControls = ({
  chartType,
  onChartTypeChange,
  isZoomed,
  onResetZoom,
  onExport,
}: ChartControlsProps) => {
  return (
    <div className="flex gap-2">
      <Select
        value={chartType}
        onValueChange={(value: 'line' | 'bar' | 'composed') => onChartTypeChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Wybierz typ wykresu" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="line">
            <div className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span>Wykres liniowy</span>
            </div>
          </SelectItem>
          <SelectItem value="bar">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Wykres słupkowy</span>
            </div>
          </SelectItem>
          <SelectItem value="composed">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Wykres złożony</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      {isZoomed && (
        <Button variant="outline" onClick={onResetZoom} size="sm">
          <ZoomIn className="h-4 w-4 mr-2" />
          Reset zoom
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onExport('pdf')}
        className="gap-2"
      >
        Eksportuj PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onExport('jpg')}
        className="gap-2"
      >
        Eksportuj JPG
      </Button>
    </div>
  );
};