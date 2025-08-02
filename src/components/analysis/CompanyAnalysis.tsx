import { FloatingChatbot } from "../FloatingChatbot";
import { Card } from "@/components/ui/card";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  Legend, Area, AreaChart, ComposedChart, Scatter,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const calculateForecast = (data: any[]) => {
  const forecast = data.map((item, index) => ({
    name: `Forecast ${index + 1}`,
    consumption: item.consumption * 1.1,
    production: item.production * 1.15,
    efficiency: Math.min(item.efficiency * 1.05, 100),
  }));
  return forecast;
};

export function CompanyAnalysis() {
  const { toast } = useToast();
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );
  const [showForecast, setShowForecast] = useState(false);

  const handleExport = async (format: 'pdf' | 'jpg' | 'xlsx' | 'csv') => {
    try {
      const element = document.getElementById('company-analysis');
      if (!element) return;

      if (format === 'pdf' || format === 'jpg') {
        const canvas = await html2canvas(element);
        
        if (format === 'jpg') {
          const link = document.createElement('a');
          link.download = 'company-analysis.jpg';
          link.href = canvas.toDataURL('image/jpeg');
          link.click();
        } else {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('company-analysis.pdf');
        }
      } else {
        const data = selectedCompany?.energyData || [];
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Analysis Data");
        
        if (format === 'csv') {
          XLSX.writeFile(wb, 'company-analysis.csv');
        } else {
          XLSX.writeFile(wb, 'company-analysis.xlsx');
        }
      }

      toast({
        title: "Export completed",
        description: `File exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "An error occurred during export",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      <div className="grid gap-6" id="company-analysis">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-2xl font-bold">
            Analiza - {selectedCompany?.name}
          </h2>
          <div className="flex gap-2 items-center">
            <Button onClick={() => handleExport('pdf')}>PDF</Button>
            <Button onClick={() => handleExport('xlsx')}>Excel</Button>
            <Button onClick={() => handleExport('jpg')}>JPG</Button>
            <Button onClick={() => handleExport('csv')}>CSV</Button>
            <Button onClick={() => {
              setShowForecast(true);
              toast({
                title: "Prognoza wygenerowana",
                description: "Wyświetlono przewidywane wartości na podstawie danych historycznych",
              });
            }} disabled={showForecast}>
              Generuj prognozę
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Trendy zużycia energii</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={showForecast ? [...(selectedCompany?.energyData || []), ...calculateForecast(selectedCompany?.energyData || [])] : selectedCompany?.energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    name="Zużycie"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="production"
                    name="Produkcja"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Analiza wydajności</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={showForecast ? [...(selectedCompany?.energyData || []), ...calculateForecast(selectedCompany?.energyData || [])] : selectedCompany?.energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    name="Wydajność"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Źródła energii</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Energia słoneczna", value: 30 },
                      { name: "Energia wiatrowa", value: 25 },
                      { name: "Biomasa", value: 20 },
                      { name: "Inne źródła", value: 25 },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {[
                      { name: "Energia słoneczna", value: 30 },
                      { name: "Energia wiatrowa", value: 25 },
                      { name: "Biomasa", value: 20 },
                      { name: "Inne źródła", value: 25 },
                    ].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Analiza korelacji</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={showForecast ? [...(selectedCompany?.energyData || []), ...calculateForecast(selectedCompany?.energyData || [])] : selectedCompany?.energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumption" name="Zużycie" fill="#8884d8" />
                  <Scatter dataKey="efficiency" name="Wydajność" fill="#82ca9d" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <FloatingChatbot />
    </div>
  );
}
