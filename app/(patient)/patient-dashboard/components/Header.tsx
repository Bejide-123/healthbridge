
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, Bell, Search, MessageSquare, 
  ChevronRight, Ambulance, Zap, TrendingUp,
  Settings, User, Moon, Sun
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getPageTitle = () => {
    const path = pathname.replace('/patients-dashboard', '');
    if (path === '' || path === '/') return "Dashboard Overview";
    if (path.includes('/appointments')) return "Appointments";
    if (path.includes('/medical-records')) return "Medical Records";
    if (path.includes('/prescriptions')) return "Prescriptions";
    if (path.includes('/lab-results')) return "Lab Results";
    if (path.includes('/payments')) return "Payments";
    if (path.includes('/emergency')) return "Emergency";
    if (path.includes('/ai-assistant')) return "AI Assistant";
    if (path.includes('/health-tracker')) return "Health Tracker";
    if (path.includes('/telemedicine')) return "Telemedicine";
    if (path.includes('/profile')) return "Profile";
    if (path.includes('/notifications')) return "Notifications";
    if (path.includes('/help')) return "Help";
    return "Dashboard";
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              // You'll need to handle sidebar toggle here
              // You can use context or a state management solution
            }}
            className="p-2 rounded-lg hover:bg-slate-100 lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link href="/patients-dashboard" className="text-slate-500 hover:text-slate-700 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-900">
              {getPageTitle()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <input
                type="search"
                placeholder="Search records, doctors..."
                className="w-64 pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
            </motion.div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-slate-600" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
            <motion.span 
              className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-rose-500 rounded-full text-xs text-white flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              3
            </motion.span>
          </button>

          {/* Messages */}
          <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <MessageSquare className="w-5 h-5 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Settings className="w-5 h-5 text-slate-600" />
          </button>

          {/* Emergency button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/patients-dashboard/emergency"
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium hover:from-red-600 hover:to-rose-600 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Ambulance className="w-4 h-4" />
              <span>Emergency</span>
            </Link>
          </motion.div>

          {/* Profile */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">JD</span>
              </div>
            </button>
            
            {/* Dropdown menu */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-4 border-b border-slate-100">
                <div className="font-medium text-slate-900">John Doe</div>
                <div className="text-sm text-slate-500">Patient #HB234567</div>
              </div>
              <div className="p-2">
                <Link href="/patients-dashboard/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700">
                  <User className="w-4 h-4" />
                  <span>Profile Settings</span>
                </Link>
                <Link href="/patients-dashboard/health-tracker" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700">
                  <TrendingUp className="w-4 h-4" />
                  <span>Health Tracker</span>
                </Link>
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 w-full">
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                  <div className="ml-auto w-10 h-6 rounded-full bg-slate-200 relative">
                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}