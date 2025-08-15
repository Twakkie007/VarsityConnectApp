import React from 'react';
import { MapPin, Mail, Phone, Calendar, Award, BookOpen, Users } from 'lucide-react';

const Profile: React.FC = () => {
  const achievements = [
    { title: 'Study Group Leader', description: 'Led 5+ study groups', icon: Users },
    { title: 'Course Completer', description: 'Completed 10 courses', icon: BookOpen },
    { title: 'Top Contributor', description: 'Most helpful answers', icon: Award },
  ];

  const courses = [
    { name: 'Computer Science 101', grade: 'A', semester: 'Fall 2024' },
    { name: 'Data Structures', grade: 'A-', semester: 'Fall 2024' },
    { name: 'Web Development', grade: 'B+', semester: 'Spring 2024' },
    { name: 'Database Systems', grade: 'A', semester: 'Spring 2024' },
  ];

  return (
    <div className="mobile-padding py-6 space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-2xl">JD</span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
            <p className="text-lg text-gray-600 mb-2">Computer Science Major</p>
            <p className="text-gray-600 mb-4">
              Passionate about technology and connecting with fellow students. 
              Always eager to learn and share knowledge.
            </p>
            <button className="btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">john.doe@university.edu</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">University Campus, Building A</span>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-gray-700">Joined September 2023</span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
        <div className="grid gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-primary-100 rounded-lg">
                <achievement.icon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Courses */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Record</h2>
        <div className="space-y-3">
          {courses.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.semester}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {course.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600">1,234</div>
          <div className="text-sm text-gray-600">Connections</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">15</div>
          <div className="text-sm text-gray-600">Study Groups</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">3.8</div>
          <div className="text-sm text-gray-600">GPA</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;