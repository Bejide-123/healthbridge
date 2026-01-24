// app/hospital/appointments/book/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Search, Users, UserPlus, Calendar,
  Clock, Stethoscope, DollarSign, CheckCircle,
  X, ChevronRight, AlertCircle, FileText,
  CreditCard, Coins, Smartphone, Wallet,
  Phone, Mail, MapPin, Heart
} from "lucide-react";

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pay_at_hospital");
  const [paymentAmount, setPaymentAmount] = useState("");

  // Mock data
  const patients = [
    { id: 1, name: "John Doe", phone: "+234 801 234 5678", lastVisit: "Nov 15, 2024", age: 35, bloodGroup: "O+" },
    { id: 2, name: "Amina Yusuf", phone: "+234 802 345 6789", lastVisit: "Nov 18, 2024", age: 28, bloodGroup: "B+" },
    { id: 3, name: "Chinedu Okoro", phone: "+234 803 456 7890", lastVisit: "Nov 10, 2024", age: 45, bloodGroup: "A+" },
  ];

  const doctors = [
    { id: 1, name: "Dr. Adebola", department: "Cardiology", fee: "₦5,000" },
    { id: 2, name: "Dr. Chioma", department: "Pediatrics", fee: "₦4,500" },
    { id: 3, name: "Dr. Ahmed", department: "Dermatology", fee: "₦4,000" },
    { id: 4, name: "Dr. Fatima", department: "Gynecology", fee: "₦6,000" },
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const handleSubmit = () => {
    const appointment = {
      patient: selectedPatient,
      reason,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      payment: {
        method: paymentMethod,
        amount: paymentAmount || "₦0"
      }
    };
    console.log('Booking appointment:', appointment);
    alert('Appointment booked successfully!');
    // Redirect to appointments list
  };

  // New patient form state
  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    address: "",
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/hospital-dashboard/appointments"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Appointments
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Book Appointment</h1>
          <p className="text-slate-600 mt-1">Book appointments for walk-in or phone patients</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= stepNum 
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white' 
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {step > stepNum ? <CheckCircle className="w-5 h-5" /> : stepNum}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">
                  {stepNum === 1 && 'Select Patient'}
                  {stepNum === 2 && 'Appointment Details'}
                  {stepNum === 3 && 'Schedule'}
                  {stepNum === 4 && 'Payment'}
                </div>
                <div className="text-xs text-slate-500">
                  {stepNum === 1 && 'Find or register patient'}
                  {stepNum === 2 && 'Reason & doctor'}
                  {stepNum === 3 && 'Date & time'}
                  {stepNum === 4 && 'Payment method'}
                </div>
              </div>
              {stepNum < 4 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  step > stepNum ? 'bg-blue-500' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="border-t border-slate-200 pt-6">
          {/* Step 1: Select Patient */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Search existing patients */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Find Existing Patient</h3>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or phone number..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-3">
                  {patients
                    .filter(p => 
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.phone.includes(searchQuery)
                    )
                    .map(patient => (
                      <button
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${
                          selectedPatient?.id === patient.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <span className="text-white font-bold">
                              {patient.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900">{patient.name}</div>
                            <div className="text-sm text-slate-600">{patient.phone}</div>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-slate-500">{patient.age} years</span>
                              <span className="text-xs text-slate-500">{patient.bloodGroup}</span>
                            </div>
                          </div>
                          {selectedPatient?.id === patient.id && (
                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                </div>

                {searchQuery && patients.filter(p => 
                  p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.phone.includes(searchQuery)
                ).length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No patients found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>

              {/* Or register new patient */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Register New Patient</h3>
                  <button
                    onClick={() => setShowNewPatientForm(!showNewPatientForm)}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <UserPlus className="w-4 h-4" />
                    {showNewPatientForm ? 'Cancel' : 'New Patient'}
                  </button>
                </div>

                <AnimatePresence>
                  {showNewPatientForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              value={newPatient.firstName}
                              onChange={(e) => setNewPatient(prev => ({ ...prev, firstName: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              value={newPatient.lastName}
                              onChange={(e) => setNewPatient(prev => ({ ...prev, lastName: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                              placeholder="Doe"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              value={newPatient.phone}
                              onChange={(e) => setNewPatient(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                              placeholder="+234 800 000 0000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Gender
                            </label>
                            <select
                              value={newPatient.gender}
                              onChange={(e) => setNewPatient(prev => ({ ...prev, gender: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => {
                              // Register patient logic
                              setSelectedPatient({
                                name: `${newPatient.firstName} ${newPatient.lastName}`,
                                phone: newPatient.phone,
                                age: '',
                                bloodGroup: newPatient.bloodGroup
                              });
                              setShowNewPatientForm(false);
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                          >
                            Register & Select
                          </button>
                          <Link
                            href="/hospital/patients/add"
                            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                          >
                            Full Registration
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Step 2: Appointment Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Appointment Details</h3>
                
                {/* Selected Patient Info */}
                {selectedPatient && (
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {selectedPatient.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{selectedPatient.name}</div>
                        <div className="text-sm text-slate-600">{selectedPatient.phone}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reason for Visit */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Reason for Visit *
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Describe symptoms or reason for appointment..."
                    className="w-full h-32 p-4 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                  />
                </div>

                {/* Select Doctor */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Assign Doctor *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctors.map(doc => (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDoctor(doc.name)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedDoctor === doc.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <Stethoscope className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900">{doc.name}</div>
                            <div className="text-sm text-slate-600">{doc.department}</div>
                          </div>
                          <div className="font-bold text-slate-900">{doc.fee}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6">Select Date & Time</h3>
                
                {/* Date Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Select Date *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                    {['Today', 'Tomorrow', 'Nov 28', 'Nov 29', 'Nov 30', 'Dec 1', 'Dec 2'].map(date => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-lg border text-center ${
                          selectedDate === date
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-medium">{date}</div>
                        <div className="text-xs text-slate-500 mt-1">Available</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Select Time Slot *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`p-3 rounded-lg border text-center ${
                          selectedTime === slot
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6">Payment Method</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => setPaymentMethod('pay_at_hospital')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      paymentMethod === 'pay_at_hospital'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-900">Pay at Hospital</div>
                        <div className="text-sm text-slate-600">Patient will pay when they arrive</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('pay_now_cash')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      paymentMethod === 'pay_now_cash'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-900">Pay Now (Cash)</div>
                        <div className="text-sm text-slate-600">Record cash payment now</div>
                      </div>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'pay_now_cash' && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Payment Amount
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Appointment Summary */}
                <div className="mt-8 p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-3">Appointment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Patient:</span>
                      <span className="font-medium">{selectedPatient?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Doctor:</span>
                      <span className="font-medium">{selectedDoctor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Date & Time:</span>
                      <span className="font-medium">{selectedDate}, {selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Payment:</span>
                      <span className="font-medium capitalize">{paymentMethod.replace(/_/g, ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:border-slate-400"
            >
              Back
            </button>
          ) : (
            <Link
              href="/hospital/appointments"
              className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:border-slate-400"
            >
              Cancel
            </Link>
          )}

          <button
            onClick={() => {
              if (step < 4) {
                // Validate current step
                if (step === 1 && !selectedPatient) {
                  alert('Please select a patient');
                  return;
                }
                if (step === 2 && (!reason || !selectedDoctor)) {
                  alert('Please fill in reason and select doctor');
                  return;
                }
                if (step === 3 && (!selectedDate || !selectedTime)) {
                  alert('Please select date and time');
                  return;
                }
                setStep(step + 1);
              } else {
                handleSubmit();
              }
            }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            {step < 4 ? (
              <>
                Continue
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Confirm Booking
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}