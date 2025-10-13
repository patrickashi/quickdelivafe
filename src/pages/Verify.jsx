import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Verify() {
  const navigate = useNavigate();
  const email = localStorage.getItem("signup_email");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/verify/", { email, code });
      alert("Verification successful! Please login now.");
      localStorage.removeItem("signup_email");
      navigate("/login");
    } catch (err) {
      alert("Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-quickdeliva mb-6">Verify Account</h1>
        <p className="text-sm text-gray-600 mb-4">Code sent to: {email}</p>
        <form onSubmit={handleSubmit}>
          <Input label="Verification Code" value={code} onChange={(e) => setCode(e.target.value)} />
          <Button className="w-full mt-4" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </div>
    </div>
  );
}