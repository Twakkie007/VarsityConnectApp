import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Helper function to get user from access token
async function getUserFromToken(authHeader: string | undefined) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('No valid authorization header');
  }
  
  const accessToken = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user) {
    throw new Error('Invalid or expired token');
  }
  
  return user;
}

// Sign up endpoint
app.post('/make-server-dd2348d6/signup', async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();
    
    if (!email || !password || !name || !role) {
      return c.text('Missing required fields', 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      email_confirm: true // Automatically confirm since no email server configured
    });

    if (error) {
      console.log('Sign up error:', error);
      return c.text(`Sign up error: ${error.message}`, 400);
    }

    // Store user profile in KV store
    const profileKey = `profile:${data.user.id}`;
    await kv.set(profileKey, {
      id: data.user.id,
      name,
      email,
      role,
      created_at: new Date().toISOString()
    });

    return c.json({ message: 'User created successfully', user: data.user });
  } catch (error) {
    console.log('Sign up error:', error);
    return c.text(`Sign up error: ${error}`, 500);
  }
});

// Get user profile
app.get('/make-server-dd2348d6/profile', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    
    const profileKey = `profile:${user.id}`;
    const profile = await kv.get(profileKey);
    
    if (!profile) {
      return c.text('Profile not found', 404);
    }

    return c.json(profile);
  } catch (error) {
    console.log('Get profile error:', error);
    return c.text(`Get profile error: ${error}`, 401);
  }
});

// Student Profile endpoints
app.get('/make-server-dd2348d6/student-profile', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    
    const profileKey = `student_profile:${user.id}`;
    const profile = await kv.get(profileKey);
    
    if (!profile) {
      return c.text('Student profile not found', 404);
    }

    return c.json(profile);
  } catch (error) {
    console.log('Get student profile error:', error);
    return c.text(`Get student profile error: ${error}`, 401);
  }
});

app.post('/make-server-dd2348d6/student-profile', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    const profileData = await c.req.json();
    
    const profile = {
      id: crypto.randomUUID(),
      user_id: user.id,
      ...profileData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const profileKey = `student_profile:${user.id}`;
    await kv.set(profileKey, profile);

    return c.json(profile);
  } catch (error) {
    console.log('Create student profile error:', error);
    return c.text(`Create student profile error: ${error}`, 500);
  }
});

app.put('/make-server-dd2348d6/student-profile', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    const updateData = await c.req.json();
    
    const profileKey = `student_profile:${user.id}`;
    const existingProfile = await kv.get(profileKey);
    
    if (!existingProfile) {
      return c.text('Student profile not found', 404);
    }

    const updatedProfile = {
      ...existingProfile,
      ...updateData,
      updated_at: new Date().toISOString()
    };

    await kv.set(profileKey, updatedProfile);

    return c.json(updatedProfile);
  } catch (error) {
    console.log('Update student profile error:', error);
    return c.text(`Update student profile error: ${error}`, 500);
  }
});

// Companies endpoints
app.get('/make-server-dd2348d6/companies', async (c) => {
  try {
    const companies = await kv.getByPrefix('company:');
    return c.json(companies);
  } catch (error) {
    console.log('Get companies error:', error);
    return c.text(`Get companies error: ${error}`, 500);
  }
});

app.post('/make-server-dd2348d6/companies', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    const companyData = await c.req.json();
    
    const company = {
      id: crypto.randomUUID(),
      user_id: user.id,
      ...companyData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const companyKey = `company:${company.id}`;
    await kv.set(companyKey, company);

    return c.json(company);
  } catch (error) {
    console.log('Create company error:', error);
    return c.text(`Create company error: ${error}`, 500);
  }
});

app.put('/make-server-dd2348d6/companies/:id', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    const companyId = c.req.param('id');
    const updateData = await c.req.json();
    
    const companyKey = `company:${companyId}`;
    const existingCompany = await kv.get(companyKey);
    
    if (!existingCompany) {
      return c.text('Company not found', 404);
    }

    if (existingCompany.user_id !== user.id) {
      return c.text('Unauthorized', 403);
    }

    const updatedCompany = {
      ...existingCompany,
      ...updateData,
      updated_at: new Date().toISOString()
    };

    await kv.set(companyKey, updatedCompany);

    return c.json(updatedCompany);
  } catch (error) {
    console.log('Update company error:', error);
    return c.text(`Update company error: ${error}`, 500);
  }
});

// Interests endpoints
app.post('/make-server-dd2348d6/interests', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    const { company_id } = await c.req.json();
    
    const interest = {
      id: crypto.randomUUID(),
      user_id: user.id,
      company_id,
      created_at: new Date().toISOString()
    };

    const interestKey = `interest:${user.id}:${company_id}`;
    await kv.set(interestKey, interest);

    return c.json(interest);
  } catch (error) {
    console.log('Add interest error:', error);
    return c.text(`Add interest error: ${error}`, 500);
  }
});

app.delete('/make-server-dd2348d6/interests/:companyId', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    const companyId = c.req.param('companyId');
    
    const interestKey = `interest:${user.id}:${companyId}`;
    await kv.del(interestKey);

    return c.json({ message: 'Interest removed' });
  } catch (error) {
    console.log('Remove interest error:', error);
    return c.text(`Remove interest error: ${error}`, 500);
  }
});

app.get('/make-server-dd2348d6/interests', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    
    const interests = await kv.getByPrefix(`interest:${user.id}:`);
    return c.json(interests);
  } catch (error) {
    console.log('Get interests error:', error);
    return c.text(`Get interests error: ${error}`, 500);
  }
});

// Analytics endpoints
app.get('/make-server-dd2348d6/analytics/company/:companyId', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    const companyId = c.req.param('companyId');
    
    // Get company to verify ownership
    const companyKey = `company:${companyId}`;
    const company = await kv.get(companyKey);
    
    if (!company || company.user_id !== user.id) {
      return c.text('Unauthorized', 403);
    }

    // Get all interests for this company
    const allInterests = await kv.getByPrefix('interest:');
    const companyInterests = allInterests.filter(interest => interest.company_id === companyId);

    // Mock analytics data
    const analytics = {
      profileViews: Math.floor(Math.random() * 100) + 50,
      interestedStudents: companyInterests.length,
      resumesReceived: Math.floor(companyInterests.length * 0.7),
      interviewsScheduled: Math.floor(companyInterests.length * 0.3)
    };

    return c.json(analytics);
  } catch (error) {
    console.log('Get company analytics error:', error);
    return c.text(`Get company analytics error: ${error}`, 500);
  }
});

// Health check
app.get('/make-server-dd2348d6/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start the server
Deno.serve(app.fetch);