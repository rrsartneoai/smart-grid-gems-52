import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Cpu, Database, Network } from "lucide-react";

const mockData = {
  performance: Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    efficiency: Math.floor(Math.random() * 30) + 60,
    consumption: Math.floor(Math.random() * 40) + 40,
    production: Math.floor(Math.random() * 50) + 30,
  })),
  metrics: [
    { label: "Efficiency", value: 78, change: 5.2, icon: Cpu },
    { label: "Energy Usage", value: 64, change: -2.8, icon: Database },
    { label: "Network Load", value: 92, change: 8.1, icon: Network },
  ],
};

export function CompanyAnalysis() {
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleExport = async (format: 'excel' | 'csv' | 'pdf' | 'jpg') => {
    try {
      const data = mockData.performance.map(item => ({
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
          <Button variant="secondary" size="sm" className="whitespace-nowrap">
            {t("generateForecast")}
          </Button>
        </div>
      </div>

      <div id="analysis-content" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {mockData.metrics.map((metric, index) => (
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

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">{t("performanceOverTime")}</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.performance}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  name={t("efficiency")}
                  stroke="#ef4444"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="consumption"
                  name={t("consumption")}
                  stroke="#34d399"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="production"
                  name={t("production")}
                  stroke="#60a5fa"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}