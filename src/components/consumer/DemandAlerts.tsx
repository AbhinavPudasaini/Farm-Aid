import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle, Clock } from 'lucide-react';

interface DemandAlert {
  id: string;
  crop: string;
  status: 'matched' | 'pending';
  farmers: number;
  message: string;
  date: string;
}

export const DemandAlerts: React.FC = () => {
  const alerts: DemandAlert[] = [
    {
      id: '1',
      crop: 'Organic Tomatoes',
      status: 'matched',
      farmers: 3,
      message: '3 farmers responded to your tomato request',
      date: '2024-01-18'
    },
    {
      id: '2',
      crop: 'Fresh Spinach',
      status: 'pending',
      farmers: 0,
      message: 'Still looking for spinach suppliers in your area',
      date: '2024-01-17'
    }
  ];

  const getStatusIcon = (status: string) => {
    return status === 'matched' 
      ? <CheckCircle className="h-4 w-4 text-green-500" />
      : <Clock className="h-4 w-4 text-yellow-500" />;
  };

  const getStatusColor = (status: string) => {
    return status === 'matched'
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Demand Alerts</h3>
        <Link
          to="/consumer/demand-board"
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          View Board
        </Link>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-800">{alert.crop}</p>
                <p className="text-sm text-gray-600">{alert.message}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(alert.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                {new Date(alert.date).toLocaleDateString()}
              </p>
              {alert.status === 'matched' && (
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  View Responses
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3">
          <Bell className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-800">Create New Demand</p>
            <p className="text-sm text-blue-600">Post a request for specific produce you need</p>
          </div>
        </div>
      </div>
    </div>
  );
};