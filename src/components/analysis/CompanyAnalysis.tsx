import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Cpu, Database, Network } from "lucide-react";
import { companiesData } from "@/data/companies";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { PerformanceChart } from "./PerformanceChart";
import { useParams } from "react-router-dom";

const defaultMetrics = [
  { label: "Efficiency", value: 78, change: 5.2, icon: Cpu },
  { label: "Energy Usage", value: 64, change: -2.8, icon: Database },
  { label: "Network Load", value: 92, change: 8.1, icon: Network },
];

export function CompanyAnalysis() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { companyId } = useParams();

  const company = companiesData.find(c => c.id === companyId);
  const performanceData = company?.energyData.map(item => ({
    time: item.name,
    efficiency: item.efficiency,
    consumption: item.consumption,
    production: item.production,
  })) || [];

  const handleExport = async (format: 'excel' | 'csv' | 'pdf' | 'jpg') => {
    try {
      const data = performanceData.map(item => ({
        Time: item.time,
        Efficiency: item.efficiency,
        Consumption: item.consumption,
        Production: item.production,
      }));

      switch (format) {
        case 'excel': {
          const ws = XLSX.utils.json_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Analysis");
          XLSX.writeFile(wb, "analysis.xlsx");
          break;
        }
        case 'csv': {
          const ws = XLSX.utils.json_to_sheet(data);
          const csv = XLSX.utils.sheet_to_csv(ws);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.setAttribute("href", url);
          link.setAttribute("download", "analysis.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          break;
        }
        case 'pdf': {
          const doc = new jsPDF();
          doc.setFontSize(16);
          doc.text(t("analysis"), 20, 20);
          autoTable(doc, {
            head: [['Time', 'Efficiency', 'Consumption', 'Production']],
            body: data.map(item => [
              item.Time,
              `${item.Efficiency}%`,
              `${item.Consumption}kW`,
              `${item.Production}kW`
            ]),
            startY: 30,
          });
          doc.save("analysis.pdf");
          break;
        }
        case 'jpg': {
          const element = document.getElementById('analysis-content');
          if (element) {
            const canvas = await html2canvas(element);
            const url = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.download = 'analysis.jpg';
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
          break;
        }
      }

      toast({
        title: t("exportComplete"),
        description: t(`dataExportedTo${format.toUpperCase()}`),
      });
    } catch (error) {
      toast({
        title: t("exportError"),
        description: t("errorExportingData"),
        variant: "destructive",
      });
    }
  };

  const handleGenerateForecast = () => {
    toast({
      title: t("forecastGenerated"),
      description: t("forecastGeneratedDescription"),
    });
  };

  if (!company) {
    return <div className="p-6">{t("selectCompany")}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">{t("analysis")}</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => handleExport('excel')} size="sm" className="whitespace-nowrap">
            {t("exportExcel")}
          </Button>
          <Button onClick={() => handleExport('csv')} size="sm" className="whitespace-nowrap">
            {t("exportCSV")}
          </Button>
          <Button onClick={() => handleExport('pdf')} size="sm" className="whitespace-nowrap">
            {t("exportPDF")}
          </Button>
          <Button onClick={() => handleExport('jpg')} size="sm" className="whitespace-nowrap">
            {t("exportJPG")}
          </Button>
          <Button onClick={handleGenerateForecast} variant="secondary" size="sm" className="whitespace-nowrap">
            {t("generateForecast")}
          </Button>
        </div>
      </div>

      <div id="analysis-content" className="space-y-6">
        <PerformanceMetrics metrics={defaultMetrics} />
        <PerformanceChart data={performanceData} />
      </div>
    </div>
  );
}