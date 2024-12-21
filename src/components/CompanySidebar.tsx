import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export function CompanySidebar() {
  const [companies, setCompanies] = useState([
    { id: 1, name: "Firma 1" },
    { id: 2, name: "Firma 2" },
    { id: 3, name: "Firma 3" },
    { id: 4, name: "Firma 4" },
    { id: 5, name: "Firma 5" },
  ]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCompany = () => {
    if (companies.length >= 5) {
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Osiągnięto maksymalną liczbę firm (5)",
      });
      return;
    }

    if (newCompanyName.trim()) {
      const newCompany = {
        id: companies.length + 1,
        name: newCompanyName.trim(),
      };
      setCompanies([...companies, newCompany]);
      setNewCompanyName("");
      setIsAdding(false);
      toast({
        title: "Sukces",
        description: `Dodano firmę: ${newCompanyName}`,
      });
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Firmy</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {companies.map((company) => (
                <SidebarMenuItem key={company.id}>
                  <SidebarMenuButton>
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>{company.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {isAdding ? (
              <div className="p-2 space-y-2">
                <Input
                  placeholder="Nazwa firmy"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAddCompany}
                    className="w-full"
                  >
                    Dodaj
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsAdding(false);
                      setNewCompanyName("");
                    }}
                    className="w-full"
                  >
                    Anuluj
                  </Button>
                </div>
              </div>
            ) : (
              companies.length < 5 && (
                <Button
                  variant="ghost"
                  className="w-full mt-2"
                  onClick={() => setIsAdding(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Dodaj firmę
                </Button>
              )
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}