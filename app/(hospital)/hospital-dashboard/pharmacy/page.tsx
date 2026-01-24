// app/hospital/pharmacy/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Filter, Package, Pill, AlertTriangle,
  Clock, CheckCircle, XCircle, Download,
  Eye, Printer, Plus,
  ChevronDown, ChevronUp, RefreshCw,
  TrendingUp, TrendingDown, PackageOpen,
  Calendar, User, Stethoscope, Truck,
  CreditCard, Bell, BarChart3, FileText,
  ShoppingCart, FileEdit, Trash2,
  Upload, Tag, Award, Shield, Star,
  Zap, Target, MessageSquare, Mail,
  Smartphone, MapPin, ExternalLink,
  ShoppingBag, Layers, BarChart,
  Percent, DollarSign, Package2,
  ClipboardCheck, Truck as TruckIcon,
  Receipt, Users, Activity, X
} from "lucide-react";

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  price: string;
  instructions?: string; // Made optional
}

interface Prescription {
  id: string;
  patient: { 
    name: string; 
    id: string; 
    phone: string;
  };
  doctor: string;
  department: string;
  date: string;
  medicines: Medicine[];
  total: string;
  status: string;
  paymentStatus: string;
  delivery: {
    type: string;
    status: string;
    address?: string;
  };
  fulfilledDate?: string;
  fulfilledBy?: string;
}

