// app/patients-dashboard/medical-records/page.tsx
"use client";

import { useState } from "react";
import { 
  FileText, Download, Eye, Share2,
  Filter, Search, Calendar, User,
  Activity, Pill, Stethoscope, Heart,
  TrendingUp, Clock, CheckCircle, X,
  Plus, ChevronRight, MoreVertical,
  Clipboard, FilePlus, FileSearch,
  Shield, Lock, Unlock, CalendarDays,
  Printer, MessageSquare, Bell
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Medical Record Card Component
function MedicalRecordCard({ record }: { record: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRecordIcon = (type: string) => {
    switch(type) {
      case "lab": return Activity;
      case "prescription": return Pill;
      case "consultation": return Stethoscope;
      case "vaccination": return Heart;
      case "imaging": return FileSearch;
      default: return FileText;
    }
  };

  const getRecordColor = (type: string) => {
    switch(type) {
      case "lab": return "from-blue-500 to-cyan-500";
      case "prescription": return "from-green-500 to-emerald-500";
      case "consultation": return "from-purple-500 to-violet-500";
      case "vaccination": return "from-red-500 to-rose-500";
      case "imaging": return "from-orange-500 to-amber-500";
      default: return "from-slate-500 to-slate-600";
    }
  };

  const Icon = getRecordIcon(record.type);
  const colorClass = getRecordColor(record.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Record Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900">{record.title}</h3>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                  {record.type.toUpperCase()}
                </span>
                {record.isVerified && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {record.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="w-4 h-4 text-slate-400" />
                  {record.doctor}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {record.timeAgo}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Record Summary */}
        <div className="mt-4">
          <p className="text-slate-600 line-clamp-2">{record.summary}</p>
        </div>

        {/* Record Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {record.stats.map((stat: any, index: number) => (
            <div key={index} className="text-center p-3 rounded-xl bg-slate-50">
              <div className="text-sm text-slate-600">{stat.label}</div>
              <div className="font-bold text-slate-900 mt-1">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Actions */}
      <div className="border-t border-slate-200/50 p-4 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <button className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="font-medium">View Details</span>
          </button>
          
          <button className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 text-blue-700 hover:border-blue-300 transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            <span className="font-medium">Download PDF</span>
          </button>
          
          <button className="px-4 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-200/50 overflow-hidden"
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Key Findings</h4>
                  <ul className="space-y-2">
                    {record.findings.map((finding: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Doctor's Notes</h4>
                  <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                    <p className="text-slate-700 italic">"{record.doctorNotes}"</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Category Filter Component
function CategoryFilter({ activeCategory, setActiveCategory }: { 
  activeCategory: string; 
  setActiveCategory: (category: string) => void 
}) {
  const categories = [
    { id: "all", label: "All Records", icon: FileText, count: 12 },
    { id: "lab", label: "Lab Results", icon: Activity, count: 5 },
    { id: "prescription", label: "Prescriptions", icon: Pill, count: 3 },
    { id: "consultation", label: "Consultations", icon: Stethoscope, count: 8 },
    { id: "vaccination", label: "Vaccinations", icon: Heart, count: 4 },
    { id: "imaging", label: "Imaging", icon: FileSearch, count: 2 },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{category.label}</span>
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              isActive
                ? "bg-white/20 text-white"
                : "bg-slate-200 text-slate-600"
            }`}>
              {category.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function MedicalRecordsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Sample medical records data
  const medicalRecords = [
    {
      id: 1,
      title: "Complete Blood Count (CBC) Test",
      type: "lab",
      date: "Nov 15, 2024",
      timeAgo: "2 weeks ago",
      doctor: "Dr. Adebola Johnson",
      isVerified: true,
      summary: "Routine blood test showing normal ranges for all parameters. Hemoglobin levels are optimal at 14.2 g/dL.",
      stats: [
        { label: "Hemoglobin", value: "14.2 g/dL" },
        { label: "White Cells", value: "7.8 K/μL" },
        { label: "Platelets", value: "250 K/μL" },
        { label: "Hematocrit", value: "42%" }
      ],
      findings: [
        "All blood parameters within normal range",
        "No signs of anemia or infection",
        "Platelet count optimal for clotting",
        "White blood cell count normal"
      ],
      doctorNotes: "Blood work looks excellent. No concerns at this time. Continue with regular diet and exercise."
    },
    {
      id: 2,
      title: "Annual Health Checkup Report",
      type: "consultation",
      date: "Nov 10, 2024",
      timeAgo: "3 weeks ago",
      doctor: "Dr. Chioma Okoro",
      isVerified: true,
      summary: "Comprehensive annual health assessment including physical examination, vitals check, and health counseling.",
      stats: [
        { label: "Blood Pressure", value: "120/80" },
        { label: "Heart Rate", value: "72 BPM" },
        { label: "BMI", value: "24.2" },
        { label: "Blood Sugar", value: "96 mg/dL" }
      ],
      findings: [
        "Normal blood pressure readings",
        "Healthy BMI range maintained",
        "Fasting blood sugar within limits",
        "Excellent cardiovascular health"
      ],
      doctorNotes: "Patient maintains excellent health markers. Recommend continuing current lifestyle habits."
    },
    {
      id: 3,
      title: "Antibiotic Prescription",
      type: "prescription",
      date: "Oct 28, 2024",
      timeAgo: "1 month ago",
      doctor: "Dr. Ahmed Hassan",
      isVerified: true,
      summary: "Amoxicillin 500mg prescription for bacterial infection. Course completed successfully.",
      stats: [
        { label: "Medication", value: "Amoxicillin" },
        { label: "Dosage", value: "500mg" },
        { label: "Frequency", value: "3x daily" },
        { label: "Duration", value: "7 days" }
      ],
      findings: [
        "Infection cleared successfully",
        "No adverse reactions reported",
        "Full course completed",
        "Follow-up not required"
      ],
      doctorNotes: "Antibiotic course completed. Symptoms resolved. No further treatment needed."
    },
    {
      id: 4,
      title: "COVID-19 Vaccination",
      type: "vaccination",
      date: "Oct 15, 2024",
      timeAgo: "2 months ago",
      doctor: "LUTH Vaccination Center",
      isVerified: true,
      summary: "COVID-19 booster vaccination administered. Moderna vaccine batch #MF12345.",
      stats: [
        { label: "Vaccine", value: "Moderna" },
        { label: "Dose", value: "Booster" },
        { label: "Batch No", value: "MF12345" },
        { label: "Next Due", value: "2025" }
      ],
      findings: [
        "Vaccine administered successfully",
        "Mild side effects reported",
        "Immunity response good",
        "Booster effective"
      ],
      doctorNotes: "Vaccination administered without complications. Booster provides additional protection."
    },
    {
      id: 5,
      title: "Chest X-Ray Report",
      type: "imaging",
      date: "Sep 20, 2024",
      timeAgo: "3 months ago",
      doctor: "Dr. Emmanuel Ade",
      isVerified: true,
      summary: "Routine chest X-ray showing clear lungs and normal cardiac silhouette. No abnormalities detected.",
      stats: [
        { label: "Lungs", value: "Clear" },
        { label: "Heart Size", value: "Normal" },
        { label: "Diaphragm", value: "Smooth" },
        { label: "Bones", value: "Intact" }
      ],
      findings: [
        "Clear lung fields bilaterally",
        "Normal cardiac silhouette",
        "No pleural effusion",
        "Normal bony structures"
      ],
      doctorNotes: "X-ray shows normal chest anatomy. No evidence of pulmonary or cardiac pathology."
    }
  ];

  // Filter records based on active category and search
  const filteredRecords = medicalRecords.filter(record => {
    const matchesCategory = activeCategory === "all" || record.type === activeCategory;
    const matchesSearch = searchQuery === "" || 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Medical Records</h1>
          <p className="text-slate-600 mt-2">Your complete health history and medical documents</p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Upload Record
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Clipboard className="w-4 h-4" />
            Request Records
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">{medicalRecords.length}</div>
              <div className="text-sm text-slate-600">Total Records</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 text-sm text-blue-700 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>+2 new this month</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">12</div>
              <div className="text-sm text-slate-600">Verified Records</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-700 flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>All records verified</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">5</div>
              <div className="text-sm text-slate-600">Doctors</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 text-sm text-purple-700">
            Across 3 hospitals
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">3 yrs</div>
              <div className="text-sm text-slate-600">Health History</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 text-sm text-orange-700">
            Since 2021
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medical records, doctors, dates..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>
          
          {/* Date Filter */}
          <div className="flex gap-3">
            <button className="px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Date Range</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button className="px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
            </button>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="mt-6">
          <CategoryFilter 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
      </div>

      {/* Medical Records List */}
      <div className="space-y-6">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <MedicalRecordCard key={record.id} record={record} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileSearch className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No records found</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery ? 'Try a different search term' : 'No medical records available for this category'}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg transition-all"
            >
              View All Records
            </button>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Your Medical Records Are Secure</h3>
            <div className="text-slate-700 space-y-2">
              <p>• All records are encrypted and stored securely</p>
              <p>• Only you and authorized healthcare providers can access your records</p>
              <p>• You control who can view and share your medical information</p>
              <p>• All access is logged for security monitoring</p>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <button className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1">
                <Shield className="w-4 h-4" />
                View Access Logs
              </button>
              <button className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1">
                <Bell className="w-4 h-4" />
                Manage Permissions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal (Placeholder) */}
      <AnimatePresence>
        {showUploadModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                    <FilePlus className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Upload Medical Record</h3>
                  <p className="text-slate-600 mt-2">Add your medical documents to your health history</p>
                </div>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center">
                    <FilePlus className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600 mb-4">Drag & drop files here or click to browse</p>
                    <button className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                      Choose Files
                    </button>
                    <p className="text-sm text-slate-500 mt-4">PDF, JPG, PNG up to 10MB</p>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Record Title"
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                    
                    <select className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none">
                      <option>Select Record Type</option>
                      <option>Lab Results</option>
                      <option>Prescription</option>
                      <option>Consultation Notes</option>
                      <option>Vaccination Record</option>
                      <option>Imaging Report</option>
                    </select>
                    
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all"
                  >
                    Upload Record
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}