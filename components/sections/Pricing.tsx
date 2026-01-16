"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

// Pricing card component
function PricingCard({ 
  plan, 
  price, 
  duration, 
  features, 
  isPopular, 
  buttonText,
  buttonLink,
  delay = 0
}: { 
  plan: string; 
  price: string; 
  duration: string; 
  features: string[]; 
  isPopular?: boolean; 
  buttonText: string;
  buttonLink: string;
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-full"
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-semibold shadow-lg">
          Most Popular
        </div>
      )}
      
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${isPopular ? 'from-blue-500 to-teal-400' : 'from-slate-300 to-slate-200'} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

      {/* Main card */}
      <div className="relative h-full p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan}</h3>
        <p className="text-slate-600 mb-6">{duration}</p>
        
        <div className="flex items-baseline mb-8">
          <span className="text-5xl font-bold text-slate-900">{price}</span>
          <span className="text-xl font-medium text-slate-500 ml-2">/month</span>
        </div>

        <ul className="space-y-4 flex-grow mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-slate-700">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a 
          href={buttonLink} 
          className={`mt-auto w-full text-center px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
            isPopular 
              ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 shadow-lg hover:shadow-blue-500/25' 
              : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600'
          } flex items-center justify-center group-hover:scale-105`}
        >
          {buttonText}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const pricingPlans = [
    {
      plan: "Basic",
      price: "₦10,000",
      duration: "Per month, billed annually",
      features: [
        "Up to 500 patient records",
        "Online appointment booking",
        "Basic EHR access",
        "SMS reminders",
        "Standard support"
      ],
      buttonText: "Choose Basic",
      buttonLink: "#contact"
    },
    {
      plan: "Pro",
      price: "₦25,000",
      duration: "Per month, billed annually",
      features: [
        "Up to 2,000 patient records",
        "Advanced EHR features",
        "Digital payments integration",
        "AI health assistant",
        "Priority support",
        "Custom branding"
      ],
      isPopular: true,
      buttonText: "Choose Pro",
      buttonLink: "#contact"
    },
    {
      plan: "Enterprise",
      price: "Custom",
      duration: "Contact us for a quote",
      features: [
        "Unlimited patient records",
        "Full EHR suite",
        "Dedicated account manager",
        "On-site training",
        "Custom integrations",
        "24/7 premium support"
      ],
      buttonText: "Contact Sales",
      buttonLink: "#contact"
    }
  ];

  return (
    <section id="pricing" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-teal-50/20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100/50 border border-blue-200/50 mb-6">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Flexible Pricing
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-slate-900">Simple, Transparent</span>
            <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          
          <p className="text-xl text-slate-600">
            Choose the plan that best fits your hospital's needs. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} delay={index * 0.1} />
          ))}
        </div>

        {/* FAQ or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Have questions about pricing?
          </h3>
          <p className="text-slate-600 mb-8">
            Our sales team is ready to help you find the perfect plan for your organization.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            Contact Sales
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}