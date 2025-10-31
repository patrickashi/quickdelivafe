import {
  HiX,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlinePlusCircle,
  HiOutlineClock,
  HiOutlineLogout,
  HiOutlineMap
} from "react-icons/hi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import quickdelivalogo_transparent from "../assets/quickdelivalogo_transparent.png";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/dashboard", icon: HiOutlineHome, label: "Dashboard" },
    { to: "/profile", icon: HiOutlineUser, label: "Profile" },
    { to: "/orders", icon: HiOutlinePlusCircle, label: "Create an Order" },
    { to: "/transactionhistoryp", icon: HiOutlineClock, label: "Transaction History" },
    { to: "/live-tracking", icon: HiOutlineMap, label: "Live Tracking" },
  ];

  return (
    <>
      {/* Dim background overlay when sidebar is open (mobile only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 lg:w-64 bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            <img src={quickdelivalogo_transparent} alt="QuickDeliva logo" className="h-20" />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <HiX size={22} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`group font-[sora] flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200
                    ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-500/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:dark:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      active ? "" : "group-hover:scale-110"
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-5 space-y-3 shrink-0">
          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full font-[sora] flex items-center justify-between gap-3 px-4 py-3 rounded-lg 
                       bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              {darkMode ? (
                <HiOutlineSun className="w-5 h-5 text-yellow-500 transform transition-transform duration-300 group-hover:rotate-90" />
              ) : (
                <HiOutlineMoon className="w-5 h-5 text-blue-600 transform transition-transform duration-300 group-hover:-rotate-12" />
              )}
              <span className="text-sm font-medium">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </div>
            <div
              className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${
                darkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-[2px] w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  darkMode ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </div>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                     bg-gradient-to-r from-red-500 to-red-600 text-white font-medium
                     hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/30
                     transition-all duration-200"
          >
            <HiOutlineLogout className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}