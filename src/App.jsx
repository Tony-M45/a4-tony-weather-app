import { useState } from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import ForecastList from "./ForecastList";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [forecast, setForecast] = useState([]);

  const API_KEY = "617eef3e28606cbe3a95d6edbfa6ea3d";

 const handleSearch = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name.");
      setWeather(null);
      setForecast([]);
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

      if (!response.ok) {
        setError(data.message || "City not found.");
        setWeather(null);
        setForecast([]);
        return;
      }

      setWeather(data);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const forecastData = await forecastResponse.json();

      if (forecastResponse.ok) {
        const filteredForecast = forecastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );

        setForecast(filteredForecast);
      } else {
        setForecast([]);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>React Weather App</h1>

      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && searched && !weather && <p>No data found.</p>}

      <WeatherCard weather={weather} />
      <ForecastList forecast={forecast} />
    </div>
  );
}

export default App;