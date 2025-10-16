import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// ✅ DateFilter Component — allows user to select a date (within 7 days) to search weather
const DateFilter = ({ selectedDate, setSelectedDate, onSearch }) => {
  // Get today's date
  const today = new Date();

  // Calculate date 7 days from today
  const sevenDaysAhead = new Date();
  sevenDaysAhead.setDate(today.getDate() + 7);

  return (
    <div className="date-filter-section mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          {/* Title Section */}
          <h6 className="card-title mb-3">
            <i className="bi bi-calendar-date me-2"></i>
            Search Weather by Date
          </h6>

          {/* Date picker and button in a row */}
          <div className="row align-items-center">
            
            {/* Date Picker Column */}
            <div className="col-md-8">
              <DatePicker
                selected={selectedDate}              // Selected date value
                onChange={(date) => setSelectedDate(date)} // Update selected date on change
                dateFormat="MMMM d, yyyy"            // Display format (e.g., October 16, 2025)
                minDate={today}                      // Minimum selectable date = today
                maxDate={sevenDaysAhead}             // Maximum selectable date = 7 days ahead
                placeholderText="Select a date"      // Placeholder text
                className="form-control date-input"  // Bootstrap styling
                showPopperArrow={false}              // Removes the arrow popup
                isClearable                          // Allows user to clear date
              />

              {/* Info Text */}
              <small className="text-muted d-block mt-2">
                <i className="bi bi-info-circle me-1"></i>
                Select a date within the next 7 days
              </small>
            </div>

            {/* Search Button Column */}
            <div className="col-md-4 mt-3 mt-md-0">
              <button 
                className="btn btn-primary w-100"
                onClick={onSearch}                  // Trigger search when clicked
                disabled={!selectedDate}            // Disable button if no date is selected
              >
                <i className="bi bi-search me-2"></i>
                Search Date
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export component for use in other files
export default DateFilter;
