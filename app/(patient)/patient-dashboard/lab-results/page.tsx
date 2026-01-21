// app/patient-dashboard/lab-results/page.tsx
"use client";

import { useState } from "react";
import { 
  Activity, Microscope, FileText, TrendingUp,
  Download, Filter, Search, Calendar,
  CheckCircle, Clock, AlertTriangle, ArrowUpRight,
  ArrowDownRight, Eye, Share2, Printer,
  ChevronRight, ChevronDown, Bell, Heart,
  Battery, Thermometer, Droplets, Stethoscope,
  Zap, Brain, Pill, TestTube, Image,
  Download as DownloadIcon, Share as ShareIcon,
  FileWarning, FileCheck, FileX, RefreshCw,
  MessageSquare, User, QrCode, Smartphone,
  MapPin, Phone, Mail, ExternalLink,
  X, MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LabResultsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [showResultDetails, setShowResultDetails] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const categories = [
    { id: "all", label: "All Tests", icon: Activity, count: 12 },
    { id: "blood", label: "Blood Tests", icon: Droplets, count: 5 },
    { id: "urine", label: "Urine Tests", icon: TestTube, count: 3 },
    { id: "imaging", label: "Imaging", icon: Image, count: 2 },
    { id: "pathology", label: "Pathology", icon: Microscope, count: 1 },
    { id: "vitals", label: "Vitals", icon: Thermometer, count: 4 },
  ];

  const stats = [
    { label: "Tests This Month", value: "5", icon: Activity, color: "from-blue-500 to-cyan-500" },
    { label: "Pending Results", value: "1", icon: Clock, color: "from-amber-500 to-orange-500" },
    { label: "Abnormal Results", value: "0", icon: AlertTriangle, color: "from-red-500 to-rose-500" },
    { label: "Last Checkup", value: "15 Nov", icon: Calendar, color: "from-green-500 to-emerald-500" },
  ];

  const labResults = [
    {
      id: "LAB-2024-001",
      testName: "Complete Blood Count (CBC)",
      category: "blood",
      date: "Nov 15, 2024",
      orderedBy: "Dr. Chioma Okoro",
      status: "ready",
      isAbnormal: false,
      urgency: "routine",
      parameters: [
        { name: "Hemoglobin", value: "14.2", unit: "g/dL", normalRange: "13.5-17.5", status: "normal" },
        { name: "White Blood Cells", value: "7.8", unit: "K/μL", normalRange: "4.0-11.0", status: "normal" },
        { name: "Platelets", value: "250", unit: "K/μL", normalRange: "150-400", status: "normal" },
      ],
      summary: "All parameters within normal range. No signs of anemia or infection.",
      doctorNotes: "Blood work looks excellent. Continue with regular diet and exercise.",
      lab: "LUTH Central Lab",
      technician: "Dr. Adeola Bello",
      reportUrl: "#",
    },
    {
      id: "LAB-2024-002",
      testName: "Lipid Profile",
      category: "blood",
      date: "Nov 15, 2024",
      orderedBy: "Dr. Chioma Okoro",
      status: "ready",
      isAbnormal: false,
      urgency: "routine",
      parameters: [
        { name: "Total Cholesterol", value: "180", unit: "mg/dL", normalRange: "<200", status: "normal" },
        { name: "HDL (Good)", value: "55", unit: "mg/dL", normalRange: ">40", status: "normal" },
        { name: "LDL (Bad)", value: "110", unit: "mg/dL", normalRange: "<130", status: "normal" },
        { name: "Triglycerides", value: "150", unit: "mg/dL", normalRange: "<150", status: "borderline" },
      ],
      summary: "Overall healthy lipid profile. Triglycerides at upper limit of normal.",
      doctorNotes: "Good cholesterol levels. Consider reducing sugar intake to lower triglycerides.",
      lab: "LUTH Central Lab",
      technician: "Dr. Adeola Bello",
      reportUrl: "#",
    },
    {
      id: "LAB-2024-003",
      testName: "Chest X-Ray",
      category: "imaging",
      date: "Sep 20, 2024",
      orderedBy: "Dr. Emmanuel Ade",
      status: "ready",
      isAbnormal: false,
      urgency: "routine",
      parameters: [
        { name: "Lungs", value: "Clear", unit: "", normalRange: "", status: "normal" },
        { name: "Heart Size", value: "Normal", unit: "", normalRange: "", status: "normal" },
        { name: "Diaphragm", value: "Smooth", unit: "", normalRange: "", status: "normal" },
      ],
      summary: "Normal chest X-ray. Clear lung fields and normal cardiac silhouette.",
      doctorNotes: "No evidence of pulmonary or cardiac pathology.",
      lab: "LUTH Radiology",
      technician: "Dr. Fatima Abdul",
      reportUrl: "#",
    },
    {
      id: "LAB-2024-004",
      testName: "Urinalysis",
      category: "urine",
      date: "Oct 28, 2024",
      orderedBy: "Dr. Ahmed Hassan",
      status: "ready",
      isAbnormal: false,
      urgency: "routine",
      parameters: [
        { name: "Color", value: "Yellow", unit: "", normalRange: "", status: "normal" },
        { name: "pH", value: "6.5", unit: "", normalRange: "4.5-8.0", status: "normal" },
        { name: "Protein", value: "Negative", unit: "", normalRange: "Negative", status: "normal" },
        { name: "Glucose", value: "Negative", unit: "", normalRange: "Negative", status: "normal" },
      ],
      summary: "Normal urinalysis results. No signs of infection or kidney issues.",
      doctorNotes: "Urine analysis is normal. No follow-up required.",
      lab: "LUTH Pathology",
      technician: "Dr. Chinedu Okeke",
      reportUrl: "#",
    },
    {
      id: "LAB-2024-005",
      testName: "Liver Function Tests",
      category: "blood",
      date: "Nov 10, 2024",
      orderedBy: "Dr. Adebola Johnson",
      status: "pending",
      isAbnormal: false,
      urgency: "routine",
      parameters: [],
      summary: "Results pending analysis.",
      doctorNotes: "",
      lab: "LUTH Central Lab",
      technician: "",
      reportUrl: "#",
    },
  ];

  const filteredResults = labResults.filter(result => {
    if (activeCategory === "all") return true;
    return result.category === activeCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "blood": return Droplets;
      case "urine": return TestTube;
      case "imaging": return Image;
      case "pathology": return Microscope;
      case "vitals": return Thermometer;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "ready": return "bg-green-100 text-green-700";
      case "pending": return "bg-amber-100 text-amber-700";
      case "in-progress": return "bg-blue-100 text-blue-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "ready": return FileCheck;
      case "pending": return Clock;
      case "in-progress": return RefreshCw;
      default: return FileWarning;
    }
  };

  const handleViewDetails = (result: any) => {
    setSelectedResult(result);
    setShowResultDetails(true);
  };

  const handleShareResult = (result: any) => {
    setSelectedResult(result);
    setShowShareModal(true);
  };

  return (
    <div className="space-y-6 md:space-y-8 p-4 md:p-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Lab Results</h1>
          <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">View and manage your medical test results and reports</p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-1 md:gap-2 p-1 rounded-lg bg-slate-100">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 md:p-2 rounded-md transition-all ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
            >
              <FileText className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 md:p-2 rounded-md transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
            >
              <Activity className="w-4 h-4 text-slate-600" />
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-1 md:gap-2 text-sm md:text-base flex-shrink-0"
          >
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden sm:inline">Export All</span>
            <span className="sm:hidden">Export</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
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
                {stat.label === "Abnormal Results" && stat.value === "0" ? (
                  <div className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    All Normal
                  </div>
                ) : (
                  <div className={`text-xs font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-full ${
                    stat.label.includes("Pending") ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {stat.label === "Last Checkup" ? "Recent" : "Active"}
                  </div>
                )}
              </div>
              
              <div className="text-xl md:text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-600 truncate">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Left Column - Categories & Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6 lg:sticky lg:top-6">
            <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4">Test Categories</h2>
            
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-100"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`p-1.5 md:p-2 rounded-md md:rounded-lg ${
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                      <span className="font-medium text-sm md:text-base">{category.label}</span>
                    </div>
                    
                    <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Quick Filters */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-3 text-sm md:text-base">Quick Filters</h3>
              
              <div className="space-y-2 md:space-y-3">
                <button className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center gap-2 md:gap-3">
                  <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-600" />
                  <span className="font-medium text-slate-900 text-sm md:text-base">Abnormal Results</span>
                </button>
                
                <button className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 hover:border-green-200 hover:bg-green-50 transition-all flex items-center gap-2 md:gap-3">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" />
                  <span className="font-medium text-slate-900 text-sm md:text-base">Pending Tests</span>
                </button>
                
                <button className="w-full px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 transition-all flex items-center gap-2 md:gap-3">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-600" />
                  <span className="font-medium text-slate-900 text-sm md:text-base">This Month</span>
                </button>
              </div>
            </div>
            
            {/* Lab Information */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-3 text-sm md:text-base">Primary Lab</h3>
              
              <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Microscope className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-blue-900 text-sm md:text-base truncate">LUTH Central Lab</div>
                    <div className="text-xs md:text-sm text-blue-700 truncate">Lagos University Teaching Hospital</div>
                  </div>
                </div>
                
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-blue-800">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">Idi-Araba, Surulere, Lagos</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Phone className="w-3 h-3 flex-shrink-0" />
                    <span>01-234-5678</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Mail className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">lab@luth.gov.ng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results List */}
        <div className="lg:col-span-3 space-y-4 md:space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2 sm:mb-0">Test Results</h2>
              
              <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <input
                    type="search"
                    placeholder="Search tests..."
                    className="pl-9 pr-3 md:pl-10 md:pr-4 py-2 md:py-2.5 rounded-lg bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none w-full sm:w-48 lg:w-64"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-slate-400" />
                </div>
                
                <button className="p-2 md:p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors flex-shrink-0">
                  <Filter className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Results List - List View */}
            {viewMode === "list" ? (
              <div className="space-y-3 md:space-y-4">
                {filteredResults.map((result, index) => {
                  const CategoryIcon = getCategoryIcon(result.category);
                  const StatusIcon = getStatusIcon(result.status);
                  
                  return (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 md:gap-4">
                        {/* Test Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start md:items-center gap-2 md:gap-3 mb-2">
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              result.category === 'blood' ? 'bg-red-100 text-red-600' :
                              result.category === 'urine' ? 'bg-yellow-100 text-yellow-600' :
                              result.category === 'imaging' ? 'bg-blue-100 text-blue-600' :
                              'bg-purple-100 text-purple-600'
                            }`}>
                              <CategoryIcon className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                <h3 className="font-bold text-slate-900 text-sm md:text-base truncate">{result.testName}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)} flex items-center gap-1 w-fit`}>
                                  <StatusIcon className="w-3 h-3" />
                                  {result.status === 'ready' ? 'Results Ready' : 
                                   result.status === 'pending' ? 'Pending' : 'In Progress'}
                                </span>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 md:gap-4 text-xs md:text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 flex-shrink-0" />
                                  <span>{result.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{result.orderedBy}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Microscope className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{result.lab}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quick Parameters Preview */}
                          {result.status === 'ready' && result.parameters.length > 0 && (
                            <div className="mt-3 md:mt-4">
                              <div className="text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">Key Parameters:</div>
                              <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {result.parameters.slice(0, 3).map((param, idx) => (
                                  <div key={idx} className={`px-2 py-1 md:px-3 md:py-1.5 rounded-lg ${
                                    param.status === 'normal' ? 'bg-green-50 border border-green-100' :
                                    param.status === 'borderline' ? 'bg-amber-50 border border-amber-100' :
                                    'bg-red-50 border border-red-100'
                                  }`}>
                                    <div className="text-xs md:text-sm font-medium text-slate-900">{param.name}</div>
                                    <div className={`text-xs ${
                                      param.status === 'normal' ? 'text-green-700' :
                                      param.status === 'borderline' ? 'text-amber-700' :
                                      'text-red-700'
                                    }`}>
                                      {param.value} {param.unit}
                                    </div>
                                  </div>
                                ))}
                                {result.parameters.length > 3 && (
                                  <div className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                                    <div className="text-xs md:text-sm font-medium text-slate-900">+{result.parameters.length - 3} more</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-1.5 md:gap-2 self-end lg:self-center mt-2 lg:mt-0">
                          {result.status === 'ready' && (
                            <>
                              <button
                                onClick={() => handleViewDetails(result)}
                                className="px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-xs md:text-sm flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                View
                              </button>
                              
                              <button
                                onClick={() => handleShareResult(result)}
                                className="px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-xs md:text-sm flex items-center gap-1"
                              >
                                <Share2 className="w-3 h-3" />
                                Share
                              </button>
                            </>
                          )}
                          
                          {result.status === 'pending' && (
                            <button className="px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all text-xs md:text-sm flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Pending
                            </button>
                          )}
                          
                          <button className="p-1 md:p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                            <MoreVertical className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Summary */}
                      {result.status === 'ready' && result.summary && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <div className="text-xs md:text-sm text-slate-600">{result.summary}</div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              /* Results Grid - Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {filteredResults.map((result, index) => {
                  const CategoryIcon = getCategoryIcon(result.category);
                  const StatusIcon = getStatusIcon(result.status);
                  
                  return (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg md:rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all p-3 md:p-4"
                    >
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center ${
                          result.category === 'blood' ? 'bg-red-100 text-red-600' :
                          result.category === 'urine' ? 'bg-yellow-100 text-yellow-600' :
                          result.category === 'imaging' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <CategoryIcon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {result.status === 'ready' ? 'Ready' : 'Pending'}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 text-sm md:text-base">{result.testName}</h3>
                      
                      <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-600 mb-3 md:mb-4">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span>{result.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <User className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{result.orderedBy}</span>
                        </div>
                      </div>
                      
                      {result.status === 'ready' && result.summary && (
                        <div className="mb-3 md:mb-4">
                          <div className="text-xs text-slate-500 mb-1">Summary</div>
                          <div className="text-xs md:text-sm text-slate-700 line-clamp-2">{result.summary}</div>
                        </div>
                      )}
                      
                      <div className="flex gap-1.5 md:gap-2">
                        {result.status === 'ready' ? (
                          <>
                            <button
                              onClick={() => handleViewDetails(result)}
                              className="flex-1 px-2.5 py-2 md:px-3 md:py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-xs md:text-sm"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleShareResult(result)}
                              className="flex-1 px-2.5 py-2 md:px-3 md:py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-xs md:text-sm"
                            >
                              Share
                            </button>
                          </>
                        ) : (
                          <button className="w-full px-2.5 py-2 md:px-3 md:py-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all text-xs md:text-sm">
                            Results Pending
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Abnormal Results Alert */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl border border-green-200 p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-green-900 mb-1 md:mb-2 text-sm md:text-base">All Results Within Normal Range</h3>
                <p className="text-green-700 mb-3 md:mb-4 text-xs md:text-sm">
                  Great news! All your recent lab test results are within normal limits. 
                  Continue with your current healthcare routine and maintain regular checkups.
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white border border-green-200 text-green-700 hover:bg-green-50 transition-all text-xs md:text-sm flex items-center gap-1.5 md:gap-2">
                    <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    View Trends
                  </button>
                  <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 hover:shadow-lg transition-all text-xs md:text-sm flex items-center gap-1.5 md:gap-2">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Schedule Checkup
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lab Testing Information */}
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 md:mb-6">Understanding Your Results</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-2 md:mb-3">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">Normal Range</h4>
                <p className="text-xs md:text-sm text-slate-600">
                  Results within expected values for your age, gender, and health status.
                </p>
              </div>
              
              <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-2 md:mb-3">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">Borderline</h4>
                <p className="text-xs md:text-sm text-slate-600">
                  Results slightly outside normal range. May require monitoring or lifestyle changes.
                </p>
              </div>
              
              <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-2 md:mb-3">
                  <FileWarning className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">Abnormal</h4>
                <p className="text-xs md:text-sm text-slate-600">
                  Results significantly outside normal range. Requires medical attention and follow-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Result Details Modal */}
      <AnimatePresence>
        {showResultDetails && selectedResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResultDetails(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 overflow-y-auto"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white z-10 border-b border-slate-200 p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 truncate">{selectedResult.testName}</h3>
                      <div className="text-slate-600 mt-1 text-sm md:text-base truncate">
                        {selectedResult.date} • Ordered by {selectedResult.orderedBy}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <Printer className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                      </button>
                      <button className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors">
                        <DownloadIcon className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                      </button>
                      <button
                        onClick={() => setShowResultDetails(false)}
                        className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                  {/* Lab Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-2 md:mb-3 text-sm md:text-base">Laboratory Information</h4>
                      <div className="space-y-2 md:space-y-3">
                        <div>
                          <div className="text-xs md:text-sm text-blue-700">Lab Facility</div>
                          <div className="font-medium text-blue-900 text-sm md:text-base truncate">{selectedResult.lab}</div>
                        </div>
                        {selectedResult.technician && (
                          <div>
                            <div className="text-xs md:text-sm text-blue-700">Analyzed By</div>
                            <div className="font-medium text-blue-900 text-sm md:text-base truncate">{selectedResult.technician}</div>
                          </div>
                        )}
                        <div>
                          <div className="text-xs md:text-sm text-blue-700">Report ID</div>
                          <div className="font-medium text-blue-900 text-sm md:text-base truncate">{selectedResult.id}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                      <h4 className="font-bold text-green-900 mb-2 md:mb-3 text-sm md:text-base">Result Summary</h4>
                      <div className="space-y-2 md:space-y-3">
                        <div>
                          <div className="text-xs md:text-sm text-green-700">Status</div>
                          <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium ${getStatusColor(selectedResult.status)} inline-flex items-center gap-1`}>
                            <FileCheck className="w-3 h-3" />
                            Results Ready
                          </span>
                        </div>
                        <div>
                          <div className="text-xs md:text-sm text-green-700">Urgency</div>
                          <div className="font-medium text-green-900 text-sm md:text-base">{selectedResult.urgency === 'routine' ? 'Routine - No Urgent Action Needed' : 'Urgent'}</div>
                        </div>
                        <div>
                          <div className="text-xs md:text-sm text-green-700">Overall Assessment</div>
                          <div className="font-medium text-green-900 text-sm md:text-base">{selectedResult.isAbnormal ? 'Abnormal - Follow-up Required' : 'Normal - No Action Required'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Test Parameters */}
                  {selectedResult.parameters.length > 0 && (
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-slate-900 mb-3 md:mb-4">Test Parameters</h4>
                      
                      <div className="overflow-x-auto -mx-4 md:mx-0">
                        <div className="min-w-full px-4 md:px-0">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-slate-200">
                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-slate-700">Parameter</th>
                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-slate-700">Your Value</th>
                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-slate-700">Normal Range</th>
                                <th className="text-left py-2 px-3 md:py-3 md:px-4 text-xs md:text-sm font-medium text-slate-700">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedResult.parameters.map((param: any, index: number) => (
                                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                                  <td className="py-2 px-3 md:py-3 md:px-4">
                                    <div className="font-medium text-slate-900 text-sm md:text-base">{param.name}</div>
                                    <div className="text-xs md:text-sm text-slate-600">{param.unit}</div>
                                  </td>
                                  <td className="py-2 px-3 md:py-3 md:px-4">
                                    <div className={`text-base md:text-lg font-bold ${
                                      param.status === 'normal' ? 'text-green-600' :
                                      param.status === 'borderline' ? 'text-amber-600' :
                                      'text-red-600'
                                    }`}>
                                      {param.value}
                                    </div>
                                  </td>
                                  <td className="py-2 px-3 md:py-3 md:px-4">
                                    <div className="text-slate-600 text-sm md:text-base">{param.normalRange}</div>
                                  </td>
                                  <td className="py-2 px-3 md:py-3 md:px-4">
                                    <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium ${
                                      param.status === 'normal' ? 'bg-green-100 text-green-700' :
                                      param.status === 'borderline' ? 'bg-amber-100 text-amber-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      {param.status === 'normal' ? 'Normal' :
                                       param.status === 'borderline' ? 'Borderline' : 'Abnormal'}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Doctor's Interpretation */}
                  {selectedResult.doctorNotes && (
                    <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-2 md:mb-3 text-sm md:text-base">Doctor's Interpretation</h4>
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                          <Stethoscope className="w-4 h-4 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-purple-900 mb-1 text-sm md:text-base truncate">{selectedResult.orderedBy}</div>
                          <div className="text-purple-700 italic text-sm md:text-base">"{selectedResult.doctorNotes}"</div>
                          <div className="mt-2 md:mt-3 flex flex-wrap gap-2">
                            <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white border border-purple-200 text-purple-700 hover:bg-purple-50 transition-all text-xs md:text-sm">
                              Book Follow-up
                            </button>
                            <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-500 text-white hover:from-purple-700 hover:to-violet-600 hover:shadow-lg transition-all text-xs md:text-sm">
                              Ask Questions
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Summary & Next Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2 md:mb-3 text-sm md:text-base">Test Summary</h4>
                      <p className="text-slate-700 text-sm md:text-base">{selectedResult.summary}</p>
                    </div>
                    
                    <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2 md:mb-3 text-sm md:text-base">Recommended Next Steps</h4>
                      <ul className="space-y-1.5 md:space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm md:text-base">Share results with your primary doctor</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm md:text-base">Schedule follow-up if recommended</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm md:text-base">Maintain current healthy lifestyle</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm md:text-base">Next routine checkup in 6 months</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-4 md:pt-6 border-t border-slate-200">
                    <button
                      onClick={() => setShowResultDetails(false)}
                      className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm md:text-base"
                    >
                      Close
                    </button>
                    
                    <button
                      onClick={() => handleShareResult(selectedResult)}
                      className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-sm md:text-base flex items-center justify-center gap-1.5 md:gap-2"
                    >
                      <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Share Results
                    </button>
                    
                    <button className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium hover:from-green-700 hover:to-emerald-600 hover:shadow-lg transition-all text-sm md:text-base flex items-center justify-center gap-1.5 md:gap-2">
                      <DownloadIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && selectedResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl max-w-md w-full max-h-[95vh] overflow-y-auto">
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">Share Results</h3>
                    <button
                      onClick={() => setShowShareModal(false)}
                      className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                    </button>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div className="p-3 md:p-4 rounded-lg md:rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-medium text-slate-900 mb-1 text-sm md:text-base truncate">{selectedResult.testName}</div>
                      <div className="text-xs md:text-sm text-slate-600">
                        {selectedResult.date} • {selectedResult.id}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2 md:mb-3 text-sm md:text-base">Share With</h4>
                      <div className="space-y-2 md:space-y-3">
                        <button className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-2 md:gap-3">
                          <User className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                          <div className="text-left min-w-0">
                            <div className="font-medium text-slate-900 text-sm md:text-base">Your Doctor</div>
                            <div className="text-xs md:text-sm text-slate-600 truncate">Share with your primary care physician</div>
                          </div>
                        </button>
                        
                        <button className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all flex items-center gap-2 md:gap-3">
                          <Share2 className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                          <div className="text-left min-w-0">
                            <div className="font-medium text-slate-900 text-sm md:text-base">Another Doctor</div>
                            <div className="text-xs md:text-sm text-slate-600 truncate">Share with specialist or other healthcare provider</div>
                          </div>
                        </button>
                        
                        <button className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center gap-2 md:gap-3">
                          <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-purple-600 flex-shrink-0" />
                          <div className="text-left min-w-0">
                            <div className="font-medium text-slate-900 text-sm md:text-base">Personal Copy</div>
                            <div className="text-xs md:text-sm text-slate-600 truncate">Send to your email or phone</div>
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2 md:mb-3 text-sm md:text-base">Share Options</h4>
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        <button className="p-2.5 md:p-3 rounded-lg md:rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all flex flex-col items-center">
                          <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-blue-600 mb-1.5 md:mb-2" />
                          <span className="text-xs md:text-sm font-medium text-slate-900">Message</span>
                        </button>
                        
                        <button className="p-2.5 md:p-3 rounded-lg md:rounded-xl border border-slate-200 hover:border-green-200 hover:bg-green-50 transition-all flex flex-col items-center">
                          <Mail className="w-5 h-5 md:w-6 md:h-6 text-green-600 mb-1.5 md:mb-2" />
                          <span className="text-xs md:text-sm font-medium text-slate-900">Email</span>
                        </button>
                        
                        <button className="p-2.5 md:p-3 rounded-lg md:rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 transition-all flex flex-col items-center">
                          <QrCode className="w-5 h-5 md:w-6 md:h-6 text-red-600 mb-1.5 md:mb-2" />
                          <span className="text-xs md:text-sm font-medium text-slate-900">QR Code</span>
                        </button>
                        
                        <button className="p-2.5 md:p-3 rounded-lg md:rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 transition-all flex flex-col items-center">
                          <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-purple-600 mb-1.5 md:mb-2" />
                          <span className="text-xs md:text-sm font-medium text-slate-900">Link</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-3 md:pt-4 border-t border-slate-200">
                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <button
                          onClick={() => setShowShareModal(false)}
                          className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm md:text-base"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setShowShareModal(false)}
                          className="flex-1 px-3 py-2.5 md:px-4 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-sm md:text-base"
                        >
                          Share Now
                        </button>
                      </div>
                    </div>
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