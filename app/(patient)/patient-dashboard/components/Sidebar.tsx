// components/patients-dashboard/sidebar/DashboardSidebar.tsx
"use client";

import { useState } from "react";
import { 
  LayoutDashboard, Calendar, FileText, Pill,
  CreditCard, Ambulance, MessageSquare, User,
  Bell, HelpCircle, LogOut, Menu, X,
  ChevronRight, Shield, Hospital, Clock,
  Activity, TrendingUp, Brain, Stethoscope,
  Heart, Zap, Smartphone, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

export default function DashboardSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const sidebarItems: SidebarItem[] = [
    { name: "Dashboard", href: "/patients-dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/patients-dashboard/appointments", icon: Calendar, badge: 2 },
    { name: "Medical Records", href: "/patients-dashboard/medical-records", icon: FileText },
    { name: "Prescriptions", href: "/patients-dashboard/prescriptions", icon: Pill, badge: 1 },
    { name: "Lab Results", href: "/patients-dashboard/lab-results", icon: Activity },
    { name: "Payments", href: "/patients-dashboard/payments", icon: CreditCard },
    { name: "Emergency", href: "/patients-dashboard/emergency", icon: Ambulance },
    { name: "AI Assistant", href: "/patients-dashboard/ai-assistant", icon: Brain },
    { name: "Health Tracker", href: "/patients-dashboard/health-tracker", icon: Heart },
    { name: "Telemedicine", href: "/patients-dashboard/telemedicine", icon: Smartphone },
    { name: "Profile", href: "/patients-dashboard/profile", icon: User },
    { name: "Notifications", href: "/patients-dashboard/notifications", icon: Bell, badge: 3 },
    { name: "Help", href: "/patients-dashboard/help", icon: HelpCircle },
  ];

  const quickActions = [
    { name: "Book Appointment", href: "/patients-dashboard/appointments/book", icon: Calendar, color: "from-blue-500 to-cyan-500" },
    { name: "Request Ambulance", href: "/patients-dashboard/emergency", icon: Ambulance, color: "from-red-500 to-rose-500" },
    { name: "Chat with AI", href: "/patients-dashboard/ai-assistant", icon: MessageSquare, color: "from-purple-500 to-violet-500" },
    { name: "View Records", href: "/patients-dashboard/medical-records", icon: FileText, color: "from-teal-500 to-emerald-500" },
  ];

  const isActive = (href: string) => {
    if (href === "/patients-dashboard") {
      return pathname === "/patients-dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: 280,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200/50 bg-white/80 backdrop-blur-xl lg:static lg:block lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:transform-none`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
            <Link href="/patients-dashboard" className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Hospital className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="font-bold text-slate-900">HealthBridge</div>
                <div className="text-xs text-slate-500">Patient Portal</div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Patient info card */}
          <motion.div 
            className="p-6 border-b border-slate-200/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">JD</span>
                </div>
                <motion.div 
                  className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900">John Doe</div>
                <div className="text-sm text-slate-500">Patient ID: #HB234567</div>
                <div className="flex items-center gap-1 mt-1">
                  <Shield className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-100"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive(item.href)
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium flex-1">{item.name}</span>
                    {item.badge && (
                      <motion.span 
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          isActive(item.href)
                            ? "bg-blue-100 text-blue-600"
                            : "bg-slate-200 text-slate-600"
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                    {isActive(item.href) && (
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Quick actions section */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="px-4 mb-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Quick Actions
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 px-2">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link
                      href={action.href}
                      className="group relative p-3 rounded-xl bg-white border border-slate-200/50 hover:border-slate-300 hover:shadow-md transition-all text-center block"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-xs font-medium text-slate-700 group-hover:text-slate-900">
                        {action.name}
                      </div>
                      <ArrowRight className="w-3 h-3 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </nav>

          {/* Sidebar footer */}
          <div className="border-t border-slate-200/50 p-6">
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all group">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-slate-200">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium flex-1">Sign Out</span>
            </button>
            
            {/* Hospital info */}
            <motion.div 
              className="mt-4 p-3 rounded-lg bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border border-blue-100/50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Hospital className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Lagos University Teaching Hospital</span>
              </div>
              <div className="text-xs text-blue-600/80">Your registered hospital</div>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                <Clock className="w-3 h-3" />
                <span>Open: 8AM - 6PM</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                <Stethoscope className="w-3 h-3" />
                <span>Emergency: 24/7</span>
              </div>
            </motion.div>

            {/* Health metrics */}
            <motion.div 
              className="mt-4 p-3 rounded-lg bg-gradient-to-br from-green-50/50 to-emerald-50/50 border border-green-100/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Health Score</span>
              </div>
              <div className="relative h-2 bg-green-100 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-green-700">
                <span>85%</span>
                <span className="font-medium">Excellent</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}