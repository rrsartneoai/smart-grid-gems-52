import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { companiesData } from "@/data/companies";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { CompanyStoreState } from "@/types/company";
import { useToast } from "@/components/ui/use-toast";

export const useCompanyStore = create<CompanyStoreState>((set) => ({
  selectedCompanyId: "1",
  setSelectedCompanyId: (id: string) => set({ selectedCompanyId: id }),
}));

export function CompanySidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();
  const { toast } = useToast();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleAddCompany = () => {
    toast({
      title: "Funkcja w przygotowaniu",
      description: "Możliwość dodawania nowych firm będzie dostępna wkrótce.",
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SidebarContent handleAddCompany={handleAddCompany} />
      </SheetContent>
      <aside className={`fixed left-0 top-0 z-30 h-screen transition-all duration-300 bg-background border-r ${collapsed ? "w-[60px]" : "w-[300px]"} hidden lg:block`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="absolute -right-4 top-4 z-50"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        <SidebarContent collapsed={collapsed} handleAddCompany={handleAddCompany} />
      </aside>
    </Sheet>
  );
}

function SidebarContent({ collapsed = false, handleAddCompany }: { collapsed?: boolean, handleAddCompany: () => void }) {
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();

  return (
    <div className="flex h-full flex-col gap-4">
      {!collapsed && (
        <div className="p-6">
          <h2 className="text-lg font-semibold">Firmy</h2>
          <p className="text-sm text-muted-foreground">
            Wybierz firmę do monitorowania
          </p>
        </div>
      )}
      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {companiesData.map((company) => (
            <div key={company.id} className="space-y-4">
              <Button
                variant={selectedCompanyId === company.id ? "secondary" : "ghost"}
                className={`w-full justify-start ${collapsed ? "px-2" : ""}`}
                onClick={() => setSelectedCompanyId(company.id)}
                title={collapsed ? company.name : undefined}
              >
                <div className="flex items-center">
                  {collapsed ? (
                    <span>{company.name.charAt(0)}</span>
                  ) : (
                    <span className="ml-2">{company.name}</span>
                  )}
                </div>
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className={`w-full justify-start ${collapsed ? "px-2" : ""}`}
            onClick={handleAddCompany}
          >
            <Plus className="h-4 w-4 mr-2" />
            {!collapsed && <span>Dodaj firmę</span>}
          </Button>
        </div>
      </ScrollArea>
      {!collapsed && (
        <>
          <Separator />
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              Ostatnia aktualizacja: {new Date().toLocaleString()}
            </p>
          </div>
        </>
      )}
    </div>
  );
}