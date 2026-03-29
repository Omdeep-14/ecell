import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "YOUR_SUPABASE_URL",     // ← backend dev fills this
  "YOUR_SUPABASE_ANON_KEY" // ← backend dev fills this
);