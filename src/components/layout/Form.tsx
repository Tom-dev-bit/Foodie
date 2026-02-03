import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Form = () => {
  return (
    <form className="max-w-md mx-auto p-4 bg-white rounded">
      <Input
        type="text"
        placeholder="Search for recipes..."
        className="w-full mb-4"
      />
      <Button className="w-full" type="submit">
        Search
      </Button>
    </form>
  );
};

export { Form };
