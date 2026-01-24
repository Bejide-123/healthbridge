// app/hospital/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings as SettingsIcon, UserPlus, Users, User, Shield,
  DollarSign, CreditCard, Bell, Globe, FileText,
  Camera, MapPin, Phone, Mail, Lock, Key,
  Save, RefreshCw, Upload, Download, Trash2,
  Eye, EyeOff, Check, X, Plus, Minus,
  ChevronRight, Building, Calendar, Clock,
  Smartphone, Tablet, Laptop, Monitor,
  Wifi, Server, Database, Cloud,
  Heart, Stethoscope, Pill, Syringe,
  AlertTriangle, Info, HelpCircle, MoreHorizontal, Activity
} from "lucide-react";

// Mock data
const hospitalProfile = {
  name: "Lagos City Medical Center",
  type: "Multi-Specialty Hospital",
  registrationNumber: "HOSP-123456",
  established: "2010",
  address: "123 Medical Street, Victoria Island, Lagos",
  phone: "+234 801 234 5678",
  email: "contact@lagosmedical.com",
  website: "www.lagosmedical.com",
  operatingHours: {
    weekdays: "8:00 AM - 8:00 PM",
    saturday: "9:00 AM - 6:00 PM",
    sunday: "10:00 AM - 4:00 PM",
    emergency: "24/7"
  },
  logo: null
};

const mockDoctors = [
  { id: "D-001", name: "Dr. Adebola Johnson", specialty: "Cardiologist", phone: "+234 801 234 5679", fee: 15000, status: "active" },
  { id: "D-002", name: "Dr. Chioma Okafor", specialty: "Pediatrician", phone: "+234 802 345 6789", fee: 12000, status: "active" },
  { id: "D-003", name: "Dr. Emeka Nwosu", specialty: "Orthopedic Surgeon", phone: "+234 803 456 7890", fee: 25000, status: "active" },
  { id: "D-004", name: "Dr. Fatima Bello", specialty: "Dermatologist", phone: "+234 804 567 8901", fee: 18000, status: "inactive" }
];

const mockStaff = [
  { id: "S-001", name: "Aisha Mohammed", role: "Head Receptionist", phone: "+234 805 678 9012", status: "active" },
  { id: "S-002", name: "Chinedu Okoro", role: "Pharmacist", phone: "+234 806 789 0123", status: "active" },
  { id: "S-003", name: "Grace Okafor", role: "Lab Technician", phone: "+234 807 890 1234", status: "active" },
  { id: "S-004", name: "Tunde Lawal", role: "Nurse", phone: "+234 808 901 2345", status: "inactive" }
];

const departments = [
  "General Medicine",
  "Cardiology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Gynecology",
  "Dentistry",
  "Emergency"
];

