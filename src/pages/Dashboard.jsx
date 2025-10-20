import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { HiMenuAlt3 } from "react-icons/hi";
import OrdersChart from "../components/OrdersChart";
import TransactionHistory from "../components/TransactionHistory";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    total_orders: 0,
    status: "",
    available_drivers: 0,
    transactions: [],
  });
  const { user } = useContext(AuthContext);

  const displayName = user?.username ? user.username : user?.email || "User";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/auth/dashboard/");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 p-6 lg:ml-64 font-comfortaa">
        {/* ➤ Mobile header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h1 className="text-xl font-bold text-quickdeliva">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {displayName}
            </span>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-200"
            >
              <HiMenuAlt3 size={24} />
            </button>
          </div>
        </div>

        {/* ➤ Desktop header */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-quickdeliva">Dashboard</h1>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {displayName}
          </span>
        </div>

        {/* ➤ Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        </div>

        {/* ➤ Chart */}
        <div className="mt-8">
          <OrdersChart />
        </div>

        {/* ➤ Transaction history component */}
        <div className="mt-8">
          <TransactionHistory transactions={stats.transactions} />
        </div>
      </main>
    </div>
  );
}

/* Small helper Card component */
function Card({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-xl hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}