import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import { HiMenuAlt3 } from "react-icons/hi";
import api from "../utils/api";

export default function Orders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // ⏳ track submit
  const [fetching, setFetching] = useState(false); // ⏳ track table loading

  const [form, setForm] = useState({
    pickup_address: "",
    delivery_address: "",
    package_description: "",
    preferred_vehicle: "bike",
    delivery_date: "",
    delivery_time: "",
    special_instructions: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setFetching(true);
      const res = await api.get("/orders/");
      setOrders(res.data);
    } catch (err) {
      console.error("Could not load orders", err);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/orders/", form);
      alert("Delivery request submitted ✅");
      setForm({
        pickup_address: "",
        delivery_address: "",
        package_description: "",
        preferred_vehicle: "bike",
        delivery_date: "",
        delivery_time: "",
        special_instructions: "",
      });
      fetchOrders();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to place delivery request ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 p-6 lg:ml-64 text-gray-900 dark:text-gray-100">
        {/* ✅ Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h1 className="text-xl font-bold text-quickdeliva font-clash">Orders</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-200"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>

        {/* Desktop header */}
        <h1 className="hidden lg:block text-2xl font-bold text-quickdeliva font-clash mb-6">
          Orders
        </h1>

        {/* Delivery Request Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8 space-y-4"
        >
          <Input
            label="Pickup Address"
            name="pickup_address"
            value={form.pickup_address}
            onChange={handleChange}
          />
          <Input
            label="Delivery Address"
            name="delivery_address"
            value={form.delivery_address}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Package Description
            </label>
            <textarea
              name="package_description"
              value={form.package_description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              rows="3"
              placeholder="What are you sending?"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Preferred Vehicle
            </label>
            <select
              name="preferred_vehicle"
              value={form.preferred_vehicle}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
            >
              <option value="bike">Bike (₦1,500)</option>
              <option value="keke">Keke (₦2,500)</option>
              <option value="van">Van (Schedule a call: 07074423164)</option>
              <option value="truck">Truck (Schedule a call: 07074423164)</option>
            </select>
          </div>

          <Input
            label="Preferred Delivery Date"
            type="date"
            name="delivery_date"
            value={form.delivery_date}
            onChange={handleChange}
          />
          <Input
            label="Preferred Time"
            type="time"
            name="delivery_time"
            value={form.delivery_time}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Special Instructions
            </label>
            <textarea
              name="special_instructions"
              value={form.special_instructions}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              rows="2"
              placeholder="Any delivery notes?"
            />
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Delivery Request"}
          </Button>
        </form>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="font-bold mb-3">My Orders</h2>

          <div className="overflow-x-auto">
            <table className="min-w-max w-full text-sm">
              <thead>
                <tr className="text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-2 text-left">Pickup</th>
                  <th className="p-2 text-left">Delivery</th>
                  <th className="p-2 text-left">Vehicle</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Time</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {fetching ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center">
                      Loading orders…
                    </td>
                  </tr>
                ) : orders.length > 0 ? (
                  orders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="p-2 whitespace-nowrap">{o.pickup_address}</td>
                      <td className="p-2 whitespace-nowrap">{o.delivery_address}</td>
                      <td className="p-2 whitespace-nowrap">{o.preferred_vehicle}</td>
                      <td className="p-2 whitespace-nowrap">{o.delivery_date}</td>
                      <td className="p-2 whitespace-nowrap">{o.delivery_time}</td>
                      <td className="p-2 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            o.status === "Delivered"
                              ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                              : o.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100"
                              : o.status === "Cancelled"
                              ? "bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-100"
                              : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}