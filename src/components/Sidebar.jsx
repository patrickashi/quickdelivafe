import { Link, useNavigate } from "react-router-dom";
import { HiX, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();             // clear tokens and user state
    navigate("/login");   // redirect to login
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-900 shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:block`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700 lg:hidden">
          <h1 className="text-xl font-bold text-quickdeliva font-clash">Quickdeliva</h1>
          <button onClick={() => setIsOpen(false)}>
            <HiX size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex flex-col h-full">
          {/* Links */}
          <div className="flex-1 p-6">
            <h1 className="hidden lg:block mb-10 text-xl font-bold text-quickdeliva font-clash">
              Quickdeliva
            </h1>
            <nav className="space-y-4">
              <Link to="/dashboard" className="block text-gray-700 dark:text-gray-200 hover:text-quickdeliva">Dashboard</Link>
              <Link to="/profile" className="block text-gray-700 dark:text-gray-200 hover:text-quickdeliva">Profile</Link>
              <Link to="/orders" className="block text-gray-700 dark:text-gray-200 hover:text-quickdeliva">Create an order</Link>
              <Link to="/transactionhistoryp" className="block text-gray-700 dark:text-gray-200 hover:text-quickdeliva">Transaction History</Link>
            </nav>
          </div>

          {/* Actions at bottom */}
          <div className="p-6 border-t dark:border-gray-700 space-y-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
                         border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 
                         hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}