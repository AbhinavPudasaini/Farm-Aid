import React from 'react';
import { Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  farmerName: string;
  location: string;
}

export const Header: React.FC<HeaderProps> = ({ farmerName, location }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600">FarmAid AI</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{farmerName}</p>
              <p className="text-xs text-gray-500">{location}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
              <User className="h-6 w-6" />
            </button>
            <button className="md:hidden p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};