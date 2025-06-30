import React from 'react';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

interface Order {
  id: string;
  farmer: string;
  items: string[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  date: string;
}

export const OrderSummary: React.FC = () => {
  const orders: Order[] = [
    {
      id: '1',
      farmer: 'Raj Patel',
      items: ['Tomatoes (5kg)', 'Onions (3kg)'],
      total: 321,
      status: 'confirmed',
      date: '2024-01-18'
    },
    {
      id: '2',
      farmer: 'Sunita Sharma',
      items: ['Spinach (2kg)', 'Carrots (4kg)'],
      total: 190,
      status: 'delivered',
      date: '2024-01-15'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'confirmed':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium">
          View All Orders
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-gray-800">Order #{order.id}</p>
                <p className="text-sm text-gray-600">From {order.farmer}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
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
                Ordered on {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="font-semibold text-gray-800">₹{order.total}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-3">
          <Truck className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-800">Next Delivery</p>
            <p className="text-sm text-green-600">Tomorrow, 10:00 AM - Fresh vegetables from Raj Patel</p>
          </div>
        </div>
      </div>
    </div>
  );
};