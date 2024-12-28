import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { companiesData } from "@/data/companies";
import { PerformanceChart } from "./PerformanceChart";
import { EfficiencyChart } from "./EfficiencyChart";
import { EnergySourcesChart } from "./EnergySourcesChart";
import { CorrelationChart } from "./CorrelationChart";
import { useParams } from "react-router-dom";

const energySourcesData = [
  { name: "Energia słoneczna", value: 30 },
  { name: "Energia wiatrowa", value: 25 },
  { name: "Biomasa", value: 20 },
  { name: "Inne źródła", value: 25 },
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

  const handleGenerateForecast = () => {
    toast({
      title: "Prognoza wygenerowana",
      description: "Dane prognostyczne zostały zaktualizowane",
    });
  };

  if (!company) {
    return <div className="p-6 text-white">Wybierz firmę z panelu bocznego</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Analiza - {company.name}</h2>
        <Button 
          onClick={handleGenerateForecast} 
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Generuj prognozę
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={performanceData} />
        <EfficiencyChart data={performanceData} />
        <EnergySourcesChart data={energySourcesData} />
        <CorrelationChart data={performanceData} />
      </div>
    </div>
  );
}