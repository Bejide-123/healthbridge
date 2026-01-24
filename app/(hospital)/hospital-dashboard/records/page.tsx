// app/hospital/patients/records/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, Filter, Users, UserPlus, MoreVertical,
  Eye, Edit, FileText, Download, MessageSquare,
  Phone, Calendar, Activity, Heart, Droplets,
  Thermometer, AlertCircle, ChevronRight, Plus,
  Stethoscope, Clock, MapPin, User, FileSearch,
  TrendingUp, BarChart3, Printer, Share2, Tag
} from "lucide-react";
import { useRouter } from "next/navigation";

// Patient Card Component for Records
function PatientCard({ patient, onView, onMessage, onEdit }: {
  patient: any;
  onView: () => void;
  onMessage: () => void;
  onEdit: () => void;
}) {
  const [showActions, setShowActions] = useState(false);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          {/* Patient Info */}
          <div className="flex items-start gap-3 flex-1">
            {/* Patient Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {patient.name.charAt(0)}
                </span>
              </div>
              {patient.lastVisit === 'Today' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            {/* Patient Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900">{patient.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskLevelColor(patient.riskLevel)}`}>
                  {patient.riskLevel.toUpperCase()} RISK
                </span>
              </div>
              
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-2">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{patient.age} years • {patient.gender}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-slate-400" />
                  <span>{patient.bloodGroup}</span>
                </div>
              </div>

              {/* Medical Summary */}
              <div className="space-y-1">
                <div className="flex flex-wrap gap-2">
                  {patient.conditions.slice(0, 3).map((condition: string, index: number) => (
                    <span key={index} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">
                      {condition}
                    </span>
                  ))}
                  {patient.conditions.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs">
                      +{patient.conditions.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Contact & Last Visit */}
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Last: {patient.lastVisit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-10">
                <button
                  onClick={() => {
                    router.push(`/hospital-dashboard/records/${patient.id}`);
                    onView();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-slate-50 text-slate-700 rounded-t-lg"
                >
                  <Eye className="w-4 h-4" />
                  View Full Records
                </button>
                <button
                  onClick={() => {
                    onEdit();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-slate-50 text-slate-700"
                >
                  <Edit className="w-4 h-4" />
                  Edit Patient
                </button>
                <button
                  onClick={() => {
                    onMessage();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-slate-50 text-slate-700"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </button>
                <button
                  onClick={() => {
                    // Download records
                    setShowActions(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-slate-50 text-slate-700"
                >
                  <Download className="w-4 h-4" />
                  Download Records
                </button>
                <button
                  onClick={() => {
                    // Print records
                    setShowActions(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-3 hover:bg-slate-50 text-slate-700 rounded-b-lg"
                >
                  <Printer className="w-4 h-4" />
                  Print Summary
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Vitals (if available) */}
        {patient.lastVitals && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs font-medium text-slate-600 mb-2">Last Vitals</div>
            <div className="flex items-center gap-4">
              {patient.lastVitals.bloodPressure && (
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4 text-red-500" />
                  <span className="text-sm">{patient.lastVitals.bloodPressure}</span>
                </div>
              )}
              {patient.lastVitals.bloodSugar && (
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{patient.lastVitals.bloodSugar}</span>
                </div>
              )}
              {patient.lastVitals.temperature && (
                <div className="flex items-center gap-1">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{patient.lastVitals.temperature}</span>
                </div>
              )}
              {patient.lastVitals.heartRate && (
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{patient.lastVitals.heartRate}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
          <button
            onClick={onView}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded-lg hover:shadow-sm transition-all flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            View Records
          </button>
          <button
            onClick={() => {
              // Add consultation
            }}
            className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            <Stethoscope className="w-3 h-3" />
            Add Consultation
          </button>
          <button
            onClick={onMessage}
            className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3" />
            Message
          </button>
          <button
            onClick={() => {
              // Book appointment
            }}
            className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
          >
            <Calendar className="w-3 h-3" />
            Book Appointment
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Mock patients data
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 35,
      gender: "Male",
      bloodGroup: "O+",
      phone: "+234 801 234 5678",
      lastVisit: "Today",
      riskLevel: "high",
      conditions: ["Hypertension", "Type 2 Diabetes", "High Cholesterol"],
      lastVitals: {
        bloodPressure: "145/92",
        bloodSugar: "186 mg/dL",
        temperature: "36.8°C",
        heartRate: "88 BPM"
      },
      department: "Cardiology",
      doctor: "Dr. Adebola"
    },
    {
      id: 2,
      name: "Amina Yusuf",
      age: 28,
      gender: "Female",
      bloodGroup: "B+",
      phone: "+234 802 345 6789",
      lastVisit: "Yesterday",
      riskLevel: "medium",
      conditions: ["Asthma", "Seasonal Allergies"],
      lastVitals: {
        bloodPressure: "118/76",
        bloodSugar: "92 mg/dL",
        temperature: "36.5°C",
        heartRate: "72 BPM"
      },
      department: "Pediatrics",
      doctor: "Dr. Chioma"
    },
    {
      id: 3,
      name: "Chinedu Okoro",
      age: 45,
      gender: "Male",
      bloodGroup: "A+",
      phone: "+234 803 456 7890",
      lastVisit: "Nov 20, 2024",
      riskLevel: "high",
      conditions: ["Chronic Kidney Disease", "Hypertension"],
      lastVitals: {
        bloodPressure: "152/94",
        bloodSugar: "112 mg/dL",
        temperature: "37.1°C",
        heartRate: "82 BPM"
      },
      department: "Nephrology",
      doctor: "Dr. Ahmed"
    },
    {
      id: 4,
      name: "Fatima Bello",
      age: 52,
      gender: "Female",
      bloodGroup: "AB+",
      phone: "+234 804 567 8901",
      lastVisit: "Nov 18, 2024",
      riskLevel: "low",
      conditions: ["Osteoarthritis"],
      lastVitals: {
        bloodPressure: "128/82",
        bloodSugar: "98 mg/dL",
        temperature: "36.7°C",
        heartRate: "76 BPM"
      },
      department: "Orthopedics",
      doctor: "Dr. Fatima"
    },
    {
      id: 5,
      name: "David Brown",
      age: 31,
      gender: "Male",
      bloodGroup: "O-",
      phone: "+234 805 678 9012",
      lastVisit: "Nov 15, 2024",
      riskLevel: "medium",
      conditions: ["Migraine", "Anxiety"],
      lastVitals: {
        bloodPressure: "112/74",
        bloodSugar: "88 mg/dL",
        temperature: "36.6°C",
        heartRate: "68 BPM"
      },
      department: "Neurology",
      doctor: "Dr. Emmanuel"
    },
    {
      id: 6,
      name: "Sarah Johnson",
      age: 29,
      gender: "Female",
      bloodGroup: "A-",
      phone: "+234 806 789 0123",
      lastVisit: "Nov 12, 2024",
      riskLevel: "low",
      conditions: ["PCOS"],
      lastVitals: {
        bloodPressure: "116/78",
        bloodSugar: "94 mg/dL",
        temperature: "36.9°C",
        heartRate: "71 BPM"
      },
      department: "Gynecology",
      doctor: "Dr. Fatima"
    },
    {
      id: 7,
      name: "Michael Chen",
      age: 41,
      gender: "Male",
      bloodGroup: "B-",
      phone: "+234 807 890 1234",
      lastVisit: "Nov 10, 2024",
      riskLevel: "high",
      conditions: ["Coronary Artery Disease", "Type 1 Diabetes"],
      lastVitals: {
        bloodPressure: "142/88",
        bloodSugar: "204 mg/dL",
        temperature: "36.8°C",
        heartRate: "92 BPM"
      },
      department: "Cardiology",
      doctor: "Dr. Adebola"
    },
    {
      id: 8,
      name: "Grace Okafor",
      age: 65,
      gender: "Female",
      bloodGroup: "O+",
      phone: "+234 808 901 2345",
      lastVisit: "Nov 8, 2024",
      riskLevel: "high",
      conditions: ["Heart Failure", "COPD", "Hypertension"],
      lastVitals: {
        bloodPressure: "138/86",
        bloodSugar: "118 mg/dL",
        temperature: "37.0°C",
        heartRate: "86 BPM"
      },
      department: "Cardiology",
      doctor: "Dr. Adebola"
    },
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.phone.includes(searchQuery) ||
                         patient.conditions.some((cond: string) => 
                           cond.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesRisk = riskFilter === "all" || patient.riskLevel === riskFilter;
    const matchesDepartment = departmentFilter === "all" || patient.department === departmentFilter;
    
    return matchesSearch && matchesRisk && matchesDepartment;
  });

  const handleViewRecords = (patient: any) => {
    console.log('View records for:', patient.name);
    // Navigate to patient records page
    // router.push(`/hospital/patients/records/${patient.id}`);
  };

  const handleMessagePatient = (patient: any) => {
    console.log('Message patient:', patient.name);
    // Open chat with patient
  };

  const handleEditPatient = (patient: any) => {
    console.log('Edit patient:', patient.name);
    // Open edit patient modal
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Medical Records</h1>
          <p className="text-slate-600 mt-1">Access and manage patient medical records</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/hospital/patients/add"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition-all"
          >
            <UserPlus className="w-5 h-5" />
            New Patient
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all">
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">{patients.length}</div>
              <div className="text-sm text-slate-600">Total Patients</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {patients.filter(p => p.riskLevel === 'high').length}
              </div>
              <div className="text-sm text-slate-600">High Risk</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {patients.filter(p => p.lastVisit === 'Today' || p.lastVisit === 'Yesterday').length}
              </div>
              <div className="text-sm text-slate-600">Recent Visits</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-sm text-slate-600">Today's Appointments</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
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
                placeholder="Search patients by name, phone, or condition..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
            >
              <option value="all">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Nephrology">Nephrology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
              <option value="Gynecology">Gynecology</option>
            </select>
          </div>
        </div>

        {/* Quick filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
          <button
            onClick={() => setRiskFilter('high')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              riskFilter === 'high'
                ? 'bg-red-100 text-red-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            High Risk
          </button>
          <button
            onClick={() => setDepartmentFilter('Cardiology')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              departmentFilter === 'Cardiology'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cardiology
          </button>
          <button
            onClick={() => {
              setSearchQuery('hypertension');
              setRiskFilter('all');
              setDepartmentFilter('all');
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-all"
          >
            Hypertension
          </button>
          <button
            onClick={() => {
              setSearchQuery('diabetes');
              setRiskFilter('all');
              setDepartmentFilter('all');
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-all"
          >
            Diabetes
          </button>
          <button
            onClick={() => {
              setSearchQuery('');
              setRiskFilter('all');
              setDepartmentFilter('all');
            }}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-all"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Patients List */}
      <div className="space-y-4">
        {filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onView={() => handleViewRecords(patient)}
            onMessage={() => handleMessagePatient(patient)}
            onEdit={() => handleEditPatient(patient)}
          />
        ))}

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileSearch className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No patients found</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery 
                ? `No patients match "${searchQuery}"`
                : 'Try adjusting your filters'}
            </p>
            <Link
              href="/hospital/patients/add"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:shadow-lg transition-all"
            >
              <UserPlus className="w-5 h-5" />
              Register New Patient
            </Link>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Showing <span className="font-medium text-slate-900">{filteredPatients.length}</span> of{' '}
            <span className="font-medium text-slate-900">{patients.length}</span> patients
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Low Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Bulk Actions</h3>
            <p className="text-sm text-slate-600">Perform actions on multiple patients</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              Export All Records
            </button>
            <button className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              Send Bulk Messages
            </button>
            <button className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
              Schedule Follow-ups
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}