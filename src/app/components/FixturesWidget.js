import { useState, useEffect } from "react";
import axios from "axios";

export default function FixturesWidget() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/sports", {
        params: {
          status: "LIVE",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setEvents([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching live scores:", error);
        setEvents([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading live events...</div>;
  }

  // Group events by competition
  const eventsByCompetition = events.reduce((acc, event) => {
    const competitionName = event.competition?.name || "Other";
    if (!acc[competitionName]) {
      acc[competitionName] = [];
    }
    acc[competitionName].push(event);
    return acc;
  }, {});

  // Define top five European competitions
  const topCompetitions = ["Premier League", "La Liga", "Serie A", "Bundesliga", "Ligue 1"];

  return (
    <div className="bg-[#292a2d] p-4 rounded-3xl">
      <h3 className="font-semibold text-lg">Fixtures</h3>
      {topCompetitions.concat(Object.keys(eventsByCompetition)).map((competition, index) => (
        <div key={index}>
          {eventsByCompetition[competition] && (
            <>
              <h4 className="font-semibold text-md">{competition}</h4>
              {eventsByCompetition[competition].map((event, idx) => (
                <div key={idx} className="mb-4">
                  <h5 className="font-semibold text-md">{event.name}</h5>
                  <p>Status: {event.status}</p>
                  <div className="flex items-center">
                    <img src={event.home_team.logo} alt={event.home_team.name} className="w-8 h-8 mr-2" />
                    <span>{event.home_team.name}</span>
                    <span className="mx-2">vs</span>
                    <img src={event.away_team.logo} alt={event.away_team.name} className="w-8 h-8 mr-2" />
                    <span>{event.away_team.name}</span>
                  </div>
                  <p>
                    Score: {event.home_score.current} - {event.away_score.current}
                  </p>
                  <p>Date: {new Date(event.start_at).toLocaleDateString()}</p>
                  <p>Time: {new Date(event.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
