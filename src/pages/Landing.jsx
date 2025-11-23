import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ReviewsSection from "../components/ReviewsSection";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <Pricing /> */}
      <CTA />
      <ReviewsSection />
      <Footer />
    </div>
  );
}