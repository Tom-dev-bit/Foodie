import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import recipeRoutes from "./routes/recipes";
import { checkTranslation } from "./middleware/checkTranslation";
import type { AppVariables } from "./types";

const app = new Hono<{ Variables: AppVariables }>();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Health check
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Translater middleware for all routes
app.use("*", checkTranslation);

// Routes
app.route("/api/recipes", recipeRoutes);

const port = process.env.PORT || 3001;

console.log(`🚀 Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
