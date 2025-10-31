import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'   // ⬅️ this line expects App.jsx to have "export default App"
import "leaflet/dist/leaflet.css";
import './index.css'
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)