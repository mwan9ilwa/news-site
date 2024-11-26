"use client"

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";

export default function News() {
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data); // Set articles by category
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Latest News</h1>

        {/* Iterate through the categories */}
        {Object.keys(articles).map((category) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {category} News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Display articles for each category */}
              {articles[category].map((article, index) => (
                <NewsCard
                  key={index}
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  imageUrl={article.urlToImage}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


