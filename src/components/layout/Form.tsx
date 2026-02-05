import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SubmitEventHandler,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import type { RecipesResponse } from "@/types/recipes";
import { getRecipes } from "@/lib/getRecipes";

type FormProps = {
  setTab: Dispatch<SetStateAction<"search" | "recipes">>;
  setRecipes: Dispatch<SetStateAction<RecipesResponse | null>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
};

const Form = ({ setTab, setRecipes, setSearchQuery }: FormProps) => {
  const [food, setFood] = useState("");

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault();

    toast
      .promise(() => getRecipes(0, food), {
        loading: "Recept lekérése...",
        success: "Recept sikeresen lekérve!",
        error: "Hiba történt a recept lekérése során.",
      })
      .unwrap()
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch recipes");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setSearchQuery(food);
        setTab("recipes");
      });
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Search for recipes..."
        className="w-full mb-4"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />
      <Button className="w-full" type="submit">
        Search
      </Button>
    </form>
  );
};

export { Form };
