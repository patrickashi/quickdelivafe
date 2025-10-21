import { useState, useEffect, useContext } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Sidebar from "../components/Sidebar";
import OrdersChart from "../components/OrdersChart";
import TransactionHistory from "../components/TransactionHistory";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import quickdelivalogo_transparent from "../assets/quickdelivalogo_transparent.png";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    total_orders: 0,
    status: "",
    available_drivers: 0,
    transactions: [],
  });

  const { user } = useContext(AuthContext);
  const displayName = user?.username || user?.email || "User";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/auth/dashboard/");
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content area */}
      <main
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 
                    ease-in-out p-6 lg:ml-64 font-comfortaa`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <div className="flex items-center gap-2">
            <img
              src={quickdelivalogo_transparent}
              alt="QuickDeliva logo"
              className="h-12"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {displayName}
            </span>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md 
                         text-gray-600 dark:text-gray-200"
            >
              <HiMenuAlt3 size={24} />
            </button>
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <h1 className="font-[Sora] text-2xl font-semibold text-quickdeliva">Dashboard</h1>
          <span className="font-[Sora] text-sm font-medium text-gray-700 dark:text-gray-300">
            Welcome, {displayName}
          </span>
        </div>

        {/* Summary grid */}
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Total Orders">
            <p className="text-3xl font-bold text-quickdeliva">
              {stats.total_orders}
            </p>
          </Card>

          <Card title="User Status">
            <p
              className={`font-bold ${
                stats.status === "Verified"
                  ? "text-green-600 dark:text-green-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              {stats.status || "Unverified"}
            </p>
          </Card>

          <Card title="Available Drivers">
            <p className="text-3xl font-bold text-quickdeliva">
              {stats.available_drivers}
            </p>
          </Card>

          <Card title="Transactions">
            <p className="text-gray-600 dark:text-gray-400">
              Latest activity below
            </p>
          </Card>
        </section>

        {/* Orders Chart */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Orders Overview
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
            <OrdersChart />
          </div>
        </section>

        {/* Transaction History */}
        <section className="mt-10 mb-12">
          <TransactionHistory transactions={stats.transactions} />
        </section>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 🌟 Glossy / Glassmorphic Card -------------------------------------------- */
/* -------------------------------------------------------------------------- */
function Card({ title, children }) {
  return (
    <div
      className="
        relative rounded-xl p-6 overflow-hidden
        bg-white/30 dark:bg-gray-700/20
        backdrop-blur-md border border-white/30 dark:border-white/10
        shadow-[0_4px_30px_rgba(0,0,0,0.1)]
        hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]
        hover:bg-white/40 dark:hover:bg-gray-700/30
        transition-all duration-300
      "
    >
      {/* soft light reflection gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/0 pointer-events-none rounded-xl" />

      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}