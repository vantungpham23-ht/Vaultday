export const environment = {
  production: true,
  supabase: {
    url: (window as any).__env?.SUPABASE_URL || 'https://your-project.supabase.co',
    anonKey: (window as any).__env?.SUPABASE_ANON_KEY || 'your-anon-key-here'
  }
};
