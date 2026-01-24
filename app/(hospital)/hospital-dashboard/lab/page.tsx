// app/hospital/lab/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, Filter, TestTube, Clipboard, AlertTriangle,
  Clock, CheckCircle, XCircle, Download,
  Eye, Printer, Plus,
  ChevronDown, ChevronUp, RefreshCw,
  TrendingUp, Bell, Calendar,
  Stethoscope, Upload, FileText,
  BarChart3, Beaker, Microscope,
  Clock as ClockIcon, FileCheck,
  Smartphone, X, Check,
  MessageSquare, FilePlus,
  TrendingUp as TrendingUpIcon, DollarSign
} from "lucide-react";

interface Patient {
  name: string;
  id: string;
  phone?: string;
  age?: number;
  gender?: string;
  bloodGroup?: string;
}

interface LabTest {
  id: string;
  patient: Patient;
  doctor: string;
  department: string;
  testType: string;
  testCode: string;
  dateOrdered: string;
  priority?: string;
  status: string;
  paymentStatus?: string;
  price: string;
  sampleType?: string;
  sampleContainer?: string;
  notes?: string;
  sampleCollected?: string;
  collectedBy?: string;
  startedProcessing?: string;
  technician?: string;
  estimatedCompletion?: string;
  completed?: string;
  resultStatus?: string;
  results?: Record<string, any>;
  reviewedBy?: string;
  reviewedAt?: string;
}

type TestTab = "pending" | "processing" | "completed" | "all";

