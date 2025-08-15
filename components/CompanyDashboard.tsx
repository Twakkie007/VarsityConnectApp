import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { CompanyProfileModal } from './CompanyProfileModal';
import { 
  Building2, 
  LogOut, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  Star, 
  Crown, 
  Zap, 
  Target, 
  DollarSign,
  Calendar,
  MapPin,
  Globe,
  Edit,
  Save,
  Upload,
  BarChart3,
  PieChart,
  Activity,
  Rocket,
  Gift,
  CheckCircle,
  Lock,
  Unlock,
  CreditCard,
  ArrowUpRight,
  Trophy,
  Sparkles,
  Mail,
  Phone,
  MessageSquare,
  ExternalLink,
  Camera,
  Plus,
  Trash2,
  Settings,
  TestTube
} from 'lucide-react';
import { User as AppUser, CareerFair, Company } from '../App';
import { companyAPI } from '../utils/api';
import { toast } from 'sonner@2.0.3';

interface CompanyDashboardProps {
  user: AppUser;
  careerFair: CareerFair;
  onLogout: () => void;
  onCompanyUpdate: () => void;
  onBackToHub: () => void;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  color: string;
  popular?: boolean;
  description: string;
  maxAnalytics: number;
  maxConnections: number;
  prioritySupport: boolean;
  customBranding: boolean;
}

interface CompanyProfile {
  id?: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  website: string;
  careers_page?: string;
  company_size: string;
  founded_year: string;
  headquarters: string;
  benefits: string[];
  company_culture: string[];
  contact_email?: string;
  contact_phone?: string;
  linkedin_url?: string;
  twitter_url?: string;
  subscription_plan: string;
}

interface Analytics {
  profile_views: number;
  student_interests: number;
  profile_clicks: number;
  growth_rate: number;
  top_skills_sought: string[];
  student_engagement: {
    universities: { name: string; count: number }[];
    study_years: { year: string; count: number }[];
  };
}

