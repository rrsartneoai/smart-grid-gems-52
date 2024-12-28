import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sensorsData } from "./SensorsData";
import { HistoricalChart } from './HistoricalChart';

export const DataComparison = () => {
  const [city1, setCity1] = useState('gdansk');
  const [city2, setCity2] = useState('sopot');
  const [parameter, setParameter] = useState('PM2.5');

  const cities = Object.keys(sensorsData);
  const parameters = sensorsData[city1].sensors.map(s => s.name);

  // Mock historical data - in real app, this would come from API
  const mockHistoricalData = (cityName: string) => {
    return Array.from({ length: 24 }, (_, i) => ({
      timestamp: `${i}:00`,
      value: Math.random() * 50
    }));
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Porównanie Danych</h3>
      <div className="grid gap-4 mb-6">
        <div className="flex gap-4">
          <Select value={city1} onValueChange={setCity1}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz miasto 1" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city} value={city}>
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={city2} onValueChange={setCity2}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz miasto 2" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city} value={city}>
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={parameter} onValueChange={setParameter}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz parametr" />
            </SelectTrigger>
            <SelectContent>
              {parameters.map(param => (
                <SelectItem key={param} value={param}>
                  {param}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <HistoricalChart
            data={mockHistoricalData(city1)}
            title={`${parameter} - ${city1}`}
            unit="µg/m³"
          />
          <HistoricalChart
            data={mockHistoricalData(city2)}
            title={`${parameter} - ${city2}`}
            unit="µg/m³"
          />
        </div>
      </div>
    </Card>
  );
};