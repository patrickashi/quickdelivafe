import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="p-6 lg:p-12">
        <h1 className="text-3xl font-bold text-quickdeliva mb-4">About Us</h1>
        <p className="text-gray-700 leading-7 max-w-3xl">
          Quickdeliva is a modern delivery solution designed to serve individuals and
          businesses. We make ordering, tracking, and managing deliveries effortless
          with our responsive, user-friendly platform.
        </p>
      </div>
    </div>
  );
}