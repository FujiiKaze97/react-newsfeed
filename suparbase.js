import { createClient } from '@supabase/supabase-js';

// 1) project url
<<<<<<< HEAD
const SUPABASE_PROJECT_URL = import.meta.env.SUPABASE_PROJECT_URL;

// 2) anon key
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY;

=======
const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;

// 2) anon key
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
>>>>>>> 42cd36d3884ab0c4e9e827a272bf141eac84ac3a

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
export default supabase;
