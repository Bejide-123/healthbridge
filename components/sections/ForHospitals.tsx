"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  TrendingUp, Users, Clock, DollarSign, 
  BarChart3, Shield, Zap, CheckCircle,
  Activity, Calendar, FileText, Smartphone
} from "lucide-react";
import { useState, useEffect } from "react";

// Animated stat counter
function AnimatedStat({ 
  value, 
  label, 
  icon: Icon,
  suffix = "",
  color = "blue",
  delay = 0
}: { 
  value: number; 
  label: string; 
  icon: any;
  suffix?: string;
  color?: "blue" | "teal" | "purple" | "green";
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }, 500 + delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const colors = {
    blue: "from-blue-500 to-cyan-500",
    teal: "from-teal-500 to-emerald-500",
    purple: "from-purple-500 to-violet-500",
    green: "from-green-500 to-lime-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      <div className="relative p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
        {/* Icon with gradient glow */}
        <div className="relative mb-4">
          <div className={`absolute -inset-3 bg-gradient-to-br ${colors[color]} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Animated number */}
        <div className={`text-4xl font-bold bg-gradient-to-br ${colors[color]} bg-clip-text text-transparent mb-2`}>
          {count}{suffix}
        </div>
        
        {/* Label */}
        <div className="text-sm font-medium text-slate-600">{label}</div>

        {/* Animated progress line */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, delay: delay + 0.5 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
}

// Interactive dashboard card
function DashboardCard({ 
  title, 
  description,
  metrics,
  color = "blue"
}: { 
  title: string; 
  description: string;
  metrics: { label: string; value: string; change: string }[];
  color?: "blue" | "teal" | "purple";
}) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(springY, [-50, 50], [5, -5]);
  const rotateY = useTransform(springX, [-50, 50], [-5, 5]);

  const colors = {
    blue: "bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-cyan-500/20",
    teal: "bg-gradient-to-br from-teal-500/20 via-emerald-400/10 to-green-500/20",
    purple: "bg-gradient-to-br from-purple-500/20 via-violet-400/10 to-fuchsia-500/20"
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x - rect.width / 2);
    mouseY.set(y - rect.height / 2);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative cursor-pointer perspective-1000"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 ${colors[color]} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
      
      {/* Main card */}
      <div className="relative p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-2xl">
        
        {/* Floating elements */}
        {isHovered && (
          <>
            <motion.div 
              className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        
        {/* Description */}
        <p className="text-slate-600 mb-8 leading-relaxed">{description}</p>

        {/* Metrics grid */}
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 border border-slate-200/30">
              <span className="text-sm font-medium text-slate-700">{metric.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-900">{metric.value}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  metric.change.startsWith('+') 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Animated chart lines */}
        <div className="mt-6 pt-6 border-t border-slate-200/50">
          <div className="flex items-center justify-between">
            {[20, 45, 60, 35, 80, 50].map((height, index) => (
              <motion.div
                key={index}
                className="w-4 rounded-full bg-gradient-to-t from-blue-500 to-cyan-400"
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100 
                }}
                viewport={{ once: true }}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Process Card Component
interface ProcessCardProps {
  step: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  delay: number;
}

function ProcessCard({ step, title, description, icon: Icon, color, delay }: ProcessCardProps) {
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
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
      
      {/* Card */}
      <div className="relative h-full p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500">
        
        {/* Step number badge */}
        <div className="absolute -top-4 -left-4">
          <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-xl`}>
            <span className="text-white font-bold text-xl">{step}</span>
            <div className={`absolute -inset-2 bg-gradient-to-br ${color} rounded-2xl blur-lg opacity-50`} />
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-end mb-4">
          <motion.div
            animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <h4 className="text-xl font-bold text-slate-900 mb-3 mt-4">{title}</h4>
        <p className="text-slate-600 leading-relaxed">{description}</p>

        {/* Bottom accent line */}
        <motion.div 
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} rounded-b-3xl`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
          viewport={{ once: true }}
        />

        {/* Hover particles */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-br ${color} rounded-full`}
                style={{
                  left: `${30 + i * 20}%`,
                  top: "50%",
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -30, opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 1, 
                  delay: i * 0.1,
                  repeat: Infinity 
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function ForHospitals() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Revenue",
      description: "Automated billing, reduced no-shows, and faster payment processing."
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Reduce administrative work by 40% with automated workflows."
    },
    {
      icon: Users,
      title: "Improve Care",
      description: "Complete patient history access for better diagnosis and treatment."
    },
    {
      icon: Shield,
      title: "Stay Compliant",
      description: "HIPAA & NDPR compliant with automated audit trails and reports."
    }
  ];

  const dashboardMetrics = [
    {
      title: "Patient Flow Dashboard",
      description: "Real-time tracking of patient appointments, wait times, and staff efficiency.",
      metrics: [
        { label: "Daily Patients", value: "147", change: "+12%" },
        { label: "Avg Wait Time", value: "18min", change: "-25%" },
        { label: "No-Show Rate", value: "8%", change: "-42%" }
      ],
      color: "blue" as const
    },
    {
      title: "Revenue Analytics",
      description: "Track payments, insurance claims, and financial performance in real-time.",
      metrics: [
        { label: "Monthly Revenue", value: "₦4.2M", change: "+18%" },
        { label: "Collection Rate", value: "94%", change: "+7%" },
        { label: "Claim Approval", value: "96%", change: "+15%" }
      ],
      color: "teal" as const
    }
  ];

  const processes = [
    {
      step: "01",
      title: "Patient Registration",
      description: "Digital intake forms, insurance verification, and instant profile creation.",
      icon: Users,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "02",
      title: "Smart Scheduling",
      description: "AI-powered appointment booking with automatic reminders and follow-ups.",
      icon: Calendar,
      color: "from-teal-500 to-emerald-500"
    },
    {
      step: "03",
      title: "Consultation & Diagnosis",
      description: "Electronic health records, e-prescriptions, and lab integration.",
      icon: FileText,
      color: "from-purple-500 to-violet-500"
    },
    {
      step: "04",
      title: "Digital Payments",
      description: "Multiple payment options with instant reconciliation and reporting.",
      icon: Smartphone,
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section id="for-hospitals" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-teal-50/20" />
      
      {/* Floating medical icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[Activity, Zap, CheckCircle, Shield].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-200/20"
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + Math.sin(index) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Icon className="w-32 h-32" />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100/50 border border-blue-200/50 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              For Healthcare Providers
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-slate-900">Transform Your Hospital</span>
            <span className="block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              With Digital Excellence
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join leading hospitals across Africa that have increased efficiency, improved patient care, 
            and boosted revenue with HealthBridge.
          </p>
        </motion.div>

        {/* Key benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive dashboards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {dashboardMetrics.map((dashboard, index) => (
            <DashboardCard key={index} {...dashboard} />
          ))}
        </div>

        {/* Animated stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <AnimatedStat 
            icon={DollarSign}
            value={25}
            suffix="%"
            label="Average Revenue Increase"
            color="green"
            delay={0.1}
          />
          <AnimatedStat 
            icon={Clock}
            value={40}
            suffix="%"
            label="Time Saved on Admin"
            color="blue"
            delay={0.2}
          />
          <AnimatedStat 
            icon={Users}
            value={95}
            suffix="%"
            label="Patient Satisfaction"
            color="teal"
            delay={0.3}
          />
          <AnimatedStat 
            icon={CheckCircle}
            value={50}
            suffix="%"
            label="Reduction in No-Shows"
            color="purple"
            delay={0.4}
          />
        </div>

        {/* Process flow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-blue-200/50 shadow-lg mb-6">
              <Activity className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Simple 4-Step Process
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              How HealthBridge Works
            </h3>
            <p className="text-xl text-slate-600">
              From patient arrival to payment completion, streamline every step of the healthcare journey.
            </p>
          </div>
          
          {/* Process cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {processes.map((process, index) => (
              <ProcessCard
                key={index}
                step={process.step}
                title={process.title}
                description={process.description}
                icon={process.icon}
                color={process.color}
                delay={index * 0.15}
              />
            ))}
          </div>

          {/* Visual connection indicators */}
          <div className="flex items-center justify-center gap-4 max-w-4xl mx-auto mt-8">
            {processes.map((process, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${process.color} flex items-center justify-center shadow-lg`}>
                  <process.icon className="w-5 h-5 text-white" />
                </div>
                {index < processes.length - 1 && (
                  <motion.div
                    className="hidden lg:block w-12 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 mx-4"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                    viewport={{ once: true }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Key benefits summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: Zap, text: "Setup in 24 hours", color: "from-blue-500 to-cyan-500" },
              { icon: Shield, text: "Bank-level security", color: "from-teal-500 to-emerald-500" },
              { icon: CheckCircle, text: "Dedicated support", color: "from-purple-500 to-violet-500" }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-xl border border-slate-200/50 shadow-md hover:shadow-lg transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-semibold text-slate-700">{benefit.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          {/* Animated dots */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Hospital?
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join 100+ hospitals across Africa that trust HealthBridge for their digital transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 text-lg font-semibold rounded-full bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Schedule a Demo
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector('#pricing');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                View Pricing Plans
              </button>
            </div>
            
            <p className="mt-6 text-blue-200/80 text-sm">
              No credit card required • 30-day free trial • Onboarding support included
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
