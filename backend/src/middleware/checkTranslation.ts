import { createMiddleware } from "hono/factory";
import { getTranslation } from "../util/getTranslation";

const checkTranslation = createMiddleware(async (context, next) => {
  try {
    const body = await context.req.json();

    const translatedTextResponse = await getTranslation(body.query, "hu", "en");
    const translatedText =
      translatedTextResponse.data.translations[0].translatedText;

    // Store translated query in context for the handler to use
    context.set("translatedQuery", translatedText);

    return next();
  } catch (error) {
    console.error("Translation check error:", error);
    return context.json({ error: "Failed to check translation" }, 500);
  }
});

export { checkTranslation };
