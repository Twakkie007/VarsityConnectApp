import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  Heart, 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  LogOut, 
  Star,
  TrendingUp,
  Target,
  User,
  Edit,
  GraduationCap,
  Globe,
  Languages,
  Phone,
  Linkedin,
  Github,
  Briefcase,
  Camera,
  ArrowLeft,
  QrCode,
  Crown,
  Trophy,
  Award,
  ChevronDown,
  DollarSign,
  Clock,
  Zap,
  Filter
} from 'lucide-react';
import { User as AppUser, CareerFair, Company, StudentProfile, CompanyTier } from '../App';
import { CompanyDetailModal } from './CompanyDetailModal';
import { StudentProfileModal } from './StudentProfileModal';
import { QRCodeDisplay } from './QRCodeDisplay';
import { ConnectionsManager } from './ConnectionsManager';
import { PrepSection } from './PrepSection';
import { interestAPI } from '../utils/api';
import { toast } from 'sonner@2.0.3';
import { calculateProfileCompletion, filterCompanies } from '../utils/studentHelpers';

interface StudentDashboardProps {
  user: AppUser;
  studentProfile: StudentProfile | null;
  careerFair: CareerFair;
  onLogout: () => void;
  onCompaniesUpdate: () => void;
  onProfileUpdate: () => void;
  onBackToHub?: () => void;
}

interface CompanyWithTier extends Company {
  tier?: CompanyTier;
}

