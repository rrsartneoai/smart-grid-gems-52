import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';
import { sensorsData } from "./SensorsData";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ExportData = () => {
  const { toast } = useToast();

  const exportToExcel = () => {
    try {
      const data = Object.entries(sensorsData).map(([city, cityData]) => {
        const sensorReadings = cityData.sensors.reduce((acc, sensor) => ({
          ...acc,
          [`${sensor.name} (${sensor.unit})`]: sensor.value
        }), {});

        return {
          City: cityData.name,
          ...sensorReadings
        };
      });

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Dane czujników");
      XLSX.writeFile(wb, "dane-czujnikow.xlsx");

      toast({
        title: "Eksport zakończony",
        description: "Dane zostały wyeksportowane do pliku Excel."
      });
    } catch (error) {
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować danych.",
        variant: "destructive"
      });
    }
  };

  const exportToCSV = () => {
    try {
      const data = Object.entries(sensorsData).map(([city, cityData]) => {
        const sensorReadings = cityData.sensors.reduce((acc, sensor) => ({
          ...acc,
          [`${sensor.name} (${sensor.unit})`]: sensor.value
        }), {});

        return {
          City: cityData.name,
          ...sensorReadings
        };
      });

      const ws = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws);
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "dane-czujnikow.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Eksport zakończony",
        description: "Dane zostały wyeksportowane do pliku CSV."
      });
    } catch (error) {
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować danych.",
        variant: "destructive"
      });
    }
  };

  const exportToPDF = async () => {
    try {
      const element = document.getElementById('sensors-panel');
      if (!element) {
        throw new Error("Element not found");
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('dane-czujnikow.pdf');

      toast({
        title: "Eksport zakończony",
        description: "Dane zostały wyeksportowane do pliku PDF."
      });
    } catch (error) {
      console.error("PDF export error:", error);
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować danych do PDF.",
        variant: "destructive"
      });
    }
  };

  const exportToJPG = async () => {
    try {
      const element = document.getElementById('sensors-panel');
      if (!element) {
        throw new Error("Element not found");
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true
      });
      
      const link = document.createElement('a');
      link.download = 'dane-czujnikow.jpg';
      link.href = canvas.toDataURL('image/jpeg', 0.8);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Eksport zakończony",
        description: "Dane zostały wyeksportowane do pliku JPG."
      });
    } catch (error) {
      console.error("JPG export error:", error);
      toast({
        title: "Błąd eksportu",
        description: "Nie udało się wyeksportować danych do JPG.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex gap-4 flex-wrap">
      <Button onClick={exportToExcel}>
        Eksportuj do Excel
      </Button>
      <Button onClick={exportToCSV}>
        Eksportuj do CSV
      </Button>
      <Button onClick={exportToPDF}>
        Eksportuj do PDF
      </Button>
      <Button onClick={exportToJPG}>
        Eksportuj do JPG
      </Button>
    </div>
  );
};