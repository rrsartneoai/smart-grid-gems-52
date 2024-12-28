import { motion } from "framer-motion";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { PowerStats } from "@/components/dashboard/PowerStats";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { FileUpload } from "@/components/FileUpload";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";
import { CompanySidebar } from "@/components/CompanySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyAnalysis } from "@/components/analysis/CompanyAnalysis";
import { IoTStatus } from "@/components/status/IoTStatus";
import SensorsPanel from "@/components/sensors/SensorsPanel";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useEffect } from "react";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { Chatbot } from "@/components/Chatbot";
import { NotificationCenter } from "@/components/ui/notifications/NotificationCenter";
import { Tutorial } from "@/components/Tutorial";
import { useHotkeys } from "react-hotkeys-hook";
import { useToast } from "@/hooks/use-toast";
import { LanguageSelector } from "@/components/LanguageSelector";

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useHotkeys("?", () => {
    toast({
      title: "Dostępne skróty klawiszowe",
      description: "Ctrl+K: Wyszukiwanie\nCtrl+/: Pomoc\nCtrl+B: Menu boczne",
    });
  });

  useHotkeys("ctrl+k", (e) => {
    e.preventDefault();
    toast({
      title: "Wyszukiwanie",
      description: "Funkcja wyszukiwania zostanie wkrótce dodana",
    });
  });

  return (
    <div className="min-h-screen bg-background">
      <Tutorial />
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
          <ApiKeySettings />
          <div className="flex flex-col items-center sm:items-start gap-1">
            <h1 className="text-xl font-semibold text-center sm:text-left">Panel Monitorowania</h1>
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              efektywności energetycznej smartgrid na Pomorzu
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <NotificationCenter />
          <DarkModeToggle />
        </div>
      </div>
      <SidebarProvider>
        <div className="min-h-screen flex w-full flex-col lg:flex-row">
          <CompanySidebar />
          <main className="flex-1 p-4 lg:pl-[320px] transition-all duration-300">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <Tabs defaultValue="spaces" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto flex-wrap">
                  <TabsTrigger value="spaces">Przestrzenie</TabsTrigger>
                  <TabsTrigger value="insights">Analiza</TabsTrigger>
                  <TabsTrigger value="status">Status</TabsTrigger>
                  <TabsTrigger value="sensors">Czujniki</TabsTrigger>
                </TabsList>
                
                <TabsContent value="spaces" className="space-y-6">
                  <DndContext collisionDetection={closestCenter}>
                    <SortableContext items={[]} strategy={rectSortingStrategy}>
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <PowerStats />
                      </div>
                    </SortableContext>
                  </DndContext>

                  <div className="grid gap-4">
                    <EnergyChart />
                  </div>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div className="w-full">
                      <h2 className="text-2xl font-bold mb-4">Wgraj plik</h2>
                      <FileUpload />
                    </div>
                    <div className="w-full">
                      <h2 className="text-2xl font-bold mb-4">Asystent AI</h2>
                      <Chatbot />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insights">
                  <CompanyAnalysis />
                </TabsContent>

                <TabsContent value="status">
                  <IoTStatus />
                </TabsContent>

                <TabsContent value="sensors">
                  <SensorsPanel />
                </TabsContent>
              </Tabs>
            </motion.div>
          </main>
        </div>
      </SidebarProvider>
      <FloatingChatbot />
    </div>
  );
};

export default Index;