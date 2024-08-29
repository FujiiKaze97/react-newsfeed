import { createClient } from '@supabase/supabase-js';

// 1) project url
const SUPABASE_PROJECT_URL = 'https://sdkvrrggsuuhvxrvsobx.supabase.co';

// 2) anon key
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNka3Zycmdnc3V1aHZ4cnZzb2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4Mzg1NDMsImV4cCI6MjA0MDQxNDU0M30.cLsvvXKSC52HroEmXPn5PGYNlsDczW-oXPQs8qaUEF8';

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);
export default supabase;
