import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  CloudRain, 
  Gauge,
  Waves,
  Leaf
} from "lucide-react";

export const sensorsData = {
  gdansk: {
    sensors: [
      {
        icon: <Thermometer className="w-5 h-5" />,
        name: "Temperatura",
        value: "21.5",
        unit: "°C",
        status: "Good",
        description: "Aktualna temperatura powietrza mierzona na wysokości 2m nad poziomem gruntu"
      },
      {
        icon: <Droplets className="w-5 h-5" />,
        name: "Wilgotność",
        value: "65",
        unit: "%",
        status: "Good",
        description: "Względna wilgotność powietrza określająca stopień nasycenia powietrza parą wodną"
      },
      {
        icon: <Wind className="w-5 h-5" />,
        name: "Prędkość wiatru",
        value: "12",
        unit: "km/h",
        status: "Good",
        description: "Średnia prędkość wiatru mierzona na wysokości 10m nad poziomem gruntu"
      },
      {
        icon: <Sun className="w-5 h-5" />,
        name: "Nasłonecznienie",
        value: "850",
        unit: "W/m²",
        status: "Good",
        description: "Natężenie promieniowania słonecznego padającego na powierzchnię poziomą"
      },
      {
        icon: <CloudRain className="w-5 h-5" />,
        name: "Opady",
        value: "0.0",
        unit: "mm/h",
        status: "Good",
        description: "Intensywność opadów atmosferycznych w milimetrach na godzinę"
      },
      {
        icon: <Gauge className="w-5 h-5" />,
        name: "Ciśnienie",
        value: "1013",
        unit: "hPa",
        status: "Good",
        description: "Ciśnienie atmosferyczne na poziomie stacji pomiarowej"
      }
    ]
  },
  slupsk: {
    sensors: [
      {
        icon: <Thermometer className="w-5 h-5" />,
        name: "Temperatura",
        value: "20.8",
        unit: "°C",
        status: "Good",
        description: "Aktualna temperatura powietrza mierzona na wysokości 2m nad poziomem gruntu"
      },
      {
        icon: <Droplets className="w-5 h-5" />,
        name: "Wilgotność",
        value: "70",
        unit: "%",
        status: "Good",
        description: "Względna wilgotność powietrza określająca stopień nasycenia powietrza parą wodną"
      },
      {
        icon: <Wind className="w-5 h-5" />,
        name: "Prędkość wiatru",
        value: "15",
        unit: "km/h",
        status: "Warning",
        description: "Średnia prędkość wiatru mierzona na wysokości 10m nad poziomem gruntu"
      },
      {
        icon: <Sun className="w-5 h-5" />,
        name: "Nasłonecznienie",
        value: "820",
        unit: "W/m²",
        status: "Good",
        description: "Natężenie promieniowania słonecznego padającego na powierzchnię poziomą"
      },
      {
        icon: <CloudRain className="w-5 h-5" />,
        name: "Opady",
        value: "0.2",
        unit: "mm/h",
        status: "Good",
        description: "Intensywność opadów atmosferycznych w milimetrach na godzinę"
      },
      {
        icon: <Gauge className="w-5 h-5" />,
        name: "Ciśnienie",
        value: "1012",
        unit: "hPa",
        status: "Good",
        description: "Ciśnienie atmosferyczne na poziomie stacji pomiarowej"
      }
    ]
  },
  ustka: {
    sensors: [
      {
        icon: <Thermometer className="w-5 h-5" />,
        name: "Temperatura",
        value: "19.5",
        unit: "°C",
        status: "Good",
        description: "Aktualna temperatura powietrza mierzona na wysokości 2m nad poziomem gruntu"
      },
      {
        icon: <Droplets className="w-5 h-5" />,
        name: "Wilgotność",
        value: "75",
        unit: "%",
        status: "Warning",
        description: "Względna wilgotność powietrza określająca stopień nasycenia powietrza parą wodną"
      },
      {
        icon: <Wind className="w-5 h-5" />,
        name: "Prędkość wiatru",
        value: "18",
        unit: "km/h",
        status: "Warning",
        description: "Średnia prędkość wiatru mierzona na wysokości 10m nad poziomem gruntu"
      },
      {
        icon: <Waves className="w-5 h-5" />,
        name: "Wysokość fal",
        value: "1.2",
        unit: "m",
        status: "Good",
        description: "Średnia wysokość fal morskich mierzona w porcie"
      },
      {
        icon: <Leaf className="w-5 h-5" />,
        name: "Aerozol morski",
        value: "45",
        unit: "µg/m³",
        status: "Good",
        description: "Stężenie aerozolu morskiego w powietrzu"
      },
      {
        icon: <Gauge className="w-5 h-5" />,
        name: "Ciśnienie",
        value: "1011",
        unit: "hPa",
        status: "Good",
        description: "Ciśnienie atmosferyczne na poziomie stacji pomiarowej"
      }
    ]
  }
};