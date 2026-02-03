/**
 * Express app setup. Configures middleware, routes, and app-level settings.
 */

import express from "express";
import cors from "cors";
import citiesRouter from "./routes/cities";
import authRouter from "./routes/auth";
import blogRouter from "./routes/blog";
import testRoutes from "./routes/test";

const app = express();

// Database initialization is handled in server.ts before listening

app.use(cors());
app.use(express.json());

// Core feature areas
app.use("/api/cities", citiesRouter);
app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/test", testRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
