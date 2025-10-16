import React from 'react';

// ✅ Loader Component — displays a loading spinner and message while data is being fetched
const Loader = () => {
  return (
    // Centered container for the spinner and message
    <div className="text-center py-5">
      
      {/* Bootstrap Spinner (animated circle) */}
      <div 
        className="spinner-border text-primary"  // Blue color spinner
        role="status"
        style={{ width: '3rem', height: '3rem' }} // Spinner size
      >
        {/* Accessibility text for screen readers */}
        <span className="visually-hidden">Loading...</span>
      </div>

      {/* Loading message below spinner */}
      <p className="mt-3 text-muted">Fetching weather data...</p>
    </div>
  );
};

// Export component for reuse in other files
export default Loader;