const servicePrices = [
  { service: "Consultation", fee: 5000, unit: "per visit" },
  { service: "Emergency Consultation", fee: 10000, unit: "per visit" },
  { service: "Follow-up Consultation", fee: 3000, unit: "per visit" },
  { service: "Full Blood Count", fee: 3500, unit: "per test" },
  { service: "Malaria Test", fee: 2500, unit: "per test" },
  { service: "X-Ray", fee: 8000, unit: "per scan" },
  { service: "Ultrasound", fee: 15000, unit: "per session" }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState(hospitalProfile);
  const [doctors, setDoctors] = useState(mockDoctors);
  const [staff, setStaff] = useState(mockStaff);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remitaDetails, setRemitaDetails] = useState({
    merchantId: "2567890123",
    apiKey: "••••••••••",
    isLive: true
  });
  const [bankDetails, setBankDetails] = useState({
    bankName: "Guaranty Trust Bank",
    accountNumber: "0123456789",
    accountName: "Lagos City Medical Center"
  });
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    phone: "",
    fee: ""
  });
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    phone: ""
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    emergency: true,
    appointment: true,
    payment: true
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: 30,
    ipWhitelist: [],
    auditLogs: true
  });

  const tabs = [
    { id: "profile", label: "Hospital Profile", icon: Building },
    { id: "doctors", label: "Doctors", icon: Stethoscope },
    { id: "staff", label: "Staff", icon: Users },
    { id: "services", label: "Services & Pricing", icon: DollarSign },
    { id: "payment", label: "Payment Settings", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "integrations", label: "Integrations", icon: Cloud }
  ];

  const handleSaveProfile = () => {
    // Save profile logic
    alert("Profile saved successfully!");
  };

  const handleAddDoctor = () => {
    if (!newDoctor.name || !newDoctor.specialty || !newDoctor.phone || !newDoctor.fee) {
      alert("Please fill all fields");
      return;
    }

    const doctor = {
      id: `D-00${doctors.length + 1}`,
      name: newDoctor.name,
      specialty: newDoctor.specialty,
      phone: newDoctor.phone,
      fee: parseInt(newDoctor.fee),
      status: "active"
    };

    setDoctors([...doctors, doctor]);
    setNewDoctor({ name: "", specialty: "", phone: "", fee: "" });
    setShowAddDoctor(false);
  };

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.role || !newStaff.phone) {
      alert("Please fill all fields");
      return;
    }

    const staffMember = {
      id: `S-00${staff.length + 1}`,
      name: newStaff.name,
      role: newStaff.role,
      phone: newStaff.phone,
      status: "active"
    };

    setStaff([...staff, staffMember]);
    setNewStaff({ name: "", role: "", phone: "" });
    setShowAddStaff(false);
  };

  const handleToggleStatus = (type: "doctor" | "staff", id: string) => {
    if (type === "doctor") {
      setDoctors(doctors.map(d => 
        d.id === id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d
      ));
    } else {
      setStaff(staff.map(s => 
        s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s
      ));
    }
  };

  const handleExportData = () => {
    alert("Data export started. You will receive an email with download link.");
  };

  const handleBackup = () => {
    alert("Backup process started. This may take a few minutes.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 px-4 lg:px-0">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 truncate">Settings</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base truncate">Configure hospital system settings</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleBackup}
            className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm min-w-[100px] justify-center"
          >
            <Database className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Backup</span>
          </button>
          <button
            onClick={handleExportData}
            className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm min-w-[100px] justify-center"
          >
            <Download className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Export</span>
          </button>
          <button
            onClick={handleSaveProfile}
            className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm min-w-[100px] justify-center"
          >
            <Save className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Save</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 px-4 lg:px-0 pb-6">
        {/* Mobile Tab Selector */}
        <div className="lg:hidden mb-4">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
          >
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <option key={tab.id} value={tab.id}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </div>
                </option>
              );
            })}
          </select>
        </div>

        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 h-full">
            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-sm ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium truncate">{tab.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform flex-shrink-0 ${
                      activeTab === tab.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                );
              })}
            </nav>

            {/* System Status */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                  <Server className="w-4 h-4 text-green-600" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-green-900 text-sm">System Status</div>
                  <div className="text-xs text-green-700 truncate">All systems operational</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 truncate">API Health</span>
                  <span className="font-medium text-green-600 flex-shrink-0">✓ Healthy</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 truncate">Database</span>
                  <span className="font-medium text-green-600 flex-shrink-0">✓ Connected</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 truncate">Remita</span>
                  <span className="font-medium text-green-600 flex-shrink-0">✓ Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-3/4 min-w-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4 lg:p-6">
            <AnimatePresence mode="wait">
              {/* Hospital Profile */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 truncate">Hospital Profile</h3>
                    <div className="space-y-6">
                      {/* Logo Upload */}
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                          {hospitalProfile.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 mb-2 truncate">Hospital Logo</div>
                          <div className="flex flex-wrap gap-2">
                            <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm flex items-center gap-2 min-w-[120px] justify-center">
                              <Upload className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">Upload New</span>
                            </button>
                            <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm min-w-[100px] justify-center">
                              <span className="truncate">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Basic Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                            Hospital Name *
                          </label>
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                            placeholder="Hospital name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                            Hospital Type *
                          </label>
                          <select
                            value={profile.type}
                            onChange={(e) => setProfile({...profile, type: e.target.value})}
                            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white"
                          >
                            <option>Multi-Specialty Hospital</option>
                            <option>Specialty Hospital</option>
                            <option>Clinic</option>
                            <option>Diagnostic Center</option>
                            <option>Dental Clinic</option>
                            <option>Eye Care Center</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                            Registration Number *
                          </label>
                          <input
                            type="text"
                            value={profile.registrationNumber}
                            onChange={(e) => setProfile({...profile, registrationNumber: e.target.value})}
                            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                            placeholder="Registration number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                            Year Established *
                          </label>
                          <input
                            type="text"
                            value={profile.established}
                            onChange={(e) => setProfile({...profile, established: e.target.value})}
                            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                            placeholder="Year"
                          />
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900 truncate">Contact Information</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Address *
                            </label>
                            <input
                              type="text"
                              value={profile.address}
                              onChange={(e) => setProfile({...profile, address: e.target.value})}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="Hospital address"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              value={profile.phone}
                              onChange={(e) => setProfile({...profile, phone: e.target.value})}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="+234 801 234 5678"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile({...profile, email: e.target.value})}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="contact@hospital.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Website
                            </label>
                            <input
                              type="url"
                              value={profile.website}
                              onChange={(e) => setProfile({...profile, website: e.target.value})}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="www.hospital.com"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Operating Hours */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900 truncate">Operating Hours</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Weekdays (Mon-Fri)
                            </label>
                            <input
                              type="text"
                              value={profile.operatingHours.weekdays}
                              onChange={(e) => setProfile({
                                ...profile,
                                operatingHours: {...profile.operatingHours, weekdays: e.target.value}
                              })}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="8:00 AM - 8:00 PM"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Saturday
                            </label>
                            <input
                              type="text"
                              value={profile.operatingHours.saturday}
                              onChange={(e) => setProfile({
                                ...profile,
                                operatingHours: {...profile.operatingHours, saturday: e.target.value}
                              })}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="9:00 AM - 6:00 PM"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Sunday
                            </label>
                            <input
                              type="text"
                              value={profile.operatingHours.sunday}
                              onChange={(e) => setProfile({
                                ...profile,
                                operatingHours: {...profile.operatingHours, sunday: e.target.value}
                              })}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="10:00 AM - 4:00 PM"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Emergency Services
                            </label>
                            <input
                              type="text"
                              value={profile.operatingHours.emergency}
                              onChange={(e) => setProfile({
                                ...profile,
                                operatingHours: {...profile.operatingHours, emergency: e.target.value}
                              })}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="24/7"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Doctors Management */}
              {activeTab === "doctors" && (
                <motion.div
                  key="doctors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 min-w-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-900 truncate">Doctors Management</h3>
                    <button
                      onClick={() => setShowAddDoctor(true)}
                      className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm min-w-[140px] justify-center"
                    >
                      <UserPlus className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Add Doctor</span>
                    </button>
                  </div>

                  {/* Add Doctor Form */}
                  <AnimatePresence>
                    {showAddDoctor && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 mb-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                                Doctor's Name *
                              </label>
                              <input
                                type="text"
                                value={newDoctor.name}
                                onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                                placeholder="Dr. John Doe"
                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                                Specialty *
                              </label>
                              <select
                                value={newDoctor.specialty}
                                onChange={(e) => setNewDoctor({...newDoctor, specialty: e.target.value})}
                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white"
                              >
                                <option value="">Select Specialty</option>
                                <option>Cardiologist</option>
                                <option>Pediatrician</option>
                                <option>Orthopedic Surgeon</option>
                                <option>Dermatologist</option>
                                <option>Gynecologist</option>
                                <option>Dentist</option>
                                <option>General Physician</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                value={newDoctor.phone}
                                onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                                placeholder="+234 801 234 5678"
                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                                Consultation Fee (₦) *
                              </label>
                              <input
                                type="number"
                                value={newDoctor.fee}
                                onChange={(e) => setNewDoctor({...newDoctor, fee: e.target.value})}
                                placeholder="15000"
                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={handleAddDoctor}
                              className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all text-sm min-w-[120px]"
                            >
                              Save Doctor
                            </button>
                            <button
                              onClick={() => setShowAddDoctor(false)}
                              className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm min-w-[100px]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Doctors List */}
                  <div className="space-y-3">
                    {doctors.map(doctor => (
                      <div key={doctor.id} className="p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {doctor.name.split(' ')[1]?.charAt(0) || 'D'}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{doctor.name}</div>
                              <div className="text-xs sm:text-sm text-slate-600 truncate">{doctor.specialty}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between sm:justify-end gap-3">
                            <div className="text-right min-w-0">
                              <div className="font-bold text-slate-900 text-sm truncate">₦{doctor.fee.toLocaleString()}</div>
                              <div className="text-xs text-slate-600 truncate">{doctor.phone}</div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleStatus("doctor", doctor.id)}
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  doctor.status === "active"
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                              >
                                {doctor.status === "active" ? "Active" : "Inactive"}
                              </button>
                              <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                                <MoreHorizontal className="w-4 h-4 text-slate-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Staff Management */}
              {activeTab === "staff" && (
                <motion.div
                  key="staff"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 min-w-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-900 truncate">Staff Management</h3>
                    <button
                      onClick={() => setShowAddStaff(true)}
                      className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm min-w-[140px] justify-center"
                    >
                      <UserPlus className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">Add Staff</span>
                    </button>
                  </div>

                  {/* Add Staff Form */}
                  <AnimatePresence>
                    {showAddStaff && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 mb-6">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                                Staff Name *
                              </label>
                              <input
                                type="text"
                                value={newStaff.name}
                                onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                                placeholder="John Doe"
                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                                Role *
                              </label>
                              <select
                                value={newStaff.role}
                                onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white"
                              >
                                <option value="">Select Role</option>
                                <option>Receptionist</option>
                                <option>Nurse</option>
                                <option>Pharmacist</option>
                                <option>Lab Technician</option>
                                <option>Accountant</option>
                                <option>Administrator</option>
                                <option>Cleaner</option>
                                <option>Security</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                value={newStaff.phone}
                                onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                                placeholder="+234 801 234 5678"
                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={handleAddStaff}
                              className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all text-sm min-w-[120px]"
                            >
                              Save Staff
                            </button>
                            <button
                              onClick={() => setShowAddStaff(false)}
                              className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm min-w-[100px]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Staff List */}
                  <div className="space-y-3">
                    {staff.map(staffMember => (
                      <div key={staffMember.id} className="p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {staffMember.name.split(' ')[0]?.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{staffMember.name}</div>
                              <div className="text-xs sm:text-sm text-slate-600 truncate">{staffMember.role}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between sm:justify-end gap-3">
                            <div className="text-sm text-slate-600 truncate sm:hidden">
                              {staffMember.phone}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleStatus("staff", staffMember.id)}
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  staffMember.status === "active"
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                              >
                                {staffMember.status === "active" ? "Active" : "Inactive"}
                              </button>
                              <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                                <MoreHorizontal className="w-4 h-4 text-slate-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:block mt-2">
                          <div className="text-xs text-slate-600 truncate">{staffMember.phone}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Services & Pricing */}
              {activeTab === "services" && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 min-w-0"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4 truncate">Services & Pricing</h3>
                    
                    {/* Departments */}
                    <div className="mb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <h4 className="font-medium text-slate-900 truncate">Departments</h4>
                        <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm min-w-[140px] justify-center">
                          <span className="truncate">Add Department</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {departments.map((dept, index) => (
                          <div key={index} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-900 truncate">{dept}</span>
                              <button className="text-slate-400 hover:text-red-600 ml-2 flex-shrink-0">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Service Pricing */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <h4 className="font-medium text-slate-900 truncate">Service Pricing</h4>
                        <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm min-w-[120px] justify-center">
                          <span className="truncate">Add Service</span>
                        </button>
                      </div>
                      <div className="space-y-3">
                        {servicePrices.map((service, index) => (
                          <div key={index} className="p-3 sm:p-4 rounded-xl border border-slate-200 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="min-w-0">
                                <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{service.service}</div>
                                <div className="text-xs sm:text-sm text-slate-600 truncate">{service.unit}</div>
                              </div>
                              <div className="flex items-center justify-between sm:justify-end gap-3">
                                <div className="text-right">
                                  <div className="font-bold text-slate-900 text-sm sm:text-base">₦{service.fee.toLocaleString()}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm min-w-[60px]">
                                    Edit
                                  </button>
                                  <button className="px-2 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs sm:text-sm min-w-[80px]">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payment Settings */}
              {activeTab === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 min-w-0"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 truncate">Payment Settings</h3>
                    
                    {/* Remita Integration */}
                    <div className="mb-8">
                      <h4 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">Remita Payment Gateway</span>
                      </h4>
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Merchant ID *
                            </label>
                            <input
                              type="text"
                              value={remitaDetails.merchantId}
                              onChange={(e) => setRemitaDetails({...remitaDetails, merchantId: e.target.value})}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="Merchant ID"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              API Key *
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={remitaDetails.apiKey}
                                onChange={(e) => setRemitaDetails({...remitaDetails, apiKey: e.target.value})}
                                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm pr-10"
                                placeholder="API Key"
                              />
                              <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4 text-slate-400" />
                                ) : (
                                  <Eye className="w-4 h-4 text-slate-400" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={remitaDetails.isLive}
                              onChange={(e) => setRemitaDetails({...remitaDetails, isLive: e.target.checked})}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 flex-shrink-0"
                            />
                            <span className="text-sm text-slate-700 truncate">Live Mode (Uncheck for test mode)</span>
                          </label>
                        </div>
                        <div className="mt-4">
                          <button className="px-3 py-2 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-lg hover:shadow-lg transition-all text-sm min-w-[140px]">
                            Test Connection
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div>
                      <h4 className="font-medium text-slate-900 mb-4 truncate">Bank Account Details</h4>
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Bank Name *
                            </label>
                            <select
                              value={bankDetails.bankName}
                              onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white"
                            >
                              <option>Guaranty Trust Bank</option>
                              <option>Zenith Bank</option>
                              <option>First Bank</option>
                              <option>Access Bank</option>
                              <option>UBA</option>
                              <option>Fidelity Bank</option>
                              <option>Stanbic IBTC</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Account Number *
                            </label>
                            <input
                              type="text"
                              value={bankDetails.accountNumber}
                              onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="Account number"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2 truncate">
                              Account Name *
                            </label>
                            <input
                              type="text"
                              value={bankDetails.accountName}
                              onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
                              placeholder="Account name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications */}
              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 min-w-0"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 truncate">Notification Settings</h3>
                    
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-slate-200 min-w-0">
                          <div className="min-w-0">
                            <div className="font-medium text-slate-900 text-sm sm:text-base capitalize truncate">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-600 truncate">
                              Receive {key} notifications
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-3">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => setNotifications({
                                ...notifications,
                                [key]: !value
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-10 h-5 sm:w-11 sm:h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    {/* Notification Templates */}
                    <div className="mt-8">
                      <h4 className="font-medium text-slate-900 mb-4 truncate">Notification Templates</h4>
                      <div className="space-y-3">
                        <button className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors text-left min-w-0">
                          <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Appointment Reminder</div>
                          <div className="text-xs sm:text-sm text-slate-600 truncate">Edit SMS/Email template for appointment reminders</div>
                        </button>
                        <button className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors text-left min-w-0">
                          <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Payment Confirmation</div>
                          <div className="text-xs sm:text-sm text-slate-600 truncate">Edit SMS/Email template for payment confirmations</div>
                        </button>
                        <button className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors text-left min-w-0">
                          <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Test Results</div>
                          <div className="text-xs sm:text-sm text-slate-600 truncate">Edit SMS/Email template for test result notifications</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security */}
              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 min-w-0"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 truncate">Security Settings</h3>
                    
                    <div className="space-y-4">
                      {/* Two-Factor Authentication */}
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl border border-red-200">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0">
                            <h4 className="font-medium text-red-900 mb-1 text-sm sm:text-base truncate">Two-Factor Authentication</h4>
                            <p className="text-xs sm:text-sm text-red-700 truncate">Add an extra layer of security to your account</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-3">
                            <input
                              type="checkbox"
                              checked={security.twoFactor}
                              onChange={() => setSecurity({...security, twoFactor: !security.twoFactor})}
                              className="sr-only peer"
                            />
                            <div className="w-10 h-5 sm:w-11 sm:h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                          </label>
                        </div>
                        {security.twoFactor && (
                          <div className="mt-3 p-3 bg-white rounded-lg border border-red-200">
                            <div className="text-xs sm:text-sm text-slate-700">
                              Two-factor authentication is enabled. You'll need to enter a code from your authenticator app when signing in.
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Session Timeout */}
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-4 text-sm sm:text-base truncate">Session Timeout</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <span className="text-sm text-slate-600">Auto-logout after:</span>
                          <select
                            value={security.sessionTimeout}
                            onChange={(e) => setSecurity({...security, sessionTimeout: parseInt(e.target.value)})}
                            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white w-full sm:w-auto"
                          >
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                            <option value={0}>Never (not recommended)</option>
                          </select>
                        </div>
                      </div>

                      {/* Audit Logs */}
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0">
                            <h4 className="font-medium text-green-900 mb-1 text-sm sm:text-base truncate">Audit Logs</h4>
                            <p className="text-xs sm:text-sm text-green-700 truncate">Track all system activities and changes</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-3">
                            <input
                              type="checkbox"
                              checked={security.auditLogs}
                              onChange={() => setSecurity({...security, auditLogs: !security.auditLogs})}
                              className="sr-only peer"
                            />
                            <div className="w-10 h-5 sm:w-11 sm:h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                      </div>

                      {/* IP Whitelist */}
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                        <h4 className="font-medium text-amber-900 mb-4 text-sm sm:text-base truncate">IP Address Whitelist</h4>
                        <div className="space-y-3">
                          {security.ipWhitelist.length === 0 ? (
                            <p className="text-xs sm:text-sm text-amber-700">No IP addresses whitelisted. Add trusted IP addresses to restrict access.</p>
                          ) : (
                            security.ipWhitelist.map((ip, index) => (
                              <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-white rounded-lg border border-amber-200">
                                <span className="text-slate-900 text-sm truncate">{ip}</span>
                                <button className="text-amber-600 hover:text-red-600 ml-2 flex-shrink-0">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))
                          )}
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <input
                              type="text"
                              placeholder="Enter IP address (e.g., 192.168.1.1)"
                              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm w-full"
                            />
                            <button className="px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm w-full sm:w-auto">
                              Add IP
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Integrations */}
              {activeTab === "integrations" && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 min-w-0"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 truncate">Integrations</h3>
                    
                    <div className="space-y-3">
                      {/* Remita */}
                      <div className="p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Remita Payment Gateway</div>
                              <div className="text-xs sm:text-sm text-slate-600 truncate">Process online payments securely</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-11 sm:ml-0">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
                              Connected
                            </span>
                            <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm min-w-[80px]">
                              Configure
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* SMS Gateway */}
                      <div className="p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-900 text-sm sm:text-base truncate">SMS Gateway</div>
                              <div className="text-xs sm:text-sm text-slate-600 truncate">Send SMS notifications to patients</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-11 sm:ml-0">
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
                              Connected
                            </span>
                            <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm min-w-[80px]">
                              Configure
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Email Service */}
                      <div className="p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Email Service</div>
                              <div className="text-xs sm:text-sm text-slate-600 truncate">Send email notifications and newsletters</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-11 sm:ml-0">
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium whitespace-nowrap">
                              Pending
                            </span>
                            <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm min-w-[80px]">
                              Connect
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Lab System */}
                      <div className="p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Lab Information System</div>
                              <div className="text-xs sm:text-sm text-slate-600 truncate">Integrate with lab equipment and results</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-11 sm:ml-0">
                            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium whitespace-nowrap">
                              Not Connected
                            </span>
                            <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm min-w-[80px]">
                              Connect
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Pharmacy System */}
                      <div className="p-3 sm:p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                              <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Pharmacy Management</div>
                              <div className="text-xs sm:text-sm text-slate-600 truncate">Manage medicine inventory and prescriptions</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-11 sm:ml-0">
                            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium whitespace-nowrap">
                              Not Connected
                            </span>
                            <button className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs sm:text-sm min-w-[80px]">
                              Connect
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* API Documentation */}
                    <div className="mt-6 p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <h4 className="font-medium text-slate-900 text-sm sm:text-base truncate">API Documentation</h4>
                          <p className="text-xs sm:text-sm text-slate-600 truncate">Integrate with our API for custom solutions</p>
                        </div>
                        <button className="px-3 py-2 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-lg hover:shadow-lg transition-all text-sm min-w-[100px] justify-center mt-2 sm:mt-0">
                          View Docs
                        </button>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-700 space-y-1">
                        <div>• REST API endpoints</div>
                        <div>• Webhook support</div>
                        <div>• API key management</div>
                        <div>• Rate limiting information</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}