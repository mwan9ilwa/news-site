import { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function LiveScoresWidget() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

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

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          const now = Date.now();
          const startTimestamp = event.currentPeriodStartTimestamp * 1000; // Convert to milliseconds
          let durationMinutes = Math.floor((now - startTimestamp) / 60000); // Convert milliseconds to minutes

          if (event.status_more.toLowerCase() === "halftime") {
            return { ...event, currentMinute: 45 };
          } else if (event.status_more.toLowerCase() === "2nd half") {
            durationMinutes += 45; // Add 45 minutes for the second half
          }

          if (durationMinutes > 90) {
            return { ...event, currentMinute: `90+${durationMinutes - 90}` };
          }

          return { ...event, currentMinute: durationMinutes };
        })
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [events]);

  if (loading) {
    return <div>Loading live events...</div>;
  }

  // Group events by league
  const eventsByCompetition = events.reduce((acc, event) => {
    const competitionName = event.league.name;
    if (!acc[competitionName]) {
      acc[competitionName] = [];
    }
    acc[competitionName].push(event);
    return acc;
  }, {});

  // Define top five European competitions
  const topCompetitions = [
    "Premier League",
    "La Liga",
    "Serie A",
    "Bundesliga",
    "Ligue 1",
  ];

  return (
    <div className="bg-[#292a2d] p-4 rounded-3xl">
      <h3 className="font-semibold text-lg">Live Events</h3>
      {topCompetitions
        .concat(Object.keys(eventsByCompetition))
        .map((league, index) => (
          <div key={index}>
            {eventsByCompetition[league] && (
              <>
                <h4 className="font-semibold text-md">{league}</h4>
                {eventsByCompetition[league].map((event, idx) => (
                  <div
                    key={idx}
                    className="mb-4 p-4 bg-[#292a2d] rounded-3xl hover:bg-gray-900 cursor-pointer transition-colors"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    <div className="flex items-center">
                      <img
                        src={event.home_team.logo}
                        alt={event.home_team.name_code}
                        className="w-6 h-6 mr-2"
                      />
                      <div className="flex-1 text-right border-r border-gray-300 pr-2">
                        <span>
                          {event.home_team.name.length > 15
                            ? event.home_team.name.slice(0, 15) + "..."
                            : event.home_team.name}{" "}
                          : {event.home_score.current}
                        </span>
                      </div>
                      <div className="flex-1 text-center">
                        <span>{event.status_more}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={event.away_team.logo}
                        alt={event.away_team.name_code}
                        className="w-6 h-6 mr-2"
                      />
                      <div className="flex-1 text-right border-r border-gray-300 pr-2">
                        <span>
                          {event.away_team.name.length > 15
                            ? event.away_team.name.slice(0, 15) + "..."
                            : event.away_team.name}{" "}
                          : {event.away_score.current}
                        </span>
                      </div>
                      <div className="flex-1 text-center">
                        <span style={{ color: 'green' }}>
                          Minute: {event.currentMinute}
                          <span className="flashing-asterisk">*</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
    </div>
  );
}
