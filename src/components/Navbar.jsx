import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import quickdelivalogo_transparent from "../assets/quickdelivalogo_transparent.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) =>
    path === location.pathname ||
    (path !== "/" && location.pathname.startsWith(path));

  // add a class when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-comfortaa transition-colors duration-300 ${
        scrolled || open
          ? "bg-gradient-to-r from-indigo-400/50 to-blue-600 shadow-lg"
          : "bg-gradient-to-r from-indigo-300 to-blue-500/80 backdrop-blur-lg"
      } text-white`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
          <img
            src={quickdelivalogo_transparent}
            alt="QuickDeliva Logo"
            className="h-12 sm:h-14"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-yellow-200 ${
                isActive(l.to)
                  ? "border-b-2 border-yellow-300 pb-[2px]"
                  : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="ml-2 bg-white text-indigo-700 font-semibold px-5 py-2 rounded-md 
                      hover:bg-gray-100 shadow transition-all duration-200"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          {open ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-gradient-to-br 
                   from-indigo-700 to-blue-600 text-white flex flex-col items-center 
                   justify-center space-y-6 text-xl transform 
                   transition-transform duration-300 ease-in-out z-40 ${
                     open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                   }`}
      >
        <button
          className="absolute top-6 right-6 p-3 rounded-full hover:bg-white/10"
          onClick={() => setOpen(false)}
        >
          <HiX size={28} />
        </button>

        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className={`hover:text-yellow-200 transition ${
              isActive(l.to) ? "underline underline-offset-4 font-semibold" : ""
            }`}
          >
            {l.label}
          </Link>
        ))}

        <Link
          to="/login"
          onClick={() => setOpen(false)}
          className="bg-white text-indigo-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 shadow transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}