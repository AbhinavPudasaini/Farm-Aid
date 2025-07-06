import React from 'react';
import { Link } from 'react-router-dom';
import { FarmerHeader } from '../../components/farmer/FarmerHeader';
import { MarketPrices } from '../../components/farmer/MarketPrices';
import { useUser } from '../../context/UserContext';
import { Bot, Bell, TrendingUp, Calendar, Package, Users, MessageSquare, CheckCircle, Clock, AlertTriangle, Cloud, Sun, CloudRain, Wind, Droplets, MapPin, Phone, Eye } from 'lucide-react';

interface Notification {
  id: string;
  type: 'harvest' | 'order' | 'weather' | 'market' | 'subsidy';
  title: string;
  message: string;
  time: string;
  urgent?: boolean;
  actionLabel?: string;
}

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'processing';
  date: string;
  deliveryDate?: string;
}

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  location: string;
}

export const FarmerDashboard: React.FC = () => {
  const { user } = useUser();

  const weather: WeatherData = {
    temperature: 28,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
    location: ''
  };

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'harvest',
      title: 'Tomatoes Ready for Harvest!',
      message: 'Your tomato crop in North Field is ready for harvest. Optimal quality achieved.',
      time: '2 hours ago',
      urgent: true,
      actionLabel: 'View Details'
    },
    {
      id: '2',
      type: 'order',
      title: 'New Order Received',
      message: 'Priya Sharma ordered 25kg organic tomatoes for delivery tomorrow.',
      time: '4 hours ago',
      actionLabel: 'View Order'
    },
    {
      id: '3',
      type: 'weather',
      title: 'Weather Alert',
      message: 'Light rainfall expected tomorrow. Plan irrigation accordingly.',
      time: '6 hours ago'
    },
    {
      id: '4',
      type: 'market',
      title: 'Price Update',
      message: 'Tomato prices increased by 8% in local market. Good time to sell!',
      time: '8 hours ago',
      actionLabel: 'Check Prices'
    },
    {
      id: '5',
      type: 'subsidy',
      title: 'Subsidy Application Approved',
      message: 'Your crop insurance subsidy application has been approved. ₹15,000 credited.',
      time: '1 day ago',
      actionLabel: 'View Details'
    }
  ];

  const currentOrders: Order[] = [
    {
      id: 'ORD-001',
      customer: 'Priya Sharma',
      items: ['Tomatoes (25kg)', 'Onions (10kg)'],
      total: 1450,
      status: 'confirmed',
      date: '2024-01-18',
      deliveryDate: '2024-01-20'
    },
    {
      id: 'ORD-002',
      customer: 'Rajesh Kumar',
      items: ['Spinach (5kg)', 'Carrots (8kg)'],
      total: 485,
      status: 'processing',
      date: '2024-01-17'
    },
    {
      id: 'ORD-003',
      customer: 'Sunita Devi',
      items: ['Mixed Vegetables (15kg)'],
      total: 750,
      status: 'pending',
      date: '2024-01-16'
    }
  ];

  const orderHistory: Order[] = [
    {
      id: 'ORD-004',
      customer: 'Amit Patel',
      items: ['Tomatoes (20kg)', 'Leafy Greens (3kg)'],
      total: 1200,
      status: 'delivered',
      date: '2024-01-15'
    },
    {
      id: 'ORD-005',
      customer: 'Meera Singh',
      items: ['Organic Vegetables (12kg)'],
      total: 960,
      status: 'delivered',
      date: '2024-01-14'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'harvest':
        return <Package className="h-5 w-5 text-green-600" />;
      case 'order':
        return <Users className="h-5 w-5 text-blue-600" />;
      case 'weather':
        return <Cloud className="h-5 w-5 text-gray-600" />;
      case 'market':
        return <TrendingUp className="h-5 w-5 text-purple-600" />;
      case 'subsidy':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationBg = (type: string, urgent?: boolean) => {
    if (urgent) return 'bg-red-50 border-red-200';
    
    switch (type) {
      case 'harvest':
        return 'bg-green-50 border-green-200';
      case 'order':
        return 'bg-blue-50 border-blue-200';
      case 'weather':
        return 'bg-gray-50 border-gray-200';
      case 'market':
        return 'bg-purple-50 border-purple-200';
      case 'subsidy':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'rainy': return <CloudRain className="h-8 w-8 text-blue-500" />;
      default: return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FarmerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Good morning, {user?.name.split(' ')[0]}! 🌱
          </h2>
          <p className="text-gray-600">Here's what's happening on your farm today</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-8">
            {/* Horizontal Weather Widget */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-4">
                    {getWeatherIcon()}
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{weather.temperature}°C</p>
                      <p className="text-gray-600 capitalize">{weather.condition}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
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
                      <p className="text-xs text-gray-600">Rain</p>
                      <p className="font-semibold">{weather.precipitation}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {weather.location}
                  </div>
                  <p className="text-sm text-gray-500">Today's Weather</p>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Orders */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">My Orders</h3>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {currentOrders.length} active
                  </span>
                </div>

                <div className="space-y-4">
                  {currentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-gray-800">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Items:</p>
                        <ul className="text-sm text-gray-800">
                          {order.items.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="font-semibold text-gray-800">₹{order.total}</p>
                      </div>

                      {order.deliveryDate && (
                        <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                          Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All Orders
                </button>
              </div>

              {/* Order History */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Order History</h3>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {orderHistory.length} completed
                  </span>
                </div>

                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-gray-800">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Items:</p>
                        <ul className="text-sm text-gray-800">
                          {order.items.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p className="font-semibold text-gray-800">₹{order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 text-sm text-gray-600 hover:text-gray-700 font-medium">
                  View Complete History
                </button>
              </div>
            </div>

            {/* Market Prices */}
            <MarketPrices />
          </div>
          
          {/* Right Sidebar - Notifications */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-gray-600" />
                  Notifications
                </h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  {notifications.filter(n => n.urgent).length} urgent
                </span>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all hover:shadow-sm ${getNotificationBg(notification.type, notification.urgent)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {notification.urgent ? (
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 mb-1">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {notification.time}
                          </div>
                          
                          {notification.actionLabel && (
                            <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                              {notification.actionLabel}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors">
                View All Notifications
              </button>
            </div>
          </div>
        </div>

        {/* Ask AI Button - Bottom Right */}
        <Link
          to="/farmer/voice-assistant"
          className="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-110 z-50"
        >
          <Bot className="h-8 w-8" />
        </Link>
      </main>
    </div>
  );
};
