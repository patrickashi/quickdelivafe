import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { HiMenuAlt3 } from "react-icons/hi";
import TransactionHistory from "../components/TransactionHistory";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Transactionhistoryp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const displayName = user?.username ? user.username : user?.email || "User";

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
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 p-4 sm:p-6 lg:ml-64 font-comfortaa">
        {/* ➤ Mobile header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h1 className="text-xl font-bold text-quickdeliva">
            Transaction History
          </h1>
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
          <h1 className="text-2xl font-bold text-quickdeliva">
            Transaction History
          </h1>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {displayName}
          </span>
        </div>

        {/* ➤ Transaction History Component */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quickdeliva"></div>
          </div>
        ) : (
          <TransactionHistory transactions={transactions} />
        )}
      </main>
    </div>
  );
}