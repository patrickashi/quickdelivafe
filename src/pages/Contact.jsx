import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Contact() {
  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-comfortaa">
      <Navbar />

      {/* Header / Hero */}
      <section className="text-center py-12 px-6 bg-gradient-to-r from-quickdeliva/15 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <h1 className="font-[sora] text-4xl font-extrabold text-quickdeliva mb-3">
          Get in Touch
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
          Have questions, feedback, or partnership inquiries?  
          We’d love to hear from you — send us a message and our team will respond shortly.
        </p>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-6 lg:px-12 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-quickdeliva mb-3 text-center">
            Send us a Message
          </h2>
          <form className="space-y-4">
            <Input label="Your Name" placeholder="Jace Terem" />
            <Input label="Email" type="email" placeholder="jaceterem@gmail.com" />
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200 font-medium">
                Message
              </label>
              <textarea
                placeholder="Write your message here..."
                rows="5"
                className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-quickdeliva outline-none transition"
              ></textarea>
            </div>
            <Button className="w-full mt-2">Send Message</Button>
          </form>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12 px-6 text-center">
        <h3 className="text-2xl font-semibold text-quickdeliva mb-6">
          Other Ways to Reach Us
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-gray-700 dark:text-gray-300">
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-3">📞</div>
            <h4 className="font-semibold text-lg mb-1">Phone</h4>
            <p>0707 442 3164</p>
            <p>Available 8am – 6pm</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-3xl mb-3">📧</div>
            <h4 className="font-semibold text-lg mb-1">Email</h4>
            <p>contactquickdeliva@gmail.com</p>
            <p>We’ll reply within 24 hours</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-3xl mb-3">📍</div>
            <h4 className="font-semibold text-lg mb-1">Address</h4>
            <p>Quickdeliva HQ</p>
            <p>Igoli, Ogoja – Cross River, Nigeria</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
        © {new Date().getFullYear()} Quickdeliva. All rights reserved.
      </footer>
    </div>
  );
}