import React from 'react';
import { Bell, Calendar, User } from 'lucide-react';

interface Subscription {
  id: string;
  farmer: string;
  crop: string;
  frequency: string;
  nextDelivery: string;
  status: 'active' | 'paused';
}

export const SubscriptionAlerts: React.FC = () => {
  const subscriptions: Subscription[] = [
    {
      id: '1',
      farmer: 'Raj Patel',
      crop: 'Mixed Vegetables',
      frequency: 'Weekly',
      nextDelivery: '2024-01-22',
      status: 'active'
    },
    {
      id: '2',
      farmer: 'Sunita Sharma',
      crop: 'Leafy Greens',
      frequency: 'Bi-weekly',
      nextDelivery: '2024-01-25',
      status: 'active'
    }
  ];

  const alerts = [
    {
      id: '1',
      type: 'harvest',
      message: 'Organic tomatoes from Raj Patel will be ready for harvest tomorrow!',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'demand',
      message: 'Your demand for fresh spinach has been matched with 2 farmers',
      time: '5 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Subscriptions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Subscriptions</h3>
        
        <div className="space-y-3">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-800">{sub.crop}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <User className="h-4 w-4 mr-1" />
                    {sub.farmer}
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {sub.status}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {sub.frequency} • Next: {new Date(sub.nextDelivery).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 text-sm text-green-600 hover:text-green-700 font-medium">
          Manage Subscriptions
        </button>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Alerts</h3>
        
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-800">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Alerts
        </button>
      </div>
    </div>
  );
};