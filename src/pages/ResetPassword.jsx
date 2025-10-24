import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Input from "../components/Input";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd1 !== pwd2) {
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/password-reset-confirm/", {
        uid,
        token,
        password: pwd1,
      });
      setMessage(res.data.detail || "Password reset successful!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-comfortaa">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-16">
        <h1 className="text-3xl font-[sora] font-bold text-quickdeliva mb-6 text-center">
          Set New Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4"
        >
          <Input
            label="New Password"
            type="password"
            value={pwd1}
            onChange={(e) => setPwd1(e.target.value)}
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={pwd2}
            onChange={(e) => setPwd2(e.target.value)}
            required
          />
          <Button className="w-full" disabled={loading}>
            {loading ? "Resetting…" : "Reset Password"}
          </Button>
          {message && (
            <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}