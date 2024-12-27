import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function IoTStatus() {
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  const calculateProgress = (value: number, max: number) => {
    return (value / max) * 100;
  };

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">
        Status IoT - {selectedCompany?.name}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Status Urządzeń</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Aktywne urządzenia</span>
                <span>85%</span>
              </div>
              <Progress value={85} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Połączenie z siecią</span>
                <span>92%</span>
              </div>
              <Progress value={92} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Jakość sygnału</span>
                <span>78%</span>
              </div>
              <Progress value={78} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Wydajność Systemu</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Wykorzystanie CPU</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Wykorzystanie pamięci</span>
                <span>60%</span>
              </div>
              <Progress value={60} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Opóźnienie sieci</span>
                <span>25%</span>
              </div>
              <Progress value={25} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}