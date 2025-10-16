// Importing React library
import React from 'react';

// Functional component: shows current weather info
const Current = ({ current, location, unit, ToggleUnit }) => {

  // Determine the correct temperature unit (Celsius or Fahrenheit)
  const temp = unit === 'C' ? current.temp_c : current.temp_f;

  // Determine the correct "feels like" temperature
  const feelsLike = unit === 'C' ? current.feelslike_c : current.feelslike_f;

  return (
    // Main container for current weather card
    <div className="current-weather-card mb-4">
      <div className="row align-items-center">
        
        {/* ---------- LEFT SIDE: LOCATION + TEMPERATURE ---------- */}
        <div className="col-md-6">
          
          {/* Location name and pin icon */}
          <h2 className="location-name mb-1">
            <i className="bi bi-geo-alt-fill text-danger me-2"></i>
            {location.name}
          </h2>

          {/* Region and country */}
          <p className="location-details mb-3">
            {location.region}, {location.country}
          </p>

          {/* Weather icon + temperature + condition */}
          <div className="d-flex align-items-center">
            
            {/* Weather condition image (like sun, cloud, rain icon) */}
            <img 
              src={current.condition.icon} 
              alt={current.condition.text}
              className="weather-icon-large me-3"
            />

            <div>
              {/* Temperature display */}
              <h1 className="temperature-display mb-0">
                {Math.round(temp)}°{unit}
              </h1>

              {/* Weather condition text (e.g. Cloudy, Sunny) */}
              <p className="condition-text mb-1">{current.condition.text}</p>

              {/* Feels like temperature */}
              <p className="feels-like">
                <i className="bi bi-thermometer-half me-1"></i>
                Feels like {Math.round(feelsLike)}°{unit}
              </p>
            </div>
          </div>
        </div>
        
        {/* ---------- RIGHT SIDE: BUTTON + TIME INFO ---------- */}
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          
          {/* Unit toggle button (C ↔ F) */}
          <button 
            className="btn btn-light btn-lg mb-3 toggle-btn"
            onClick={ToggleUnit}
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            Switch to °{unit === 'C' ? 'F' : 'C'}
          </button>

          {/* Local time of the selected city */}
          <div className="local-time">
            <i className="bi bi-clock-fill me-2"></i>
            <span>
              Local Time: <strong>{location.localtime}</strong>
            </span>
          </div>

          {/* Last updated time (converted to local readable format) */}
          <div className="last-updated mt-2">
            <i className="bi bi-arrow-clockwise me-2"></i>
            <small>
              Updated: {new Date(current.last_updated).toLocaleTimeString()}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component for use in App.js
export default Current;
