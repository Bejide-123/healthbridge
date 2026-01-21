// app/patient-dashboard/components/Sidebar.tsx
"use client";

import { useState } from "react";
import {
  LayoutDashboard, Calendar, FileText, Pill,
  CreditCard, Ambulance, MessageSquare, User,
  Bell, HelpCircle, LogOut, Menu, X,
  ChevronRight, Shield, Hospital, Clock,
  Activity, Brain, Stethoscope,
  Heart, Zap, Smartphone, ArrowRight,
  ChevronUp, ChevronDown, Info, Activity as ActivityIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "../../context/SidebarContext";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [infoSectionOpen, setInfoSectionOpen] = useState(false);
  const { isOpen, closeSidebar } = useSidebar();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  const sidebarItems: SidebarItem[] = [
    { name: "Dashboard", href: "/patient-dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/patient-dashboard/appointments", icon: Calendar, badge: 2 },
    { name: "Medical Records", href: "/patient-dashboard/medical-records", icon: FileText },
    { name: "Prescriptions", href: "/patient-dashboard/prescriptions", icon: Pill, badge: 1 },
    { name: "Lab Results", href: "/patient-dashboard/lab-results", icon: ActivityIcon },
    { name: "Payments", href: "/patient-dashboard/payments", icon: CreditCard },
    { name: "Emergency", href: "/patient-dashboard/emergency", icon: Ambulance },
    { name: "AI Assistant", href: "/patient-dashboard/ai-assistant", icon: Brain },
    { name: "Health Tracker", href: "/patient-dashboard/health-tracker", icon: Heart },
    { name: "Telemedicine", href: "/patient-dashboard/telemedicine", icon: Smartphone },
    { name: "Profile", href: "/patient-dashboard/profile", icon: User },
    { name: "Notifications", href: "/patient-dashboard/notifications", icon: Bell, badge: 3 },
    { name: "Help", href: "/patient-dashboard/help", icon: HelpCircle },
  ];

  const quickActions = [
    { name: "Book Appointment", href: "/patient-dashboard/appointments/book", icon: Calendar, color: "from-blue-500 to-cyan-500" },
    { name: "Request Ambulance", href: "/patient-dashboard/emergency", icon: Ambulance, color: "from-red-500 to-rose-500" },
    { name: "Chat with AI", href: "/patient-dashboard/ai-assistant", icon: MessageSquare, color: "from-purple-500 to-violet-500" },
    { name: "View Records", href: "/patient-dashboard/medical-records", icon: FileText, color: "from-teal-500 to-emerald-500" },
  ];

  const isActive = (href: string) => {
    if (href === "/patient-dashboard") {
      return pathname === "/patient-dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -280,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200/50 bg-white/80 backdrop-blur-xl lg:static lg:block lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:transform-none`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
            <Link href="/patient-dashboard" className="flex items-center gap-3" onClick={handleLinkClick}>
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
              onClick={closeSidebar}
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
                    onClick={handleLinkClick}
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
                      onClick={handleLinkClick}
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
            {/* Toggle button for additional info */}
            <motion.button
              onClick={() => setInfoSectionOpen(!infoSectionOpen)}
              className="w-full mb-4 flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 text-white">
                  <Info className="w-4 h-4" />
                </div>
                <span className="font-medium">Additional Info</span>
              </div>
              {infoSectionOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
              )}
            </motion.button>

            {/* Collapsible info section */}
            <AnimatePresence>
              {infoSectionOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* Hospital info */}
                  <motion.div 
                    className="mb-4 p-3 rounded-lg bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border border-blue-100/50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
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
                    className="mb-4 p-3 rounded-lg bg-gradient-to-br from-green-50/50 to-emerald-50/50 border border-green-100/50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ActivityIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Health Score</span>
                    </div>
                    <div className="relative h-2 bg-green-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-green-700">
                      <span>85%</span>
                      <span className="font-medium">Excellent</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Sign Out button */}
            <motion.button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium hover:shadow-lg transition-all group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
              }}
            >
              {/* Red gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              
              {/* Icon with animation */}
              <motion.div 
                className="relative z-10 p-2 rounded-lg bg-white/20 backdrop-blur-sm"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <LogOut className="w-5 h-5 text-white" />
              </motion.div>
              
              {/* Text with animation */}
              <span className="font-medium flex-1 text-left relative z-10">Sign Out</span>
              
              {/* Animated arrow */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10"
              >
                <ArrowRight className="w-4 h-4 text-white/80" />
              </motion.div>
              
              {/* Hover particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${10 + i * 20}%`,
                      top: "20%",
                    }}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -10, opacity: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                ))}
              </div>
            </motion.button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
