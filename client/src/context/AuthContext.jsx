// src/context/AuthContext.jsx
// ─────────────────────────────────────────────────────────────
// Auth context for E-Cell MESWCOE — built for Supabase backend
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../context/supabaseClient.js"; // Backend dev creates this file

// 1. Create the context
const AuthContext = createContext(null);

// 2. Provider — wrap your App with this
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Supabase user object
  const [session, setSession] = useState(null); // Supabase session object
  const [loading, setLoading] = useState(true); // true while checking auth

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Auth Methods ──────────────────────────────────────────

  // Sign up with email + password
  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
    dept,
    year,
    reason,
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName, dept, year, reason }, // saved to user metadata
      },
    });
    return { data, error };
  };

  // Sign in with email + password
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  // ── Value exposed to all components ──────────────────────
  const value = {
    user, // null if not logged in, Supabase User object if logged in
    session, // full Supabase session (has access_token, refresh_token, etc.)
    loading, // use this to show a spinner while auth is being checked
    signUp,
    signIn,
    signOut,
    isLoggedIn: !!user, // simple boolean helper
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook — use this in any component
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
