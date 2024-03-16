
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';

function App() {
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('Colombo');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMoreDays, setShowMoreDays] = useState(false); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const apiKey = '45e6d7978161b3f90792c7c459de4f81';

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

  useEffect(() => {
    if (loggedIn && location) {
      axios.get(weatherUrl)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data: ', error);
        });

      axios.get(forecastUrl)
        .then((response) => {
          const formattedForecast = response.data.list.reduce((acc, item) => {
            const date = item.dt_txt.split(' ')[0];
            if (!acc.some(forecastItem => forecastItem.date === date)) {
              acc.push({
                date: date,
                temp: item.main.temp.toFixed() + '°C',
                weather: item.weather[0].main,
              });
            }
            return acc;
          }, []);
          setForecast(formattedForecast.slice(0, showMoreDays ? 7 : 3)); 
        })
        .catch((error) => {
          console.error('Error fetching forecast data: ', error);
        });
    }
  }, [loggedIn, location, showMoreDays]);

  const handleLogin = () => {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'admin';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setLoggedIn(true);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLocation(event.target.value);
    }
  };

  return (
    <div className="app">
      {!loggedIn ? (
        <Login
          onLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          error={error}
        />
      ) : (
        
        <div className="wrap">
          <button className='logout-button' onClick={handleLogout}>Logout</button>
          <div className="search">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Enter Location"
              type="text"
            />
          </div>
          
          {data.name && (
            <div className="container">
              <div className="top">
                <div className="location">
                  <p>{data.name}</p>
                </div>
                <div className="temp">
                  <h1>{data.main.temp.toFixed()}°C</h1>
                </div>
                <div className="description">
                  <p>{data.weather[0].main}</p>
                </div>
              </div>
              <div className="bottom">
                <div className="feels">
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                  <p>Feels Like</p>
                </div>
                <div className="humidity">
                  <p className="bold">{data.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
                <div className="wind">
                  <p className="bold">{data.wind.speed.toFixed()} m/s</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          )}

          {forecast.length > 0 && (
            <div className="top">
              <div className="forecast">
                {forecast.map((item, index) => (
                  <div key={index} className="forecast-card">
                    <p>{item.date}</p>
                    <p>{item.temp}</p>
                    <p>{item.weather}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className='show-button' onClick={() => setShowMoreDays(!showMoreDays)}>
            {showMoreDays ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;