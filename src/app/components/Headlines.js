import Link from "next/link";

export default function Headlines({ articles }) {
  // Limit articles to the most recent 5
  const recentArticles = articles.slice(0, 5);

  return (
    <div className="bg-[#292a2d] p-4 rounded-3xl">
      <h3 className="font-semibold text-xl mb-4">Headlines</h3>
      <ul className="space-y-4">
        {recentArticles.map((article, index) => (
          <li key={index} className="flex items-start hover:bg-[#202124] p-3 rounded-3xl transition">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-24 h-24 object-cover rounded-2xl mr-4"
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{article.source.name}</h4>
              <h4 className="font-semibold text-lg">{article.title}</h4>
              <p className="text-gray-100 text-sm">{article.description}</p>
              <Link href={article.url}>
                <h1 className="text-blue-500 hover:underline mt-2 block">Read more</h1>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {articles.length > 5 && ( // Check if there are more than 5 articles
        <div className="text-center mt-4">
          <Link href="/news">
            <h1 className="text-blue-500 hover:underline">See All Articles</h1>
          </Link>
        </div>
      )}
    </div>
  );
}