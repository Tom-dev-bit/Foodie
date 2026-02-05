import { createMiddleware } from "hono/factory";

const checkTranslation = createMiddleware(async (context, next) => {
  try {
    const body = await context.req.json();

    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: body.query,
          source: "hu",
          target: "en",
        }),
      },
    );

    console.log("Translation API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Translation API error:", errorText);
      throw new Error(`Translation failed: ${response.status}`);
    }

    const dataObj = (await response.json()) as {
      data: {
        translations: Array<{
          translatedText: string;
        }>;
      };
    };

    const translatedText = dataObj.data.translations[0].translatedText;

    // Store translated query in context for the handler to use
    context.set("translatedQuery", translatedText);

    return next();
  } catch (error) {
    console.error("Translation check error:", error);
    return context.json({ error: "Failed to check translation" }, 500);
  }
});

export { checkTranslation };
