import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selected, setCity }) => {
  return (
    <div className="menu-board">
      <Button
        variant={selected === "Current Location" ? "light" : "outline-light"}
        onClick={() => setCity("Current Location")}
      >
        Current Location
      </Button>

      {cities.map((item) => (
        <Button
          variant={selected === item ? "light" : "outline-light"}
          onClick={() => setCity(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
