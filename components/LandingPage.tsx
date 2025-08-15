import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Users, 
  Heart, 
  Target, 
  Zap,
  GraduationCap,
  Building2,
  Globe,
  Sparkles,
  Award,
  TrendingUp,
  Shield,
  Handshake,
  ArrowRight,
  CheckCircle,
  Star,
  Crown,
  Rocket,
  MapPin,
  Calendar,
  Coffee,
  Lightbulb,
  Network,
  BookOpen,
  Trophy,
  ChevronDown,
  Play
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [activeCommitment, setActiveCommitment] = useState('students');

  const platformValues = [
    {
      id: 'ubuntu',
      title: 'Ubuntu-Powered Growth',
      subtitle: '"I am because we are"',
      description: 'Collective success through individual excellence. We believe in lifting each other up.',
      icon: <Heart className="h-8 w-8" />,
      color: 'neon-pink',
      stats: '15,000+ students supported'
    },
    {
      id: 'authentic',
      title: 'Authentic Representation',
      subtitle: 'Your story matters',
      description: 'Celebrating diverse SA voices, languages, and perspectives from all provinces.',
      icon: <Star className="h-8 w-8" />,
      color: 'neon-cyan',
      stats: '9 provinces connected'
    },
    {
      id: 'opportunity',
      title: 'Opportunity Equality',
      subtitle: 'Breaking barriers',
      description: 'From rural universities to urban campuses - every student deserves access to opportunities.',
      icon: <Shield className="h-8 w-8" />,
      color: 'neon-green',
      stats: '25+ universities included'
    },
    {
      id: 'future',
      title: 'Future-Ready Skills',
      subtitle: '4IR preparation',
      description: 'Preparing South Africa\'s youth for the digital economy and global competitiveness.',
      icon: <Rocket className="h-8 w-8" />,
      color: 'neon-purple',
      stats: '500+ companies hiring'
    }
  ];

  const studentCommitments = [
    {
      title: 'Your Success is Our Mission',
      points: [
        'Free access to all career fair features - forever',
        'Personalized career guidance and prep resources',
        'Direct connections with top SA companies',
        'Skills development workshops and mentorship',
        'Portfolio building and interview prep support'
      ]
    },
    {
      title: 'Privacy & Respect',
      points: [
        'Your data stays private and secure',
        'No spam or unwanted communications',
        'Control what companies see about you',
        'Transparent about how your information is used',
        'Right to delete your account anytime'
      ]
    },
    {
      title: 'Inclusive Excellence',
      points: [
        'Equal opportunity regardless of background',
        'Support for students with disabilities',
        'Multi-language support (English, Afrikaans, local languages)',
        'Financial assistance for career fair attendance',
        'Mentorship programs for first-generation university students'
      ]
    }
  ];

  const companyCommitments = [
    {
      title: 'Quality Talent Pipeline',
      points: [
        'Access to pre-screened, motivated students',
        'Detailed candidate profiles with verified skills',
        'Direct connection tools for efficient recruitment',
        'Analytics on candidate engagement and fit',
        'Support throughout the hiring process'
      ]
    },
    {
      title: 'Transformation & Diversity',
      points: [
        'Promote diverse hiring across all demographics',
        'Support for BBBEE and transformation goals',
        'Access to candidates from previously disadvantaged backgrounds',
        'Rural and urban talent pool connections',
        'Inclusive recruitment best practices guidance'
      ]
    },
    {
      title: 'Value & Transparency',
      points: [
        'Clear, affordable pricing with no hidden fees',
        'ROI tracking and hiring success metrics',
        'Dedicated account management support',
        'Regular platform updates and improvements',
        'Community of forward-thinking employers'
      ]
    }
  ];

  const impactStats = [
    { number: '15,000+', label: 'Students Connected', icon: <GraduationCap className="h-6 w-6" /> },
    { number: '500+', label: 'Companies Hiring', icon: <Building2 className="h-6 w-6" /> },
    { number: '25+', label: 'Universities', icon: <BookOpen className="h-6 w-6" /> },
    { number: '9', label: 'Provinces', icon: <MapPin className="h-6 w-6" /> },
    { number: '85%', label: 'Success Rate', icon: <Trophy className="h-6 w-6" /> },
    { number: '24hrs', label: 'Avg Response', icon: <Zap className="h-6 w-6" /> }
  ];

  const testimonials = [
    {
      name: 'Thabo Mthembu',
      role: 'Computer Science Graduate, UKZN',
      quote: 'Mzansi Career Connect helped me land my dream job at a fintech startup. The strategic prep tools were game-changing! 🚀',
      avatar: '👨🏿‍💻'
    },
    {
      name: 'Sarah van der Merwe',
      role: 'Engineering Student, Stellenbosch',
      quote: 'The A/B/C tier system helped me prioritize my time perfectly. Got 3 interviews from my A-tier companies! 🎯',
      avatar: '👩🏼‍🔬'
    },
    {
      name: 'Nomsa Dlamini',
      role: 'HR Director, Tech Company',
      quote: 'We found our best graduate hires through this platform. The quality of candidates is exceptional. 💪',
      avatar: '👩🏿‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-mesh opacity-15 animate-pulse"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Main Logo & Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-2xl flex items-center justify-center neon-glow">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
                Mzansi Career Connect
              </h1>
              <div className="w-16 h-16 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-2xl flex items-center justify-center neon-glow-pink">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Where South Africa's brightest minds meet forward-thinking companies. 
              <span className="text-neon-cyan font-semibold"> Ubuntu</span> meets 
              <span className="text-neon-pink font-semibold"> opportunity</span> in the digital age 🇿🇦
            </p>
          </div>

          {/* Call to Action */}
          <div className="mb-16">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 text-xl px-12 py-6 h-auto font-bold neon-glow"
            >
              Start Your Journey <ArrowRight className="h-6 w-6 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              🎉 Free for students • Affordable for companies • Transformational for South Africa
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-16">
            {impactStats.map((stat, index) => (
              <Card key={index} className="glass border-neon-purple/20 hover:border-neon-cyan/40 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="text-neon-cyan mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-neon-purple">{stat.number}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="relative z-10 py-24 border-t border-neon-purple/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Our Ubuntu Values 🌍
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on African principles, designed for global impact. These values guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformValues.map((value) => (
              <Card key={value.id} className={`glass border-${value.color}/20 hover:border-${value.color}/50 hover:shadow-lg transition-all duration-300 hover:scale-105 neon-glow group`}>
                <CardHeader className="text-center pb-3">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-${value.color} to-neon-purple rounded-2xl flex items-center justify-center text-white`}>
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                  <CardDescription className={`text-${value.color} font-semibold`}>
                    {value.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4 leading-relaxed">{value.description}</p>
                  <Badge className={`bg-${value.color}/20 text-${value.color} border-${value.color}/30`}>
                    {value.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Commitments Section */}
      <div className="relative z-10 py-24 border-t border-neon-purple/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              Our Commitments to You 🤝
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Promises we make and keep. Your success is our success, your growth is our mission.
            </p>
          </div>

          {/* Commitment Toggle */}
          <div className="flex justify-center mb-12">
            <div className="glass rounded-full p-2 border border-neon-purple/20">
              <div className="flex">
                <Button
                  variant={activeCommitment === 'students' ? 'default' : 'ghost'}
                  onClick={() => setActiveCommitment('students')}
                  className={`rounded-full px-8 py-3 transition-all duration-300 ${
                    activeCommitment === 'students' 
                      ? 'gradient-purple text-white shadow-lg shadow-neon-purple/25' 
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <GraduationCap className="h-5 w-5 mr-2" />
                  For Students 🎓
                </Button>
                <Button
                  variant={activeCommitment === 'companies' ? 'default' : 'ghost'}
                  onClick={() => setActiveCommitment('companies')}
                  className={`rounded-full px-8 py-3 transition-all duration-300 ${
                    activeCommitment === 'companies' 
                      ? 'gradient-cyan text-white shadow-lg shadow-neon-cyan/25' 
                      : 'text-muted-foreground hover:text-white'
                  }`}
                >
                  <Building2 className="h-5 w-5 mr-2" />
                  For Companies 🏢
                </Button>
              </div>
            </div>
          </div>

          {/* Commitment Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(activeCommitment === 'students' ? studentCommitments : companyCommitments).map((commitment, index) => (
              <Card key={index} className={`glass border-${activeCommitment === 'students' ? 'neon-purple' : 'neon-cyan'}/20 hover:border-${activeCommitment === 'students' ? 'neon-purple' : 'neon-cyan'}/50 transition-all duration-300`}>
                <CardHeader>
                  <CardTitle className={`text-xl flex items-center gap-3 text-${activeCommitment === 'students' ? 'neon-purple' : 'neon-cyan'}`}>
                    <div className={`w-10 h-10 bg-gradient-to-r from-${activeCommitment === 'students' ? 'neon-purple' : 'neon-cyan'} to-neon-pink rounded-xl flex items-center justify-center`}>
                      {activeCommitment === 'students' ? <Heart className="h-5 w-5 text-white" /> : <Handshake className="h-5 w-5 text-white" />}
                    </div>
                    {commitment.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {commitment.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start gap-3">
                        <CheckCircle className={`h-5 w-5 text-${activeCommitment === 'students' ? 'neon-green' : 'neon-yellow'} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 py-24 border-t border-neon-purple/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-yellow bg-clip-text text-transparent">
              Real Stories, Real Impact 💫
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from students and companies who've transformed their futures with Mzansi Career Connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass border-neon-pink/20 hover:border-neon-yellow/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{testimonial.avatar}</div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-neon-cyan">{testimonial.role}</p>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed text-center">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-neon-yellow text-neon-yellow" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Preview Section */}
      <div className="relative z-10 py-24 border-t border-neon-purple/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
              Experience the Platform ✨
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A quick look at what makes Mzansi Career Connect special for both students and companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Student Features */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4 text-neon-purple">For Students 🎓</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Target className="h-5 w-5" />, title: 'Strategic A/B/C Company Prioritization', desc: 'Focus your energy where it matters most' },
                    { icon: <Zap className="h-5 w-5" />, title: 'FastTrack QR Code Networking', desc: 'Instant connections with companies' },
                    { icon: <BookOpen className="h-5 w-5" />, title: 'Comprehensive Career Fair Prep', desc: 'Stand out with insider strategies' },
                    { icon: <Network className="h-5 w-5" />, title: 'Multi-University Network Access', desc: 'Connect across all SA universities' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 glass rounded-lg border border-neon-purple/20">
                      <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Features */}
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4 text-neon-cyan">For Companies 🏢</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Users className="h-5 w-5" />, title: 'Quality Talent Pipeline', desc: 'Access pre-screened, motivated students' },
                    { icon: <TrendingUp className="h-5 w-5" />, title: 'Advanced Analytics Dashboard', desc: 'Track recruitment ROI and success' },
                    { icon: <Handshake className="h-5 w-5" />, title: 'FastTrack Connection System', desc: 'Instant candidate engagement' },
                    { icon: <Globe className="h-5 w-5" />, title: 'Nationwide University Reach', desc: 'Recruit from all SA institutions' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 glass rounded-lg border border-neon-cyan/20">
                      <div className="w-10 h-10 bg-gradient-to-r from-neon-cyan to-neon-green rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative z-10 py-24 border-t border-neon-purple/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass rounded-3xl p-12 border border-neon-purple/20 neon-glow">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              Ready to Transform Your Future? 🚀
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join thousands of students and hundreds of companies who are already building the future of work in South Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 text-xl px-12 py-6 h-auto font-bold neon-glow"
              >
                <Sparkles className="h-6 w-6 mr-2" />
                Let's Get Started
              </Button>
              <p className="text-sm text-muted-foreground">
                🇿🇦 Proudly South African • 🌍 Globally Competitive
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-neon-purple/20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-lg flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <p className="text-muted-foreground">
              Made with Ubuntu spirit for the future of South Africa
            </p>
            <div className="w-8 h-8 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Mzansi Career Connect • Empowering the next generation • 🇿🇦
          </p>
        </div>
      </div>
    </div>
  );
}