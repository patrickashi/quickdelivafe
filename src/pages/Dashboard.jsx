import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { HiMenuAlt3 } from "react-icons/hi";
import OrdersChart from "../components/OrdersChart";
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

  // ✅ pull in user from AuthContext
  const { user } = useContext(AuthContext);

  // ✅ use username directly, fallback to email only if username is missing
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

      <main className="flex-1 p-6 lg:ml-64">
        {/* ✅ Mobile Header with username + toggle on right */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h1 className="text-xl font-bold text-quickdeliva font-clash">Dashboard</h1>
          <div className="flex items-center gap-3">
            {/* ✅ Show actual username */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {displayName}
            </span>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 border border-gray-300 dark:border-gray-700 
                         rounded-md text-gray-600 dark:text-gray-200"
            >
              <HiMenuAlt3 size={24} />
            </button>
          </div>
        </div>

        {/* ✅ Desktop Header with username at top right */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-quickdeliva font-clash">Dashboard</h1>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {displayName}
          </span>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Orders</h2>
            <p className="text-3xl font-bold text-quickdeliva">{stats.total_orders}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">User Status</h2>
            <p className="font-bold text-green-600 dark:text-green-400">{stats.status}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Available Drivers</h2>
            <p className="text-3xl font-bold text-quickdeliva">{stats.available_drivers}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Transactions</h2>
            <p className="text-gray-600 dark:text-gray-400">Latest activity below</p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6">
          <OrdersChart />
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-800 mt-6 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 font-clash mb-4">
            Transaction History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2 px-4 text-gray-800 dark:text-gray-200">
                      {txn.package_description}
                    </td>
                    <td className="py-2 px-4 text-gray-800 dark:text-gray-200">₦{txn.amount}</td>
                    <td
                      className={`py-2 px-4 font-semibold ${
                        txn.status === "Delivered"
                          ? "text-green-600 dark:text-green-400"
                          : txn.status === "Pending"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {txn.status}
                    </td>
                    <td className="py-2 px-4 text-gray-600 dark:text-gray-400">
                      {new Date(txn.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {stats.transactions.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500 dark:text-gray-400">
                      No transactions yet
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