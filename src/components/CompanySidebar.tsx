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
import { Factory, Wind, Leaf, Cpu, Zap, Menu } from "lucide-react";
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
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-4 z-50"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sidebar>
        <SidebarContent className="mt-16">
          <SidebarGroup>
            <SidebarGroupLabel>Firmy</SidebarGroupLabel>
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
                      <span className="ml-2">{company.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}