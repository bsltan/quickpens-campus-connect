import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase credentials are missing. Please check your .env file.');
}

// Add custom headers for better debugging
const options = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    fetch: async (input: RequestInfo, init?: RequestInit) => {
      try {
        return await fetch(input, init);
      } catch (error) {
        console.error('Network error:', error);
        throw error;
      }
    },
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);