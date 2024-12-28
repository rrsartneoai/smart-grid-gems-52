export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
  }>;
  label?: string;
}

export interface ChartControlsProps {
  chartType: 'line' | 'bar' | 'composed';
  onChartTypeChange: (type: 'line' | 'bar' | 'composed') => void;
  isZoomed: boolean;
  onResetZoom: () => void;
  onExport: (format: 'pdf' | 'jpg') => void;
}

export interface ChartProps {
  data: any[];
  type: 'line' | 'bar' | 'composed';
  zoomLeft: string | null;
  zoomRight: string | null;
  onZoom: (area: { left?: string; right?: string }) => void;
}