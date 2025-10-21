import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I sign up?",
      answer:
        "Click on 'Sign Up' at the top of the page, fill in your details, verify your email, and you’re ready to schedule deliveries.",
    },
    {
      question: "Can businesses register?",
      answer:
        "Absolutely. Quickdeliva supports individuals, SMEs, and online stores. You can manage multiple delivery requests in one dashboard.",
    },
    {
      question: "What areas do you cover?",
      answer:
        "We currently operate across Igoli, Okuku, Abakpa, and Abouchiche, with more areas launching soon.",
    },
    {
      question: "How is delivery cost calculated?",
      answer:
        "Your delivery amount is automatically determined by pickup region, delivery region, and the type of vehicle selected. Transparency, always.",
    },
    {
      question: "Can I track my package in real time?",
      answer:
        "Yes! Each order comes with live tracking updates so you can follow every step until your package arrives safely.",
    },
    {
      question: "What if my delivery is delayed or cancelled?",
      answer:
        "In rare cases of delays or cancellations, our support team will reach out. You can also check status under your Transaction History page.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-comfortaa">
      <Navbar />

      {/* Header */}
      <section className="text-center py-12 px-6 bg-gradient-to-r from-quickdeliva/15 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <h1 className="font-[sora] text-4xl font-semibold text-quickdeliva mb-3">FAQs</h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
          Have questions? We’ve got answers. Here’s everything you need to know
          about how Quickdeliva makes delivery smooth and reliable.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto py-12 px-6 lg:px-12">
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex justify-between items-center px-5 py-4 bg-white dark:bg-gray-800 text-left focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {item.question}
                </span>
                <span className="text-quickdeliva text-xl font-bold">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === idx ? "max-h-40 py-3 px-5" : "max-h-0 overflow-hidden"
                } bg-gray-50 dark:bg-gray-700/40`}
              >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-10 bg-gradient-to-r from-quickdeliva/10 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-2xl font-semibold mb-2">Still have questions?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-5">
          Our team is always ready to help you with orders, payments, or deliveries.
        </p>
        <a
          href="/contact"
          className="inline-block bg-quickdeliva text-white px-6 py-3 rounded-lg font-semibold hover:bg-quickdeliva/90 transition shadow-md"
        >
          Contact Support
        </a>
      </section>
      <Footer />
    </div>
  );
}