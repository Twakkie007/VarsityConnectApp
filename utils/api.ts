import { supabase } from './supabase/client';
import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dd2348d6`;

// Auth API
export const authAPI = {
  signUp: async (email: string, password: string, name: string, role: string) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: JSON.stringify({ email, password, name, role })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Sign up failed');
    }

    return response.json();
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      throw error;
    }
    return session;
  }
};

// Profile API
export const profileAPI = {
  get: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to get profile');
    }

    return response.json();
  }
};

// Student Profile API
export const studentProfileAPI = {
  get: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/student-profile`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to get student profile');
    }

    return response.json();
  },

  create: async (profileData: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/student-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to create student profile');
    }

    return response.json();
  },

  update: async (profileData: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/student-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to update student profile');
    }

    return response.json();
  }
};

// Company API
export const companyAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/companies`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to get companies');
    }

    return response.json();
  },

  create: async (companyData: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(companyData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to create company');
    }

    return response.json();
  },

  update: async (companyId: string, companyData: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/companies/${companyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(companyData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to update company');
    }

    return response.json();
  }
};

// Interest API (for student-company interests)
export const interestAPI = {
  add: async (companyId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/interests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({ company_id: companyId })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to add interest');
    }

    return response.json();
  },

  remove: async (companyId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/interests/${companyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to remove interest');
    }

    return response.json();
  },

  getByUser: async (userId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/interests?user_id=${userId}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to get interests');
    }

    return response.json();
  }
};

// Analytics API (for company analytics)
export const analyticsAPI = {
  getCompanyAnalytics: async (companyId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${API_BASE_URL}/analytics/company/${companyId}`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Failed to get company analytics');
    }

    return response.json();
  }
};