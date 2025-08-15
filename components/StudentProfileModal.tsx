import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Star, 
  Target, 
  Globe, 
  Github, 
  Linkedin, 
  Phone,
  Plus,
  X,
  Sparkles,
  Briefcase,
  Languages,
  TrendingUp,
  Camera,
  Upload,
  ImageIcon
} from 'lucide-react';
import { StudentProfile } from '../App';
import { studentProfileAPI } from '../utils/api';
import { toast } from 'sonner@2.0.3';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentProfile: StudentProfile | null;
  onProfileUpdate: () => void;
}

// South African universities
const SA_UNIVERSITIES = [
  'University of Cape Town (UCT)',
  'University of the Witwatersrand (Wits)',
  'University of Pretoria (UP)', 
  'University of Johannesburg (UJ)',
  'Stellenbosch University',
  'University of KwaZulu-Natal (UKZN)',
  'Rhodes University',
  'University of the Free State (UFS)',
  'North-West University (NWU)',
  'University of the Western Cape (UWC)',
  'Cape Peninsula University of Technology (CPUT)',
  'Durban University of Technology (DUT)',
  'Tshwane University of Technology (TUT)',
  'University of South Africa (UNISA)',
  'Vaal University of Technology (VUT)',
  'Walter Sisulu University (WSU)',
  'University of Limpopo (UL)',
  'University of Zululand (UNIZULU)',
  'University of Fort Hare (UFH)',
  'Sol Plaatje University (SPU)'
];

// Common SA degree types
const SA_DEGREES = [
  'BCom (Bachelor of Commerce)',
  'BSc (Bachelor of Science)',
  'BEng (Bachelor of Engineering)',
  'BA (Bachelor of Arts)',
  'LLB (Bachelor of Laws)',
  'BBusSci (Bachelor of Business Science)',
  'BIS (Bachelor of Information Systems)',
  'BSc (Computer Science)',
  'BSc (Information Technology)',
  'BAccounting',
  'BSocSci (Bachelor of Social Science)',
  'BEd (Bachelor of Education)',
  'BMus (Bachelor of Music)',
  'BFA (Bachelor of Fine Arts)',
  'BPharm (Bachelor of Pharmacy)',
  'MBChB (Bachelor of Medicine)',
  'BSc Honours',
  'BCom Honours',
  'BEng Honours',
  'Masters Degree',
  'PhD (Doctorate)',
  'Other'
];

// Study years
const STUDY_YEARS = [
  '1st Year',
  '2nd Year', 
  '3rd Year',
  '4th Year',
  'Honours',
  'Masters',
  'PhD',
  'Postgraduate Diploma',
  'Graduate'
];

// SA provinces
const SA_PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape'
];

// Major SA cities
const SA_CITIES = [
  'Johannesburg',
  'Cape Town',
  'Durban',
  'Pretoria',
  'Port Elizabeth',
  'Bloemfontein',
  'East London',
  'Pietermaritzburg',
  'Kimberley',
  'Polokwane',
  'Nelspruit',
  'Rustenburg',
  'George',
  'Stellenbosch',
  'Potchefstroom',
  'Grahamstown',
  'Other'
];

// SA languages
const SA_LANGUAGES = [
  'English',
  'Afrikaans', 
  'isiZulu',
  'isiXhosa',
  'Sepedi',
  'Setswana',
  'Sesotho',
  'Xitsonga',
  'siSwati',
  'Tshivenda',
  'isiNdebele'
];

// Common skills for students
const COMMON_SKILLS = [
  'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'HTML/CSS',
  'SQL', 'MongoDB', 'Git', 'Microsoft Office', 'Excel', 'PowerPoint',
  'Project Management', 'Data Analysis', 'Machine Learning', 'AI',
  'Digital Marketing', 'Social Media', 'Content Writing', 'Graphic Design',
  'Communication', 'Leadership', 'Problem Solving', 'Teamwork',
  'Research', 'Presentation Skills', 'Critical Thinking', 'Time Management'
];

// Industry interests
const INDUSTRIES = [
  'Technology', 'Finance', 'Consulting', 'Healthcare', 'Education',
  'Media & Entertainment', 'Retail', 'Manufacturing', 'Agriculture',
  'Mining', 'Government', 'Non-Profit', 'Startups', 'Engineering',
  'Marketing', 'Real Estate', 'Tourism', 'Sports', 'Automotive'
];

