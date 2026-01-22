// app/dashboard/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Calendar, Clock, CheckCircle, AlertCircle,
  TrendingUp, Heart, Pill, CreditCard,
  FileText, Bell, Zap,
  ArrowRight, Sparkles, Activity, Shield,
  Brain, Ambulance, MessageSquare, Stethoscope,
  Thermometer, Droplets, TrendingDown,
  Battery, UserCheck,
  RefreshCw, MoreHorizontal,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";

// Enhanced Stats card with more interactivity
function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = "blue",
  delay = 0,
  trend = "up"
}: { 
  title: string; 
  value: string; 
  change: string;
  icon: React.ElementType;
  color?: "blue" | "teal" | "purple" | "green";
  delay?: number;
  trend?: "up" | "down" | "neutral";
}) {
  const colors = {
    blue: "from-blue-500 to-cyan-500",
    teal: "from-teal-500 to-emerald-500",
    purple: "from-purple-500 to-violet-500",
    green: "from-green-500 to-lime-500"
  };

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: TrendingUp
  };

  const TrendIcon = trendIcons[trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring" }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${colors[color]} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
      
      <div className="relative p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
        
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${colors[color]} shadow-lg`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.div>
          <motion.div 
            className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
              trend === "up" ? 'bg-green-100 text-green-700' : 
              trend === "down" ? 'bg-red-100 text-red-700' : 
              'bg-blue-100 text-blue-700'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <TrendIcon className={`w-3 h-3 ${trend === "down" ? "rotate-180" : ""}`} />
            <span className="hidden sm:inline">{change}</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-xl sm:text-2xl font-bold text-slate-900 mb-1"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.1 }}
        >
          {value}
        </motion.div>
        
        <div className="text-xs sm:text-sm text-slate-600 flex items-center justify-between">
          <span>{title}</span>
          <motion.div 
            className="w-2 h-2 rounded-full bg-green-500 opacity-0 group-hover:opacity-100"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        {/* Animated progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
      </div>
    </motion.div>
  );
}

// Enhanced Quick action card with 3D effect
function QuickActionCard({ 
  title, 
  description, 
  icon: Icon, 
  href,
  color = "blue",
  delay = 0,
  badge
}: { 
  title: string; 
  description: string;
  icon: React.ElementType;
  href: string;
  color?: "blue" | "teal" | "purple" | "pink";
  delay?: number;
  badge?: string;
}) {
  const colors = {
    blue: "from-blue-500 to-cyan-500",
    teal: "from-teal-500 to-emerald-500",
    purple: "from-purple-500 to-violet-500",
    pink: "from-pink-500 to-rose-500"
  };

  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -8,
        rotateX: -5,
        transition: { type: "spring", stiffness: 300 }
      }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="relative group cursor-pointer"
    >
      {/* Floating badge */}
      {badge && (
        <motion.div 
          className="absolute -top-2 -right-2 z-10 px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring" }}
        >
          {badge}
        </motion.div>
      )}
      
      <Link href={href}>
        <div className="relative p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          <div className="relative flex items-start justify-between mb-4">
            <motion.div 
              className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${colors[color]} shadow-lg relative overflow-hidden`}
              animate={{ 
                scale: hover ? 1.1 : 1,
                rotate: hover ? 5 : 0
              }}
              transition={{ type: "spring" }}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 blur-sm" />
            </motion.div>
            <motion.div
              animate={{ x: hover ? 5 : 0 }}
              transition={{ type: "spring" }}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </motion.div>
          </div>
          
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-teal-500 transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
            {description}
          </p>
          
          {/* Animated dots */}
          {hover && (
            <div className="absolute bottom-4 right-4 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-blue-500"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// Enhanced Appointment card with timeline - RESPONSIVE
function AppointmentCard({ 
  time, 
  doctor, 
  department, 
  status,
  delay = 0,
  type = "consultation",
  location = "Main Hospital"
}: { 
  time: string; 
  doctor: string; 
  department: string; 
  status: "confirmed" | "pending" | "completed" | "cancelled";
  delay?: number;
  type?: string;
  location?: string;
}) {
  const statusConfig = {
    confirmed: { color: "bg-green-100 text-green-700", icon: CheckCircle },
    pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
    completed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle },
    cancelled: { color: "bg-red-100 text-red-700", icon: AlertCircle }
  };

  const StatusIcon = statusConfig[status].icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, type: "spring" }}
      whileHover={{ x: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200/30 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-cyan-50/30 transition-all duration-300 gap-3 sm:gap-4">
        {/* Timeline indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-teal-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex items-center gap-3 sm:gap-4 w-full">
          <motion.div 
            className="relative flex-shrink-0"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <motion.div 
              className="absolute -inset-1 border-2 border-blue-400 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? 0.3 : 0,
                scale: isHovered ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
              <div className="font-medium text-slate-900 text-sm sm:text-base truncate">
                {time}
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 w-fit">
                {type}
              </span>
            </div>
            <div className="text-sm text-slate-600 font-medium truncate">{doctor}</div>
            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Stethoscope className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{department}</span>
              </div>
              <span className="hidden sm:inline text-slate-400">•</span>
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <motion.div 
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${statusConfig[status].color} min-w-fit`}
            whileHover={{ scale: 1.05 }}
          >
            <StatusIcon className="w-3 h-3 flex-shrink-0" />
            <span className="capitalize truncate">{status}</span>
          </motion.div>
          
          <motion.button 
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Health metrics chart component
function HealthMetricsChart() {
  const [activeMetric, setActiveMetric] = useState("heart");
  
  const metrics = {
    heart: { 
      label: "Heart Rate", 
      value: "72", 
      unit: "BPM", 
      icon: Heart,
      color: "from-red-500 to-rose-500",
      data: [65, 70, 68, 72, 75, 74, 72]
    },
    pressure: { 
      label: "Blood Pressure", 
      value: "120/80", 
      unit: "mmHg", 
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      data: [118, 122, 120, 119, 121, 120, 120]
    },
    glucose: { 
      label: "Glucose", 
      value: "96", 
      unit: "mg/dL", 
      icon: Droplets,
      color: "from-green-500 to-emerald-500",
      data: [92, 94, 96, 98, 95, 96, 97]
    },
    oxygen: { 
      label: "Oxygen", 
      value: "98%", 
      unit: "SpO2", 
      icon: Battery,
      color: "from-purple-500 to-violet-500",
      data: [97, 98, 97, 99, 98, 98, 98]
    }
  };

  const activeData = metrics[activeMetric as keyof typeof metrics];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <h3 className="text-lg font-bold text-slate-900">Health Metrics</h3>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>Last 7 days</span>
        </div>
      </div>

      {/* Metric selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(metrics).map(([key, metric]) => {
          const MetricIcon = metric.icon;
          const isActive = activeMetric === key;
          return (
            <motion.button
              key={key}
              onClick={() => setActiveMetric(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0 sm:flex-none ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-100"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`p-1.5 rounded-lg bg-gradient-to-br ${metric.color} ${isActive ? '' : 'opacity-70'}`}>
                <MetricIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium truncate">{metric.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="mb-6">
        <div className="flex items-end justify-between h-32 mb-4">
          {activeData.data.map((value, index) => (
            <motion.div
              key={index}
              className="relative w-6 sm:w-8 flex flex-col items-center"
              initial={{ height: 0 }}
              animate={{ height: `${(value / Math.max(...activeData.data)) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.05 }}
            >
              <div 
                className={`w-4 sm:w-6 rounded-lg bg-gradient-to-t ${activeData.color}`}
                style={{ height: '100%' }}
              />
              <div className="text-xs text-slate-500 mt-2">{["M", "T", "W", "T", "F", "S", "S"][index]}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current value */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-teal-50/50 border border-blue-100/50">
        <div className="min-w-0">
          <div className="text-sm text-slate-600 truncate">Current {activeData.label}</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 truncate">{activeData.value}</div>
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${activeData.color} flex items-center justify-center flex-shrink-0 ml-2`}>
          <activeData.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const greeting = hours < 12 ? "Morning" : hours < 18 ? "Afternoon" : "Evening";
      setTime(greeting);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // 4 key stats cards
  const stats = [
    { title: "Upcoming Appointments", value: "2", change: "+1", icon: Calendar, color: "blue" as const, trend: "up" as const },
    { title: "Lab Results Ready", value: "3", change: "+2", icon: Activity, color: "purple" as const, trend: "up" as const },
    { title: "Health Score", value: "85%", change: "+5%", icon: Heart, color: "teal" as const, trend: "up" as const },
    { title: "AI Consultations", value: "4", change: "+2", icon: Brain, color: "teal" as const, trend: "up" as const },
  ];

  // 4 essential quick actions
  const quickActions = [
    { 
      title: "Book Appointment", 
      description: "Schedule a consultation with any doctor", 
      icon: Calendar, 
      href: "/patient-dashboard/appointments",
      color: "blue" as const,
      badge: "Fast"
    },
    { 
      title: "Medical Records", 
      description: "Access your complete health history", 
      icon: FileText, 
      href: "/patient-dashboard/medical-records",
      color: "teal" as const
    },
    { 
      title: "Lab Results", 
      description: "View your test results and reports", 
      icon: Activity, 
      href: "/patient-dashboard/lab-results",
      color: "purple" as const,
      badge: "New"
    },
    { 
      title: "Emergency", 
      description: "Request ambulance instantly", 
      icon: Ambulance, 
      href: "/patient-dashboard/emergency",
      color: "pink" as const,
      badge: "URGENT"
    },
  ];

  const upcomingAppointments = [
    { time: "Today, 2:30 PM", doctor: "Dr. Adebola", department: "Cardiology Department", status: "confirmed" as const, type: "Consultation" },
    { time: "Tomorrow, 10:00 AM", doctor: "Dr. Chioma", department: "Pediatrics Department", status: "pending" as const, type: "Follow-up" },
    { time: "Nov 28, 11:00 AM", doctor: "Dr. Ahmed", department: "Dermatology Department", status: "confirmed" as const, type: "Check-up" },
  ];

  const healthReminders = [
    { title: "Blood Pressure Check", time: "Daily at 8:00 AM", icon: Activity, status: "pending" as const },
    { title: "Medication Refill", time: "Due in 3 days", icon: Pill, status: "warning" as const },
    { title: "Annual Checkup", time: "Scheduled for next month", icon: Calendar, status: "scheduled" as const },
    { title: "Flu Vaccine", time: "Overdue by 2 weeks", icon: Thermometer, status: "overdue" as const },
  ];

  const recentActivities = [
    { icon: FileText, title: "Lab Result Added", description: "Blood test results uploaded", time: "2 hours ago", color: "from-purple-500 to-violet-500", action: "viewed" as const },
    { icon: CreditCard, title: "Payment Completed", description: "Consultation fee paid online", time: "1 day ago", color: "from-green-500 to-lime-500", action: "paid" as const },
    { icon: Calendar, title: "Appointment Booked", description: "Follow-up with Dr. Adebola", time: "3 days ago", color: "from-blue-500 to-cyan-500", action: "scheduled" as const },
    { icon: UserCheck, title: "Profile Updated", description: "Emergency contact added", time: "5 days ago", color: "from-amber-500 to-orange-500", action: "updated" as const },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 px-4 sm:px-0">
      {/* Welcome header with animated gradient */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-teal-500/10 to-blue-600/10 rounded-2xl blur-xl" />
        <div className="relative flex flex-col sm:flex-row justify-between items-start gap-4 p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg">
          <div className="flex-1 min-w-0">
            <motion.div 
              className="flex items-center gap-3 mb-3"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg flex-shrink-0">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-slate-500">Good {time},</div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 truncate">
                  Welcome back, <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">John</span>
                </h1>
              </div>
            </motion.div>
            <p className="text-slate-600 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
              Here's what's happening with your healthcare journey today. You have <span className="font-semibold text-blue-600">2 upcoming appointments</span> and <span className="font-semibold text-green-600">3 lab results</span> ready.
            </p>
          </div>
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 shadow-sm w-full sm:w-auto justify-center sm:justify-start"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span className="text-sm font-medium text-blue-700 truncate">Account Active</span>
            <motion.div 
              className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Optimized stats grid - 4 cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Optimized quick actions - 4 cards */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Quick Actions</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">Most important features for fast access</p>
          </div>
          <Link 
            href="/patient-dashboard/appointments" 
            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group w-fit"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} delay={index * 0.1} />
          ))}
        </div>
      </div>

      {/* Main content area with health metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left column: Appointments and health metrics */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* Upcoming appointments - RESPONSIVE FIX */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Upcoming Appointments</h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Your scheduled consultations and check-ups</p>
              </div>
              <Link 
                href="/patient-dashboard/appointments" 
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group w-fit"
              >
                View calendar
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, index) => (
                <AppointmentCard key={index} {...appointment} delay={index * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Health metrics chart */}
          <HealthMetricsChart />
        </div>

        {/* Right column: Reminders and recent activity */}
        <div className="space-y-6 sm:space-y-8">
          {/* Health reminders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-900">Health Reminders</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Stay on top of your health routine</p>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-sm text-slate-500">Active</span>
              </div>
            </div>
            <div className="space-y-3">
              {healthReminders.map((reminder, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    reminder.status === "overdue" 
                      ? "bg-red-50/50 border-red-100 hover:border-red-200" 
                      : reminder.status === "warning"
                      ? "bg-amber-50/50 border-amber-100 hover:border-amber-200"
                      : reminder.status === "scheduled"
                      ? "bg-blue-50/50 border-blue-100 hover:border-blue-200"
                      : "bg-white/50 border-slate-200/30 hover:border-blue-200"
                  }`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    reminder.status === "overdue" 
                      ? "bg-gradient-to-br from-red-500 to-rose-500" 
                      : reminder.status === "warning"
                      ? "bg-gradient-to-br from-amber-500 to-orange-500"
                      : reminder.status === "scheduled"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : "bg-gradient-to-br from-teal-500 to-emerald-500"
                  }`}>
                    <reminder.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{reminder.title}</div>
                    <div className="text-xs sm:text-sm text-slate-600 truncate">{reminder.time}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    reminder.status === "overdue" 
                      ? "bg-red-500 animate-pulse" 
                      : reminder.status === "warning"
                      ? "bg-amber-500"
                      : reminder.status === "scheduled"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-4 sm:p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Your latest interactions and updates</p>
              </div>
              <RefreshCw className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-500 transition-colors flex-shrink-0" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50/50 transition-colors group"
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${activity.color} flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-medium text-slate-900 text-sm sm:text-base truncate">{activity.title}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize w-fit">
                        {activity.action}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 truncate">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced health tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative overflow-hidden rounded-2xl"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-teal-500/5 to-blue-600/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative p-4 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <motion.div 
              className="relative mx-auto lg:mx-0"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute -inset-2 border-2 border-blue-400 rounded-2xl blur-md opacity-30" />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Today's Health Tip</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white w-fit">
                  NEW
                </span>
              </div>
              <p className="text-sm sm:text-lg text-slate-700 mb-4 line-clamp-3 sm:line-clamp-none">
                Staying hydrated is crucial for maintaining blood pressure levels. 
                Aim for 8 glasses of water daily, especially in hot weather. 
                <span className="font-semibold text-blue-600"> Dehydration can increase heart rate and decrease blood volume.</span>
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  { icon: Heart, text: "Heart Health", color: "text-red-500" },
                  { icon: Zap, text: "Energy Boost", color: "text-yellow-500" },
                  { icon: Brain, text: "Mental Focus", color: "text-indigo-500" },
                  { icon: Activity, text: "Metabolism", color: "text-green-500" },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <item.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color}`} />
                    <span className="truncate">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:shadow-lg transition-shadow flex items-center gap-2 w-full lg:w-auto justify-center"
            >
              <Brain className="w-4 h-4" />
              <span>Get More Tips</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}