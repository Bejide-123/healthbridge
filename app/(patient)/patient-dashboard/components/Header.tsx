// app/patient-dashboard/components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, Bell, Search, MessageSquare, 
  ChevronRight, Ambulance, Zap, TrendingUp,
  Settings, User, Moon, Sun,
  X, Home, ChevronDown, Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "../../context/SidebarContext";

export default function DashboardHeader() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  const { toggleSidebar, closeSidebar } = useSidebar();

  const getPageTitle = () => {
    const path = pathname.replace('/patient-dashboard', '');
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

  const quickActions = [
    { icon: Plus, label: "Book Appointment", href: "/patient-dashboard/appointments/book", color: "bg-blue-500" },
    { icon: Bell, label: "Notifications", href: "/patient-dashboard/notifications", color: "bg-purple-500" },
    { icon: Ambulance, label: "Emergency", href: "/patient-dashboard/emergency", color: "bg-red-500" },
    { icon: MessageSquare, label: "Messages", href: "/patient-dashboard/messages", color: "bg-green-500" },
  ];

  return (
    <>
      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSearch(false)}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-4 right-4 z-50 lg:hidden"
            >
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search records, doctors..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none shadow-xl"
                  autoFocus
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Toggle - Now toggles sidebar */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-slate-100 lg:hidden transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            
            {/* Logo for mobile */}
            <Link href="/patient-dashboard" className="lg:hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
            </Link>
            
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Link href="/patient-dashboard" className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1">
                <Home className="w-3 h-3" />
                <span>Dashboard</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <span className="font-medium text-slate-900 truncate max-w-[150px] sm:max-w-none">
                {getPageTitle()}
              </span>
            </div>

            {/* Mobile Page Title */}
            <div className="sm:hidden">
              <span className="font-medium text-slate-900 text-sm truncate max-w-[120px]">
                {getPageTitle()}
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-lg hover:bg-slate-100 lg:hidden transition-colors"
            >
              <Search className="w-5 h-5 text-slate-600" />
            </button>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-48 xl:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
              </motion.div>
            </div>

            {/* Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-slate-600" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>

              {/* Notifications */}
              <button 
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
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
              <button 
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Messages"
              >
                <MessageSquare className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
              </button>

              {/* Settings */}
              <button 
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex lg:hidden items-center gap-1">
              {/* Notifications */}
              <button 
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            {/* Emergency button - Desktop */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block"
            >
              <Link
                href="/patient-dashboard/emergency"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium hover:from-red-600 hover:to-rose-600 hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base"
              >
                <Ambulance className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">Emergency</span>
                <span className="lg:hidden">EMS</span>
              </Link>
            </motion.div>

            {/* Emergency button - Mobile */}
            <Link
              href="/patient-dashboard/emergency"
              className="sm:hidden w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white flex items-center justify-center hover:shadow-lg transition-all"
              aria-label="Emergency"
            >
              <Ambulance className="w-5 h-5" />
            </Link>

            {/* Profile */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block" />
              </button>
              
              {/* Dropdown menu */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={() => setShowProfileDropdown(false)}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-50"
                  >
                    <div className="p-4 border-b border-slate-100">
                      <div className="font-medium text-slate-900">John Doe</div>
                      <div className="text-sm text-slate-500">Patient #HB234567</div>
                    </div>
                    <div className="p-2">
                      <Link 
                        href="/patient-dashboard/profile" 
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <Link 
                        href="/patient-dashboard/health-tracker" 
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>Health Tracker</span>
                      </Link>
                      <button 
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 w-full"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                      >
                        {isDarkMode ? (
                          <Sun className="w-4 h-4" />
                        ) : (
                          <Moon className="w-4 h-4" />
                        )}
                        <span>Dark Mode</span>
                        <div className="ml-auto w-10 h-6 rounded-full bg-slate-200 relative">
                          <div 
                            className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              isDarkMode ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </div>
                      </button>
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <Link 
                          href="/signout" 
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Sign Out</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions - Removed since they're in the sidebar */}
      </motion.header>
    </>
  );
}