import { Router } from "express";
import { adminClient } from "../config/supabase.js";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const { year } = req.query;
  let query = adminClient.from("team_members").select("*").order("sort_order");
  if (year) query = query.eq("year", year);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/", verifyToken, requireAdmin, async (req, res) => {
  const { data, error } = await adminClient
    .from("team_members")
    .insert(req.body)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  const { data, error } = await adminClient
    .from("team_members")
    .update(req.body)
    .eq("id", req.params.id)
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete("/:id", verifyToken, requireAdmin, async (req, res) => {
  const { error } = await adminClient
    .from("team_members")
    .delete()
    .eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Deleted." });
});

export default router;
