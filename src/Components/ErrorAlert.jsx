import React from 'react';

// ✅ ErrorAlert Component — displays an error message with a close button
const ErrorAlert = ({ message, onClose }) => {
  return (
    // Bootstrap alert box with red color (danger)
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      {/* Error icon using Bootstrap Icons */}
      <i className="bi bi-exclamation-triangle-fill me-2"></i>

      {/* The actual error message passed as a prop */}
      {message}

      {/* Close button to dismiss the alert */}
      <button 
        type="button" 
        className="btn-close"     // Bootstrap close icon
        onClick={onClose}         // Trigger the parent’s onClose handler
        aria-label="Close"        // Accessibility label for screen readers
      ></button>
    </div>
  );
};

// Export component so it can be reused across the app
export default ErrorAlert;
