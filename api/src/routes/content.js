// src/routes/content.js
//
// Covers: /api/gallery, /api/stats, /api/speakers, /api/testimonials
// Pattern: public GET, admin+ POST/PUT/DELETE
//

import { Router } from "express";
import { adminClient } from "../config/supabase.js";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

// ─── Generic CRUD factory ─────────────────────────────────────
// Keeps routes DRY. Each table has slightly different required fields.
export function makeCrudRouter(table, requiredFields, orderBy = "sort_order") {
  const router = Router();

  // GET all — public
  router.get("/", async (req, res) => {
    const { data, error } = await adminClient
      .from(table)
      .select("*")
      .order(orderBy, { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // GET one — public
  router.get("/:id", async (req, res) => {
    const { data, error } = await adminClient
      .from(table)
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error)
      return res.status(404).json({ error: `${table} item not found.` });
    res.json(data);
  });

  // POST — admin+
  router.post("/", verifyToken, requireAdmin, async (req, res) => {
    const missing = requiredFields.filter((f) => req.body[f] === undefined);
    if (missing.length) {
      return res
        .status(400)
        .json({ error: `Missing required fields: ${missing.join(", ")}` });
    }

    const { data, error } = await adminClient
      .from(table)
      .insert(req.body)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  });

  // PUT — admin+
  router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
    const { id, created_at, ...updates } = req.body; // strip immutable fields
    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: "No fields to update." });
    }

    const { data, error } = await adminClient
      .from(table)
      .update(updates)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  // DELETE — admin+
  router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
    const { error } = await adminClient
      .from(table)
      .delete()
      .eq("id", req.params.id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: `${table} item deleted.` });
  });

  return router;
}

// ── Instantiate each content router ──────────────────────────
export const galleryRouter = makeCrudRouter("gallery_items", ["label", "cat"]);
export const statsRouter = makeCrudRouter("stats", ["num", "label"]);
export const speakersRouter = makeCrudRouter("speakers", [
  "initial",
  "name",
  "role",
  "tag",
]);
export const testimonialsRouter = makeCrudRouter("testimonials", [
  "quote",
  "name",
  "info",
]);
