import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Login() {
  const [form, setForm] = useState({ login: "", password: "" });
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setDarkMode } = useContext(ThemeContext);

  // 🔒 Force light theme on load
  useEffect(() => {
    setDarkMode(false);
  }, [setDarkMode]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(form.login, form.password);
      navigate("/dashboard"); 
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="font-[sora] text-2xl font-semibold text-quickdeliva mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email or Username"
              name="login"
              value={form.login}
              onChange={handleChange}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <Button className="w-full mt-4" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Signup link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-quickdeliva hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}