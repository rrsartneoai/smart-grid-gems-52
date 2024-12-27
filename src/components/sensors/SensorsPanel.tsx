import { useState } from "react";
import { SensorCard } from "./SensorCard";
import { CitySelector } from "./CitySelector";
import { sensorsData } from "./SensorsData";

const SensorsPanel = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const cities = Object.keys(sensorsData).map(key => sensorsData[key].name);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Czujniki</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last synced in an hour</span>
          <span>•</span>
          <span>100% est. battery</span>
          <span>•</span>
          <span>-71 dBm</span>
        </div>
      </div>

      <CitySelector
        cities={cities}
        selectedCity={selectedCity || ""}
        onCitySelect={setSelectedCity}
      />

      {selectedCity && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sensorsData[selectedCity.toLowerCase()].sensors.map((sensor, index) => (
            <SensorCard key={index} {...sensor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SensorsPanel;