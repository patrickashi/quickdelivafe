import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../utils/api";
import quickdelivalogo_transparent from "../assets/quickdelivalogo_transparent.png";

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me/");
        setForm(res.data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/auth/me/", form);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-comfortaa">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main */}
      <main
        className="flex-1 p-6 lg:ml-64 transition-all duration-300 
                   text-gray-800 dark:text-gray-100"
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <div className="flex items-center gap-2">
            <img
              src={quickdelivalogo_transparent}
              alt="QuickDeliva logo"
              className="h-12"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-200"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>

        {/* Heading */}
        <h1 className="font-[sora] text-2xl font-bold text-quickdeliva mb-6">Profile</h1>

        {/* Profile card */}
        <div className="max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 md:p-8 transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email || ""}
              onChange={handleChange}
              disabled
            />
            <Input
              label="Username"
              name="username"
              value={form.username || ""}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              name="phone_number"
              value={form.phone_number || ""}
              onChange={handleChange}
            />
            <Input
              label="State"
              name="state"
              value={form.state || ""}
              onChange={handleChange}
            />
            <Input
              label="Address"
              name="address"
              value={form.address || ""}
              onChange={handleChange}
            />

            <Button className="w-full mt-3" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>

        {/* Subtle footer text for friendly reassurance */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          Keep your details up to date for faster deliveries and account
          recovery.
        </p>
      </main>
    </div>
  );
}