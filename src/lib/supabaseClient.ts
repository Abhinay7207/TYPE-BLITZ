import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hawcvivpntlbvwprvzdk.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd2N2aXZwbnRsYnZ3cHJ2emRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODcwNzUsImV4cCI6MjA3OTc2MzA3NX0.Qjefd_yFgKEYeTfdHYUc90mIlbDmvGLBDjwyboeiSpM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
