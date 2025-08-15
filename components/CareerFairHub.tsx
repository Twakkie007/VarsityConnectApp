import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Building2, 
  Star,
  TrendingUp,
  Filter,
  Globe,
  Heart,
  ExternalLink,
  Sparkles,
  GraduationCap,
  Zap,
  Target,
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CareerFair } from '../App';

interface CareerFairHubProps {
  onSelectCareerFair: (careerFair: CareerFair) => void;
  userRole: 'student' | 'company';
}

export function CareerFairHub({ onSelectCareerFair, userRole }: CareerFairHubProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [followedFairs, setFollowedFairs] = useState<Set<string>>(new Set());

  // South African career fairs data
  const southAfricanCareerFairs: CareerFair[] = [
    {
      id: 'uct-2025',
      name: 'UCT Career Fair 2025',
      date: '2025-09-15',
      location: 'University of Cape Town, Cape Town',
      province: 'Western Cape',
      university: 'University of Cape Town',
      universityCode: 'UCT',
      description: 'Premier career fair connecting top graduates with leading companies across Africa',
      industries: ['Technology', 'Finance', 'Consulting', 'Mining', 'Healthcare'],
      expectedAttendees: 2500,
      companies: [],
      featured: true,
      registrationOpen: true,
      virtualComponent: true
    },
    {
      id: 'wits-2025',
      name: 'Wits University Career Expo',
      date: '2025-08-22',
      location: 'University of the Witwatersrand, Johannesburg',
      province: 'Gauteng',
      university: 'University of the Witwatersrand',
      universityCode: 'WITS',
      description: 'Connecting Wits excellence with industry leaders in the heart of Johannesburg',
      industries: ['Engineering', 'Finance', 'Technology', 'Mining', 'Law'],
      expectedAttendees: 3200,
      companies: [],
      featured: true,
      registrationOpen: true,
      virtualComponent: false
    },
    {
      id: 'stellenbosch-2025',
      name: 'Stellenbosch Career Days',
      date: '2025-09-08',
      location: 'Stellenbosch University, Stellenbosch',
      province: 'Western Cape',
      university: 'Stellenbosch University',
      universityCode: 'SU',
      description: 'Innovation meets opportunity in the winelands',
      industries: ['Agriculture', 'Technology', 'Finance', 'Engineering', 'Wine & Hospitality'],
      expectedAttendees: 1800,
      companies: [],
      featured: false,
      registrationOpen: true,
      virtualComponent: true
    },
    {
      id: 'up-2025',
      name: 'UP Career Fair',
      date: '2025-08-29',
      location: 'University of Pretoria, Pretoria',
      province: 'Gauteng',
      university: 'University of Pretoria',
      universityCode: 'UP',
      description: 'Where future leaders meet top employers',
      industries: ['Engineering', 'Veterinary', 'Technology', 'Government', 'Healthcare'],
      expectedAttendees: 2800,
      companies: [],
      featured: true,
      registrationOpen: true,
      virtualComponent: false
    },
    {
      id: 'ukzn-2025',
      name: 'UKZN Graduate Showcase',
      date: '2025-09-12',
      location: 'University of KwaZulu-Natal, Durban',
      province: 'KwaZulu-Natal',
      university: 'University of KwaZulu-Natal',
      universityCode: 'UKZN',
      description: 'Coastal opportunities for bright minds',
      industries: ['Maritime', 'Agriculture', 'Technology', 'Manufacturing', 'Tourism'],
      expectedAttendees: 2200,
      companies: [],
      featured: false,
      registrationOpen: true,
      virtualComponent: true
    },
    {
      id: 'rhodes-2025',
      name: 'Rhodes University Career Fair',
      date: '2025-09-05',
      location: 'Rhodes University, Makhanda',
      province: 'Eastern Cape',
      university: 'Rhodes University',
      universityCode: 'RU',
      description: 'Small university, big opportunities',
      industries: ['Journalism', 'Technology', 'Education', 'Research', 'NGO'],
      expectedAttendees: 1200,
      companies: [],
      featured: false,
      registrationOpen: true,
      virtualComponent: true
    },
    {
      id: 'uj-2025',
      name: 'UJ Career Connect',
      date: '2025-08-26',
      location: 'University of Johannesburg, Johannesburg',
      province: 'Gauteng',
      university: 'University of Johannesburg',
      universityCode: 'UJ',
      description: 'Dynamic careers for the next generation',
      industries: ['Technology', 'Business', 'Arts & Design', 'Engineering', 'Education'],
      expectedAttendees: 2600,
      companies: [],
      featured: false,
      registrationOpen: true,
      virtualComponent: false
    },
    {
      id: 'nmu-2025',
      name: 'Nelson Mandela University Career Fair',
      date: '2025-09-19',
      location: 'Nelson Mandela University, Gqeberha',
      province: 'Eastern Cape',
      university: 'Nelson Mandela University',
      universityCode: 'NMU',
      description: 'Excellence and impact in the Eastern Cape',
      industries: ['Automotive', 'Manufacturing', 'Technology', 'Ocean Sciences', 'Business'],
      expectedAttendees: 1900,
      companies: [],
      featured: false,
      registrationOpen: true,
      virtualComponent: true
    }
  ];

  const provinces = ['all', 'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'];
  const industries = ['all', 'Technology', 'Finance', 'Engineering', 'Mining', 'Healthcare', 'Agriculture', 'Manufacturing', 'Consulting', 'Government'];

  const filteredFairs = southAfricanCareerFairs.filter(fair => {
    const matchesSearch = fair.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fair.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fair.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = selectedProvince === 'all' || fair.province === selectedProvince;
    const matchesIndustry = selectedIndustry === 'all' || fair.industries.includes(selectedIndustry);
    
    return matchesSearch && matchesProvince && matchesIndustry;
  });

  const featuredFairs = filteredFairs.filter(fair => fair.featured);
  const upcomingFairs = filteredFairs.filter(fair => !fair.featured);

  const toggleFollowFair = (fairId: string) => {
    const newFollowed = new Set(followedFairs);
    if (newFollowed.has(fairId)) {
      newFollowed.delete(fairId);
    } else {
      newFollowed.add(fairId);
    }
    setFollowedFairs(newFollowed);
  };

  const getTimeUntilFair = (date: string) => {
    const fairDate = new Date(date);
    const now = new Date();
    const diffTime = fairDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past event';
    if (diffDays === 0) return 'Today!';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks`;
    return `${Math.ceil(diffDays / 30)} months`;
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-10 animate-pulse"></div>
      
      {/* Header */}
      <div className="border-b border-neon-purple/20 glass backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl flex items-center justify-center neon-glow">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
                Mzansi Career Connect
              </h1>
              <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-xl flex items-center justify-center neon-glow">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              South Africa's premier career fair network connecting students and companies across all major universities 🇿🇦
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="glass border-neon-purple/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-neon-purple">{southAfricanCareerFairs.length}</div>
                <div className="text-sm text-muted-foreground">Career Fairs</div>
              </CardContent>
            </Card>
            <Card className="glass border-neon-cyan/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-neon-cyan">15,000+</div>
                <div className="text-sm text-muted-foreground">Expected Students</div>
              </CardContent>
            </Card>
            <Card className="glass border-neon-pink/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-neon-pink">500+</div>
                <div className="text-sm text-muted-foreground">Participating Companies</div>
              </CardContent>
            </Card>
            <Card className="glass border-neon-green/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-neon-green">9</div>
                <div className="text-sm text-muted-foreground">Provinces Covered</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-purple" />
            <Input
              placeholder="Search career fairs, universities, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-secondary/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/20 rounded-xl"
            />
          </div>
          
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="h-12 bg-secondary/50 border border-neon-cyan/30 rounded-xl px-4 text-foreground focus:border-neon-cyan focus:ring-neon-cyan/20"
          >
            {provinces.map(province => (
              <option key={province} value={province}>
                {province === 'all' ? 'All Provinces' : province}
              </option>
            ))}
          </select>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="h-12 bg-secondary/50 border border-neon-pink/30 rounded-xl px-4 text-foreground focus:border-neon-pink focus:ring-neon-pink/20"
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry === 'all' ? 'All Industries' : industry}
              </option>
            ))}
          </select>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 border border-neon-purple/20">
            <TabsTrigger 
              value="featured"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-cyan data-[state=active]:text-white"
            >
              Featured 🌟
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-cyan data-[state=active]:to-neon-pink data-[state=active]:text-white"
            >
              All Career Fairs 📅
            </TabsTrigger>
            <TabsTrigger 
              value="followed"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink data-[state=active]:to-neon-yellow data-[state=active]:text-white"
            >
              Following ({followedFairs.size}) 💖
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="h-6 w-6 text-neon-yellow" />
              <h2 className="text-2xl font-bold">Featured Career Fairs</h2>
              <Badge className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30">
                Top Picks
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredFairs.map((fair) => (
                <Card key={fair.id} className="glass border-neon-purple/20 hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-14 w-14 border-2 border-neon-purple/30">
                            <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white font-bold">
                              {fair.universityCode}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-neon-yellow to-neon-pink rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{fair.name}</CardTitle>
                          <CardDescription className="text-neon-cyan font-medium">
                            {fair.university}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollowFair(fair.id);
                        }}
                        className={`${followedFairs.has(fair.id) 
                          ? 'text-neon-pink hover:text-neon-pink/80 neon-glow-pink' 
                          : 'text-muted-foreground hover:text-neon-pink'} transition-all duration-300`}
                      >
                        <Heart className={`h-5 w-5 ${followedFairs.has(fair.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{fair.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-neon-cyan" />
                        <span>{new Date(fair.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                        <Badge variant="outline" className="border-neon-green text-neon-green text-xs">
                          {getTimeUntilFair(fair.date)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-neon-pink" />
                        <span>{fair.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-neon-purple" />
                        <span>{fair.expectedAttendees.toLocaleString()} expected attendees</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {fair.industries.slice(0, 3).map((industry) => (
                        <Badge key={industry} variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs">
                          {industry}
                        </Badge>
                      ))}
                      {fair.industries.length > 3 && (
                        <Badge variant="outline" className="border-neon-cyan/50 text-neon-cyan text-xs">
                          +{fair.industries.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {fair.virtualComponent && (
                          <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30 text-xs">
                            <Globe className="h-3 w-3 mr-1" />
                            Virtual
                          </Badge>
                        )}
                        {fair.registrationOpen && (
                          <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            Open
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => onSelectCareerFair(fair)}
                        className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300"
                        size="sm"
                      >
                        {userRole === 'student' ? 'Join Fair' : 'Register Company'}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-6 w-6 text-neon-cyan" />
              <h2 className="text-2xl font-bold">All Career Fairs</h2>
              <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                {filteredFairs.length} Events
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFairs.map((fair) => (
                <Card key={fair.id} className="glass border-neon-purple/20 hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10 border-2 border-neon-purple/30">
                          <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white font-bold text-xs">
                            {fair.universityCode}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-sm">{fair.name}</CardTitle>
                          <CardDescription className="text-xs">{fair.university}</CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollowFair(fair.id);
                        }}
                        className={`${followedFairs.has(fair.id) 
                          ? 'text-neon-pink hover:text-neon-pink/80' 
                          : 'text-muted-foreground hover:text-neon-pink'} transition-all duration-300 p-1`}
                      >
                        <Heart className={`h-4 w-4 ${followedFairs.has(fair.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="h-3 w-3 text-neon-cyan" />
                        <span>{new Date(fair.date).toLocaleDateString()}</span>
                        <Badge variant="outline" className="border-neon-green text-neon-green text-xs px-1 py-0">
                          {getTimeUntilFair(fair.date)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin className="h-3 w-3 text-neon-pink" />
                        <span>{fair.province}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {fair.industries.slice(0, 2).map((industry) => (
                        <Badge key={industry} variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs px-2 py-0">
                          {industry}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      onClick={() => onSelectCareerFair(fair)}
                      className="w-full gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300"
                      size="sm"
                    >
                      {userRole === 'student' ? 'Join' : 'Register'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="followed" className="space-y-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-neon-pink" />
              <h2 className="text-2xl font-bold">Following</h2>
              <Badge className="bg-neon-pink/20 text-neon-pink border-neon-pink/30">
                {followedFairs.size} Career Fairs
              </Badge>
            </div>
            
            {followedFairs.size === 0 ? (
              <Card className="glass border-neon-pink/20 neon-glow-pink">
                <CardContent className="p-8 text-center">
                  <Heart className="h-16 w-16 text-neon-pink mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-bold mb-2">No career fairs followed yet! 💔</h3>
                  <p className="text-muted-foreground">
                    Start following career fairs to get updates and quick access! 💖
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFairs.filter(fair => followedFairs.has(fair.id)).map((fair) => (
                  <Card key={fair.id} className="glass border-neon-pink/20 hover:border-neon-purple/50 hover:shadow-lg hover:shadow-neon-purple/10 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 border-2 border-neon-pink/30">
                          <AvatarFallback className="bg-gradient-to-br from-neon-pink to-neon-purple text-white font-bold">
                            {fair.universityCode}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{fair.name}</h3>
                          <p className="text-neon-cyan font-medium">{fair.university}</p>
                          <div className="flex items-center gap-2 text-sm mt-2">
                            <Calendar className="h-4 w-4 text-neon-cyan" />
                            <span>{new Date(fair.date).toLocaleDateString()}</span>
                            <Badge variant="outline" className="border-neon-green text-neon-green text-xs">
                              {getTimeUntilFair(fair.date)}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          onClick={() => onSelectCareerFair(fair)}
                          className="gradient-pink hover:shadow-lg hover:shadow-neon-pink/25 transition-all duration-300"
                          size="sm"
                        >
                          Enter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}