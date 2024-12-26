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
import { Factory, Wind, Leaf, Cpu, Zap, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companiesData } from "@/data/companies";
import { create } from "zustand";

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
      return <Factory className="w-4 h-4 text-orange-500" />;
    case 2:
      return <Leaf className="w-4 h-4 text-green-500" />;
    case 3:
      return <Wind className="w-4 h-4 text-blue-500" />;
    case 4:
      return <Cpu className="w-4 h-4 text-purple-500" />;
    case 5:
      return <Zap className="w-4 h-4 text-yellow-500" />;
    default:
      return <Factory className="w-4 h-4" />;
  }
};

export function CompanySidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const { selectedCompanyId, setSelectedCompanyId } = useCompanyStore();

  return (
    <div className="relative h-screen">
      <Sidebar className={collapsed ? "w-16" : "w-64"}>
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between p-4">
              {!collapsed && <SidebarGroupLabel>Firmy</SidebarGroupLabel>}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className={collapsed ? "ml-auto" : ""}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
            <SidebarGroupContent>
              <SidebarMenu>
                {companiesData.map((company) => (
                  <SidebarMenuItem key={company.id}>
                    <SidebarMenuButton
                      onClick={() => setSelectedCompanyId(company.id)}
                      className={
                        selectedCompanyId === company.id
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }
                    >
                      {getCompanyIcon(company.id)}
                      {!collapsed && <span className="ml-2">{company.name}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <Button 
                    variant="outline" 
                    className={`${collapsed ? "w-10 p-2" : "w-full"} mt-4`}
                    onClick={() => console.log("Add company clicked")}
                  >
                    <Plus className="w-4 h-4" />
                    {!collapsed && <span className="ml-2">Dodaj firmę</span>}
                  </Button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}