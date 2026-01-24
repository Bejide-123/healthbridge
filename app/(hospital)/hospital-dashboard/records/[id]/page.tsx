// app/hospital/patients/records/[id]/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, Edit, Download, Printer, Share2,
  FileText, Calendar, Activity, Heart, Droplets,
  Thermometer, Weight, Ruler, AlertCircle, Pill,
  Stethoscope, User, Phone, Mail, MapPin,
  Clock, TrendingUp, FilePlus, MessageSquare,
  Users, Briefcase, Shield, Camera, Plus,
  ChevronDown, ChevronUp, X, CheckCircle,
  Clipboard, File, FileCheck, History,
  TrendingDown, Upload, Eye, Trash2, 
  BarChart3, Filter, Search, MoreVertical,
  Star, Award, Target, ShieldCheck, Zap,
  Bell, Flag, Lock, Unlock, RotateCcw,
  Clock as ClockIcon, RefreshCw, EyeOff,
  FileEdit, BookOpen, TestTube, Syringe,
  Home, Smartphone, CreditCard, Wallet,
  Receipt, Check, XCircle, AlertTriangle,
  Info, ExternalLink, Copy, QrCode,
  BarChart, PieChart, LineChart
} from "lucide-react";

export default function PatientRecordsPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "medical-history", "vitals", "allergies"
  ]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Mock patient data with more detailed information
  const patient = {
    id: params.id || "1",
    name: "John Doe",
    age: 35,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+234 801 234 5678",
    email: "john.doe@example.com",
    address: "123 Medical Street, Lagos Island, Lagos",
    emergencyContact: {
      name: "Jane Doe",
      phone: "+234 802 345 6789",
      relationship: "Spouse"
    },
    insurance: {
      provider: "Leadway Assurance",
      policyNumber: "LW-78901234",
      expiry: "Dec 2025",
      coverage: "₦5,000,000",
      type: "Comprehensive"
    },
    riskLevel: "high",
    lastVisit: "Today",
    nextAppointment: "Dec 15, 2024, 10:30 AM",
    department: "Cardiology",
    doctor: "Dr. Adebola Johnson",
    doctorContact: "+234 803 123 4567",
    patientSince: "Jan 15, 2018",
    
    // Vitals History
    vitalsHistory: [
      { date: "Nov 15, 2024", bloodPressure: "145/92", heartRate: "88", temperature: "36.8", bloodSugar: "186", weight: "85", bmi: "27.8", oxygen: "96%" },
      { date: "Nov 1, 2024", bloodPressure: "142/90", heartRate: "85", temperature: "36.7", bloodSugar: "192", weight: "85.5", bmi: "27.9", oxygen: "97%" },
      { date: "Oct 15, 2024", bloodPressure: "140/88", heartRate: "82", temperature: "36.6", bloodSugar: "188", weight: "86", bmi: "28.1", oxygen: "96%" },
      { date: "Sep 30, 2024", bloodPressure: "138/86", heartRate: "80", temperature: "36.5", bloodSugar: "182", weight: "85", bmi: "27.8", oxygen: "97%" },
      { date: "Sep 15, 2024", bloodPressure: "160/100", heartRate: "95", temperature: "37.2", bloodSugar: "210", weight: "86", bmi: "28.1", oxygen: "94%" },
    ],
    
    vitals: {
      bloodPressure: "145/92 mmHg",
      bloodSugar: "186 mg/dL",
      temperature: "36.8°C",
      heartRate: "88 BPM",
      weight: "85 kg",
      height: "175 cm",
      bmi: "27.8",
      oxygenSaturation: "96%",
      respiratoryRate: "16 breaths/min",
      lastUpdated: "Today, 2:30 PM",
      trend: "stable" // improving, declining, stable
    },
    
    allergies: [
      { name: "Penicillin", severity: "High", reaction: "Anaphylaxis", diagnosed: "2015" },
      { name: "Peanuts", severity: "Moderate", reaction: "Hives, Swelling", diagnosed: "2010" },
      { name: "Dust Mites", severity: "Low", reaction: "Sneezing, Itchy eyes", diagnosed: "2018" }
    ],
    
    chronicConditions: [
      { 
        name: "Hypertension", 
        diagnosed: "2018", 
        status: "Active",
        severity: "Stage 2",
        lastFlareUp: "Oct 2024",
        treatment: "Medication, Diet control"
      },
      { 
        name: "Type 2 Diabetes", 
        diagnosed: "2020", 
        status: "Active",
        severity: "Moderate",
        lastHbA1c: "7.8%",
        treatment: "Metformin, Insulin, Exercise"
      },
      { 
        name: "High Cholesterol", 
        diagnosed: "2019", 
        status: "Active",
        severity: "High",
        lastLDL: "180 mg/dL",
        treatment: "Statins, Diet"
      }
    ],
    
    medications: [
      { 
        name: "Lisinopril", 
        dosage: "10mg", 
        frequency: "Once daily", 
        purpose: "Blood pressure",
        startDate: "Jan 2023",
        prescribedBy: "Dr. Adebola",
        lastRefill: "Nov 1, 2024",
        instructions: "Take in morning with food",
        status: "Active"
      },
      { 
        name: "Metformin", 
        dosage: "500mg", 
        frequency: "Twice daily", 
        purpose: "Diabetes",
        startDate: "Mar 2021",
        prescribedBy: "Dr. Adebola",
        lastRefill: "Nov 1, 2024",
        instructions: "Take with meals",
        status: "Active"
      },
      { 
        name: "Atorvastatin", 
        dosage: "20mg", 
        frequency: "Once daily", 
        purpose: "Cholesterol",
        startDate: "Feb 2022",
        prescribedBy: "Dr. Adebola",
        lastRefill: "Nov 1, 2024",
        instructions: "Take at bedtime",
        status: "Active"
      },
      { 
        name: "Aspirin", 
        dosage: "81mg", 
        frequency: "Once daily", 
        purpose: "Blood thinner",
        startDate: "Aug 2023",
        prescribedBy: "Dr. Adebola",
        lastRefill: "Oct 15, 2024",
        instructions: "Take with food",
        status: "Active"
      }
    ],
    
    medicalHistory: [
      { 
        date: "Nov 15, 2024", 
        type: "Consultation", 
        doctor: "Dr. Adebola", 
        department: "Cardiology",
        notes: "Follow-up on hypertension management. BP elevated. Discussed lifestyle modifications.",
        diagnosis: "Uncontrolled Hypertension",
        treatment: "Increased Lisinopril dosage to 15mg",
        duration: "30 mins",
        followUp: "Dec 15, 2024"
      },
      { 
        date: "Oct 28, 2024", 
        type: "Lab Test", 
        doctor: "Dr. Chioma", 
        department: "Pathology",
        notes: "Complete Blood Count - All values within normal range. Lipid profile shows elevated LDL.",
        diagnosis: "Hyperlipidemia",
        treatment: "Continue Atorvastatin",
        duration: "2 hours",
        followUp: "Next routine check"
      },
      { 
        date: "Sep 10, 2024", 
        type: "Consultation", 
        doctor: "Dr. Adebola", 
        department: "Cardiology",
        notes: "Medication adjustment due to side effects. Patient reported dizziness with current dosage.",
        diagnosis: "Medication side effects",
        treatment: "Reduced Lisinopril to 10mg",
        duration: "45 mins",
        followUp: "Nov 15, 2024"
      },
      { 
        date: "Aug 5, 2024", 
        type: "Emergency", 
        doctor: "Dr. Ahmed", 
        department: "Emergency",
        notes: "Severe headache and dizziness. BP: 160/100. Given emergency medication.",
        diagnosis: "Hypertensive Crisis",
        treatment: "IV Labetalol, Observation for 4 hours",
        duration: "4 hours",
        followUp: "Aug 12, 2024"
      },
      { 
        date: "Jul 20, 2024", 
        type: "Routine Check", 
        doctor: "Dr. Adebola", 
        department: "Cardiology",
        notes: "Annual physical examination. All vitals stable. Advised weight loss program.",
        diagnosis: "Routine Checkup",
        treatment: "Continue current medications",
        duration: "60 mins",
        followUp: "Jan 2025"
      }
    ],
    
    labResults: [
      { 
        date: "Oct 28, 2024", 
        test: "Lipid Profile", 
        result: "High LDL", 
        status: "Abnormal",
        details: "Total Cholesterol: 240 mg/dL, LDL: 180 mg/dL, HDL: 40 mg/dL, Triglycerides: 200 mg/dL",
        lab: "Pathology Lab",
        doctor: "Dr. Chioma"
      },
      { 
        date: "Oct 28, 2024", 
        test: "HbA1c", 
        result: "7.8%", 
        status: "Elevated",
        details: "3-month average blood glucose: 180 mg/dL",
        lab: "Pathology Lab",
        doctor: "Dr. Chioma"
      },
      { 
        date: "Sep 15, 2024", 
        test: "Kidney Function", 
        result: "Normal", 
        status: "Normal",
        details: "Creatinine: 1.1 mg/dL, eGFR: 75 mL/min",
        lab: "Biochemistry Lab",
        doctor: "Dr. Chioma"
      },
      { 
        date: "Aug 20, 2024", 
        test: "Liver Function", 
        result: "Normal", 
        status: "Normal",
        details: "ALT: 30 U/L, AST: 28 U/L, Bilirubin: 0.8 mg/dL",
        lab: "Biochemistry Lab",
        doctor: "Dr. Chioma"
      },
      { 
        date: "Jul 10, 2024", 
        test: "Thyroid Panel", 
        result: "Normal", 
        status: "Normal",
        details: "TSH: 2.1 mIU/L, T4: 1.2 ng/dL",
        lab: "Endocrinology Lab",
        doctor: "Dr. Chioma"
      }
    ],
    
    familyHistory: {
      father: {
        conditions: ["Hypertension (Age 60)", "Diabetes Type 2 (Age 58)", "Heart Attack (Age 72)"],
        status: "Deceased (Age 72, Heart Attack)"
      },
      mother: {
        conditions: ["Breast Cancer (Age 55)", "Osteoporosis (Age 65)", "Hypertension (Age 60)"],
        status: "Alive (Age 70)"
      },
      siblings: [
        { relation: "Brother", age: 40, conditions: ["Hypertension (Age 38)", "High Cholesterol (Age 42)"], status: "Alive" },
        { relation: "Sister", age: 37, conditions: ["None"], status: "Alive" }
      ],
      children: [
        { name: "Michael Doe", age: 8, conditions: ["Asthma (Age 5)"], status: "Alive" },
        { name: "Sarah Doe", age: 5, conditions: ["None"], status: "Alive" }
      ]
    },
    
    lifestyle: {
      smoking: "Never",
      alcohol: "Occasionally (1-2 drinks/week)",
      exercise: "2-3 times/week",
      diet: "Mixed diet, high in carbs",
      sleep: "6-7 hours/night",
      stress: "Moderate (Work-related)",
      activityLevel: "Moderately Active",
      occupation: "Software Engineer"
    },
    
    immunizations: [
      { vaccine: "COVID-19", date: "Mar 2021", dose: "Complete", nextDue: "Mar 2025", status: "Complete" },
      { vaccine: "Influenza", date: "Oct 2023", dose: "Annual", nextDue: "Oct 2024", status: "Current" },
      { vaccine: "Tetanus", date: "Jan 2020", dose: "Booster", nextDue: "Jan 2030", status: "Current" },
      { vaccine: "Hepatitis B", date: "Apr 2018", dose: "Complete", nextDue: "None", status: "Complete" }
    ],

    documents: [
      { id: "1", name: "Consent Form", type: "Form", date: "Nov 15, 2024", size: "2.1 MB", status: "Signed" },
      { id: "2", name: "Lab Results - Oct 2024", type: "Report", date: "Oct 28, 2024", size: "3.4 MB", status: "Available" },
      { id: "3", name: "Insurance Claim", type: "Financial", date: "Oct 15, 2024", size: "1.8 MB", status: "Processed" },
      { id: "4", name: "Prescription - Nov 2024", type: "Prescription", date: "Nov 1, 2024", size: "0.8 MB", status: "Active" },
      { id: "5", name: "Discharge Summary", type: "Medical", date: "Aug 5, 2024", size: "4.2 MB", status: "Archived" }
    ],

    billing: {
      totalBilled: "₦850,000",
      totalPaid: "₦800,000",
      outstanding: "₦50,000",
      insuranceCovered: "₦750,000",
      recentTransactions: [
        { date: "Nov 15, 2024", description: "Consultation Fee", amount: "₦25,000", status: "Paid" },
        { date: "Oct 28, 2024", description: "Lab Tests", amount: "₦75,000", status: "Insurance Claim" },
        { date: "Sep 10, 2024", description: "Medication", amount: "₦15,000", status: "Paid" },
        { date: "Aug 5, 2024", description: "Emergency Visit", amount: "₦150,000", status: "Insurance Claim" }
      ],
      upcomingPayments: [
        { date: "Dec 1, 2024", description: "Monthly Premium", amount: "₦10,000", status: "Pending" }
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Header - Fixed responsiveness */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link
            href="/hospital/patients/records"
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0 mt-1"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 break-words">
              {patient.name}'s Medical Records
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mt-1">
              <span className="whitespace-nowrap">Patient ID: HB-{patient.id.toString().padStart(6, '0')}</span>
              <span className="hidden sm:inline">•</span>
              <span className="whitespace-nowrap">{patient.age} years, {patient.gender}</span>
              <span className="hidden sm:inline">•</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                patient.riskLevel === 'high'
                  ? 'bg-red-100 text-red-700'
                  : patient.riskLevel === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {patient.riskLevel.toUpperCase()} RISK
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition-all text-sm sm:text-base">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Message</span>
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition-all text-sm sm:text-base">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Book Appointment</span>
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all text-sm sm:text-base">
            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Edit Records</span>
          </button>
        </div>
      </div>

      {/* Tabs - Fixed overflow */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max">
            {[
              { id: "overview", label: "Overview", icon: FileText },
              { id: "medical", label: "Medical History", icon: History },
              { id: "medications", label: "Medications", icon: Pill },
              { id: "labs", label: "Lab Results", icon: Clipboard },
              { id: "vitals", label: "Vitals History", icon: Activity },
              { id: "documents", label: "Documents", icon: File },
              { id: "family", label: "Family History", icon: Users },
              { id: "billing", label: "Billing", icon: Briefcase }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Patient Information */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Personal Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
                      <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors w-fit">
                        <Edit className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-slate-600 mb-2">Contact Information</div>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Phone className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-slate-900">{patient.phone}</div>
                                <div className="text-xs text-slate-500">Primary phone</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Mail className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-slate-900 break-all">{patient.email}</div>
                                <div className="text-xs text-slate-500">Email address</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-slate-900">{patient.address}</div>
                                <div className="text-xs text-slate-500">Residential address</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-slate-600 mb-2">Emergency Contact</div>
                          <div className="p-3 sm:p-4 rounded-lg bg-red-50 border border-red-100">
                            <div className="font-medium text-slate-900">{patient.emergencyContact.name}</div>
                            <div className="text-sm text-slate-600 mt-1">{patient.emergencyContact.phone}</div>
                            <div className="text-xs text-slate-500 mt-1">{patient.emergencyContact.relationship}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-slate-600 mb-2">Insurance Information</div>
                          <div className="p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-100">
                            <div className="font-medium text-slate-900">{patient.insurance.provider}</div>
                            <div className="text-sm text-slate-600 mt-1">Policy: {patient.insurance.policyNumber}</div>
                            <div className="text-xs text-slate-500 mt-1">Expires: {patient.insurance.expiry}</div>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-slate-600">Coverage:</span>
                              <span className="text-sm font-medium text-green-600">{patient.insurance.coverage}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-slate-600 mb-2">Hospital Information</div>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Stethoscope className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-slate-900">{patient.doctor}</div>
                                <div className="text-xs text-slate-500">{patient.doctorContact}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Briefcase className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-slate-900">{patient.department}</div>
                                <div className="text-xs text-slate-500">Primary department</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Calendar className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-medium text-slate-900">Next: {patient.nextAppointment}</div>
                                <div className="text-xs text-slate-500">Last visit: {patient.lastVisit}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick Vitals - Improved layout */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="text-lg font-bold text-slate-900">Latest Vitals</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">Updated: {patient.vitals.lastUpdated}</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View History →
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="p-3 sm:p-4 rounded-xl bg-red-50 border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-red-600" />
                          <div className="text-sm font-medium text-red-700">Blood Pressure</div>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-slate-900">{patient.vitals.bloodPressure}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-red-600">Elevated</span>
                          <TrendingUp className="w-3 h-3 text-red-500" />
                        </div>
                      </div>
                      
                      <div className="p-3 sm:p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="w-4 h-4 text-blue-600" />
                          <div className="text-sm font-medium text-blue-700">Blood Sugar</div>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-slate-900">{patient.vitals.bloodSugar}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-blue-600">High</span>
                          <AlertCircle className="w-3 h-3 text-blue-500" />
                        </div>
                      </div>
                      
                      <div className="p-3 sm:p-4 rounded-xl bg-orange-50 border border-orange-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Weight className="w-4 h-4 text-orange-600" />
                          <div className="text-sm font-medium text-orange-700">Weight</div>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-slate-900">{patient.vitals.weight}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-orange-600">BMI: {patient.vitals.bmi}</span>
                          <Target className="w-3 h-3 text-orange-500" />
                        </div>
                      </div>
                      
                      <div className="p-3 sm:p-4 rounded-xl bg-green-50 border border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-4 h-4 text-green-600" />
                          <div className="text-sm font-medium text-green-700">Heart Rate</div>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-slate-900">{patient.vitals.heartRate}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-green-600">Normal</span>
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        </div>
                      </div>
                    </div>

                    {/* Additional vitals */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
                      <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-purple-700">Temperature</span>
                        </div>
                        <div className="text-lg font-bold text-slate-900 mt-1">{patient.vitals.temperature}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-cyan-50 border border-cyan-100">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-600" />
                          <span className="text-sm text-cyan-700">Oxygen Sat</span>
                        </div>
                        <div className="text-lg font-bold text-slate-900 mt-1">{patient.vitals.oxygenSaturation}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm text-indigo-700">Respiratory Rate</span>
                        </div>
                        <div className="text-lg font-bold text-slate-900 mt-1">{patient.vitals.respiratoryRate}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Medical Summary - More detailed */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-slate-900">Medical Summary</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Full Report →
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          Chronic Conditions
                        </div>
                        <div className="space-y-3">
                          {patient.chronicConditions.map((condition, index) => (
                            <div key={index} className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-slate-900">{condition.name}</div>
                                <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                                  {condition.severity}
                                </span>
                              </div>
                              <div className="text-sm text-slate-600 mt-1">Diagnosed: {condition.diagnosed}</div>
                              <div className="text-xs text-slate-500 mt-1">Treatment: {condition.treatment}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          Allergies & Sensitivities
                        </div>
                        <div className="space-y-3">
                          {patient.allergies.map((allergy, index) => (
                            <div key={index} className="p-3 rounded-lg border border-yellow-100 bg-yellow-50">
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-slate-900">{allergy.name}</div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  allergy.severity === 'High' ? 'bg-red-100 text-red-700' :
                                  allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {allergy.severity}
                                </span>
                              </div>
                              <div className="text-sm text-slate-600 mt-1">Reaction: {allergy.reaction}</div>
                              <div className="text-xs text-slate-500 mt-1">Diagnosed: {allergy.diagnosed}</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6">
                          <div className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            Immunizations
                          </div>
                          <div className="space-y-2">
                            {patient.immunizations.map((immunization, index) => (
                              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                                <div>
                                  <div className="text-sm font-medium text-slate-900">{immunization.vaccine}</div>
                                  <div className="text-xs text-slate-500">{immunization.date} • {immunization.dose}</div>
                                </div>
                                <div className="text-xs text-slate-500">Next: {immunization.nextDue}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Quick Stats & Actions */}
                <div className="space-y-6">
                  {/* Current Medications */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900">Current Medications</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                        {patient.medications.length} Active
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {patient.medications.map((med, index) => (
                        <div key={index} className="p-3 rounded-lg border border-slate-200">
                          <div className="font-medium text-slate-900">{med.name}</div>
                          <div className="text-sm text-slate-600 mt-1">{med.dosage} • {med.frequency}</div>
                          <div className="text-xs text-slate-500 mt-1">For: {med.purpose}</div>
                          <div className="text-xs text-blue-600 mt-2">Last refill: {med.lastRefill}</div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full mt-4 p-3 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                      <Pill className="w-4 h-4" />
                      <span className="text-sm font-medium">Prescribe New Medication</span>
                    </button>
                  </motion.div>

                  {/* Quick Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Patient Statistics</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                        <div>
                          <div className="text-sm text-slate-600">Patient Since</div>
                          <div className="font-medium text-slate-900">{patient.patientSince}</div>
                        </div>
                        <Calendar className="w-5 h-5 text-slate-400" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                        <div>
                          <div className="text-sm text-slate-600">Total Visits</div>
                          <div className="font-medium text-slate-900">{patient.medicalHistory.length}</div>
                        </div>
                        <Users className="w-5 h-5 text-blue-400" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                        <div>
                          <div className="text-sm text-slate-600">Last Lab Test</div>
                          <div className="font-medium text-slate-900">{patient.labResults[0].date}</div>
                        </div>
                        <Clipboard className="w-5 h-5 text-green-400" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
                        <div>
                          <div className="text-sm text-slate-600">Blood Group</div>
                          <div className="font-medium text-slate-900">{patient.bloodGroup}</div>
                        </div>
                        <Droplets className="w-5 h-5 text-purple-400" />
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
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                    
                    <div className="space-y-3">
                      <button className="w-full p-3 rounded-lg border border-slate-300 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-3">
                        <FilePlus className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-slate-700">Add Consultation</span>
                      </button>
                      
                      <button className="w-full p-3 rounded-lg border border-slate-300 hover:border-green-300 hover:bg-green-50 transition-all flex items-center gap-3">
                        <Clipboard className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-slate-700">Order Lab Test</span>
                      </button>
                      
                      <button className="w-full p-3 rounded-lg border border-slate-300 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center gap-3">
                        <Pill className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-slate-700">Prescribe Medication</span>
                      </button>
                      
                      <button className="w-full p-3 rounded-lg border border-slate-300 hover:border-red-300 hover:bg-red-50 transition-all flex items-center gap-3">
                        <Download className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-slate-700">Export Records</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === "medical" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Medical History</h3>
                  <p className="text-sm text-slate-600">Complete record of all medical consultations and procedures</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit">
                  <FilePlus className="w-4 h-4" />
                  Add New Entry
                </button>
              </div>

              <div className="space-y-4">
                {patient.medicalHistory.map((record, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              record.type === 'Emergency' ? 'bg-red-100' :
                              record.type === 'Consultation' ? 'bg-blue-100' :
                              record.type === 'Routine Check' ? 'bg-green-100' : 'bg-purple-100'
                            }`}>
                              {record.type === 'Emergency' && <AlertCircle className="w-5 h-5 text-red-600" />}
                              {record.type === 'Consultation' && <Stethoscope className="w-5 h-5 text-blue-600" />}
                              {record.type === 'Routine Check' && <CheckCircle className="w-5 h-5 text-green-600" />}
                              {record.type === 'Lab Test' && <Clipboard className="w-5 h-5 text-purple-600" />}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">{record.type}</h4>
                              <div className="text-sm text-slate-500">{record.date} • {record.duration}</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {record.department}
                            </span>
                            {record.type === 'Emergency' && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                                Emergency
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-slate-600 mb-1">Attending Doctor</div>
                            <div className="font-medium text-slate-900">{record.doctor}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-600 mb-1">Primary Diagnosis</div>
                            <div className="font-medium text-slate-900">{record.diagnosis}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-sm text-slate-600 mb-2">Notes</div>
                          <p className="text-slate-700">{record.notes}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-slate-600 mb-1">Treatment Provided</div>
                            <div className="text-sm text-slate-700">{record.treatment}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-600 mb-1">Follow-up Required</div>
                            <div className="text-sm text-slate-700">{record.followUp}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">View Details</span>
                        </button>
                        <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Download</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Medications Tab */}
          {activeTab === "medications" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Current Medications</h3>
                  <p className="text-sm text-slate-600">Active prescriptions and medication history</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit">
                  <Pill className="w-4 h-4" />
                  Prescribe New
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Active Prescriptions</h4>
                  <div className="space-y-4">
                    {patient.medications.map((med, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                              <Pill className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-900">{med.name}</h5>
                              <div className="text-sm text-slate-600">{med.dosage} • {med.frequency}</div>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Active
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Purpose</div>
                            <div className="text-sm font-medium text-slate-900">{med.purpose}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Prescribed By</div>
                            <div className="text-sm font-medium text-slate-900">{med.prescribedBy}</div>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <ClockIcon className="w-3 h-3" />
                            <span>Instructions: {med.instructions}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>Started: {med.startDate} • Last refill: {med.lastRefill}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                            Request Refill
                          </button>
                          <button className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
                            Discontinue
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Medication Statistics</h4>
                  <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg bg-blue-50">
                        <div className="text-2xl font-bold text-blue-600">{patient.medications.length}</div>
                        <div className="text-sm text-slate-600">Active Medications</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-green-50">
                        <div className="text-2xl font-bold text-green-600">4</div>
                        <div className="text-sm text-slate-600">Months Adherence</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h5 className="font-bold text-slate-900 mb-4">Recent Medication History</h5>
                    <div className="space-y-3">
                      {[
                        { date: "Nov 1, 2024", action: "Refill", medication: "Lisinopril", status: "Completed" },
                        { date: "Oct 15, 2024", action: "Prescribed", medication: "Aspirin", status: "Active" },
                        { date: "Sep 30, 2024", action: "Adjusted", medication: "Metformin", status: "Completed" },
                        { date: "Aug 20, 2024", action: "Discontinued", medication: "Amlodipine", status: "Inactive" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                          <div>
                            <div className="font-medium text-slate-900">{item.medication}</div>
                            <div className="text-sm text-slate-600">{item.action} • {item.date}</div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.status === 'Active' ? 'bg-green-100 text-green-700' :
                            item.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lab Results Tab */}
          {activeTab === "labs" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Laboratory Results</h3>
                  <p className="text-sm text-slate-600">Test results and laboratory reports</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit">
                  <Clipboard className="w-4 h-4" />
                  Order New Test
                </button>
              </div>

              <div className="space-y-6">
                {patient.labResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                  >
                    <div className={`p-4 sm:p-6 border-l-4 ${
                      result.status === 'Abnormal' ? 'border-red-500 bg-red-50' :
                      result.status === 'Elevated' ? 'border-orange-500 bg-orange-50' :
                      'border-green-500 bg-green-50'
                    }`}>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="font-bold text-slate-900">{result.test}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-slate-600">{result.date}</span>
                            <span className="text-sm text-slate-600">•</span>
                            <span className="text-sm text-slate-600">{result.lab}</span>
                            <span className="text-sm text-slate-600">•</span>
                            <span className="text-sm text-slate-600">By {result.doctor}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            result.status === 'Abnormal' ? 'bg-red-100 text-red-700' :
                            result.status === 'Elevated' ? 'bg-orange-100 text-orange-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {result.status}
                          </span>
                          <button className="p-2 rounded-lg hover:bg-white/50 transition-colors">
                            <Download className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-slate-600 mb-2">Result Summary</div>
                        <div className={`p-4 rounded-lg ${
                          result.status === 'Abnormal' ? 'bg-red-100' :
                          result.status === 'Elevated' ? 'bg-orange-100' :
                          'bg-green-100'
                        }`}>
                          <div className="font-medium text-slate-900">{result.result}</div>
                          <div className="text-sm text-slate-700 mt-1">{result.details}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View Full Report
                        </button>
                        <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                          <Printer className="w-4 h-4" />
                          Print
                        </button>
                        <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Vitals History Tab */}
          {activeTab === "vitals" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Vitals History</h3>
                  <p className="text-sm text-slate-600">Historical vital sign measurements and trends</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    View Trends
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Record Vitals
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                <h4 className="font-bold text-slate-900 mb-4">Vitals Trends (Last 5 Measurements)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Blood Pressure</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Heart Rate</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Temperature</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Blood Sugar</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Weight</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Oxygen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patient.vitalsHistory.map((vital, index) => (
                        <tr key={index} className="border-b border-slate-100 last:border-0">
                          <td className="py-3 px-4 text-sm text-slate-900">{vital.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${
                                parseInt(vital.bloodPressure.split('/')[0]) > 140 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {vital.bloodPressure}
                              </span>
                              {parseInt(vital.bloodPressure.split('/')[0]) > 140 ? (
                                <TrendingUp className="w-3 h-3 text-red-500" />
                              ) : (
                                <TrendingDown className="w-3 h-3 text-green-500" />
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-sm font-medium ${
                              parseInt(vital.heartRate) > 100 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {vital.heartRate} BPM
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-sm font-medium ${
                              parseFloat(vital.temperature) > 37.5 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {vital.temperature}°C
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-sm font-medium ${
                              parseInt(vital.bloodSugar) > 140 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {vital.bloodSugar} mg/dL
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium text-slate-900">{vital.weight} kg</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-sm font-medium ${
                              parseInt(vital.oxygen) < 95 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {vital.oxygen}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="font-bold text-slate-900 mb-4">Blood Pressure Trends</h4>
                  <div className="h-48 flex items-end gap-1">
                    {patient.vitalsHistory.map((vital, index) => {
                      const systolic = parseInt(vital.bloodPressure.split('/')[0]);
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-red-500 rounded-t"
                            style={{ height: `${(systolic - 100) / 2}%` }}
                          ></div>
                          <div className="text-xs text-slate-500 mt-2">{vital.date.split(' ')[0]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="font-bold text-slate-900 mb-4">Blood Sugar Trends</h4>
                  <div className="h-48 flex items-end gap-1">
                    {patient.vitalsHistory.map((vital, index) => {
                      const sugar = parseInt(vital.bloodSugar);
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-blue-500 rounded-t"
                            style={{ height: `${(sugar - 70) / 2}%` }}
                          ></div>
                          <div className="text-xs text-slate-500 mt-2">{vital.date.split(' ')[0]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Medical Documents</h3>
                  <p className="text-sm text-slate-600">All medical records, forms, and reports</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit">
                  <Upload className="w-4 h-4" />
                  Upload Document
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patient.documents.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <File className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        doc.status === 'Signed' ? 'bg-green-100 text-green-700' :
                        doc.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                        doc.status === 'Processed' ? 'bg-purple-100 text-purple-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {doc.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 mb-2">{doc.name}</h4>
                    <div className="text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <File className="w-3 h-3" />
                        <span>Type: {doc.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>Date: {doc.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Download className="w-3 h-3" />
                        <span>Size: {doc.size}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center justify-center gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button className="flex-1 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm flex items-center justify-center gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Document Categories</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-white border border-slate-200">
                    <div className="text-2xl font-bold text-blue-600">5</div>
                    <div className="text-sm text-slate-600">Total Documents</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white border border-slate-200">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-slate-600">Signed</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white border border-slate-200">
                    <div className="text-2xl font-bold text-purple-600">2.1 MB</div>
                    <div className="text-sm text-slate-600">Average Size</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white border border-slate-200">
                    <div className="text-2xl font-bold text-orange-600">2024</div>
                    <div className="text-sm text-slate-600">Latest Year</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Family History Tab */}
          {activeTab === "family" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Family Medical History</h3>
                  <p className="text-sm text-slate-600">Genetic predispositions and hereditary conditions</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit">
                  <Users className="w-4 h-4" />
                  Update Family History
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Father */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Father</h4>
                        <div className="text-sm text-slate-600">{patient.familyHistory.father.status}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">Medical Conditions</div>
                      <div className="space-y-2">
                        {patient.familyHistory.father.conditions.map((condition, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-slate-700">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mother */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Mother</h4>
                        <div className="text-sm text-slate-600">{patient.familyHistory.mother.status}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">Medical Conditions</div>
                      <div className="space-y-2">
                        {patient.familyHistory.mother.conditions.map((condition, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-slate-700">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Siblings */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h4 className="font-bold text-slate-900 mb-4">Siblings</h4>
                    <div className="space-y-4">
                      {patient.familyHistory.siblings.map((sibling, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">{sibling.relation} • Age {sibling.age}</div>
                              <div className="text-sm text-slate-600">
                                {sibling.conditions.length > 0 ? sibling.conditions.join(', ') : 'No known conditions'}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                            {sibling.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Children */}
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h4 className="font-bold text-slate-900 mb-4">Children</h4>
                    <div className="space-y-4">
                      {patient.familyHistory.children.map((child, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">{child.name} • Age {child.age}</div>
                              <div className="text-sm text-slate-600">
                                {child.conditions.length > 0 ? child.conditions.join(', ') : 'No known conditions'}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                            {child.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Genetic Risk Assessment</h4>
                    <p className="text-sm text-slate-700 mb-3">
                      Based on family history, this patient has an increased risk for:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Heart Disease</span>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Diabetes Type 2</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Breast Cancer</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Hypertension</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Billing & Insurance</h3>
                  <p className="text-sm text-slate-600">Financial transactions and insurance claims</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit">
                  <Receipt className="w-4 h-4" />
                  Generate Invoice
                </button>
              </div>

              {/* Billing Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="text-sm text-slate-600 mb-2">Total Billed</div>
                  <div className="text-2xl font-bold text-slate-900">{patient.billing.totalBilled}</div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="text-sm text-slate-600 mb-2">Total Paid</div>
                  <div className="text-2xl font-bold text-green-600">{patient.billing.totalPaid}</div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="text-sm text-slate-600 mb-2">Outstanding</div>
                  <div className="text-2xl font-bold text-red-600">{patient.billing.outstanding}</div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="text-sm text-slate-600 mb-2">Insurance Covered</div>
                  <div className="text-2xl font-bold text-blue-600">{patient.billing.insuranceCovered}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="font-bold text-slate-900 mb-4">Recent Transactions</h4>
                  <div className="space-y-4">
                    {patient.billing.recentTransactions.map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                        <div>
                          <div className="font-medium text-slate-900">{transaction.description}</div>
                          <div className="text-sm text-slate-600">{transaction.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-slate-900">{transaction.amount}</div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            transaction.status === 'Paid' ? 'bg-green-100 text-green-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Payments */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="font-bold text-slate-900 mb-4">Upcoming Payments</h4>
                  <div className="space-y-4">
                    {patient.billing.upcomingPayments.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                        <div>
                          <div className="font-medium text-slate-900">{payment.description}</div>
                          <div className="text-sm text-slate-600">Due: {payment.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-slate-900">{payment.amount}</div>
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div className="font-medium text-slate-900">Insurance Coverage Active</div>
                    </div>
                    <p className="text-sm text-slate-700">
                      Insurance policy is active with {patient.insurance.provider}. Coverage expires on {patient.insurance.expiry}.
                    </p>
                  </div>
                </div>
              </div>

              {/* Insurance Details */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h4 className="font-bold text-slate-900 mb-4">Insurance Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Provider</div>
                      <div className="font-medium text-slate-900">{patient.insurance.provider}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Policy Number</div>
                      <div className="font-medium text-slate-900">{patient.insurance.policyNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Coverage Type</div>
                      <div className="font-medium text-slate-900">{patient.insurance.type}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Coverage Amount</div>
                      <div className="font-medium text-green-600">{patient.insurance.coverage}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Expiry Date</div>
                      <div className="font-medium text-slate-900">{patient.insurance.expiry}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Status</div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export & Share Options */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Export & Share Records</h3>
            <p className="text-sm text-slate-600">Generate reports or share with other healthcare providers</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print Summary
            </button>
            <button className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Securely
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}