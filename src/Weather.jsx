import React, { useState, useEffect } from "react";

export function CurrentWeather({ location }) {
  const [options, setOptions] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Function to fetch weather data for the location
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/weather/forecast/${encodeURIComponent(location)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const results = await response.json();
      setOptions(results);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  // Function to save the current weather data to selectedLocations
  const addLocation = () => {
    if (options) {
      if (selectedLocations.length < 3) {
        const locationData = {
          currentWeather: {
            name: options.data.location.name,
            temperature: options.data.forecast.forecastday[0].day.avgtemp_f,
            condition: options.data.forecast.forecastday[0].day.condition.text,
            maxWind: options.data.forecast.forecastday[0].day.maxwind_mph,
            humidity: options.data.forecast.forecastday[0].day.avghumidity,
            chanceOfRain: options.data.forecast.forecastday[0].day.daily_chance_of_rain
          },
          forecast: options.data.forecast.forecastday.slice(1)
        };
        setSelectedLocations([...selectedLocations, locationData]);
      } else {
        alert('You can only save up to 3 different locations.');
      }
    }
  };

  // Function to remove a location from selectedLocations
  const removeLocation = (index) => {
    const updatedLocations = [...selectedLocations];
    updatedLocations.splice(index, 1);
    setSelectedLocations(updatedLocations);
  };

  // Function to get the day of the week from a date string (YYYY-MM-DD)
  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {options && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>{options.data.location.name}</h1>
          <button onClick={addLocation} style={{ marginBottom: '10px' }}>Save Location</button>
          <div style={{ marginBottom: '20px' }}>
            <h3>Current Weather:</h3>
            <p>Temperature {options.data.forecast.forecastday[0].day.avgtemp_f}°F, {options.data.forecast.forecastday[0].day.condition.text}</p>
            <p>Wind gusts up to {options.data.forecast.forecastday[0].day.maxwind_mph} mph</p>
            <p>Humidity {options.data.forecast.forecastday[0].day.avghumidity}%</p>
            <p>Chance of rain {options.data.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ width: '30%' }}>
              <h3>{getDayOfWeek(options.data.forecast.forecastday[1].date)}</h3>
              <p>Temperature: {options.data.forecast.forecastday[1].day.avgtemp_f}°F</p>
              <p>Condition: {options.data.forecast.forecastday[1].day.condition.text}</p>
              <p>Wind gusts up to : {options.data.forecast.forecastday[1].day.maxwind_mph} mph</p>
              <p>Humidity: {options.data.forecast.forecastday[1].day.avghumidity} %</p>
              <p>Chance of rain: {options.data.forecast.forecastday[1].day.daily_chance_of_rain} %</p>
            </div>
            <div style={{ width: '30%' }}>
              <h3>{getDayOfWeek(options.data.forecast.forecastday[2].date)}</h3>
              <p>Temperature: {options.data.forecast.forecastday[2].day.avgtemp_f}°F</p>
              <p>Condition: {options.data.forecast.forecastday[2].day.condition.text}</p>
              <p>Wind gusts up to : {options.data.forecast.forecastday[2].day.maxwind_mph} mph</p>
              <p>Humidity: {options.data.forecast.forecastday[2].day.avghumidity} %</p>
              <p>Chance of rain: {options.data.forecast.forecastday[2].day.daily_chance_of_rain} %</p>
            </div>
            <div style={{ width: '30%' }}>
              <h3>{getDayOfWeek(options.data.forecast.forecastday[3].date)}</h3>
              <p>Temperature: {options.data.forecast.forecastday[3].day.avgtemp_f}°F</p>
              <p>Condition: {options.data.forecast.forecastday[3].day.condition.text}</p>
              <p>Wind gusts up to : {options.data.forecast.forecastday[3].day.maxwind_mph} mph</p>
              <p>Humidity: {options.data.forecast.forecastday[3].day.avghumidity} %</p>
              <p>Chance of rain: {options.data.forecast.forecastday[3].day.daily_chance_of_rain} %</p>
            </div>
          </div>
        </div>
      )}
      
      {selectedLocations.length > 0 && (
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <h2>Saved Locations</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
            {selectedLocations.map((location, index) => (
              <div key={index} style={{ width: '30%', border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h2>{location.currentWeather.name}</h2>
                  <button onClick={() => removeLocation(index)}>Remove</button>
                </div>
                <p>Current Weather:</p>
                <p>Average Temperature: {location.currentWeather.temperature}°F</p>
                <p>Condition: {location.currentWeather.condition}</p>
                <p>Wind gusts up to : {location.currentWeather.maxWind} mph</p>
                <p>Humidity: {location.currentWeather.humidity} %</p>
                <p>Chance of rain: {location.currentWeather.chanceOfRain} %</p>
                <h3>3 Day Forecast:</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {location.forecast.map((forecastDay, forecastIndex) => (
                    <div key={forecastIndex} style={{ width: '30%' }}>
                      <h4>{getDayOfWeek(forecastDay.date)}</h4>
                      <p>Temperature: {forecastDay.day.avgtemp_f}°F</p>
                      <p>Condition: {forecastDay.day.condition.text}</p>
                      <p>Wind gusts up to : {forecastDay.day.maxwind_mph} mph</p>
                      <p>Humidity: {forecastDay.day.avghumidity} %</p>
                      <p>Chance of rain: {forecastDay.day.daily_chance_of_rain} %</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
