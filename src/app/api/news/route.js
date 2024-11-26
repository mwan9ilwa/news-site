import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url); // Get query parameters
  const category = searchParams.get("category") || "general"; // Default to 'general'

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        apiKey: process.env.NEWS_API_KEY,
        q: category,
        language: "en",
      },
    });

    // Group articles by category (if available)
    const groupedArticles = response.data.articles.reduce((acc, article) => {
      const articleCategory = article.category || "uncategorized";
      if (!acc[articleCategory]) {
        acc[articleCategory] = [];
      }
      acc[articleCategory].push(article);
      return acc;
    }, {});

    return new Response(JSON.stringify(groupedArticles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching news data:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch news data." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
