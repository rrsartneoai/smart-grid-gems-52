import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCompanyStore } from '@/components/CompanySidebar';
import { companiesData } from '@/data/companies';

// Default token - in production, this should be handled more securely
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHM0Z2NyemswMDNqMnFxbzI2eGhvYnl4In0.qL1lc5gPrHs8vLBNiEd7kw';

const EnergyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { selectedCompanyId } = useCompanyStore();
  const selectedCompany = companiesData.find(
    (company) => company.id === selectedCompanyId
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 5,
      center: [19.145136, 51.919438], // Centered on Poland
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for energy consumption points
    selectedCompany?.energyData.forEach((data) => {
      if (!map.current) return;
      
      const marker = new mapboxgl.Marker({
        color: getMarkerColor(data.efficiency),
      })
        .setLngLat([19.145136 + Math.random() * 2, 51.919438 + Math.random() * 2])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${data.name}</h3>
              <p>Zużycie: ${data.consumption} kWh</p>
              <p>Produkcja: ${data.production} kWh</p>
              <p>Efektywność: ${data.efficiency}%</p>
            </div>
          `)
        )
        .addTo(map.current);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [selectedCompanyId]);

  const getMarkerColor = (efficiency: number) => {
    if (efficiency >= 80) return '#22c55e';
    if (efficiency >= 60) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute bottom-4 left-4 bg-background/80 p-4 rounded-lg shadow-lg">
        <h3 className="font-semibold mb-2">Legenda</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span>Wysoka efektywność (≥80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500" />
            <span>Średnia efektywność (60-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span>Niska efektywność (&lt;60%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyMap;