// app/patient-dashboard/profile/page.tsx
"use client";

import { useState } from "react";
import { 
  User, Mail, Phone, MapPin, Calendar,
  Shield, Heart, Activity, Users, FileText,
  Edit, Camera, Download, Share2, Key,
  Bell, Lock, Globe, CreditCard, CheckCircle,
  X, Plus, Trash2, Eye, EyeOff, AlertTriangle,
  ChevronRight, Star, Award, Target,
  Upload, QrCode, Smartphone, Shield as ShieldIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "Sarah Johnson", phone: "+234 801 234 5678", relationship: "Spouse", priority: 1 },
    { id: 2, name: "Michael Johnson", phone: "+234 802 345 6789", relationship: "Child", priority: 2 },
    { id: 3, name: "Dr. Adebayo Williams", phone: "+234 803 456 7890", relationship: "Doctor", priority: 3 },
  ]);
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: "Sarah Johnson", relationship: "Spouse", age: 35, lastCheckup: "Nov 15, 2024" },
    { id: 2, name: "Michael Johnson", relationship: "Son", age: 12, lastCheckup: "Oct 20, 2024" },
    { id: 3, name: "Emily Johnson", relationship: "Daughter", age: 8, lastCheckup: "Sep 10, 2024" },
  ]);

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "medical", label: "Medical Profile", icon: Heart },
    { id: "emergency", label: "Emergency Contacts", icon: Shield },
    { id: "family", label: "Family Members", icon: Users },
    { id: "insurance", label: "Insurance", icon: CreditCard },
    { id: "security", label: "Security", icon: Lock },
  ];

  const stats = [
    { label: "Health Score", value: "85%", icon: Activity, color: "from-green-500 to-emerald-500" },
    { label: "Appointments", value: "12", icon: Calendar, color: "from-blue-500 to-cyan-500" },
    { label: "Medications", value: "3", icon: Heart, color: "from-purple-500 to-violet-500" },
    { label: "Member Since", value: "2022", icon: Award, color: "from-orange-500 to-amber-500" },
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case "personal":
        return <PersonalInfoTab isEditing={isEditing} />;
      case "medical":
        return <MedicalProfileTab />;
      case "emergency":
        return <EmergencyContactsTab 
          contacts={emergencyContacts} 
          setContacts={setEmergencyContacts}
        />;
      case "family":
        return <FamilyMembersTab 
          members={familyMembers}
          setMembers={setFamilyMembers}
        />;
      case "insurance":
        return <InsuranceTab />;
      case "security":
        return <SecurityTab showPassword={showPassword} setShowPassword={setShowPassword} />;
      default:
        return <PersonalInfoTab isEditing={isEditing} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-600 mt-2">Manage your personal information and preferences</p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
              isEditing
                ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
                : "bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200"
            }`}
          >
            <Edit className="w-4 h-4" />
            {isEditing ? "Save Changes" : "Edit Profile"}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Data
          </motion.button>
        </div>
      </div>

      {/* Profile Header with Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold relative">
                JD
                <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPhotoMenu(!showPhotoMenu)}
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-lg border-2 border-white"
              >
                <Camera className="w-4 h-4" />
              </motion.button>
              
              {/* Photo Menu */}
              <AnimatePresence>
                {showPhotoMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-10"
                  >
                    <button className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3">
                      <Upload className="w-4 h-4 text-slate-600" />
                      <span className="text-slate-700">Upload Photo</span>
                    </button>
                    <button className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3">
                      <Camera className="w-4 h-4 text-slate-600" />
                      <span className="text-slate-700">Take Photo</span>
                    </button>
                    <button className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 text-red-600">
                      <Trash2 className="w-4 h-4" />
                      <span>Remove Photo</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900">John Doe</h2>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+234 801 234 5678</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm">ID: #HB234567</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-sm flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>Lagos, Nigeria</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>Member since 2022</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Grid - FIXED RESPONSIVENESS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border border-slate-200/50 bg-white hover:shadow-sm transition-shadow min-w-0" // Added min-w-0
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl lg:text-2xl font-bold text-slate-900 truncate">{stat.value}</div>
                    <div className="text-sm text-slate-600 truncate">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Emergency Quick Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-red-900 truncate">Emergency Ready</h3>
              <p className="text-sm text-red-700 truncate">Your info is critical for emergencies</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-white/50 border border-red-100">
              <div className="text-sm text-red-600 font-medium mb-1 truncate">Blood Type</div>
              <div className="text-lg font-bold text-red-900 truncate">O+</div>
            </div>
            
            <div className="p-3 rounded-lg bg-white/50 border border-red-100">
              <div className="text-sm text-red-600 font-medium mb-1 truncate">Allergies</div>
              <div className="text-lg font-bold text-red-900 truncate">None</div>
            </div>
            
            <div className="p-3 rounded-lg bg-white/50 border border-red-100">
              <div className="text-sm text-red-600 font-medium mb-1 truncate">Emergency Contacts</div>
              <div className="text-lg font-bold text-red-900 truncate">3 People</div>
            </div>
          </div>
          
          <button className="w-full mt-6 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-medium hover:from-red-700 hover:to-rose-600 hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="truncate">View Emergency Profile</span>
          </button>
        </motion.div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-xl whitespace-nowrap transition-all relative ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border-t border-x border-slate-200/50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium text-sm md:text-base">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        {renderTabContent()}
      </motion.div>

      {/* QR Code & Quick Share */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-blue-900 mb-2">Your Medical ID QR Code</h3>
            <p className="text-blue-700 mb-4">
              Share this QR code with healthcare providers for quick access to your critical medical information in emergencies.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all flex items-center gap-2">
                <Download className="w-4 h-4 flex-shrink-0" />
                <span>Download QR</span>
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2">
                <Share2 className="w-4 h-4 flex-shrink-0" />
                <span>Share Profile</span>
              </button>
              <button className="px-4 py-2 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all flex items-center gap-2">
                <Smartphone className="w-4 h-4 flex-shrink-0" />
                <span>Add to Wallet</span>
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-48 h-48 rounded-xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
              <QrCode className="w-32 h-32 text-blue-900" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white">
              <ShieldIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Personal Info Tab Component
function PersonalInfoTab({ isEditing }: { isEditing: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <div className="flex gap-3">
              <input
                type="text"
                defaultValue="John"
                readOnly={!isEditing}
                className={`flex-1 px-4 py-3 rounded-xl border ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} outline-none`}
              />
              <input
                type="text"
                defaultValue="Doe"
                readOnly={!isEditing}
                className={`flex-1 px-4 py-3 rounded-xl border ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} outline-none`}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              defaultValue="john.doe@email.com"
              readOnly={!isEditing}
              className={`w-full px-4 py-3 rounded-xl border ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} outline-none`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+234 801 234 5678"
              readOnly={!isEditing}
              className={`w-full px-4 py-3 rounded-xl border ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} outline-none`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
            <input
              type="date"
              defaultValue="1985-06-15"
              readOnly={!isEditing}
              className={`w-full px-4 py-3 rounded-xl border ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} outline-none`}
            />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
            <div className="flex flex-wrap gap-3">
              <button className={`px-4 py-3 rounded-xl border flex-1 min-w-[100px] ${isEditing ? 'border-blue-300 hover:border-blue-400' : 'border-slate-200'} transition-all`}>
                Male
              </button>
              <button className={`px-4 py-3 rounded-xl border flex-1 min-w-[100px] ${isEditing ? 'border-blue-300 hover:border-blue-400' : 'border-slate-200'} transition-all`}>
                Female
              </button>
              <button className={`px-4 py-3 rounded-xl border flex-1 min-w-[100px] ${isEditing ? 'border-blue-300 hover:border-blue-400' : 'border-slate-200'} transition-all`}>
                Other
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
            <textarea
              defaultValue="123 Medical Street, Victoria Island"
              readOnly={!isEditing}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} outline-none resize-none`}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
              <input
                type="text"
                defaultValue="Lagos"
                readOnly={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} outline-none`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
              <input
                type="text"
                defaultValue="Lagos State"
                readOnly={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} outline-none`}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nationality</label>
            <input
              type="text"
              defaultValue="Nigerian"
              readOnly={!isEditing}
              className={`w-full px-4 py-3 rounded-xl border ${isEditing ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-slate-50'} outline-none`}
            />
          </div>
        </div>
      </div>
      
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3"
        >
          <button className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all">
            Cancel
          </button>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all">
            Save Changes
          </button>
        </motion.div>
      )}
    </div>
  );
}

