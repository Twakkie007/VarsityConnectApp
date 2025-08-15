import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  QrCode, 
  Download, 
  Share2, 
  Sparkles, 
  Zap,
  Users,
  RefreshCw,
  Copy,
  Shield,
  Info
} from 'lucide-react';
import { StudentProfile } from '../App';
import { toast } from 'sonner@2.0.3';

interface QRCodeDisplayProps {
  studentProfile: StudentProfile;
  userName: string;
  careerFairId: string;
  onRegenerateQR?: () => void;
}

export function QRCodeDisplay({ studentProfile, userName, careerFairId, onRegenerateQR }: QRCodeDisplayProps) {
  const [qrDataURL, setQrDataURL] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [connectionsCount, setConnectionsCount] = useState(0);

  // Generate QR code data URL
  useEffect(() => {
    generateQRCode();
  }, [studentProfile.qr_token]);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      // In a real implementation, you'd use a QR code library like 'qrcode'
      // For now, we'll use QR Server API as a demonstration
      const qrToken = studentProfile.qr_token || generateSecureToken();
      const qrData = `${window.location.origin}/connect/${qrToken}`;
      
      // Using QR Server API for demonstration (in production, use a proper QR library)
      const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&bgcolor=0a0a0a&color=8b5cf6&margin=10&format=svg`;
      
      setQrDataURL(qrCodeURL);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      toast.error('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const generateSecureToken = () => {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const downloadQRCode = async () => {
    try {
      const response = await fetch(qrDataURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${userName.replace(/\s+/g, '_')}_FastTrack_QR.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('QR code downloaded! 📱');
    } catch (error) {
      console.error('Failed to download QR code:', error);
      toast.error('Failed to download QR code');
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userName} - FastTrack Connect`,
          text: 'Scan my QR code to connect with me after the career fair!',
          url: `${window.location.origin}/connect/${studentProfile.qr_token}`
        });
        toast.success('Shared successfully! 🚀');
      } catch (error) {
        console.error('Failed to share:', error);
        toast.error('Failed to share QR code');
      }
    } else {
      // Fallback: copy link to clipboard
      const qrData = `${window.location.origin}/connect/${studentProfile.qr_token}`;
      await navigator.clipboard.writeText(qrData);
      toast.success('QR link copied to clipboard! 📋');
    }
  };

  const copyQRLink = async () => {
    const qrData = `${window.location.origin}/connect/${studentProfile.qr_token}`;
    await navigator.clipboard.writeText(qrData);
    toast.success('FastTrack link copied! 🔗');
  };

  return (
    <div className="space-y-6">
      {/* Main QR Code Card */}
      <Card className="glass border-neon-purple/20 neon-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-full -translate-y-16 translate-x-16"></div>
        <CardHeader className="text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl flex items-center justify-center neon-glow">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              FastTrack Connect
            </CardTitle>
            <div className="w-10 h-10 bg-gradient-to-r from-neon-cyan to-neon-green rounded-xl flex items-center justify-center neon-glow-cyan">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardDescription className="text-base">
            Your personal QR code for instant company connections ⚡
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* QR Code Display */}
          <div className="flex justify-center">
            <div className="relative">
              {loading ? (
                <div className="w-48 h-48 bg-secondary/50 rounded-xl flex items-center justify-center">
                  <RefreshCw className="h-8 w-8 text-neon-purple animate-spin" />
                </div>
              ) : (
                <div className="p-4 bg-white rounded-xl shadow-lg">
                  <img 
                    src={qrDataURL} 
                    alt="FastTrack QR Code" 
                    className="w-40 h-40"
                  />
                </div>
              )}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold">{userName}</h3>
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
                {studentProfile.year_of_study} Student
              </Badge>
              <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
                {studentProfile.university}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Companies can scan this code to instantly connect with you and fast-track post-fair engagement! 🚀
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 glass rounded-lg">
              <div className="text-2xl font-bold text-neon-green">{connectionsCount}</div>
              <div className="text-xs text-muted-foreground">Connections</div>
            </div>
            <div className="p-3 glass rounded-lg">
              <div className="text-2xl font-bold text-neon-pink">Active</div>
              <div className="text-xs text-muted-foreground">Status</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={downloadQRCode}
              className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300"
              disabled={loading}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button 
              onClick={shareQRCode}
              variant="outline"
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
              disabled={loading}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <Button 
            onClick={copyQRLink}
            variant="ghost"
            className="w-full text-neon-yellow hover:bg-neon-yellow/10"
            disabled={loading}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy FastTrack Link
          </Button>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="glass border-neon-cyan/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5 text-neon-cyan" />
            <span className="bg-gradient-to-r from-neon-cyan to-neon-green bg-clip-text text-transparent">
              How FastTrack Connect Works
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-sm">Company Scans</h4>
              <p className="text-xs text-muted-foreground">
                Company representatives scan your QR code using their phone camera or app
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-cyan to-neon-green rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-sm">Instant Preview</h4>
              <p className="text-xs text-muted-foreground">
                They see your profile preview and can request to connect with you
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-pink to-neon-yellow rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-sm">You Get Notified</h4>
              <p className="text-xs text-muted-foreground">
                You receive a connection request and can choose to accept or decline
              </p>
            </div>
          </div>
          
          <div className="p-3 bg-neon-green/10 rounded-lg border border-neon-green/20">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-neon-green" />
              <span className="text-sm font-medium text-neon-green">Privacy Protected</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your personal information is only shared after you approve the connection. Companies see a preview first.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="glass border-neon-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-neon-yellow" />
            <span className="bg-gradient-to-r from-neon-yellow to-neon-pink bg-clip-text text-transparent">
              Pro Tips for Maximum Impact
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-neon-yellow rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-neon-yellow font-medium">Display prominently:</span> Add your QR code to your name tag, business cards, or portfolio
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-neon-pink rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-neon-pink font-medium">Perfect timing:</span> Share your QR code at the end of great conversations
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-neon-cyan font-medium">Follow up fast:</span> Respond to connection requests within 24 hours for best results
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}