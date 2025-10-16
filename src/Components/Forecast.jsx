import React from 'react';

// ✅ Forecast Component — displays a 7-day weather forecast using an accordion layout
const Forecast = ({ forecast, unit }) => {
  return (
    <div className="forecast-section">
      {/* Section Header */}
      <h5 className="mb-3">
        <i className="bi bi-calendar-week me-2"></i>
        7-Day Forecast
      </h5>

      {/* Bootstrap Accordion to toggle each day's weather */}
      <div className="accordion" id="forecastAccordion">
        {forecast.forecastday.map((day, idx) => (
          <div className="accordion-item" key={idx}>
            {/* Accordion Header for each day */}
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${idx !== 0 ? 'collapsed' : ''}`} // Only first day open by default
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${idx}`} // Connects to accordion body
                aria-expanded={idx === 0}
              >
                {/* Layout for day summary row */}
                <div className="d-flex align-items-center w-100">
                  
                  {/* Date (weekday + month/day) */}
                  <div className="forecast-date me-3">
                    <strong>
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </strong>
                    <small className="d-block text-muted">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </small>
                  </div>

                  {/* Weather Icon */}
                  <img 
                    src={day.day.condition.icon} 
                    alt={day.day.condition.text}
                    className="forecast-icon me-3"
                  />

                  {/* Weather Condition (Sunny, Rainy, etc.) */}
                  <span className="me-auto">{day.day.condition.text}</span>

                  {/* Max / Min Temperature */}
                  <span className="temp-range">
                    <span className="text-danger fw-bold">
                      {Math.round(unit === 'C' ? day.day.maxtemp_c : day.day.maxtemp_f)}°
                    </span>
                    <span className="mx-1">/</span>
                    <span className="text-primary">
                      {Math.round(unit === 'C' ? day.day.mintemp_c : day.day.mintemp_f)}°
                    </span>
                  </span>
                </div>
              </button>
            </h2>

            {/* Accordion Body — Hourly breakdown every 3 hours */}
            <div
              id={`collapse${idx}`}
              className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`} // First day expanded
              data-bs-parent="#forecastAccordion"
            >
              <div className="accordion-body">
                <div className="hourly-forecast">
                  {/* Show weather every 3 hours (0, 3, 6, 9...) */}
                  {day.hour.filter((_, i) => i % 3 === 0).map((hour, hidx) => (
                    <div key={hidx} className="hourly-item">
                      
                      {/* Time (e.g., 3 AM, 6 AM) */}
                      <div className="hour-time">
                        {new Date(hour.time).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          hour12: true 
                        })}
                      </div>

                      {/* Weather Icon */}
                      <img 
                        src={hour.condition.icon} 
                        alt={hour.condition.text}
                        className="hour-icon"
                      />

                      {/* Hourly Temperature */}
                      <div className="hour-temp fw-bold">
                        {Math.round(unit === 'C' ? hour.temp_c : hour.temp_f)}°
                      </div>

                      {/* Temperature Progress Bar (visual indicator) */}
                      <div className="progress mt-2" style={{ height: '4px' }}>
                        <div
                          className="progress-bar bg-gradient"
                          style={{ 
                            width: `${Math.min((unit === 'C' ? hour.temp_c : hour.temp_f) * 2, 100)}%` 
                          }}
                        ></div>
                      </div>

                      {/* Humidity Percentage */}
                      <small className="text-muted d-block mt-1">
                        <i className="bi bi-droplet-fill"></i> {hour.humidity}%
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export component for reuse
export default Forecast;
