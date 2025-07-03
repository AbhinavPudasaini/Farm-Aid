import React from 'react';
import { ConsumerHeader } from '../../components/consumer/ConsumerHeader';
import { OrderSummary } from '../../components/consumer/OrderSummary';
import { SubscriptionAlerts } from '../../components/consumer/SubscriptionAlerts';
import { RecommendedFarmers } from '../../components/consumer/RecommendedFarmers';
import { DemandAlerts } from '../../components/consumer/DemandAlerts';
import { useUser } from '../../context/UserContext';

export const ConsumerDashboard: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsumerHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {/* Welcome back, {user?.name.split(' ')[0]}! 🛒 */}
          </h2>
          <p className="text-gray-600">Fresh produce from local farmers, delivered to your door</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <OrderSummary />
          </div>
          
          <div className="lg:col-span-1">
            <SubscriptionAlerts />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <RecommendedFarmers />
          </div>
          
          <div className="xl:col-span-1">
            <DemandAlerts />
          </div>
        </div>
      </main>
    </div>
  );
};