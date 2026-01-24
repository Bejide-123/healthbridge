// app/hospital/components/Sidebar.tsx
"use client";

import { useState } from "react";
import {
  LayoutDashboard, Users, Calendar, Clock,
  FileText, Package, Microscope, Ambulance,
  MessageSquare, Settings, LogOut, X,
  ChevronRight, Building2, Bell,
  UserPlus, BarChart3, Pill, Stethoscope,
  Zap, ArrowRight
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

export default function HospitalSidebar() {
  const pathname = usePathname();
  const { isOpen, closeSidebar } = useSidebar();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  // Streamlined sidebar items
  const sidebarItems: SidebarItem[] = [
    { name: "Dashboard", href: "/hospital-dashboard", icon: LayoutDashboard },
    { name: "Patients", href: "/hospital-dashboard/patients", icon: Users, badge: 42 },
    { name: "Appointments", href: "/hospital-dashboard/appointments", icon: Calendar, badge: 8 },
    { name: "Book Appointment", href: "/hospital-dashboard/appointments/book", icon: Calendar },
    { name: "Queue", href: "/hospital-dashboard/queue", icon: Clock, badge: 7 },
    { name: "Medical Records", href: "/hospital-dashboard/records", icon: FileText },
    { name: "Prescriptions", href: "/hospital-dashboard/pharmacy", icon: Pill },
    { name: "Lab Tests", href: "/hospital-dashboard/lab", icon: Microscope },
    { name: "Messages", href: "/hospital-dashboard/messages", icon: MessageSquare, badge: 3 },
    { name: "Emergency", href: "/hospital-dashboard/emergency", icon: Ambulance, badge: 2 },
    { name: "Analytics", href: "/hospital-dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/hospital-dashboard/settings", icon: Settings },
  ];

  // Simplified quick actions
  const quickActions = [
    { name: "Check-in", href: "/hospital/patients/add", icon: Users, color: "from-blue-500 to-cyan-500" },
    { name: "Book Now", href: "/hospital/appointments/book", icon: Calendar, color: "from-green-500 to-teal-500" },
    { name: "Emergency", href: "/hospital/emergency", icon: Ambulance, color: "from-red-500 to-rose-500" },
    { name: "Messages", href: "/hospital/messages", icon: MessageSquare, color: "from-purple-500 to-violet-500" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
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
          {/* Simplified Sidebar header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200/50">
            <Link href="/hospital" className="flex items-center gap-3" onClick={handleLinkClick}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-slate-900 text-sm sm:text-base">HealthBridge</div>
                <div className="text-xs text-slate-500">Hospital</div>
              </div>
            </Link>
            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Navigation - Simple list */}
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
                        ? "bg-gradient-to-r from-green-50 to-teal-50 text-green-600 border border-green-100"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive(item.href)
                        ? "bg-gradient-to-br from-green-500 to-teal-500 text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium flex-1 text-sm sm:text-base">{item.name}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        isActive(item.href)
                          ? "bg-green-100 text-green-600"
                          : "bg-slate-200 text-slate-600"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive(item.href) && (
                      <ChevronRight className="w-4 h-4 text-green-500" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Quick actions - Simplified */}
            <div className="mt-8">
              <div className="px-2 mb-3">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Quick Actions
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 px-2">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="group relative p-3 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-center"
                    onClick={handleLinkClick}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-2 shadow-sm`}>
                      <action.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="text-xs font-medium text-slate-700 group-hover:text-slate-900">
                      {action.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Simplified Sign Out button */}
          <div className="border-t border-slate-200/50 p-4">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium hover:from-red-600 hover:to-rose-600 hover:shadow-lg transition-all"
            >
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <LogOut className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium flex-1 text-left">Sign Out</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

// Add missing icon component
const Monitor = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);