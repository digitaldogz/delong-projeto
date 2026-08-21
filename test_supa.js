import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function run() {
  const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  console.log("Total projects:", data ? data.length : 0);
  
  const siteSettings = await supabase.from('site_settings').select('*');
  console.log("Site settings:", siteSettings.data);
  
  if (error) console.error(error);
}
run();
