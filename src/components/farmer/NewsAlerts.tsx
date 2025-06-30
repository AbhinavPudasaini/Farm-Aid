import React from 'react';
import { AlertTriangle, Info, Award, Calendar } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'info' | 'subsidy' | 'news';
  title: string;
  message: string;
  date: string;
}

export const NewsAlerts: React.FC = () => {
  const alerts: Alert[] = [
    {
      id: 1,
      type: 'subsidy',
      title: 'New Crop Insurance Scheme',
      message: 'Apply for the enhanced crop insurance with 80% premium subsidy',
      date: '2 hours ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pest Alert: Fall Armyworm',
      message: 'High risk detected in nearby regions. Check your maize crops',
      date: '5 hours ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'Weather Advisory',
      message: 'Light rainfall expected next week. Plan your irrigation accordingly',
      date: '1 day ago'
    },
    {
      id: 4,
      type: 'news',
      title: 'Market Update',
      message: 'Organic produce demand increases by 30% this season',
      date: '2 days ago'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'subsidy':
        return <Award className="h-5 w-5 text-green-500" />;
      case 'news':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'subsidy':
        return 'bg-green-50 border-green-200';
      case 'news':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Alerts & News</h3>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-lg border ${getBgColor(alert.type)} hover:shadow-sm transition-shadow`}>
            <div className="flex items-start space-x-3">
              {getIcon(alert.type)}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm">{alert.title}</p>
                <p className="text-gray-600 text-sm mt-1">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-2">{alert.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
        View All Alerts →
      </button>
    </div>
  );
};