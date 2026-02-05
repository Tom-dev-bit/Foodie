const getTranslatedTitle = async (title: string): Promise<string> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/translation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: title }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to translate title");
    }

    const translatedTitle = await response.json();
    return translatedTitle;
  } catch (error) {
    console.error("Translation error:", error);
    return title; // Return original title on error
  }
};

export { getTranslatedTitle };
