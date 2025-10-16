// Importing React core and Hooks
import React, { useState, useEffect } from 'react';

// Importing axios for API calls
import axios from 'axios';

// Importing all components used in this app
import Navbar from '../src/Components/Navbar';
import SearchBar from '../src/Components/SearchBar';
import Current from '../src/Components/Current';
import Forecast from '../src/Components/Forecast';
import WeatherDetails from '../src/Components/WeatherDetails';
import DateFilter from '../src/Components/DateFilter';
import FilteredForecast from '../src/Components/FilteredForecast';
import Loader from '../src/Components/Loader';
import ErrorAlert from '../src/Components/ErrorAlert';

// Import global styles
import '../src/index.css';

const App = () => {
  // -------------------- STATE VARIABLES --------------------

  // City name entered by user
  const [city, setCity] = useState('');

  // Autocomplete suggestions for city names
  const [citySuggestions, setCitySuggestions] = useState([]);

  // Stores current weather data
  const [currentWeather, setCurrentWeather] = useState(null);

  // Stores 7-day forecast data
  const [forecast, setForecast] = useState(null);

  // Stores location data (like name, region, country)
  const [location, setLocation] = useState(null);

  // Selected city name
  const [selectedCity, setSelectedCity] = useState('');

  // Loading spinner state
  const [loading, setLoading] = useState(false);

  // Error message for failed API requests
  const [error, setError] = useState('');

  // Temperature unit toggle (°C or °F)
  const [unit, setUnit] = useState('C');

  // Stores last 5 searched cities
  const [recentSearches, setRecentSearches] = useState([]);

  // Selected date for filtered forecast
  const [selectedDate, setSelectedDate] = useState(null);

  // Controls whether date filter should be visible
  const [showDateFilter, setShowDateFilter] = useState(false);

  // -------------------- WEATHER API DETAILS --------------------
  const API_KEY = '83c0b17cb2774eac95723527231501';

  // URL for autocomplete suggestions
  const autocompleteURL = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=`;

  // Function to build forecast API URL
  const WeatherURL = (city) => 
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`;

  // -------------------- USE EFFECTS --------------------

  // Load recent searches from localStorage when app starts
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Fetch city suggestions whenever user types 3+ characters
  useEffect(() => {
    if (city && city.length > 2) {
      FetchAutocomplete();
    } else {
      setCitySuggestions([]);
    }
  }, [city]);

  // -------------------- FUNCTIONS --------------------

  // Fetch autocomplete city list from API
  const FetchAutocomplete = async () => {
    try {
      const response = await axios.get(autocompleteURL + city);
      const cityData = response.data.map((data) => 
        `${data.name}, ${data.region}, ${data.country}`
      );
      setCitySuggestions(cityData);
    } catch (e) {
      console.error('Autocomplete Error:', e);
    }
  };

  // When user selects a city from suggestions
  const HandleSelectedCity = (cityName) => {
    setSelectedCity(cityName);
    setCity('');
    setCitySuggestions([]);
    FetchWeatherData(cityName);     // Fetch weather for selected city
    AddToRecentSearches(cityName);  // Add to recent search history
    setShowDateFilter(true);        // Show date filter UI
    setSelectedDate(null);
  };

  // Fetch full weather data (current + forecast)
  const FetchWeatherData = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(WeatherURL(cityName));
      const data = response.data;
      setCurrentWeather(data.current);
      setForecast(data.forecast);
      setLocation(data.location);
    } catch (e) {
      setError('Unable to fetch weather data. Please try again.');
      console.error('Weather API Error:', e);
    } finally {
      setLoading(false);
    }
  };

  // Add city to recent searches and limit to 5
  const AddToRecentSearches = (cityName) => {
    const updated = [cityName, ...recentSearches.filter(c => c !== cityName)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Toggle temperature unit between °C and °F
  const ToggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  // Clear all displayed data and reset state
  const ClearData = () => {
    setCurrentWeather(null);
    setForecast(null);
    setLocation(null);
    setSelectedCity('');
    setError('');
    setShowDateFilter(false);
    setSelectedDate(null);
  };

  // Scroll to filtered forecast when date is selected
  const HandleDateSearch = () => {
    if (selectedDate && forecast) {
      const element = document.querySelector('.filtered-forecast-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // -------------------- UI (RENDER SECTION) --------------------
  return (
    <>
      {/* Navbar Component */}
      <Navbar />

      <div className="container my-5">
        <div className="weather-container p-4 rounded shadow-lg">

          {/* App Title */}
          <h1 className="text-center mb-4 app-title">
            🌤️ Weather Forecast
          </h1>

          {/* Search Bar Component */}
          <SearchBar
            city={city}
            setCity={setCity}
            selectedCity={selectedCity}
            citySuggestions={citySuggestions}
            HandleSelectedCity={HandleSelectedCity}
            recentSearches={recentSearches}
            ClearData={ClearData}
          />

          {/* Error Message */}
          {error && <ErrorAlert message={error} onClose={() => setError('')} />}
          
          {/* Loader Spinner */}
          {loading && <Loader />}

          {/* When data is loaded successfully */}
          {!loading && currentWeather && location && (
            <>
              {/* Current Weather Info */}
              <Current
                current={currentWeather}
                location={location}
                unit={unit}
                ToggleUnit={ToggleUnit}
              />
              
              {/* Extra Weather Details */}
              <WeatherDetails current={currentWeather} />

              {/* Date Filter UI */}
              {showDateFilter && (
                <DateFilter
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onSearch={HandleDateSearch}
                />
              )}

              {/* Filtered Forecast (for selected date) */}
              {selectedDate && (
                <FilteredForecast
                  forecast={forecast}
                  unit={unit}
                  selectedDate={selectedDate}
                />
              )}
              
              {/* Default 7-day Forecast */}
              {forecast && !selectedDate && (
                <Forecast forecast={forecast} unit={unit} />
              )}
            </>
          )}

          {/* Default Welcome Message */}
          {!loading && !currentWeather && !error && (
            <div className="text-center py-5 welcome-message">
              <h3>🌍 Welcome!</h3>
              <p className="text-muted">Search for a city to see weather information</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Exporting App component
export default App;