export default function LabPage() {
  const [activeTab, setActiveTab] = useState<TestTab>("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showUploadResult, setShowUploadResult] = useState(false);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [showAddTest, setShowAddTest] = useState(false);

  // Mock data
  const labTests = {
    pending: [
      {
        id: "1",
        patient: { 
          name: "John Doe", 
          id: "P-001234", 
          phone: "+234 801 234 5678",
          age: 35,
          gender: "Male",
          bloodGroup: "O+"
        },
        doctor: "Dr. Adebola Johnson",
        department: "Cardiology",
        testType: "Full Blood Count (FBC)",
        testCode: "FBC-001",
        dateOrdered: "Nov 15, 2024, 10:30 AM",
        priority: "routine",
        status: "ordered",
        paymentStatus: "paid",
        price: "₦5,000",
        sampleType: "Blood",
        sampleContainer: "EDTA Tube",
        notes: "Fasting sample required"
      },
      {
        id: "2",
        patient: { 
          name: "Mary Johnson", 
          id: "P-001235",
          phone: "+234 802 345 6789",
          age: 42,
          gender: "Female",
          bloodGroup: "A+"
        },
        doctor: "Dr. Chioma Okafor",
        department: "General Medicine",
        testType: "Lipid Profile",
        testCode: "LP-002",
        dateOrdered: "Nov 15, 2024, 11:00 AM",
        priority: "urgent",
        status: "sample_collected",
        paymentStatus: "paid",
        price: "₦8,500",
        sampleType: "Blood",
        sampleContainer: "Serum Tube",
        sampleCollected: "Nov 15, 2024, 11:30 AM",
        collectedBy: "Lab Tech Tunde"
      },
      {
        id: "3",
        patient: { 
          name: "David Smith", 
          id: "P-001236",
          phone: "+234 803 456 7890",
          age: 28,
          gender: "Male",
          bloodGroup: "B+"
        },
        doctor: "Dr. Ahmed Musa",
        department: "Emergency",
        testType: "Liver Function Tests (LFT)",
        testCode: "LFT-003",
        dateOrdered: "Nov 15, 2024, 9:15 AM",
        priority: "urgent",
        status: "ordered",
        paymentStatus: "pending",
        price: "₦7,200",
        sampleType: "Blood",
        sampleContainer: "Serum Tube",
        notes: "Emergency case - prioritize"
      }
    ] as LabTest[],
    processing: [
      {
        id: "4",
        patient: { 
          name: "Sarah Williams", 
          id: "P-001237",
          phone: "+234 804 567 8901",
          age: 55,
          gender: "Female",
          bloodGroup: "AB+"
        },
        doctor: "Dr. Adebola Johnson",
        department: "Cardiology",
        testType: "HbA1c (Glycated Hemoglobin)",
        testCode: "HBA1C-004",
        dateOrdered: "Nov 14, 2024, 2:00 PM",
        sampleCollected: "Nov 14, 2024, 2:30 PM",
        priority: "routine",
        status: "in_progress",
        paymentStatus: "paid",
        price: "₦6,500",
        sampleType: "Blood",
        sampleContainer: "EDTA Tube",
        startedProcessing: "Nov 14, 2024, 3:00 PM",
        technician: "Lab Tech Chinedu",
        estimatedCompletion: "Nov 14, 2024, 5:00 PM"
      },
      {
        id: "5",
        patient: { 
          name: "Peter Parker", 
          id: "P-001238",
          phone: "+234 805 678 9012",
          age: 8,
          gender: "Male",
          bloodGroup: "O-"
        },
        doctor: "Dr. Chioma Okafor",
        department: "Pediatrics",
        testType: "Complete Blood Count with Differential",
        testCode: "CBCD-005",
        dateOrdered: "Nov 15, 2024, 1:30 PM",
        sampleCollected: "Nov 15, 2024, 2:00 PM",
        priority: "routine",
        status: "in_progress",
        paymentStatus: "paid",
        price: "₦9,000",
        sampleType: "Blood",
        sampleContainer: "EDTA Tube",
        technician: "Lab Tech Amina",
        estimatedCompletion: "Nov 15, 2024, 4:30 PM"
      }
    ] as LabTest[],
    completed: [
      {
        id: "6",
        patient: {
          name: "Emma Wilson",
          id: "P-001239",
          phone: "+234 806 789 0123",
          age: 31,
          gender: "Female",
          bloodGroup: "B-"
        },
        doctor: "Dr. Ahmed Musa",
        department: "Endocrinology",
        testType: "Thyroid Function Tests (TFT)",
        testCode: "TFT-006",
        dateOrdered: "Nov 13, 2024",
        priority: "routine",
        completed: "Nov 13, 2024, 4:15 PM",
        status: "completed",
        resultStatus: "abnormal",
        paymentStatus: "paid",
        price: "₦10,500",
        sampleType: "Blood",
        results: {
          TSH: { value: "8.2 mIU/L", normalRange: "0.4 - 4.0", status: "high" },
          T4: { value: "0.8 ng/dL", normalRange: "0.8 - 1.8", status: "low" },
          T3: { value: "85 ng/dL", normalRange: "80 - 200", status: "normal" }
        },
        reviewedBy: "Dr. Adebola Johnson",
        reviewedAt: "Nov 13, 2024, 4:30 PM",
        notes: "Suggest follow-up for hypothyroidism"
      },
      {
        id: "7",
        patient: {
          name: "Michael Brown",
          id: "P-001240",
          phone: "+234 807 890 1234",
          age: 62,
          gender: "Male",
          bloodGroup: "A-"
        },
        doctor: "Dr. Adebola Johnson",
        department: "Cardiology",
        testType: "Cardiac Enzyme Panel",
        testCode: "CEP-007",
        dateOrdered: "Nov 12, 2024",
        priority: "urgent",
        completed: "Nov 12, 2024, 3:45 PM",
        status: "completed",
        resultStatus: "critical",
        paymentStatus: "paid",
        price: "₦15,000",
        sampleType: "Blood",
        results: {
          Troponin: { value: "1.5 ng/mL", normalRange: "<0.04", status: "critical" },
          CK_MB: { value: "45 U/L", normalRange: "0-25", status: "high" },
          Myoglobin: { value: "300 ng/mL", normalRange: "25-72", status: "critical" }
        },
        reviewedBy: "Dr. Chioma Okafor",
        reviewedAt: "Nov 12, 2024, 4:00 PM",
        notes: "CRITICAL: Possible myocardial infarction. Notify doctor immediately."
      }
    ] as LabTest[]
  };

  const criticalAlerts = [
    { 
      id: "CA1",
      patient: "John Doe", 
      test: "Blood Sugar", 
      value: "450 mg/dL", 
      normalRange: "70-140",
      flagged: "Critical High",
      orderedBy: "Dr. Adebola",
      time: "Today, 11:30 AM",
      status: "unacknowledged"
    },
    { 
      id: "CA2",
      patient: "Mary Johnson", 
      test: "WBC Count", 
      value: "1.2 ×10³/μL", 
      normalRange: "4.5-11.0",
      flagged: "Critical Low",
      orderedBy: "Dr. Chioma",
      time: "Today, 10:45 AM",
      status: "acknowledged"
    },
    { 
      id: "CA3",
      patient: "Michael Brown", 
      test: "Troponin", 
      value: "1.5 ng/mL", 
      normalRange: "<0.04",
      flagged: "Critical High",
      orderedBy: "Dr. Ahmed",
      time: "Yesterday, 4:00 PM",
      status: "notified"
    }
  ];

  const labStats = {
    today: {
      tests: 24,
      revenue: "₦189,500",
      completed: 18,
      pending: 6,
      critical: 2
    },
    thisWeek: {
      tests: 156,
      revenue: "₦850,000",
      growth: "+18%",
      averageTurnaround: "4.2 hours"
    },
    equipment: {
      operational: 12,
      maintenance: 2,
      outOfService: 1
    }
  };

  const popularTests = [
    { name: "Full Blood Count", count: 45, revenue: "₦225,000" },
    { name: "Lipid Profile", count: 38, revenue: "₦323,000" },
    { name: "Liver Function", count: 32, revenue: "₦230,400" },
    { name: "Blood Sugar", count: 28, revenue: "₦84,000" }
  ];

  // Get current tests based on active tab
  const getCurrentTests = (): LabTest[] => {
    if (activeTab === "all") {
      return [...labTests.pending, ...labTests.processing, ...labTests.completed];
    }
    return labTests[activeTab];
  };

  const currentTests = getCurrentTests();

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Laboratory Management</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Manage lab tests, results, diagnostics, and equipment</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-2 sm:px-4 sm:py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm sm:text-base">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button 
            onClick={() => setShowAddTest(true)}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">New Test</span>
            <span className="sm:hidden">Add Test</span>
          </button>
          <button className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base">
            <FileCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Bulk Upload</span>
            <span className="sm:hidden">Upload</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - Enhanced */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <TestTube className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{labStats.today.tests}</div>
          <div className="text-xs sm:text-sm text-slate-600">Tests Today</div>
          <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            {labStats.today.pending} pending
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
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{labStats.today.revenue}</div>
          <div className="text-xs sm:text-sm text-slate-600">Today's Revenue</div>
          <div className="flex items-center gap-2 mt-2 text-xs text-green-600">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            {labStats.thisWeek.growth} this week
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
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{labStats.today.critical}</div>
          <div className="text-xs sm:text-sm text-slate-600">Critical Results</div>
          <div className="flex items-center gap-2 mt-2 text-xs text-red-600">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            Needs attention
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Beaker className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          </div>
          <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{labStats.equipment.operational}</div>
          <div className="text-xs sm:text-sm text-slate-600">Equipment Operational</div>
          <div className="flex items-center gap-2 mt-2 text-xs text-purple-600">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            {labStats.equipment.maintenance} in maintenance
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Lab Tests */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Lab Tests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max border-b border-slate-200">
                {[
                  { id: "pending", label: "Pending", count: labTests.pending.length, icon: Clock, color: "blue" },
                  { id: "processing", label: "Processing", count: labTests.processing.length, icon: Beaker, color: "orange" },
                  { id: "completed", label: "Completed", count: labTests.completed.length, icon: CheckCircle, color: "green" },
                  { id: "all", label: "All Tests", count: currentTests.length, icon: FileText, color: "slate" }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TestTab)}
                      className={`flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${
                        activeTab === tab.id ? 'text-blue-600' : 'text-slate-500'
                      }`} />
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
                    placeholder="Search by patient name, test code, or doctor..."
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
                  <button className="px-3 sm:px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lab Tests List */}
            <div className="p-3 sm:p-4 max-h-[600px] overflow-y-auto">
              {currentTests.map((test) => (
                <div
                  key={test.id}
                  className="p-3 sm:p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors mb-3 sm:mb-4 last:mb-0"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <div className="font-bold text-slate-900 truncate">{test.patient.name}</div>
                            <span className="text-xs sm:text-sm text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {test.patient.id}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              test.priority === 'urgent'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {test.priority === 'urgent' ? 'URGENT' : 'Routine'}
                            </span>
                            {test.paymentStatus && (
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                test.paymentStatus === 'paid' 
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {test.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                              </span>
                            )}
                          </div>
                          <div className="text-xs sm:text-sm text-slate-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <Stethoscope className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="truncate">{test.doctor} • {test.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TestTube className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="font-medium">{test.testType}</span>
                              <span className="text-xs">({test.testCode})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>Ordered: {test.dateOrdered}</span>
                            </div>
                            {test.patient.phone && (
                              <div className="flex items-center gap-2">
                                <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span>{test.patient.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1">
                          <div className="text-lg sm:text-xl font-bold text-slate-900">{test.price}</div>
                          {test.sampleType && (
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              test.sampleType === 'Blood' ? 'bg-red-100 text-red-700' :
                              test.sampleType === 'Urine' ? 'bg-yellow-100 text-yellow-700' :
                              test.sampleType === 'Stool' ? 'bg-amber-100 text-amber-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {test.sampleType}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Test Details */}
                  <div className="border-t border-slate-200 pt-3 sm:pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      {/* Sample Collected */}
                      {test.sampleCollected && (
                        <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                          <div className="text-xs text-blue-700 font-medium mb-1">Sample Collected</div>
                          <div className="text-sm text-slate-900">{test.sampleCollected}</div>
                          {test.collectedBy && (
                            <div className="text-xs text-slate-600 mt-1">By: {test.collectedBy}</div>
                          )}
                        </div>
                      )}
                      
                      {/* Started Processing */}
                      {test.startedProcessing && (
                        <div className="p-2 rounded-lg bg-orange-50 border border-orange-100">
                          <div className="text-xs text-orange-700 font-medium mb-1">Processing Started</div>
                          <div className="text-sm text-slate-900">{test.startedProcessing}</div>
                          {test.technician && (
                            <div className="text-xs text-slate-600 mt-1">By: {test.technician}</div>
                          )}
                        </div>
                      )}
                      
                      {/* Results for completed tests */}
                      {test.resultStatus && (
                        <div className={`p-2 rounded-lg border ${
                          test.resultStatus === 'critical' ? 'bg-red-50 border-red-100' :
                          test.resultStatus === 'abnormal' ? 'bg-yellow-50 border-yellow-100' :
                          'bg-green-50 border-green-100'
                        }`}>
                          <div className={`text-xs font-medium mb-1 ${
                            test.resultStatus === 'critical' ? 'text-red-700' :
                            test.resultStatus === 'abnormal' ? 'text-yellow-700' :
                            'text-green-700'
                          }`}>
                            Result: {test.resultStatus.toUpperCase()}
                          </div>
                          {test.completed && (
                            <div className="text-sm text-slate-900">Completed: {test.completed}</div>
                          )}
                          {test.reviewedBy && (
                            <div className="text-xs text-slate-600 mt-1">Reviewed by: {test.reviewedBy}</div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Status Timeline */}
                    <div className="mb-3">
                      <div className="text-xs font-medium text-slate-700 mb-2">Status:</div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className={`flex items-center gap-2 ${['ordered', 'sample_collected', 'in_progress', 'completed'].includes(test.status) ? 'text-blue-600' : 'text-slate-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${['ordered', 'sample_collected', 'in_progress', 'completed'].includes(test.status) ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                          <span>Ordered</span>
                        </div>
                        <div className={`flex items-center gap-2 ${['sample_collected', 'in_progress', 'completed'].includes(test.status) ? 'text-blue-600' : 'text-slate-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${['sample_collected', 'in_progress', 'completed'].includes(test.status) ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                          <span>Sample Collected</span>
                        </div>
                        <div className={`flex items-center gap-2 ${['in_progress', 'completed'].includes(test.status) ? 'text-blue-600' : 'text-slate-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${['in_progress', 'completed'].includes(test.status) ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                          <span>Processing</span>
                        </div>
                        <div className={`flex items-center gap-2 ${test.status === 'completed' ? 'text-blue-600' : 'text-slate-400'}`}>
                          <div className={`w-2 h-2 rounded-full ${test.status === 'completed' ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                          <span>Completed</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-slate-200">
                      <div className="space-y-1">
                        <div className="font-medium text-slate-900 text-sm">Test Price</div>
                        <div className="text-xs text-slate-600">Includes all analyses</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {test.status === 'ordered' && (
                          <button 
                            onClick={() => {
                              setSelectedTest(test);
                              setShowUploadResult(true);
                            }}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Clipboard className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Collect Sample</span>
                            <span className="sm:hidden">Collect</span>
                          </button>
                        )}
                        {test.status === 'sample_collected' && (
                          <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                            <Beaker className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Start Processing</span>
                            <span className="sm:hidden">Process</span>
                          </button>
                        )}
                        {test.status === 'in_progress' && (
                          <button 
                            onClick={() => {
                              setSelectedTest(test);
                              setShowUploadResult(true);
                            }}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                          >
                            <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Upload Results</span>
                            <span className="sm:hidden">Upload</span>
                          </button>
                        )}
                        {test.status === 'completed' && (
                          <>
                            <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">View Results</span>
                              <span className="sm:hidden">View</span>
                            </button>
                            <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                              <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">Print</span>
                            </button>
                          </>
                        )}
                        <button className="px-3 py-1.5 sm:px-4 sm:py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                          <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Notify</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Alerts, Stats & Actions */}
        <div className="space-y-4 sm:space-y-6">
          {/* Critical Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-red-200 bg-red-50 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Critical Alerts</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Requires immediate attention</p>
              </div>
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="space-y-2">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="p-2 sm:p-3 rounded-lg border border-red-200 bg-white">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-slate-900 text-sm">{alert.patient}</div>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                      alert.status === 'unacknowledged' ? 'bg-red-100 text-red-700' :
                      alert.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mb-1">{alert.test}</div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-red-700 font-bold text-sm">{alert.value}</span>
                    <span className="text-xs text-slate-500">Normal: {alert.normalRange}</span>
                  </div>
                  <div className="flex gap-1">
                    <button className="flex-1 px-2 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Notify Doctor
                    </button>
                    <button className="flex-1 px-2 py-1 text-xs border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      Call Patient
                    </button>
                    <button className="px-2 py-1 text-xs border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                      <Check className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Popular Tests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Popular Tests</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">This month's statistics</p>
              </div>
              <TrendingUpIcon className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-2">
              {popularTests.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${
                      index === 0 ? 'bg-blue-100' :
                      index === 1 ? 'bg-green-100' :
                      index === 2 ? 'bg-purple-100' : 'bg-orange-100'
                    }`}>
                      <TestTube className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        index === 0 ? 'text-blue-600' :
                        index === 1 ? 'text-green-600' :
                        index === 2 ? 'text-purple-600' : 'text-orange-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{test.name}</div>
                      <div className="text-xs text-slate-600">{test.count} tests</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{test.revenue}</div>
                    <div className="text-xs text-slate-500">revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lab Equipment Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Equipment Status</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Lab machines overview</p>
              </div>
              <Microscope className="w-5 h-5 text-blue-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-slate-900">Operational</span>
                </div>
                <span className="text-xl font-bold text-green-600">{labStats.equipment.operational}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-yellow-50 border border-yellow-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-slate-900">Maintenance</span>
                </div>
                <span className="text-xl font-bold text-yellow-600">{labStats.equipment.maintenance}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-red-50 border border-red-100">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-slate-900">Out of Service</span>
                </div>
                <span className="text-xl font-bold text-red-600">{labStats.equipment.outOfService}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
          >
            <h3 className="font-bold text-slate-900 mb-3 sm:mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button 
                onClick={() => setShowUploadResult(true)}
                className="p-3 rounded-lg border border-slate-300 hover:border-blue-300 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2"
              >
                <div className="p-2 rounded-lg bg-blue-100">
                  <Upload className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-slate-700 text-xs sm:text-sm text-center">Upload Results</span>
              </button>
              <button className="p-3 rounded-lg border border-slate-300 hover:border-green-300 hover:bg-green-50 transition-all flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <FilePlus className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-medium text-slate-700 text-xs sm:text-sm text-center">New Report</span>
              </button>
              <button className="p-3 rounded-lg border border-slate-300 hover:border-purple-300 hover:bg-purple-50 transition-all flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-lg bg-purple-100">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <span className="font-medium text-slate-700 text-xs sm:text-sm text-center">Analytics</span>
              </button>
              <button className="p-3 rounded-lg border border-slate-300 hover:border-red-300 hover:bg-red-50 transition-all flex flex-col items-center justify-center gap-2">
                <div className="p-2 rounded-lg bg-red-100">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <span className="font-medium text-slate-700 text-xs sm:text-sm text-center">Export Data</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Upload Results Modal */}
      {showUploadResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedTest ? `Upload Results - ${selectedTest.testType}` : 'Upload Lab Results'}
                  </h3>
                  <p className="text-slate-600 mt-1">Enter test results and analysis</p>
                </div>
                <button
                  onClick={() => {
                    setShowUploadResult(false);
                    setSelectedTest(null);
                  }}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {selectedTest ? (
                <div className="space-y-6">
                  {/* Patient Info */}
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                    <h4 className="font-bold text-slate-900 mb-3">Patient Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Patient</div>
                        <div className="font-medium text-slate-900">{selectedTest.patient.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Test</div>
                        <div className="font-medium text-slate-900">{selectedTest.testType}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Ordered By</div>
                        <div className="font-medium text-slate-900">{selectedTest.doctor}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Sample Type</div>
                        <div className="font-medium text-slate-900">{selectedTest.sampleType}</div>
                      </div>
                    </div>
                  </div>

                  {/* Results Form */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900">Test Results</h4>
                    
                    {/* Example for FBC */}
                    {selectedTest.testType.includes('Blood Count') && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">WBC Count</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="e.g., 7.5 ×10³/μL" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">RBC Count</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="e.g., 4.8 ×10⁶/μL" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Hemoglobin</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg" placeholder="e.g., 14.2 g/dL" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Upload Result File</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-600 mb-2">Drag & drop your lab result file here</p>
                        <p className="text-sm text-slate-500 mb-4">PDF, JPG, or PNG (Max 10MB)</p>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Browse Files
                        </button>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Notes & Interpretation</label>
                      <textarea 
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg min-h-[100px]" 
                        placeholder="Enter any observations, interpretations, or recommendations..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Beaker className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-slate-700">Select a test to upload results</h4>
                  <p className="text-slate-500 mt-2">Please go back and select a test from the list</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowUploadResult(false);
                  setSelectedTest(null);
                }}
                className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all">
                Save & Upload Results
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Test Modal */}
      {showAddTest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Order New Lab Test</h3>
                  <p className="text-slate-600 mt-1">Create new laboratory test request</p>
                </div>
                <button
                  onClick={() => setShowAddTest(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="text-center py-12">
                <FilePlus className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-slate-700">Order Lab Test Form</h4>
                <p className="text-slate-500 mt-2">This would contain patient selection, test selection, priority, etc.</p>
                <button
                  onClick={() => setShowAddTest(false)}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Start Ordering Test
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}