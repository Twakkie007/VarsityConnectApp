import React, { useState } from 'react';
import { 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  User,
  Lock,
  Smartphone
} from 'lucide-react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  const settingSections = [
    {
      title: 'Account',
      items: [
        { label: 'Personal Information', icon: User, hasToggle: false },
        { label: 'Privacy & Security', icon: Shield, hasToggle: false },
        { label: 'Password & Authentication', icon: Lock, hasToggle: false },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          label: 'Push Notifications', 
          icon: Bell, 
          hasToggle: true, 
          value: notifications,
          onChange: setNotifications
        },
        { 
          label: 'Dark Mode', 
          icon: Moon, 
          hasToggle: true, 
          value: darkMode,
          onChange: setDarkMode
        },
        { 
          label: 'Public Profile', 
          icon: Globe, 
          hasToggle: true, 
          value: publicProfile,
          onChange: setPublicProfile
        },
      ]
    },
    {
      title: 'App',
      items: [
        { label: 'Language', icon: Globe, hasToggle: false, value: 'English' },
        { label: 'App Version', icon: Smartphone, hasToggle: false, value: '1.0.0' },
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: HelpCircle, hasToggle: false },
        { label: 'Contact Support', icon: HelpCircle, hasToggle: false },
      ]
    }
  ];

  return (
    <div className="mobile-padding py-6 space-y-6">
      {/* Profile Section */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xl">JD</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
            <p className="text-gray-600">john.doe@university.edu</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      {settingSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
          <div className="space-y-1">
            {section.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {item.value && !item.hasToggle && (
                    <span className="text-sm text-gray-500">{item.value}</span>
                  )}
                  
                  {item.hasToggle ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.value as boolean}
                        onChange={(e) => item.onChange?.(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout Button */}
      <div className="card">
        <button className="w-full flex items-center justify-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 touch-target">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500 space-y-1">
        <p>VarsityConnect v1.0.0</p>
        <p>© 2024 VarsityConnect. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Settings;