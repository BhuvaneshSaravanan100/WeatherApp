import React from 'react';

// ✅ WeatherDetails Component — displays key weather parameters in a responsive grid
const WeatherDetails = ({ current }) => {
  // Array of weather details to display with icons, labels, values, and colors
  const details = [
    { icon: 'bi-droplet-fill', label: 'Humidity', value: `${current.humidity}%`, color: 'text-info' },
    { icon: 'bi-wind', label: 'Wind Speed', value: `${current.wind_kph} km/h`, color: 'text-primary' },
    { icon: 'bi-eye-fill', label: 'Visibility', value: `${current.vis_km} km`, color: 'text-success' },
    { icon: 'bi-speedometer2', label: 'Pressure', value: `${current.pressure_mb} mb`, color: 'text-warning' },
    { icon: 'bi-moisture', label: 'Precipitation', value: `${current.precip_mm} mm`, color: 'text-secondary' },
    { icon: 'bi-upc', label: 'UV Index', value: current.uv, color: 'text-danger' }
  ];

  return (
    <div className="weather-details-grid mb-4">
      {/* Section Header */}
      <h5 className="mb-3">
        <i className="bi bi-info-circle me-2"></i>
        Weather Details
      </h5>

      {/* Grid Layout for Details */}
      <div className="row g-3">
        {details.map((detail, idx) => (
          <div key={idx} className="col-6 col-md-4 col-lg-2">
            {/* Individual Detail Card */}
            <div className="detail-card text-center p-3">
              {/* Icon with color and size */}
              <i className={`bi ${detail.icon} ${detail.color} fs-3`}></i>

              {/* Value */}
              <p className="detail-value fw-bold mb-0 mt-2">{detail.value}</p>

              {/* Label */}
              <small className="text-muted">{detail.label}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export component for reuse
export default WeatherDetails;
