import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Menu, Sprout, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const FarmerHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/farmer/dashboard', label: 'Dashboard' },
    { path: '/farmer/crop-planner', label: 'Crop Planner' },
    { path: '/farmer/voice-assistant', label: 'AI Assistant' },
    { path: '/farmer/product-listing', label: 'Products' },
    { path: '/farmer/profile', label: 'Profile' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/farmer/dashboard" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-600">FarmAid AI</h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <a
  href="https://bolt.new/"
  target="_blank"
  rel="noopener noreferrer"
  className="ml-4 flex items-center"
  title="Built for Bolt Hackathon"
>
  <img
    src="/bolt_logo.png"
    alt="Bolt New"
    className="h-14 w-auto"
  />
</a>

            <button 
              onClick={handleLogout}
              className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Logout"
            >
              <LogOut className="h-6 w-6" />
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
