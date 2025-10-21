import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-comfortaa">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-quickdeliva/20 to-quickdeliva/5 dark:from-quickdeliva/30 dark:to-gray-800 py-16 px-6 lg:px-12 text-center">
        <h1 className="font-[sora] text-4xl lg:text-5xl mb-4 text-quickdeliva">
          Fast. Reliable. Effortless Delivery.
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Quickdeliva is redefining local and regional delivery by connecting people,
          goods, and businesses through innovation, transparency, and trust.
        </p>
      </section>

      {/* About Content */}
      <section className="py-12 px-6 lg:px-24 max-w-6xl mx-auto">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-2xl font-bold text-quickdeliva">Who We Are</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-7">
            We’re a community-driven logistics platform founded with a single goal:
            to make sending and receiving parcels as seamless as sending a text message.
            With Quickdeliva, customers can request deliveries, track packages in
            real time, and trust that every item arrives safely and on schedule.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
          <img
            src="/images/delivery_team.svg"
            alt="Quickdeliva delivery team"
            className="w-full max-w-md mx-auto md:max-w-full rounded-xl shadow-lg"
          />
          <div>
            <h3 className="text-xl font-semibold text-quickdeliva mb-3">
              Our Mission
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              To create a dynamic and accessible delivery ecosystem that empowers
              individuals, supports local businesses, and brings convenience right
              to your doorstep. We believe every delivery—big or small—deserves
              speed, safety, and care.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white dark:bg-gray-800 py-16 px-6 lg:px-12">
        <h2 className="text-2xl font-bold text-center text-quickdeliva mb-8">
          Why Choose Quickdeliva?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Fast & Reliable",
              desc: "Our riders know your time is precious—we prioritize speed without compromising on safety.",
              icon: "🚀",
            },
            {
              title: "Real‑Time Tracking",
              desc: "Stay informed from pickup to delivery with live location updates and instant notifications.",
              icon: "📦",
            },
            {
              title: "Customer First",
              desc: "Every package matters. Every person matters. We deliver smiles along with your parcels.",
              icon: "💛",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-xl shadow-md p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-quickdeliva mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-12 px-6 bg-gradient-to-r from-quickdeliva/10 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Ready to simplify your deliveries?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Let us handle the miles while you focus on what matters most.
        </p>
        <a
          href="/orders"
          className="inline-block bg-quickdeliva text-white px-6 py-3 rounded-lg font-semibold hover:bg-quickdeliva/90 transition shadow-md"
        >
          Get Started
        </a>
      </section>
      <Footer />
    </div>
  );
}