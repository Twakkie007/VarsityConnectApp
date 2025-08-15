import { StudentProfile } from '../App';

export const calculateProfileCompletion = (studentProfile: StudentProfile | null): number => {
  if (!studentProfile) return 0;
  
  return (
    (studentProfile.profile_image ? 10 : 0) +
    (studentProfile.bio ? 15 : 0) +
    (studentProfile.university && studentProfile.degree ? 20 : 0) +
    ((studentProfile.skills?.length || 0) > 0 ? 15 : 0) +
    ((studentProfile.interests?.length || 0) > 0 ? 10 : 0) +
    ((studentProfile.preferred_industries?.length || 0) > 0 ? 15 : 0) +
    (studentProfile.location_province && studentProfile.location_city ? 10 : 0) +
    ((studentProfile.languages?.length || 0) > 0 ? 5 : 0)
  );
};

export const filterCompanies = (companies: any[], searchTerm: string) => {
  return companies.filter(company => {
    if (!company) return false;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Check company name
    const nameMatch = company.name && company.name.toLowerCase().includes(searchLower);
    
    // Check industry
    const industryMatch = company.industry && company.industry.toLowerCase().includes(searchLower);
    
    // Check positions (with null checks)
    const positionsMatch = company.positions && Array.isArray(company.positions) && 
      company.positions.some((pos: any) => pos && typeof pos === 'string' && pos.toLowerCase().includes(searchLower));
    
    return nameMatch || industryMatch || positionsMatch;
  });
};

export const getInterestedCompanies = (companies: any[], interestedCompanyIds: Set<string>) => {
  return companies.filter(company => 
    company && interestedCompanyIds.has(company.id)
  );
};