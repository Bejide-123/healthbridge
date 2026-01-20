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
  ShieldCheck, Receipt as ReceiptIcon
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payments & Billing</h1>
          <p className="text-slate-600 mt-2">Manage your medical bills, insurance claims, and payment methods</p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPayModal(true)}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Make Payment
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Statement
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = !stat.change.includes("-") && !stat.change.includes("Due");
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  isPositive ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Invoices */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-bold text-slate-900">Medical Invoices</h2>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search invoices..."
                    className="pl-10 pr-4 py-2 rounded-lg bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none w-48"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
                
                <button className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                  <Filter className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-medium">{tab.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
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
            <div className="space-y-4">
              {filteredInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    {/* Invoice Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-slate-900 truncate">{invoice.service}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'paid' 
                            ? 'bg-green-100 text-green-700'
                            : invoice.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {invoice.status === 'paid' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                          {invoice.status === 'pending' && <Clock className="w-3 h-3 inline mr-1" />}
                          {invoice.status === 'overdue' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Receipt className="w-3 h-3" />
                            <span>Invoice: {invoice.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>Date: {invoice.date}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-3 h-3" />
                            <span>Method: {invoice.paymentMethod}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="w-3 h-3" />
                            <span>Insurance: {invoice.insuranceCovered}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Amount & Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">{invoice.amount}</div>
                        <div className="text-sm text-slate-600">Due: {invoice.dueDate}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(invoice)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-sm"
                        >
                          <Eye className="w-3 h-3 inline mr-1" />
                          Details
                        </button>
                        
                        {invoice.status !== 'paid' && (
                          <button
                            onClick={() => handlePayInvoice(invoice)}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-sm"
                          >
                            Pay Now
                          </button>
                        )}
                        
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
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
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownRight className="w-5 h-5" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div>
                      <div className="font-medium text-slate-900">{transaction.description}</div>
                      <div className="text-sm text-slate-600">{transaction.date} • {transaction.status}</div>
                    </div>
                  </div>
                  
                  <div className={`text-lg font-bold ${
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
        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Payment Methods</h2>
              <button
                onClick={() => setShowAddCardModal(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {method.type === 'card' && <Card className="w-5 h-5 text-blue-600" />}
                      {method.type === 'bank' && <Banknote className="w-5 h-5 text-green-600" />}
                      {method.type === 'wallet' && <Wallet className="w-5 h-5 text-purple-600" />}
                      
                      <div>
                        <div className="font-medium text-slate-900">{method.name}</div>
                        {method.expiry && (
                          <div className="text-sm text-slate-600">Expires {method.expiry}</div>
                        )}
                      </div>
                    </div>
                    
                    {method.isDefault && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Default
                      </span>
                    )}
                  </div>
                  
                  {method.balance && (
                    <div className="mt-2 p-2 rounded-lg bg-slate-50">
                      <div className="text-sm text-slate-600">Current Balance</div>
                      <div className="text-lg font-bold text-slate-900">{method.balance}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Quick Payment Options */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-4">Quick Payment Options</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all flex flex-col items-center">
                  <QrCode className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-slate-900">QR Code</span>
                </button>
                
                <button className="p-3 rounded-xl border border-slate-200 hover:border-green-200 hover:bg-green-50 transition-all flex flex-col items-center">
                  <Mobile className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-slate-900">USSD</span>
                </button>
              </div>
            </div>
          </div>

          {/* Insurance Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-blue-900">Insurance Coverage</h3>
                <p className="text-sm text-blue-700">AXA Mansard Health</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/50 border border-blue-100">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm text-blue-700">Annual Limit</div>
                  <div className="font-bold text-blue-900">₦500,000</div>
                </div>
                <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '19%' }}></div>
                </div>
                <div className="text-xs text-blue-600 mt-1">19% used (₦95,200)</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/50 border border-blue-100">
                  <div className="text-sm text-blue-700">Claims This Year</div>
                  <div className="text-xl font-bold text-blue-900">3</div>
                </div>
                
                <div className="p-3 rounded-lg bg-white/50 border border-blue-100">
                  <div className="text-sm text-blue-700">Coverage Rate</div>
                  <div className="text-xl font-bold text-blue-900">80%</div>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all">
              View Insurance Details
            </button>
          </div>

          {/* Payment Security */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-bold text-green-900">Payment Security</h3>
                <p className="text-sm text-green-700">Your payments are protected</p>
              </div>
            </div>
            
            <ul className="space-y-3 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>PCI DSS compliant payment processing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>End-to-end encryption</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Secure payment gateway (Remita)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>24/7 fraud monitoring</span>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Pay Invoice</h3>
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Invoice Summary */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-slate-900 font-medium">{selectedInvoice?.service}</div>
                      <div className="text-2xl font-bold text-slate-900">{selectedInvoice?.amount}</div>
                    </div>
                    <div className="text-sm text-slate-600">
                      Invoice: {selectedInvoice?.id} • Due: {selectedInvoice?.dueDate}
                    </div>
                  </div>
                  
                  {/* Payment Methods */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Select Payment Method</h4>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          className="w-full p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                        >
                          <div className="flex items-center gap-3">
                            {method.type === 'card' && <Card className="w-5 h-5 text-blue-600" />}
                            {method.type === 'bank' && <Banknote className="w-5 h-5 text-green-600" />}
                            {method.type === 'wallet' && <Wallet className="w-5 h-5 text-purple-600" />}
                            
                            <div className="flex-1">
                              <div className="font-medium text-slate-900">{method.name}</div>
                              {method.balance && (
                                <div className="text-sm text-slate-600">Balance: {method.balance}</div>
                              )}
                            </div>
                            
                            {method.isDefault && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
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
                    className="w-full p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-slate-600" />
                    <span className="font-medium text-slate-700">Add New Payment Method</span>
                  </button>
                  
                  {/* Payment Button */}
                  <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all">
                    Pay {selectedInvoice?.patientPortion}
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Add Payment Method</h3>
                  <button
                    onClick={() => setShowAddCardModal(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="defaultCard" className="rounded border-slate-300" />
                    <label htmlFor="defaultCard" className="text-sm text-slate-700">
                      Set as default payment method
                    </label>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowAddCardModal(false)}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setShowAddCardModal(false)}
                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all"
                      >
                        Add Card
                      </button>
                    </div>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Invoice Details</h3>
                  <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Printer className="w-5 h-5 text-slate-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Download className="w-5 h-5 text-slate-600" />
                    </button>
                    <button
                      onClick={() => setShowInvoiceDetails(false)}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Invoice Header */}
                  <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="text-2xl font-bold text-blue-900">{selectedInvoice.service}</div>
                        <div className="text-blue-700">Invoice #{selectedInvoice.id}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-900">{selectedInvoice.amount}</div>
                        <div className="text-blue-700">Due: {selectedInvoice.dueDate}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Invoice Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Billed To</div>
                        <div className="font-medium text-slate-900">John Doe</div>
                        <div className="text-slate-600">Patient ID: #HB234567</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Service Provider</div>
                        <div className="font-medium text-slate-900">{selectedInvoice.doctor}</div>
                        <div className="text-slate-600">Lagos University Teaching Hospital</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Invoice Date</div>
                        <div className="font-medium text-slate-900">{selectedInvoice.date}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Payment Status</div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                  <div className="border-t border-slate-200 pt-6">
                    <h4 className="font-medium text-slate-900 mb-4">Breakdown</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <div className="text-slate-700">Total Service Cost</div>
                        <div className="font-medium text-slate-900">{selectedInvoice.amount}</div>
                      </div>
                      
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <div className="text-slate-700">Insurance Coverage (80%)</div>
                        <div className="font-medium text-green-600">-{selectedInvoice.insuranceCovered}</div>
                      </div>
                      
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <div className="text-slate-700">Patient Portion (20%)</div>
                        <div className="font-medium text-slate-900">{selectedInvoice.patientPortion}</div>
                      </div>
                      
                      <div className="flex justify-between py-3 border-t border-slate-200">
                        <div className="text-lg font-bold text-slate-900">Amount Due</div>
                        <div className="text-2xl font-bold text-slate-900">{selectedInvoice.patientPortion}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-3 pt-6 border-t border-slate-200">
                    <button
                      onClick={() => setShowInvoiceDetails(false)}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all"
                    >
                      Close
                    </button>
                    
                    {selectedInvoice.status !== 'paid' && (
                      <button
                        onClick={() => {
                          setShowInvoiceDetails(false);
                          handlePayInvoice(selectedInvoice);
                        }}
                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all"
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

// Need to add X import
import { X } from "lucide-react";