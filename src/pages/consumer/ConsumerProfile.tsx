import React, { useState } from 'react';
import { ConsumerHeader } from '../../components/consumer/ConsumerHeader';
import { 
  Edit3, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  User, 
  Building, 
  Heart, 
  ShoppingCart, 
  Bell,
  Star,
  Package,
  TrendingUp,
  Users,
  Award,
  Settings,
  CreditCard,
  Truck,
  Clock,
  CheckCircle,
  Eye,
  Camera
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface OrderHistory {
  id: string;
  farmer: {
    name: string;
    avatar: string;
    farmName: string;
  };
  items: string[];
  total: number;
  status: 'delivered' | 'pending' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  rating?: number;
}

interface Subscription {
  id: string;
  farmer: {
    name: string;
    avatar: string;
    farmName: string;
  };
  cropType: string;
  frequency: 'weekly' | 'bi-weekly' | 'monthly';
  nextDelivery: string;
  status: 'active' | 'paused';
  totalOrders: number;
}

interface FavoriteFarmer {
  id: string;
  name: string;
  farmName: string;
  avatar: string;
  location: string;
  rating: number;
  specialties: string[];
  lastOrdered: string;
}

export const ConsumerProfile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'subscriptions' | 'favorites' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    phone: '+91 9876543211',
    email: 'priya.sharma@email.com',
    location: 'Mumbai, Maharashtra',
    type: 'personal' as 'personal' | 'business',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    joinDate: '2024-01-15',
    preferences: {
      organic: true,
      localFarmers: true,
      notifications: true,
      weeklyDelivery: false
    }
  });

  const orderHistory: OrderHistory[] = [
    {
      id: 'ORD-001',
      farmer: {
        name: 'Raj Patel',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        farmName: 'Green Valley Farm'
      },
      items: ['Organic Tomatoes (5kg)', 'Fresh Spinach (2kg)'],
      total: 450,
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-17',
      rating: 5
    },
    {
      id: 'ORD-002',
      farmer: {
        name: 'Sunita Sharma',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        farmName: 'Organic Harvest'
      },
      items: ['Mixed Vegetables (10kg)', 'Fresh Herbs (1kg)'],
      total: 680,
      status: 'delivered',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-12',
      rating: 4
    },
    {
      id: 'ORD-003',
      farmer: {
        name: 'Amit Kumar',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        farmName: 'Sustainable Farms'
      },
      items: ['Organic Carrots (3kg)', 'Fresh Lettuce (1kg)'],
      total: 320,
      status: 'pending',
      orderDate: '2024-01-18'
    }
  ];

  const subscriptions: Subscription[] = [
    {
      id: 'SUB-001',
      farmer: {
        name: 'Raj Patel',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        farmName: 'Green Valley Farm'
      },
      cropType: 'Mixed Vegetables',
      frequency: 'weekly',
      nextDelivery: '2024-01-22',
      status: 'active',
      totalOrders: 8
    },
    {
      id: 'SUB-002',
      farmer: {
        name: 'Sunita Sharma',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
        farmName: 'Organic Harvest'
      },
      cropType: 'Leafy Greens',
      frequency: 'bi-weekly',
      nextDelivery: '2024-01-25',
      status: 'active',
      totalOrders: 4
    }
  ];

  const favoriteFarmers: FavoriteFarmer[] = [
    {
      id: '1',
      name: 'Raj Patel',
      farmName: 'Green Valley Farm',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      location: 'Pune, Maharashtra',
      rating: 4.8,
      specialties: ['Organic Vegetables', 'Herbs'],
      lastOrdered: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sunita Sharma',
      farmName: 'Organic Harvest',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      location: 'Nashik, Maharashtra',
      rating: 4.9,
      specialties: ['Leafy Greens', 'Seasonal Fruits'],
      lastOrdered: '2024-01-10'
    }
  ];

  const stats = {
    totalOrders: orderHistory.length,
    totalSpent: orderHistory.reduce((sum, order) => sum + order.total, 0),
    favoriteFarmers: favoriteFarmers.length,
    activeSubscriptions: subscriptions.filter(sub => sub.status === 'active').length
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubscriptionStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsumerHeader />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h2>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="relative">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full text-white hover:bg-green-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <p className="text-gray-600 capitalize">{profileData.type} Account</p>
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profileData.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(profileData.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalSpent}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorite Farmers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.favoriteFarmers}</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSubscriptions}</p>
              </div>
              <Bell className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { id: 'profile', label: 'Profile Details', icon: User },
              { id: 'orders', label: 'Order History', icon: Package },
              { id: 'subscriptions', label: 'Subscriptions', icon: Bell },
              { id: 'favorites', label: 'Favorite Farmers', icon: Heart },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-6 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h3>
            
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <select
                    value={profileData.type}
                    onChange={(e) => setProfileData({ ...profileData, type: e.target.value as 'personal' | 'business' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="personal">Personal</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                
                <div className="md:col-span-2 flex space-x-4">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="font-medium text-gray-900">{profileData.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-medium text-gray-900">{profileData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{profileData.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{profileData.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Account Type</p>
                      <p className="font-medium text-gray-900 capitalize">{profileData.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="font-medium text-gray-900">{new Date(profileData.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Order History</h3>
            
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={order.farmer.avatar}
                        alt={order.farmer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.farmer.farmName} - {order.farmer.name}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                    <ul className="text-sm text-gray-600">
                      {order.items.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Ordered: {new Date(order.orderDate).toLocaleDateString()}</span>
                      {order.deliveryDate && (
                        <span>Delivered: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      {order.rating && (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < order.rating!
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <p className="font-semibold text-gray-900">₹{order.total}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">My Subscriptions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={subscription.farmer.avatar}
                        alt={subscription.farmer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{subscription.cropType}</h4>
                        <p className="text-sm text-gray-600">{subscription.farmer.farmName}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Frequency</span>
                      <span className="font-medium capitalize">{subscription.frequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Next Delivery</span>
                      <span className="font-medium">{new Date(subscription.nextDelivery).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Orders</span>
                      <span className="font-medium">{subscription.totalOrders}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Manage
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      Pause
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Favorite Farmers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favoriteFarmers.map((farmer) => (
                <div key={farmer.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{farmer.name}</h4>
                      <p className="text-sm text-gray-600">{farmer.farmName}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{farmer.rating}</span>
                        <span className="text-sm text-gray-500 ml-2">{farmer.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {farmer.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Last ordered: {new Date(farmer.lastOrdered).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                        View Farm
                      </button>
                      <button className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors">
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Preferences</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.organic}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        preferences: { ...profileData.preferences, organic: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Prefer organic produce</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.localFarmers}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        preferences: { ...profileData.preferences, localFarmers: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Prioritize local farmers</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.notifications}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        preferences: { ...profileData.preferences, notifications: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.weeklyDelivery}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        preferences: { ...profileData.preferences, weeklyDelivery: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Weekly delivery reminders</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Account Actions</h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Change Password</span>
                      <span className="text-gray-400">→</span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Download My Data</span>
                      <span className="text-gray-400">→</span>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-red-600">Delete Account</span>
                      <span className="text-red-400">→</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};