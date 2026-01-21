// app/patients-dashboard/notifications/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Bell, AlertCircle, CheckCircle, Clock, 
  Calendar, MessageSquare, FileText, Pill,
  Heart, Activity, Thermometer, Download,
  ChevronRight, Search, Filter, Trash2,
  X, ChevronLeft, MoreVertical, Settings,
  User, Stethoscope, Video, Phone,
  Shield, CreditCard, Ambulance, Target,
  Star, Info, Zap, ShoppingCart,
  Battery, TrendingUp, TrendingDown,
  BellOff, CheckCheck, Archive
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Notification Item Component
function NotificationItem({ 
  notification,
  onRead,
  onDelete,
  isSelected,
  onSelect
}: { 
  notification: any;
  onRead: () => void;
  onDelete: () => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const priorityColors = {
    critical: "bg-red-100 text-red-700 border-red-200",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    medium: "bg-blue-100 text-blue-700 border-blue-200",
    low: "bg-slate-100 text-slate-700 border-slate-200"
  };

  const categoryIcons = {
    appointment: Calendar,
    prescription: Pill,
    lab: FileText,
    billing: CreditCard,
    health: Activity,
    emergency: Ambulance,
    message: MessageSquare,
    system: Bell
  };

  const CategoryIcon = categoryIcons[notification.category as keyof typeof categoryIcons];
  const timeAgo = notification.timeAgo;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`group relative rounded-xl border transition-all duration-200 hover:shadow-md ${
        notification.unread 
          ? "border-blue-200 bg-blue-50/50" 
          : "border-slate-200 bg-white"
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className="p-4 md:p-5">
        <div className="flex items-start gap-3 md:gap-4">
          {/* Select Checkbox */}
          <div className="flex items-center pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(notification.id)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
          </div>

          {/* Icon */}
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
              notification.unread 
                ? "bg-gradient-to-br from-blue-500 to-cyan-500" 
                : "bg-slate-100"
            }`}>
              <CategoryIcon className={`w-5 h-5 md:w-6 md:h-6 ${
                notification.unread ? "text-white" : "text-slate-600"
              }`} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className={`font-semibold text-sm md:text-base truncate ${
                    notification.unread ? "text-slate-900" : "text-slate-700"
                  }`}>
                    {notification.title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors[notification.priority as keyof typeof priorityColors]}`}>
                    {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                  </span>
                </div>
                <p className="text-slate-600 text-sm line-clamp-2 mb-2">{notification.message}</p>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeAgo}
                  </span>
                  {notification.actionRequired && (
                    <span className="flex items-center gap-1 text-amber-600 font-medium">
                      <AlertCircle className="w-3 h-3" />
                      Action Required
                    </span>
                  )}
                  {notification.sender && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {notification.sender}
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                {notification.unread && (
                  <button
                    onClick={onRead}
                    className="px-3 py-1.5 text-xs rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Mark Read
                  </button>
                )}
                <button
                  onClick={onDelete}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions for certain notifications */}
        {notification.quickActions && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap gap-2">
              {notification.quickActions.map((action: any, index: number) => (
                <button
                  key={index}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1"
                >
                  {action.icon === 'calendar' && <Calendar className="w-3 h-3" />}
                  {action.icon === 'message' && <MessageSquare className="w-3 h-3" />}
                  {action.icon === 'download' && <Download className="w-3 h-3" />}
                  {action.icon === 'video' && <Video className="w-3 h-3" />}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Bulk Actions Component
function BulkActions({ 
  selectedCount, 
  onMarkAsRead, 
  onDeleteSelected,
  onClearSelection
}: { 
  selectedCount: number;
  onMarkAsRead: () => void;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
}) {
  if (selectedCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10"
    >
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 flex items-center gap-4">
        <div className="text-sm font-medium text-slate-900">
          {selectedCount} notification{selectedCount !== 1 ? 's' : ''} selected
        </div>
        <div className="flex gap-2">
          <button
            onClick={onMarkAsRead}
            className="px-3 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-1"
          >
            <CheckCircle className="w-4 h-4" />
            Mark as Read
          </button>
          <button
            onClick={onDeleteSelected}
            className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button
            onClick={onClearSelection}
            className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Notification Settings Modal
function NotificationSettingsModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    medicationReminders: true,
    labResults: true,
    billingAlerts: true,
    healthAlerts: true,
    marketingEmails: false,
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const notificationTypes = [
    {
      category: "Communication",
      settings: [
        { key: "pushNotifications", label: "Push Notifications", description: "Receive notifications in your browser" },
        { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email" },
        { key: "smsNotifications", label: "SMS Notifications", description: "Receive notifications via text message" },
      ]
    },
    {
      category: "Appointments",
      settings: [
        { key: "appointmentReminders", label: "Appointment Reminders", description: "Reminders for upcoming appointments" },
      ]
    },
    {
      category: "Medical",
      settings: [
        { key: "medicationReminders", label: "Medication Reminders", description: "Reminders to take medications" },
        { key: "labResults", label: "Lab Results", description: "Notifications when test results are available" },
        { key: "healthAlerts", label: "Health Alerts", description: "Alerts for abnormal health metrics" },
      ]
    },
    {
      category: "Administrative",
      settings: [
        { key: "billingAlerts", label: "Billing Alerts", description: "Notifications about payments and bills" },
        { key: "marketingEmails", label: "Marketing Emails", description: "Receive health tips and updates" },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* Modal header */}
              <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">Notification Settings</h2>
                    <p className="text-slate-600 mt-1 text-sm md:text-base">Customize how you receive notifications</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
              
              {/* Modal content */}
              <div className="overflow-y-auto p-4 md:p-6" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                <div className="space-y-6">
                  {notificationTypes.map((type) => (
                    <div key={type.category}>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">{type.category}</h3>
                      <div className="space-y-3">
                        {type.settings.map((setting) => (
                          <div key={setting.key} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                            <div>
                              <div className="font-medium text-slate-900">{setting.label}</div>
                              <div className="text-sm text-slate-600 mt-1">{setting.description}</div>
                            </div>
                            <button
                              onClick={() => toggleSetting(setting.key)}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                settings[setting.key as keyof typeof settings] ? 'bg-blue-500' : 'bg-slate-200'
                              }`}
                            >
                              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                settings[setting.key as keyof typeof settings] ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        <span className="font-medium">Note:</span> Critical notifications (emergencies, abnormal test results) will always be sent regardless of these settings.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 md:px-6 md:py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    Cancel
                  </button>
                  
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setSettings({
                          pushNotifications: true,
                          emailNotifications: true,
                          smsNotifications: false,
                          appointmentReminders: true,
                          medicationReminders: true,
                          labResults: true,
                          billingAlerts: true,
                          healthAlerts: true,
                          marketingEmails: false,
                        });
                      }}
                      className="px-4 py-2 md:px-6 md:py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
                    >
                      Reset to Default
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
                    >
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample notifications data covering all scenarios
  useEffect(() => {
    const sampleNotifications = [
      // Appointment Notifications
      {
        id: "1",
        title: "Appointment Confirmed",
        message: "Your appointment with Dr. Adebola Johnson is confirmed for Today at 2:30 PM",
        category: "appointment",
        priority: "high",
        unread: true,
        timeAgo: "2 hours ago",
        actionRequired: true,
        sender: "Cardiology Department",
        quickActions: [
          { icon: 'calendar', label: 'View Details' },
          { icon: 'message', label: 'Message Doctor' }
        ]
      },
      {
        id: "2",
        title: "Queue Position Update",
        message: "Your queue position for Dr. Johnson is now #3. Estimated wait time: 15 minutes",
        category: "appointment",
        priority: "medium",
        unread: true,
        timeAgo: "30 minutes ago",
        actionRequired: false,
        sender: "Reception",
        quickActions: [
          { icon: 'video', label: 'Join Virtual Wait' }
        ]
      },
      {
        id: "3",
        title: "Appointment Reminder",
        message: "Reminder: You have an appointment tomorrow at 10:00 AM with Dr. Chioma Okoro",
        category: "appointment",
        priority: "medium",
        unread: false,
        timeAgo: "1 day ago",
        actionRequired: false,
        sender: "Pediatrics Department"
      },

      // Lab Results Notifications
      {
        id: "4",
        title: "Lab Results Available",
        message: "Your blood test results from Nov 15 are now available for viewing",
        category: "lab",
        priority: "high",
        unread: true,
        timeAgo: "3 hours ago",
        actionRequired: true,
        sender: "Lab Department",
        quickActions: [
          { icon: 'download', label: 'View Results' }
        ]
      },
      {
        id: "5",
        title: "Abnormal Test Result",
        message: "Alert: Your recent blood sugar test shows elevated levels. Please contact your doctor.",
        category: "lab",
        priority: "critical",
        unread: true,
        timeAgo: "1 hour ago",
        actionRequired: true,
        sender: "Dr. Ahmed Hassan"
      },

      // Prescription Notifications
      {
        id: "6",
        title: "Prescription Expiring Soon",
        message: "Your prescription for Amoxicillin will expire in 7 days. Please request a refill if needed.",
        category: "prescription",
        priority: "medium",
        unread: false,
        timeAgo: "2 days ago",
        actionRequired: true,
        sender: "Pharmacy"
      },
      {
        id: "7",
        title: "Refill Ready for Pickup",
        message: "Your medication refill for Lisinopril is ready for pickup at Main Hospital Pharmacy",
        category: "prescription",
        priority: "high",
        unread: true,
        timeAgo: "5 hours ago",
        actionRequired: true,
        sender: "Pharmacy",
        quickActions: [
          { icon: 'calendar', label: 'Schedule Pickup' }
        ]
      },

      // Billing Notifications
      {
        id: "8",
        title: "Payment Due Soon",
        message: "Payment of ₦5,500 for your recent appointment is due in 3 days",
        category: "billing",
        priority: "medium",
        unread: true,
        timeAgo: "1 day ago",
        actionRequired: true,
        sender: "Billing Department",
        quickActions: [
          { icon: 'download', label: 'Pay Now' }
        ]
      },
      {
        id: "9",
        title: "Payment Confirmation",
        message: "Your payment of ₦9,000 has been processed successfully. Receipt #INV-2024-1234",
        category: "billing",
        priority: "low",
        unread: false,
        timeAgo: "3 days ago",
        actionRequired: false,
        sender: "Billing Department"
      },

      // Health Monitoring Notifications
      {
        id: "10",
        title: "Health Metric Alert",
        message: "Your blood pressure reading of 145/95 mmHg is above normal range. Please monitor.",
        category: "health",
        priority: "high",
        unread: true,
        timeAgo: "6 hours ago",
        actionRequired: true,
        sender: "Health Tracker"
      },
      {
        id: "11",
        title: "Medication Reminder",
        message: "Time to take your Metformin 850mg. Take with food as directed.",
        category: "prescription",
        priority: "medium",
        unread: false,
        timeAgo: "Today, 8:00 AM",
        actionRequired: false,
        sender: "Medication Reminder"
      },

      // Emergency Notifications
      {
        id: "12",
        title: "Emergency Response Dispatched",
        message: "Emergency services have been dispatched to your location. ETA: 8 minutes",
        category: "emergency",
        priority: "critical",
        unread: false,
        timeAgo: "1 week ago",
        actionRequired: true,
        sender: "Emergency Services"
      },

      // Message Notifications
      {
        id: "13",
        title: "New Message from Doctor",
        message: "Dr. Johnson sent you a message about your recent test results",
        category: "message",
        priority: "medium",
        unread: true,
        timeAgo: "4 hours ago",
        actionRequired: true,
        sender: "Dr. Adebola Johnson",
        quickActions: [
          { icon: 'message', label: 'Reply' }
        ]
      },

      // System Notifications
      {
        id: "14",
        title: "System Maintenance",
        message: "The patient portal will be undergoing maintenance tonight from 2:00 AM to 4:00 AM",
        category: "system",
        priority: "low",
        unread: false,
        timeAgo: "2 days ago",
        actionRequired: false,
        sender: "System Admin"
      }
    ];

    setNotifications(sampleNotifications);
  }, []);

  // Filter notifications based on selected filter and search query
  const filteredNotifications = notifications.filter(notification => {
    // Apply category filter
    if (filter !== "all" && notification.category !== filter) return false;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.sender?.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Handle notification actions
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleMarkSelectedAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => 
        selectedIds.has(notif.id) ? { ...notif, unread: false } : notif
      )
    );
    setSelectedIds(new Set());
  };

  const handleDeleteSelected = () => {
    setNotifications(prev => prev.filter(notif => !selectedIds.has(notif.id)));
    setSelectedIds(new Set());
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
    setSelectedIds(new Set());
  };

  const handleClearAll = () => {
    setNotifications([]);
    setSelectedIds(new Set());
  };

  const unreadCount = notifications.filter(n => n.unread).length;
  const categories = [
    { id: "all", label: "All", count: notifications.length, icon: Bell },
    { id: "appointment", label: "Appointments", count: notifications.filter(n => n.category === "appointment").length, icon: Calendar },
    { id: "prescription", label: "Medications", count: notifications.filter(n => n.category === "prescription").length, icon: Pill },
    { id: "lab", label: "Lab Results", count: notifications.filter(n => n.category === "lab").length, icon: FileText },
    { id: "billing", label: "Billing", count: notifications.filter(n => n.category === "billing").length, icon: CreditCard },
    { id: "health", label: "Health", count: notifications.filter(n => n.category === "health").length, icon: Heart },
    { id: "message", label: "Messages", count: notifications.filter(n => n.category === "message").length, icon: MessageSquare },
    { id: "unread", label: "Unread", count: unreadCount, icon: Bell, color: "text-blue-600" },
  ];

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Notifications</h1>
              <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMarkAllAsRead}
            className="px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
          >
            <CheckCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Mark All Read</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowSettings(true)}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">{notifications.length}</div>
              <div className="text-xs md:text-sm text-slate-600">Total</div>
            </div>
            <Bell className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-4 md:p-6 border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">
                {notifications.filter(n => n.priority === "critical").length}
              </div>
              <div className="text-xs md:text-sm text-slate-600">Critical</div>
            </div>
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">{unreadCount}</div>
              <div className="text-xs md:text-sm text-slate-600">Unread</div>
            </div>
            <Bell className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 md:p-6 border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">
                {notifications.filter(n => n.actionRequired).length}
              </div>
              <div className="text-xs md:text-sm text-slate-600">Action Required</div>
            </div>
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Search and Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notifications..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm md:text-base"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
        </div>
        <button
          onClick={handleClearAll}
          className="px-4 py-3 rounded-xl border border-red-300 text-red-700 font-medium hover:bg-red-50 transition-all flex items-center gap-2 justify-center"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear All</span>
        </button>
      </div>

      {/* Categories */}
      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4 min-w-max">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-3 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
                  filter === category.id
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${filter === category.id ? 'text-white' : category.color || 'text-slate-600'}`} />
                <span className="font-medium">{category.label}</span>
                {category.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    filter === category.id
                      ? "bg-white/20"
                      : category.id === "unread" && category.count > 0
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-200 text-slate-600"
                  }`}>
                    {category.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 md:space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={() => handleMarkAsRead(notification.id)}
              onDelete={() => handleDelete(notification.id)}
              isSelected={selectedIds.has(notification.id)}
              onSelect={handleSelect}
            />
          ))
        ) : (
          <div className="text-center py-12 md:py-16">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />
            </div>
            <h3 className="text-lg md:text-xl font-medium text-slate-900 mb-2">
              {searchQuery ? 'No matching notifications' : 'No notifications'}
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm md:text-base">
              {searchQuery 
                ? 'Try adjusting your search terms or clear the search filter'
                : 'You\'re all caught up! New notifications will appear here.'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg transition-all"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bulk Actions Floating Bar */}
      <BulkActions
        selectedCount={selectedIds.size}
        onMarkAsRead={handleMarkSelectedAsRead}
        onDeleteSelected={handleDeleteSelected}
        onClearSelection={() => setSelectedIds(new Set())}
      />

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}