import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { api_url } from './api';

function App() {
  const [cities, setCities] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState('');

  const getWeatherData = () => {
    setError('');
    axios
      .post(`${api_url}/getweather`, { cities: cities.split(',') })
      .then(response => {
        setWeatherData(response.data.weather);
      })
      .catch(error => {
        setError('Something went wrong');
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <div className="input-container">
        <label htmlFor="cities">Enter cities:</label>
        <input
          type="text"
          id="cities"
          value={cities}
          onChange={e => setCities(e.target.value)}
          placeholder="Enter cities"
        />
      </div>
      <button onClick={getWeatherData}>Get Weather</button>

      <div className="weather-results">
        {Object.keys(weatherData).map(city => (
          <p key={city}>
            {city}: {weatherData[city]}
          </p>
        ))}
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
