"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Mail, Lock, Eye, EyeOff, 
  ArrowRight, Hospital, Sparkles, Shield,
  Smartphone, MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login attempt:", formData);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        
        {/* Floating particles */}
        {[
          { left: 10, top: 20, duration: 3, delay: 0 },
          { left: 25, top: 45, duration: 4, delay: 0.5 },
          { left: 40, top: 15, duration: 3.5, delay: 1 },
          { left: 55, top: 60, duration: 4.2, delay: 0.3 },
          { left: 70, top: 30, duration: 3.8, delay: 0.8 },
          { left: 85, top: 50, duration: 4.5, delay: 0.2 },
          { left: 15, top: 70, duration: 3.3, delay: 1.2 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40 pointer-events-none" />

      <div className="w-full min-h-screen flex flex-col">
        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-4 left-4 sm:top-6 sm:left-6"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-blue-600 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
              Back to Home
            </span>
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl mx-auto flex-1 px-4 pt-8 sm:pt-12">
          {/* Left side - Branding & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-blue-200/50 shadow-lg mb-8">
              <Hospital className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                HealthBridge Login
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-slate-900">Welcome Back to</span>
              <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                HealthBridge
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Access your healthcare dashboard, manage appointments, 
              and continue your health journey with us.
            </p>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              {[
                { icon: Shield, text: "Bank-level security & privacy" },
                { icon: MessageSquare, text: "24/7 AI Health Assistant" },
                { icon: Smartphone, text: "Access from any device" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Testimonial/quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-slate-200/50 shadow-lg"
            >
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <p className="text-slate-700 italic mb-2">
                "HealthBridge made managing my family's healthcare so much easier!"
              </p>
              <div className="text-sm text-slate-500">
                — Dr. Adeola, Lagos University Teaching Hospital
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full max-w-md"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Form card */}
              <div className="relative p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-2xl">
                {/* Form header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Hospital className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Sign in to your account
                  </h2>
                  <p className="text-slate-600">
                    Enter your credentials to access your dashboard
                  </p>
                </div>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email field */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email or Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Mail className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com or +234 800 000 0000"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Lock className="w-5 h-5 text-slate-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember me checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-700">
                      Remember me on this device
                    </label>
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                      isLoading
                        ? 'bg-gradient-to-r from-blue-400 to-teal-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600'
                    } text-white shadow-lg hover:shadow-xl`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-slate-500">Or continue with</span>
                  </div>
                </div>

                {/* Alternative login options */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-300/50 hover:border-blue-500/50 hover:bg-blue-50/50 transition-all duration-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">G</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-slate-300/50 hover:border-blue-500/50 hover:bg-blue-50/50 transition-all duration-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                      <span className="text-xs font-bold text-white">A</span>
                    </div>
                    <span className="text-sm font-medium text-slate-700">Apple</span>
                  </button>
                </div>

                {/* Sign up link */}
                <div className="text-center pt-4 border-t border-slate-200/50">
                  <p className="text-slate-600">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Sign up now
                    </Link>
                  </p>
                </div>

                {/* Security note */}
                <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-200/50">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-700 font-medium mb-1">
                        Your security is our priority
                      </p>
                      <p className="text-xs text-blue-600/80">
                        All login data is encrypted and protected with bank-level security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add blob animation keyframes to globals.css if needed */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}