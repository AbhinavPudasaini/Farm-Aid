import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Award } from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  avatar: string;
  tags: string[];
}

export const RecommendedFarmers: React.FC = () => {
  const farmers: Farmer[] = [
    {
      id: '1',
      name: 'Raj Patel',
      location: 'Pune, Maharashtra',
      rating: 4.8,
      specialties: ['Tomatoes', 'Onions', 'Leafy Greens'],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      tags: ['organic', 'pesticide-free']
    },
    {
      id: '2',
      name: 'Sunita Sharma',
      location: 'Nashik, Maharashtra',
      rating: 4.9,
      specialties: ['Spinach', 'Carrots', 'Herbs'],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      tags: ['organic']
    },
    {
      id: '3',
      name: 'Amit Kumar',
      location: 'Satara, Maharashtra',
      rating: 4.7,
      specialties: ['Root Vegetables', 'Beans'],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      tags: ['regenerative', 'pesticide-free']
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Recommended Farmers</h3>
        <Link
          to="/consumer/farmers"
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          View All Farmers
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {farmers.map((farmer) => (
          <div key={farmer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{farmer.name}</h4>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-3 w-3 mr-1" />
                  {farmer.location}
                </div>
                <div className="flex items-center mt-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600 ml-1">{farmer.rating}</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-1">Specialties:</p>
              <div className="flex flex-wrap gap-1">
                {farmer.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {farmer.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center"
                >
                  <Award className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};