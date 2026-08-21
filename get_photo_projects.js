import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function run() {
  const { data } = await supabase.from('projects').select('slug, title').order('sort_order', { ascending: true });
  data.forEach(p => console.log(`- ${p.slug} (${p.title})`));
}
run();
