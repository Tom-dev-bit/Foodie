import { Hono } from "hono";
import { getTranslation } from "../util/getTranslation";

const app = new Hono();

app.post("/", async (context) => {
  try {
    const { text } = await context.req.json();

    const translatedTextResponse = await getTranslation(text, "en", "hu");
    const translatedText =
      translatedTextResponse.data.translations[0].translatedText;

    return context.json(translatedText);
  } catch (error) {
    console.error("Translation error:", error);
    return context.json({ error: "Failed to translate text" }, 500);
  }
});

export default app;
