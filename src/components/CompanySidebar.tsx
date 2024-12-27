import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { companiesData } from "@/data/companies";
import { create } from "zustand";

interface CompanyStore {
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  selectedCompanyId: companiesData[0].id,
  setSelectedCompanyId: (id: string) => set({ selectedCompanyId: id }),
}));

export function CompanySidebar() {
  const [open, setOpen] = useState(false);
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-40 lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SidebarContent />
      </SheetContent>
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[300px] border-r bg-background lg:block">
        <SidebarContent />
      </aside>
    </Sheet>
  );
}

function SidebarContent() {
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Firmy</h2>
        <p className="text-sm text-muted-foreground">
          Wybierz firmę do monitorowania
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {companiesData.map((company) => (
            <div key={company.id} className="space-y-4">
              <Button
                variant={selectedCompanyId === company.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCompanyId(company.id)}
              >
                <div className="flex items-center">
                  <span className="ml-2">{company.name}</span>
                </div>
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          Ostatnia aktualizacja: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}