export function StudentProfileModal({ isOpen, onClose, studentProfile, onProfileUpdate }: StudentProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<Partial<StudentProfile>>({
    profile_image: '',
    bio: '',
    university: '',
    degree: '',
    year_of_study: '',
    gpa: '',
    skills: [],
    interests: [],
    career_goals: '',
    preferred_industries: [],
    location_province: '',
    location_city: '',
    languages: [],
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
    phone: '',
    availability: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (studentProfile) {
      setProfileData(studentProfile);
    }
  }, [studentProfile]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (studentProfile) {
        await studentProfileAPI.update(profileData);
        toast.success('Profile updated! Looking fresh! 🔥');
      } else {
        await studentProfileAPI.create(profileData);
        toast.success('Profile created! Welcome to the community! 🎉');
      }
      
      onProfileUpdate();
      onClose();
    } catch (error) {
      console.error('Failed to save student profile:', error);
      toast.error('Oops! Something went wrong 😅');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file! 📸');
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image too large! Please upload a file under 5MB 📏');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setProfileData({
        ...profileData,
        profile_image: base64String
      });
      toast.success('Photo uploaded! Looking good! ✨');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills?.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...(profileData.skills || []), newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: (profileData.skills || []).filter(skill => skill !== skillToRemove)
    });
  };

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests?.includes(newInterest.trim())) {
      setProfileData({
        ...profileData,
        interests: [...(profileData.interests || []), newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setProfileData({
      ...profileData,
      interests: (profileData.interests || []).filter(interest => interest !== interestToRemove)
    });
  };

  const toggleLanguage = (language: string) => {
    const currentLanguages = profileData.languages || [];
    if (currentLanguages.includes(language)) {
      setProfileData({
        ...profileData,
        languages: currentLanguages.filter(lang => lang !== language)
      });
    } else {
      setProfileData({
        ...profileData,
        languages: [...currentLanguages, language]
      });
    }
  };

  const toggleIndustry = (industry: string) => {
    const currentIndustries = profileData.preferred_industries || [];
    if (currentIndustries.includes(industry)) {
      setProfileData({
        ...profileData,
        preferred_industries: currentIndustries.filter(ind => ind !== industry)
      });
    } else {
      setProfileData({
        ...profileData,
        preferred_industries: [...currentIndustries, industry]
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] p-0 glass border-2 border-neon-purple/30 neon-glow">
        <ScrollArea className="max-h-[95vh]">
          {/* Header */}
          <div className="gradient-purple p-6 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-neon-yellow animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                <User className="h-6 w-6" />
                {studentProfile ? 'Edit Your Profile ✨' : 'Create Your Profile 🚀'}
              </DialogTitle>
              <p className="text-white/90 text-lg">
                {studentProfile ? 'Keep your vibe fresh and up-to-date! 💫' : 'Tell companies what makes you awesome! 🌟'}
              </p>
            </DialogHeader>
          </div>

          <div className="p-6 space-y-8">
            {/* Profile Photo */}
            <Card className="glass border-neon-yellow/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Camera className="h-5 w-5 text-neon-yellow" />
                  Profile Photo 📸
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center gap-6">
                  {/* Current Photo */}
                  <Avatar className="h-32 w-32 border-4 border-neon-yellow/50 neon-glow">
                    <AvatarImage src={profileData.profile_image} />
                    <AvatarFallback className="bg-gradient-to-br from-neon-yellow to-neon-pink text-white text-3xl font-bold">
                      {profileData.profile_image ? <ImageIcon className="h-16 w-16" /> : <Camera className="h-16 w-16" />}
                    </AvatarFallback>
                  </Avatar>

                  {/* Upload Area */}
                  <div 
                    className={`relative w-full max-w-md border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer group ${
                      isDragOver 
                        ? 'border-neon-yellow bg-neon-yellow/10 neon-glow' 
                        : 'border-neon-yellow/50 hover:border-neon-yellow hover:bg-neon-yellow/5'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center space-y-3">
                      <div className="flex justify-center">
                        <Upload className={`h-12 w-12 transition-colors ${isDragOver ? 'text-neon-yellow' : 'text-neon-yellow/70 group-hover:text-neon-yellow'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-base text-neon-yellow">
                          {isDragOver ? 'Drop your photo here! 📥' : 'Upload your photo 📷'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Drag & drop or click to select • Max 5MB
                        </p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  {/* Upload Button */}
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10 font-semibold"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {profileData.profile_image ? 'Change Photo 🔄' : 'Choose Photo 📸'}
                  </Button>

                  {profileData.profile_image && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setProfileData({...profileData, profile_image: ''})}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      Remove Photo 🗑️
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="glass border-neon-purple/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-neon-purple" />
                  Personal Info 👤
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bio" className="text-base font-semibold">Bio/About Me 📝</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself! What makes you unique? 🌟"
                    value={profileData.bio || ''}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={3}
                    className="mt-2 bg-secondary/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/20 rounded-xl resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold">Phone Number 📱</Label>
                    <Input
                      id="phone"
                      placeholder="+27 82 123 4567"
                      value={profileData.phone || ''}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="mt-2 bg-secondary/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/20 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability" className="text-base font-semibold">Availability 📅</Label>
                    <Select value={profileData.availability || ''} onValueChange={(value) => setProfileData({...profileData, availability: value})}>
                      <SelectTrigger className="mt-2 bg-secondary/50 border-neon-purple/30 focus:border-neon-purple rounded-xl">
                        <SelectValue placeholder="When can you start?" />
                      </SelectTrigger>
                      <SelectContent className="glass border-neon-purple/30">
                        <SelectItem value="immediately">Immediately 🚀</SelectItem>
                        <SelectItem value="after_graduation">After Graduation 🎓</SelectItem>
                        <SelectItem value="internship">Internship/Vacation Work 💼</SelectItem>
                        <SelectItem value="part_time">Part-time while studying 📚</SelectItem>
                        <SelectItem value="flexible">Flexible 🤹</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="glass border-neon-cyan/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="h-5 w-5 text-neon-cyan" />
                  Academic Details 🎓
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="university" className="text-base font-semibold">University/Institution 🏫</Label>
                  <Select value={profileData.university || ''} onValueChange={(value) => setProfileData({...profileData, university: value})}>
                    <SelectTrigger className="mt-2 bg-secondary/50 border-neon-cyan/30 focus:border-neon-cyan rounded-xl">
                      <SelectValue placeholder="Select your university" />
                    </SelectTrigger>
                    <SelectContent className="glass border-neon-cyan/30 max-h-60">
                      {SA_UNIVERSITIES.map((uni) => (
                        <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degree" className="text-base font-semibold">Degree/Qualification 📜</Label>
                    <Select value={profileData.degree || ''} onValueChange={(value) => setProfileData({...profileData, degree: value})}>
                      <SelectTrigger className="mt-2 bg-secondary/50 border-neon-cyan/30 focus:border-neon-cyan rounded-xl">
                        <SelectValue placeholder="Select your degree" />
                      </SelectTrigger>
                      <SelectContent className="glass border-neon-cyan/30 max-h-60">
                        {SA_DEGREES.map((degree) => (
                          <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="year" className="text-base font-semibold">Year of Study 📚</Label>
                    <Select value={profileData.year_of_study || ''} onValueChange={(value) => setProfileData({...profileData, year_of_study: value})}>
                      <SelectTrigger className="mt-2 bg-secondary/50 border-neon-cyan/30 focus:border-neon-cyan rounded-xl">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent className="glass border-neon-cyan/30">
                        {STUDY_YEARS.map((year) => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="gpa" className="text-base font-semibold">GPA/Average (Optional) 📊</Label>
                  <Input
                    id="gpa"
                    placeholder="e.g., 3.8 or 75%"
                    value={profileData.gpa || ''}
                    onChange={(e) => setProfileData({...profileData, gpa: e.target.value})}
                    className="mt-2 bg-secondary/50 border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="glass border-neon-pink/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-neon-pink" />
                  Location 📍
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="province" className="text-base font-semibold">Province 🌍</Label>
                    <Select value={profileData.location_province || ''} onValueChange={(value) => setProfileData({...profileData, location_province: value})}>
                      <SelectTrigger className="mt-2 bg-secondary/50 border-neon-pink/30 focus:border-neon-pink rounded-xl">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent className="glass border-neon-pink/30">
                        {SA_PROVINCES.map((province) => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-base font-semibold">City 🏙️</Label>
                    <Select value={profileData.location_city || ''} onValueChange={(value) => setProfileData({...profileData, location_city: value})}>
                      <SelectTrigger className="mt-2 bg-secondary/50 border-neon-pink/30 focus:border-neon-pink rounded-xl">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent className="glass border-neon-pink/30 max-h-60">
                        {SA_CITIES.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="glass border-neon-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Languages className="h-5 w-5 text-neon-green" />
                  Languages 🗣️
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {SA_LANGUAGES.map((language) => (
                    <Badge
                      key={language}
                      variant={profileData.languages?.includes(language) ? "default" : "outline"}
                      className={`cursor-pointer transition-all p-2 ${
                        profileData.languages?.includes(language)
                          ? 'bg-neon-green/20 text-neon-green border-neon-green/50 neon-glow'
                          : 'border-neon-green/30 text-neon-green hover:bg-neon-green/10'
                      }`}
                      onClick={() => toggleLanguage(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="glass border-neon-purple/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-neon-purple" />
                  Skills & Abilities 💪
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(profileData.skills || []).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 gap-2 p-2">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:text-destructive"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Input
                    placeholder="Add a skill... 🚀"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                    className="bg-secondary/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/20 rounded-xl"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addSkill}
                    className="border-neon-purple text-neon-purple hover:bg-neon-purple/10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-3">Quick add popular skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_SKILLS.filter(skill => !profileData.skills?.includes(skill)).slice(0, 8).map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="cursor-pointer border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 transition-colors p-2"
                        onClick={() => {
                          setProfileData({
                            ...profileData,
                            skills: [...(profileData.skills || []), skill]
                          });
                        }}
                      >
                        + {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interests & Career Goals */}
            <Card className="glass border-neon-cyan/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-neon-cyan" />
                  Interests & Career Goals 🎯
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="career_goals" className="text-base font-semibold">Career Goals 🚀</Label>
                  <Textarea
                    id="career_goals"
                    placeholder="What are your career aspirations? Where do you see yourself in 5 years? 🌟"
                    value={profileData.career_goals || ''}
                    onChange={(e) => setProfileData({...profileData, career_goals: e.target.value})}
                    rows={3}
                    className="mt-2 bg-secondary/50 border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20 rounded-xl resize-none"
                  />
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Preferred Industries 🏭</Label>
                  <div className="flex flex-wrap gap-3">
                    {INDUSTRIES.map((industry) => (
                      <Badge
                        key={industry}
                        variant={profileData.preferred_industries?.includes(industry) ? "default" : "outline"}
                        className={`cursor-pointer transition-all p-2 ${
                          profileData.preferred_industries?.includes(industry)
                            ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50 neon-glow-cyan'
                            : 'border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10'
                        }`}
                        onClick={() => toggleIndustry(industry)}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Personal Interests 🎨</Label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(profileData.interests || []).map((interest, index) => (
                      <Badge key={index} variant="secondary" className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 gap-2 p-2">
                        {interest}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:text-destructive"
                          onClick={() => removeInterest(interest)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Add an interest... 🎭"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                      className="bg-secondary/50 border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20 rounded-xl"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addInterest}
                      className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="glass border-neon-yellow/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-neon-yellow" />
                  Social Links & Portfolio 🔗
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="linkedin" className="text-base font-semibold flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn 💼
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={profileData.linkedin_url || ''}
                    onChange={(e) => setProfileData({...profileData, linkedin_url: e.target.value})}
                    className="mt-2 bg-secondary/50 border-neon-yellow/30 focus:border-neon-yellow focus:ring-neon-yellow/20 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="github" className="text-base font-semibold flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub 💻
                  </Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/yourusername"
                    value={profileData.github_url || ''}
                    onChange={(e) => setProfileData({...profileData, github_url: e.target.value})}
                    className="mt-2 bg-secondary/50 border-neon-yellow/30 focus:border-neon-yellow focus:ring-neon-yellow/20 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio" className="text-base font-semibold flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Portfolio/Website 🌐
                  </Label>
                  <Input
                    id="portfolio"
                    placeholder="https://yourportfolio.com"
                    value={profileData.portfolio_url || ''}
                    onChange={(e) => setProfileData({...profileData, portfolio_url: e.target.value})}
                    className="mt-2 bg-secondary/50 border-neon-yellow/30 focus:border-neon-yellow focus:ring-neon-yellow/20 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1 h-12 border-muted-foreground/30 text-muted-foreground hover:bg-muted/10 font-semibold text-base"
                disabled={loading}
              >
                Cancel 😔
              </Button>
              <Button 
                onClick={handleSave}
                className="flex-1 h-12 gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300 font-semibold text-base neon-glow"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving... ⏳
                  </>
                ) : (
                  studentProfile ? 'Update Profile 🔥' : 'Create Profile 🚀'
                )}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}