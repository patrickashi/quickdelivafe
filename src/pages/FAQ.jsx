import Navbar from "../components/Navbar";

export default function FAQ() {
  return (
    <div>
      <Navbar />
      <div className="p-6 lg:p-12">
        <h1 className="text-3xl font-bold text-quickdeliva mb-6">FAQ</h1>
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">How do I sign up?</h2>
            <p className="text-gray-600">Click on Sign Up, enter your details, and confirm via email.</p>
          </div>
          <div>
            <h2 className="font-semibold">Can businesses register?</h2>
            <p className="text-gray-600">Yes, SMEs and e-commerce shops can register to manage orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}