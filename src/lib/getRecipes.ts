async function getRecipes(offset: number, query: string) {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipes/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, offset }),
  });
}

export { getRecipes };
