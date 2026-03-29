// src/middleware/auth.js

import { anonClient, adminClient } from "../config/supabase.js";

// ─────────────────────────────────────────────────────────────
// STEP 1 — verifyToken
//
// Reads the Bearer token from Authorization header, validates it
// against Supabase and attaches user + role to req.
//
// Usage: router.get("/route", verifyToken, handler)
// ─────────────────────────────────────────────────────────────
export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or malformed Authorization header." });
  }

  const token = authHeader.split(" ")[1];

  // Validate JWT with Supabase — this also auto-checks expiry
  const { data, error } = await anonClient.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: "Invalid or expired access token." });
  }

  // Look up the user's role from our user_roles table
  // Use adminClient so this works regardless of RLS policies
  const { data: roleRow, error: roleError } = await adminClient
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id)
    .single();

  if (roleError || !roleRow) {
    // User is authenticated with Supabase but has no role assigned
    return res.status(403).json({
      error: "Access denied. You do not have a role assigned.",
    });
  }

  // Attach to request for downstream middleware/handlers
  req.user = data.user;
  req.role = roleRow.role; // "admin" | "superadmin"

  next();
}

// ─────────────────────────────────────────────────────────────
// STEP 2A — requireAdmin
//
// Allows both admin and superadmin through.
// Must be chained AFTER verifyToken.
//
// Usage: router.post("/events", verifyToken, requireAdmin, handler)
// ─────────────────────────────────────────────────────────────
export function requireAdmin(req, res, next) {
  if (req.role === "admin" || req.role === "superadmin") {
    return next();
  }
  return res.status(403).json({
    error: "Access denied. Admin or Superadmin role required.",
  });
}

// ─────────────────────────────────────────────────────────────
// STEP 2B — requireSuperAdmin
//
// Allows only superadmin through.
// Must be chained AFTER verifyToken.
//
// Usage: router.post("/admins", verifyToken, requireSuperAdmin, handler)
// ─────────────────────────────────────────────────────────────
export function requireSuperAdmin(req, res, next) {
  if (req.role === "superadmin") {
    return next();
  }
  return res.status(403).json({
    error: "Access denied. Superadmin role required.",
  });
}
