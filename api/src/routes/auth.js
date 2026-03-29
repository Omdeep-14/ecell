// src/routes/auth.js
//
// Utility auth routes used by the frontend to:
//  - Verify a token and get back the user's role
//  - (Frontend uses this on load to know if user is admin/superadmin)
//

import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// ── GET /api/auth/me ──────────────────────────────────────────
// Returns the authenticated user's info + role.
// Frontend calls this after login to know what dashboard to show.
//
router.get("/me", verifyToken, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.role,
  });
});

export default router;
