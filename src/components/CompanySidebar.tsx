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
  useSidebar,
} from "@/components/ui/sidebar";
import { Factory, Wind, Leaf, Cpu, Zap, Menu, Plus, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companiesData } from "@/data/companies";
import { create } from "zustand";
import { generatePDF } from "@/utils/pdfGenerator";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface CompanyStore {
  selectedCompanyId: number;
  setSelectedCompanyId: (id: number) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  selectedCompanyId: 1,
  setSelectedCompanyId: (id) => set({ selectedCompanyId: id }),
}));

const getCompanyIcon = (id: number) => {
  switch (id) {
    case 1:
      return <Factory className="w-4 h-4 text-emerald-500" />;
    case 2:
      return <Leaf className="w-4 h-4 text-emerald-500" />;
    case 3:
      return <Wind className="w-4 h-4 text-emerald-500" />;
    case 4:
      return <Cpu className="w-4 h-4 text-emerald-500" />;
    case 5:
      return <Zap className="w-4 h-4 text-emerald-500" />;
    default:
      return <Factory className="w-4 h-4" />;
  }
};

export function CompanySidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );
  const navigate = useNavigate();

  return (
    <div className="relative h-screen border-r border-border/50">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              {!collapsed && <SidebarGroupLabel className="text-lg font-semibold">Firmy</SidebarGroupLabel>}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className={collapsed ? "ml-auto" : ""}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            <SidebarGroupContent className="p-2">
              <SidebarMenu>
                {companiesData.map((company) => (
                  <SidebarMenuItem key={company.id}>
                    <SidebarMenuButton
                      onClick={() => setSelectedCompanyId(company.id)}
                      className={cn(
                        "transition-colors duration-200 hover:bg-accent",
                        selectedCompanyId === company.id
                          ? "bg-primary/10 text-primary font-medium"
                          : ""
                      )}
                    >
                      {getCompanyIcon(company.id)}
                      {!collapsed && <span className="ml-2">{company.name}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <div className="mt-4 space-y-2">
                  <SidebarMenuItem>
                    <Button 
                      variant="outline" 
                      className={`${collapsed ? "w-10 p-2" : "w-full"}`}
                      onClick={() => console.log("Add company clicked")}
                    >
                      <Plus className="w-4 h-4" />
                      {!collapsed && <span className="ml-2">Dodaj firmę</span>}
                    </Button>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Button
                      variant="outline"
                      className={`${collapsed ? "w-10 p-2" : "w-full"}`}
                      onClick={() => generatePDF(selectedCompany)}
                    >
                      <FileText className="w-4 h-4" />
                      {!collapsed && <span className="ml-2">Generuj raport</span>}
                    </Button>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Button
                      variant="outline"
                      className={`${collapsed ? "w-10 p-2" : "w-full"}`}
                      onClick={() => navigate('/assistant')}
                    >
                      <MessageSquare className="w-4 h-4" />
                      {!collapsed && <span className="ml-2">Asystent</span>}
                    </Button>
                  </SidebarMenuItem>
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}