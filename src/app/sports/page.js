"use client"

import { useState, useEffect } from "react";

export default function Sports() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/api/sports")
      .then((res) => res.json())
      .then((data) => setMatches(data.response || []));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Live Sports Updates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((match, index) => (
          <div key={index} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">
              {match.teams.home.name} vs {match.teams.away.name}
            </h2>
            <p className="mt-2 text-gray-700">Status: {match.fixture.status.long}</p>
            <p className="mt-2 text-gray-700">Date: {new Date(match.fixture.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
