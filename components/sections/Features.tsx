"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Calendar, CreditCard, Ambulance, FileText, 
  Brain, Pill, Shield, Zap, Users, 
  Clock, Bell, TrendingUp, Globe, ArrowRight
} from "lucide-react";

// Tilt card component with 3D effect
function TiltCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient,
  delay = 0 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  gradient: string;
  delay?: number;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateYValue = ((x - centerX) / centerX) * 10; // Max 10 degrees
    const rotateXValue = ((centerY - y) / centerY) * 10; // Max 10 degrees
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer tilt-card"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
      
      {/* Main card */}
      <div className="relative p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
        
        {/* Icon with animated background */}
        <div className="relative mb-6">
          <div className={`absolute -inset-4 bg-gradient-to-br ${gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          {/* Floating dots animation */}
          {isHovered && (
            <>
              <motion.div 
                className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
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

        {/* Animated button */}
        <div className="flex items-center text-blue-600 font-medium group-hover:text-teal-600 transition-colors">
          <span className="mr-2">Learn more</span>
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Animated border */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full group-hover:w-3/4 transition-all duration-500" />
      </div>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Appointment Booking",
      description: "Patients book online in 60 seconds. Automatic reminders reduce no-shows by 50% with SMS & email notifications.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: CreditCard,
      title: "Digital Payments",
      description: "Multiple payment options: Remita, cards, transfers, USSD. Get paid faster with instant payment confirmation.",
      gradient: "from-teal-500 to-emerald-500"
    },
    {
      icon: Ambulance,
      title: "Emergency Response",
      description: "One-tap ambulance request with real-time GPS tracking. Emergency contacts auto-notified. Average response: <10min.",
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: FileText,
      title: "Electronic Health Records",
      description: "Lifetime medical history securely stored. Doctors access complete patient history in seconds. HIPAA compliant.",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: Brain,
      title: "AI Health Assistant",
      description: "24/7 medical guidance. Symptom checker, medication info, first aid instructions. Multi-language support.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Pill,
      title: "Pharmacy & Lab Integration",
      description: "E-prescriptions, test result delivery, medication adherence tracking. Inventory management with auto-reorder.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "End-to-end encryption, audit logs, role-based access. NDPR & HIPAA compliant. Regular security audits.",
      gradient: "from-green-500 to-lime-500"
    },
    {
      icon: Globe,
      title: "Multi-Hospital Network",
      description: "Connect with hospitals across Africa. Share medical records securely. Refer patients seamlessly.",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <section id="features" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-blue-50/30" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { left: 10, top: 20, duration: 3, delay: 0 },
          { left: 25, top: 45, duration: 4, delay: 0.5 },
          { left: 40, top: 15, duration: 3.5, delay: 1 },
          { left: 55, top: 60, duration: 4.2, delay: 0.3 },
          { left: 70, top: 30, duration: 3.8, delay: 0.8 },
          { left: 85, top: 50, duration: 4.5, delay: 0.2 },
          { left: 15, top: 70, duration: 3.3, delay: 1.2 },
          { left: 35, top: 25, duration: 4.1, delay: 0.6 },
          { left: 50, top: 80, duration: 3.9, delay: 0.9 },
          { left: 65, top: 10, duration: 4.3, delay: 0.4 },
          { left: 80, top: 65, duration: 3.7, delay: 1.1 },
          { left: 5, top: 35, duration: 4.4, delay: 0.7 },
          { left: 30, top: 55, duration: 3.6, delay: 1.3 },
          { left: 45, top: 5, duration: 4.6, delay: 0.1 },
          { left: 60, top: 75, duration: 3.4, delay: 0.5 },
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

      <div className="container relative z-10 mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200/50 mb-6">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Core Features
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-slate-900">Everything Your Hospital</span>
            <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Needs to Thrive
            </span>
          </h2>
          
          <p className="text-xl text-slate-600">
            From patient management to emergency response, we've built every tool modern healthcare providers need.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <TiltCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 via-teal-500/10 to-blue-600/10 backdrop-blur-xl border border-slate-200/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Clock, value: "30+", label: "Minutes Saved Per Patient" },
              { icon: Users, value: "95%", label: "Patient Satisfaction" },
              { icon: TrendingUp, value: "40%", label: "Increase in Efficiency" },
              { icon: Bell, value: "50%", label: "Reduction in No-Shows" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => {
              const element = document.querySelector('#pricing');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 inline-flex items-center"
          >
            See Pricing Plans
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <p className="mt-4 text-slate-500 text-sm">
            All features included in every plan • No hidden fees • 30-day money-back guarantee
          </p>
        </motion.div>
      </div>
    </section>
  );
}
