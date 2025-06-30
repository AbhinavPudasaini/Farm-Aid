import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
  }>;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
};

export const WeatherWidget: React.FC = () => {
  const weather: WeatherData = {
    temperature: 28,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
    forecast: [
      { day: 'Today', high: 30, low: 22, condition: 'sunny' },
      { day: 'Tomorrow', high: 28, low: 20, condition: 'cloudy' },
      { day: 'Wed', high: 25, low: 18, condition: 'rainy' },
      { day: 'Thu', high: 27, low: 19, condition: 'sunny' },
    ]
  };

  const WeatherIcon = weatherIcons[weather.condition as keyof typeof weatherIcons] || Sun;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Weather Today</h3>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <WeatherIcon className="h-12 w-12 text-yellow-500 mr-4" />
          <div>
            <p className="text-3xl font-bold text-gray-800">{weather.temperature}°C</p>
            <p className="text-gray-600 capitalize">{weather.condition}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Humidity</p>
          <p className="font-semibold">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <Wind className="h-5 w-5 text-gray-500 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Wind</p>
          <p className="font-semibold">{weather.windSpeed} km/h</p>
        </div>
        <div className="text-center">
          <CloudRain className="h-5 w-5 text-blue-600 mx-auto mb-1" />
          <p className="text-xs text-gray-600">Rain Chance</p>
          <p className="font-semibold">{weather.precipitation}%</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">4-Day Forecast</h4>
        <div className="grid grid-cols-4 gap-2">
          {weather.forecast.map((day, index) => {
            const DayIcon = weatherIcons[day.condition as keyof typeof weatherIcons] || Sun;
            return (
              <div key={index} className="text-center">
                <p className="text-xs text-gray-600 mb-1">{day.day}</p>
                <DayIcon className="h-6 w-6 mx-auto mb-1 text-yellow-500" />
                <p className="text-xs font-medium">{day.high}°/{day.low}°</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};