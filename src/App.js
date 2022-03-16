import React, { useEffect, useState } from "react";
import "./App.css";

const api = {
  key: "2afef936f43e41bc3c087711c6373b54",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({
    country: "",
    feel: "",
    temp: "",
    des: "",
    city: "",
    main: "",
    maxTemp: "",
    minTemp: "",
    humidity: "",
    visibility: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      //Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setWeatherInfo({
            ...weatherInfo,
            country: data.sys.country,
            feel: data.main.feels_like,
            temp: data.main.temp,
            des: data.weather[0].description,
            city: data.name,
            main: data.weather[0].main,
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
            humidity: data.main.humidity,
            visibility: data.visibility,
          });
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  return (
    <>
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {errorMessage ? (
              <div style={{ color: "black", fontStyle: "italic" }}>
                ***{errorMessage}
              </div>
            ) : (
              <>
                {searchCity ? (
                  <div>
                    <div className="title">
                      {Math.round(weatherInfo.temp)}°C
                      <span>
                        {weatherInfo.city}, {weatherInfo.country}
                      </span>
                    </div>
                    <div
                      className="task-list"
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "400",
                      }}
                    >
                      Feels like {weatherInfo.feel}. {weatherInfo.main}.{" "}
                      {weatherInfo.des}
                    </div>
                    <div
                      className="task-list"
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "400",
                      }}
                    >
                      max temp: {Math.round(weatherInfo.maxTemp)}°C, min temp:{" "}
                      {Math.round(weatherInfo.minTemp)}°C
                    </div>
                    <div
                      className="task-list"
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "400",
                      }}
                    >
                      humidity: {weatherInfo.humidity}%, visibility:{" "}
                      {(weatherInfo.visibility / 1000).toFixed(1)}km
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "500",
                      fontSize: "2.6rem",
                      letterSpacing: "0.1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Weather App
                  </div>
                )}
              </>
            )}
          </>
        )}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="city"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button>Search</button>
        </form>
      </div>
    </>
  );
}

export default App;
