import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PowerStats } from "@/components/dashboard/PowerStats";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { CompanyAnalysis } from "@/components/analysis/CompanyAnalysis";
import { IoTStatus } from "@/components/status/IoTStatus";
import SensorsPanel from "@/components/sensors/SensorsPanel";
import { DeviceStatus } from "@/components/network/DeviceStatus";
import { NetworkMap } from "@/components/network/NetworkMap";
import { FailureAnalysis } from "@/components/network/FailureAnalysis";
import EnergyMap from "@/components/map/EnergyMap";
import { FileUpload } from "@/components/FileUpload";
import { Chatbot } from "@/components/Chatbot";
import { useTranslation } from 'react-i18next';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

export const DashboardTabs = () => {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="spaces" className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto flex-wrap">
        <TabsTrigger value="spaces">{t('spaces')}</TabsTrigger>
        <TabsTrigger value="insights">{t('analysis')}</TabsTrigger>
        <TabsTrigger value="status">{t('status')}</TabsTrigger>
        <TabsTrigger value="sensors">{t('sensors')}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="spaces" className="space-y-6">
        <DndContext collisionDetection={closestCenter}>
          <SortableContext items={[]} strategy={rectSortingStrategy}>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <PowerStats />
            </div>
          </SortableContext>
        </DndContext>

        <div className="grid gap-6">
          <EnergyChart />
        </div>

        <div className="grid gap-6">
          <DeviceStatus />
        </div>

        <div className="grid gap-6">
          <NetworkMap />
        </div>

        <div className="grid gap-6">
          <FailureAnalysis />
        </div>

        <div className="grid gap-6">
          <EnergyMap />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">{t('uploadFile')}</h2>
            <FileUpload />
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">{t('aiAssistant')}</h2>
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
  );
};