// Medical Profile Tab Component
function MedicalProfileTab() {
  return (
    <div className="space-y-6">
      {/* Medical Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-green-600 flex-shrink-0" />
              <h3 className="font-bold text-green-900 truncate">Vital Information</h3>
            </div>
            
            <div className="space-y-4">
              <div className="min-w-0">
                <div className="text-sm text-green-700 mb-1 truncate">Blood Type</div>
                <div className="text-xl font-bold text-green-900 truncate">O+ (Positive)</div>
              </div>
              
              <div className="min-w-0">
                <div className="text-sm text-green-700 mb-1 truncate">Height & Weight</div>
                <div className="text-xl font-bold text-green-900 truncate">175 cm • 70 kg</div>
                <div className="text-sm text-green-600">BMI: 22.9</div>
              </div>
              
              <div className="min-w-0">
                <div className="text-sm text-green-700 mb-1 truncate">Last Updated</div>
                <div className="text-lg font-medium text-green-900 truncate">November 15, 2024</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <h3 className="font-bold text-blue-900 truncate">Chronic Conditions</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/50 border border-blue-100 min-w-0">
                <div className="font-medium text-blue-900 truncate">Hypertension</div>
                <div className="text-sm text-blue-700 truncate">Diagnosed 2020 • Controlled with medication</div>
              </div>
              
              <div className="p-3 rounded-lg bg-white/50 border border-blue-100 min-w-0">
                <div className="font-medium text-blue-900 truncate">None others reported</div>
                <div className="text-sm text-blue-700 truncate">Regular checkups recommended</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-red-600 flex-shrink-0" />
              <h3 className="font-bold text-red-900 truncate">Allergies & Sensitivities</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/50 border border-red-100 min-w-0">
                <div className="font-medium text-red-900 truncate">No Known Allergies</div>
                <div className="text-sm text-red-700 truncate">No allergies to medications, food, or environment</div>
              </div>
              
              <div className="p-3 rounded-lg bg-white/50 border border-red-100 min-w-0">
                <div className="font-medium text-red-900 truncate">Sensitivities</div>
                <div className="text-sm text-red-700 truncate">Mild reaction to penicillin (rash)</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl border border-purple-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <h3 className="font-bold text-purple-900 truncate">Surgical History</h3>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/50 border border-purple-100 min-w-0">
                <div className="font-medium text-purple-900 truncate">Appendectomy</div>
                <div className="text-sm text-purple-700 truncate">2018 • No complications</div>
              </div>
              
              <div className="p-3 rounded-lg bg-white/50 border border-purple-100 min-w-0">
                <div className="font-medium text-purple-900 truncate">No other surgeries</div>
                <div className="text-sm text-purple-700 truncate">Complete medical records available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
          <Edit className="w-4 h-4 flex-shrink-0" />
          <span>Update Medical Info</span>
        </button>
        
        <button className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2">
          <Download className="w-4 h-4 flex-shrink-0" />
          <span>Download Medical Summary</span>
        </button>
        
        <button className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 hover:shadow-lg transition-all flex items-center gap-2">
          <Share2 className="w-4 h-4 flex-shrink-0" />
          <span>Share with Doctor</span>
        </button>
      </div>
    </div>
  );
}

// Emergency Contacts Tab Component
function EmergencyContactsTab({ 
  contacts, 
  setContacts 
}: { 
  contacts: any[], 
  setContacts: (contacts: any[]) => void 
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relationship: "" });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const newContactObj = {
        id: contacts.length + 1,
        name: newContact.name,
        phone: newContact.phone,
        relationship: newContact.relationship || "Other",
        priority: contacts.length + 1
      };
      setContacts([...contacts, newContactObj]);
      setNewContact({ name: "", phone: "", relationship: "" });
      setIsAdding(false);
    }
  };

  const handleRemoveContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900 truncate">Emergency Contacts</h3>
            <p className="text-slate-600 truncate">These contacts will be notified in case of emergency</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </motion.button>
        </div>
        
        {/* Add Contact Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                    className="px-4 py-3 rounded-lg border border-blue-300 bg-white outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    className="px-4 py-3 rounded-lg border border-blue-300 bg-white outline-none"
                  />
                  <select
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                    className="px-4 py-3 rounded-lg border border-blue-300 bg-white outline-none"
                  >
                    <option value="">Relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Child">Child</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setNewContact({ name: "", phone: "", relationship: "" });
                    }}
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddContact}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all"
                  >
                    Add Contact
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {contact.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-slate-900 truncate">{contact.name}</h4>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex-shrink-0">
                        {contact.relationship}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-slate-600">
                      <Phone className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{contact.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 whitespace-nowrap">
                    Priority {contact.priority}
                  </span>
                  
                  <button
                    onClick={() => handleRemoveContact(contact.id)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Emergency Instructions */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div className="min-w-0">
            <h4 className="font-bold text-amber-900 mb-2">Emergency Contact Instructions</h4>
            <ul className="space-y-2 text-amber-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Contacts are notified automatically when you trigger an emergency</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>They receive your location and emergency details via SMS</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Keep contact information updated regularly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span>Inform your contacts that they are listed as emergency contacts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Family Members Tab Component
function FamilyMembersTab({ 
  members, 
  setMembers 
}: { 
  members: any[], 
  setMembers: (members: any[]) => void 
}) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900">Family Members</h3>
            <p className="text-slate-600">Manage family health profiles under your account</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Family Member
          </motion.button>
        </div>
        
        {/* Family Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {member.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 whitespace-nowrap">
                  {member.relationship}
                </span>
              </div>
              
              <h4 className="font-bold text-slate-900 mb-2 truncate">{member.name}</h4>
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 flex-shrink-0" />
                  <span>Age: {member.age} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Last checkup: {member.lastCheckup}</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all text-sm whitespace-nowrap">
                  View Profile
                </button>
                <button className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-sm whitespace-nowrap">
                  Book Checkup
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Family Health Summary */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
        <h4 className="font-bold text-green-900 mb-4">Family Health Summary</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-white/50 border border-green-100">
            <div className="text-sm text-green-700 truncate">Family Size</div>
            <div className="text-2xl font-bold text-green-900">4</div>
          </div>
          
          <div className="p-3 rounded-lg bg-white/50 border border-green-100">
            <div className="text-sm text-green-700 truncate">Upcoming Appointments</div>
            <div className="text-2xl font-bold text-green-900">3</div>
          </div>
          
          <div className="p-3 rounded-lg bg-white/50 border border-green-100">
            <div className="text-sm text-green-700 truncate">Active Medications</div>
            <div className="text-2xl font-bold text-green-900">5</div>
          </div>
          
          <div className="p-3 rounded-lg bg-white/50 border border-green-100">
            <div className="text-sm text-green-700 truncate">Vaccinations Due</div>
            <div className="text-2xl font-bold text-green-900">2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Insurance Tab Component
function InsuranceTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900">Insurance Information</h3>
            <p className="text-slate-600">Manage your health insurance policies and coverage</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Insurance
          </motion.button>
        </div>
        
        {/* Insurance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl p-6 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
            <div className="min-w-0">
              <div className="text-sm opacity-90">Health Insurance Card</div>
              <div className="text-2xl font-bold truncate">AXA Mansard Health</div>
            </div>
            
            <div className="text-right min-w-0">
              <div className="text-sm opacity-90">Policy Number</div>
              <div className="text-xl font-bold truncate">AXM-7890-1234-5678</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm opacity-90 truncate">Policy Holder</div>
              <div className="text-lg font-bold truncate">John Doe</div>
            </div>
            
            <div>
              <div className="text-sm opacity-90 truncate">Coverage Type</div>
              <div className="text-lg font-bold truncate">Comprehensive</div>
            </div>
            
            <div>
              <div className="text-sm opacity-90 truncate">Valid Until</div>
              <div className="text-lg font-bold truncate">Dec 31, 2025</div>
            </div>
            
            <div>
              <div className="text-sm opacity-90 truncate">Dependent Coverage</div>
              <div className="text-lg font-bold truncate">Family (4 members)</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm opacity-90">Customer Service</div>
              <div className="font-bold truncate">0700-AXA-MANSARD</div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all text-sm whitespace-nowrap">
                View Details
              </button>
              <button className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-white/90 transition-all text-sm font-medium whitespace-nowrap">
                Download Card
              </button>
            </div>
          </div>
        </div>
        
        {/* Coverage Details */}
        <div className="mt-6">
          <h4 className="font-bold text-slate-900 mb-4">Coverage Details</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200">
              <div className="text-sm text-slate-600 mb-1 truncate">Hospitalization</div>
              <div className="text-lg font-bold text-slate-900 truncate">100% Covered</div>
            </div>
            
            <div className="p-4 rounded-xl border border-slate-200">
              <div className="text-sm text-slate-600 mb-1 truncate">Outpatient Care</div>
              <div className="text-lg font-bold text-slate-900 truncate">80% Covered</div>
            </div>
            
            <div className="p-4 rounded-xl border border-slate-200">
              <div className="text-sm text-slate-600 mb-1 truncate">Prescription Drugs</div>
              <div className="text-lg font-bold text-slate-900 truncate">70% Covered</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Claim History */}
      <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
        <h4 className="font-bold text-slate-900 mb-4">Recent Claims</h4>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all gap-2">
            <div className="min-w-0">
              <div className="font-medium text-slate-900 truncate">Annual Health Checkup</div>
              <div className="text-sm text-slate-600 truncate">Nov 15, 2024 • Lagos University Hospital</div>
            </div>
            
            <div className="text-right sm:text-left min-w-0">
              <div className="font-bold text-green-600">₦45,000</div>
              <div className="text-sm text-green-700">Paid by Insurance</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all gap-2">
            <div className="min-w-0">
              <div className="font-medium text-slate-900 truncate">Lab Tests Package</div>
              <div className="text-sm text-slate-600 truncate">Oct 28, 2024 • MedLab Diagnostics</div>
            </div>
            
            <div className="text-right sm:text-left min-w-0">
              <div className="font-bold text-green-600">₦28,500</div>
              <div className="text-sm text-green-700">Paid by Insurance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Security Tab Component
function SecurityTab({ 
  showPassword, 
  setShowPassword 
}: { 
  showPassword: boolean, 
  setShowPassword: (show: boolean) => void 
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Security Settings</h3>
        
        <div className="space-y-6">
          {/* Password */}
          <div className="p-4 rounded-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <Key className="w-5 h-5 text-slate-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-slate-900 truncate">Password</div>
                  <div className="text-sm text-slate-600 truncate">Last changed 3 months ago</div>
                </div>
              </div>
              
              <button className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all whitespace-nowrap">
                Change Password
              </button>
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                defaultValue="••••••••••••"
                readOnly
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 outline-none pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {/* Two-Factor Authentication */}
          <div className="p-4 rounded-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Shield className="w-5 h-5 text-slate-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-slate-900 truncate">Two-Factor Authentication</div>
                  <div className="text-sm text-slate-600 truncate">Add an extra layer of security</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 whitespace-nowrap">
                  Not Enabled
                </span>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all whitespace-nowrap">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
          
          {/* Connected Devices */}
          <div className="p-4 rounded-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <Smartphone className="w-5 h-5 text-slate-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-medium text-slate-900 truncate">Connected Devices</div>
                  <div className="text-sm text-slate-600 truncate">Manage devices with access to your account</div>
                </div>
              </div>
              
              <button className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all whitespace-nowrap">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-slate-50 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <Smartphone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 truncate">iPhone 14 Pro</div>
                    <div className="text-sm text-slate-600 truncate">Current session • Lagos, Nigeria</div>
                  </div>
                </div>
                
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 whitespace-nowrap sm:self-start">
                  Active
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg bg-slate-50 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <Globe className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 truncate">Windows PC</div>
                    <div className="text-sm text-slate-600 truncate">Last active 2 days ago</div>
                  </div>
                </div>
                
                <button className="text-sm text-red-600 hover:text-red-700 whitespace-nowrap sm:self-start">
                  Revoke Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Privacy Settings */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-blue-900 mb-2">Privacy & Data Protection</h4>
            <p className="text-blue-700 mb-4">
              Your health data is protected with end-to-end encryption. You control who can access your information.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-white/50 border border-blue-100 min-w-0">
                <div className="font-medium text-blue-900 mb-1 truncate">Data Sharing Consent</div>
                <div className="text-sm text-blue-700 truncate">You can control what data is shared with healthcare providers</div>
              </div>
              
              <div className="p-3 rounded-lg bg-white/50 border border-blue-100 min-w-0">
                <div className="font-medium text-blue-900 mb-1 truncate">Right to Access</div>
                <div className="text-sm text-blue-700 truncate">Download all your health data at any time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}