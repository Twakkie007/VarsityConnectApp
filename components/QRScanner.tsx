import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  QrCode, 
  Camera, 
  Scan,
  User,
  Zap,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Building2,
  MapPin,
  Star,
  Users,
  ArrowRight,
  Link as LinkIcon
} from 'lucide-react';
import { StudentProfile, Company } from '../App';
import { toast } from 'sonner@2.0.3';

interface QRScannerProps {
  companyProfile: Company;
  careerFairId: string;
  onScanSuccess?: (studentProfile: StudentProfile) => void;
  onConnectionRequest?: (studentId: string, notes: string) => void;
}

interface ScannedStudent {
  profile: StudentProfile;
  name: string;
  isNewConnection: boolean;
}

export function QRScanner({ companyProfile, careerFairId, onScanSuccess, onConnectionRequest }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedStudent, setScannedStudent] = useState<ScannedStudent | null>(null);
  const [connectionNotes, setConnectionNotes] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulated QR scanning (in real implementation, you'd use a QR scanner library)
  const startScanning = async () => {
    setIsScanning(true);
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera if available
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      // In a real implementation, you'd use a QR code scanning library here
      // For demo purposes, we'll simulate scanning after a delay
      setTimeout(() => {
        simulateQRScan();
      }, 3000);
      
    } catch (error) {
      console.error('Failed to access camera:', error);
      toast.error('Camera access denied. Please enable camera permissions.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Simulate QR code scanning with mock data
  const simulateQRScan = () => {
    // Mock scanned student data
    const mockStudent: ScannedStudent = {
      profile: {
        id: 'student-1',
        user_id: 'user-1',
        university: 'University of Cape Town',
        degree: 'Computer Science',
        year_of_study: 'Final Year',
        skills: ['React', 'TypeScript', 'Python', 'Machine Learning', 'UI/UX Design'],
        interests: ['Technology', 'Startups', 'AI/ML'],
        career_goals: 'Passionate about building innovative solutions that solve real-world problems. Looking for opportunities in tech where I can contribute to meaningful projects and grow my expertise in AI and software development.',
        preferred_industries: ['Technology', 'Fintech', 'Healthcare Tech'],
        location_province: 'Western Cape',
        location_city: 'Cape Town',
        languages: ['English', 'Afrikaans', 'Xhosa'],
        linkedin_url: 'https://linkedin.com/in/example',
        github_url: 'https://github.com/example',
        portfolio_url: 'https://example-portfolio.com',
        bio: 'Innovative computer science student with a passion for AI and sustainable technology solutions.',
        gpa: '85%',
        availability: 'Available for internships and graduate positions',
        qr_token: 'abc123def456',
        created_at: '2024-01-01T00:00:00Z'
      },
      name: 'Sarah Mbeki',
      isNewConnection: true
    };

    setScannedStudent(mockStudent);
    setIsScanning(false);
    stopScanning();
    onScanSuccess?.(mockStudent.profile);
    toast.success('Student profile scanned successfully! 🎯');
  };

  const handleManualEntry = () => {
    if (!manualUrl.trim()) {
      toast.error('Please enter a valid FastTrack URL');
      return;
    }

    // Extract token from URL and simulate scan
    try {
      const url = new URL(manualUrl);
      const token = url.pathname.split('/').pop();
      if (token) {
        simulateQRScan(); // For demo purposes
        setShowManualEntry(false);
        setManualUrl('');
      }
    } catch (error) {
      toast.error('Invalid FastTrack URL format');
    }
  };

  const sendConnectionRequest = async () => {
    if (!scannedStudent) return;
    
    setIsConnecting(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onConnectionRequest?.(scannedStudent.profile.id, connectionNotes);
      toast.success(`Connection request sent to ${scannedStudent.name}! 🚀`);
      
      // Reset state
      setScannedStudent(null);
      setConnectionNotes('');
    } catch (error) {
      console.error('Failed to send connection request:', error);
      toast.error('Failed to send connection request');
    } finally {
      setIsConnecting(false);
    }
  };

  const closeStudentProfile = () => {
    setScannedStudent(null);
    setConnectionNotes('');
  };

  if (scannedStudent) {
    return (
      <Card className="glass border-neon-cyan/20 neon-glow-cyan">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-cyan to-neon-green rounded-xl flex items-center justify-center neon-glow-cyan">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">Student Profile Scanned</CardTitle>
                <CardDescription>Review and connect with this candidate</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={closeStudentProfile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Student Profile Preview */}
          <div className="p-6 glass rounded-xl border border-neon-cyan/20">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-16 w-16 border-2 border-neon-cyan/30">
                <AvatarImage src={scannedStudent.profile.profile_image} />
                <AvatarFallback className="bg-gradient-to-br from-neon-cyan to-neon-green text-white font-bold text-lg">
                  {scannedStudent.name.split(' ').map(n => n.charAt(0)).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">{scannedStudent.name}</h3>
                <p className="text-neon-cyan font-medium text-lg mb-2">
                  {scannedStudent.profile.year_of_study} • {scannedStudent.profile.degree}
                </p>
                <p className="text-muted-foreground mb-3">
                  {scannedStudent.profile.university}
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-neon-green/20 text-neon-green border-neon-green/30">
                    <Star className="h-3 w-3 mr-1" />
                    Available
                  </Badge>
                  {scannedStudent.isNewConnection && (
                    <Badge className="bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30">
                      <Sparkles className="h-3 w-3 mr-1" />
                      New Connection
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {scannedStudent.profile.bio && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-neon-cyan">About</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scannedStudent.profile.bio}
                </p>
              </div>
            )}

            {scannedStudent.profile.career_goals && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-neon-purple">Career Goals</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scannedStudent.profile.career_goals}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold mb-2 text-neon-pink">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {scannedStudent.profile.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {scannedStudent.profile.skills.length > 4 && (
                    <Badge variant="outline" className="border-neon-cyan/50 text-neon-cyan text-xs">
                      +{scannedStudent.profile.skills.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-neon-green">Location</h4>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-neon-green" />
                  <span>{scannedStudent.profile.location_city}, {scannedStudent.profile.location_province}</span>
                </div>
              </div>
            </div>

            {(scannedStudent.profile.linkedin_url || scannedStudent.profile.github_url || scannedStudent.profile.portfolio_url) && (
              <div className="flex gap-2">
                {scannedStudent.profile.linkedin_url && (
                  <Button variant="outline" size="sm" asChild className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10">
                    <a href={scannedStudent.profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {scannedStudent.profile.github_url && (
                  <Button variant="outline" size="sm" asChild className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                    <a href={scannedStudent.profile.github_url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      GitHub
                    </a>
                  </Button>
                )}
                {scannedStudent.profile.portfolio_url && (
                  <Button variant="outline" size="sm" asChild className="border-neon-pink text-neon-pink hover:bg-neon-pink/10">
                    <a href={scannedStudent.profile.portfolio_url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      Portfolio
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Connection Request Form */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-lg flex items-center justify-center">
                <Send className="h-4 w-4 text-white" />
              </div>
              <h4 className="text-lg font-semibold">Send Connection Request</h4>
            </div>
            
            <Textarea
              placeholder={`Hi ${scannedStudent.name.split(' ')[0]}! I was impressed by our conversation about [topic]. I'd love to connect and discuss potential opportunities at ${companyProfile.name}...`}
              value={connectionNotes}
              onChange={(e) => setConnectionNotes(e.target.value)}
              className="min-h-[100px] bg-secondary/50 border-neon-pink/30 focus:border-neon-pink focus:ring-neon-pink/20"
            />
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={sendConnectionRequest}
                disabled={isConnecting}
                className="gradient-pink hover:shadow-lg hover:shadow-neon-pink/25 transition-all duration-300"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={closeStudentProfile}
                className="border-muted-foreground text-muted-foreground hover:bg-secondary/50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Scanner Card */}
      <Card className="glass border-neon-purple/20 neon-glow relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 rounded-full -translate-y-16 -translate-x-16"></div>
        <CardHeader className="text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl flex items-center justify-center neon-glow">
              <Scan className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
              FastTrack Scanner
            </CardTitle>
            <div className="w-10 h-10 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-xl flex items-center justify-center neon-glow-pink">
              <Building2 className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardDescription className="text-base">
            Scan student QR codes to instantly connect with top talent ⚡
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scanner Interface */}
          {isScanning ? (
            <div className="space-y-4">
              <div className="relative mx-auto w-72 h-72 rounded-xl overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-neon-cyan rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-neon-cyan rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-neon-cyan rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-neon-cyan rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-neon-cyan rounded-br-lg"></div>
                    
                    {/* Scanning line animation */}
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse"></div>
                  </div>
                </div>
                
                {/* Scanning status */}
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/70 rounded-full">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">Scanning for QR codes...</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={stopScanning}
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive/10"
              >
                <X className="h-4 w-4 mr-2" />
                Stop Scanning
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Start Scanning Button */}
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 rounded-full flex items-center justify-center border-2 border-neon-purple/30">
                  <QrCode className="h-16 w-16 text-neon-purple" />
                </div>
                
                <Button 
                  onClick={startScanning}
                  className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 text-lg px-8 py-3 h-auto"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Start Scanning
                </Button>
                
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Point your camera at a student's FastTrack QR code to instantly access their profile and connect
                </p>
              </div>

              {/* Manual Entry Option */}
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowManualEntry(!showManualEntry)}
                  className="text-neon-cyan hover:bg-neon-cyan/10"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Enter FastTrack URL manually
                </Button>
              </div>

              {showManualEntry && (
                <div className="space-y-3 p-4 glass rounded-lg border border-neon-cyan/20">
                  <input
                    type="text"
                    placeholder="Paste FastTrack URL here..."
                    value={manualUrl}
                    onChange={(e) => setManualUrl(e.target.value)}
                    className="w-full px-4 py-2 bg-secondary/50 border border-neon-cyan/30 rounded-lg focus:border-neon-cyan focus:ring-neon-cyan/20 text-sm"
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleManualEntry}
                      size="sm"
                      className="gradient-cyan flex-1"
                    >
                      Connect
                    </Button>
                    <Button 
                      onClick={() => setShowManualEntry(false)}
                      variant="ghost"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* How to Use */}
      <Card className="glass border-neon-cyan/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-neon-cyan" />
            <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              How to Use FastTrack Scanner
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full flex items-center justify-center mx-auto">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-sm">Find QR Code</h4>
              <p className="text-xs text-muted-foreground">
                Look for the student's FastTrack QR code on their name tag, business card, or portfolio
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-cyan to-neon-green rounded-full flex items-center justify-center mx-auto">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-sm">Scan Code</h4>
              <p className="text-xs text-muted-foreground">
                Open the scanner and point your camera at the QR code until it's detected
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full flex items-center justify-center mx-auto">
                <Send className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-sm">Connect</h4>
              <p className="text-xs text-muted-foreground">
                Review their profile and send a personalized connection request
              </p>
            </div>
          </div>

          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-neon-cyan" />
              <span className="text-sm font-medium text-neon-cyan">FastTrack Advantage</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Skip the business card shuffle! Instantly access student profiles, portfolios, and contact info in one scan.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}