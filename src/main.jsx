import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'   // ⬅️ this line expects App.jsx to have "export default App"
import './index.css'
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)