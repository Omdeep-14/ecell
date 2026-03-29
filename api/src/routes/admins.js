// src/routes/admins.js
//
// All routes here are superadmin-only.
// Superadmin can: list all admins, invite new admins, remove admins.
//

import { Router } from "express";
import { adminClient } from "../config/supabase.js";
import { verifyToken, requireSuperAdmin } from "../middleware/auth.js";

const router = Router();

// Apply both middlewares to every route in this file
router.use(verifyToken, requireSuperAdmin);

// ── GET /api/admins — list all admins & superadmins ──────────
router.get("/", async (req, res) => {
  const { data, error } = await adminClient
    .from("user_roles")
    .select("id, user_id, email, role, created_at")
    .order("created_at", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ── POST /api/admins — invite a new admin user ────────────────
//
// Flow:
//  1. Create the user in Supabase Auth (sends an invite email)
//  2. Insert their role into user_roles table
//
// Body: { email: string, role: "admin" | "superadmin" }
//
router.post("/", async (req, res) => {
  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json({ error: "email is required." });
  }
  if (!["admin", "superadmin"].includes(role)) {
    return res
      .status(400)
      .json({ error: "role must be 'admin' or 'superadmin'." });
  }

  // Prevent superadmin from accidentally demoting themselves
  if (email === req.user.email && role !== "superadmin") {
    return res.status(400).json({ error: "You cannot change your own role." });
  }

  // Step 1: invite user via Supabase Admin Auth API
  // This sends an invite email with a magic link to set their password
  const { data: inviteData, error: inviteError } =
    await adminClient.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL ?? "http://localhost:3000"}/admin`,
    });

  if (inviteError) {
    // If user already exists in auth, we can still assign them a role
    if (!inviteError.message.includes("already been registered")) {
      return res.status(500).json({ error: inviteError.message });
    }
  }

  const userId = inviteData?.user?.id;

  if (!userId) {
    // User already existed — look them up
    const {
      data: { users },
      error: listError,
    } = await adminClient.auth.admin.listUsers();
    if (listError) return res.status(500).json({ error: listError.message });

    const existing = users.find((u) => u.email === email);
    if (!existing)
      return res.status(404).json({ error: "Could not find user." });

    // Upsert their role
    const { data, error } = await adminClient
      .from("user_roles")
      .upsert({ user_id: existing.id, email, role }, { onConflict: "user_id" })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res
      .status(200)
      .json({ message: "Role updated for existing user.", data });
  }

  // Step 2: insert role for new user
  const { data, error } = await adminClient
    .from("user_roles")
    .insert({ user_id: userId, email, role })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({
    message: `Invite sent to ${email}. They will receive an email to set their password.`,
    data,
  });
});

// ── DELETE /api/admins/:id — remove an admin ─────────────────
//
// :id is the user_roles row id (not user_id).
// This removes their role row. Optionally also removes from Auth.
//
// Query param: ?deleteAuthUser=true  → also deletes from Supabase Auth
//
router.delete("/:id", async (req, res) => {
  // Fetch the role row first so we know who we're removing
  const { data: roleRow, error: fetchError } = await adminClient
    .from("user_roles")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (fetchError || !roleRow) {
    return res.status(404).json({ error: "Admin not found." });
  }

  // Prevent superadmin from removing themselves
  if (roleRow.user_id === req.user.id) {
    return res.status(400).json({ error: "You cannot remove yourself." });
  }

  // Remove from user_roles table
  const { error: deleteRoleError } = await adminClient
    .from("user_roles")
    .delete()
    .eq("id", req.params.id);

  if (deleteRoleError)
    return res.status(500).json({ error: deleteRoleError.message });

  // Optionally also delete from Supabase Auth entirely
  if (req.query.deleteAuthUser === "true") {
    const { error: deleteAuthError } = await adminClient.auth.admin.deleteUser(
      roleRow.user_id,
    );
    if (deleteAuthError) {
      // Role already removed — warn but don't fail
      return res.json({
        message: "Role removed. Warning: could not delete auth user.",
        warning: deleteAuthError.message,
      });
    }
  }

  res.json({ message: `Admin ${roleRow.email} removed successfully.` });
});

// ── PATCH /api/admins/:id/role — change role ─────────────────
// Body: { role: "admin" | "superadmin" }
router.patch("/:id/role", async (req, res) => {
  const { role } = req.body;

  if (!["admin", "superadmin"].includes(role)) {
    return res
      .status(400)
      .json({ error: "role must be 'admin' or 'superadmin'." });
  }

  const { data: roleRow } = await adminClient
    .from("user_roles")
    .select("user_id")
    .eq("id", req.params.id)
    .single();

  if (!roleRow) return res.status(404).json({ error: "Admin not found." });
  if (roleRow.user_id === req.user.id) {
    return res.status(400).json({ error: "You cannot change your own role." });
  }

  const { data, error } = await adminClient
    .from("user_roles")
    .update({ role })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Role updated.", data });
});

export default router;
