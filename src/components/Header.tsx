import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 mobile-safe-area">
      <div className="max-w-7xl mx-auto mobile-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
              VarsityConnect
            </h1>
            <h1 className="text-lg font-bold text-gray-900 sm:hidden">
              VC
            </h1>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search students, courses..."
                className="input pl-10 pr-4 py-2"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <button className="md:hidden touch-target flex items-center justify-center text-gray-500 hover:text-gray-700">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Notifications */}
            <button className="touch-target flex items-center justify-center text-gray-500 hover:text-gray-700 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Menu - Mobile only */}
            <button className="md:hidden touch-target flex items-center justify-center text-gray-500 hover:text-gray-700">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;