export function StudentDashboard({ user, studentProfile, careerFair, onLogout, onCompaniesUpdate, onProfileUpdate, onBackToHub }: StudentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [companyTiers, setCompanyTiers] = useState<Map<string, CompanyTier>>(new Map());
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState('companies');
  const [loading, setLoading] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [completedPrepItems, setCompletedPrepItems] = useState<Set<string>>(new Set());
  const [openPrepSections, setOpenPrepSections] = useState<Set<string>>(new Set(['standout']));
  const [tierFilter, setTierFilter] = useState<CompanyTier | 'all'>('all');

  // Load user company preferences on component mount
  useEffect(() => {
    loadCompanyPreferences();
  }, [user.id]);

  const loadCompanyPreferences = async () => {
    try {
      // Mock API call - in real app, this would fetch from the database
      const mockPreferences = [
        { company_id: 'company-1', tier: 'A' as const },
        { company_id: 'company-2', tier: 'B' as const },
        { company_id: 'company-3', tier: 'C' as const },
      ];
      
      const tierMap = new Map();
      mockPreferences.forEach(pref => {
        tierMap.set(pref.company_id, pref.tier);
      });
      setCompanyTiers(tierMap);
    } catch (error) {
      console.error('Failed to load company preferences:', error);
    }
  };

  const filteredCompanies = filterCompanies(careerFair.companies, searchTerm);

  const companiesWithTiers: CompanyWithTier[] = filteredCompanies.map(company => ({
    ...company,
    tier: companyTiers.get(company.id)
  }));

  const getCompaniesByTier = (tier: CompanyTier) => {
    return companiesWithTiers.filter(company => company.tier === tier);
  };

  const profileCompletion = calculateProfileCompletion(studentProfile);

  const handleTierChange = async (companyId: string, tier: CompanyTier) => {
    if (loading) return;
    
    setLoading(true);
    try {
      // Update local state immediately
      const newTiers = new Map(companyTiers);
      if (tier === null) {
        newTiers.delete(companyId);
      } else {
        newTiers.set(companyId, tier);
      }
      setCompanyTiers(newTiers);

      // Mock API call - in real app, this would save to database
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`Updated company ${companyId} tier to:`, tier);
    } catch (error) {
      console.error('Failed to update company tier:', error);
      toast.error('Failed to update company preference');
      // Revert local state on error
      loadCompanyPreferences();
    } finally {
      setLoading(false);
    }
  };

  const togglePrepItem = (itemId: string) => {
    const newCompleted = new Set(completedPrepItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
      toast.success('Unchecked! Keep working on it 💪');
    } else {
      newCompleted.add(itemId);
      toast.success('Nailed it! You\'re getting closer to being unstoppable! 🔥');
    }
    setCompletedPrepItems(newCompleted);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard! 📋✨');
  };

  const togglePrepSection = (sectionId: string) => {
    const newOpenSections = new Set(openPrepSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenPrepSections(newOpenSections);
  };

  const getTierIcon = (tier: CompanyTier) => {
    const icons = {
      'A': <Crown className="h-4 w-4" />,
      'B': <Star className="h-4 w-4" />,
      'C': <Target className="h-4 w-4" />,
      null: null
    };
    return icons[tier || 'null'];
  };

  const getTierColor = (tier: CompanyTier) => {
    const colors = {
      'A': 'text-neon-purple',
      'B': 'text-neon-cyan',
      'C': 'text-neon-green',
      null: 'text-muted-foreground'
    };
    return colors[tier || 'null'];
  };

  const getTierBadgeStyle = (tier: CompanyTier) => {
    const styles = {
      'A': 'bg-neon-purple/20 text-neon-purple border-neon-purple/30',
      'B': 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30',
      'C': 'bg-neon-green/20 text-neon-green border-neon-green/30',
      null: 'bg-secondary/50 text-muted-foreground border-muted/30'
    };
    return styles[tier || 'null'];
  };

  const getTierStats = () => {
    const aTier = getCompaniesByTier('A').length;
    const bTier = getCompaniesByTier('B').length;
    const cTier = getCompaniesByTier('C').length;
    const total = aTier + bTier + cTier;
    
    return { aTier, bTier, cTier, total };
  };

  const tierStats = getTierStats();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-10 animate-pulse"></div>
      
      {/* Header */}
      <div className="border-b border-neon-purple/20 glass backdrop-blur-xl relative z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {onBackToHub && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBackToHub}
                className="hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Hub
              </Button>
            )}
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-neon-purple/50 neon-glow">
                <AvatarImage src={studentProfile?.profile_image || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face`} />
                <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-pink text-white font-bold">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-2 border-background neon-glow"></div>
            </div>
            <div>
              <h2 className="font-bold text-lg">{user.name}</h2>
              <p className="text-sm text-neon-purple font-medium">
                {studentProfile?.university ? `${studentProfile.year_of_study} Student 🎓` : 'Student 🎓'}
              </p>
            </div>
          </div>
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

      {/* Career Fair Info */}
      <div className="border-b border-neon-cyan/20 gradient-cyan p-6 relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            {careerFair.universityCode ? (
              <span className="text-white font-bold text-sm">{careerFair.universityCode}</span>
            ) : (
              <Building2 className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{careerFair.name} ✨</h1>
            <p className="text-white/80 text-sm">
              {careerFair.university ? `${careerFair.university} • ` : ''}
              {careerFair.province ? `${careerFair.province} • ` : ''}
              Your future starts here! 🚀
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/90 flex-wrap">
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
            {careerFair.companies.length} companies 🏢
          </div>
          {careerFair.expectedAttendees && (
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              {careerFair.expectedAttendees.toLocaleString()} expected students 🎓
            </div>
          )}
          {careerFair.virtualComponent && (
            <Badge className="bg-white/20 text-white border-white/30">
              <Globe className="h-3 w-3 mr-1" />
              Virtual Component
            </Badge>
          )}
        </div>
        {careerFair.description && (
          <p className="text-white/90 mt-3 text-sm leading-relaxed">
            {careerFair.description}
          </p>
        )}
        {careerFair.industries && careerFair.industries.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {careerFair.industries.map((industry) => (
              <Badge key={industry} className="bg-white/10 text-white border-white/20 text-xs">
                {industry}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-secondary/50 border border-neon-purple/20">
            <TabsTrigger 
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-yellow data-[state=active]:to-neon-pink data-[state=active]:text-white"
            >
              Profile 👤
            </TabsTrigger>
            <TabsTrigger 
              value="companies"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-cyan data-[state=active]:text-white"
            >
              Companies 🏢
            </TabsTrigger>
            <TabsTrigger 
              value="favorites"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-cyan data-[state=active]:to-neon-pink data-[state=active]:text-white"
            >
              My Strategy ({tierStats.total}) 🎯
            </TabsTrigger>
            <TabsTrigger 
              value="qrcode"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-neon-cyan data-[state=active]:text-white"
            >
              FastTrack QR ⚡
            </TabsTrigger>
            <TabsTrigger 
              value="connections"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink data-[state=active]:to-neon-yellow data-[state=active]:text-white"
            >
              Connections 🤝
            </TabsTrigger>
            <TabsTrigger 
              value="prep"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink data-[state=active]:to-neon-purple data-[state=active]:text-white"
            >
              Prep 🔥
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            {!studentProfile ? (
              <Card className="glass border-neon-yellow/20 neon-glow">
                <CardContent className="p-8 text-center">
                  <User className="h-16 w-16 text-neon-yellow mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-3">Complete Your Profile! ✨</h3>
                  <p className="text-muted-foreground mb-6 text-base">
                    Stand out to employers by creating an awesome profile with your photo! 🌟
                  </p>
                  <Button 
                    onClick={() => setIsProfileModalOpen(true)}
                    className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 font-semibold h-12 px-8 neon-glow"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Create Profile 🚀
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Profile Header */}
                <Card className="glass border-neon-yellow/20 neon-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="h-20 w-20 border-3 border-neon-yellow/50 neon-glow">
                            <AvatarImage src={studentProfile.profile_image} />
                            <AvatarFallback className="bg-gradient-to-br from-neon-yellow to-neon-pink text-white font-bold text-2xl">{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {!studentProfile.profile_image && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Camera className="h-8 w-8 text-neon-yellow/50" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{user.name}</h2>
                          <p className="text-neon-cyan font-medium text-lg">
                            {studentProfile.year_of_study} • {studentProfile.degree}
                          </p>
                          <p className="text-muted-foreground">
                            {studentProfile.university}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setIsProfileModalOpen(true)}
                        className="gradient-yellow hover:shadow-lg hover:shadow-neon-yellow/25 transition-all duration-300 font-semibold"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile ✏️
                      </Button>
                    </div>
                  </CardHeader>
                  {studentProfile.bio && (
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{studentProfile.bio}</p>
                    </CardContent>
                  )}
                </Card>

                {/* Profile Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="glass border-neon-purple/20">
                    <CardContent className="p-5 text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                        {profileCompletion}%
                      </div>
                      <div className="text-sm text-neon-purple font-medium">Profile Complete 📊</div>
                    </CardContent>
                  </Card>
                  <Card className="glass border-neon-cyan/20">
                    <CardContent className="p-5 text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
                        {studentProfile.skills?.length || 0}
                      </div>
                      <div className="text-sm text-neon-cyan font-medium">Skills Listed 🛠️</div>
                    </CardContent>
                  </Card>
                  <Card className="glass border-neon-pink/20">
                    <CardContent className="p-5 text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">
                        {tierStats.total}
                      </div>
                      <div className="text-sm text-neon-pink font-medium">Companies Tracked 🎯</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Rest of profile content... */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Academic Info */}
                  <Card className="glass border-neon-cyan/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-neon-cyan" />
                        Academic Details 🎓
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">University</p>
                        <p className="font-medium">{studentProfile.university}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Degree</p>
                        <p className="font-medium">{studentProfile.degree}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Year of Study</p>
                        <p className="font-medium">{studentProfile.year_of_study}</p>
                      </div>
                      {studentProfile.gpa && (
                        <div>
                          <p className="text-sm text-muted-foreground">GPA/Average</p>
                          <p className="font-medium">{studentProfile.gpa}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Contact & Location */}
                  <Card className="glass border-neon-pink/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-neon-pink" />
                        Contact & Location 📍
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{studentProfile.location_city}, {studentProfile.location_province}</p>
                      </div>
                      {studentProfile.phone && (
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {studentProfile.phone}
                          </p>
                        </div>
                      )}
                      {studentProfile.availability && (
                        <div>
                          <p className="text-sm text-muted-foreground">Availability</p>
                          <p className="font-medium">{studentProfile.availability}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Skills */}
                {studentProfile.skills && studentProfile.skills.length > 0 && (
                  <Card className="glass border-neon-purple/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-neon-purple" />
                        Skills & Abilities 💪
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {studentProfile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Languages */}
                {studentProfile.languages && studentProfile.languages.length > 0 && (
                  <Card className="glass border-neon-green/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Languages className="h-5 w-5 text-neon-green" />
                        Languages 🗣️
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {studentProfile.languages.map((language, index) => (
                          <Badge key={index} variant="secondary" className="bg-neon-green/20 text-neon-green border-neon-green/30">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Career Goals */}
                {studentProfile.career_goals && (
                  <Card className="glass border-neon-cyan/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-neon-cyan" />
                        Career Goals 🎯
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{studentProfile.career_goals}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Social Links */}
                {(studentProfile.linkedin_url || studentProfile.github_url || studentProfile.portfolio_url) && (
                  <Card className="glass border-neon-yellow/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-neon-yellow" />
                        Social Links 🔗
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4">
                        {studentProfile.linkedin_url && (
                          <Button variant="outline" size="sm" asChild className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10">
                            <a href={studentProfile.linkedin_url} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4 mr-2" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                        {studentProfile.github_url && (
                          <Button variant="outline" size="sm" asChild className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10">
                            <a href={studentProfile.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {studentProfile.portfolio_url && (
                          <Button variant="outline" size="sm" asChild className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10">
                            <a href={studentProfile.portfolio_url} target="_blank" rel="noopener noreferrer">
                              <Briefcase className="h-4 w-4 mr-2" />
                              Portfolio
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="companies" className="space-y-4 mt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-purple" />
              <Input
                placeholder="Search companies, industries, or positions... 🔍"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-secondary/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/20 rounded-xl text-base"
              />
            </div>

            {companiesWithTiers.length === 0 ? (
              <Card className="glass border-neon-purple/20 neon-glow">
                <CardContent className="p-8 text-center">
                  <Building2 className="h-16 w-16 text-neon-purple mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">No companies found 😔</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? 'Try different search terms! 🔄' : 'Companies will appear here when they join the fair 🎪'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {companiesWithTiers.map((company, index) => (
                  <Card key={company.id} className="glass border-neon-purple/20 cursor-pointer hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="h-14 w-14 border-2 border-neon-purple/30">
                            <AvatarImage src={company.logo} alt={company.name} />
                            <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white font-bold">{company.name?.charAt(0) || '?'}</AvatarFallback>
                          </Avatar>
                          {index < 3 && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-neon-yellow to-neon-pink rounded-full flex items-center justify-center">
                              <TrendingUp className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-bold text-lg truncate">{company.name || 'Unknown Company'}</h3>
                                {company.tier && (
                                  <Badge variant="outline" className={getTierBadgeStyle(company.tier)}>
                                    {getTierIcon(company.tier)}
                                    <span className="ml-1">{company.tier}-Tier</span>
                                  </Badge>
                                )}
                              </div>
                              <p className="text-neon-cyan font-medium">{company.industry || 'Industry not specified'}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                {company.headquarters && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {company.headquarters}
                                  </div>
                                )}
                                {company.company_size && (
                                  <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {company.company_size}
                                  </div>
                                )}
                                {company.work_environment && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {company.work_environment}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                            {company.description || 'No description available'}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {company.positions && Array.isArray(company.positions) && company.positions.slice(0, 2).map((position, posIndex) => (
                              position && (
                                <Badge key={posIndex} variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs px-3 py-1">
                                  {position}
                                </Badge>
                              )
                            ))}
                            {company.positions && Array.isArray(company.positions) && company.positions.length > 2 && (
                              <Badge variant="outline" className="border-neon-cyan/50 text-neon-cyan text-xs px-3 py-1">
                                +{company.positions.length - 2} more ✨
                              </Badge>
                            )}
                            {company.salary_range && (
                              <Badge variant="outline" className="border-neon-green/50 text-neon-green text-xs px-3 py-1">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {(company.salary_range.min / 1000).toFixed(0)}k - {(company.salary_range.max / 1000).toFixed(0)}k
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <div 
                      className="absolute inset-0 z-10" 
                      onClick={() => setSelectedCompany(company)}
                    />
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6 mt-6">
            {/* Strategy Stats */}
            <Card className="glass border-neon-purple/20 neon-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-neon-purple" />
                  <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                    Your Career Fair Strategy
                  </span>
                </CardTitle>
                <CardDescription>
                  Organize companies by priority to maximize your time effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 glass rounded-lg border border-neon-purple/20">
                    <div className="text-2xl font-bold text-neon-purple">{tierStats.total}</div>
                    <div className="text-sm text-muted-foreground">Total Companies</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg border border-neon-purple/20">
                    <div className="text-2xl font-bold text-neon-purple flex items-center justify-center gap-1">
                      <Crown className="h-5 w-5" />
                      {tierStats.aTier}
                    </div>
                    <div className="text-sm text-neon-purple">A-Tier (70% focus)</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg border border-neon-cyan/20">
                    <div className="text-2xl font-bold text-neon-cyan flex items-center justify-center gap-1">
                      <Star className="h-5 w-5" />
                      {tierStats.bTier}
                    </div>
                    <div className="text-sm text-neon-cyan">B-Tier (25% focus)</div>
                  </div>
                  <div className="text-center p-4 glass rounded-lg border border-neon-green/20">
                    <div className="text-2xl font-bold text-neon-green flex items-center justify-center gap-1">
                      <Target className="h-5 w-5" />
                      {tierStats.cTier}
                    </div>
                    <div className="text-sm text-neon-green">C-Tier (5% focus)</div>
                  </div>
                </div>
                
                <div className="p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-neon-cyan" />
                    <span className="font-semibold text-neon-cyan">Strategic Time Allocation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>A-Tier:</strong> Your dream companies - spend most time here
                    <br />💡 <strong>B-Tier:</strong> Solid backup options - good opportunities
                    <br />💡 <strong>C-Tier:</strong> Safety net - quick visits if time allows
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tier Filter */}
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-neon-purple" />
              <span className="font-semibold">Filter by tier:</span>
              <div className="flex gap-2">
                {[
                  { tier: 'all' as const, label: 'All', icon: Building2 },
                  { tier: 'A' as const, label: 'A-Tier', icon: Crown },
                  { tier: 'B' as const, label: 'B-Tier', icon: Star },
                  { tier: 'C' as const, label: 'C-Tier', icon: Target }
                ].map(({ tier, label, icon: Icon }) => (
                  <Button
                    key={tier}
                    variant="outline"
                    size="sm"
                    onClick={() => setTierFilter(tier)}
                    className={`${
                      tierFilter === tier 
                        ? (tier === 'A' ? 'border-neon-purple text-neon-purple bg-neon-purple/10' :
                           tier === 'B' ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10' :
                           tier === 'C' ? 'border-neon-green text-neon-green bg-neon-green/10' :
                           'border-neon-purple text-neon-purple bg-neon-purple/10')
                        : 'border-muted text-muted-foreground hover:border-neon-purple/50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Companies by Tier */}
            {(['A', 'B', 'C'] as const).map((tier) => {
              const tierCompanies = getCompaniesByTier(tier);
              
              if (tierFilter !== 'all' && tierFilter !== tier) return null;
              
              if (tierCompanies.length === 0) {
                if (tierFilter === tier) {
                  return (
                    <Card key={tier} className="glass border-neon-purple/20">
                      <CardContent className="p-8 text-center">
                        <div className={getTierColor(tier)}>
                          {getTierIcon(tier)}
                        </div>
                        <h3 className="text-xl font-bold mb-2">No {tier}-Tier companies yet</h3>
                        <p className="text-muted-foreground">Browse companies and add them to your strategic list!</p>
                      </CardContent>
                    </Card>
                  );
                }
                return null;
              }

              return (
                <div key={tier} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      tier === 'A' ? 'bg-neon-purple/20' :
                      tier === 'B' ? 'bg-neon-cyan/20' :
                      'bg-neon-green/20'
                    }`}>
                      {getTierIcon(tier)}
                    </div>
                    <h3 className={`text-xl font-bold ${getTierColor(tier)}`}>
                      {tier}-Tier Companies ({tierCompanies.length})
                    </h3>
                    <Badge className={getTierBadgeStyle(tier)}>
                      {tier === 'A' && '70% focus time'}
                      {tier === 'B' && '25% focus time'}
                      {tier === 'C' && '5% focus time'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tierCompanies.map((company) => (
                      <Card key={company.id} className={`glass cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                        tier === 'A' ? 'border-neon-purple/20 hover:border-neon-purple/50 hover:shadow-neon-purple/10' :
                        tier === 'B' ? 'border-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-neon-cyan/10' :
                        'border-neon-green/20 hover:border-neon-green/50 hover:shadow-neon-green/10'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12 border-2 border-neon-purple/30">
                              <AvatarImage src={company.logo} alt={company.name} />
                              <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white font-bold">{company.name?.charAt(0) || '?'}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold truncate">{company.name}</h4>
                              <p className="text-sm text-neon-cyan font-medium">{company.industry}</p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                {company.headquarters && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {company.headquarters}
                                  </div>
                                )}
                                {company.positions && company.positions.length > 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    {company.positions.length} positions
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <div 
                          className="absolute inset-0 z-10" 
                          onClick={() => setSelectedCompany(company)}
                        />
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}

            {tierStats.total === 0 && (
              <Card className="glass border-neon-purple/20 neon-glow">
                <CardContent className="p-8 text-center">
                  <Target className="h-16 w-16 text-neon-purple mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-3">Build Your Strategic Plan! 🎯</h3>
                  <p className="text-muted-foreground mb-6 text-base">
                    Browse companies and organize them into A, B, and C tiers to maximize your career fair effectiveness!
                  </p>
                  <Button 
                    onClick={() => setActiveTab('companies')}
                    className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 font-semibold h-12 px-8"
                  >
                    <Building2 className="h-5 w-5 mr-2" />
                    Browse Companies 🏢
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="qrcode" className="space-y-6 mt-6">
            {!studentProfile ? (
              <Card className="glass border-neon-green/20 neon-glow">
                <CardContent className="p-8 text-center">
                  <QrCode className="h-16 w-16 text-neon-green mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-3">Create Profile to Get Your QR Code! ✨</h3>
                  <p className="text-muted-foreground mb-6 text-base">
                    Complete your profile first to generate your unique FastTrack QR code! 🚀
                  </p>
                  <Button 
                    onClick={() => setIsProfileModalOpen(true)}
                    className="gradient-green hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 font-semibold h-12 px-8 neon-glow"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Create Profile First
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <QRCodeDisplay 
                studentProfile={studentProfile}
                userName={user.name}
                careerFairId={careerFair.id}
                onRegenerateQR={() => {
                  toast.success('QR code regenerated! 🔄');
                }}
              />
            )}
          </TabsContent>

          <TabsContent value="connections" className="space-y-6 mt-6">
            <ConnectionsManager 
              user={user}
              userRole="student"
              careerFairId={careerFair.id}
              onConnectionUpdate={() => {
                toast.success('Connections updated! 🎉');
              }}
            />
          </TabsContent>

          <TabsContent value="prep" className="space-y-6 mt-6">
            <PrepSection
              completedPrepItems={completedPrepItems}
              openPrepSections={openPrepSections}
              onTogglePrepItem={togglePrepItem}
              onTogglePrepSection={togglePrepSection}
              onCopyToClipboard={copyToClipboard}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          currentTier={companyTiers.get(selectedCompany.id) || null}
          onTierChange={(tier) => handleTierChange(selectedCompany.id, tier)}
          onClose={() => setSelectedCompany(null)}
          loading={loading}
        />
      )}

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        studentProfile={studentProfile}
        onProfileUpdate={onProfileUpdate}
      />
    </div>
  );
}