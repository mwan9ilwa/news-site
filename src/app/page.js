"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Headlines from "./components/Headlines";
import WeatherWidget from "./components/WeatherWidget";
import LiveScoresWidget from "./components/LiveScoresWidget";
import FixturesWidget from "./components/FixturesWidget";

export default function Home() {
  const [articles, setArticles] = useState([]);

  // Fetch news data
  useEffect(() => {
    axios
      .get("/api/news")
      .then((response) => {
        const allArticles = Object.values(response.data).flat();
        setArticles(allArticles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-5 flex flex-col lg:flex-row min-h-screen">
        {/* Centered content */}
        {/* <div className="w-full lg:w-3/4 mx-auto"> */}
          {/* Left side - Headlines */}
          <div className="w-full lg:w-2/3 pr-5">
            <Headlines articles={articles} />
          </div>

          {/* Right side - Weather and Live Scores */}
          <div className="w-full lg:w-1/3">
            <div className="mb-5">
              <WeatherWidget />
            </div>
            <div className="mb-5">
              <LiveScoresWidget />
            </div>
            <div>
              <FixturesWidget />
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}