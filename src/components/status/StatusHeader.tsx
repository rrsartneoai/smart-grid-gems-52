import { Clock } from "lucide-react";
import { useCompanyStore } from "@/components/CompanySidebar";
import { companiesData } from "@/data/companies";

export const StatusHeader = () => {
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-1">
          Status IoT - {selectedCompany?.name}
        </h2>
        <div className="flex items-center gap-2">
          <StatusIndicator value={85} />
          <span className="text-sm text-muted-foreground">
            Status ogólny: Wymaga uwagi
          </span>
        </div>
      </div>
      <div className="text-right flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>Ostatnia aktualizacja: 5 min temu</span>
      </div>
    </div>
  );
};

const StatusIndicator = ({ value }: { value: number }) => {
  if (value >= 80) return <span className="text-success">●</span>;
  if (value >= 50) return <span className="text-warning">●</span>;
  return <span className="text-danger">●</span>;
};