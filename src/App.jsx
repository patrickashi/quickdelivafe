import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Orders from "./pages/Orders";
import Transactionhistoryp from "./pages/Transactionhistoryp";

function App() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Force light theme for certain public routes
  useEffect(() => {
    const path = window.location.pathname;
    const publicRoutes = ["/", "/about", "/contact", "/faq", "/login", "/signup", "/verify"];
    if (publicRoutes.includes(path)) {
      setDarkMode(false); // 🔥 keep light only
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Unauthenticated */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/transactionhistoryp" element={<Transactionhistoryp />} />
        
        {/* Authenticated - dark/light toggle allowed */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;