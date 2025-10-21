import { HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineClock, HiOutlineLocationMarker, HiOutlineChartBar, HiOutlineCreditCard } from "react-icons/hi";

export default function Features() {
  const features = [
    {
      icon: HiOutlineLightningBolt,
      title: "Lightning Fast Delivery",
      description: "Get your packages delivered within hours, not days. Our optimized routes ensure the fastest delivery times."
    },
    {
      icon: HiOutlineLocationMarker,
      title: "Real-Time Tracking",
      description: "Track your orders in real-time with live GPS tracking. Know exactly where your package is at all times."
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Secure & Insured",
      description: "Every delivery is insured and handled with care. Your packages are safe with us, guaranteed."
    },
    {
      icon: HiOutlineClock,
      title: "24/7 Support",
      description: "Our customer support team is always ready to help. Get assistance whenever you need it."
    },
    {
      icon: HiOutlineChartBar,
      title: "Analytics Dashboard",
      description: "Track your delivery metrics, costs, and performance with our comprehensive analytics dashboard."
    },
    {
      icon: HiOutlineCreditCard,
      title: "Flexible Payment",
      description: "Multiple payment options including credit cards, mobile money, and corporate accounts."
    }
  ];

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Quickdeliva?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage your deliveries efficiently and reliably
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}