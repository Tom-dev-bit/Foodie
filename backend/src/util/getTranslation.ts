type TranslationResponse = {
  data: {
    translations: Array<{
      translatedText: string;
    }>;
  };
};

const getTranslation = async (
  text: string,
  source: "en" | "hu",
  target: "en" | "hu",
): Promise<TranslationResponse> => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: source,
          target: target,
        }),
      },
    );

    console.log("Translation API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Translation API error:", errorText);
      throw new Error(`Translation failed: ${response.status}`);
    }

    return (await response.json()) as TranslationResponse;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate text");
  }
};

export { getTranslation };
