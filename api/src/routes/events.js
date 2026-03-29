// src/routes/events.js

import { Router } from "express";
import { adminClient } from "../config/supabase.js";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

const router = Router();
const TABLE = "events";

// ── GET /api/events — public ──────────────────────────────────
router.get("/", async (req, res) => {
  const { data, error } = await adminClient
    .from(TABLE)
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ── GET /api/events/:id — public ─────────────────────────────
router.get("/:id", async (req, res) => {
  const { data, error } = await adminClient
    .from(TABLE)
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) return res.status(404).json({ error: "Event not found." });
  res.json(data);
});

// ── POST /api/events — admin+ ─────────────────────────────────
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  const { title, date, tag, content, sort_order } = req.body;

  if (!title || !date || !tag || !content) {
    return res
      .status(400)
      .json({ error: "title, date, tag, and content are required." });
  }

  const { data, error } = await adminClient
    .from(TABLE)
    .insert({ title, date, tag, content, sort_order: sort_order ?? 0 })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// ── PUT /api/events/:id — admin+ ──────────────────────────────
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  const { title, date, tag, content, sort_order } = req.body;
  const updates = {};

  if (title !== undefined) updates.title = title;
  if (date !== undefined) updates.date = date;
  if (tag !== undefined) updates.tag = tag;
  if (content !== undefined) updates.content = content;
  if (sort_order !== undefined) updates.sort_order = sort_order;
  updates.updated_at = new Date().toISOString();

  const { data, error } = await adminClient
    .from(TABLE)
    .update(updates)
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ── DELETE /api/events/:id — admin+ ──────────────────────────
router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  const { error } = await adminClient
    .from(TABLE)
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Event deleted successfully." });
});

export default router;
