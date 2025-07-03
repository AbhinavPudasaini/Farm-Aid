import React from 'react';
import { Calendar, Stethoscope, ShoppingCart, MessageCircle, Users, TrendingUp } from 'lucide-react';

interface QuickAccessCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

export const QuickAccessCards: React.FC = () => {
  const cards: QuickAccessCard[] = [
    {
      title: 'Crop Planner',
      description: 'Plan your seasonal crops',
      icon: <Calendar className="h-6 w-6" />,
      color: 'from-green-400 to-green-600',
      href: '/crop-planner'
    },
    {
      title: 'Disease Help',
      description: 'Diagnose crop problems',
      icon: <Stethoscope className="h-6 w-6" />,
      color: 'from-red-400 to-red-600',
      href: '/disease-help'
    },
    {
      title: 'Product Listing',
      description: 'List your produce',
      icon: <ShoppingCart className="h-6 w-6" />,
      color: 'from-blue-400 to-blue-600',
      href: '/product-listing'
    },
    {
      title: 'Messages',
      description: 'Chat with buyers',
      icon: <MessageCircle className="h-6 w-6" />,
      color: 'from-purple-400 to-purple-600',
      href: '/messages'
    },
    {
      title: 'Connect Buyers',
      description: 'Find local consumers',
      icon: <Users className="h-6 w-6" />,
      color: 'from-orange-400 to-orange-600',
      href: '/connect-buyers'
    },
    {
      title: 'Analytics',
      description: 'Track your progress',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-teal-400 to-teal-600',
      href: '/analytics'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <button
          key={index}
          className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
        >
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
            {card.icon}
          </div>
          <h4 className="font-semibold text-gray-800 text-left mb-1">{card.title}</h4>
          <p className="text-sm text-gray-600 text-left">{card.description}</p>
        </button>
      ))}
    </div>
  );
};