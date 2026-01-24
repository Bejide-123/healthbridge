// app/hospital/components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, Bell, Search, MessageSquare,
  ChevronRight, Ambulance, Sun, Moon,
  Settings, User, ChevronDown, Building2,
  X, Home, Calendar, Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "../../context/SidebarContext";

export default function HospitalHeader() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  const { toggleSidebar } = useSidebar();

  const getPageTitle = () => {
    const path = pathname.replace('/hospital', '');
    if (path === '' || path === '/') return "Dashboard";
    if (path.includes('/patients')) return "Patients";
    if (path.includes('/appointments')) return "Appointments";
    if (path.includes('/queue')) return "Queue";
    if (path.includes('/messages')) return "Messages";
    if (path.includes('/pharmacy')) return "Pharmacy";
    if (path.includes('/lab')) return "Lab";
    if (path.includes('/emergency')) return "Emergency";
    if (path.includes('/settings')) return "Settings";
    if (path.includes('/analytics')) return "Analytics";
    return "Dashboard";
  };

  // Responsive hospital stats - shows different info based on screen size
  const HospitalStatusBar = () => (
    <div className="px-4 sm:px-6 py-2 border-t border-slate-100 bg-white">
      <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
        {/* Mobile: Compact stats */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-600">Status:</span>
            <span className="font-medium text-green-600">Open</span>
          </div>
          
          <div className="hidden xs:flex items-center gap-1.5">
            <Users className="w-3 h-3 text-slate-500" />
            <span className="text-slate-600">Patients:</span>
            <span className="font-medium text-slate-900">42</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-slate-500" />
            <span className="text-slate-600">Queue:</span>
            <span className="font-medium text-slate-900">7</span>
          </div>
          
          {/* Desktop: More detailed stats */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600">Hours:</span>
              <span className="font-medium text-slate-900">8AM - 6PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600">Emergency:</span>
              <span className="font-medium text-green-600">24/7</span>
            </div>
          </div>
        </div>

        {/* Emergency button - Responsive */}
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/hospital/emergency"
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium hover:from-red-600 hover:to-rose-600 transition-all flex items-center gap-2 text-xs sm:text-sm"
            >
              <Ambulance className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden xs:inline">Emergency</span>
              <span className="xs:hidden">EMS</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );

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
                  placeholder="Search patients..."
                  className="w-full pl-12 pr-10 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none shadow-xl"
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
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-slate-100 lg:hidden transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
            
            {/* Logo & Hospital Info */}
            <div className="flex items-center gap-3">
              <Link href="/hospital" className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                
                {/* Hospital name - shows/hides based on screen size */}
                <div className="block">
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 leading-tight">HealthBridge</div>
                  <div className="text-xs text-slate-500 leading-tight hidden xs:block">Hospital</div>
                </div>
              </Link>
              
              {/* Breadcrumb - Desktop only */}
              <div className="hidden lg:flex items-center gap-2 ml-4">
                <div className="text-slate-400">/</div>
                <div className="text-sm font-medium text-slate-900">
                  {getPageTitle()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search - Different on mobile vs desktop */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-lg hover:bg-slate-100 lg:hidden transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-slate-600" />
            </button>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-48 xl:w-64 pl-10 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Notifications - Always visible */}
              <button 
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-rose-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Messages - Desktop only */}
              <button 
                className="hidden lg:block relative p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                aria-label="Messages"
              >
                <MessageSquare className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
              </button>

              {/* Theme toggle - Desktop only */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="hidden lg:block p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-slate-600" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </button>

              {/* Settings - Desktop only */}
              <Link 
                href="/hospital/settings"
                className="hidden lg:block p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-slate-600" />
              </Link>

              {/* Profile */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Profile menu"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">AD</span>
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
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 z-50"
                    >
                      <div className="p-4 border-b border-slate-100">
                        <div className="font-medium text-slate-900">Amina Dauda</div>
                        <div className="text-sm text-slate-500">Receptionist</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600">Active</span>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link 
                          href="/hospital/settings/profile" 
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Profile Settings</span>
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
        </div>

        {/* Hospital Status Bar - Shows on all screen sizes */}
        <HospitalStatusBar />
      </motion.header>
    </>
  );
}