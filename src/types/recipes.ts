type Recipe = {
  id: number;
  image: string; // url
  language: "en";
  readyInMinutes: number;
  servings: number;
  sourceName: string;
  title: string;
};

type RecipesResponse = {
  number: number;
  offset: number;
  results: Recipe[];
  totalResults: number;
};

export type { Recipe, RecipesResponse };
