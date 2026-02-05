// Shared types for Hono context
type AppVariables = {
  translatedQuery?: string;
  originalBody?: any;
};

type SearchParams = {
  query: string;
  offset: number;
};

export type { AppVariables, SearchParams };
