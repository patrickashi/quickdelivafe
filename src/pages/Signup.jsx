import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    user_type: "individual",
  });
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
    if (form.password !== form.confirm_password) {
      return alert("Passwords do not match");
    }
    const payload = { ...form };
    delete payload.confirm_password;

    setLoading(true);
    try {
      await api.post("/auth/register/", payload);
      localStorage.setItem("signup_email", form.email);
      alert("Registered successfully! Enter the verification code.");
      navigate("/verify");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-6 my-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-quickdeliva mb-6 text-center">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <Input label="Username" name="username" value={form.username} onChange={handleChange} />
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Input label="Phone Number" name="phone_number" value={form.phone_number} onChange={handleChange} />
            <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
            <Input label="Confirm Password" type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} />

            {/* User type */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">User Type</label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="user_type" value="individual"
                    checked={form.user_type === "individual"} onChange={handleChange} />
                  <span>Individual</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="user_type" value="business"
                    checked={form.user_type === "business"} onChange={handleChange} />
                  <span>E‑commerce / SME</span>
                </label>
              </div>
            </div>

            <Button className="w-full mt-2" disabled={loading}>
              {loading ? "Signing up..." : "Create Account"}
            </Button>
          </form>

          {/* Login link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-quickdeliva hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}