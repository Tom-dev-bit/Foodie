import { useState, type SubmitEventHandler } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

const Form = () => {
  const [food, setFood] = useState("");

  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault();

    toast.promise(
      () =>
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/recipes/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: food }),
        }),
      {
        loading: "Recept lekérése...",
        success: "Recept sikeresen lekérve!",
        error: "Hiba történt a recept lekérése során.",
      },
    );
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
