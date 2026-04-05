import express from "express";
import { z } from "zod";
import { adminClient } from "../config/supabase.js";

const router = express.Router();

const VALID_SUBJECTS = [
  "General Enquiry",
  "Collaboration / Sponsorship",
  "Joining E-Cell",
  "Event Query",
  "Other",
];

const contactSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(100)
    .transform((v) => v.replace(/<[^>]*>/g, "").trim()),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(100)
    .transform((v) => v.replace(/<[^>]*>/g, "").trim()),
  email: z
    .string()
    .email("Enter a valid email address")
    .max(254)
    .transform((v) => v.toLowerCase().trim()),
  subject: z.enum(VALID_SUBJECTS, {
    errorMap: () => ({ message: "Invalid subject selected" }),
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be under 500 characters")
    .transform((v) => v.replace(/<[^>]*>/g, "").trim()),
});

router.post("/contact", async (req, res) => {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.errors[0]?.message || "Validation failed";
    return res.status(400).json({ error: message });
  }

  const { error } = await adminClient
    .from("contact_messages")
    .insert([result.data]);

  if (error) {
    console.error("Supabase insert error:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to send message. Please try again." });
  }

  return res.status(201).json({ success: true, message: "Message received!" });
});

export default router;
