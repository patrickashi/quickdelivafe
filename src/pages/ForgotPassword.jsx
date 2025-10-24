import { useState } from "react";
import api from "../utils/api";
import Input from "../components/Input";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/password-reset/", { email });
      setStatus(res.data.detail || "Check your inbox for password reset instructions.");
    } catch {
      setStatus("Error sending reset email. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 pt-20">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-16">
        <h1 className="text-3xl font-[sora] font-bold text-quickdeliva mb-6 text-center">Reset Your Password</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jace@gmail.com"
            required
          />
          <Button className="w-full" disabled={loading}>
            {loading ? "Sending…" : "Send Reset Link"}
          </Button>
          {status && (
            <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
}