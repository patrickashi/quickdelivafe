import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import { HiMenuAlt3 } from "react-icons/hi";
import api from "../utils/api";
import TransactionHistory from "../components/TransactionHistory";
import quickdelivalogo_transparent from "../assets/quickdelivalogo_transparent.png";

export default function Orders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [amount, setAmount] = useState(0);

  const [form, setForm] = useState({
    pickup_region: "Igoli",
    delivery_region: "Igoli",
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

  // ------- REGION PRICING MATRIX (bike baseline) ------
  const basePricing = {
    Igoli: { Igoli: 1500, Okuku: 2000, Abakpa: 2000, Abouchiche: 2500 },
    Okuku: { Igoli: 2000, Okuku: 1500, Abakpa: 3000, Abouchiche: 3500 },
    Abakpa: { Igoli: 2000, Okuku: 3000, Abakpa: 1500, Abouchiche: 3500 },
    Abouchiche: { Igoli: 2500, Okuku: 3500, Abakpa: 3500, Abouchiche: 1500 },
  };

  // vehicle multipliers relative to bike price
  const vehicleMultiplier = {
    bike: 1.0,
    keke: 1.5,
    van: 4.0,
    truck: 8.0,
  };

  // recompute whenever region OR vehicle changes
  useEffect(() => {
    const pickup = form.pickup_region;
    const delivery = form.delivery_region;
    const vehicle = form.preferred_vehicle;

    const base = basePricing[pickup]?.[delivery] || 0;
    const multiplier = vehicleMultiplier[vehicle] || 1;
    setAmount(base * multiplier);
  }, [form.pickup_region, form.delivery_region, form.preferred_vehicle]);

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
    if (!amount) {
      alert("Please select pickup and delivery regions");
      return;
    }

    setLoading(true);
    try {
      await api.post("/orders/", { ...form, delivery_amount: amount });
      alert(`Delivery request submitted ✅\nAmount: ₦${amount}`);
      setForm({
        pickup_region: "Igoli",
        delivery_region: "Igoli",
        pickup_address: "",
        delivery_address: "",
        package_description: "",
        preferred_vehicle: "bike",
        delivery_date: "",
        delivery_time: "",
        special_instructions: "",
      });
      fetchOrders();
      setAmount(0);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to place delivery request ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-comfortaa">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main
        className="flex-1 p-6 lg:ml-64 text-gray-900 dark:text-gray-100
                   transition-all duration-300 ease-in-out"
      >
        {/* -------------------- Mobile Header -------------------- */}
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
            className="p-2 border border-gray-300 dark:border-gray-700 
            rounded-md text-gray-600 dark:text-gray-200"
          >
            <HiMenuAlt3 size={24} />
          </button>
        </div>
        <h1 className="font-[sora] my-8 text-xl block md:hidden font-bold text-quickdeliva">Orders</h1>

        {/* -------------------- Desktop Header -------------------- */}
        <h1 className="font-[sora] hidden lg:block text-2xl font-bold text-quickdeliva mb-6">
          Orders
        </h1>

        {/* -------------------- Create Order Form -------------------- */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
                Pickup Region
              </label>
              <select
                name="pickup_region"
                value={form.pickup_region}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 
                           focus:ring-2 focus:ring-quickdeliva outline-none"
              >
                <option>Igoli</option>
                <option>Okuku</option>
                <option>Abakpa</option>
                <option>Abouchiche</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
                Delivery Region
              </label>
              <select
                name="delivery_region"
                value={form.delivery_region}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 
                           focus:ring-2 focus:ring-quickdeliva outline-none"
              >
                <option>Igoli</option>
                <option>Okuku</option>
                <option>Abakpa</option>
                <option>Abouchiche</option>
              </select>
            </div>
          </div>

          <Input
            label="Pickup Address (where are we picking from?)"
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
                         text-gray-900 dark:text-white border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-quickdeliva outline-none"
              rows="3"
              placeholder="e.g 1 carton of cement, 2 bags of rice, etc."
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
                         text-gray-900 dark:text-white border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-quickdeliva outline-none"
            >
              <option value="bike">Bike</option>
              <option value="keke">Keke</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
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
            label="Preferred Delivery Time"
            type="time"
            name="delivery_time"
            value={form.delivery_time}
            onChange={handleChange}
          />

          {amount > 0 && (
            <div className="bg-gray-100 dark:bg-gray-700 text-center py-3 rounded-md font-semibold text-gray-800 dark:text-gray-100">
              Estimated Delivery Amount: ₦{amount.toLocaleString()}
            </div>
          )}

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
              Special Instructions
            </label>
            <textarea
              name="special_instructions"
              value={form.special_instructions}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-white border-gray-300 dark:border-gray-600
                         focus:ring-2 focus:ring-quickdeliva outline-none"
              rows="2"
              placeholder="Any delivery notes?"
            />
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? "Submitting…" : "Proceed to Payment"}
          </Button>
        </form>

        {/* -------------------- Transaction History -------------------- */}
        <div className="mt-16 mb-10">
          {fetching ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading orders…
            </p>
          ) : (
            <TransactionHistory transactions={orders} />
          )}
        </div>
      </main>
    </div>
  );
}