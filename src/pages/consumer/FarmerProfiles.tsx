import React, { useState } from 'react';
import { ConsumerHeader } from '../../components/consumer/ConsumerHeader';
import { Search, MapPin, Star, Award, Bell, Filter } from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  location: string;
  farmType: string;
  currentCrops: string[];
  methods: string[];
  rating: number;
  totalReviews: number;
  avatar: string;
  coverImage: string;
  experience: number;
  farmSize: number;
  description: string;
}

export const FarmerProfiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const farmers: Farmer[] = [
    {
      id: '1',
      name: 'Raj Patel',
      location: 'Pune, Maharashtra',
      farmType: 'Mixed Farming',
      currentCrops: ['Tomatoes', 'Onions', 'Leafy Greens'],
      methods: ['organic', 'pesticide-free'],
      rating: 4.8,
      totalReviews: 127,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      coverImage: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg',
      experience: 15,
      farmSize: 5.5,
      description: 'Third-generation farmer specializing in organic vegetables and sustainable farming practices.'
    },
    {
      id: '2',
      name: 'Sunita Sharma',
      location: 'Nashik, Maharashtra',
      farmType: 'Vegetable Farming',
      currentCrops: ['Spinach', 'Carrots', 'Cabbage'],
      methods: ['organic'],
      rating: 4.9,
      totalReviews: 89,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      coverImage: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
      experience: 12,
      farmSize: 3.2,
      description: 'Passionate about growing fresh, nutritious vegetables using traditional organic methods.'
    },
    {
      id: '3',
      name: 'Amit Kumar',
      location: 'Satara, Maharashtra',
      farmType: 'Regenerative Farming',
      currentCrops: ['Carrots', 'Potatoes', 'Beans'],
      methods: ['regenerative', 'pesticide-free'],
      rating: 4.7,
      totalReviews: 156,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      coverImage: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg',
      experience: 20,
      farmSize: 8.0,
      description: 'Pioneer in regenerative farming techniques, focusing on soil health and biodiversity.'
    }
  ];

  const filterOptions = [
    { id: 'organic', label: 'Organic' },
    { id: 'pesticide-free', label: 'Pesticide-Free' },
    { id: 'regenerative', label: 'Regenerative' },
    { id: 'local', label: 'Local (< 50km)' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'grains', label: 'Grains' }
  ];

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.currentCrops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => 
                            farmer.methods.includes(filter) ||
                            farmer.farmType.toLowerCase().includes(filter)
                          );
    
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsumerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Farmer Profiles</h2>
          <p className="text-gray-600">Connect with local farmers and learn about their practices</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search farmers by name, location, or crops..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {selectedFilters.length > 0 && (
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  {selectedFilters.length}
                </span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterToggle(option.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedFilters.includes(option.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFarmers.map((farmer) => (
            <div key={farmer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Cover Image */}
              <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500">
                <img
                  src={farmer.coverImage}
                  alt={`${farmer.name}'s farm`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={farmer.avatar}
                    alt={farmer.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white -mt-8 relative z-10"
                  />
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-gray-800">{farmer.name}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {farmer.location}
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(farmer.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {farmer.rating} ({farmer.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">{farmer.description}</p>

                {/* Farm Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Farm Type</p>
                    <p className="text-gray-800">{farmer.farmType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Experience</p>
                    <p className="text-gray-800">{farmer.experience} years</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Farm Size</p>
                    <p className="text-gray-800">{farmer.farmSize} acres</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Methods</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {farmer.methods.map((method) => (
                        <span
                          key={method}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Current Crops */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Current Crops</p>
                  <div className="flex flex-wrap gap-2">
                    {farmer.currentCrops.map((crop) => (
                      <span
                        key={crop}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    View Profile
                  </button>
                  <button className="bg-blue-100 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFarmers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No farmers found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};