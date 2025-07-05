import React, { useState, useEffect } from 'react';
import { ConsumerHeader } from '../../components/consumer/ConsumerHeader';
import { Plus, MapPin, Calendar, User, MessageCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface DemandRequest {
  id: string;
  consumer_id: string;
  crop_name: string;
  quantity: number;
  unit: string;
  max_price: number;
  required_by: string;
  description: string;
  preferences: string[];
  status: 'open' | 'matched' | 'fulfilled';
  location: string;
  created_at: string;
  // Joined data
  consumer?: {
    name: string;
    location: string;
    avatar: string;
  };
  responses?: number;
}

export const DemandBoard: React.FC = () => {
  const { user } = useAuth();
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [demands, setDemands] = useState<DemandRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newRequest, setNewRequest] = useState({
    crop_name: '',
    quantity: 0,
    unit: 'kg',
    max_price: 0,
    required_by: '',
    description: '',
    preferences: [] as string[]
  });

  const preferenceOptions = [
    { id: 'organic', label: 'Organic' },
    { id: 'pesticide-free', label: 'Pesticide-Free' },
    { id: 'local', label: 'Local (< 50km)' },
    { id: 'delivery', label: 'Home Delivery' },
    { id: 'bulk', label: 'Bulk Quantity' }
  ];

  // Fetch demand requests from Supabase
  const fetchDemands = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('demand_requests')
        .select(`
          *,
          consumer:consumer_id (
            name,
            location,
            avatar
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching demands:', error);
        setError('Failed to load demand requests');
      } else {
        // Transform data to match interface
        const transformedData = data?.map(item => ({
          ...item,
          consumer: {
            name: item.consumer?.name || 'Anonymous',
            location: item.consumer?.location || item.location,
            avatar: item.consumer?.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
          },
          responses: 0 // TODO: Count actual responses from a responses table
        })) || [];
        
        setDemands(transformedData);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load demand requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemands();
  }, []);

  const handleCreateRequest = async () => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    if (!newRequest.crop_name || newRequest.quantity <= 0 || newRequest.max_price <= 0) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const requestData = {
        consumer_id: user.id,
        crop_name: newRequest.crop_name,
        quantity: newRequest.quantity,
        unit: newRequest.unit,
        max_price: newRequest.max_price,
        required_by: newRequest.required_by,
        description: newRequest.description,
        preferences: newRequest.preferences,
        location: user.location || 'Pune, Maharashtra',
        status: 'open'
      };

      const { data, error } = await supabase
        .from('demand_requests')
        .insert([requestData])
        .select(`
          *,
          consumer:consumer_id (
            name,
            location,
            avatar
          )
        `)
        .single();

      if (error) {
        console.error('Error creating demand request:', error);
        setError('Failed to create demand request: ' + error.message);
      } else {
        // Transform and add to local state
        const transformedData = {
          ...data,
          consumer: {
            name: data.consumer?.name || user.name || 'You',
            location: data.consumer?.location || user.location || 'Pune, Maharashtra',
            avatar: data.consumer?.avatar || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg'
          },
          responses: 0
        };

        setDemands(prev => [transformedData, ...prev]);
        
        // Reset form
        setNewRequest({
          crop_name: '',
          quantity: 0,
          unit: 'kg',
          max_price: 0,
          required_by: '',
          description: '',
          preferences: []
        });
        setShowNewRequest(false);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to create demand request');
    } finally {
      setLoading(false);
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* New Request Form */}
        {showNewRequest && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Demand Request</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
                <input
                  type="text"
                  value={newRequest.crop_name}
                  onChange={(e) => setNewRequest({ ...newRequest, crop_name: e.target.value })}
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
                    onChange={(e) => setNewRequest({ ...newRequest, quantity: parseInt(e.target.value) || 0 })}
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
                  value={newRequest.max_price}
                  onChange={(e) => setNewRequest({ ...newRequest, max_price: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="₹"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required By</label>
                <input
                  type="date"
                  value={newRequest.required_by}
                  onChange={(e) => setNewRequest({ ...newRequest, required_by: e.target.value })}
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
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Post Request'}
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
        {loading && demands.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading demand requests...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {demands.map((demand) => (
              <div key={demand.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={demand.consumer?.avatar}
                      alt={demand.consumer?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{demand.crop_name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {demand.consumer?.name}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {demand.consumer?.location}
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
                    <p className="text-gray-800">₹{demand.max_price}/{demand.unit}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Required By</p>
                    <div className="flex items-center text-gray-800">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(demand.required_by).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Responses</p>
                    <p className="text-gray-800">{demand.responses || 0} farmers</p>
                  </div>
                </div>

                {demand.preferences && demand.preferences.length > 0 && (
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
                    Posted on {new Date(demand.created_at).toLocaleDateString()}
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
        )}

        {!loading && demands.length === 0 && (
          <div className="text-center py-12">
            <Plus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No demand requests yet.</p>
            <p className="text-gray-400 mt-2">Be the first to post a request for specific produce!</p>
          </div>
        )}
      </main>
    </div>
  );
};