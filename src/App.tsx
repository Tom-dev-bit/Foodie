import { useState } from "react";
import { Form } from "./components/layout/Form";
import { Header } from "./components/layout/Header";
import type { RecipesResponse } from "./types/recipes";
import { Recipes } from "./components/layout/Recipes";

function App() {
  const [recipes, setRecipes] = useState<RecipesResponse | null>(null);
  const [tab, setTab] = useState<"search" | "recipes">("search");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen flex flex-col justify-center">
      <Header />

      {tab === "search" && (
        <Form
          setTab={setTab}
          setRecipes={setRecipes}
          setSearchQuery={setSearchQuery}
        />
      )}
      {tab === "recipes" && recipes && (
        <Recipes
          recipes={recipes}
          setTab={setTab}
          setRecipes={setRecipes}
          searchQuery={searchQuery}
        />
      )}
    </main>
  );
}

export default App;
