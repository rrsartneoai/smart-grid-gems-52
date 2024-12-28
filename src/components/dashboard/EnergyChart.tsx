import { Card } from "@/components/ui/card";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ResponsiveContainer } from "recharts";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ChartControls } from "./charts/ChartControls";
import { Chart } from "./charts/Chart";

export function EnergyChart() {
  const { toast } = useToast();
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );
  const [zoomLeft, setZoomLeft] = useState<string | null>(null);
  const [zoomRight, setZoomRight] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [chartType, setChartType] = useState<'line' | 'bar' | 'composed'>('line');
  const chartRef = useRef<HTMLDivElement>(null);

  const handleZoom = (area: { left?: string; right?: string }) => {
    if (!area.left || !area.right || area.left === area.right) {
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

  const handleExport = async (format: 'pdf' | 'jpg') => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current);
      
      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('chart-export.pdf');
        
        toast({
          title: "Wykres wyeksportowany",
          description: "Plik PDF został pobrany",
        });
      } else {
        const link = document.createElement('a');
        link.download = 'chart-export.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
        
        toast({
          title: "Wykres wyeksportowany",
          description: "Plik JPG został pobrany",
        });
      }
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować wykresu",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="col-span-4 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            Zużycie energii - {selectedCompany?.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            Monitorowanie zużycia, produkcji i wydajności w czasie rzeczywistym
          </p>
        </div>
        <ChartControls
          chartType={chartType}
          onChartTypeChange={setChartType}
          isZoomed={isZoomed}
          onResetZoom={handleResetZoom}
          onExport={handleExport}
        />
      </div>
      
      <div ref={chartRef} className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Chart
            data={selectedCompany?.energyData}
            type={chartType}
            zoomLeft={zoomLeft}
            zoomRight={zoomRight}
            onZoom={handleZoom}
          />
        </ResponsiveContainer>
      </div>
    </Card>
  );
}