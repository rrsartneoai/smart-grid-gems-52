interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onCitySelect: (city: string) => void;
}

export const CitySelector = ({ cities, selectedCity, onCitySelect }: CitySelectorProps) => (
  <div className="flex gap-4 mb-6">
    {cities.map((city) => (
      <button
        key={city}
        onClick={() => onCitySelect(city)}
        className={`text-xl font-semibold hover:text-primary transition-colors ${
          selectedCity === city ? "text-primary" : ""
        }`}
      >
        {city}
      </button>
    ))}
  </div>
);