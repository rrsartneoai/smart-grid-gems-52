import { motion } from "framer-motion";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { PowerStats } from "@/components/dashboard/PowerStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container px-4 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard Sieci Energetycznej
            </h1>
            <p className="text-muted-foreground">
              Monitoruj zużycie i generację energii w czasie rzeczywistym
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <PowerStats />
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <EnergyChart />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;