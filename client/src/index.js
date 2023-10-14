// Import React and ReactDOM libraries
import React from "react"; 
import ReactDOM from "react-dom";

// Import the App component 
import App from "./App";

// Import BrowserRouter component from react-router-dom for routing
import { BrowserRouter } from "react-router-dom";

// Render App component wrapped in Router to the DOM
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root") 
);