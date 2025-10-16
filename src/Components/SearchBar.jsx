import React from 'react';

// ✅ SearchBar Component — allows users to search for cities and shows suggestions
const SearchBar = ({ 
  city,                // Current typed city in the input field
  setCity,             // Function to update typed city
  selectedCity,        // City selected from suggestions
  citySuggestions,     // Array of suggested cities based on input
  HandleSelectedCity,  // Function to handle when a suggestion is clicked
  ClearData            // Function to clear the current selection/input
}) => {
  return (
    <div className="search-section mb-4">
      
      {/* Input group for search bar */}
      <div className="input-group input-group-lg">
        {/* Search Icon */}
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search"></i>
        </span>

        {/* City Input Field */}
        <input
          type="text"
          className="form-control border-start-0 search-input"
          placeholder="Search for a city..."
          value={city || selectedCity}  // Show typed city or selected city
          onChange={(e) => {
            setCity(e.target.value);    // Update typed city
            if (e.target.value === '') {
              ClearData();             // Clear data if input is empty
            }
          }}
        />

        {/* Clear Button (visible when a city is selected) */}
        {selectedCity && (
          <button 
            className="btn btn-outline-secondary" 
            onClick={ClearData}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {citySuggestions.length > 0 && (
        <div className="suggestions-dropdown mt-2">
          {citySuggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="suggestion-item"
              onClick={() => HandleSelectedCity(suggestion)} // Select suggestion
            >
              <i className="bi bi-geo-alt me-2"></i>
              {suggestion}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

// Export component for reuse
export default SearchBar;
