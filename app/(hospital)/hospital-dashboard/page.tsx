// app/hospital/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Users, Calendar, Clock, Activity, 
  TrendingUp, DollarSign, Package, CheckCircle,
  AlertCircle, Bell, Zap, ChevronRight,
  Stethoscope, Building2, MapPin, Phone,
  RefreshCw, Ambulance, FileText, MessageSquare,
  ArrowRight, AlertTriangle, UserPlus,
  MoreVertical, CheckCircle2, XCircle
} from "lucide-react";
import { useState, useEffect } from "react";

// Responsive Stats card
function HospitalStatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = "blue",
  delay = 0,
  trend = "up",
  loading = false
}: { 
  title: string; 
  value: string | number; 
  change: string;
  icon: React.ElementType;
  color?: "blue" | "teal" | "purple" | "green" | "orange" | "red";
  delay?: number;
  trend?: "up" | "down" | "neutral";
  loading?: boolean;
}) {
  const colors = {
    blue: "from-blue-500 to-cyan-500",
    teal: "from-teal-500 to-emerald-500",
    purple: "from-purple-500 to-violet-500",
    green: "from-green-500 to-lime-500",
    orange: "from-orange-500 to-amber-500",
    red: "from-red-500 to-rose-500"
  };

  const TrendIcon = trend === "up" ? TrendingUp : TrendingUp; // Simplified for responsiveness

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group cursor-pointer"
    >
      <div className="relative p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br ${colors[color]}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === "up" ? 'bg-green-100 text-green-700' : 
            trend === 'down' ? 'bg-red-100 text-red-700' : 
            'bg-blue-100 text-blue-700'
          }`}>
            <TrendIcon className={`w-3 h-3 ${trend === "down" ? "rotate-180" : ""}`} />
            <span className="hidden xs:inline">{change}</span>
          </div>
        </div>
        
        {loading ? (
          <div className="animate-pulse">
            <div className="h-6 sm:h-7 bg-slate-200 rounded mb-2"></div>
            <div className="h-3 sm:h-4 bg-slate-200 rounded w-3/4"></div>
          </div>
        ) : (
          <>
            <div className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
              {value}
            </div>
            <div className="text-xs sm:text-sm text-slate-600">
              {title}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// Responsive Quick Action card
function HospitalQuickAction({ 
  title, 
  description, 
  icon: Icon, 
  href,
  color = "blue",
  delay = 0
}: { 
  title: string; 
  description: string;
  icon: React.ElementType;
  href: string;
  color?: "blue" | "teal" | "purple" | "red";
  delay?: number;
}) {
  const colors = {
    blue: "from-blue-500 to-cyan-500",
    teal: "from-teal-500 to-emerald-500",
    purple: "from-purple-500 to-violet-500",
    red: "from-red-500 to-rose-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <Link href={href}>
        <div className="relative p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br ${colors[color]}`}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>
          
          <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1 sm:mb-2">
            {title}
          </h3>
          
          <p className="text-xs text-slate-600 line-clamp-2">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// Responsive Patient Queue card
