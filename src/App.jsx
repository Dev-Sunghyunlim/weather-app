import { useState, useEffect } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ClipLoader } from "react-spinners";

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["Jakarta", "London", "Osaka"];
  const [city, setCity] = useState("Current Location");
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  const API_KEY = "90148995e9bce04a4c04e73f67d51948";

  const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = (lat, lon) => {
    let Url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    weatherDataUpdate(Url);
  };

  const getWeatherByCityName = () => {
    let Url = new URL(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    weatherDataUpdate(Url);
  };

  const weatherDataUpdate = async (Url) => {
    try {
      setLoading(true);
      const response = await fetch(Url);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };
  console.log("weather", weather);

  const getWeatherData = () => {
    if (city === "Current Location") {
      getUserCoordinates();
    } else {
      getWeatherByCityName(city);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, [city]);

  return (
    <Container>
      {loading ? (
        <div className="main">
          <div className="weather-board">
            <ClipLoader
              color="#f88c6b"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      ) : !apiError ? (
        <div className="main">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} selected={city} setCity={setCity} />
        </div>
      ) : (
        apiError
      )}
      ;
    </Container>
  );
}

export default App;
