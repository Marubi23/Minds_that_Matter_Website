// supabaseClient.js
import 'dotenv/config';  // ✅ ensures .env variables are loaded
import { createClient } from '@supabase/supabase-js';

// Use backend Service Role key here
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Service Key missing in .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
