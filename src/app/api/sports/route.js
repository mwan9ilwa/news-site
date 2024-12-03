import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const dateFrom = searchParams.get("dateFrom") || new Date().toISOString().split("T")[0];
  const dateTo = searchParams.get("dateTo") || new Date(new Date(dateFrom).setDate(new Date(dateFrom).getDate() + 6)).toISOString().split("T")[0];
  const competition = searchParams.get("competition");

  try {
    const response = await axios.get("https://sportscore1.p.rapidapi.com/sports/1/events/live", {
      headers: {
        'x-rapidapi-key': '883819ac75msh005244a45649db2p16fe9bjsn7585d61bff50',
        'x-rapidapi-host': 'sportscore1.p.rapidapi.com'
      },
      params: {
        dateFrom,
        dateTo,
        competitions: competition,
        status: "LIVE",
      },
    });

    const transformedData = response.data.data.map(event => ({
      id: event.id,
      slug: event.slug,
      name: event.name,
      status: event.status,
      league: event.league,
      round_number: event.round_number,
      series_count: event.series_count,
      lasted_period: event.lasted_period,
      status_more: event.status_more,
      time_details: event.time_details,
      currentPeriodStartTimestamp: event.time_details?.currentPeriodStartTimestamp,
      competition: event.competition,
      home_team: event.home_team,
      away_team: event.away_team,
      start_at: event.start_at,
      home_score: event.home_score,
      away_score: event.away_score,
    }));

    return new Response(JSON.stringify({ data: transformedData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching live events data:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch live events data." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
