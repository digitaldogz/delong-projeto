import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://aapcuojdllvcfmomvhfx.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YayR5J2rQ_X4GpkGMINbnw_xupSt3w5';

export default async function handler(req, res) {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.from('projects').select('id').limit(1);
    
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Supabase pinged successfully! Database kept alive.',
      timestamp: new Date().toISOString() 
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
