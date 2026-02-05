import { useEffect, useState, type FC } from "react";
import type { Recipe } from "@/types/recipes";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, Users } from "lucide-react";
import { Button } from "../ui/button";
import { getTranslatedTitle } from "@/lib/getTranslatedTitle";
import { useInView } from "@/hooks/useInView";

type RecipeProps = {
  recipe: Recipe;
};

const RecipeCard: FC<RecipeProps> = ({ recipe }) => {
  const [hungarianTitle, setHungarianTitle] = useState<string>(recipe.title);
  const { ref, hasBeenInView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    // Only translate when card becomes visible for the first time
    if (!hasBeenInView) return;

    const fetchTitleTranslation = async () => {
      try {
        const translatedTitle = await getTranslatedTitle(recipe.title);
        setHungarianTitle(translatedTitle);
      } catch (error) {
        console.error("Translation error:", error);
      }
    };

    fetchTitleTranslation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBeenInView, recipe.title]);

  return (
    <Card
      ref={ref}
      key={recipe.id}
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image}
            alt={hungarianTitle}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2 min-h-14">
          {hungarianTitle}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {recipe.readyInMinutes} perc
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {recipe.servings} adag
          </Badge>
        </div>

        {recipe.sourceName && (
          <p className="text-sm text-muted-foreground">
            Forrás: {recipe.sourceName}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="outline">
          Recept megtekintése
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
