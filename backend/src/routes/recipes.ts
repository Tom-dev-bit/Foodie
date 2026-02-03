import { Hono } from "hono";

const app = new Hono();

const apiKey = process.env.SPOONACULAR_API_KEY;

// Search recipes
app.post("/search", async (context) => {
  try {
    const body = await context.req.json();
    const { query, cuisine, diet, intolerances } = body;

    if (!query) {
      return context.json({ error: "Query parameter is required" }, 400);
    }

    if (!apiKey) {
      return context.json({ error: "API key not configured" }, 500);
    }

    // Build query parameters
    const params = new URLSearchParams({
      apiKey,
      query,
      number: "10",
      addRecipeInformation: "true",
      ...(cuisine && { cuisine }),
      ...(diet && { diet }),
      ...(intolerances && { intolerances }),
    });

    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params}`,
    );

    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status}`);
    }

    const data = await response.json();
    return context.json(data);
  } catch (error) {
    console.error("Recipe search error:", error);
    return context.json({ error: "Failed to search recipes" }, 500);
  }
});

// Get recipe details
app.get("/:id", async (context) => {
  try {
    const id = context.req.param("id");

    if (!apiKey) {
      return context.json({ error: "API key not configured" }, 500);
    }

    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`,
    );

    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status}`);
    }

    const data = await response.json();
    return context.json(data);
  } catch (error) {
    console.error("Recipe details error:", error);
    return context.json({ error: "Failed to fetch recipe details" }, 500);
  }
});

export default app;
