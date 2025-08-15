import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { 
  X, 
  ExternalLink, 
  MapPin, 
  Users, 
  Calendar,
  Award,
  TrendingUp,
  Building2,
  Globe,
  Star,
  Code,
  Heart,
  Target,
  Briefcase,
  GraduationCap,
  DollarSign,
  Clock,
  CheckCircle,
  Zap,
  Crown,
  Trophy,
  Sparkles,
  Info,
  MessageSquare
} from 'lucide-react';
import { Company, CompanyTier } from '../App';
import { toast } from 'sonner@2.0.3';

interface CompanyDetailModalProps {
  company: Company;
  currentTier: CompanyTier;
  onTierChange: (tier: CompanyTier) => void;
  onClose: () => void;
  loading?: boolean;
}

export function CompanyDetailModal({ company, currentTier, onTierChange, onClose, loading }: CompanyDetailModalProps) {
  const [selectedTier, setSelectedTier] = useState<CompanyTier>(currentTier);
  const [notes, setNotes] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  const handleTierSelection = (tier: CompanyTier) => {
    setSelectedTier(tier);
    onTierChange(tier);
    
    const tierMessages = {
      'A': 'Added to A-Tier! This is your top priority 🎯',
      'B': 'Added to B-Tier! Solid opportunity 👍',
      'C': 'Added to C-Tier! Good backup option 📝',
      null: 'Removed from favorites 💔'
    };
    
    toast.success(tierMessages[tier] || 'Updated tier preference!');
  };

  const getTierStyle = (tier: CompanyTier) => {
    const styles = {
      'A': 'border-neon-purple bg-neon-purple/20 text-neon-purple neon-glow',
      'B': 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan neon-glow-cyan',
      'C': 'border-neon-green bg-neon-green/20 text-neon-green',
      null: 'border-muted-foreground bg-secondary/50 text-muted-foreground'
    };
    return styles[tier] || styles[null];
  };

  const getTierIcon = (tier: CompanyTier) => {
    const icons = {
      'A': <Crown className="h-4 w-4" />,
      'B': <Star className="h-4 w-4" />,
      'C': <Target className="h-4 w-4" />,
      null: <Heart className="h-4 w-4" />
    };
    return icons[tier] || icons[null];
  };

  const formatSalary = (range: { min: number; max: number; currency: string }) => {
    const formatNumber = (num: number) => (num / 1000).toFixed(0) + 'k';
    return `${range.currency} ${formatNumber(range.min)} - ${formatNumber(range.max)}`;
  };

  const getCompanySizeLabel = (size: string) => {
    const labels = {
      'startup': '1-50 employees',
      'small': '51-200 employees',
      'medium': '201-1000 employees',
      'large': '1000+ employees',
      'enterprise': '5000+ employees'
    };
    return labels[size as keyof typeof labels] || size;
  };

  const getWorkEnvironmentIcon = (env: string) => {
    const icons = {
      'remote': <Globe className="h-4 w-4" />,
      'hybrid': <Building2 className="h-4 w-4" />,
      'onsite': <MapPin className="h-4 w-4" />,
      'flexible': <Clock className="h-4 w-4" />
    };
    return icons[env as keyof typeof icons] || <Building2 className="h-4 w-4" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-xl border border-neon-purple/20 glass overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-neon-purple/20 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <Avatar className="h-16 w-16 border-2 border-neon-purple/30">
                <AvatarImage src={company.logo} alt={company.name} />
                <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white font-bold text-xl">
                  {company.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{company.name}</h2>
                  {company.glassdoor_rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-neon-yellow text-neon-yellow" />
                      <span className="text-sm font-medium">{company.glassdoor_rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <p className="text-neon-cyan font-medium text-lg mb-2">{company.industry}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {company.headquarters}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {getCompanySizeLabel(company.company_size || 'medium')}
                  </div>
                  {company.founded_year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Founded {company.founded_year}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tier Selection */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-5 w-5 text-neon-yellow" />
              <h3 className="font-semibold">Strategic Priority Level</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { tier: 'A' as const, label: 'A-Tier', subtitle: '70% focus', icon: Crown, color: 'purple' },
                { tier: 'B' as const, label: 'B-Tier', subtitle: '25% focus', icon: Star, color: 'cyan' },
                { tier: 'C' as const, label: 'C-Tier', subtitle: '5% focus', icon: Target, color: 'green' },
                { tier: null as const, label: 'Not Interested', subtitle: 'Remove', icon: X, color: 'muted' }
              ].map(({ tier, label, subtitle, icon: Icon, color }) => (
                <Button
                  key={tier || 'none'}
                  variant="outline"
                  onClick={() => handleTierSelection(tier)}
                  disabled={loading}
                  className={`h-auto p-3 flex flex-col items-center gap-1 transition-all duration-300 ${
                    selectedTier === tier ? getTierStyle(tier) : 'border-muted hover:border-neon-purple/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-semibold text-xs">{label}</span>
                  <span className="text-xs opacity-75">{subtitle}</span>
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              💡 A-Tier = Dream companies, B-Tier = Great options, C-Tier = Backup plans
            </p>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-neon-purple/20 -mb-4">
              {[
                { id: 'overview', label: 'Overview', icon: Building2 },
                { id: 'culture', label: 'Culture & Values', icon: Heart },
                { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
                { id: 'tech', label: 'Tech & Environment', icon: Code }
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection(id)}
                  className={`flex items-center gap-2 ${
                    activeSection === id 
                      ? 'text-neon-purple border-b-2 border-neon-purple' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>

            {/* Overview Section */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Mission & Description */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-neon-purple" />
                    About {company.name}
                  </h3>
                  {company.mission_statement && (
                    <div className="p-4 glass rounded-lg border border-neon-purple/20">
                      <h4 className="font-semibold mb-2 text-neon-purple">Mission Statement</h4>
                      <p className="text-muted-foreground italic">{company.mission_statement}</p>
                    </div>
                  )}
                  <p className="text-muted-foreground leading-relaxed">{company.description}</p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 glass rounded-lg border border-neon-cyan/20 text-center">
                    <Users className="h-6 w-6 text-neon-cyan mx-auto mb-2" />
                    <div className="font-bold text-neon-cyan">{getCompanySizeLabel(company.company_size || 'medium')}</div>
                    <div className="text-xs text-muted-foreground">Company Size</div>
                  </div>
                  <div className="p-4 glass rounded-lg border border-neon-green/20 text-center">
                    <Calendar className="h-6 w-6 text-neon-green mx-auto mb-2" />
                    <div className="font-bold text-neon-green">{company.founded_year}</div>
                    <div className="text-xs text-muted-foreground">Founded</div>
                  </div>
                  <div className="p-4 glass rounded-lg border border-neon-pink/20 text-center">
                    <MapPin className="h-6 w-6 text-neon-pink mx-auto mb-2" />
                    <div className="font-bold text-neon-pink">{company.office_locations?.length || 1}</div>
                    <div className="text-xs text-muted-foreground">Office Locations</div>
                  </div>
                  <div className="p-4 glass rounded-lg border border-neon-yellow/20 text-center">
                    {getWorkEnvironmentIcon(company.work_environment || 'hybrid')}
                    <div className="font-bold text-neon-yellow capitalize mt-2">{company.work_environment || 'Hybrid'}</div>
                    <div className="text-xs text-muted-foreground">Work Style</div>
                  </div>
                </div>

                {/* Recent Achievements */}
                {company.recent_achievements && company.recent_achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-neon-yellow" />
                      Recent Achievements
                    </h4>
                    <div className="space-y-2">
                      {company.recent_achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg border border-neon-yellow/20">
                          <Award className="h-4 w-4 text-neon-yellow flex-shrink-0" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent News */}
                {company.recent_news && company.recent_news.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-neon-cyan" />
                      Recent News
                    </h4>
                    <div className="space-y-3">
                      {company.recent_news.map((news, index) => (
                        <div key={index} className="p-4 glass rounded-lg border border-neon-cyan/20">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium mb-1">{news.title}</h5>
                              <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                              <div className="text-xs text-neon-cyan">{new Date(news.date).toLocaleDateString()}</div>
                            </div>
                            {news.url && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={news.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Company Website Link */}
                <div className="flex justify-center">
                  <Button variant="outline" asChild className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10">
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Company Website
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {/* Culture & Values Section */}
            {activeSection === 'culture' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Heart className="h-5 w-5 text-neon-pink" />
                  Culture & Values
                </h3>
                
                {/* Company Values */}
                {company.company_values && company.company_values.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Core Values</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {company.company_values.map((value, index) => (
                        <div key={index} className="p-3 glass rounded-lg border border-neon-pink/20 text-center">
                          <span className="font-medium text-neon-pink">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Company Culture */}
                {company.company_culture && company.company_culture.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Culture Highlights</h4>
                    <div className="space-y-2">
                      {company.company_culture.map((culture, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg border border-neon-cyan/20">
                          <Sparkles className="h-4 w-4 text-neon-cyan flex-shrink-0" />
                          <span className="text-sm">{culture}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Diversity Initiatives */}
                {company.diversity_initiatives && company.diversity_initiatives.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Diversity & Inclusion</h4>
                    <div className="space-y-2">
                      {company.diversity_initiatives.map((initiative, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg border border-neon-green/20">
                          <Users className="h-4 w-4 text-neon-green flex-shrink-0" />
                          <span className="text-sm">{initiative}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Career Development */}
                {company.career_development && company.career_development.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Career Development</h4>
                    <div className="space-y-2">
                      {company.career_development.map((development, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg border border-neon-purple/20">
                          <TrendingUp className="h-4 w-4 text-neon-purple flex-shrink-0" />
                          <span className="text-sm">{development}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Opportunities Section */}
            {activeSection === 'opportunities' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-neon-yellow" />
                  Career Opportunities
                </h3>

                {/* Available Positions */}
                <div>
                  <h4 className="font-semibold mb-3">Available Positions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {company.positions.map((position, index) => (
                      <div key={index} className="p-4 glass rounded-lg border border-neon-yellow/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="h-4 w-4 text-neon-yellow" />
                          <span className="font-medium">{position}</span>
                        </div>
                        {company.salary_range && (
                          <div className="text-sm text-neon-green">
                            💰 {formatSalary(company.salary_range)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Programs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 glass rounded-lg border ${company.internship_programs ? 'border-neon-green/20' : 'border-muted/20'} text-center`}>
                    <GraduationCap className={`h-6 w-6 mx-auto mb-2 ${company.internship_programs ? 'text-neon-green' : 'text-muted-foreground'}`} />
                    <div className="font-semibold">Internship Programs</div>
                    <div className={`text-sm ${company.internship_programs ? 'text-neon-green' : 'text-muted-foreground'}`}>
                      {company.internship_programs ? 'Available' : 'Not Available'}
                    </div>
                  </div>
                  <div className={`p-4 glass rounded-lg border ${company.graduate_programs ? 'border-neon-green/20' : 'border-muted/20'} text-center`}>
                    <Award className={`h-6 w-6 mx-auto mb-2 ${company.graduate_programs ? 'text-neon-green' : 'text-muted-foreground'}`} />
                    <div className="font-semibold">Graduate Programs</div>
                    <div className={`text-sm ${company.graduate_programs ? 'text-neon-green' : 'text-muted-foreground'}`}>
                      {company.graduate_programs ? 'Available' : 'Not Available'}
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                {company.requirements && company.requirements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">General Requirements</h4>
                    <div className="space-y-2">
                      {company.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg border border-neon-cyan/20">
                          <CheckCircle className="h-4 w-4 text-neon-cyan flex-shrink-0" />
                          <span className="text-sm">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {company.benefits && company.benefits.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Benefits & Perks</h4>
                    <div className="space-y-2">
                      {company.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg border border-neon-pink/20">
                          <Star className="h-4 w-4 text-neon-pink flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tech & Environment Section */}
            {activeSection === 'tech' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Code className="h-5 w-5 text-neon-cyan" />
                  Tech Stack & Work Environment
                </h3>

                {/* Tech Stack */}
                {company.tech_stack && company.tech_stack.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.tech_stack.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Environment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Work Setup</h4>
                    <div className="p-4 glass rounded-lg border border-neon-green/20">
                      <div className="flex items-center gap-3 mb-2">
                        {getWorkEnvironmentIcon(company.work_environment || 'hybrid')}
                        <span className="font-medium capitalize">{company.work_environment || 'Hybrid'}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {company.work_environment === 'remote' && 'Fully remote work with flexible hours'}
                        {company.work_environment === 'hybrid' && 'Mix of office and remote work'}
                        {company.work_environment === 'onsite' && 'Office-based work environment'}
                        {company.work_environment === 'flexible' && 'Flexible work arrangements available'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Office Locations</h4>
                    <div className="space-y-2">
                      {company.office_locations?.map((location, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 glass rounded-lg border border-neon-pink/20">
                          <MapPin className="h-4 w-4 text-neon-pink flex-shrink-0" />
                          <span className="text-sm">{location}</span>
                        </div>
                      )) || (
                        <div className="flex items-center gap-3 p-3 glass rounded-lg border border-neon-pink/20">
                          <MapPin className="h-4 w-4 text-neon-pink flex-shrink-0" />
                          <span className="text-sm">{company.headquarters}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Section */}
            <div className="border-t border-neon-purple/20 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-5 w-5 text-neon-green" />
                <label className="font-semibold">Personal Notes</label>
              </div>
              <Textarea
                placeholder="Add your personal notes about this company, key talking points for interviews, or reminders..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px] bg-secondary/50 border-neon-green/30 focus:border-neon-green focus:ring-neon-green/20"
              />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}