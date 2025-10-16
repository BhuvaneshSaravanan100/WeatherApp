import React from 'react';

// ✅ FilteredForecast Component — shows detailed weather data for a selected date
const FilteredForecast = ({ forecast, unit, selectedDate }) => {
  // If forecast or date not available, don't render anything
  if (!forecast || !selectedDate) return null;

  // Helper function to convert date object to "YYYY-MM-DD" format (for comparison)
  const FormatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Format the selected date into string
  const selectedDateStr = FormatDate(selectedDate);

  // Find the forecast data matching the selected date
  const filteredDay = forecast.forecastday.find(
    day => day.date === selectedDateStr
  );

  // If no weather data found for that date, show a message
  if (!filteredDay) {
    return (
      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        No weather data available for {selectedDate.toLocaleDateString()}
      </div>
    );
  }

  return (
    <div className="filtered-forecast-section mb-4">
      <div className="card shadow-sm">
        {/* Header — shows selected date in readable format */}
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="bi bi-calendar-check me-2"></i>
            Weather for {new Date(filteredDay.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h5>
        </div>

        {/* Card Body — contains weather details */}
        <div className="card-body">
          {/* Overall Day Summary */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                
                {/* Left Section — Weather condition, icon, and temperature */}
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={filteredDay.day.condition.icon} // Weather condition icon
                    alt={filteredDay.day.condition.text}
                    className="weather-icon-medium me-3"
                  />
                  <div>
                    <h4 className="mb-1">{filteredDay.day.condition.text}</h4>
                    <p className="text-muted mb-0">
                      {/* Max temperature */}
                      <span className="text-danger fw-bold fs-5">
                        {Math.round(unit === 'C' ? filteredDay.day.maxtemp_c : filteredDay.day.maxtemp_f)}°
                      </span>
                      <span className="mx-2">/</span>
                      {/* Min temperature */}
                      <span className="text-primary fw-bold fs-5">
                        {Math.round(unit === 'C' ? filteredDay.day.mintemp_c : filteredDay.day.mintemp_f)}°
                      </span>
                    </p>
                  </div>
                </div>
                
                {/* Right Section — Stats like humidity, wind, and rain */}
                <div className="weather-stats">
                  <div className="stat-item">
                    <i className="bi bi-droplet-fill text-info"></i>
                    <span>Humidity: {filteredDay.day.avghumidity}%</span>
                  </div>
                  <div className="stat-item">
                    <i className="bi bi-wind text-primary"></i>
                    <span>Wind: {filteredDay.day.maxwind_kph} km/h</span>
                  </div>
                  <div className="stat-item">
                    <i className="bi bi-umbrella text-warning"></i>
                    <span>Rain: {filteredDay.day.daily_chance_of_rain}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hourly Breakdown Section */}
          <h6 className="mb-3">
            <i className="bi bi-clock-history me-2"></i>
            Hourly Breakdown
          </h6>

          {/* Scrollable section for hourly data */}
          <div className="hourly-scroll">
            {filteredDay.hour.map((hour, idx) => (
              <div key={idx} className="hourly-card">
                {/* Time */}
                <div className="hour-time fw-bold">
                  {new Date(hour.time).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    hour12: true 
                  })}
                </div>

                {/* Hourly weather icon */}
                <img 
                  src={hour.condition.icon} 
                  alt={hour.condition.text}
                  className="hour-icon my-2"
                />

                {/* Temperature for that hour */}
                <div className="hour-temp text-primary fw-bold">
                  {Math.round(unit === 'C' ? hour.temp_c : hour.temp_f)}°
                </div>

                {/* Condition text (e.g., Sunny, Cloudy) */}
                <small className="text-muted">
                  {hour.condition.text}
                </small>

                {/* Extra details: Humidity and Wind */}
                <div className="mt-2">
                  <small className="d-block">
                    <i className="bi bi-droplet-fill text-info"></i> {hour.humidity}%
                  </small>
                  <small className="d-block">
                    <i className="bi bi-wind text-primary"></i> {hour.wind_kph} km/h
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component for reuse
export default FilteredForecast;
