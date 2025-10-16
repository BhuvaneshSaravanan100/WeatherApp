import React from 'react';

// ✅ Navbar Component — top navigation bar for the Weather app
const Navbar = () => {
  return (
    // Bootstrap navbar with gradient background and shadow
    <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary shadow">
      <div className="container">
        
        {/* Brand / App Name */}
        <span className="navbar-brand fw-bold fs-4">
          <i className="bi bi-cloud-sun-fill me-2"></i> {/* Weather icon */}
          WeatherPro
        </span>

        {/* Right-side info / badge */}
        <div className="d-flex align-items-center">
          <span className="badge bg-light text-dark">Live Updates</span>
        </div>
      </div>
    </nav>
  );
};

// Export component for reuse
export default Navbar;
