# Foodie Backend

Backend API for the Foodie recipe application.

## Setup

1. Install dependencies:

```bash
cd backend
bun install
```

2. Create `.env` file from example:

```bash
cp .env.example .env
```

3. Add your Spoonacular API key to `.env`:

```
SPOONACULAR_API_KEY=your_actual_key_here
```

## Development

Run the dev server with hot reload:

```bash
bun run dev
```

Server will start on `http://localhost:3001`

## API Endpoints

### Health Check

```
GET /health
```

### Search Recipes

```
POST /api/recipes/search
Content-Type: application/json

{
  "query": "pasta",
  "cuisine": "italian",
  "diet": "vegetarian",
  "intolerances": "gluten"
}
```

### Get Recipe Details

```
GET /api/recipes/:id
```

## Environment Variables

- `PORT` - Server port (default: 3001)
- `SPOONACULAR_API_KEY` - Your Spoonacular API key
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)
