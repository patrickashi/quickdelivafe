export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Your Order",
      description: "Fill in pickup and delivery details in our simple form. Takes less than 2 minutes."
    },
    {
      number: "02",
      title: "Choose Vehicle Type",
      description: "Chose from bike, car, or van based on your package size and urgency."
    },
    {
      number: "03",
      title: "Track in Real-Time",
      description: "Monitor your delivery with live GPS tracking and get instant notifications."
    },
    {
      number: "04",
      title: "Confirm Delivery",
      description: "Receive confirmation when delivered. Rate your experience and rider."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Four simple steps to get your package delivered
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white dark:bg-gray-800 px-4 py-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}