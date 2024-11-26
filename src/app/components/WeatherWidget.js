import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        axios
          .get(`/api/weather?lat=${latitude}&lon=${longitude}`)
          .then((response) => {
            setWeather(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            setLoading(false);
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div>Loading weather...</div>;
  }

  const temperatureCelsius = weather.main.temp;

  return (
    <div className="bg-[#292a2d] p-4 rounded-3xl">
      <h3 className="font-semibold text-xl mb-4">Weather</h3>
      <h3 className="font-semibold text-lg">{weather.name}</h3>
      <p>{weather.weather[0].description}</p>
      <p className="font-bold text-2xl">{temperatureCelsius.toFixed(2)}°C</p>
    </div>
  );
}
