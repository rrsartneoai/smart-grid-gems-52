import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ResourceCard } from "@/components/ResourceCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Hero } from "@/components/Hero";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen">
      <Hero />
      
      <main className="container px-4 py-12 mx-auto">
        <section className="mb-16">
          <div className="flex flex-col items-center justify-between gap-4 mb-8 md:flex-row">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search resources..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CategoryFilter
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <ResourceCard
              title="OpenHAB"
              description="Open Home Automation Bus - vendor and technology agnostic open source automation software"
              category="Framework"
              stars={7800}
              url="https://www.openhab.org"
            />
            <ResourceCard
              title="Home Assistant"
              description="Open source home automation platform running on Python 3"
              category="Software"
              stars={54200}
              url="https://www.home-assistant.io"
            />
            <ResourceCard
              title="ThingsBoard"
              description="Open-source IoT platform for data collection, processing, visualization, and device management"
              category="Platform"
              stars={12300}
              url="https://thingsboard.io"
            />
            {/* Add more ResourceCards here */}
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Index;