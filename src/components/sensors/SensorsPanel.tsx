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
    <div className="w-full max-w-[1400px] mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Czujniki</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <span>Last synced in an hour</span>
          <span className="hidden sm:inline">•</span>
          <span>100% est. battery</span>
          <span className="hidden sm:inline">•</span>
          <span>-71 dBm</span>
        </div>
      </div>

      <CityTabs
        cities={cities}
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
      />

      {currentCityData && (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {currentCityData.sensors.map((sensor, index) => (
              <SensorCard 
                key={index}
                icon={sensor.icon}
                name={sensor.name}
                value={sensor.value}
                unit={sensor.unit}
                status={sensor.status}
                description={sensor.description}
              />
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Dane dla miasta {currentCityData.name}</h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground">
                Poniżej znajdują się szczegółowe informacje o jakości powietrza i warunkach środowiskowych w mieście {currentCityData.name}. 
                Wszystkie pomiary są aktualizowane w czasie rzeczywistym, zapewniając dokładny obraz stanu środowiska.
              </p>
              <ul className="mt-4 space-y-2">
                {currentCityData.sensors.map((sensor, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="font-medium">{sensor.name}:</span>
                    <span>{sensor.value} {sensor.unit}</span>
                    <span className="text-sm text-muted-foreground">- {sensor.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SensorsPanel;