// src/config/supabase.js

import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } =
  process.env;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    "Missing Supabase env vars. Check SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY in your .env",
  );
}

/**
 * anonClient — used to validate incoming JWTs from the frontend.
 * Respects RLS policies. Never use this for privileged operations.
 */
export const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * adminClient — uses the service role key, bypasses RLS.
 * Used ONLY inside trusted server-side operations (invite user, delete user, etc.)
 * Never expose this key to the frontend.
 */
export const adminClient = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  },
);
