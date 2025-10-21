import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";

export default function Pricing() {
  const plans = [
    {
      name: "Individual",
      price: "Free",
      period: "forever",
      description: "Perfect for personal deliveries",
      features: [
        "Up to 10 deliveries/month",
        "Basic tracking",
        "Email support",
        "Standard delivery speed"
      ]
    },
    {
      name: "SME",
      price: "$29",
      period: "/month",
      description: "For small to medium businesses",
      features: [
        "Unlimited deliveries",
        "Real-time GPS tracking",
        "Priority support",
        "Fast delivery options",
        "Analytics dashboard",
        "Multiple users"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Everything in SME",
        "Dedicated account manager",
        "Custom integrations",
        "API access",
        "Advanced analytics",
        "SLA guarantees"
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that's right for you. Upgrade or downgrade anytime.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative p-8 rounded-2xl ${plan.popular ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105' : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`mb-6 ${plan.popular ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                {plan.description}
              </p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className={`text-lg ${plan.popular ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                  {plan.period}
                </span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <HiCheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-blue-100' : 'text-green-500'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/signup">
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${plan.popular ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'}`}>
                  Get Started
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}