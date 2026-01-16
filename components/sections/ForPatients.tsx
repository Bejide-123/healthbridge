"use client";

import { motion } from "framer-motion";
import { 
  Calendar, CreditCard, Clock, Shield, 
  Brain, Heart, Users, Zap, 
  CheckCircle, Bell, Stethoscope, TrendingDown,
  Smartphone, Laptop, Tablet
} from "lucide-react";
import { useState, useEffect } from "react";

// Feature card for patients
function PatientFeature({ 
  icon: Icon, 
  title, 
  description,
  benefits,
  color = "blue",
  delay = 0
}: { 
  icon: any; 
  title: string; 
  description: string;
  benefits: string[];
  color?: "blue" | "teal" | "purple" | "pink";
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    blue: "from-blue-500 to-cyan-500",
    teal: "from-teal-500 to-emerald-500",
    purple: "from-purple-500 to-violet-500",
    pink: "from-pink-500 to-rose-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${colors[color]} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
      
      {/* Main card */}
      <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
        
        {/* Icon with animation */}
        <div className="relative mb-6">
          <div className={`absolute -inset-4 bg-gradient-to-br ${colors[color]} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          <motion.div 
            className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}
            animate={isHovered ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          
          {/* Floating particles on hover */}
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 bg-gradient-to-br ${colors[color]} rounded-full`}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: "-10px",
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -20, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Benefits list */}
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-slate-700">{benefit}</span>
            </motion.div>
          ))}
        </div>

        {/* Animated indicator */}
        <motion.div 
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center"
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Zap className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// Web app preview component
function WebAppPreview() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { id: 0, label: "Dashboard", icon: Laptop },
    { id: 1, label: "Bookings", icon: Calendar },
    { id: 2, label: "Health", icon: Heart },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Device mockup */}
      <div className="relative mx-auto max-w-4xl">
        {/* Browser top bar */}
        <div className="relative rounded-t-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 mx-4">
              <div className="h-6 rounded-lg bg-slate-700/50 backdrop-blur-sm" />
            </div>
            <div className="text-slate-400 text-sm font-medium">HealthBridge</div>
          </div>
        </div>

        {/* Browser content */}
        <div className="relative rounded-b-2xl bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative p-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg"
                      : "bg-slate-800/50 text-slate-400 hover:text-white"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Dashboard preview */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Upcoming", value: "2", color: "from-blue-500 to-cyan-500" },
                { label: "Completed", value: "14", color: "from-teal-500 to-emerald-500" },
                { label: "Prescriptions", value: "3", color: "from-purple-500 to-violet-500" },
              ].map((stat, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                  <div className={`text-2xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Appointment cards */}
            <div className="space-y-3">
              {[
                { time: "10:00 AM", doctor: "Dr. Adebola", type: "Check-up", status: "Confirmed" },
                { time: "2:30 PM", doctor: "Dr. Chioma", type: "Follow-up", status: "Scheduled" },
              ].map((appointment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{appointment.time} • {appointment.doctor}</div>
                        <div className="text-sm text-slate-400">{appointment.type}</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                      {appointment.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Health metrics preview */}
            <div className="mt-6 pt-6 border-t border-slate-700/30">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-medium">Health Metrics</div>
                <div className="text-slate-400 text-sm">Last 7 days</div>
              </div>
              <div className="flex items-end justify-between h-24">
                {[65, 80, 45, 90, 70, 85, 60].map((height, index) => (
                  <motion.div
                    key={index}
                    className="w-8 rounded-t-lg bg-gradient-to-t from-blue-500 to-teal-400"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ 
                      duration: 1, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reflection effect */}
        <div className="absolute -bottom-20 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/50 to-transparent blur-xl" />
      </div>
    </motion.div>
  );
}

export default function ForPatients() {
  const patientFeatures = [
    {
      icon: Calendar,
      title: "Easy Appointment Booking",
      description: "Book doctor appointments in under 60 seconds from any device.",
      benefits: [
        "Real-time doctor availability",
        "Instant confirmation",
        "Automatic reminders",
        "Reschedule anytime"
      ],
      color: "blue" as const
    },
    {
      icon: CreditCard,
      title: "Secure Digital Payments",
      description: "Multiple payment options with bank-level security.",
      benefits: [
        "Remita, cards, transfers",
        "Instant payment confirmation",
        "Digital receipts",
        "Payment history tracking"
      ],
      color: "teal" as const
    },
    {
      icon: Brain,
      title: "24/7 AI Health Assistant",
      description: "Get medical guidance anytime with our intelligent assistant.",
      benefits: [
        "Symptom checking",
        "Medication information",
        "First aid instructions",
        "Emergency guidance"
      ],
      color: "purple" as const
    },
    {
      icon: Shield,
      title: "Private Health Records",
      description: "Your complete medical history, securely stored and accessible.",
      benefits: [
        "Lifetime medical records",
        "Share with doctors securely",
        "Prescription history",
        "Test results archive"
      ],
      color: "pink" as const
    }
  ];

  const patientStats = [
    { icon: Clock, value: "18min", label: "Average Wait Time", change: "-25%" },
    { icon: TrendingDown, value: "50%", label: "Fewer No-Shows", change: "From 20% to 10%" },
    { icon: Users, value: "95%", label: "Patient Satisfaction", change: "+15%" },
    { icon: Bell, value: "2", label: "Reminders Per Visit", change: "+50% Adherence" },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up in Seconds",
      description: "Create your account with just your phone number and email.",
      icon: Users
    },
    {
      step: "2",
      title: "Find & Book Doctors",
      description: "Browse available doctors, check ratings, and book instantly.",
      icon: Calendar
    },
    {
      step: "3",
      title: "Attend Consultation",
      description: "Visit hospital or use telemedicine for remote consultations.",
      icon: Stethoscope
    },
    {
      step: "4",
      title: "Manage Everything Online",
      description: "View records, pay bills, and get prescriptions digitally.",
      icon: Smartphone
    }
  ];

  return (
    <section id="for-patients" className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 10, top: 20, duration: 3, delay: 0 },
          { left: 22, top: 80, duration: 4, delay: 0.2 },
          { left: 34, top: 35, duration: 3.5, delay: 0.4 },
          { left: 46, top: 65, duration: 4.2, delay: 0.6 },
          { left: 58, top: 15, duration: 3.8, delay: 0.8 },
          { left: 70, top: 50, duration: 4.5, delay: 1.0 },
          { left: 82, top: 30, duration: 3.3, delay: 1.2 },
          { left: 94, top: 70, duration: 4.1, delay: 1.4 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-blue-400/10 to-teal-400/10"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100/50 border border-blue-200/50 mb-6">
            <Heart className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              For Patients & Families
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-slate-900">Healthcare Made</span>
            <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Simple & Accessible
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Take control of your health journey with tools designed to make healthcare 
            convenient, affordable, and stress-free.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {patientFeatures.map((feature, index) => (
            <PatientFeature key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>

        {/* Web app preview */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Your Health Dashboard
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Access everything you need from our modern web interface. 
              <span className="font-semibold text-blue-600"> No app download required.</span>
            </p>
          </div>
          <WebAppPreview />
        </div>

        {/* Patient stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {patientStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-green-600 font-semibold">{stat.change}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Simple 4-Step Process
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 transform -translate-y-1/2 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-2xl mb-6 shadow-xl z-10">
                    {step.step}
                    <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full blur-xl opacity-20" />
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                    <step.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-teal-500/10 to-blue-600/10" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          
          {/* Animated elements */}
          <div className="absolute inset-0">
            {[
              { left: 10, top: 20, duration: 2, delay: 0 },
              { left: 25, top: 45, duration: 2.5, delay: 0.2 },
              { left: 40, top: 15, duration: 3, delay: 0.4 },
              { left: 55, top: 60, duration: 2.8, delay: 0.6 },
              { left: 70, top: 30, duration: 3.2, delay: 0.8 },
              { left: 85, top: 50, duration: 2.6, delay: 1.0 },
              { left: 15, top: 70, duration: 3.4, delay: 1.2 },
              { left: 35, top: 25, duration: 2.9, delay: 1.4 },
              { left: 50, top: 80, duration: 3.1, delay: 1.6 },
              { left: 65, top: 10, duration: 2.7, delay: 1.8 },
              { left: 80, top: 65, duration: 3.3, delay: 0.1 },
              { left: 5, top: 35, duration: 2.4, delay: 0.3 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: pos.duration,
                  repeat: Infinity,
                  delay: pos.delay,
                }}
              />
            ))}
          </div>

          <div className="relative p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Start Your Health Journey Today
            </h3>
            <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of patients who have transformed their healthcare experience 
              with HealthBridge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Find Hospitals Near You
              </button>
              <button
                onClick={() => alert("Coming soon!")}
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:scale-105 transition-all duration-300 bg-white/80"
              >
                Watch Demo Video
              </button>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              {[
                { icon: CheckCircle, text: "No registration fees" },
                { icon: Shield, text: "Secure & private" },
                { icon: Zap, text: "Instant access" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-600">
                  <item.icon className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
