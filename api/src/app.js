import express from "express";
import cors from "cors";

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

export default app;
