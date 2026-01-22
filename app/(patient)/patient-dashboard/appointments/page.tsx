// app/patients-dashboard/appointments/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar, Clock, CheckCircle, AlertCircle,
  ChevronRight, Search, Filter, Plus,
  User, Stethoscope, MapPin, Star,
  Bell, MessageSquare, Video, Phone,
  X, ChevronLeft, ChevronDown, MoreVertical,
  FileText, Download, Printer, Share2,
  Heart, Activity, Thermometer, Pill
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Appointment Card Component
function AppointmentCard({ 
  appointment,
  onViewQueue,
  onViewDetails
}: { 
  appointment: any;
  onViewQueue: () => void;
  onViewDetails: () => void;
}) {
  const router = useRouter();
  
  const statusColors = {
    confirmed: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
    completed: "bg-blue-100 text-blue-700 border-blue-200"
  };

  const statusIcons = {
    confirmed: CheckCircle,
    pending: Clock,
    cancelled: X,
    completed: CheckCircle
  };

  const StatusIcon = statusIcons[appointment.status as keyof typeof statusIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Appointment header */}
      <div className="p-4 sm:p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3 sm:gap-4 w-full">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              {appointment.status === "confirmed" && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">{appointment.time}</h3>
                <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${statusColors[appointment.status as keyof typeof statusColors]}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span className="capitalize truncate">{appointment.status}</span>
                </span>
              </div>
              
              {/* Doctor info - responsive layout */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base truncate">{appointment.doctor}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-slate-600">
                  <Stethoscope className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-sm truncate">{appointment.department}</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{appointment.location}</span>
                </div>
              </div>

              {/* Mobile only - department and location */}
              <div className="sm:hidden mt-2 space-y-1">
                <div className="flex items-center gap-2 text-slate-600">
                  <Stethoscope className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="text-sm truncate">{appointment.department}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                  <span className="text-sm truncate">{appointment.location}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${i < appointment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                    />
                  ))}
                  <span className="text-xs sm:text-sm text-slate-500 ml-1 truncate">({appointment.rating}.0)</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-500 truncate">
                  {appointment.type} • {appointment.duration}
                </div>
              </div>
            </div>
          </div>
          
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors self-end sm:self-center flex-shrink-0">
            <MoreVertical className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
      
      {/* Appointment actions - Responsive layout */}
      <div className="p-3 sm:p-4 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-3">
            {appointment.status === "confirmed" && (
              <motion.button
                onClick={() => router.push('/patient-dashboard/appointments/queue')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition-all flex items-center gap-2 justify-center text-sm sm:text-base flex-1"
              >
                <Activity className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Check Live Queue</span>
              </motion.button>
            )}
            
            <motion.button
              onClick={onViewDetails}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2.5 rounded-lg border border-slate-300 font-medium hover:bg-white transition-all flex items-center gap-2 justify-center text-sm sm:text-base ${
                appointment.status !== "confirmed" ? "w-full" : "flex-1"
              }`}
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">View Details</span>
            </motion.button>
          </div>
          
          {appointment.status === "confirmed" && (
            <div className="flex sm:flex-col md:flex-row gap-2 justify-center">
              <button className="p-2.5 rounded-lg border border-slate-300 hover:bg-white transition-colors flex items-center justify-center flex-1 sm:flex-none">
                <MessageSquare className="w-4 h-4 text-slate-600" />
              </button>
              <button className="p-2.5 rounded-lg border border-slate-300 hover:bg-white transition-colors flex items-center justify-center flex-1 sm:flex-none">
                <Video className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Booking Modal Component
function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<string>("consultation");
  const [reason, setReason] = useState("");
  
  const doctors = [
    { id: 1, name: "Dr. Adebola Johnson", department: "Cardiology", rating: 4.5, experience: "15 years", availability: "Today", image: "AJ" },
    { id: 2, name: "Dr. Chioma Okoro", department: "Pediatrics", rating: 5.0, experience: "12 years", availability: "Tomorrow", image: "CO" },
    { id: 3, name: "Dr. Ahmed Hassan", department: "Dermatology", rating: 4.8, experience: "8 years", availability: "Mon-Fri", image: "AH" },
    { id: 4, name: "Dr. Fatima Bello", department: "Gynecology", rating: 4.7, experience: "10 years", availability: "Weekdays", image: "FB" },
  ];
  
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];
  
  const appointmentTypes = [
    { id: "consultation", label: "Consultation", icon: User, color: "from-blue-500 to-cyan-500" },
    { id: "followup", label: "Follow-up", icon: Calendar, color: "from-teal-500 to-emerald-500" },
    { id: "checkup", label: "Check-up", icon: Activity, color: "from-purple-500 to-violet-500" },
    { id: "emergency", label: "Emergency", icon: AlertCircle, color: "from-red-500 to-rose-500" },
  ];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log({ selectedDoctor, selectedDate, selectedTime, appointmentType, reason });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-2xl">
              {/* Modal header */}
              <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">Book Appointment</h2>
                    <p className="text-slate-600 mt-1 text-sm sm:text-base truncate">Schedule your consultation in a few steps</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                
                {/* Progress steps - responsive */}
                <div className="flex items-center justify-between mt-4 sm:mt-6">
                  <div className="flex items-center flex-1 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((stepNum) => (
                      <div key={stepNum} className="flex items-center flex-shrink-0">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-medium text-xs sm:text-sm ${
                          step === stepNum 
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" 
                            : step > stepNum 
                            ? "bg-green-500 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {step > stepNum ? <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" /> : stepNum}
                        </div>
                        {stepNum < 5 && (
                          <div className={`w-6 sm:w-8 h-1 mx-1 sm:mx-2 ${
                            step > stepNum ? "bg-green-500" : "bg-slate-200"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="ml-2 sm:ml-4 text-sm font-medium text-slate-600 whitespace-nowrap flex-shrink-0">
                    Step {step} of 5
                  </div>
                </div>
              </div>
              
              {/* Modal content */}
              <div className="overflow-y-auto p-4 sm:p-6" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                {/* Step 1: Select Doctor */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Select Doctor</h3>
                      <div className="relative mb-6">
                        <input
                          type="search"
                          placeholder="Search doctors by name or specialty..."
                          className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm sm:text-base"
                        />
                        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {doctors.map((doctor) => (
                          <motion.button
                            key={doctor.id}
                            onClick={() => setSelectedDoctor(doctor.id)}
                            whileHover={{ y: -2 }}
                            className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                              selectedDoctor === doctor.id
                                ? "border-blue-500 bg-blue-50/50"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                                {doctor.image}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-slate-900 text-sm sm:text-base truncate">{doctor.name}</div>
                                <div className="text-xs sm:text-sm text-slate-600 mt-1 truncate">{doctor.department}</div>
                                <div className="flex items-center gap-2 sm:gap-4 mt-2 flex-wrap">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs sm:text-sm font-medium">{doctor.rating}</span>
                                  </div>
                                  <div className="text-xs sm:text-sm text-slate-500 truncate">{doctor.experience} exp</div>
                                </div>
                              </div>
                            </div>
                            <div className={`mt-2 sm:mt-3 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium w-fit ${
                              doctor.availability === "Today"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}>
                              Available {doctor.availability}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Select Date & Time</h3>
                      
                      {/* Date selection */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4">
                          {["Today", "Tomorrow", "Nov 28", "Nov 29", "Nov 30", "Dec 1", "Dec 2"].map((date, index) => (
                            <button
                              key={date}
                              onClick={() => setSelectedDate(date)}
                              className={`px-3 py-2 sm:px-4 sm:py-3 rounded-xl whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
                                selectedDate === date
                                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              <div className="font-medium">{date}</div>
                              {index < 2 && (
                                <div className="text-xs mt-1 opacity-80">Available</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Time slots */}
                      <div>
                        <div className="text-sm font-medium text-slate-600 mb-3">Available Time Slots</div>
                        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-2 sm:p-3 rounded-lg border transition-all text-sm sm:text-base ${
                                selectedTime === time
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className="font-medium truncate">{time}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 3: Appointment Type */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Appointment Type</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                        {appointmentTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.id}
                              onClick={() => setAppointmentType(type.id)}
                              className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                                appointmentType === type.id
                                  ? `border-blue-500 bg-gradient-to-br ${type.color} bg-opacity-10`
                                  : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-2 sm:mb-3 mx-auto`}>
                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <div className="font-bold text-slate-900 text-sm sm:text-base text-center truncate">{type.label}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 4: Reason for Appointment */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Reason for Appointment</h3>
                      <p className="text-slate-600 mb-4 text-sm sm:text-base">
                        Please describe your symptoms or reason for visit. This helps your doctor prepare for your consultation.
                      </p>
                      
                      <div className="space-y-4">
                        <textarea
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Example: I've been experiencing headaches for the past 3 days, accompanied by dizziness. I have no known allergies. I'm taking painkillers but they're not helping..."
                          className="w-full h-32 sm:h-48 p-3 sm:p-4 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none text-sm sm:text-base"
                        />
                        
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 sm:p-4">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="font-medium text-blue-900 mb-1 text-sm sm:text-base truncate">Helpful Information to Include:</div>
                              <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                                <li className="truncate">• Duration and frequency of symptoms</li>
                                <li className="truncate">• Any medications you're currently taking</li>
                                <li className="truncate">• Known allergies or medical conditions</li>
                                <li className="truncate">• Previous treatments you've tried</li>
                                <li className="truncate">• Specific questions for the doctor</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 5: Review & Confirm */}
                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Review & Confirm</h3>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <div className="text-sm font-medium text-slate-600 mb-3">Appointment Details</div>
                            <div className="space-y-3 sm:space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 text-sm sm:text-base truncate">Dr. Adebola Johnson</div>
                                  <div className="text-xs sm:text-sm text-slate-600 truncate">Cardiology</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 text-sm sm:text-base">Today, 2:30 PM</div>
                                  <div className="text-xs sm:text-sm text-slate-600">Estimated duration: 30 minutes</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 text-sm sm:text-base">Consultation</div>
                                  <div className="text-xs sm:text-sm text-slate-600">Initial visit</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-slate-600 mb-3">Reason for Visit</div>
                            <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200">
                              <p className="text-slate-700 text-sm sm:text-base line-clamp-4">
                                {reason || "No reason provided. Please add details to help your doctor prepare."}
                              </p>
                            </div>
                            
                            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-slate-600 text-sm sm:text-base truncate">Consultation Fee</div>
                                <div className="font-bold text-slate-900">₦5,000</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-slate-600 text-sm sm:text-base truncate">Service Charge</div>
                                <div className="font-bold text-slate-900">₦500</div>
                              </div>
                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-300">
                                <div className="font-bold text-slate-900 text-sm sm:text-base truncate">Total Amount</div>
                                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                                  ₦5,500
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Modal footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={step === 1 ? onClose : handleBack}
                    className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {step === 1 ? "Cancel" : "Back"}
                  </button>
                  
                  <button
                    onClick={step === 5 ? handleSubmit : handleNext}
                    disabled={(step === 1 && !selectedDoctor) || (step === 4 && !reason)}
                    className="px-6 py-2 sm:px-8 sm:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    {step === 5 ? (
                      <>
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span className="truncate">Confirm Booking - ₦5,500</span>
                      </>
                    ) : (
                      <>
                        <span className="truncate">Next Step</span>
                        <ChevronRight className="w-4 h-4 flex-shrink-0" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const appointments = {
    upcoming: [
      {
        id: 1,
        time: "Today, 2:30 PM",
        doctor: "Dr. Adebola Johnson",
        department: "Cardiology",
        location: "Main Hospital",
        status: "confirmed",
        rating: 4.5,
        type: "Consultation",
        duration: "30 minutes",
        reason: "Follow-up on heart condition"
      },
      {
        id: 2,
        time: "Tomorrow, 10:00 AM",
        doctor: "Dr. Chioma Okoro",
        department: "Pediatrics",
        location: "Children's Wing",
        status: "pending",
        rating: 5.0,
        type: "Check-up",
        duration: "45 minutes",
        reason: "Annual pediatric check-up"
      },
      {
        id: 3,
        time: "Nov 28, 11:00 AM",
        doctor: "Dr. Ahmed Hassan",
        department: "Dermatology",
        location: "Skin Clinic",
        status: "confirmed",
        rating: 4.8,
        type: "Consultation",
        duration: "20 minutes",
        reason: "Skin allergy consultation"
      },
    ],
    past: [
      {
        id: 4,
        time: "Nov 15, 3:00 PM",
        doctor: "Dr. Fatima Bello",
        department: "Gynecology",
        location: "Women's Health Center",
        status: "completed",
        rating: 4.7,
        type: "Follow-up",
        duration: "30 minutes",
        reason: "Post-treatment check"
      },
    ],
    cancelled: [
      {
        id: 5,
        time: "Nov 10, 9:30 AM",
        doctor: "Dr. Emmanuel Ade",
        department: "Orthopedics",
        location: "Sports Medicine",
        status: "cancelled",
        rating: 4.6,
        type: "Consultation",
        duration: "45 minutes",
        reason: "Knee injury consultation"
      },
    ]
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your medical appointments and consultations</p>
        </div>
        
        <motion.button
          onClick={() => setShowBookingModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="truncate">Book New Appointment</span>
        </motion.button>
      </div>

      {/* Stats & Filters */}
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{appointments.upcoming.length}</div>
              <div className="text-xs sm:text-sm text-slate-600 truncate">Upcoming</div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 border border-green-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{appointments.past.length}</div>
              <div className="text-xs sm:text-sm text-slate-600 truncate">Completed</div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-4 sm:p-6 border border-red-100">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-slate-900">{appointments.cancelled.length}</div>
              <div className="text-xs sm:text-sm text-slate-600 truncate">Cancelled</div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0">
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - responsive */}
      <div className="border-b border-slate-200 overflow-x-auto">
        <div className="flex space-x-4 sm:space-x-8 min-w-max">
          {[
            { id: "upcoming", label: "Upcoming", count: appointments.upcoming.length },
            { id: "past", label: "Past", count: appointments.past.length },
            { id: "cancelled", label: "Cancelled", count: appointments.cancelled.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4 sm:space-y-6">
        {appointments[activeTab as keyof typeof appointments].map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onViewQueue={() => {}}
            onViewDetails={() => {}}
          />
        ))}
        
        {appointments[activeTab as keyof typeof appointments].length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-1 sm:mb-2">No appointments found</h3>
            <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base">You don't have any {activeTab} appointments</p>
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Book Your First Appointment
            </button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={showBookingModal} 
        onClose={() => setShowBookingModal(false)} 
      />
    </div>
  );
}