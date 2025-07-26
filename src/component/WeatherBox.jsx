import React from "react";

const WeatherBox = ({ weather }) => {
  return (
    <div className="weather-board">
      <div className="city">{weather?.name}</div>
      <div className="degree">
        {Math.floor(weather?.main.temp * 10) / 10} °C /
        {Math.floor(((weather?.main.temp * 9) / 5) * 10) / 10 + 32} ℉
      </div>
      <div className="W-condition">{weather?.weather["0"].description}</div>
    </div>
  );
};

export default WeatherBox;