export default function PharmacyPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [showAddMedicine, setShowAddMedicine] = useState(false);

  // Mock data with proper typing
  const prescriptions = {
    pending: [
      {
        id: "1",
        patient: { name: "John Doe", id: "P-001234", phone: "+234 801 234 5678" },
        doctor: "Dr. Adebola Johnson",
        department: "Cardiology",
        date: "Nov 15, 2024, 10:30 AM",
        medicines: [
          { id: "M001", name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days", quantity: 30, price: "₦1,500", instructions: "Take in morning with food" },
          { id: "M002", name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days", quantity: 60, price: "₦2,000", instructions: "Take with meals" }
        ],
        total: "₦3,500",
        status: "pending",
        paymentStatus: "paid",
        delivery: { type: "pickup", status: "pending" }
      },
      {
        id: "2",
        patient: { name: "Mary Johnson", id: "P-001235", phone: "+234 802 345 6789" },
        doctor: "Dr. Chioma Okafor",
        department: "General Medicine",
        date: "Nov 15, 2024, 11:00 AM",
        medicines: [
          { id: "M003", name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "7 days", quantity: 21, price: "₦1,200", instructions: "Take before meals" },
          { id: "M004", name: "Paracetamol", dosage: "500mg", frequency: "As needed", duration: "7 days", quantity: 20, price: "₦800", instructions: "For pain relief" }
        ],
        total: "₦2,000",
        status: "pending",
        paymentStatus: "pending",
        delivery: { type: "delivery", status: "scheduled", address: "123 Medical Street, Lagos" }
      },
      {
        id: "3",
        patient: { name: "David Smith", id: "P-001236", phone: "+234 803 456 7890" },
        doctor: "Dr. Ahmed Musa",
        department: "Emergency",
        date: "Nov 15, 2024, 9:15 AM",
        medicines: [
          { id: "M005", name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", duration: "30 days", quantity: 30, price: "₦2,500", instructions: "Take at bedtime" },
          { id: "M006", name: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "30 days", quantity: 30, price: "₦900", instructions: "Take with food" }
        ],
        total: "₦3,400",
        status: "pending",
        paymentStatus: "paid",
        delivery: { type: "delivery", status: "ready", address: "456 Health Avenue, Abuja" }
      }
    ] as Prescription[],
    fulfilled: [
      {
        id: "4",
        patient: { name: "Sarah Williams", id: "P-001237", phone: "+234 804 567 8901" },
        doctor: "Dr. Adebola Johnson",
        department: "Cardiology",
        date: "Nov 14, 2024, 2:00 PM",
        fulfilledDate: "Nov 14, 2024, 2:30 PM",
        medicines: [
          { id: "M007", name: "Vitamin C", dosage: "1000mg", frequency: "Once daily", duration: "30 days", quantity: 30, price: "₦1,800" }
        ],
        total: "₦1,800",
        status: "fulfilled",
        paymentStatus: "paid",
        fulfilledBy: "Pharm. Tunde Adeyemi",
        delivery: { type: "pickup", status: "completed" }
      }
    ] as Prescription[],
    inProgress: [
      {
        id: "5",
        patient: { name: "Peter Parker", id: "P-001238", phone: "+234 805 678 9012" },
        doctor: "Dr. Chioma Okafor",
        department: "Pediatrics",
        date: "Nov 15, 2024, 1:30 PM",
        medicines: [
          { id: "M008", name: "Amoxicillin Suspension", dosage: "250mg/5ml", frequency: "Three times daily", duration: "10 days", quantity: 1, price: "₦3,500", instructions: "Shake well before use" }
        ],
        total: "₦3,500",
        status: "preparing",
        paymentStatus: "paid",
        delivery: { type: "delivery", status: "processing" }
      }
    ] as Prescription[]
  };

  const inventoryAlerts = [
    { id: "I001", medicine: "Amoxicillin 500mg", stock: 15, reorderLevel: 20, status: "critical", category: "Antibiotic", lastOrdered: "Nov 1, 2024" },
    { id: "I002", medicine: "Paracetamol 500mg", stock: 25, reorderLevel: 30, status: "low", category: "Analgesic", lastOrdered: "Oct 25, 2024" },
    { id: "I003", medicine: "Vitamin C 1000mg", stock: 50, reorderLevel: 30, status: "normal", category: "Vitamin", lastOrdered: "Oct 15, 2024" },
    { id: "I004", medicine: "Lisinopril 10mg", stock: 120, reorderLevel: 50, status: "good", category: "Hypertension", lastOrdered: "Sep 30, 2024" }
  ];

  const expiringMedicines = [
    { id: "E001", medicine: "Lisinopril 10mg", expiry: "Dec 2024", quantity: 120, category: "Hypertension", batch: "LIS-2024-01" },
    { id: "E002", medicine: "Metformin 500mg", expiry: "Jan 2025", quantity: 200, category: "Diabetes", batch: "MET-2024-02" },
    { id: "E003", medicine: "Amoxicillin 500mg", expiry: "Feb 2025", quantity: 45, category: "Antibiotic", batch: "AMX-2024-03" }
  ];

  const popularMedicines = [
    { name: "Paracetamol", sales: 125, revenue: "₦250,000" },
    { name: "Amoxicillin", sales: 89, revenue: "₦356,000" },
    { name: "Vitamin C", sales: 67, revenue: "₦201,000" },
    { name: "Lisinopril", sales: 45, revenue: "₦135,000" }
  ];

  const pharmacyStats = {
    today: {
      prescriptions: 24,
      revenue: "₦89,500",
      fulfilled: 18,
      pending: 6
    },
    thisWeek: {
      prescriptions: 156,
      revenue: "₦450,000",
      growth: "+12%"
    }
  };

  // Get current prescriptions based on active tab
  const getCurrentPrescriptions = (): Prescription[] => {
    if (activeTab === "all") {
      return [...prescriptions.pending, ...prescriptions.inProgress, ...prescriptions.fulfilled];
    }
    return prescriptions[activeTab as keyof typeof prescriptions] || [];
  };

  const currentPrescriptions = getCurrentPrescriptions();

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Pharmacy Management</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Manage prescriptions, inventory, and medicine sales</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-2 sm:px-4 sm:py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm sm:text-base">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button 
            onClick={() => setShowAddPrescription(true)}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">New Prescription</span>
            <span className="sm:hidden">Add Rx</span>
          </button>
          <button 
            onClick={() => setShowAddMedicine(true)}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            <Pill className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Add Medicine</span>
            <span className="sm:hidden">Add Med</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - Improved Responsiveness */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Package className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{pharmacyStats.today.prescriptions}</div>
          <div className="text-xs sm:text-sm text-slate-600">Today's Prescriptions</div>
          <div className="flex items-center gap-2 mt-2 text-xs text-green-600">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            {pharmacyStats.today.pending} pending
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
              <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{pharmacyStats.today.revenue}</div>
          <div className="text-xs sm:text-sm text-slate-600">Today's Revenue</div>
          <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            {pharmacyStats.thisWeek.growth} this week
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
              <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{inventoryAlerts.filter(a => a.status === 'critical' || a.status === 'low').length}</div>
          <div className="text-xs sm:text-sm text-slate-600">Low Stock Items</div>
          <div className="flex items-center gap-2 mt-2 text-xs text-red-600">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            Needs immediate attention
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
              <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{expiringMedicines.length}</div>
          <div className="text-xs sm:text-sm text-slate-600">Expiring Soon</div>
          <div className="flex items-center gap-2 mt-2 text-xs text-orange-600">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            Check inventory
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Prescriptions */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Prescriptions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max border-b border-slate-200">
                {[
                  { id: "pending", label: "Pending", count: prescriptions.pending.length, icon: Clock },
                  { id: "inProgress", label: "Preparing", count: prescriptions.inProgress.length, icon: Package },
                  { id: "fulfilled", label: "Fulfilled", count: prescriptions.fulfilled.length, icon: CheckCircle },
                  { id: "all", label: "All", count: currentPrescriptions.length, icon: FileText }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{tab.label}</span>
                      {tab.count > 0 && (
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search and Filter */}
            <div className="p-3 sm:p-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by patient name, ID, or medicine..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-3 sm:px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Prescriptions List */}
            <div className="p-3 sm:p-4 max-h-[600px] overflow-y-auto">
              {currentPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="p-3 sm:p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors mb-3 sm:mb-4 last:mb-0"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <div className="font-bold text-slate-900 truncate">{prescription.patient.name}</div>
                            <span className="text-xs sm:text-sm text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {prescription.patient.id}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              prescription.paymentStatus === 'paid' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {prescription.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{prescription.doctor} • {prescription.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>{prescription.date}</span>
                            </div>
                            {prescription.patient.phone && (
                              <div className="flex items-center gap-2">
                                <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span>{prescription.patient.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1">
                          <div className="text-lg sm:text-xl font-bold text-slate-900">{prescription.total}</div>
                          {prescription.delivery && (
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              prescription.delivery.status === 'completed' ? 'bg-green-100 text-green-700' :
                              prescription.delivery.status === 'ready' ? 'bg-blue-100 text-blue-700' :
                              prescription.delivery.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {prescription.delivery.type === 'delivery' ? '🚚 Delivery' : '🏥 Pickup'} • {prescription.delivery.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medicines List */}
                  <div className="border-t border-slate-200 pt-3 sm:pt-4">
                    <div className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      <span>Prescribed Medicines</span>
                      <span className="text-xs text-slate-500">({prescription.medicines.length} items)</span>
                    </div>
                    <div className="space-y-2">
                      {prescription.medicines.map((medicine) => (
                        <div key={medicine.id} className="p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium text-slate-900 truncate">{medicine.name}</div>
                                <span className="text-xs text-slate-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                  {medicine.dosage}
                                </span>
                              </div>
                              <div className="text-xs text-slate-600 space-y-0.5">
                                <div>Frequency: {medicine.frequency} • Duration: {medicine.duration}</div>
                                <div>Quantity: {medicine.quantity} pieces</div>
                                {medicine.instructions && (
                                  <div className="text-blue-600">Instructions: {medicine.instructions}</div>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-slate-900 text-sm sm:text-base">{medicine.price}</div>
                              <div className="text-xs text-slate-500 mt-1">
                                {prescription.status === 'pending' && (
                                  <span className="inline-flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    To be prepared
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200">
                      <div className="space-y-1">
                        <div className="font-medium text-slate-900">Total Amount</div>
                        <div className="text-xs text-slate-600">Includes all medicines</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xl sm:text-2xl font-bold text-slate-900">{prescription.total}</div>
                        <div className="flex gap-1">
                          {prescription.status === 'pending' && (
                            <>
                              <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Mark Fulfilled</span>
                                <span className="sm:hidden">Fulfill</span>
                              </button>
                              <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Hold</span>
                              </button>
                            </>
                          )}
                          <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">View</span>
                          </button>
                          <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Print</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Alerts, Inventory & Actions */}
        <div className="space-y-4 sm:space-y-6">
          {/* Stock Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Inventory Alerts</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Low stock and expiring medicines</p>
              </div>
              <Bell className="w-5 h-5 text-red-500" />
            </div>
            
            {/* Low Stock */}
            <div className="mb-4 sm:mb-6">
              <div className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span>Low Stock</span>
                <span className="text-xs text-slate-500">({inventoryAlerts.filter(a => a.status === 'critical' || a.status === 'low').length})</span>
              </div>
              <div className="space-y-2">
                {inventoryAlerts.filter(a => a.status === 'critical' || a.status === 'low').map((alert) => (
                  <div key={alert.id} className="p-2 sm:p-3 rounded-lg border border-red-100 bg-red-50">
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-medium text-slate-900 text-sm">{alert.medicine}</div>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                        alert.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {alert.status === 'critical' ? 'Critical' : 'Low'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 flex justify-between">
                      <span>Stock: {alert.stock}</span>
                      <span>Reorder: {alert.reorderLevel}</span>
                    </div>
                    <button className="w-full mt-2 px-2 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      Order Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Expiring Soon */}
            <div>
              <div className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>Expiring Soon</span>
                <span className="text-xs text-slate-500">({expiringMedicines.length})</span>
              </div>
              <div className="space-y-2">
                {expiringMedicines.map((medicine) => (
                  <div key={medicine.id} className="p-2 sm:p-3 rounded-lg border border-orange-100 bg-orange-50">
                    <div className="font-medium text-slate-900 text-sm">{medicine.medicine}</div>
                    <div className="text-xs text-slate-600 mt-1 flex justify-between">
                      <span>Expires: {medicine.expiry}</span>
                      <span>Qty: {medicine.quantity}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Batch: {medicine.batch}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
          >
            <h3 className="font-bold text-slate-900 mb-3 sm:mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button className="p-3 rounded-lg border border-slate-300 hover:border-blue-300 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100">
                  <PackageOpen className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-slate-700 text-xs sm:text-sm text-center">Check Inventory</span>
              </button>
              <button className="p-3 rounded-lg border border-slate-300 hover:border-green-300 hover:bg-green-50 transition-all flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <ShoppingCart className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-slate-700 text-xs sm:text-sm text-center">Order Supplies</span>
              </button>
              <button className="p-3 rounded-lg border border-slate-300 hover:border-purple-300 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-lg bg-purple-100">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium text-slate-700 text-xs sm:text-sm text-center">Sales Report</span>
              </button>
              <button className="p-3 rounded-lg border border-slate-300 hover:border-red-300 hover:bg-red-50 transition-all flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-lg bg-red-100">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <span className="font-medium text-slate-700 text-xs sm:text-sm text-center">Export Data</span>
              </button>
            </div>
          </motion.div>

          {/* Popular Medicines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="font-bold text-slate-900">Popular This Month</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-3">
              {popularMedicines.map((medicine, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${
                      index === 0 ? 'bg-yellow-100' :
                      index === 1 ? 'bg-blue-100' :
                      index === 2 ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      <Pill className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        index === 0 ? 'text-yellow-600' :
                        index === 1 ? 'text-blue-600' :
                        index === 2 ? 'text-green-600' : 'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{medicine.name}</div>
                      <div className="text-xs text-slate-600">{medicine.sales} units sold</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{medicine.revenue}</div>
                    <div className="text-xs text-slate-500">revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Prescription Modal */}
      {showAddPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">New Prescription</h3>
                  <p className="text-slate-600 mt-1">Add prescription for patient</p>
                </div>
                <button
                  onClick={() => setShowAddPrescription(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Prescription form would go here */}
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-slate-700">Prescription Form</h4>
                <p className="text-slate-500 mt-2">This would contain patient selection, medicine selection, dosage, etc.</p>
                <button
                  onClick={() => setShowAddPrescription(false)}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Start Adding Prescription
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Medicine Modal */}
      {showAddMedicine && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Add New Medicine</h3>
                  <p className="text-slate-600 mt-1">Add medicine to inventory</p>
                </div>
                <button
                  onClick={() => setShowAddMedicine(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Medicine form would go here */}
              <div className="text-center py-12">
                <Pill className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-slate-700">Add Medicine Form</h4>
                <p className="text-slate-500 mt-2">This would contain medicine details, pricing, stock quantity, etc.</p>
                <button
                  onClick={() => setShowAddMedicine(false)}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Add Medicine Details
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}