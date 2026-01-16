"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Mail, Phone, ArrowRight, Shield, Sparkles,
  Key, MessageSquare, CheckCircle, Smartphone
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (step === 1) {
        setStep(2);
      } else {
        // Redirect to login after successful reset
        router.push("/login");
      }
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMethodToggle = () => {
    setMethod(method === "email" ? "phone" : "email");
    setFormData(prev => ({
      ...prev,
      email: "",
      phone: "",
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        
        {/* Floating particles */}
        {[
          { left: 8, top: 15, duration: 3, delay: 0 },
          { left: 22, top: 65, duration: 4, delay: 0.2 },
          { left: 38, top: 30, duration: 3.5, delay: 0.4 },
          { left: 52, top: 80, duration: 4.2, delay: 0.6 },
          { left: 68, top: 20, duration: 3.8, delay: 0.8 },
          { left: 82, top: 55, duration: 4.5, delay: 1.0 },
          { left: 96, top: 35, duration: 3.3, delay: 1.2 },
          { left: 12, top: 85, duration: 4.1, delay: 1.4 },
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

      <div className="container relative mx-auto px-4 py-8 sm:py-16">
        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-10"
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

        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left side - Branding & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-blue-200/50 shadow-lg mb-6">
              <Key className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                Reset Your Password
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-slate-900">Forgot Your</span>
              <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Password?
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              No worries! We'll help you reset your password and secure your account
              in just a few simple steps.
            </p>

            {/* Recovery options */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                How Password Reset Works
              </h3>
              {[
                { step: "1", icon: MessageSquare, title: "Verify Identity", description: "Enter your email or phone number associated with your account" },
                { step: "2", icon: Smartphone, title: "Receive OTP", description: "Get a 6-digit code via SMS or email" },
                { step: "3", icon: Key, title: "Create New Password", description: "Enter the OTP and set a new secure password" },
                { step: "4", icon: CheckCircle, title: "Access Restored", description: "Sign in with your new password" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    (step === 1 && index === 0) || (step === 2 && index > 0)
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    <span className="font-bold">{item.step}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-4 h-4 text-blue-600" />
                      <p className="font-medium text-slate-700">{item.title}</p>
                    </div>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Security assurance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/50 to-teal-50/50 border border-blue-200/50"
            >
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">100% Secure Process</h4>
                  <p className="text-slate-600 text-sm">
                    All password reset requests are encrypted and verified. We never share 
                    your personal information. You'll receive an OTP that expires in 10 minutes 
                    for maximum security.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Reset Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full max-w-md"
          >
            <div className="relative">
              {/* Form card */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-2xl">
                {/* Form header */}
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Key className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {step === 1 ? "Reset Your Password" : "Create New Password"}
                  </h2>
                  <p className="text-slate-600">
                    {step === 1 
                      ? "Enter your email or phone to receive reset instructions" 
                      : "Check your phone/email for the OTP code"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Identity Verification */}
                  {step === 1 && (
                    <>
                      {/* Method toggle */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm font-medium text-slate-700">
                          Send code via:
                        </span>
                        <button
                          type="button"
                          onClick={handleMethodToggle}
                          className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
                        >
                          {method === "email" ? "Use Phone Instead" : "Use Email Instead"}
                        </button>
                      </div>

                      {method === "email" ? (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <Mail className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="you@example.com"
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                              required
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            We'll send a 6-digit code to this email address
                          </p>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <Phone className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+234 800 000 0000"
                              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                              required
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            We'll send a 6-digit code via SMS to this number
                          </p>
                        </div>
                      )}

                      {/* Send OTP button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading || (!formData.email && !formData.phone)}
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                          isLoading || (!formData.email && !formData.phone)
                            ? 'bg-gradient-to-r from-blue-400 to-teal-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600'
                        } text-white shadow-lg hover:shadow-xl`}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending Code...
                          </>
                        ) : (
                          <>
                            Send Verification Code
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </>
                  )}

                  {/* Step 2: OTP and New Password */}
                  {step === 2 && (
                    <>
                      {/* OTP Code */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Enter 6-Digit OTP
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Key className="w-5 h-5 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            placeholder="000000"
                            maxLength={6}
                            pattern="[0-9]{6}"
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 text-center text-2xl tracking-widest"
                            required
                          />
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-slate-500">
                            Code expires in 10:00 minutes
                          </p>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                          >
                            Resend code
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Key className="w-5 h-5 text-slate-400" />
                          </div>
                          <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Create a new password"
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            required
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Must be at least 8 characters with letters and numbers
                        </p>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Key className="w-5 h-5 text-slate-400" />
                          </div>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your new password"
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Reset Password button */}
                      <motion.button
                        type="submit"
                        disabled={isLoading || formData.newPassword !== formData.confirmPassword}
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                          isLoading || formData.newPassword !== formData.confirmPassword
                            ? 'bg-gradient-to-r from-blue-400 to-teal-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600'
                        } text-white shadow-lg hover:shadow-xl`}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Resetting Password...
                          </>
                        ) : (
                          <>
                            Reset Password
                            <CheckCircle className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </>
                  )}
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-slate-500">Or</span>
                  </div>
                </div>

                {/* Navigation links */}
                <div className="space-y-3 text-center">
                  <Link
                    href="/login"
                    className="block py-3 px-4 rounded-xl border border-slate-300/50 text-slate-700 hover:border-blue-500/50 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 font-medium"
                  >
                    Back to Sign In
                  </Link>
                  <p className="text-slate-600 text-sm">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Create account
                    </Link>
                  </p>
                </div>

                {/* Help section */}
                <div className="mt-8 pt-6 border-t border-slate-200/50">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-2">
                      Need help? Contact our support team
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <a 
                        href="mailto:support@healthbridge.com" 
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        support@healthbridge.com
                      </a>
                      <span className="hidden sm:inline text-slate-400">•</span>
                      <a 
                        href="tel:+2341234567890" 
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        +234 123 456 7890
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}