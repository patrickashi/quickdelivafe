import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-clash lg:text-6xl font-bold text-gray-800 mb-6">
          Deliver Fast with <span className="text-quickdeliva">Quickdeliva</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-xl">
          The easiest way to send and track your orders — from individuals to SMEs, we got you.
        </p>
        <Link to="/signup">
          <Button>Get Started</Button>
        </Link>
      </main>
    </div>
  );
}