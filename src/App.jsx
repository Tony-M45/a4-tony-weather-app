import { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const API_KEY = "617eef3e28606cbe3a95d6edbfa6ea3d";

 const handleSearch = async () => {
  if (city.trim() === "") {
    setError("Please enter a city name.");
    setWeather(null);
    setSearched(false);
    return;
  }

  try {
    setLoading(true);
    setError("");
    setSearched(true);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      setError(data.message || "City not found.");
      setWeather(null);
      return;
    }

    setWeather(data);
  } catch (err) {
    setError("Failed to fetch weather data.");
    setWeather(null);
  } finally {
    setLoading(false);
  }
};

  return (
  <div>
    <h1>React Weather App</h1>

    <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

    {loading && <p>Loading...</p>}

    {error && <p>Error: {error}</p>}

    {!loading && !error && searched && !weather && (
      <p>No data found.</p>
    )}

    <WeatherCard weather={weather} />
  </div>
  );
}

export default App;