import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-quickdeliva px-4 py-3 text-white lg:px-8 font-clash">
      <div className="text-xl font-bold">Quickdeliva</div>
      
      {/* Desktop Links */}
      <div className="hidden lg:flex space-x-6">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login" className="font-semibold">Login</Link>
      </div>

      {/* Mobile Toggle */}
      <div className="lg:hidden">
        {open ? (
          <HiX size={28} onClick={() => setOpen(false)} />
        ) : (
          <HiMenuAlt3 size={28} onClick={() => setOpen(true)} />
        )}
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="absolute top-14 left-0 w-full bg-quickdeliva flex flex-col items-center space-y-4 py-4 text-lg lg:hidden">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
}