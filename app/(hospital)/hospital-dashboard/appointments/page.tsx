// app/hospital/appointments/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar, Search, Filter, Plus, MoreVertical,
  CheckCircle, Clock, X, User, Phone,
  Stethoscope, MapPin, Eye, Send,
  MessageSquare, Trash2, Edit, Download,
  ChevronDown, Users, DollarSign, Activity,
  AlertCircle, FileText, CreditCard, Wallet
} from "lucide-react";

// Appointment Card Component
function AppointmentCard({ appointment, onCheckIn, onView, onMessage, onCancel }: {
  appointment: any;
  onCheckIn: () => void;
  onView: () => void;
  onMessage: () => void;
  onCancel: () => void;
}) {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'checked_in': return 'bg-green-100 text-green-700';
      case 'in_consultation': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'no_show': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return Clock;
      case 'checked_in': return CheckCircle;
      case 'in_consultation': return Activity;
      case 'completed': return CheckCircle;
      case 'cancelled': return X;
      case 'no_show': return AlertCircle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(appointment.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          {/* Left side - Appointment info */}
          <div className="flex items-start gap-3 flex-1">
            {/* Patient avatar */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {appointment.patient.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Appointment details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                  {appointment.patient.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                    {appointment.status.replace('_', ' ')}
                  </span>
                  {appointment.payment.status === 'paid' ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Paid
                    </span>
                  ) : appointment.payment.status === 'partial' ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      Partial
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      Unpaid
                    </span>
                  )}
                </div>
              </div>

              {/* Appointment details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{appointment.date} • {appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>Dr. {appointment.doctor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{appointment.department}</span>
                </div>
              </div>

              {/* Reason and contact */}
              <div className="mt-3">
                <p className="text-sm text-gray-500 line-clamp-1">
                  <span className="font-medium">Reason:</span> {appointment.reason}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Phone className="w-4 h-4 text-gray-400" />
                    {appointment.patient.phone}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    {appointment.payment.amount}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    onView();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-50 text-gray-700 rounded-t-lg"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => {
                    onCheckIn();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <CheckCircle className="w-4 h-4" />
                  Check In
                </button>
                <button
                  onClick={() => {
                    onMessage();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-50 text-gray-700"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </button>
                <button
                  onClick={() => {
                    onCancel();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-red-50 text-red-600 rounded-b-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {appointment.status === 'scheduled' && (
            <button
              onClick={onCheckIn}
              className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded-lg hover:shadow-sm transition-all"
            >
              Check In Patient
            </button>
          )}
          
          {appointment.status === 'checked_in' && (
            <button
              onClick={() => {}}
              className="px-3 py-2 bg-gradient-to-r from-purple-600 to-violet-500 text-white text-xs font-medium rounded-lg hover:shadow-sm transition-all"
            >
              Start Consultation
            </button>
          )}

          <button
            onClick={onView}
            className="px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Patient File
          </button>

          <button
            onClick={onMessage}
            className="px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            Send Reminder
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HospitalAppointmentsPage() {
  const [activeTab, setActiveTab] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock appointments data
  const appointments = {
    today: [
      {
        id: 1,
        patient: { name: "John Doe", phone: "+234 801 234 5678" },
        date: "Today",
        time: "9:00 AM",
        doctor: "Adebola",
        department: "Cardiology",
        reason: "Chest pain and shortness of breath",
        status: "scheduled",
        payment: { status: "paid", method: "online", amount: "₦5,000" }
      },
      {
        id: 2,
        patient: { name: "Amina Yusuf", phone: "+234 802 345 6789" },
        date: "Today",
        time: "10:30 AM",
        doctor: "Chioma",
        department: "Pediatrics",
        reason: "Child's fever and cough",
        status: "checked_in",
        payment: { status: "partial", method: "cash", amount: "₦3,000/₦5,000" }
      },
      {
        id: 3,
        patient: { name: "Chinedu Okoro", phone: "+234 803 456 7890" },
        date: "Today",
        time: "11:00 AM",
        doctor: "Ahmed",
        department: "Dermatology",
        reason: "Skin rash consultation",
        status: "in_consultation",
        payment: { status: "unpaid", method: "pay_at_hospital", amount: "₦4,500" }
      },
      {
        id: 4,
        patient: { name: "Fatima Bello", phone: "+234 804 567 8901" },
        date: "Today",
        time: "2:00 PM",
        doctor: "Fatima",
        department: "Gynecology",
        reason: "Prenatal checkup",
        status: "scheduled",
        payment: { status: "paid", method: "online", amount: "₦7,000" }
      },
    ],
    upcoming: [
      {
        id: 5,
        patient: { name: "David Brown", phone: "+234 805 678 9012" },
        date: "Tomorrow",
        time: "9:30 AM",
        doctor: "Adebola",
        department: "Cardiology",
        reason: "Follow-up consultation",
        status: "scheduled",
        payment: { status: "paid", method: "transfer", amount: "₦5,000" }
      },
      {
        id: 6,
        patient: { name: "Sarah Johnson", phone: "+234 806 789 0123" },
        date: "Nov 28",
        time: "11:00 AM",
        doctor: "Chioma",
        department: "Pediatrics",
        reason: "Vaccination for 6-month old",
        status: "scheduled",
        payment: { status: "paid", method: "online", amount: "₦3,500" }
      },
    ],
    past: [
      {
        id: 7,
        patient: { name: "Michael Chen", phone: "+234 807 890 1234" },
        date: "Nov 20",
        time: "3:30 PM",
        doctor: "Ahmed",
        department: "Dermatology",
        reason: "Acne treatment follow-up",
        status: "completed",
        payment: { status: "paid", method: "cash", amount: "₦4,500" }
      },
      {
        id: 8,
        patient: { name: "Grace Okafor", phone: "+234 808 901 2345" },
        date: "Nov 18",
        time: "10:00 AM",
        doctor: "Fatima",
        department: "Gynecology",
        reason: "Annual checkup",
        status: "completed",
        payment: { status: "paid", method: "transfer", amount: "₦6,000" }
      },
    ]
  };

  const filteredAppointments = appointments[activeTab as keyof typeof appointments]
    .filter(apt => {
      if (statusFilter === 'all') return true;
      return apt.status === statusFilter;
    })
    .filter(apt => {
      if (!searchQuery) return true;
      return apt.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             apt.patient.phone.includes(searchQuery) ||
             apt.reason.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const handleCheckIn = (appointment: any) => {
    console.log('Check in:', appointment);
    // In real app, update appointment status
  };

  const handleViewDetails = (appointment: any) => {
    console.log('View details:', appointment);
    // In real app, navigate to appointment details
  };

  const handleSendMessage = (appointment: any) => {
    console.log('Send message:', appointment);
    // In real app, open chat with patient
  };

  const handleCancel = (appointment: any) => {
    if (confirm(`Cancel appointment for ${appointment.patient.name}?`)) {
      console.log('Cancel appointment:', appointment);
      // In real app, update appointment status
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-600 mt-1">Manage all patient appointments</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition-all">
            <Download className="w-5 h-5" />
            Export
          </button>
          <Link
            href="/hospital-dashboard/appointments/book"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">8</div>
              <div className="text-sm text-slate-600">Today's Total</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-slate-600">Checked In</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">₦42,500</div>
              <div className="text-sm text-slate-600">Revenue Today</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-amber-600">2</div>
              <div className="text-sm text-slate-600">Waiting</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search appointments by patient name, phone, or reason..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Tabs and filters */}
          <div className="flex flex-wrap gap-3">
            <div className="flex border border-slate-300 rounded-xl overflow-hidden">
              {[
                { id: 'today', label: 'Today' },
                { id: 'upcoming', label: 'Upcoming' },
                { id: 'past', label: 'Past' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="checked_in">Checked In</option>
                <option value="in_consultation">In Consultation</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map(appointment => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onCheckIn={() => handleCheckIn(appointment)}
            onView={() => handleViewDetails(appointment)}
            onMessage={() => handleSendMessage(appointment)}
            onCancel={() => handleCancel(appointment)}
          />
        ))}

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No appointments found</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery 
                ? `No appointments match "${searchQuery}"`
                : `No ${activeTab} appointments`}
            </p>
            <Link
              href="/hospital-dashboard/appointments/book"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Book New Appointment
            </Link>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing <span className="font-medium text-slate-900">{filteredAppointments.length}</span> appointments
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Checked In</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}