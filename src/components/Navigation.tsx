import React from 'react';
import { Home, User, Settings } from 'lucide-react';
import { clsx } from 'clsx';

type ActiveTab = 'dashboard' | 'profile' | 'settings';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden mobile-safe-area">
      <div className="flex justify-around">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={clsx(
              'nav-item flex-1 touch-target',
              activeTab === id ? 'active' : ''
            )}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;