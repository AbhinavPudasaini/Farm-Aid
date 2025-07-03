import React, { useState } from 'react';
import { FarmerHeader } from '../../components/farmer/FarmerHeader';
import { Plus, Upload, MapPin, Calendar, MessageCircle, Phone, Eye, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';


interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  availableDate: string;
  description: string;
  images: string[];
  organic: boolean;
  pesticideFree: boolean;
  deliveryOptions: string[];
  location: string;
  status: 'available' | 'sold' | 'reserved';
}

interface DemandedProduct {
  id: string;
  cropName: string;
  consumer: {
    name: string;
    location: string;
    avatar: string;
  };
  quantity: number;
  unit: string;
  maxPrice: number;
  requiredBy: string;
  description: string;
  preferences: string[];
  responses: number;
  distance: number;
  urgency: 'high' | 'medium' | 'low';
  createdAt: string;
}

export const ProductListing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'listings' | 'demands'>('listings');
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Tomatoes',
      quantity: 500,
      unit: 'kg',
      pricePerUnit: 45,
      availableDate: '2024-01-20',
      description: 'Premium quality tomatoes, perfect for cooking and salads',
      images: ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'],
      organic: true,
      pesticideFree: true,
      deliveryOptions: ['pickup', 'delivery'],
      location: 'Pune, Maharashtra',
      status: 'available'
    }
  ]);

  const [demandedProducts] = useState<DemandedProduct[]>([
    {
      id: '1',
      cropName: 'Organic Tomatoes',
      consumer: {
        name: 'Priya Sharma',
        location: 'Mumbai, Maharashtra',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      quantity: 50,
      unit: 'kg',
      maxPrice: 50,
      requiredBy: '2024-01-25',
      description: 'Looking for fresh organic tomatoes for my restaurant. Need consistent quality and regular supply.',
      preferences: ['organic', 'pesticide-free'],
      responses: 3,
      distance: 45,
      urgency: 'high',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      cropName: 'Fresh Spinach',
      consumer: {
        name: 'Rajesh Kumar',
        location: 'Pune, Maharashtra',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      quantity: 20,
      unit: 'kg',
      maxPrice: 30,
      requiredBy: '2024-01-22',
      description: 'Need fresh spinach for weekly family consumption. Prefer local farmers.',
      preferences: ['local', 'pesticide-free'],
      responses: 1,
      distance: 12,
      urgency: 'medium',
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      cropName: 'Organic Carrots',
      consumer: {
        name: 'Sunita Devi',
        location: 'Nashik, Maharashtra',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      quantity: 100,
      unit: 'kg',
      maxPrice: 35,
      requiredBy: '2024-01-30',
      description: 'Bulk order for organic carrots for juice bar. Looking for consistent weekly supply.',
      preferences: ['organic', 'bulk'],
      responses: 0,
      distance: 78,
      urgency: 'low',
      createdAt: '2024-01-10'
    }
  ]);

  const [showNewListing, setShowNewListing] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    unit: 'kg',
    pricePerUnit: 0,
    availableDate: '',
    description: '',
    organic: false,
    pesticideFree: false,
    deliveryOptions: [] as string[],
  });

  const handleCreateListing = () => {
    if (newProduct.name && newProduct.quantity > 0 && newProduct.pricePerUnit > 0) {
      const product: Product = {
        id: Date.now().toString(),
        ...newProduct,
        images: ['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'],
        location: 'Pune, Maharashtra',
        status: 'available'
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        quantity: 0,
        unit: 'kg',
        pricePerUnit: 0,
        availableDate: '',
        description: '',
        organic: false,
        pesticideFree: false,
        deliveryOptions: [],
      });
      setShowNewListing(false);
    }
  };

  const handleDeliveryOptionChange = (option: string) => {
    setNewProduct(prev => ({
      ...prev,
      deliveryOptions: prev.deliveryOptions.includes(option)
        ? prev.deliveryOptions.filter(o => o !== option)
        : [...prev.deliveryOptions, option]
    }));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <AlertCircle className="h-4 w-4" />;
      case 'medium':
        return <TrendingUp className="h-4 w-4" />;
      case 'low':
        return <Eye className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FarmerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Management</h2>
            <p className="text-gray-600">Manage your listings and respond to consumer demands</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'listings'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>My Listings ({products.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('demands')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'demands'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Demanded Products ({demandedProducts.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Your Product Listings</h3>
              <button
                onClick={() => setShowNewListing(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Listing</span>
              </button>
            </div>

            {/* New Listing Form */}
            {showNewListing && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Listing</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Fresh Tomatoes"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                      <input
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                      <select
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="kg">kg</option>
                        <option value="quintal">quintal</option>
                        <option value="ton">ton</option>
                        <option value="piece">piece</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price per {newProduct.unit}</label>
                    <input
                      type="number"
                      value={newProduct.pricePerUnit}
                      onChange={(e) => setNewProduct({ ...newProduct, pricePerUnit: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="₹"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Date</label>
                    <input
                      type="date"
                      value={newProduct.availableDate}
                      onChange={(e) => setNewProduct({ ...newProduct, availableDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe your produce quality, variety, etc."
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newProduct.organic}
                          onChange={(e) => setNewProduct({ ...newProduct, organic: e.target.checked })}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Organic Certified</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newProduct.pesticideFree}
                          onChange={(e) => setNewProduct({ ...newProduct, pesticideFree: e.target.checked })}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Pesticide-Free</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Options</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newProduct.deliveryOptions.includes('pickup')}
                          onChange={() => handleDeliveryOptionChange('pickup')}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Farm Pickup</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newProduct.deliveryOptions.includes('delivery')}
                          onChange={() => handleDeliveryOptionChange('delivery')}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Home Delivery</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleCreateListing}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Create Listing
                  </button>
                  <button
                    onClick={() => setShowNewListing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Product Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'available' ? 'bg-green-100 text-green-800' :
                        product.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-lg font-bold text-green-600">₹{product.pricePerUnit}/{product.unit}</p>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {product.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      Available: {new Date(product.availableDate).toLocaleDateString()}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.organic && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Organic</span>
                      )}
                      {product.pesticideFree && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Pesticide-Free</span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-4">
                      <p><strong>Quantity:</strong> {product.quantity} {product.unit}</p>
                      <p><strong>Delivery:</strong> {product.deliveryOptions.join(', ')}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Messages</span>
                      </button>
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Eye className="h-4 w-4" />
                        <span>Views</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demands Tab */}
        {activeTab === 'demands' && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Products in Demand</h3>
              <p className="text-gray-600">Respond to consumer requests and grow your business</p>
            </div>

            {/* Demand Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Demands</p>
                    <p className="text-2xl font-bold text-gray-900">{demandedProducts.length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Priority</p>
                    <p className="text-2xl font-bold text-red-600">
                      {demandedProducts.filter(d => d.urgency === 'high').length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nearby Requests</p>
                    <p className="text-2xl font-bold text-green-600">
                      {demandedProducts.filter(d => d.distance < 50).length}
                    </p>
                  </div>
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Demanded Products List */}
            <div className="space-y-6">
              {demandedProducts.map((demand) => (
                <div key={demand.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={demand.consumer.avatar}
                        alt={demand.consumer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{demand.cropName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {demand.consumer.name}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {demand.distance}km away
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getUrgencyColor(demand.urgency)}`}>
                        {getUrgencyIcon(demand.urgency)}
                        <span>{demand.urgency} priority</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{demand.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Quantity Needed</p>
                      <p className="text-gray-800">{demand.quantity} {demand.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Max Price</p>
                      <p className="text-gray-800 font-semibold text-green-600">₹{demand.maxPrice}/{demand.unit}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Required By</p>
                      <div className="flex items-center text-gray-800">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(demand.requiredBy).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Responses</p>
                      <p className="text-gray-800">{demand.responses} farmers</p>
                    </div>
                  </div>

                  {demand.preferences.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Preferences</p>
                      <div className="flex flex-wrap gap-2">
                        {demand.preferences.map((preference) => (
                          <span
                            key={preference}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {preference}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Posted on {new Date(demand.createdAt).toLocaleDateString()}
                    </p>
                    
                    <div className="flex space-x-3">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Respond to Request</span>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Contact</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {demandedProducts.length === 0 && (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No product demands at the moment.</p>
                <p className="text-gray-400 mt-2">Check back later for new consumer requests!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};