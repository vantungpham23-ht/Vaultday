import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = (window as any).__env?.SUPABASE_URL || 'https://...supabase.co';
const SUPABASE_ANON_KEY = (window as any).__env?.SUPABASE_ANON_KEY || '...';

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});