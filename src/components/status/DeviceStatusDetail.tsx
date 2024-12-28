import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu, Database, Network } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useTranslation } from 'react-i18next';

const mockHistoricalData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  cpuUsage: Math.floor(Math.random() * 30) + 30,
  memoryUsage: Math.floor(Math.random() * 20) + 50,
  networkLatency: Math.floor(Math.random() * 15) + 15,
}));

export const DeviceStatusDetail = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const exportToExcel = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(mockHistoricalData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Device Status");
      XLSX.writeFile(wb, "device-status.xlsx");

      toast({
        title: t("exportComplete"),
        description: t("dataExportedToExcel"),
      });
    } catch (error) {
      toast({
        title: t("exportError"),
        description: t("errorExportingData"),
        variant: "destructive",
      });
    }
  };

  const exportToCSV = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(mockHistoricalData);
      const csv = XLSX.utils.sheet_to_csv(ws);
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "device-status.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: t("exportComplete"),
        description: t("dataExportedToCSV"),
      });
    } catch (error) {
      toast({
        title: t("exportError"),
        description: t("errorExportingData"),
        variant: "destructive",
      });
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text(t("deviceStatusDetails"), 20, 20);

      autoTable(doc, {
        head: [['Time', 'CPU Usage', 'Memory Usage', 'Network Latency']],
        body: mockHistoricalData.map(data => [
          data.time,
          `${data.cpuUsage}%`,
          `${data.memoryUsage}%`,
          `${data.networkLatency}ms`
        ]),
        startY: 30,
      });

      doc.save("device-status.pdf");

      toast({
        title: t("exportComplete"),
        description: t("dataExportedToPDF"),
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
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold">{t("deviceStatusDetails")}</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportToPDF} className="whitespace-nowrap">
            {t("exportPDF")}
          </Button>
          <Button onClick={exportToExcel} className="whitespace-nowrap">
            {t("exportExcel")}
          </Button>
          <Button onClick={exportToCSV} className="whitespace-nowrap">
            {t("exportCSV")}
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{t("historicalData")}</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="cpuUsage" 
                name={t("cpuUsage")}
                stroke="#ef4444" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="memoryUsage" 
                name={t("memoryUsage")}
                stroke="#34d399" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="networkLatency" 
                name={t("networkLatency")}
                stroke="#60a5fa" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Cpu, label: t("cpuUsage"), value: 45 },
          { icon: Database, label: t("memoryUsage"), value: 60 },
          { icon: Network, label: t("networkLatency"), value: 25 }
        ].map((item, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <item.icon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{item.label}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t("current")}</span>
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
