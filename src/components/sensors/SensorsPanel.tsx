import { useState } from "react";
import { SensorCard } from "./SensorCard";
import { CityTabs } from "./CityTabs";
import { sensorsData } from "./SensorsData";

const SensorsPanel = () => {
  const [selectedCity, setSelectedCity] = useState<string>("gdansk");
  const cities = Object.keys(sensorsData).map(key => 
    key.charAt(0).toUpperCase() + key.slice(1)
  );
  
  const currentCityData = sensorsData[selectedCity];

  const handleCitySelect = (city: string) => {
    setSelectedCity(city.toLowerCase());
  };

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

      <CityTabs
        cities={cities}
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
      />

      {currentCityData && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {currentCityData.sensors.map((sensor, index) => (
            <SensorCard 
              key={index}
              icon={sensor.icon}
              name={sensor.name}
              value={sensor.value}
              unit={sensor.unit}
              status={sensor.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SensorsPanel;