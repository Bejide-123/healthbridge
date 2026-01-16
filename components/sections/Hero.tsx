"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Zap, Shield } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Navbar from "../layout/Navbar";

// Counter Component - This makes numbers count!
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      current += increment;
      step++;
      
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

// Stats item component with animated counter
function StatCard({ value, label, color, isPercentage = false }: { 
  value: number; 
  label: string; 
  color: string;
  isPercentage?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div className="relative p-4 sm:p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br ${color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
          <Counter value={value} suffix={isPercentage ? "%" : "+"} />
        </div>
        <div className="text-xs sm:text-sm text-slate-600 font-medium">{label}</div>
        
        {/* Animated underline on hover */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full group-hover:w-3/4 transition-all duration-300" />
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMousePosition({ x, y });
  };

  const stats = [
    { value: 40, label: "Faster Appointments", color: "from-blue-500 to-blue-600", isPercentage: true },
    { value: 25, label: "More Revenue", color: "from-teal-500 to-teal-600", isPercentage: true },
    { value: 50, label: "Fewer No-Shows", color: "from-purple-500 to-purple-600", isPercentage: true },
    { value: 100, label: "Hospitals Ready", color: "from-pink-500 to-pink-600", isPercentage: false },
  ];

  return (
    <>
    <Navbar />
    <section 
      id="home" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-28 pb-24 md:pb-32"
    >
      {/* Dynamic gradient background */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-teal-50/80" />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 pointer-events-none" />

      {/* Floating icon elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        className="absolute top-32 left-10 text-blue-400/40 hidden lg:block"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      >
        <Shield className="w-12 h-12" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-40 right-16 text-teal-400/40 hidden lg:block"
        style={{
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      >
        <Zap className="w-12 h-12" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-40 left-16 text-purple-400/40 hidden lg:block"
        style={{
          transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * -0.015}px)`,
        }}
      >
        <Heart className="w-12 h-12" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-blue-200/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer group">
              <Sparkles className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Modernizing African Healthcare
              </span>
              <motion.div 
                className="w-2 h-2 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight">
              <span className="block text-slate-900 mb-2">
                Connecting Patients
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                & Hospitals Across Africa
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Streamline hospital operations with smart scheduling, digital payments, 
            and AI-powered health guidance. <span className="font-semibold text-slate-700">Reduce wait times by 40%</span> and transform patient care.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16"
          >
            <button
              onClick={() => {
                const element = document.querySelector('#for-hospitals');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
            >
              For Hospitals
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                const element = document.querySelector('#for-patients');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full bg-white/60 backdrop-blur-xl border-2 border-slate-300/50 hover:border-blue-500/50 text-slate-700 hover:text-blue-600 hover:bg-white/80 shadow-lg hover:scale-105 transition-all duration-300"
            >
              For Patients
            </button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            {[
              { icon: Zap, text: "Instant Booking" },
              { icon: Shield, text: "Secure Payments" },
              { icon: Heart, text: "AI Health Assistant" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/50 backdrop-blur-xl border border-slate-200/50 shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <feature.icon className="w-4 h-4 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats in glass cards WITH ANIMATED COUNTERS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                isPercentage={stat.isPercentage}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div 
          className="cursor-pointer group" 
          onClick={() => {
            const element = document.querySelector('#features');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs sm:text-sm text-slate-500 font-medium group-hover:text-blue-600 transition-colors">
              Explore Features
            </span>
            <div className="w-6 sm:w-7 h-10 sm:h-11 border-2 border-slate-400/50 rounded-full flex justify-center backdrop-blur-sm bg-white/30 group-hover:border-blue-500 transition-colors">
              <motion.div 
                className="w-1.5 h-3 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
    </>
  );
}
