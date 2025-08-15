import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { 
  X, 
  Upload, 
  Camera, 
  Save, 
  Building2, 
  Globe, 
  MapPin,
  Users,
  Calendar,
  Trash2,
  Plus,
  Eye,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { Company } from '../App';
import { toast } from 'sonner@2.0.3';

interface CompanyProfileModalProps {
  company?: Company;
  onClose: () => void;
  onSave: (companyData: Partial<Company>) => Promise<void>;
  loading?: boolean;
}

export function CompanyProfileModal({ company, onClose, onSave, loading }: CompanyProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(company?.logo || null);
  const [formData, setFormData] = useState<Partial<Company>>({
    name: company?.name || '',
    logo: company?.logo || '',
    industry: company?.industry || '',
    description: company?.description || '',
    website: company?.website || '',
    headquarters: company?.headquarters || '',
    founded_year: company?.founded_year || new Date().getFullYear(),
    company_size: company?.company_size || '',
    office_locations: company?.office_locations || [],
    benefits: company?.benefits || [],
    requirements: company?.requirements || [],
    positions: company?.positions || [],
    contact_email: company?.contact_email || '',
    linkedin_url: company?.linkedin_url || '',
    mission_statement: company?.mission_statement || '',
    company_values: company?.company_values || [],
    company_culture: company?.company_culture || []
  });

  const [newBenefit, setNewBenefit] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newCultureItem, setNewCultureItem] = useState('');
  const [newOfficeLocation, setNewOfficeLocation] = useState('');

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file! 🖼️');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB! 📏');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogoPreview(result);
      setFormData(prev => ({ ...prev, logo: result }));
      toast.success('Logo uploaded successfully! ✨');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    setFormData(prev => ({ ...prev, logo: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Logo removed! 🗑️');
  };

  const handleSave = async () => {
    if (!formData.name || !formData.industry || !formData.description) {
      toast.error('Please fill in all required fields! 📝');
      return;
    }

    try {
      await onSave(formData);
      toast.success('Company profile saved successfully! 🎉');
      onClose();
    } catch (error) {
      console.error('Failed to save company profile:', error);
      toast.error('Failed to save profile. Please try again! 😅');
    }
  };

  const addToArray = (field: keyof Company, value: string, setValue: (value: string) => void) => {
    if (!value.trim()) return;
    
    const currentArray = formData[field] as string[] || [];
    if (currentArray.includes(value.trim())) {
      toast.error('This item already exists! 🔄');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: [...currentArray, value.trim()]
    }));
    setValue('');
    toast.success('Item added! ✨');
  };

  const removeFromArray = (field: keyof Company, index: number) => {
    const currentArray = formData[field] as string[] || [];
    setFormData(prev => ({
      ...prev,
      [field]: currentArray.filter((_, i) => i !== index)
    }));
    toast.success('Item removed! 🗑️');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-xl border border-neon-purple/20 glass overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-neon-purple/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl flex items-center justify-center neon-glow">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                  {company ? 'Edit Company Profile' : 'Create Company Profile'}
                </h2>
                <p className="text-muted-foreground">Make a great first impression on talented students! 🌟</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Logo Upload Section */}
          <Card className="glass border-neon-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-neon-purple" />
                Company Logo
              </CardTitle>
              <CardDescription>
                Upload your company logo to make your profile stand out. Recommended: 400x400px, PNG or JPG.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                {/* Logo Preview */}
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24 border-4 border-neon-purple/20">
                    <AvatarImage src={logoPreview || undefined} alt="Company logo" />
                    <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white text-2xl font-bold">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : 'C'}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Upload Controls */}
                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                    {logoPreview && (
                      <Button
                        variant="outline"
                        onClick={handleRemoveLogo}
                        className="border-neon-pink text-neon-pink hover:bg-neon-pink/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="h-4 w-4" />
                    <span>Supports JPG, PNG, GIF up to 5MB</span>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="glass border-neon-cyan/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-neon-cyan" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Tell students about your company's core identity and mission.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2">
                    Company Name *
                    <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs">Required</Badge>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Awesome Tech Company"
                    className="h-12 mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="industry" className="flex items-center gap-2">
                    Industry *
                    <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs">Required</Badge>
                  </Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    placeholder="Technology, Finance, Healthcare..."
                    className="h-12 mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="flex items-center gap-2">
                  Company Description *
                  <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs">Required</Badge>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Tell students what makes your company amazing! Include your mission, values, and what makes working here special... 🌟"
                  className="min-h-[120px] mt-2"
                />
              </div>

              <div>
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  value={formData.mission_statement}
                  onChange={(e) => setFormData(prev => ({ ...prev, mission_statement: e.target.value }))}
                  placeholder="Our mission is to..."
                  className="min-h-[80px] mt-2"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="headquarters">Headquarters</Label>
                  <Input
                    id="headquarters"
                    value={formData.headquarters}
                    onChange={(e) => setFormData(prev => ({ ...prev, headquarters: e.target.value }))}
                    placeholder="Cape Town, South Africa"
                    className="h-12 mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="founded_year">Founded Year</Label>
                  <Input
                    id="founded_year"
                    type="number"
                    value={formData.founded_year}
                    onChange={(e) => setFormData(prev => ({ ...prev, founded_year: parseInt(e.target.value) }))}
                    placeholder="2020"
                    className="h-12 mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="company_size">Company Size</Label>
                  <Input
                    id="company_size"
                    value={formData.company_size}
                    onChange={(e) => setFormData(prev => ({ ...prev, company_size: e.target.value }))}
                    placeholder="50-200 employees"
                    className="h-12 mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://awesome-company.com"
                    className="h-12 mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                    placeholder="careers@company.com"
                    className="h-12 mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                  placeholder="https://linkedin.com/company/awesome-company"
                  className="h-12 mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Office Locations */}
          <Card className="glass border-neon-green/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-neon-green" />
                Office Locations
              </CardTitle>
              <CardDescription>
                Where do you have offices? This helps students understand your geographic presence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.office_locations?.map((location, index) => (
                    <div key={index} className="flex items-center gap-2 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-full px-3 py-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-sm">{location}</span>
                      <button 
                        onClick={() => removeFromArray('office_locations', index)}
                        className="ml-1 hover:text-neon-pink"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newOfficeLocation}
                    onChange={(e) => setNewOfficeLocation(e.target.value)}
                    placeholder="Add office location..."
                    className="h-10"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('office_locations', newOfficeLocation, setNewOfficeLocation)}
                  />
                  <Button
                    onClick={() => addToArray('office_locations', newOfficeLocation, setNewOfficeLocation)}
                    size="sm"
                    className="gradient-green"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Positions */}
          <Card className="glass border-neon-yellow/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-neon-yellow" />
                Available Positions
              </CardTitle>
              <CardDescription>
                What roles are you hiring for? This helps students understand opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {formData.positions?.map((position, index) => (
                    <div key={index} className="flex items-center gap-2 bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30 rounded-full px-3 py-1">
                      <span className="text-sm">{position}</span>
                      <button 
                        onClick={() => removeFromArray('positions', index)}
                        className="ml-1 hover:text-neon-pink"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newPosition}
                    onChange={(e) => setNewPosition(e.target.value)}
                    placeholder="Add position (e.g., Software Engineer, Data Analyst)..."
                    className="h-10"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('positions', newPosition, setNewPosition)}
                  />
                  <Button
                    onClick={() => addToArray('positions', newPosition, setNewPosition)}
                    size="sm"
                    className="gradient-yellow"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Culture & Values */}
          <div className="grid grid-cols-2 gap-6">
            {/* Company Values */}
            <Card className="glass border-neon-pink/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-neon-pink" />
                  Company Values
                </CardTitle>
                <CardDescription>
                  What principles guide your company?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.company_values?.map((value, index) => (
                      <div key={index} className="flex items-center gap-2 bg-neon-pink/20 text-neon-pink border border-neon-pink/30 rounded-full px-3 py-1">
                        <span className="text-sm">{value}</span>
                        <button 
                          onClick={() => removeFromArray('company_values', index)}
                          className="ml-1 hover:text-neon-yellow"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="Add value..."
                      className="h-10"
                      onKeyPress={(e) => e.key === 'Enter' && addToArray('company_values', newValue, setNewValue)}
                    />
                    <Button
                      onClick={() => addToArray('company_values', newValue, setNewValue)}
                      size="sm"
                      className="gradient-pink"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Culture */}
            <Card className="glass border-neon-cyan/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-neon-cyan" />
                  Company Culture
                </CardTitle>
                <CardDescription>
                  Describe your workplace culture.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.company_culture?.map((culture, index) => (
                      <div key={index} className="flex items-center gap-2 bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded-full px-3 py-1">
                        <span className="text-sm">{culture}</span>
                        <button 
                          onClick={() => removeFromArray('company_culture', index)}
                          className="ml-1 hover:text-neon-pink"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newCultureItem}
                      onChange={(e) => setNewCultureItem(e.target.value)}
                      placeholder="Add culture trait..."
                      className="h-10"
                      onKeyPress={(e) => e.key === 'Enter' && addToArray('company_culture', newCultureItem, setNewCultureItem)}
                    />
                    <Button
                      onClick={() => addToArray('company_culture', newCultureItem, setNewCultureItem)}
                      size="sm"
                      className="gradient-cyan"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements & Benefits */}
          <div className="grid grid-cols-2 gap-6">
            {/* Requirements */}
            <Card className="glass border-neon-purple/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-neon-purple" />
                  Requirements
                </CardTitle>
                <CardDescription>
                  What do you look for in candidates?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements?.map((requirement, index) => (
                      <div key={index} className="flex items-center gap-2 bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full px-3 py-1">
                        <span className="text-sm">{requirement}</span>
                        <button 
                          onClick={() => removeFromArray('requirements', index)}
                          className="ml-1 hover:text-neon-pink"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      placeholder="Add requirement..."
                      className="h-10"
                      onKeyPress={(e) => e.key === 'Enter' && addToArray('requirements', newRequirement, setNewRequirement)}
                    />
                    <Button
                      onClick={() => addToArray('requirements', newRequirement, setNewRequirement)}
                      size="sm"
                      className="gradient-purple"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="glass border-neon-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-neon-green" />
                  Employee Benefits
                </CardTitle>
                <CardDescription>
                  What perks do you offer employees?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-full px-3 py-1">
                        <span className="text-sm">{benefit}</span>
                        <button 
                          onClick={() => removeFromArray('benefits', index)}
                          className="ml-1 hover:text-neon-pink"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="Add benefit..."
                      className="h-10"
                      onKeyPress={(e) => e.key === 'Enter' && addToArray('benefits', newBenefit, setNewBenefit)}
                    />
                    <Button
                      onClick={() => addToArray('benefits', newBenefit, setNewBenefit)}
                      size="sm"
                      className="gradient-green"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-xl border-t border-neon-purple/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Changes will be visible to all students immediately after saving</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading || !formData.name || !formData.industry || !formData.description}
                className="gradient-purple hover:shadow-lg hover:shadow-neon-purple/25 transition-all duration-300"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile ✨
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}