function PatientQueueCard({ 
  name, 
  queueNumber, 
  doctor, 
  waitTime,
  status
}: { 
  name: string; 
  queueNumber: number; 
  doctor: string; 
  waitTime: string;
  status: "waiting" | "called" | "in_consultation";
}) {
  const statusConfig = {
    waiting: { color: "bg-yellow-100 text-yellow-700", label: "Waiting" },
    called: { color: "bg-blue-100 text-blue-700", label: "Called" },
    in_consultation: { color: "bg-green-100 text-green-700", label: "In Consultation" }
  };

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white border border-slate-200 hover:border-blue-200 transition-colors">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs sm:text-sm">{queueNumber}</span>
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{name}</div>
          <div className="text-xs sm:text-sm text-slate-600 truncate">{doctor}</div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <Clock className="w-3 h-3 flex-shrink-0" />
            <span>Wait: {waitTime}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusConfig[status].color}`}>
          {statusConfig[status].label}
        </div>
      </div>
    </div>
  );
}

// FIXED: Responsive Appointment card with proper status labels
function HospitalAppointmentCard({ 
  time, 
  patient, 
  doctor, 
  department,
  status,
  type = "consultation"
}: { 
  time: string; 
  patient: string; 
  doctor: string; 
  department: string;
  status: "confirmed" | "checked_in" | "completed" | "no_show";
  type?: string;
}) {
  const statusConfig = {
    confirmed: { 
      color: "bg-blue-100 text-blue-700", 
      icon: CheckCircle2,
      label: "Confirmed"
    },
    checked_in: { 
      color: "bg-green-100 text-green-700", 
      icon: CheckCircle,
      label: "Checked In"
    },
    completed: { 
      color: "bg-teal-100 text-teal-700", 
      icon: CheckCircle,
      label: "Completed"
    },
    no_show: { 
      color: "bg-red-100 text-red-700", 
      icon: XCircle,
      label: "No Show"
    }
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white border border-slate-200 hover:border-blue-200 transition-colors gap-3 sm:gap-4">
      <div className="flex items-start gap-3 sm:gap-4 min-w-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        
        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
            <div className="font-medium text-slate-900 text-sm sm:text-base truncate">
              {time}
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 w-fit">
              {type}
            </span>
          </div>
          <div className="text-sm text-slate-600 font-medium truncate">{patient}</div>
          <div className="text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Stethoscope className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{doctor}</span>
            </div>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="truncate">{department}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <div className={`px-2 sm:px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${statusConfig[status].color} whitespace-nowrap`}>
          <StatusIcon className="w-3 h-3 flex-shrink-0" />
          <span className="hidden xs:inline">{statusConfig[status].label}</span>
        </div>
      </div>
    </div>
  );
}

// Responsive Hospital Alert
function HospitalAlert({ 
  title, 
  description, 
  icon: Icon,
  status
}: { 
  title: string; 
  description: string;
  icon: React.ElementType;
  status: "warning" | "info";
}) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${
      status === "warning" 
        ? "bg-amber-50/50 border-amber-100" 
        : "bg-blue-50/50 border-blue-100"
    }`}>
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        status === "warning" 
          ? "bg-gradient-to-br from-amber-500 to-orange-500" 
          : "bg-gradient-to-br from-blue-500 to-cyan-500"
      }`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{title}</div>
        <div className="text-xs sm:text-sm text-slate-600 truncate">{description}</div>
      </div>
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
        status === "warning" 
          ? "bg-amber-500" 
          : "bg-blue-500"
      }`} />
    </div>
  );
}

