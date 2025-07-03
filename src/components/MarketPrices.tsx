import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CropPrice {
  name: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

export const MarketPrices: React.FC = () => {
  const crops: CropPrice[] = [
    { name: 'Tomatoes', price: 45, unit: 'kg', change: 5.2, trend: 'up' },
    { name: 'Onions', price: 32, unit: 'kg', change: -2.1, trend: 'down' },
    { name: 'Wheat', price: 28, unit: 'kg', change: 0, trend: 'stable' },
    { name: 'Rice', price: 42, unit: 'kg', change: 3.8, trend: 'up' },
    { name: 'Potatoes', price: 25, unit: 'kg', change: -1.5, trend: 'down' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Market Prices</h3>
        <span className="text-xs text-gray-500">Live prices</span>
      </div>
      
      <div className="space-y-3">
        {crops.map((crop, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-1">
              <p className="font-medium text-gray-800">{crop.name}</p>
              <p className="text-sm text-gray-600">₹{crop.price}/{crop.unit}</p>
            </div>
            <div className="flex items-center space-x-2">
              {getTrendIcon(crop.trend)}
              <span className={`text-sm font-medium ${getTrendColor(crop.trend)}`}>
                {crop.change > 0 ? '+' : ''}{crop.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
        View All Prices →
      </button>
    </div>
  );
};