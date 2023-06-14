import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pbyoowfngszqvmrzynmn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieW9vd2ZuZ3N6cXZtcnp5bm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxNjYzNDYsImV4cCI6MjAwMDc0MjM0Nn0.wfNBE-wwGsVW6wyQlDe8YWQ8Udgw-jc1pT_WPiKVBCY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
export { supabaseUrl, supabaseAnonKey };
