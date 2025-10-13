import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { HiMenuAlt3 } from "react-icons/hi";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../utils/api";

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
        console.error("Profile fetch failed", err);
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
      alert("Profile updated");
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 p-6 lg:ml-64">
        {/* ✅ Mobile Header with toggle on RIGHT side */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h1 className="text-xl font-bold text-quickdeliva font-clash">Profile</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 border border-gray-300 dark:border-gray-700 
                       rounded-md text-gray-600 dark:text-gray-200"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>

        {/* Desktop heading */}
        <h1 className="hidden lg:block text-2xl font-bold text-quickdeliva font-clash mb-6">
          Profile
        </h1>

        {/* Form */}
        <div className="max-w-lg bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" name="email" type="email" value={form.email || ""} onChange={handleChange} />
            <Input label="Username" name="username" value={form.username || ""} onChange={handleChange} />
            <Input label="Phone" name="phone_number" value={form.phone_number || ""} onChange={handleChange} />
            <Input label="State" name="state" value={form.state || ""} onChange={handleChange} />
            <Input label="Address" name="address" value={form.address || ""} onChange={handleChange} />
            <Button className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}