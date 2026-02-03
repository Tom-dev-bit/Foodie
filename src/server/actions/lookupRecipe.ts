"use server";

export const lookupRecipe = async (query: string) => {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
      query,
    )}&number=5&apiKey=${import.meta.env.SPOONACULAR_API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await res.json();
  return data.results;
};
