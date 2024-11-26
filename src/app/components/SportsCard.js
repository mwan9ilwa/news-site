export default function SportsCard({ homeTeam, awayTeam, status, date }) {
    return (
      <div className="border rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">
          {homeTeam} vs {awayTeam}
        </h2>
        <p className="text-gray-700 mb-2">Status: {status}</p>
        <p className="text-gray-700">Date: {new Date(date).toLocaleString()}</p>
      </div>
    );
  }
  