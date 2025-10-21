import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { HiMenuAlt3 } from "react-icons/hi";
import TransactionHistory from "../components/TransactionHistory";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import quickdelivalogo_transparent from "../assets/quickdelivalogo_transparent.png";

export default function Transactionhistoryp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const displayName = user?.username || user?.email || "User";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/dashboard/");
        setTransactions(res.data.transactions || []);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-comfortaa">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main
        className="flex-1 p-6 md:p-8 lg:ml-64 text-gray-900 
                   dark:text-gray-100 transition-all duration-300"
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
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md text-gray-600 dark:text-gray-200"
            >
              <HiMenuAlt3 size={24} />
            </button>
          </div>
        </div>
        <h1 className="block md:hidden font-[sora] mt-10 mb-10 text-xl font-bold text-quickdeliva">
            Transaction History
        </h1>

        {/* Desktop header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <h1 className="font-[sora] text-2xl font-bold text-quickdeliva">
            Transaction History
          </h1>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {displayName}
          </span>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-quickdeliva mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Fetching your transactions...
            </p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 italic">
              No transactions yet.
            </p>
          </div>
        ) : (
          <TransactionHistory transactions={transactions} />
        )}
      </main>
    </div>
  );
}