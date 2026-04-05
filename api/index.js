// src/index.js

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.js";
import eventsRouter from "./src/routes/events.js";
import adminsRouter from "./src/routes/admins.js";
import teamRouter from "./src/routes/team.js";
import {
  galleryRouter,
  statsRouter,
  speakersRouter,
  testimonialsRouter,
} from "./src/routes/content.js";
import contactRouter from "./src/routes/contact.js";

const app = express();
const PORT = process.env.PORT || 4000;

// ── CORS ──────────────────────────────────────────────────────
const allowedOrigins = process.env.FRONTEND_URL.split(",").map((o) => o.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (e.g. Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// ── Body parsing ──────────────────────────────────────────────
app.use(express.json());

// ── Health check ──────────────────────────────────────────────
app.get("/health", (_req, res) =>
  res.json({ status: "ok", service: "ecell-api" }),
);

// ── Routes ────────────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/events", eventsRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/stats", statsRouter);
app.use("/api/speakers", speakersRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/admins", adminsRouter); // superadmin only
app.use("/api/team", teamRouter);
app.use("/api/contact", contactRouter);

// ── 404 handler ───────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Route not found." }));

// ── Global error handler ──────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("[ERROR]", err.message);
  res.status(500).json({ error: err.message || "Internal server error." });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 E-Cell API running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health\n`);
});
