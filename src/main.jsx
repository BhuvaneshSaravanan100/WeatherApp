// Import React's StrictMode to highlight potential problems in the app
import { StrictMode } from 'react'

// Import React 18's new root API to render the app
import { createRoot } from 'react-dom/client'

// Import Bootstrap CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Bootstrap JS bundle for components like accordion, modal, etc.
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import global custom CSS
import './index.css'

// Import the main App component
import App from './App.jsx' // <-- Missing import added

// Create the root element and render the app inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Main app component */}
  </StrictMode>,
)
