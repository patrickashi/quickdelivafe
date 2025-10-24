import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Delivery Experience?
        </h2>
        <p className="text-xl text-blue-100 mb-10">
          Join thousands of satisfied customers who trust Quickdeliva for their delivery needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300">
              Start for Free
            </button>
          </Link>
          <Link to="/contact">
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Contact Sales
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}