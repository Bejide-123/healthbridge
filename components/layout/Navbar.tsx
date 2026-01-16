"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Stethoscope } from "lucide-react";

// Define the type for nav items
type NavItem = {
  label: string;
  href: `#${string}`; // Now it's type-safe: must start with #
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "For Hospitals", href: "#for-hospitals" },
    { label: "For Patients", href: "#for-patients" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-gradient-to-br from-blue-50/90 via-white/90 to-teal-50/90 backdrop-blur-lg shadow-md" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          
          {/* LEFT: Logo Only */}
          <a href="/" className="flex items-center space-x-3 group relative z-10">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full opacity-20 group-hover:opacity-30 blur-xl transition-opacity" />
              <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                HealthBridge
              </span>
              <span className="text-xs text-slate-600 font-medium hidden sm:block">
                Modern Healthcare
              </span>
            </div>
          </a>

          {/* CENTER: Navigation Links in Pill (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className={`flex items-center gap-1 px-3 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 ${
              scrolled 
                ? "bg-white/70 border-slate-200/50 shadow-lg" 
                : "bg-white/40 border-white/30 shadow-md"
            }`}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="relative px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors rounded-full hover:bg-white/50 cursor-pointer group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 group-hover:w-1/2 transition-all duration-300 rounded-full" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Auth Buttons in Pills (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => alert("Login page coming soon!")}
              className={`px-6 py-2.5 text-sm font-medium rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "bg-white/70 border-slate-200/50 text-slate-700 hover:bg-white/90 shadow-lg"
                  : "bg-white/40 border-white/30 text-slate-700 hover:bg-white/60 shadow-md"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="px-6 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started Free
              <span className="ml-2">→</span>
            </button>
          </div>

          {/* MOBILE & TABLET: Simple Get Started Button (for medium screens) */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => handleNavClick("#contact")}
              className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
            </button>
            
            {/* MOBILE: Hamburger Menu */}
            <button
              className={`p-2.5 rounded-full backdrop-blur-xl border transition-all ${
                scrolled
                  ? "bg-white/70 border-slate-200/50 shadow-lg"
                  : "bg-white/40 border-white/30 shadow-md"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* MOBILE: Dropdown Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4"
          >
            <div className="flex flex-col gap-2 bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-slate-200/50">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="px-5 py-3 text-slate-700 hover:text-blue-600 hover:bg-white/60 rounded-2xl font-medium transition-all cursor-pointer text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-200/50 space-y-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    alert("Login page coming soon!");
                  }}
                  className="w-full px-5 py-3 text-sm font-medium rounded-2xl bg-white/60 hover:bg-white/80 text-slate-700 border border-slate-200/50 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full px-5 py-3 text-sm font-medium rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg transition-all"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}