import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { LandingPage } from './LandingPage';
import { 
  GraduationCap, 
  Building2, 
  Mail, 
  Lock, 
  ArrowLeft,
  Sparkles,
  Zap,
  Heart,
} from 'lucide-react-native';
import { UserRole } from '../App';
import Toast from 'react-native-toast-message';

interface LoginScreenProps {
  onLogin: (email: string, password: string, role: UserRole) => Promise<void>;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showLanding, setShowLanding] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedRole) {
      Toast.show({
        type: 'error',
        text1: 'Please select your role first! 🎯',
      });
      return;
    }
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all fields! 📝',
      });
      return;
    }

    setLoading(true);
    try {
      await onLogin(email, password, selectedRole);
      Toast.show({
        type: 'success',
        text1: 'Welcome to Mzansi Career Connect! 🎉',
      });
    } catch (error) {
      console.error('Login failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Login failed. Please check your credentials! 😅',
      });
    } finally {
      setLoading(false);
    }
  };

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <View className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onPress={() => setShowLanding(true)}
      >
        <ArrowLeft size={18} color="#06b6d4" style={{ marginRight: 6 }} />
        Back to Home
      </Button>

      <Card>
        <CardHeader className="text-center pb-6">
          <View className="flex flex-row justify-center gap-3 mb-4">
            <View className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles size={22} color="white" />
            </View>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <View className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center">
              <Heart size={22} color="white" />
            </View>
          </View>
          <CardDescription>Continue your journey with Mzansi Career Connect 🇿🇦</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!selectedRole && (
            <View>
              <Label className="text-center block text-lg font-semibold mb-4">
                Choose your path 🎯
              </Label>
              <Button onPress={() => setSelectedRole('student')}>
                <GraduationCap size={20} color="white" style={{ marginRight: 8 }} />
                I'm a Student 🎓
              </Button>
              <Button onPress={() => setSelectedRole('company')}>
                <Building2 size={20} color="white" style={{ marginRight: 8 }} />
                I'm a Company 🏢
              </Button>
            </View>
          )}

          {selectedRole && (
            <View>
              <Label>Email Address</Label>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@university.ac.za"
              />

              <Label>Password</Label>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
              />

              <Button onPress={handleSubmit} disabled={loading}>
                <Zap size={20} color="white" style={{ marginRight: 8 }} />
                {selectedRole === 'student' ? 'Start My Journey 🚀' : 'Access Dashboard 🎯'}
              </Button>
            </View>
          )}
        </CardContent>
      </Card>
    </View>
  );
}
