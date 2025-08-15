import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  X,
  MessageSquare,
  Building2,
  User,
  Calendar,
  Send,
  Heart,
  Star,
  Zap,
  TrendingUp,
  Award,
  Filter,
  Search,
  Mail,
  Phone,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Connection, User as AppUser } from '../App';
import { toast } from 'sonner@2.0.3';

interface ConnectionsManagerProps {
  user: AppUser;
  userRole: 'student' | 'company';
  careerFairId: string;
  onConnectionUpdate?: () => void;
}

export function ConnectionsManager({ user, userRole, careerFairId, onConnectionUpdate }: ConnectionsManagerProps) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    loadConnections();
  }, [user.id, careerFairId]);

  const loadConnections = async () => {
    setLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockConnections: Connection[] = [
        {
          id: 'conn-1',
          student_id: 'student-1',
          company_id: 'company-1',
          student_user_id: userRole === 'student' ? user.id : 'other-user-1',
          company_user_id: userRole === 'company' ? user.id : 'other-user-2',
          career_fair_id: careerFairId,
          status: 'pending',
          connection_type: 'company_initiated',
          company_notes: 'Great conversation about AI and machine learning. Would love to discuss internship opportunities.',
          connection_timestamp: '2025-08-01T14:30:00Z',
          created_at: '2025-08-01T14:30:00Z',
          student_name: 'Sarah Mbeki',
          company_name: 'TechCorp SA',
          student_profile: {
            id: 'student-1',
            user_id: 'user-1',
            university: 'University of Cape Town',
            degree: 'Computer Science',
            year_of_study: 'Final Year',
            skills: ['React', 'Python', 'Machine Learning'],
            interests: ['Technology', 'AI'],
            location_province: 'Western Cape',
            location_city: 'Cape Town',
            languages: ['English', 'Afrikaans'],
            bio: 'Passionate CS student with focus on AI and sustainable tech.',
            linkedin_url: 'https://linkedin.com/in/sarah-mbeki',
            portfolio_url: 'https://sarah-portfolio.com'
          },
          company_profile: {
            id: 'company-1',
            name: 'TechCorp SA',
            logo: '',
            industry: 'Technology',
            description: 'Leading South African technology company',
            positions: ['Software Engineer', 'Data Scientist'],
            requirements: [],
            benefits: [],
            website: 'https://techcorp.co.za'
          }
        },
        {
          id: 'conn-2',
          student_id: 'student-2',
          company_id: 'company-2',
          student_user_id: userRole === 'student' ? user.id : 'other-user-3',
          company_user_id: userRole === 'company' ? user.id : 'other-user-4',
          career_fair_id: careerFairId,
          status: 'accepted',
          connection_type: 'company_initiated',
          company_notes: 'Impressed by your portfolio and problem-solving approach.',
          student_notes: 'Thank you for the opportunity! Very excited about the role.',
          connection_timestamp: '2025-08-01T13:15:00Z',
          created_at: '2025-08-01T13:15:00Z',
          updated_at: '2025-08-01T15:45:00Z',
          student_name: 'David Nkomo',
          company_name: 'Innovation Labs',
          student_profile: {
            id: 'student-2',
            user_id: 'user-3',
            university: 'University of the Witwatersrand',
            degree: 'Industrial Engineering',
            year_of_study: 'Third Year',
            skills: ['Project Management', 'Data Analysis', 'Lean Six Sigma'],
            interests: ['Manufacturing', 'Process Optimization'],
            location_province: 'Gauteng',
            location_city: 'Johannesburg',
            languages: ['English', 'Zulu'],
            bio: 'Engineering student passionate about process optimization.',
            linkedin_url: 'https://linkedin.com/in/david-nkomo'
          },
          company_profile: {
            id: 'company-2',
            name: 'Innovation Labs',
            logo: '',
            industry: 'Manufacturing',
            description: 'Advanced manufacturing solutions',
            positions: ['Process Engineer', 'Project Manager'],
            requirements: [],
            benefits: [],
            website: 'https://innovationlabs.co.za'
          }
        }
      ];

      setConnections(mockConnections);
    } catch (error) {
      console.error('Failed to load connections:', error);
      toast.error('Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = 
      (userRole === 'student' ? connection.company_name : connection.student_name)
        ?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (userRole === 'student' ? connection.company_profile?.industry : connection.student_profile?.university)
        ?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = activeTab === 'all' || connection.status === activeTab;
    
    return matchesSearch && matchesStatus;
  });

  const handleConnectionResponse = async (connectionId: string, action: 'accept' | 'decline', message?: string) => {
    setIsReplying(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update connection status
      setConnections(prev => prev.map(conn => 
        conn.id === connectionId 
          ? { 
              ...conn, 
              status: action === 'accept' ? 'accepted' : 'declined',
              student_notes: message || '',
              updated_at: new Date().toISOString()
            }
          : conn
      ));

      toast.success(
        action === 'accept' 
          ? 'Connection accepted! 🎉' 
          : 'Connection declined'
      );
      
      setSelectedConnection(null);
      setReplyMessage('');
      onConnectionUpdate?.();
    } catch (error) {
      console.error('Failed to respond to connection:', error);
      toast.error('Failed to update connection');
    } finally {
      setIsReplying(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
      case 'declined':
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground"><X className="h-3 w-3 mr-1" />Declined</Badge>;
      default:
        return null;
    }
  };

  const getConnectionStats = () => {
    const pending = connections.filter(c => c.status === 'pending').length;
    const accepted = connections.filter(c => c.status === 'accepted').length;
    const total = connections.length;
    
    return { pending, accepted, total };
  };

  const stats = getConnectionStats();

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="glass border-neon-purple/20">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-neon-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading connections...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <Card className="glass border-neon-purple/20 neon-glow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl flex items-center justify-center neon-glow">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                  FastTrack Connections
                </CardTitle>
                <CardDescription>
                  {userRole === 'student' 
                    ? 'Companies interested in connecting with you' 
                    : 'Students you\'ve connected with'}
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 glass rounded-lg">
              <div className="text-2xl font-bold text-neon-purple">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center p-3 glass rounded-lg">
              <div className="text-2xl font-bold text-neon-yellow">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-3 glass rounded-lg">
              <div className="text-2xl font-bold text-neon-green">{stats.accepted}</div>
              <div className="text-sm text-muted-foreground">Connected</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-purple" />
        <input
          placeholder={`Search ${userRole === 'student' ? 'companies' : 'students'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-neon-purple/30 rounded-xl focus:border-neon-purple focus:ring-neon-purple/20"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-secondary/50 border border-neon-purple/20">
          <TabsTrigger 
            value="all"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-purple data-[state=active]:to-neon-cyan data-[state=active]:text-white"
          >
            All ({stats.total})
          </TabsTrigger>
          <TabsTrigger 
            value="pending"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-yellow data-[state=active]:to-neon-pink data-[state=active]:text-white"
          >
            Pending ({stats.pending})
          </TabsTrigger>
          <TabsTrigger 
            value="accepted"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-green data-[state=active]:to-neon-cyan data-[state=active]:text-white"
          >
            Connected ({stats.accepted})
          </TabsTrigger>
          <TabsTrigger 
            value="declined"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-muted data-[state=active]:to-muted-foreground data-[state=active]:text-white"
          >
            Declined
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredConnections.length === 0 ? (
            <Card className="glass border-neon-purple/20">
              <CardContent className="p-8 text-center">
                <Users className="h-16 w-16 text-neon-purple mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">No connections found</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'pending' 
                    ? 'No pending connection requests at the moment'
                    : `No ${activeTab} connections to display`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredConnections.map((connection) => {
                const isStudent = userRole === 'student';
                const displayName = isStudent ? connection.company_name : connection.student_name;
                const displayProfile = isStudent ? connection.company_profile : connection.student_profile;
                
                return (
                  <Card key={connection.id} className="glass border-neon-purple/20 hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all duration-300">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-14 w-14 border-2 border-neon-purple/30">
                          <AvatarImage src={displayProfile?.logo || displayProfile?.profile_image} />
                          <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white font-bold">
                            {displayName?.charAt(0) || '?'}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg">{displayName}</h3>
                              <p className="text-neon-cyan font-medium">
                                {isStudent 
                                  ? displayProfile?.industry 
                                  : `${displayProfile?.year_of_study} • ${displayProfile?.university}`
                                }
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(connection.status)}
                              <Badge variant="outline" className="border-neon-purple/50 text-neon-purple text-xs">
                                {new Date(connection.connection_timestamp).toLocaleDateString()}
                              </Badge>
                            </div>
                          </div>

                          {/* Connection Message */}
                          {connection.company_notes && (
                            <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20 mb-3">
                              <p className="text-sm font-medium text-neon-purple mb-1">
                                {isStudent ? 'Company Message:' : 'Your Message:'}
                              </p>
                              <p className="text-sm text-muted-foreground">{connection.company_notes}</p>
                            </div>
                          )}

                          {/* Student Reply */}
                          {connection.student_notes && (
                            <div className="p-3 bg-neon-green/10 rounded-lg border border-neon-green/20 mb-3">
                              <p className="text-sm font-medium text-neon-green mb-1">
                                {isStudent ? 'Your Reply:' : 'Student Reply:'}
                              </p>
                              <p className="text-sm text-muted-foreground">{connection.student_notes}</p>
                            </div>
                          )}

                          {/* Profile Preview */}
                          {displayProfile && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {isStudent ? (
                                // Company info
                                displayProfile.positions?.slice(0, 2).map((position: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 text-xs">
                                    {position}
                                  </Badge>
                                ))
                              ) : (
                                // Student skills
                                displayProfile.skills?.slice(0, 3).map((skill: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="bg-neon-pink/20 text-neon-pink border-neon-pink/30 text-xs">
                                    {skill}
                                  </Badge>
                                ))
                              )}
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {connection.status === 'pending' && isStudent && (
                              <>
                                <Button 
                                  onClick={() => setSelectedConnection(connection)}
                                  className="gradient-green hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300"
                                  size="sm"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Respond
                                </Button>
                                <Button 
                                  onClick={() => handleConnectionResponse(connection.id, 'decline')}
                                  variant="outline"
                                  className="border-destructive text-destructive hover:bg-destructive/10"
                                  size="sm"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Decline
                                </Button>
                              </>
                            )}
                            
                            {connection.status === 'accepted' && (
                              <div className="flex gap-2">
                                {(isStudent ? displayProfile?.website : displayProfile?.linkedin_url) && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    asChild
                                    className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
                                  >
                                    <a 
                                      href={isStudent ? displayProfile?.website : displayProfile?.linkedin_url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                    >
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      {isStudent ? 'Website' : 'LinkedIn'}
                                    </a>
                                  </Button>
                                )}
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-neon-purple text-neon-purple hover:bg-neon-purple/10"
                                >
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  Message
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Response Modal */}
      {selectedConnection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="glass border-neon-green/20 neon-glow-green w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-neon-green" />
                <span className="bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
                  Respond to Connection Request
                </span>
              </CardTitle>
              <CardDescription>
                From: {selectedConnection.company_name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Original Message */}
              <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
                <p className="text-sm font-medium text-neon-purple mb-1">Their Message:</p>
                <p className="text-sm text-muted-foreground">{selectedConnection.company_notes}</p>
              </div>

              {/* Reply Form */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Your Response (Optional):</label>
                <Textarea
                  placeholder="Thank you for reaching out! I'm very interested in learning more about this opportunity..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="min-h-[100px] bg-secondary/50 border-neon-green/30 focus:border-neon-green focus:ring-neon-green/20"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleConnectionResponse(selectedConnection.id, 'accept', replyMessage)}
                  disabled={isReplying}
                  className="gradient-green hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-300 flex-1"
                >
                  {isReplying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Accepting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept Connection
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedConnection(null)}
                  className="border-muted-foreground text-muted-foreground"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}