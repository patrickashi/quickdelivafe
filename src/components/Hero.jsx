import { Link } from "react-router-dom";
import {
  HiOutlineLightningBolt,
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi";
import herobg from "../assets/herobg.jpg"; // ✅ your local image here

export default function Hero() {
  return (
    <section
      className="font-[sora] relative overflow-hidden pt-36 pb-20 px-6  text-center text-white"
    >
      {/* --- Background image with dark overlay & blur --- */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${herobg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* --- Main content --- */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white 
                        px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-md">
          <HiOutlineLightningBolt className="w-4 h-4 text-yellow-300" />
          <span>Fast, Reliable, Efficient</span>
        </div>

        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl">
          Deliver Fast with{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Quickdeliva
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          The easiest way to send and track your orders — from individuals to SMEs.  
          Real‑time tracking, secure delivery, and a platform built for speed.
        </p>

        {/* Call‑to‑action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/signup">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                               px-8 py-4 rounded-lg font-semibold text-lg hover:brightness-110 
                               hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              Get Started Free
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <Link to="/about">
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/70 
                               text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
              Learn More
            </button>
          </Link>
        </div>

        {/* Highlights */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-200">
          {[
            "No credit card required",
            "Free for 30 days",
            "Cancel anytime",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <HiCheckCircle className="w-5 h-5 text-green-400" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}