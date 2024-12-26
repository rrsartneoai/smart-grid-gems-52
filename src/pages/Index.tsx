import { motion } from "framer-motion";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { PowerStats } from "@/components/dashboard/PowerStats";
import { Chatbot } from "@/components/Chatbot";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { FileUpload } from "@/components/FileUpload";
import { ApiKeySettings } from "@/components/settings/ApiKeySettings";
import { CompanySidebar } from "@/components/CompanySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyAnalysis } from "@/components/analysis/CompanyAnalysis";
import { IoTStatus } from "@/components/status/IoTStatus";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold hidden sm:block">Panel Monitorowania</h1>
          <h1 className="text-xl font-semibold sm:hidden">Panel</h1>
          <DarkModeToggle />
        </div>
        <ApiKeySettings />
      </div>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <CompanySidebar />
          <main className="flex-1 p-4 lg:container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <Tabs defaultValue="spaces" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="spaces">Przestrzenie</TabsTrigger>
                  <TabsTrigger value="insights">Analiza</TabsTrigger>
                  <TabsTrigger value="status">Status</TabsTrigger>
                </TabsList>
                
                <TabsContent value="spaces" className="space-y-6">
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <PowerStats />
                  </div>

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
              </Tabs>
            </motion.div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;