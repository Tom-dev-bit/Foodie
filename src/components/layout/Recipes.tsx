import { getRecipes } from "@/lib/getRecipes";
import type { RecipesResponse } from "@/types/recipes";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import RecipeCard from "./RecipeCard";

type RecipesProps = {
  recipes: RecipesResponse | null;
  setTab: Dispatch<SetStateAction<"search" | "recipes">>;
  setRecipes: Dispatch<SetStateAction<RecipesResponse | null>>;
  searchQuery: string;
};

const Recipes = ({
  recipes,
  setTab,
  setRecipes,
  searchQuery,
}: RecipesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = recipes?.number || 10;
  const totalPages = recipes?.totalResults
    ? Math.ceil(recipes.totalResults / itemsPerPage)
    : 1;

  // Fetch new recipes when page changes
  useEffect(() => {
    if (currentPage === 1) return; // Skip initial load

    const offset = (currentPage - 1) * itemsPerPage;
    setIsLoading(true);

    toast
      .promise(() => getRecipes(offset, searchQuery), {
        loading: "Receptek betöltése...",
        success: "Receptek betöltve!",
        error: "Hiba történt a receptek betöltése során.",
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
        window.scrollTo({ top: 0 });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, itemsPerPage, searchQuery, setRecipes]);

  if (!recipes || recipes.results.length === 0) {
    return (
      <div className="w-full mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => setTab("search")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Nem található recept. Próbálj meg egy másik keresést!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={() => setTab("search")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>
        <p className="text-muted-foreground">
          {recipes.totalResults} recept találva
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? // Loading skeleton
            Array.from({ length: itemsPerPage }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="h-48 bg-muted animate-pulse" />
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-6 bg-muted animate-pulse mb-3 rounded" />
                  <div className="flex gap-2 mb-3">
                    <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                    <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </CardContent>
              </Card>
            ))
          : recipes.results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* First page */}
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(1)}
                    className="cursor-pointer"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis before */}
              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Previous page */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="cursor-pointer"
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Current page */}
              <PaginationItem>
                <PaginationLink isActive className="cursor-default">
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              {/* Next page */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="cursor-pointer"
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis after */}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Last page */}
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(totalPages)}
                    className="cursor-pointer"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export { Recipes };