export function CompanyDashboard({ user, careerFair, onLogout, onCompanyUpdate, onBackToHub }: CompanyDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showTierTester, setShowTierTester] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>({
    name: '',
    logo: '',
    industry: '',
    description: '',
    website: '',
    careers_page: '',
    company_size: '',
    founded_year: '',
    headquarters: '',
    benefits: [],
    company_culture: [],
    subscription_plan: 'starter'
  });

  // Mock analytics data - in real app, fetch from API
  const [analytics] = useState<Analytics>({
    profile_views: 1247,
    student_interests: 89,
    profile_clicks: 156,
    growth_rate: 23,
    top_skills_sought: ['React', 'Python', 'Data Analysis', 'UI/UX Design', 'Project Management'],
    student_engagement: {
      universities: [
        { name: 'University of Cape Town', count: 34 },
        { name: 'University of the Witwatersrand', count: 28 },
        { name: 'University of Pretoria', count: 19 },
        { name: 'University of Johannesburg', count: 8 }
      ],
      study_years: [
        { year: 'Final Year', count: 45 },
        { year: '3rd Year', count: 28 },
        { year: '2nd Year', count: 12 },
        { year: 'Postgraduate', count: 4 }
      ]
    }
  });

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 899,
      color: 'neon-cyan',
      description: 'Perfect for small companies getting started',
      maxAnalytics: 30,
      maxConnections: 50,
      prioritySupport: false,
      customBranding: false,
      features: [
        'Basic company profile',
        'Student view analytics (30 days)',
        'Standard placement in listings',
        'Career page link',
        'Up to 50 student connections',
        'Email support',
        'Basic QR code scanning',
        'Standard company logo display'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 1799,
      color: 'neon-purple',
      popular: true,
      description: 'Most popular choice for growing companies',
      maxAnalytics: 90,
      maxConnections: 200,
      prioritySupport: true,
      customBranding: true,
      features: [
        'Enhanced company profile with custom branding',
        'Detailed student analytics (90 days)',
        'Priority placement in listings',
        'Student interest notifications',
        'Up to 200 student connections',
        'Advanced QR code features',
        'Phone & email support',
        'University engagement insights',
        'Skills matching recommendations',
        'Professional badge display',
        'Enhanced company showcase'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 3599,
      color: 'neon-pink',
      description: 'Complete solution for large enterprises',
      maxAnalytics: 365,
      maxConnections: 1000,
      prioritySupport: true,
      customBranding: true,
      features: [
        'Premium company showcase with full customization',
        'Advanced student insights (365 days)',
        'Top placement guarantee',
        'Direct student contact capabilities',
        'Unlimited student connections',
        'Featured company badge',
        'Custom integrations & API access',
        'Dedicated account manager',
        'White-glove onboarding',
        'Advanced analytics dashboard',
        'Multi-recruiter team access',
        'Custom branded materials',
        'Priority customer success support'
      ]
    }
  ];

  const getCurrentPlan = () => {
    return subscriptionPlans.find(plan => plan.id === companyProfile.subscription_plan) || subscriptionPlans[0];
  };

  const handleProfileSave = async (formData: any) => {
    setLoading(true);
    try {
      await companyAPI.create(formData.name, {
        logo: formData.logo,
        industry: formData.industry,
        description: formData.description,
        website: formData.website,
        positions: formData.positions || [],
        requirements: formData.requirements || [],
        benefits: formData.benefits || [],
        headquarters: formData.headquarters,
        founded_year: formData.founded_year,
        company_size: formData.company_size,
        office_locations: formData.office_locations,
        company_values: formData.company_values,
        company_culture: formData.company_culture,
        mission_statement: formData.mission_statement,
        contact_email: formData.contact_email,
        linkedin_url: formData.linkedin_url
      });
      
      // Update local state
      setCompanyProfile(prev => ({
        ...prev,
        ...formData
      }));
      
      toast.success('Company profile saved successfully! 🎉');
      onCompanyUpdate();
    } catch (error) {
      console.error('Failed to save company profile:', error);
      throw error; // Re-throw so modal can handle it
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = (planId: string) => {
    setCompanyProfile(prev => ({
      ...prev,
      subscription_plan: planId
    }));
    toast.success(`Switched to ${subscriptionPlans.find(p => p.id === planId)?.name} plan! 🚀`);
  };

  const currentPlan = getCurrentPlan();
  const isBasicPlan = currentPlan.id === 'starter';
  const isProfessionalPlan = currentPlan.id === 'professional';
  const isEnterprisePlan = currentPlan.id === 'enterprise';

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-10 animate-pulse"></div>
      
      {/* Company Profile Modal */}
      {showProfileModal && (
        <CompanyProfileModal
          company={{
            ...companyProfile,
            id: companyProfile.id || '',
            positions: [],
            requirements: [],
            website: companyProfile.website || '',
            office_locations: [],
            company_values: [],
            company_culture: companyProfile.company_culture || [],
            mission_statement: '',
            contact_email: companyProfile.contact_email || '',
            linkedin_url: companyProfile.linkedin_url || ''
          }}
          onClose={() => setShowProfileModal(false)}
          onSave={handleProfileSave}
          loading={loading}
        />
      )}
      
      {/* Header */}
      <div className="border-b border-neon-purple/20 glass backdrop-blur-xl relative z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-neon-purple/50 neon-glow">
                <AvatarImage src={companyProfile.logo || `https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=48&h=48&fit=crop`} />
                <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-pink text-white font-bold">
                  {companyProfile.name ? companyProfile.name.charAt(0) : 'C'}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background neon-glow ${
                isEnterprisePlan ? 'bg-neon-pink' : isProfessionalPlan ? 'bg-neon-purple' : 'bg-neon-cyan'
              }`}></div>
            </div>
            <div>
              <h2 className="font-bold text-lg">{companyProfile.name || user.name}</h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                  {currentPlan.name} Plan
                </Badge>
                {currentPlan.popular && (
                  <Crown className="h-4 w-4 text-neon-yellow" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Tier Tester Toggle */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowTierTester(!showTierTester)}
              className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10"
            >
              <TestTube className="h-4 w-4 mr-2" />
              {showTierTester ? 'Hide' : 'Test'} Tiers
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLogout}
              className="hover:bg-destructive/20 hover:text-destructive transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tier Tester */}
        {showTierTester && (
          <div className="border-t border-neon-yellow/20 p-4 bg-neon-yellow/5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <TestTube className="h-4 w-4 text-neon-yellow" />
                <span className="text-sm font-medium text-neon-yellow">Tier Testing Mode:</span>
              </div>
              <div className="flex gap-2">
                {subscriptionPlans.map((plan) => (
                  <Button
                    key={plan.id}
                    size="sm"
                    variant={currentPlan.id === plan.id ? "default" : "outline"}
                    onClick={() => handlePlanChange(plan.id)}
                    className={`${
                      currentPlan.id === plan.id 
                        ? `gradient-${plan.color.replace('neon-', '')} text-white` 
                        : `border-${plan.color} text-${plan.color} hover:bg-${plan.color}/10`
                    }`}
                  >
                    {plan.name}
                    {plan.popular && <Crown className="h-3 w-3 ml-1" />}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Career Fair Info */}
      <div className="border-b border-neon-cyan/20 gradient-cyan p-6 relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{careerFair.name} ✨</h1>
            <p className="text-white/80 text-sm">Connect with top talent! 🎯</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/90">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(careerFair.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {careerFair.location}
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {analytics.student_interests} interested students 🌟
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50 border border-neon-purple/20">
            <TabsTrigger 
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-cyan data-[state=active]:to-neon-purple data-[state=active]:text-white"
            >
              Dashboard 📊
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-pink data-[state=active]:text-white"
            >
              Profile 🏢
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink data-[state=active]:to-neon-yellow data-[state=active]:text-white"
            >
              Analytics 📈
            </TabsTrigger>
            <TabsTrigger 
              value="billing"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-yellow data-[state=active]:to-neon-cyan data-[state=active]:text-white"
            >
              Billing 💳
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="glass border-neon-cyan/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Profile Views</p>
                      <p className="text-2xl font-bold text-neon-cyan">{analytics.profile_views.toLocaleString()}</p>
                    </div>
                    <Eye className="h-8 w-8 text-neon-cyan" />
                  </div>
                  <p className="text-xs text-neon-green mt-1">+{analytics.growth_rate}% this month 📈</p>
                </CardContent>
              </Card>

              <Card className="glass border-neon-purple/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Student Interest</p>
                      <p className="text-2xl font-bold text-neon-purple">{analytics.student_interests}</p>
                    </div>
                    <Heart className="h-8 w-8 text-neon-purple" />
                  </div>
                  <p className="text-xs text-neon-green mt-1">+15% this week 💖</p>
                </CardContent>
              </Card>

              <Card className="glass border-neon-pink/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Connections Used</p>
                      <p className="text-2xl font-bold text-neon-pink">{analytics.profile_clicks}/{currentPlan.maxConnections}</p>
                    </div>
                    <Target className="h-8 w-8 text-neon-pink" />
                  </div>
                  <p className="text-xs text-neon-green mt-1">
                    {Math.round((analytics.profile_clicks / currentPlan.maxConnections) * 100)}% used 🎯
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-neon-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Plan</p>
                      <p className="text-lg font-bold text-neon-yellow">{currentPlan.name}</p>
                    </div>
                    <Crown className="h-8 w-8 text-neon-yellow" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">R{currentPlan.price.toLocaleString()}/month 💳</p>
                </CardContent>
              </Card>
            </div>

            {/* Plan Features Display */}
            <Card className="glass border-neon-cyan/20 neon-glow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="h-6 w-6 text-neon-cyan" />
                      <span className="bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
                        {currentPlan.name} Plan Features
                      </span>
                    </CardTitle>
                    <CardDescription>
                      {currentPlan.description} ✨
                    </CardDescription>
                  </div>
                  {!isEnterprisePlan && (
                    <Button 
                      className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 font-semibold"
                      onClick={() => setActiveTab('billing')}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Upgrade 🚀
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Your Active Features:</h4>
                    <div className="space-y-2">
                      {currentPlan.features.slice(0, 6).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-neon-cyan" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                      {currentPlan.features.length > 6 && (
                        <div className="text-xs text-muted-foreground mt-2">
                          + {currentPlan.features.length - 6} more features
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Usage Limits:</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Analytics History</span>
                          <span>{currentPlan.maxAnalytics} days</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Student Connections</span>
                          <span>{analytics.profile_clicks}/{currentPlan.maxConnections}</span>
                        </div>
                        <Progress value={(analytics.profile_clicks / currentPlan.maxConnections) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Priority Support</span>
                          <span>{currentPlan.prioritySupport ? 'Yes 🔥' : 'Email only'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Skills in Demand */}
            <Card className="glass border-neon-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-neon-green" />
                  <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                    Top Skills Students Are Showcasing 💎
                  </span>
                </CardTitle>
                <CardDescription>
                  Based on profiles viewing your company - perfect for targeting! 🎯
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analytics.top_skills_sought.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-neon-green/20 text-neon-green border-neon-green/30 px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Prompts based on plan */}
            {isBasicPlan && (
              <Card className="glass border-neon-purple/20 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center neon-glow">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                        Unlock Your Full Potential! ⚡
                      </h3>
                      <p className="text-muted-foreground">
                        Get detailed student analytics, priority placement, and 3x more student engagement with Professional plan.
                      </p>
                      <div className="flex gap-3 mt-4">
                        <Button 
                          className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300"
                          onClick={() => setActiveTab('billing')}
                        >
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to Professional 👑
                        </Button>
                        <Button variant="outline" className="border-neon-purple text-neon-purple">
                          See Comparison 📊
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isProfessionalPlan && (
              <Card className="glass border-neon-pink/20 bg-gradient-to-r from-neon-pink/10 to-neon-yellow/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full flex items-center justify-center neon-glow">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">
                        Ready for Enterprise Scale? 🌟
                      </h3>
                      <p className="text-muted-foreground">
                        Unlock unlimited connections, dedicated support, and advanced integrations with Enterprise.
                      </p>
                      <div className="flex gap-3 mt-4">
                        <Button 
                          className="gradient-pink hover:shadow-lg hover:shadow-neon-pink/25 transition-all duration-300"
                          onClick={() => setActiveTab('billing')}
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Upgrade to Enterprise ⭐
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card className="glass border-neon-purple/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-6 w-6 text-neon-purple" />
                      <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                        Company Profile ✨
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Make a great first impression on talented students! 🌟
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowProfileModal(true)}
                    className="gradient-cyan hover:shadow-lg hover:shadow-neon-cyan/25 transition-all duration-300"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile ✏️
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Company Logo & Basic Info Display */}
                <div className="flex items-center gap-6 p-6 glass rounded-xl border border-neon-purple/20">
                  <Avatar className="h-20 w-20 border-4 border-neon-purple/30">
                    <AvatarImage src={companyProfile.logo} alt="Company logo" />
                    <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white text-2xl font-bold">
                      {companyProfile.name ? companyProfile.name.charAt(0).toUpperCase() : 'C'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{companyProfile.name || 'Company Name Not Set'}</h3>
                    <p className="text-neon-cyan font-medium text-lg mb-2">{companyProfile.industry || 'Industry Not Set'}</p>
                    <p className="text-muted-foreground line-clamp-2">
                      {companyProfile.description || 'No company description provided yet.'}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={`bg-${currentPlan.color}/20 text-${currentPlan.color} border-${currentPlan.color}/30 px-3 py-1`}>
                      {currentPlan.name} Plan
                    </Badge>
                    {currentPlan.customBranding && (
                      <p className="text-xs text-neon-green mt-1">✨ Custom Branding Enabled</p>
                    )}
                  </div>
                </div>
                
                {/* Profile Information Cards */}
                <div className="grid grid-cols-2 gap-6">
                  <Card className="glass border-neon-cyan/20">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-neon-cyan" />
                        Company Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Size</Label>
                        <p className="font-medium">{companyProfile.company_size || 'Not specified'}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Founded</Label>
                        <p className="font-medium">{companyProfile.founded_year || 'Not specified'}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Headquarters</Label>
                        <p className="font-medium">{companyProfile.headquarters || 'Not specified'}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass border-neon-green/20">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Globe className="h-4 w-4 text-neon-green" />
                        Online Presence
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Website</Label>
                        <p className="font-medium text-xs break-all">
                          {companyProfile.website ? (
                            <a href={companyProfile.website} target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">
                              {companyProfile.website}
                            </a>
                          ) : 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Careers Page</Label>
                        <p className="font-medium text-xs break-all">
                          {companyProfile.careers_page ? (
                            <a href={companyProfile.careers_page} target="_blank" rel="noopener noreferrer" className="text-neon-green hover:underline">
                              {companyProfile.careers_page}
                            </a>
                          ) : 'Not specified'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Benefits & Culture */}
                <div className="grid grid-cols-2 gap-6">
                  <Card className="glass border-neon-pink/20">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Star className="h-4 w-4 text-neon-pink" />
                        Employee Benefits ({companyProfile.benefits?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {companyProfile.benefits && companyProfile.benefits.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {companyProfile.benefits.slice(0, 6).map((benefit, index) => (
                            <Badge key={index} className="bg-neon-pink/20 text-neon-pink border-neon-pink/30 text-xs">
                              {benefit}
                            </Badge>
                          ))}
                          {companyProfile.benefits.length > 6 && (
                            <Badge variant="outline" className="border-neon-pink/50 text-neon-pink text-xs">
                              +{companyProfile.benefits.length - 6} more
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No benefits added yet</p>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="glass border-neon-yellow/20">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-neon-yellow" />
                        Company Culture ({companyProfile.company_culture?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {companyProfile.company_culture && companyProfile.company_culture.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {companyProfile.company_culture.slice(0, 6).map((culture, index) => (
                            <Badge key={index} className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30 text-xs">
                              {culture}
                            </Badge>
                          ))}
                          {companyProfile.company_culture.length > 6 && (
                            <Badge variant="outline" className="border-neon-yellow/50 text-neon-yellow text-xs">
                              +{companyProfile.company_culture.length - 6} more
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-sm">No culture items added yet</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Profile Preview */}
                <Card className="glass border-neon-cyan/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-neon-cyan" />
                      <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                        Student View Preview 👀
                      </span>
                    </CardTitle>
                    <CardDescription>
                      This is how your company appears to students browsing the career fair
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-neon-cyan/20 rounded-xl p-4 bg-secondary/20">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="h-14 w-14 border-2 border-neon-cyan/30">
                            <AvatarImage src={companyProfile.logo} />
                            <AvatarFallback className="bg-gradient-to-br from-neon-cyan to-neon-purple text-white font-bold">
                              {companyProfile.name ? companyProfile.name.charAt(0) : 'C'}
                            </AvatarFallback>
                          </Avatar>
                          {isProfessionalPlan && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-purple rounded-full flex items-center justify-center">
                              <Crown className="h-3 w-3 text-white" />
                            </div>
                          )}
                          {isEnterprisePlan && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-pink rounded-full flex items-center justify-center">
                              <Star className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{companyProfile.name || 'Your Company Name'}</h3>
                          <p className="text-neon-cyan font-medium">{companyProfile.industry || 'Your Industry'}</p>
                          <p className="text-muted-foreground mt-2 line-clamp-2">
                            {companyProfile.description || 'Your company description will appear here...'}
                          </p>
                          {companyProfile.benefits.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {companyProfile.benefits.slice(0, 2).map((benefit) => (
                                <Badge key={benefit} variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs">
                                  {benefit}
                                </Badge>
                              ))}
                              {companyProfile.benefits.length > 2 && (
                                <Badge variant="outline" className="border-neon-cyan/50 text-neon-cyan text-xs">
                                  +{companyProfile.benefits.length - 2} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            {isBasicPlan ? (
              // Limited Analytics for Basic Plan
              <Card className="glass border-neon-yellow/20 bg-gradient-to-r from-neon-yellow/10 to-neon-purple/10">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-yellow to-neon-purple rounded-full flex items-center justify-center mx-auto mb-4 neon-glow">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-neon-yellow to-neon-purple bg-clip-text text-transparent">
                    Unlock Detailed Analytics! 📊
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Get insights into student engagement, top universities, study years, and much more with our Professional plan.
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 glass rounded-lg">
                        <div className="text-lg font-bold text-neon-yellow">30 days</div>
                        <div className="text-xs text-muted-foreground">Analytics History</div>
                      </div>
                      <div className="p-3 glass rounded-lg">
                        <div className="text-lg font-bold text-neon-yellow">50</div>
                        <div className="text-xs text-muted-foreground">Max Connections</div>
                      </div>
                      <div className="p-3 glass rounded-lg">
                        <div className="text-lg font-bold text-neon-yellow">Basic</div>
                        <div className="text-xs text-muted-foreground">Analytics Level</div>
                      </div>
                    </div>
                    <Button 
                      className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 font-semibold h-12 px-8"
                      onClick={() => setActiveTab('billing')}
                    >
                      <Crown className="h-5 w-5 mr-2" />
                      Upgrade to Professional 🚀
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Full Analytics for Professional+ Plans
              <>
                {/* Analytics Overview */}
                <div className="grid grid-cols-3 gap-6">
                  <Card className="glass border-neon-cyan/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <BarChart3 className="h-8 w-8 text-neon-cyan" />
                        <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                          {currentPlan.maxAnalytics} days
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-neon-cyan mb-1">{analytics.profile_views.toLocaleString()}</h3>
                      <p className="text-sm text-muted-foreground">Total Profile Views</p>
                      <div className="mt-4 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-neon-green" />
                        <span className="text-sm text-neon-green">+{analytics.growth_rate}% growth</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass border-neon-purple/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Users className="h-8 w-8 text-neon-purple" />
                        <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                          Quality
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-neon-purple mb-1">{analytics.student_interests}</h3>
                      <p className="text-sm text-muted-foreground">Students Showed Interest</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-neon-pink" />
                        <span className="text-sm text-neon-pink">High quality leads</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass border-neon-pink/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Activity className="h-8 w-8 text-neon-pink" />
                        <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30">
                          Conversion
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-neon-pink mb-1">
                        {Math.round((analytics.student_interests / analytics.profile_views) * 100)}%
                      </h3>
                      <p className="text-sm text-muted-foreground">View to Interest Rate</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Target className="h-4 w-4 text-neon-green" />
                        <span className="text-sm text-neon-green">Above average</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Student Engagement by University */}
                <Card className="glass border-neon-green/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-neon-green" />
                      <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                        Student Engagement by University 🎓
                      </span>
                    </CardTitle>
                    <CardDescription>
                      See which universities your company appeals to most
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.student_engagement.universities.map((uni, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${
                              index === 0 ? 'bg-neon-green' : index === 1 ? 'bg-neon-cyan' : index === 2 ? 'bg-neon-purple' : 'bg-neon-pink'
                            }`}></div>
                            <span className="font-medium">{uni.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-secondary rounded-full">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  index === 0 ? 'bg-neon-green' : index === 1 ? 'bg-neon-cyan' : index === 2 ? 'bg-neon-purple' : 'bg-neon-pink'
                                }`}
                                style={{ width: `${(uni.count / analytics.student_engagement.universities[0].count) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold w-8 text-right">{uni.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Study Year Distribution */}
                <Card className="glass border-neon-yellow/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-neon-yellow" />
                      <span className="bg-gradient-to-r from-neon-yellow to-neon-pink bg-clip-text text-transparent">
                        Student Experience Levels 📚
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Understanding the experience level of interested students
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {analytics.student_engagement.study_years.map((year, index) => (
                        <div key={index} className="p-4 glass rounded-xl border border-neon-yellow/20">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{year.year}</h4>
                            <Badge className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30">
                              {year.count}
                            </Badge>
                          </div>
                          <div className="w-full h-2 bg-secondary rounded-full">
                            <div 
                              className="h-2 bg-neon-yellow rounded-full transition-all duration-500"
                              style={{ width: `${(year.count / analytics.student_engagement.study_years[0].count) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Enterprise Only Features */}
                {isEnterprisePlan && (
                  <Card className="glass border-neon-pink/20 bg-gradient-to-r from-neon-pink/10 to-neon-purple/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="h-6 w-6 text-neon-pink" />
                        <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                          Enterprise Analytics 👑
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-6">
                        <Button className="gradient-pink h-16 text-left justify-start">
                          <div>
                            <Mail className="h-5 w-5 mb-1" />
                            <div className="text-sm">Direct Student Contact</div>
                            <div className="text-xs opacity-75">Email {analytics.student_interests} interested students</div>
                          </div>
                        </Button>
                        <Button className="gradient-purple h-16 text-left justify-start">
                          <div>
                            <MessageSquare className="h-5 w-5 mb-1" />
                            <div className="text-sm">Advanced Insights</div>
                            <div className="text-xs opacity-75">Skills matching & recommendations</div>
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="billing" className="space-y-6 mt-6">
            {/* Current Plan Status */}
            <Card className="glass border-neon-cyan/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-6 w-6 text-neon-cyan" />
                      <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                        Current Subscription 💳
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Manage your plan and billing preferences (South African pricing)
                    </CardDescription>
                  </div>
                  <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 px-4 py-2">
                    {currentPlan.name} Plan
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 glass rounded-xl border border-neon-cyan/20">
                  <div>
                    <h4 className="font-bold text-lg">{currentPlan.name} Plan</h4>
                    <p className="text-muted-foreground">Next billing: February 15, 2025</p>
                    <p className="text-sm text-neon-cyan mt-1">{currentPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">R{currentPlan.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                    <div className="text-xs text-muted-foreground">excl. VAT</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Plans */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-center bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                Choose Your Perfect Plan 🚀
              </h3>
              <p className="text-center text-muted-foreground">
                All prices in South African Rand (ZAR) 🇿🇦
              </p>
              <div className="grid grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`glass relative ${
                      plan.id === currentPlan.id 
                        ? 'border-neon-cyan/50 neon-glow' 
                        : 'border-neon-cyan/20 hover:border-neon-cyan/40'
                    } transition-all duration-300`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-neon-yellow text-black font-bold px-3 py-1 neon-glow">
                          🔥 Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-neon-cyan rounded-full flex items-center justify-center mx-auto mb-3 neon-glow">
                        {plan.id === 'starter' && <Rocket className="h-6 w-6 text-white" />}
                        {plan.id === 'professional' && <Crown className="h-6 w-6 text-white" />}
                        {plan.id === 'enterprise' && <Star className="h-6 w-6 text-white" />}
                      </div>
                      <CardTitle className="text-xl text-neon-cyan">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                      <div className="py-4">
                        <div className="text-4xl font-bold">R{plan.price.toLocaleString()}</div>
                        <div className="text-muted-foreground">per month</div>
                        <div className="text-xs text-muted-foreground">excl. VAT</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-neon-green" />
                            <span>{plan.maxAnalytics} days analytics</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-neon-purple" />
                            <span>{plan.maxConnections} connections</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-neon-pink" />
                            <span>{plan.prioritySupport ? 'Priority' : 'Email'} support</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Sparkles className="h-3 w-3 text-neon-yellow" />
                            <span>{plan.customBranding ? 'Custom' : 'Standard'} branding</span>
                          </div>
                        </div>
                        <Separator />
                        <ul className="space-y-2">
                          {plan.features.slice(0, 4).map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                          {plan.features.length > 4 && (
                            <li className="text-xs text-muted-foreground">
                              + {plan.features.length - 4} more features
                            </li>
                          )}
                        </ul>
                      </div>
                      <Button 
                        className={
                          plan.id === currentPlan.id
                            ? 'bg-secondary text-muted-foreground cursor-default w-full'
                            : 'gradient-cyan hover:shadow-lg hover:shadow-neon-cyan/25 transition-all duration-300 w-full'
                        }
                        disabled={plan.id === currentPlan.id}
                        onClick={() => plan.id !== currentPlan.id && handlePlanChange(plan.id)}
                      >
                        {plan.id === currentPlan.id ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Current Plan ✅
                          </>
                        ) : (
                          <>
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            {plan.price > currentPlan.price ? 'Upgrade' : 'Switch'} to {plan.name} 🚀
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* ROI Calculator */}
            <Card className="glass border-neon-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-neon-green" />
                  <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                    Your ROI This Month 📈
                  </span>
                </CardTitle>
                <CardDescription>
                  See the value you're getting from your investment (in ZAR)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-green">{analytics.student_interests}</div>
                    <div className="text-sm text-muted-foreground">Quality Leads</div>
                    <div className="text-xs text-neon-green mt-1">≈ R{(analytics.student_interests * 450).toLocaleString()} value*</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-cyan">{analytics.profile_views.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Brand Impressions</div>
                    <div className="text-xs text-neon-cyan mt-1">≈ R{Math.round(analytics.profile_views * 0.9).toLocaleString()} value*</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-pink">
                      {Math.round(((analytics.student_interests * 450) + (analytics.profile_views * 0.9)) / currentPlan.price)}x
                    </div>
                    <div className="text-sm text-muted-foreground">ROI Multiple</div>
                    <div className="text-xs text-neon-pink mt-1">vs. plan cost</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  * Estimated value based on South African market averages for qualified leads and brand impressions
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}