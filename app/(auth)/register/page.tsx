"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, 
  ArrowRight, Hospital, Sparkles, Shield,
  Calendar, MapPin, Smartphone, CheckCircle,
  Building2, MessageSquare
} from "lucide-react";
import Link from "next/link";

interface HospitalOption {
  id: number;
  name: string;
  city: string;
  code: string;
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    hospitalCode: "",
    password: "",
    confirmPassword: "",
    
    // Step 2
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    insuranceProvider: "",
    insurancePolicyNumber: ""
  });

  // Sample hospitals - in production this would come from API
  const hospitals: HospitalOption[] = [
    { id: 1, name: "Lagos University Teaching Hospital", city: "Lagos", code: "LUTH2024" },
    { id: 2, name: "University College Hospital", city: "Ibadan", code: "UCH2024" },
    { id: 3, name: "National Hospital Abuja", city: "Abuja", code: "NHA2024" },
    { id: 4, name: "Aminu Kano Teaching Hospital", city: "Kano", code: "AKTH2024" },
    { id: 5, name: "University of Nigeria Teaching Hospital", city: "Enugu", code: "UNTH2024" },
    { id: 6, name: "University of Port Harcourt Teaching Hospital", city: "Port Harcourt", code: "UPTH2024" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registration attempt:", formData);
      // In production: redirect to verification page or dashboard
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleHospitalSelect = (hospital: HospitalOption) => {
    setSelectedHospital(hospital.id.toString());
    setFormData(prev => ({ ...prev, hospitalCode: hospital.code }));
  };

  const validateStep1 = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.hospitalCode.trim() &&
      formData.password.trim() &&
      formData.confirmPassword.trim() &&
      formData.password === formData.confirmPassword
    );
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBackStep = () => {
    setStep(1);
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
          { left: 5, top: 10, duration: 3, delay: 0 },
          { left: 20, top: 60, duration: 4, delay: 0.2 },
          { left: 35, top: 25, duration: 3.5, delay: 0.4 },
          { left: 50, top: 75, duration: 4.2, delay: 0.6 },
          { left: 65, top: 15, duration: 3.8, delay: 0.8 },
          { left: 80, top: 50, duration: 4.5, delay: 1.0 },
          { left: 95, top: 30, duration: 3.3, delay: 1.2 },
          { left: 10, top: 80, duration: 4.1, delay: 1.4 },
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
              <Building2 className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                Join HealthBridge Today
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block text-slate-900">Create Your</span>
              <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                HealthBridge Account
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Join thousands of patients across Africa who manage their healthcare
              journey digitally with our secure platform.
            </p>

            {/* Benefits list */}
            <div className="space-y-6 mb-8">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Why Join HealthBridge?
              </h3>
              {[
                { icon: Calendar, text: "Book appointments in under 60 seconds" },
                { icon: Shield, text: "Secure access to medical records" },
                { icon: MessageSquare, text: "24/7 AI Health Assistant" },
                { icon: Smartphone, text: "Manage everything from your phone" },
                { icon: MapPin, text: "Find hospitals & specialists near you" },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{benefit.text}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {benefit.text === "Book appointments in under 60 seconds" && "No more long waiting lines"}
                      {benefit.text === "Secure access to medical records" && "HIPAA & NDPR compliant"}
                      {benefit.text === "24/7 AI Health Assistant" && "Get health guidance anytime"}
                      {benefit.text === "Manage everything from your phone" && "iOS & Android ready"}
                      {benefit.text === "Find hospitals & specialists near you" && "Across 100+ hospitals"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-xl border border-slate-200/50 shadow-lg"
            >
              {[
                { value: "50K+", label: "Active Patients" },
                { value: "100+", label: "Hospitals" },
                { value: "95%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full max-w-2xl"
          >
            <div className="relative">
              {/* Progress steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 1 ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-slate-700">Basic Info</div>
                    <div className="text-xs text-slate-500">Account details</div>
                  </div>
                </div>
                <div className="flex-1 h-0.5 mx-4 bg-slate-300">
                  <div className={`h-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-500 ${step === 2 ? 'w-full' : 'w-0'}`} />
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 2 ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    <span className="font-bold">2</span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-slate-700">Health Profile</div>
                    <div className="text-xs text-slate-500">Medical details</div>
                  </div>
                </div>
              </div>

              {/* Form card */}
              <div className="relative p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-2xl">
                {/* Form header */}
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {step === 1 ? "Create Your Account" : "Complete Health Profile"}
                  </h2>
                  <p className="text-slate-600">
                    {step === 1 
                      ? "Enter your basic information to get started" 
                      : "Help us provide better care with your health details"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            First Name
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <User className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="John"
                              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                              required
                            />
                          </div>
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Last Name
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <User className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Doe"
                              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
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
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
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
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Hospital Selection */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Select Your Hospital
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Hospital className="w-5 h-5 text-slate-400" />
                          </div>
                          <select
                            name="hospitalCode"
                            value={selectedHospital}
                            onChange={(e) => {
                              setSelectedHospital(e.target.value);
                              const hospital = hospitals.find(h => h.id.toString() === e.target.value);
                              if (hospital) {
                                setFormData(prev => ({ ...prev, hospitalCode: hospital.code }));
                              }
                            }}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 appearance-none"
                            required
                          >
                            <option value="">Choose your hospital</option>
                            {hospitals.map((hospital) => (
                              <option key={hospital.id} value={hospital.id}>
                                {hospital.name} ({hospital.city}) - Code: {hospital.code}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Your hospital code will be used to connect your account to the hospital's system
                        </p>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Lock className="w-5 h-5 text-slate-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a strong password"
                            className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
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
                        <p className="text-xs text-slate-500 mt-2">
                          Must be at least 8 characters with letters and numbers
                        </p>
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Lock className="w-5 h-5 text-slate-400" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="terms"
                          name="terms"
                          required
                          className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 mt-1"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-slate-700">
                          I agree to the{" "}
                          <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </>
                  )}

                  {/* Step 2: Health Profile */}
                  {step === 2 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Date of Birth */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Date of Birth
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <Calendar className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Gender */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full pl-4 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>

                      {/* Blood Group */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Blood Group (Optional)
                        </label>
                        <select
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                          className="w-full pl-4 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                        >
                          <option value="">Select blood group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Address (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-3">
                            <MapPin className="w-5 h-5 text-slate-400" />
                          </div>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            placeholder="Your complete address"
                            rows={3}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 resize-none"
                          />
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-slate-900">Emergency Contact</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Contact Name
                            </label>
                            <input
                              type="text"
                              name="emergencyContactName"
                              value={formData.emergencyContactName}
                              onChange={handleChange}
                              placeholder="Full name"
                              className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Relationship
                            </label>
                            <input
                              type="text"
                              name="emergencyContactRelationship"
                              value={formData.emergencyContactRelationship}
                              onChange={handleChange}
                              placeholder="Spouse, Parent, etc."
                              className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Contact Phone
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <Phone className="w-5 h-5 text-slate-400" />
                            </div>
                            <input
                              type="tel"
                              name="emergencyContactPhone"
                              value={formData.emergencyContactPhone}
                              onChange={handleChange}
                              placeholder="+234 800 000 0000"
                              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Insurance Information */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-slate-900">Insurance Information (Optional)</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Insurance Provider
                            </label>
                            <input
                              type="text"
                              name="insuranceProvider"
                              value={formData.insuranceProvider}
                              onChange={handleChange}
                              placeholder="e.g., NHIS, AIICO"
                              className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Policy Number
                            </label>
                            <input
                              type="text"
                              name="insurancePolicyNumber"
                              value={formData.insurancePolicyNumber}
                              onChange={handleChange}
                              placeholder="Your policy number"
                              className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-300/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/50">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-blue-700 font-medium mb-1">
                              Your Health Information is Secure
                            </p>
                            <p className="text-xs text-blue-600/80">
                              All medical information is encrypted and protected under HIPAA & NDPR regulations.
                              Only you and your healthcare providers can access this data.
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex gap-4 pt-4">
                    {step === 2 && (
                      <motion.button
                        type="button"
                        onClick={handleBackStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3.5 px-6 rounded-xl font-semibold border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                      >
                        Back
                      </motion.button>
                    )}
                    
                    {step === 1 ? (
                      <motion.button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!validateStep1()}
                        whileHover={{ scale: validateStep1() ? 1.02 : 1 }}
                        whileTap={{ scale: validateStep1() ? 0.98 : 1 }}
                        className={`flex-1 py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                          validateStep1()
                            ? 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Continue
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        className={`flex-1 py-3.5 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                          isLoading
                            ? 'bg-gradient-to-r from-blue-400 to-teal-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600'
                        } text-white shadow-lg hover:shadow-xl`}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <CheckCircle className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>

                {/* Already have account link */}
                <div className="text-center pt-6 mt-6 border-t border-slate-200/50">
                  <p className="text-slate-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Sign in instead
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}