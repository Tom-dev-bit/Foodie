# Foodie

Just a random food lookup app built with React, Hono and Vite. It uses the Spoonacular API to fetch recipes and the Google Translate API to translate recipe titles and search input to Hungarian.

## Why?

My girlfriend and I always have trouble figuring out what to cook, this was my attempt at solving that problem. And the reason behind the title translation was that my girlfirend doesn't speak english, so how the app works is the landing page's search input accepts hungarian words, then on submit the backend has a middleware that sends the input's text to the Google Translation API and translates it to english, then the translated text is sent to the Spoonacular API and the results are sent back to the frontend, where the recipe titles are translated back to hungarian and displayed on the cards.

## Features

- Search for recipes by name or "category" (e.g. "chicken", "pasta", "soup", etc.)
- View recipe details by clicking on the recipe card, which opens a Google search for the recipe
- Spoonacular API integration for fetching recipes
- Google Translate API integration for translating recipe titles to Hungarian
- Translation on scroll for better performance and user experience ( and lower API costs lol )
- NO RESPONSIVE DESIGN

## Tech Stack

- React with TypeScript for the frontend ( Intersection Observer API for lazy translation )
- Hono for the backend API
- Vite for bundling the frontend
- Tailwind CSS & Shadcn UI for styling
- Spoonacular API for recipe data
- Google Translate API for translation

### Reason behind abandonment

My girlfriend thought the idea was dumb. Because the reason we can't find anything to cook is because we're lazy and actually dont know how to cook, not because we can't find recipes. So yeah, RIP.
