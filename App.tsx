import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { StudentDashboard } from './components/StudentDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';
import { CareerFairHub } from './components/CareerFairHub';
import { Toaster } from './components/ui/sonner';
import { authAPI, profileAPI, companyAPI, studentProfileAPI } from './utils/api';
import { supabase } from './utils/supabase/client';

export type UserRole = 'student' | 'company' | null;
export type CompanyTier = 'A' | 'B' | 'C' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  profile_image?: string; // Base64 encoded image data
  bio?: string;
  university: string;
  degree: string;
  year_of_study: string;
  gpa?: string;
  skills: string[];
  interests: string[];
  career_goals?: string;
  preferred_industries: string[];
  location_province: string;
  location_city: string;
  languages: string[];
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  phone?: string;
  availability?: string;
  qr_token?: string; // Unique QR code token for FastTrack connections
  created_at?: string;
  updated_at?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  positions: string[];
  requirements: string[];
  benefits: string[];
  website: string;
  
  // Enhanced company profile information
  founded_year?: number;
  company_size?: string; // 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
  headquarters?: string;
  office_locations?: string[];
  company_culture?: string[];
  company_values?: string[];
  mission_statement?: string;
  recent_achievements?: string[];
  tech_stack?: string[];
  work_environment?: 'remote' | 'hybrid' | 'onsite' | 'flexible';
  diversity_initiatives?: string[];
  career_development?: string[];
  internship_programs?: boolean;
  graduate_programs?: boolean;
  salary_range?: {
    min: number;
    max: number;
    currency: string;
  };
  application_process?: string[];
  contact_email?: string;
  linkedin_url?: string;
  twitter_url?: string;
  glassdoor_rating?: number;
  recent_news?: Array<{
    title: string;
    date: string;
    summary: string;
    url?: string;
  }>;
  
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CompanyPreference {
  id: string;
  student_user_id: string;
  company_id: string;
  tier: CompanyTier;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface Connection {
  id: string;
  student_id: string;
  company_id: string;
  student_user_id: string;
  company_user_id: string;
  career_fair_id: string;
  status: 'pending' | 'accepted' | 'declined';
  connection_type: 'company_initiated' | 'student_initiated';
  company_notes?: string;
  student_notes?: string;
  connection_timestamp: string;
  created_at: string;
  updated_at?: string;
  // Populated fields for display
  student_profile?: StudentProfile;
  company_profile?: Company;
  student_name?: string;
  company_name?: string;
}

export interface CareerFair {
  id: string;
  name: string;
  date: string;
  location: string;
  province?: string;
  university?: string;
  universityCode?: string;
  description?: string;
  industries?: string[];
  expectedAttendees?: number;
  featured?: boolean;
  registrationOpen?: boolean;
  virtualComponent?: boolean;
  companies: Company[];
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [selectedCareerFair, setSelectedCareerFair] = useState<CareerFair | null>(null);
  const [showHub, setShowHub] = useState(true);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Check for existing session on app load
  useEffect(() => {
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await loadUserProfile();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setStudentProfile(null);
          setSelectedCareerFair(null);
          setShowHub(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Load companies and student profile when user signs in
  useEffect(() => {
    if (user) {
      loadCompanies();
      if (user.role === 'student') {
        loadStudentProfile();
      }
    }
  }, [user]);

  const checkSession = async () => {
    try {
      const session = await authAPI.getSession();
      if (session) {
        await loadUserProfile();
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      const profile = await profileAPI.get();
      setUser({
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: profile.role
      });
    } catch (error) {
      console.error('Failed to load user profile:', error);
      setLoading(false);
    }
  };

  const loadStudentProfile = async () => {
    try {
      const profile = await studentProfileAPI.get();
      setStudentProfile(profile);
    } catch (error) {
      // This is expected when student hasn't created profile yet
      if (error instanceof Error && error.message.includes('not found')) {
        console.log('Student profile not found - user needs to create one');
      } else {
        console.error('Unexpected error loading student profile:', error);
      }
      // Don't set loading false here as it's optional
      setStudentProfile(null);
    }
  };

  const loadCompanies = async () => {
    try {
      const companiesData = await companyAPI.getAll();
      // Enhanced company data with comprehensive profiles and ZAR salary ranges
      const enhancedCompanies = companiesData.map((company: any) => ({
        ...company,
        name: company.name || 'Unnamed Company',
        industry: company.industry || 'Industry not specified',
        description: company.description || 'No description available',
        positions: Array.isArray(company.positions) ? company.positions.filter(Boolean) : [],
        requirements: Array.isArray(company.requirements) ? company.requirements.filter(Boolean) : [],
        benefits: Array.isArray(company.benefits) ? company.benefits.filter(Boolean) : [],
        
        // Mock enhanced data with South African context
        founded_year: company.founded_year || (2010 + Math.floor(Math.random() * 14)),
        company_size: company.company_size || ['startup', 'small', 'medium', 'large'][Math.floor(Math.random() * 4)],
        headquarters: company.headquarters || ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Bloemfontein', 'Port Elizabeth'][Math.floor(Math.random() * 6)],
        office_locations: company.office_locations || [
          ['Cape Town', 'Johannesburg', 'Remote'],
          ['Johannesburg', 'Pretoria', 'Durban'],
          ['Cape Town', 'Stellenbosch', 'Remote'],
          ['Durban', 'Pietermaritzburg', 'Remote'],
          ['Johannesburg', 'Sandton', 'Centurion']
        ][Math.floor(Math.random() * 5)],
        company_culture: company.company_culture || ['Innovation-driven', 'Ubuntu values', 'Collaborative', 'Diverse & Inclusive'],
        company_values: company.company_values || ['Excellence', 'Ubuntu', 'Transformation', 'Innovation'],
        mission_statement: company.mission_statement || 'Empowering the next generation of technology leaders across Africa, building solutions that make a difference.',
        recent_achievements: company.recent_achievements || [
          'Best Workplace Award 2024',
          'R50M Series A Funding',
          'Expanded to 3 new African markets',
          'B-BBEE Level 2 Contributor',
          'Top Employer South Africa 2024'
        ],
        tech_stack: company.tech_stack || ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
        work_environment: company.work_environment || 'hybrid' as const,
        diversity_initiatives: company.diversity_initiatives || [
          'Women in Tech Program',
          'Youth Development Bursaries',
          'Skills Development Mentorship',
          'B-BBEE Transformation',
          'Community Upliftment Programs'
        ],
        career_development: company.career_development || [
          'Skills Training & Certifications',
          'Conference Sponsorship',
          'Career Coaching & Mentorship',
          'Leadership Development',
          'International Exchange Programs'
        ],
        internship_programs: company.internship_programs ?? true,
        graduate_programs: company.graduate_programs ?? true,
        // Updated salary ranges to ZAR (South African Rand)
        salary_range: company.salary_range || {
          min: Math.floor(Math.random() * 200000) + 300000, // R300k - R500k
          max: Math.floor(Math.random() * 500000) + 600000, // R600k - R1.1M
          currency: 'ZAR'
        },
        application_process: company.application_process || [
          'Online Application',
          'Technical Assessment',
          'Cultural Fit Interview',
          'Panel Interview',
          'Reference Check'
        ],
        contact_email: company.contact_email || 'careers@company.co.za',
        linkedin_url: company.linkedin_url || 'https://linkedin.com/company/example',
        glassdoor_rating: company.glassdoor_rating || (3.5 + Math.random() * 1.5),
        recent_news: company.recent_news || [
          {
            title: 'Company announces major expansion across Africa',
            date: '2024-07-15',
            summary: 'Expanding operations to serve more clients across South Africa and neighbouring countries',
            url: 'https://example.com/news'
          }
        ]
      }));
      
      setCompanies(enhancedCompanies);
    } catch (error) {
      console.error('Failed to load companies:', error);
      setCompanies([]); // Set empty array as fallback
    }
  };

  const handleLogin = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      
      // Try to sign in first
      try {
        await authAPI.signIn(email, password);
        await loadUserProfile();
      } catch (signInError) {
        // If sign in fails, try to sign up
        console.log('Sign in failed, attempting sign up:', signInError);
        await authAPI.signUp(email, password, role === 'student' ? 'Student User' : 'Company Representative', role);
        await authAPI.signIn(email, password);
        await loadUserProfile();
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.signOut();
      setUser(null);
      setStudentProfile(null);
      setCompanies([]);
      setSelectedCareerFair(null);
      setShowHub(true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleStudentProfileUpdate = () => {
    loadStudentProfile();
  };

  const handleSelectCareerFair = (careerFair: CareerFair) => {
    // Add companies to the selected career fair
    const careerFairWithCompanies = {
      ...careerFair,
      companies: companies
    };
    setSelectedCareerFair(careerFairWithCompanies);
    setShowHub(false);
  };

  const handleBackToHub = () => {
    setSelectedCareerFair(null);
    setShowHub(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 gradient-mesh opacity-20 animate-pulse"></div>
        
        <div className="text-center relative z-10">
          {/* Funky loading spinner */}
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-neon-purple animate-spin neon-glow"></div>
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-neon-cyan animate-spin neon-glow-cyan" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-neon-pink animate-spin neon-glow-pink" style={{ animationDuration: '1.2s' }}></div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              Loading Mzansi Career Connect... ✨
            </h2>
            <p className="text-muted-foreground animate-pulse">
              Connecting you to South Africa's top career fairs 🇿🇦
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background dark">
        <LoginScreen onLogin={handleLogin} />
        <Toaster />
      </div>
    );
  }

  // Show career fair hub if no career fair is selected
  if (showHub || !selectedCareerFair) {
    return (
      <div className="min-h-screen bg-background dark">
        <CareerFairHub 
          onSelectCareerFair={handleSelectCareerFair}
          userRole={user.role!}
        />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark">
      {user.role === 'student' ? (
        <StudentDashboard 
          user={user} 
          studentProfile={studentProfile}
          careerFair={selectedCareerFair} 
          onLogout={handleLogout}
          onCompaniesUpdate={loadCompanies}
          onProfileUpdate={handleStudentProfileUpdate}
          onBackToHub={handleBackToHub}
        />
      ) : (
        <CompanyDashboard 
          user={user} 
          careerFair={selectedCareerFair} 
          onLogout={handleLogout}
          onCompanyUpdate={loadCompanies}
          onBackToHub={handleBackToHub}
        />
      )}
      <Toaster />
    </div>
  );
}

export default App;