// app/hospital/patients/page.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Users, Search, Filter, Download, UserPlus, Mail, Phone,
  Calendar, MapPin, Smartphone, User, Clock, MoreVertical,
  ChevronDown, ChevronUp, X, Edit, Trash2, Eye, FileText,
  Activity, Heart, Droplets, Thermometer, AlertCircle,
  Upload, FileUp, Shield, Plus, CheckCircle, XCircle
} from "lucide-react";

// Patient type definition
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  doctor: string;
  medicalInfo?: {
    bloodPressure?: string;
    bloodSugar?: string;
    temperature?: string;
    heartRate?: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// Modal for adding/editing patients
function PatientModal({ 
  isOpen, 
  onClose, 
  mode = 'add',
  patient 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  mode?: 'add' | 'edit';
  patient?: Patient | null;
}) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [labResults, setLabResults] = useState<File[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<string[]>(['']);
  const [allergies, setAllergies] = useState<string[]>(['']);

  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    
    // Medical Information
    bloodGroup: '',
    bloodPressure: '',
    bloodSugar: '',
    temperature: '',
    heartRate: '',
    weight: '',
    height: '',
    allergies: [] as string[],
    currentMedications: '',
    pastSurgeries: '',
    chronicConditions: '',
    familyHistory: '',
    
    // Insurance
    insuranceProvider: '',
    insurancePolicyNumber: '',
    insuranceExpiry: '',
    
    // Hospital Info
    department: '',
    primaryDoctor: '',
    patientNotes: ''
  });

  useEffect(() => {
    if (mode === 'edit' && patient) {
      // Populate form with patient data
      setFormData({
        firstName: patient.name.split(' ')[0],
        lastName: patient.name.split(' ').slice(1).join(' '),
        gender: patient.gender,
        dateOfBirth: '',
        phone: patient.phone,
        email: patient.email || '',
        address: '',
        emergencyContactName: patient.emergencyContact?.name || '',
        emergencyContactPhone: patient.emergencyContact?.phone || '',
        emergencyContactRelationship: patient.emergencyContact?.relationship || '',
        bloodGroup: patient.bloodGroup,
        bloodPressure: patient.medicalInfo?.bloodPressure || '',
        bloodSugar: patient.medicalInfo?.bloodSugar || '',
        temperature: patient.medicalInfo?.temperature || '',
        heartRate: patient.medicalInfo?.heartRate || '',
        weight: '',
        height: '',
        allergies: [],
        currentMedications: '',
        pastSurgeries: '',
        chronicConditions: '',
        familyHistory: '',
        insuranceProvider: '',
        insurancePolicyNumber: '',
        insuranceExpiry: '',
        department: patient.department,
        primaryDoctor: patient.doctor,
        patientNotes: ''
      });
    }
  }, [mode, patient]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setLabResults(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setLabResults(prev => prev.filter((_, i) => i !== index));
  };

  const addMedicalHistoryField = () => {
    setMedicalHistory(prev => [...prev, '']);
  };

  const updateMedicalHistory = (index: number, value: string) => {
    setMedicalHistory(prev => prev.map((item, i) => i === index ? value : item));
  };

  const removeMedicalHistory = (index: number) => {
    setMedicalHistory(prev => prev.filter((_, i) => i !== index));
  };

  const addAllergyField = () => {
    setAllergies(prev => [...prev, '']);
  };

  const updateAllergy = (index: number, value: string) => {
    setAllergies(prev => prev.map((item, i) => i === index ? value : item));
  };

  const removeAllergy = (index: number) => {
    setAllergies(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        address: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
        bloodGroup: '',
        bloodPressure: '',
        bloodSugar: '',
        temperature: '',
        heartRate: '',
        weight: '',
        height: '',
        allergies: [],
        currentMedications: '',
        pastSurgeries: '',
        chronicConditions: '',
        familyHistory: '',
        insuranceProvider: '',
        insurancePolicyNumber: '',
        insuranceExpiry: '',
        department: '',
        primaryDoctor: '',
        patientNotes: ''
      });
      setStep(1);
    }, 2000);
  };

  const validateStep1 = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.gender.trim() &&
      formData.dateOfBirth.trim() &&
      formData.phone.trim()
    );
  };

  const validateStep2 = () => {
    return (
      formData.bloodGroup.trim() &&
      formData.department.trim() &&
      formData.primaryDoctor.trim()
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-teal-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <UserPlus className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">
                          {mode === 'add' ? 'Register New Patient' : 'Edit Patient'}
                        </h2>
                        <p className="text-white/80 text-sm">
                          {mode === 'add' 
                            ? 'Add a new patient to the hospital system' 
                            : 'Update patient information'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Steps */}
                  <div className="flex items-center justify-between mt-6">
                    {[1, 2, 3].map((stepNum) => (
                      <div key={stepNum} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= stepNum 
                            ? 'bg-white text-blue-600' 
                            : 'bg-white/20 text-white'
                        } font-bold`}>
                          {stepNum}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">
                            {stepNum === 1 && 'Basic Info'}
                            {stepNum === 2 && 'Medical Info'}
                            {stepNum === 3 && 'Review'}
                          </div>
                          <div className="text-xs opacity-80">
                            {stepNum === 1 && 'Personal details'}
                            {stepNum === 2 && 'Health information'}
                            {stepNum === 3 && 'Final review'}
                          </div>
                        </div>
                        {stepNum < 3 && (
                          <div className={`w-12 h-0.5 mx-4 ${
                            step > stepNum ? 'bg-white' : 'bg-white/20'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto">
                  <div className="p-6 space-y-6">
                    {/* Step 1: Basic Information */}
                    {step === 1 && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="John"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              placeholder="Doe"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Gender *
                            </label>
                            <select
                              value={formData.gender}
                              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              required
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Date of Birth *
                            </label>
                            <input
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Blood Group
                            </label>
                            <select
                              value={formData.bloodGroup}
                              onChange={(e) => setFormData(prev => ({ ...prev, bloodGroup: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            >
                              <option value="">Select</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Phone Number *
                            </label>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <Phone className="w-5 h-5 text-slate-400" />
                              </div>
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                placeholder="+234 800 000 0000"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <Mail className="w-5 h-5 text-slate-400" />
                              </div>
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                placeholder="patient@example.com"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Address
                          </label>
                          <textarea
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                            placeholder="Full residential address"
                            rows={2}
                          />
                        </div>

                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Emergency Contact
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                              type="text"
                              value={formData.emergencyContactName}
                              onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                              className="px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                              placeholder="Contact Name"
                            />
                            <input
                              type="tel"
                              value={formData.emergencyContactPhone}
                              onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactPhone: e.target.value }))}
                              className="px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                              placeholder="Phone Number"
                            />
                            <input
                              type="text"
                              value={formData.emergencyContactRelationship}
                              onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactRelationship: e.target.value }))}
                              className="px-4 py-2 rounded-lg border border-blue-200 focus:border-blue-500 outline-none"
                              placeholder="Relationship"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 2: Medical Information */}
                    {step === 2 && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Vitals Section */}
                          <div className="space-y-4">
                            <h4 className="font-bold text-slate-900 flex items-center gap-2">
                              <Activity className="w-5 h-5 text-blue-600" />
                              Vital Signs
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm text-slate-600 mb-1">Blood Pressure</label>
                                <input
                                  type="text"
                                  value={formData.bloodPressure}
                                  onChange={(e) => setFormData(prev => ({ ...prev, bloodPressure: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                                  placeholder="120/80"
                                />
                              </div>

                              <div>
                                <label className="block text-sm text-slate-600 mb-1">Blood Sugar</label>
                                <input
                                  type="text"
                                  value={formData.bloodSugar}
                                  onChange={(e) => setFormData(prev => ({ ...prev, bloodSugar: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                                  placeholder="96 mg/dL"
                                />
                              </div>

                              <div>
                                <label className="block text-sm text-slate-600 mb-1">Temperature</label>
                                <input
                                  type="text"
                                  value={formData.temperature}
                                  onChange={(e) => setFormData(prev => ({ ...prev, temperature: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                                  placeholder="36.5°C"
                                />
                              </div>

                              <div>
                                <label className="block text-sm text-slate-600 mb-1">Heart Rate</label>
                                <input
                                  type="text"
                                  value={formData.heartRate}
                                  onChange={(e) => setFormData(prev => ({ ...prev, heartRate: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                                  placeholder="72 BPM"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm text-slate-600 mb-1">Weight (kg)</label>
                                <input
                                  type="text"
                                  value={formData.weight}
                                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                                  placeholder="70"
                                />
                              </div>

                              <div>
                                <label className="block text-sm text-slate-600 mb-1">Height (cm)</label>
                                <input
                                  type="text"
                                  value={formData.height}
                                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                                  placeholder="175"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Department & Doctor */}
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Department *
                              </label>
                              <select
                                value={formData.department}
                                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                required
                              >
                                <option value="">Select Department</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Pediatrics">Pediatrics</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Neurology">Neurology</option>
                                <option value="General Medicine">General Medicine</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Primary Doctor *
                              </label>
                              <select
                                value={formData.primaryDoctor}
                                onChange={(e) => setFormData(prev => ({ ...prev, primaryDoctor: e.target.value }))}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                required
                              >
                                <option value="">Select Doctor</option>
                                <option value="Dr. Adebola">Dr. Adebola</option>
                                <option value="Dr. Chioma">Dr. Chioma</option>
                                <option value="Dr. Ahmed">Dr. Ahmed</option>
                                <option value="Dr. Fatima">Dr. Fatima</option>
                              </select>
                            </div>

                            {/* Allergies */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-700">
                                  Allergies
                                </label>
                                <button
                                  type="button"
                                  onClick={addAllergyField}
                                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add Allergy
                                </button>
                              </div>
                              <div className="space-y-2">
                                {allergies.map((allergy, index) => (
                                  <div key={index} className="flex gap-2">
                                    <input
                                      type="text"
                                      value={allergy}
                                      onChange={(e) => updateAllergy(index, e.target.value)}
                                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                                      placeholder="e.g., Penicillin, Peanuts"
                                    />
                                    {allergies.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => removeAllergy(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Medical History */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-slate-900">Medical History</h4>
                            <button
                              type="button"
                              onClick={addMedicalHistoryField}
                              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              <Plus className="w-4 h-4" />
                              Add Condition
                            </button>
                          </div>
                          <div className="space-y-2">
                            {medicalHistory.map((condition, index) => (
                              <div key={index} className="flex gap-2">
                                <input
                                  type="text"
                                  value={condition}
                                  onChange={(e) => updateMedicalHistory(index, e.target.value)}
                                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                  placeholder="e.g., Hypertension (2020), Diabetes Type 2 (2018)"
                                />
                                {medicalHistory.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeMedicalHistory(index)}
                                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                                  >
                                    <X className="w-5 h-5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Current Medications & Past Surgeries */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Current Medications
                            </label>
                            <textarea
                              value={formData.currentMedications}
                              onChange={(e) => setFormData(prev => ({ ...prev, currentMedications: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                              placeholder="List current medications with dosages"
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Past Surgeries
                            </label>
                            <textarea
                              value={formData.pastSurgeries}
                              onChange={(e) => setFormData(prev => ({ ...prev, pastSurgeries: e.target.value }))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                              placeholder="List previous surgeries with dates"
                              rows={3}
                            />
                          </div>
                        </div>

                        {/* Lab Results Upload */}
                        <div className="p-4 rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/50">
                          <div className="text-center">
                            <Upload className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                            <h4 className="font-bold text-slate-900 mb-2">Upload Lab Results</h4>
                            <p className="text-sm text-slate-600 mb-4">
                              Upload any recent lab reports, test results, or medical documents
                            </p>
                            <label className="cursor-pointer">
                              <input
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors">
                                <FileUp className="w-5 h-5" />
                                Choose Files
                              </div>
                            </label>
                            <p className="text-xs text-slate-500 mt-2">
                              PDF, JPG, PNG, DOC up to 10MB each
                            </p>
                          </div>

                          {/* Uploaded files */}
                          {labResults.length > 0 && (
                            <div className="mt-4">
                              <div className="text-sm font-medium text-slate-700 mb-2">
                                Uploaded Files ({labResults.length})
                              </div>
                              <div className="space-y-2">
                                {labResults.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-3">
                                      <FileText className="w-5 h-5 text-blue-500" />
                                      <div>
                                        <div className="font-medium text-sm">{file.name}</div>
                                        <div className="text-xs text-slate-500">
                                          {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFile(index)}
                                      className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                            <div>
                              <h4 className="font-bold text-green-800">Ready to Register</h4>
                              <p className="text-sm text-green-700">
                                Review all information before submitting. This patient will be added to the hospital system.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Patient Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h5 className="font-bold text-slate-900">Personal Information</h5>
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-slate-500">Full Name</div>
                                <div className="font-medium">{formData.firstName} {formData.lastName}</div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-sm text-slate-500">Gender</div>
                                  <div className="font-medium">{formData.gender}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-slate-500">Blood Group</div>
                                  <div className="font-medium">{formData.bloodGroup || 'Not specified'}</div>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-slate-500">Contact</div>
                                <div className="font-medium">{formData.phone}</div>
                                {formData.email && (
                                  <div className="text-sm text-slate-600">{formData.email}</div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h5 className="font-bold text-slate-900">Medical Information</h5>
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-slate-500">Department</div>
                                <div className="font-medium">{formData.department}</div>
                              </div>
                              <div>
                                <div className="text-sm text-slate-500">Primary Doctor</div>
                                <div className="font-medium">{formData.primaryDoctor}</div>
                              </div>
                              <div>
                                <div className="text-sm text-slate-500">Vital Signs</div>
                                <div className="flex flex-wrap gap-2">
                                  {formData.bloodPressure && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                      BP: {formData.bloodPressure}
                                    </span>
                                  )}
                                  {formData.bloodSugar && (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                      Sugar: {formData.bloodSugar}
                                    </span>
                                  )}
                                  {formData.temperature && (
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                                      Temp: {formData.temperature}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Uploaded Files */}
                        {labResults.length > 0 && (
                          <div>
                            <h5 className="font-bold text-slate-900 mb-3">Lab Results to Upload</h5>
                            <div className="flex flex-wrap gap-2">
                              {labResults.map((file, index) => (
                                <div key={index} className="px-3 py-2 bg-slate-100 rounded-lg text-sm">
                                  <FileText className="inline w-4 h-4 mr-2" />
                                  {file.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Final Notes */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Additional Notes (Optional)
                          </label>
                          <textarea
                            value={formData.patientNotes}
                            onChange={(e) => setFormData(prev => ({ ...prev, patientNotes: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                            placeholder="Any additional information about the patient..."
                            rows={3}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Buttons */}
                  <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6">
                    <div className="flex justify-between">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          className="px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-medium hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                          Back
                        </button>
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (step === 1 && validateStep1()) setStep(2);
                            if (step === 2 && validateStep2()) setStep(3);
                          }}
                          disabled={(step === 1 && !validateStep1()) || (step === 2 && !validateStep2())}
                          className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            (step === 1 && validateStep1()) || (step === 2 && validateStep2())
                              ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:shadow-lg'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {step === 1 ? 'Continue to Medical Info' : 'Review & Submit'}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Registering Patient...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              {mode === 'add' ? 'Register Patient' : 'Update Patient'}
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Patient Card Component
function PatientCard({ 
  patient, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  patient: Patient; 
  onView: () => void; 
  onEdit: () => void; 
  onDelete: () => void; 
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-slate-100 text-slate-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male': return '♂';
      case 'female': return '♀';
      default: return '⚧';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 h-full"
    >
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {patient.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{patient.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>{patient.age} years</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="text-lg">{getGenderIcon(patient.gender)}</span>
                  {patient.gender}
                </span>
                <span>•</span>
                <span>{patient.bloodGroup}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-10">
                <button
                  onClick={() => {
                    onView();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 text-slate-700 rounded-t-xl"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={() => {
                    onEdit();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 text-slate-700"
                >
                  <Edit className="w-4 h-4" />
                  Edit Patient
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    setShowActions(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-50 text-red-600 rounded-b-xl"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Patient
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="truncate">{patient.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Last: {patient.lastVisit}</span>
          </div>
        </div>

        {/* Status and Department */}
        <div className="flex items-center justify-between mt-auto">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </span>
          <span className="text-sm text-slate-600">{patient.department}</span>
        </div>

        {/* Toggle Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          {showDetails ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Details
            </>
          )}
        </button>

        {/* Expanded Details */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-slate-100 space-y-3"
          >
            <div>
              <div className="text-xs text-slate-500 mb-1">Assigned Doctor</div>
              <div className="font-medium">{patient.doctor}</div>
            </div>
            
            <div>
              <div className="text-xs text-slate-500 mb-1">Next Appointment</div>
              <div className="font-medium text-blue-600">{patient.nextAppointment}</div>
            </div>

            {patient.medicalInfo && (
              <div className="grid grid-cols-2 gap-2">
                {patient.medicalInfo.bloodPressure && (
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{patient.medicalInfo.bloodPressure}</span>
                  </div>
                )}
                {patient.medicalInfo.bloodSugar && (
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">{patient.medicalInfo.bloodSugar}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Doe',
      age: 35,
      gender: 'Male',
      bloodGroup: 'O+',
      phone: '+234 801 234 5678',
      email: 'john.doe@example.com',
      lastVisit: 'Nov 15, 2024',
      nextAppointment: 'Nov 30, 2024',
      status: 'active',
      department: 'Cardiology',
      doctor: 'Dr. Adebola',
      medicalInfo: {
        bloodPressure: '120/80',
        bloodSugar: '96 mg/dL',
        temperature: '36.5°C',
        heartRate: '72 BPM'
      },
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+234 802 345 6789',
        relationship: 'Spouse'
      }
    },
    {
      id: '2',
      name: 'Amina Yusuf',
      age: 28,
      gender: 'Female',
      bloodGroup: 'B+',
      phone: '+234 803 456 7890',
      email: 'amina.yusuf@example.com',
      lastVisit: 'Nov 18, 2024',
      nextAppointment: 'Dec 5, 2024',
      status: 'active',
      department: 'Pediatrics',
      doctor: 'Dr. Chioma',
      medicalInfo: {
        bloodPressure: '110/70',
        bloodSugar: '88 mg/dL',
        temperature: '36.8°C',
        heartRate: '68 BPM'
      }
    },
    {
      id: '3',
      name: 'Chinedu Okoro',
      age: 45,
      gender: 'Male',
      bloodGroup: 'A+',
      phone: '+234 804 567 8901',
      email: 'chinedu.okoro@example.com',
      lastVisit: 'Nov 10, 2024',
      nextAppointment: 'Nov 25, 2024',
      status: 'pending',
      department: 'Dermatology',
      doctor: 'Dr. Ahmed',
      medicalInfo: {
        bloodPressure: '130/85',
        bloodSugar: '102 mg/dL',
        temperature: '37.1°C',
        heartRate: '76 BPM'
      }
    },
    {
      id: '4',
      name: 'Fatima Bello',
      age: 52,
      gender: 'Female',
      bloodGroup: 'AB+',
      phone: '+234 805 678 9012',
      email: 'fatima.bello@example.com',
      lastVisit: 'Oct 28, 2024',
      nextAppointment: 'Dec 10, 2024',
      status: 'inactive',
      department: 'Cardiology',
      doctor: 'Dr. Adebola',
      medicalInfo: {
        bloodPressure: '125/80',
        bloodSugar: '95 mg/dL',
        temperature: '36.7°C',
        heartRate: '74 BPM'
      }
    },
    {
      id: '5',
      name: 'David Brown',
      age: 31,
      gender: 'Male',
      bloodGroup: 'O-',
      phone: '+234 806 789 0123',
      email: 'david.brown@example.com',
      lastVisit: 'Nov 20, 2024',
      nextAppointment: 'Dec 15, 2024',
      status: 'active',
      department: 'Orthopedics',
      doctor: 'Dr. Fatima',
      medicalInfo: {
        bloodPressure: '115/75',
        bloodSugar: '92 mg/dL',
        temperature: '36.6°C',
        heartRate: '70 BPM'
      }
    },
    {
      id: '6',
      name: 'Sarah Johnson',
      age: 29,
      gender: 'Female',
      bloodGroup: 'A-',
      phone: '+234 807 890 1234',
      email: 'sarah.johnson@example.com',
      lastVisit: 'Nov 5, 2024',
      nextAppointment: 'Nov 28, 2024',
      status: 'active',
      department: 'Neurology',
      doctor: 'Dr. Ahmed',
      medicalInfo: {
        bloodPressure: '118/78',
        bloodSugar: '94 mg/dL',
        temperature: '36.9°C',
        heartRate: '71 BPM'
      }
    }
  ]);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.phone.includes(searchQuery) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || patient.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleExport = () => {
    // In production, this would generate and download a CSV/Excel file
    const csvContent = patients.map(p => 
      `${p.name},${p.age},${p.gender},${p.bloodGroup},${p.phone},${p.email},${p.department},${p.status}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patients-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleViewPatient = (patient: Patient) => {
    console.log('View patient:', patient);
    // In production: navigate to patient details page
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeletePatient = (patient: Patient) => {
    if (confirm(`Are you sure you want to delete ${patient.name}?`)) {
      setPatients(prev => prev.filter(p => p.id !== patient.id));
    }
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Patients</h1>
          <p className="text-slate-600 mt-1">
            Manage all registered patients in the hospital
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition-all"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Export List</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button
            onClick={handleAddPatient}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all"
          >
            <UserPlus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Patient</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-2xl font-bold text-slate-900">{patients.length}</div>
          <div className="text-sm text-slate-600">Total Patients</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-2xl font-bold text-green-600">
            {patients.filter(p => p.status === 'active').length}
          </div>
          <div className="text-sm text-slate-600">Active</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-2xl font-bold text-blue-600">
            {patients.filter(p => p.department === 'Cardiology').length}
          </div>
          <div className="text-sm text-slate-600">Cardiology</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-2xl font-bold text-teal-600">
            {patients.filter(p => p.nextAppointment !== 'No appointment').length}
          </div>
          <div className="text-sm text-slate-600">Upcoming</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search patients by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
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
              <option value="Dermatology">Dermatology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
              <option value="General Medicine">General Medicine</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Showing <span className="font-medium text-slate-900">{filteredPatients.length}</span> of{' '}
          <span className="font-medium text-slate-900">{patients.length}</span> patients
        </div>
        <button
          onClick={() => {
            setSearchQuery('');
            setStatusFilter('all');
            setDepartmentFilter('all');
          }}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear filters
        </button>
      </div>

      {/* Patients Grid - FIXED VERSION */}
      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="min-h-[280px]">
              <PatientCard
                patient={patient}
                onView={() => handleViewPatient(patient)}
                onEdit={() => handleEditPatient(patient)}
                onDelete={() => handleDeletePatient(patient)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No patients found</h3>
          <p className="text-slate-600 mb-6">
            {searchQuery 
              ? `No patients match "${searchQuery}"`
              : 'Try adjusting your filters or add a new patient'}
          </p>
          <button
            onClick={handleAddPatient}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:shadow-lg transition-all"
          >
            <UserPlus className="w-5 h-5" />
            Add First Patient
          </button>
        </div>
      )}

      {/* Add/Edit Patient Modal */}
      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        patient={selectedPatient}
      />
    </div>
  );
}