import React, { useState } from 'react';
import { ConsumerHeader } from '../../components/consumer/ConsumerHeader';
import { Plus, MapPin, Calendar, User, MessageCircle, CheckCircle } from 'lucide-react';

interface DemandRequest {
  id: string;
  consumer: {
    name: string;
    location: string;
    avatar: string;
  };
  cropName: string;
  quantity: number;
  unit: string;
  maxPrice: number;
  requiredBy: string;
  description: string;
  preferences: string[];
  status: 'open' | 'matched' | 'fulfilled';
  responses: number;
  createdAt: string;
}

export const DemandBoard: React.FC = () => {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newRequest, setNewRequest] = useState({
    cropName: '',
    quantity: 0,
    unit: 'kg',
    maxPrice: 0,
    requiredBy: '',
    description: '',
    preferences: [] as string[]
  });

  const [demands, setDemands] = useState<DemandRequest[]>([
    {
      id: '1',
      consumer: {
        name: 'Priya Sharma',
        location: 'Mumbai, Maharashtra',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      cropName: 'Organic Tomatoes',
      quantity: 50,
      unit: 'kg',
      maxPrice: 50,
      requiredBy: '2024-01-25',
      description: 'Looking for fresh organic tomatoes for my restaurant. Need consistent quality and regular supply.',
      preferences: ['organic', 'pesticide-free'],
      status: 'open',
      responses: 3,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      consumer: {
        name: 'Rajesh Kumar',
        location: 'Pune, Maharashtra',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
      },
      cropName: 'Fresh Spinach',
      quantity: 20,
      unit: 'kg',
      maxPrice: 30,
      requiredBy: '2024-01-22',
      description: 'Need fresh spinach for weekly family consumption. Prefer local farmers.',
      preferences: ['local', 'pesticide-free'],
      status: 'matched',
      responses: 5,
      createdAt: '2024-01-12'
    }
  ]);

  const handleCreateRequest = () => {
    if (newRequest.cropName && newRequest.quantity > 0 && newRequest.maxPrice > 0) {
      const request: DemandRequest = {
        id: Date.now().toString(),
        consumer: {
          name: 'You',
          location: 'Pune, Maharashtra',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
        },
        ...newRequest,
        status: 'open',
        responses: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setDemands([request, ...demands]);
      setNewRequest({
        cropName: '',
        quantity: 0,
        unit: 'kg',
        maxPrice: 0,
        requiredBy: '',
        description: '',
        preferences: []
      });
      setShowNewRequest(false);
    }
  };

  const handlePreferenceToggle = (preference: string) => {
    setNewRequest(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const preferenceOptions = [
    { id: 'organic', label: 'Organic' },
    { id: 'pesticide-free', label: 'Pesticide-Free' },
    { id: 'local', label: 'Local (< 50km)' },
    { id: 'delivery', label: 'Home Delivery' },
    { id: 'bulk', label: 'Bulk Quantity' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'matched':
        return 'bg-blue-100 text-blue-800';
      case 'fulfilled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'matched':
        return <MessageCircle className="h-4 w-4" />;
      case 'fulfilled':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsumerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Demand Board</h2>
            <p className="text-gray-600">Post requests for specific produce and connect with farmers</p>
          </div>
          <button
            onClick={() => setShowNewRequest(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Request</span>
          </button>
        </div>

        {/* New Request Form */}
        {showNewRequest && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Demand Request</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
                <input
                  type="text"
                  value={newRequest.cropName}
                  onChange={(e) => setNewRequest({ ...newRequest, cropName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Organic Tomatoes"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({ ...newRequest, quantity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={newRequest.unit}
                    onChange={(e) => setNewRequest({ ...newRequest, unit: e.target.value })}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price per {newRequest.unit}</label>
                <input
                  type="number"
                  value={newRequest.maxPrice}
                  onChange={(e) => setNewRequest({ ...newRequest, maxPrice: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="₹"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required By</label>
                <input
                  type="date"
                  value={newRequest.requiredBy}
                  onChange={(e) => setNewRequest({ ...newRequest, requiredBy: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                placeholder="Describe your requirements, intended use, quality expectations, etc."
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferences</label>
              <div className="flex flex-wrap gap-2">
                {preferenceOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handlePreferenceToggle(option.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      newRequest.preferences.includes(option.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleCreateRequest}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Post Request
              </button>
              <button
                onClick={() => setShowNewRequest(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Demand Requests */}
        <div className="space-y-6">
          {demands.map((demand) => (
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
                        <User className="h-4 w-4 mr-1" />
                        {demand.consumer.name}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {demand.consumer.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(demand.status)}`}>
                    {getStatusIcon(demand.status)}
                    <span>{demand.status.charAt(0).toUpperCase() + demand.status.slice(1)}</span>
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{demand.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quantity</p>
                  <p className="text-gray-800">{demand.quantity} {demand.unit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Max Price</p>
                  <p className="text-gray-800">₹{demand.maxPrice}/{demand.unit}</p>
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
                  {demand.status === 'open' && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Respond to Request
                    </button>
                  )}
                  {demand.status === 'matched' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>View Responses</span>
                    </button>
                  )}
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {demands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No demand requests yet.</p>
            <p className="text-gray-400 mt-2">Be the first to post a request for specific produce!</p>
          </div>
        )}
      </main>
    </div>
  );
};