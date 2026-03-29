import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // ← backend dev fills this
  import.meta.env.VITE_SUPABASE_ANON_KEY, // ← backend dev fills this
);
