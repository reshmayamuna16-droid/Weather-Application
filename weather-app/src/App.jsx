import { useState } from "react";
import "./App.css";

function App() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const checkWeather = async () => {
    if (city === "") return;

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.status === 404) {
      setError(true);
      setWeather(null);
      return;
    }

    setError(false);
    setWeather(data);
  };

  const weatherImage = () => {
  if (!weather) return "";

  switch (weather.weather[0].main) {
    case "Clouds":
      return "/clouds.png";

    case "Clear":
      return "/clear.png";

    case "Rain":
      return "/rain.png";

    case "Drizzle":
      return "/drizzle.png";

    case "Mist":
      return "/mist.png";

    case "Snow":
      return "/snow.png";

    default:
      return "/clear.png";
  }
};

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={checkWeather}>
        <img src="/search.png" alt="Search" />
        </button>
      </div>

      {error && (
        <div className="error">
          <p>Invalid City Name</p>
        </div>
      )}

      {weather && (
        <div className="weather">
          <img
            src={weatherImage()}
            className="weather-icon"
            alt=""
          />

          <h1>{Math.round(weather.main.temp)}°C</h1>

          <h2>{weather.name}</h2>

          <div className="details">
            <div className="col">
              <img src="/humidity.png" alt="" />

              <div>
                <p className="humidity">
                  {weather.main.humidity}%
                </p>

                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img src="/wind.png" alt="" />

              <div>
                <p className="wind">
                  {weather.wind.speed} km/h
                </p>

                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

