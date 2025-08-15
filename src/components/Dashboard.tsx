import React from 'react';
import { Users, BookOpen, Calendar, TrendingUp, MessageCircle, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Connections', value: '1,234', icon: Users, color: 'text-blue-600' },
    { label: 'Courses', value: '8', icon: BookOpen, color: 'text-green-600' },
    { label: 'Events', value: '12', icon: Calendar, color: 'text-purple-600' },
    { label: 'GPA', value: '3.8', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const quickActions = [
    { label: 'Find Study Groups', icon: Users, color: 'bg-blue-500' },
    { label: 'Browse Courses', icon: BookOpen, color: 'bg-green-500' },
    { label: 'Upcoming Events', icon: Calendar, color: 'bg-purple-500' },
    { label: 'Messages', icon: MessageCircle, color: 'bg-pink-500' },
  ];

  const recentActivity = [
    { type: 'connection', message: 'Sarah joined your study group', time: '2 hours ago' },
    { type: 'course', message: 'New assignment posted in CS 101', time: '4 hours ago' },
    { type: 'event', message: 'Tech meetup tomorrow at 6 PM', time: '1 day ago' },
    { type: 'achievement', message: 'You earned a new badge!', time: '2 days ago' },
  ];

  return (
    <div className="mobile-padding py-6 space-y-6">
      {/* Welcome Section */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-lg">JD</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Welcome back, John!</h2>
            <p className="text-gray-600">Ready to connect and learn today?</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gray-100`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 touch-target"
            >
              <div className={`p-3 rounded-full ${action.color} mb-2`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default Dashboard;