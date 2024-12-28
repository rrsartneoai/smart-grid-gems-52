import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Cpu, Signal, Network } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const mockHistoricalData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  activeDevices: Math.floor(Math.random() * 20) + 70,
  networkConnection: Math.floor(Math.random() * 15) + 80,
  signalQuality: Math.floor(Math.random() * 25) + 60,
}));

export const DeviceStatusDetail = () => {
  const { toast } = useToast();

  const handleExport = async (format: 'pdf' | 'csv' | 'xlsx') => {
    try {
      if (format === 'pdf') {
        const element = document.getElementById('device-status-detail');
        if (!element) return;
        
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('status-urzadzen.pdf');
      } else if (format === 'csv' || format === 'xlsx') {
        const ws = XLSX.utils.json_to_sheet(mockHistoricalData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Status Urządzeń");
        
        if (format === 'csv') {
          XLSX.writeFile(wb, 'status-urzadzen.csv');
        } else {
          XLSX.writeFile(wb, 'status-urzadzen.xlsx');
        }
      }

      toast({
        title: "Eksport zakończony",
        description: `Plik wyeksportowany jako ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Błąd eksportu",
        description: "Wystąpił błąd podczas eksportu",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6" id="device-status-detail">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Status Urządzeń</h2>
        <div className="space-x-2">
          <Button onClick={() => handleExport('pdf')}>Eksportuj PDF</Button>
          <Button onClick={() => handleExport('xlsx')}>Eksportuj Excel</Button>
          <Button onClick={() => handleExport('csv')}>Eksportuj CSV</Button>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Historia</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="activeDevices" 
                name="Aktywne urządzenia" 
                stroke="#ef4444" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="networkConnection" 
                name="Połączenie sieciowe" 
                stroke="#34d399" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="signalQuality" 
                name="Jakość sygnału" 
                stroke="#60a5fa" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Cpu, label: "Aktywne urządzenia", value: 85 },
          { icon: Network, label: "Połączenie sieciowe", value: 92 },
          { icon: Signal, label: "Jakość sygnału", value: 78 }
        ].map((item, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <item.icon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{item.label}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Aktualnie</span>
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