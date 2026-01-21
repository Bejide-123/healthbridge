// app/patient-dashboard/payments/page.tsx
"use client";

import { useState } from "react";
import { 
  CreditCard, Wallet, Receipt, TrendingUp,
  Download, Filter, Search, Calendar,
  CheckCircle, Clock, AlertCircle, ArrowUpRight,
  ArrowDownRight, Plus, MoreVertical, Eye,
  Share2, Printer, FileText, RefreshCw,
  ChevronRight, ChevronDown, DollarSign,
  Shield, Bell, Banknote, Smartphone,
  QrCode, CreditCard as Card, Smartphone as Mobile,
  ShieldCheck, Receipt as ReceiptIcon,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showPayModal, setShowPayModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);

  const tabs = [
    { id: "all", label: "All", count: 8 },
    { id: "pending", label: "Pending", count: 2 },
    { id: "paid", label: "Paid", count: 5 },
    { id: "overdue", label: "Overdue", count: 1 },
    { id: "insurance", label: "Insurance", count: 3 },
  ];

  const paymentMethods = [
    { id: 1, type: "card", name: "Visa **** 4582", isDefault: true, expiry: "12/25" },
    { id: 2, type: "bank", name: "GTBank Transfer", isDefault: false },
    { id: 3, type: "wallet", name: "HealthBridge Wallet", isDefault: false, balance: "₦25,000" },
  ];

  const invoices = [
    {
      id: "INV-2024-001",
      date: "Nov 15, 2024",
      service: "Annual Health Checkup",
      amount: "₦45,000",
      status: "paid",
      paymentMethod: "Card",
      insuranceCovered: "₦36,000",
      patientPortion: "₦9,000",
      dueDate: "Nov 15, 2024",
      doctor: "Dr. Chioma Okoro",
    },
    {
      id: "INV-2024-002",
      date: "Nov 10, 2024",
      service: "Lab Tests Package",
      amount: "₦28,500",
      status: "pending",
      paymentMethod: "Insurance",
      insuranceCovered: "₦22,800",
      patientPortion: "₦5,700",
      dueDate: "Nov 24, 2024",
      doctor: "Dr. Adebola Johnson",
    },
    {
      id: "INV-2024-003",
      date: "Oct 28, 2024",
      service: "Consultation & Prescription",
      amount: "₦15,000",
      status: "paid",
      paymentMethod: "Wallet",
      insuranceCovered: "₦12,000",
      patientPortion: "₦3,000",
      dueDate: "Oct 28, 2024",
      doctor: "Dr. Ahmed Hassan",
    },
    {
      id: "INV-2024-004",
      date: "Oct 15, 2024",
      service: "COVID-19 Vaccination",
      amount: "₦12,000",
      status: "overdue",
      paymentMethod: "Card",
      insuranceCovered: "₦9,600",
      patientPortion: "₦2,400",
      dueDate: "Oct 31, 2024",
      doctor: "LUTH Vaccination Center",
    },
    {
      id: "INV-2024-005",
      date: "Sep 20, 2024",
      service: "Chest X-Ray",
      amount: "₦18,500",
      status: "paid",
      paymentMethod: "Bank Transfer",
      insuranceCovered: "₦14,800",
      patientPortion: "₦3,700",
      dueDate: "Sep 20, 2024",
      doctor: "Dr. Emmanuel Ade",
    },
  ];

  const transactions = [
    { id: 1, date: "Today", description: "Card Payment", amount: "-₦9,000", type: "debit", status: "completed" },
    { id: 2, date: "Yesterday", description: "Wallet Top-up", amount: "+₦25,000", type: "credit", status: "completed" },
    { id: 3, date: "Nov 14", description: "Insurance Claim", amount: "+₦36,000", type: "credit", status: "pending" },
    { id: 4, date: "Nov 10", description: "Bank Transfer", amount: "-₦5,700", type: "debit", status: "completed" },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    if (activeTab === "all") return true;
    return invoice.status === activeTab;
  });

  const stats = [
    { label: "Total Balance", value: "₦15,700", change: "+2.5%", icon: DollarSign, color: "from-blue-500 to-cyan-500" },
    { label: "Pending Payments", value: "₦5,700", change: "Due in 7 days", icon: Clock, color: "from-amber-500 to-orange-500" },
    { label: "This Month", value: "₦45,000", change: "-15% from last", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { label: "Insurance Covered", value: "₦95,200", change: "80% coverage", icon: ShieldCheck, color: "from-purple-500 to-violet-500" },
  ];

  const handlePayInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowPayModal(true);
  };

  const handleViewDetails = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetails(true);
  };

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Payments & Billing</h1>
          <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">Manage your medical bills, insurance claims, and payment methods</p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPayModal(true)}
            className="px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base flex-1 sm:flex-none"
          >
            <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Make Payment</span>
            <span className="sm:hidden">Pay</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 md:px-4 py-2 md:py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base flex-1 sm:flex-none"
          >
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Export Statement</span>
            <span className="sm:hidden">Export</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = !stat.change.includes("-") && !stat.change.includes("Due");
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div className={`text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-full ${
                  isPositive ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="text-xl md:text-2xl font-bold text-slate-900 truncate">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-600 truncate">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column - Invoices */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2 sm:mb-0">Medical Invoices</h2>
              
              <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <input
                    type="search"
                    placeholder="Search invoices..."
                    className="pl-9 pr-3 md:pl-10 md:pr-4 py-2 md:py-2.5 rounded-lg bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none w-full sm:w-48"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400" />
                </div>
                
                <button className="p-2 md:p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors flex-shrink-0">
                  <Filter className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 md:gap-2 overflow-x-auto pb-2 mb-4 md:mb-6 scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl whitespace-nowrap transition-all flex-shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-medium text-sm md:text-base">{tab.label}</span>
                    <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Invoices List */}
            <div className="space-y-3 md:space-y-4">
              {filteredInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 md:gap-4">
                    {/* Invoice Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 truncate text-sm md:text-base">{invoice.service}</h3>
                        <div className="flex sm:block">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                            invoice.status === 'paid' 
                              ? 'bg-green-100 text-green-700'
                              : invoice.status === 'pending'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            <span className="inline-flex items-center">
                              {invoice.status === 'paid' && <CheckCircle className="w-3 h-3 mr-1" />}
                              {invoice.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                              {invoice.status === 'overdue' && <AlertCircle className="w-3 h-3 mr-1" />}
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm text-slate-600">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <Receipt className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">Invoice: {invoice.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            <span>Date: {invoice.date}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <CreditCard className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">Method: {invoice.paymentMethod}</span>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <Shield className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">Insurance: {invoice.insuranceCovered}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Amount & Actions */}
                    <div className="flex flex-col items-end gap-2 md:gap-3 w-full lg:w-auto mt-2 lg:mt-0">
                      <div className="text-right">
                        <div className="text-xl md:text-2xl font-bold text-slate-900">{invoice.amount}</div>
                        <div className="text-xs md:text-sm text-slate-600">Due: {invoice.dueDate}</div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 md:gap-2 w-full lg:w-auto">
                        <button
                          onClick={() => handleViewDetails(invoice)}
                          className="px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-xs md:text-sm flex items-center gap-1 flex-1 lg:flex-none justify-center"
                        >
                          <Eye className="w-3 h-3" />
                          <span className="hidden sm:inline">Details</span>
                          <span className="sm:hidden">View</span>
                        </button>
                        
                        {invoice.status !== 'paid' && (
                          <button
                            onClick={() => handlePayInvoice(invoice)}
                            className="px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-xs md:text-sm flex items-center gap-1 flex-1 lg:flex-none justify-center"
                          >
                            Pay Now
                          </button>
                        )}
                        
                        <button className="p-1.5 md:p-1.5 rounded-lg hover:bg-slate-100 transition-colors lg:flex-shrink-0">
                          <MoreVertical className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <span className="hidden sm:inline">View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {transactions.map((transaction, index) => (
                <div key={transaction.id} className="flex items-center justify-between p-2.5 md:p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownRight className="w-4 h-4 md:w-5 md:h-5" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                      )}
                    </div>
                    
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 text-sm md:text-base truncate">{transaction.description}</div>
                      <div className="text-xs md:text-sm text-slate-600 truncate">{transaction.date} • {transaction.status}</div>
                    </div>
                  </div>
                  
                  <div className={`text-base md:text-lg font-bold flex-shrink-0 ml-2 ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Payment Methods & Insurance */}
        <div className="space-y-4 md:space-y-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg font-bold text-slate-900">Payment Methods</h2>
              <button
                onClick={() => setShowAddCardModal(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Add New</span>
              </button>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between mb-1 md:mb-2">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      {method.type === 'card' && <Card className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />}
                      {method.type === 'bank' && <Banknote className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />}
                      {method.type === 'wallet' && <Wallet className="w-4 h-4 md:w-5 md:h-5 text-purple-600 flex-shrink-0" />}
                      
                      <div className="min-w-0">
                        <div className="font-medium text-slate-900 text-sm md:text-base truncate">{method.name}</div>
                        {method.expiry && (
                          <div className="text-xs md:text-sm text-slate-600">Expires {method.expiry}</div>
                        )}
                      </div>
                    </div>
                    
                    {method.isDefault && (
                      <span className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 flex-shrink-0">
                        Default
                      </span>
                    )}
                  </div>
                  
                  {method.balance && (
                    <div className="mt-1.5 md:mt-2 p-1.5 md:p-2 rounded-lg bg-slate-50">
                      <div className="text-xs md:text-sm text-slate-600">Current Balance</div>
                      <div className="text-base md:text-lg font-bold text-slate-900 truncate">{method.balance}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Quick Payment Options */}
            <div className="mt-4 md:mt-6 pt-3 md:pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-2 md:mb-4 text-sm md:text-base">Quick Payment Options</h3>
              
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button className="p-2 md:p-3 rounded-lg md:rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all flex flex-col items-center">
                  <QrCode className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mb-1 md:mb-2" />
                  <span className="text-xs md:text-sm font-medium text-slate-900">QR Code</span>
                </button>
                
                <button className="p-2 md:p-3 rounded-lg md:rounded-xl border border-slate-200 hover:border-green-200 hover:bg-green-50 transition-all flex flex-col items-center">
                  <Mobile className="w-5 h-5 md:w-6 md:h-6 text-green-600 mb-1 md:mb-2" />
                  <span className="text-xs md:text-sm font-medium text-slate-900">USSD</span>
                </button>
              </div>
            </div>
          </div>

          {/* Insurance Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl md:rounded-2xl border border-blue-200 p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-blue-900 text-sm md:text-base truncate">Insurance Coverage</h3>
                <p className="text-xs md:text-sm text-blue-700 truncate">AXA Mansard Health</p>
              </div>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              <div className="p-2.5 md:p-3 rounded-lg bg-white/50 border border-blue-100">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs md:text-sm text-blue-700">Annual Limit</div>
                  <div className="font-bold text-blue-900 text-sm md:text-base">₦500,000</div>
                </div>
                <div className="w-full h-1.5 md:h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '19%' }}></div>
                </div>
                <div className="text-xs text-blue-600 mt-1">19% used (₦95,200)</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="p-2 md:p-3 rounded-lg bg-white/50 border border-blue-100">
                  <div className="text-xs md:text-sm text-blue-700">Claims This Year</div>
                  <div className="text-lg md:text-xl font-bold text-blue-900">3</div>
                </div>
                
                <div className="p-2 md:p-3 rounded-lg bg-white/50 border border-blue-100">
                  <div className="text-xs md:text-sm text-blue-700">Coverage Rate</div>
                  <div className="text-lg md:text-xl font-bold text-blue-900">80%</div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 md:mt-6 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-sm md:text-base">
              View Insurance Details
            </button>
          </div>

          {/* Payment Security */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl border border-green-200 p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-bold text-green-900 text-sm md:text-base">Payment Security</h3>
                <p className="text-xs md:text-sm text-green-700 truncate">Your payments are protected</p>
              </div>
            </div>
            
            <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-green-800">
              <li className="flex items-start gap-1.5 md:gap-2">
                <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="flex-1">PCI DSS compliant payment processing</span>
              </li>
              <li className="flex items-start gap-1.5 md:gap-2">
                <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="flex-1">End-to-end encryption</span>
              </li>
              <li className="flex items-start gap-1.5 md:gap-2">
                <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="flex-1">Secure payment gateway (Remita)</span>
              </li>
              <li className="flex items-start gap-1.5 md:gap-2">
                <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="flex-1">24/7 fraud monitoring</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pay Invoice Modal */}
      <AnimatePresence>
        {showPayModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPayModal(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex-shrink-0 border-b border-slate-200 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">Pay Invoice</h3>
                    <button
                      onClick={() => setShowPayModal(false)}
                      className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6 space-y-4 md:space-y-6">
                  {/* Invoice Summary */}
                  <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <div className="text-slate-900 font-medium text-sm md:text-base truncate">{selectedInvoice?.service || "Select an invoice"}</div>
                      <div className="text-xl md:text-2xl font-bold text-slate-900 flex-shrink-0 ml-2">
                        {selectedInvoice?.amount || "₦0"}
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-slate-600 truncate">
                      {selectedInvoice ? `Invoice: ${selectedInvoice.id} • Due: ${selectedInvoice.dueDate}` : "No invoice selected"}
                    </div>
                  </div>
                  
                  {/* Payment Methods */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2 md:mb-3 text-sm md:text-base">Select Payment Method</h4>
                    <div className="space-y-2 md:space-y-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                        >
                          <div className="flex items-center gap-2 md:gap-3">
                            {method.type === 'card' && <Card className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />}
                            {method.type === 'bank' && <Banknote className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />}
                            {method.type === 'wallet' && <Wallet className="w-4 h-4 md:w-5 md:h-5 text-purple-600 flex-shrink-0" />}
                            
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-slate-900 text-sm md:text-base truncate">{method.name}</div>
                              {method.balance && (
                                <div className="text-xs md:text-sm text-slate-600 truncate">Balance: {method.balance}</div>
                              )}
                            </div>
                            
                            {method.isDefault && (
                              <span className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 flex-shrink-0">
                                Default
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Add New Card Option */}
                  <button
                    onClick={() => {
                      setShowPayModal(false);
                      setShowAddCardModal(true);
                    }}
                    className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-1.5 md:gap-2"
                  >
                    <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-600" />
                    <span className="font-medium text-slate-700 text-sm md:text-base">Add New Payment Method</span>
                  </button>
                </div>
                
                <div className="flex-shrink-0 border-t border-slate-200 p-4 md:p-6">
                  <button className="w-full py-3 md:py-3.5 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-sm md:text-base">
                    Pay {selectedInvoice?.patientPortion || "₦0"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddCardModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddCardModal(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex-shrink-0 border-b border-slate-200 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">Add Payment Method</h3>
                    <button
                      onClick={() => setShowAddCardModal(false)}
                      className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6 space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 md:mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm md:text-base"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 md:mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm md:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1 md:mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm md:text-base"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 md:mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm md:text-base"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="defaultCard" className="rounded border-slate-300 w-4 h-4" />
                    <label htmlFor="defaultCard" className="text-sm text-slate-700">
                      Set as default payment method
                    </label>
                  </div>
                </div>
                
                <div className="flex-shrink-0 border-t border-slate-200 p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <button
                      onClick={() => setShowAddCardModal(false)}
                      className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm md:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowAddCardModal(false)}
                      className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-sm md:text-base"
                    >
                      Add Card
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Invoice Details Modal */}
      <AnimatePresence>
        {showInvoiceDetails && selectedInvoice && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInvoiceDetails(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex-shrink-0 border-b border-slate-200 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate">Invoice Details</h3>
                    <div className="flex items-center gap-2 md:gap-3">
                      <button className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <Printer className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                      </button>
                      <button className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <Download className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                      </button>
                      <button
                        onClick={() => setShowInvoiceDetails(false)}
                        className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6 space-y-4 md:space-y-6">
                  {/* Invoice Header */}
                  <div className="p-4 md:p-6 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4">
                      <div className="min-w-0">
                        <div className="text-xl md:text-2xl font-bold text-blue-900 truncate">{selectedInvoice.service}</div>
                        <div className="text-blue-700 text-sm md:text-base">Invoice #{selectedInvoice.id}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl md:text-3xl font-bold text-blue-900">{selectedInvoice.amount}</div>
                        <div className="text-blue-700 text-sm md:text-base">Due: {selectedInvoice.dueDate}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Invoice Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <div className="text-xs md:text-sm text-slate-600 mb-1">Billed To</div>
                        <div className="font-medium text-slate-900 text-sm md:text-base">John Doe</div>
                        <div className="text-slate-600 text-sm md:text-base">Patient ID: #HB234567</div>
                      </div>
                      
                      <div>
                        <div className="text-xs md:text-sm text-slate-600 mb-1">Service Provider</div>
                        <div className="font-medium text-slate-900 text-sm md:text-base truncate">{selectedInvoice.doctor}</div>
                        <div className="text-slate-600 text-sm md:text-base truncate">Lagos University Teaching Hospital</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <div className="text-xs md:text-sm text-slate-600 mb-1">Invoice Date</div>
                        <div className="font-medium text-slate-900 text-sm md:text-base">{selectedInvoice.date}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs md:text-sm text-slate-600 mb-1">Payment Status</div>
                        <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium ${
                          selectedInvoice.status === 'paid' 
                            ? 'bg-green-100 text-green-700'
                            : selectedInvoice.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Breakdown */}
                  <div className="border-t border-slate-200 pt-4 md:pt-6">
                    <h4 className="font-medium text-slate-900 mb-3 md:mb-4 text-sm md:text-base">Breakdown</h4>
                    
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex justify-between py-1.5 md:py-2 border-b border-slate-100">
                        <div className="text-slate-700 text-sm md:text-base">Total Service Cost</div>
                        <div className="font-medium text-slate-900 text-sm md:text-base">{selectedInvoice.amount}</div>
                      </div>
                      
                      <div className="flex justify-between py-1.5 md:py-2 border-b border-slate-100">
                        <div className="text-slate-700 text-sm md:text-base">Insurance Coverage (80%)</div>
                        <div className="font-medium text-green-600 text-sm md:text-base">-{selectedInvoice.insuranceCovered}</div>
                      </div>
                      
                      <div className="flex justify-between py-1.5 md:py-2 border-b border-slate-100">
                        <div className="text-slate-700 text-sm md:text-base">Patient Portion (20%)</div>
                        <div className="font-medium text-slate-900 text-sm md:text-base">{selectedInvoice.patientPortion}</div>
                      </div>
                      
                      <div className="flex justify-between py-2 md:py-3 border-t border-slate-200">
                        <div className="text-base md:text-lg font-bold text-slate-900">Amount Due</div>
                        <div className="text-xl md:text-2xl font-bold text-slate-900">{selectedInvoice.patientPortion}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 border-t border-slate-200 p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <button
                      onClick={() => setShowInvoiceDetails(false)}
                      className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm md:text-base"
                    >
                      Close
                    </button>
                    
                    {selectedInvoice.status !== 'paid' && (
                      <button
                        onClick={() => {
                          setShowInvoiceDetails(false);
                          handlePayInvoice(selectedInvoice);
                        }}
                        className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-sm md:text-base"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}