export default function HospitalDashboardPage() {
  const [time, setTime] = useState("");
  const [hospitalMetrics, setHospitalMetrics] = useState({
    patientsToday: 0,
    appointments: 0,
    waitingPatients: 0,
    emergencyRequests: 0,
    labResults: 0
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const greeting = hours < 12 ? "Morning" : hours < 18 ? "Afternoon" : "Evening";
      setTime(greeting);
    };
    updateTime();

    setTimeout(() => {
      setHospitalMetrics({
        patientsToday: 42,
        appointments: 18,
        waitingPatients: 7,
        emergencyRequests: 2,
        labResults: 3
      });
    }, 1000);

    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Key hospital stats - RESPONSIVE: Shows 2 on mobile, 3 on tablet, 5 on desktop
  const stats = [
    { 
      title: "Patients Today", 
      value: hospitalMetrics.patientsToday, 
      change: "+8", 
      icon: Users, 
      color: "blue" as const, 
      trend: "up" as const,
      loading: hospitalMetrics.patientsToday === 0
    },
    { 
      title: "Appointments", 
      value: hospitalMetrics.appointments, 
      change: "+3", 
      icon: Calendar, 
      color: "teal" as const, 
      trend: "up" as const,
      loading: hospitalMetrics.appointments === 0
    },
    { 
      title: "Waiting", 
      value: hospitalMetrics.waitingPatients, 
      change: "-2", 
      icon: Clock, 
      color: "orange" as const, 
      trend: "down" as const,
      loading: hospitalMetrics.waitingPatients === 0
    },
    { 
      title: "Emergencies", 
      value: hospitalMetrics.emergencyRequests, 
      change: "+1", 
      icon: AlertTriangle, 
      color: "red" as const, 
      trend: "up" as const,
      loading: hospitalMetrics.emergencyRequests === 0
    },
    { 
      title: "Lab Results", 
      value: hospitalMetrics.labResults, 
      change: "+2", 
      icon: Activity, 
      color: "purple" as const, 
      trend: "up" as const,
      loading: hospitalMetrics.labResults === 0
    },
  ];

  // Quick actions for hospital staff
  const quickActions = [
    { 
      title: "Check-in Patient", 
      description: "Register new or check-in existing patients", 
      icon: UserPlus, 
      href: "/hospital-dashboard/patients",
      color: "blue" as const
    },
    { 
      title: "Book Appointment", 
      description: "Schedule consultation for patient", 
      icon: Calendar, 
      href: "/hospital-dashboard/appointments/book",
      color: "teal" as const
    },
    { 
      title: "Manage Queue", 
      description: "View and manage patient queue", 
      icon: Clock, 
      href: "/hospital-dashboard/queue",
      color: "purple" as const
    },
    { 
      title: "Emergency", 
      description: "Handle emergency requests", 
      icon: Ambulance, 
      href: "/hospital-dashboard/emergency",
      color: "red" as const
    },
  ];

  const currentQueue = [
    { name: "John Doe", queueNumber: 1, doctor: "Dr. Adebola", waitTime: "5 mins", status: "called" as const },
    { name: "Amina Yusuf", queueNumber: 2, doctor: "Dr. Chioma", waitTime: "10 mins", status: "waiting" as const },
    { name: "Chinedu Okoro", queueNumber: 3, doctor: "Dr. Ahmed", waitTime: "15 mins", status: "waiting" as const },
  ];

  const todaysAppointments = [
    { time: "9:00 AM", patient: "Sarah Johnson", doctor: "Dr. Adebola", department: "Cardiology", status: "completed" as const },
    { time: "10:30 AM", patient: "Michael Chen", doctor: "Dr. Chioma", department: "Pediatrics", status: "checked_in" as const },
    { time: "11:45 AM", patient: "David Brown", doctor: "Dr. Ahmed", department: "Dermatology", status: "confirmed" as const },
    { time: "2:30 PM", patient: "Lisa Wang", doctor: "Dr. Adebola", department: "Cardiology", status: "confirmed" as const },
  ];

  const hospitalAlerts = [
    { title: "Low Stock Alert", description: "Paracetamol running low", icon: Package, status: "warning" as const },
    { title: "Ambulance Maintenance", description: "Ambulance #2 due for service", icon: Ambulance, status: "warning" as const },
    { title: "Lab Equipment", description: "Blood analyzer calibration due", icon: Activity, status: "info" as const },
  ];

  const recentActivities = [
    { icon: FileText, title: "New Patient Registered", description: "Amina Dauda registered", time: "10 mins ago" },
    { icon: MessageSquare, title: "Emergency Request", description: "Ambulance dispatched", time: "25 mins ago" },
    { icon: Ambulance, title: "Payment Received", description: "₦45,000 consultation fee", time: "1 hour ago" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-8 px-4 sm:px-0">
      {/* Welcome header - RESPONSIVE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-slate-500">Good {time},</div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
                    Lagos General Hospital
                  </h1>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="truncate">123 Medical St, Lagos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="truncate">0700-HEALTHBRIDGE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <span className="truncate">Open: 8AM - 6PM</span>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-200 w-full lg:w-auto justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse" />
              <span className="text-sm font-medium text-green-700 truncate">Hospital Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hospital stats grid - RESPONSIVE LAYOUT */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <HospitalStatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Quick actions - RESPONSIVE */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Quick Actions</h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">Essential tools for daily operations</p>
          </div>
          <Link 
            href="/hospital/settings" 
            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group w-fit"
          >
            More tools
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action, index) => (
            <HospitalQuickAction key={index} {...action} delay={index * 0.1} />
          ))}
        </div>
      </div>

      {/* Main content area - RESPONSIVE COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left column: Queue and appointments */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Current queue */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">Current Queue</h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Patients waiting for consultation</p>
              </div>
              <div className="flex items-center gap-3">
                <Link 
                  href="/hospital/queue/display" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                >
                  Queue Display
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:shadow-md transition-shadow whitespace-nowrap">
                  Call Next
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {currentQueue.map((patient, index) => (
                <PatientQueueCard key={index} {...patient} />
              ))}
            </div>
          </div>

          {/* Today's appointments - FIXED STATUS LABELS */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Today's Appointments</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Scheduled consultations and check-ups</p>
              </div>
              <Link 
                href="/hospital/appointments" 
                className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 group w-fit"
              >
                View all
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
            <div className="space-y-2">
              {todaysAppointments.map((appointment, index) => (
                <HospitalAppointmentCard key={index} {...appointment} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Alerts and activities */}
        <div className="space-y-4 sm:space-y-6">
          {/* Hospital alerts */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Hospital Alerts</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Important notifications</p>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-sm text-slate-500">{hospitalAlerts.length} active</span>
              </div>
            </div>
            <div className="space-y-2">
              {hospitalAlerts.map((alert, index) => (
                <HospitalAlert key={index} {...alert} />
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Recent Activity</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">Latest hospital updates</p>
              </div>
              <RefreshCw className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-500 transition-colors flex-shrink-0" />
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{activity.title}</div>
                    <p className="text-xs sm:text-sm text-slate-600 truncate">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to action - RESPONSIVE */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Need help with the system?</h3>
            <p className="text-slate-600 text-sm sm:text-base">
              Check our documentation or contact support for assistance with hospital operations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              href="/hospital/help"
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:shadow-md transition-shadow flex items-center gap-2 justify-center"
            >
              <FileText className="w-4 h-4" />
              <span>View Docs</span>
            </Link>
            <Link
              href="/hospital/settings/support"
              className="px-4 py-2.5 rounded-full bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 justify-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}