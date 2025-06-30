import React, { useState } from 'react';
import { ConsumerHeader } from '../../components/consumer/ConsumerHeader';
import { Filter, Search, MapPin, Star, ShoppingCart, Calendar } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  farmer: {
    name: string;
    location: string;
    rating: number;
    avatar: string;
  };
  price: number;
  unit: string;
  quantity: number;
  availableDate: string;
  image: string;
  tags: string[];
  description: string;
  deliveryOptions: string[];
}

export const MarketplaceFeed: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const products: Product[] = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      farmer: {
        name: 'Raj Patel',
        location: 'Pune, Maharashtra',
        rating: 4.8,
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      price: 45,
      unit: 'kg',
      quantity: 500,
      availableDate: '2024-01-20',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
      tags: ['organic', 'pesticide-free'],
      description: 'Premium quality tomatoes, perfect for cooking and salads',
      deliveryOptions: ['pickup', 'delivery']
    },
    {
      id: '2',
      name: 'Fresh Spinach',
      farmer: {
        name: 'Sunita Sharma',
        location: 'Nashik, Maharashtra',
        rating: 4.9,
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      price: 25,
      unit: 'kg',
      quantity: 100,
      availableDate: '2024-01-18',
      image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
      tags: ['organic'],
      description: 'Fresh leafy spinach, rich in iron and vitamins',
      deliveryOptions: ['delivery']
    },
    {
      id: '3',
      name: 'Organic Carrots',
      farmer: {
        name: 'Amit Kumar',
        location: 'Satara, Maharashtra',
        rating: 4.7,
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      price: 35,
      unit: 'kg',
      quantity: 200,
      availableDate: '2024-01-22',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
      tags: ['organic', 'pesticide-free'],
      description: 'Sweet and crunchy organic carrots, perfect for salads and cooking',
      deliveryOptions: ['pickup', 'delivery']
    }
  ];

  const filterOptions = [
    { id: 'organic', label: 'Organic' },
    { id: 'pesticide-free', label: 'Pesticide-Free' },
    { id: 'local', label: 'Local (< 50km)' },
    { id: 'delivery', label: 'Home Delivery' },
    { id: 'pickup', label: 'Farm Pickup' }
  ];

  const handleFilterToggle = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => 
                            product.tags.includes(filter) || 
                            product.deliveryOptions.includes(filter)
                          );
    
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsumerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Fresh Marketplace</h2>
          <p className="text-gray-600">Discover fresh produce from local farmers</p>
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
                placeholder="Search for produce or farmers..."
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-green-600 text-white text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-lg font-bold text-green-600">₹{product.price}/{product.unit}</p>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                
                {/* Farmer Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={product.farmer.avatar}
                    alt={product.farmer.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{product.farmer.name}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{product.farmer.rating}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.farmer.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  Available: {new Date(product.availableDate).toLocaleDateString()}
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <p><strong>Quantity:</strong> {product.quantity} {product.unit} available</p>
                  <p><strong>Delivery:</strong> {product.deliveryOptions.join(', ')}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Pre-order</span>
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};