// app/patients-dashboard/prescriptions/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Pill, FileText, Calendar, Clock, 
  CheckCircle, AlertCircle, ChevronRight, 
  Search, Filter, Plus, User, Stethoscope, 
  Download, Printer, Share2, Eye, 
  X, ChevronLeft, ChevronDown, MoreVertical,
  Heart, Activity, Thermometer, Bell,
  MessageSquare, Video, Phone, MapPin,
  ShoppingCart, Clock3, RefreshCw, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Prescription Card Component
function PrescriptionCard({ 
  prescription,
  onViewDetails,
  onOrderRefill
}: { 
  prescription: any;
  onViewDetails: () => void;
  onOrderRefill: () => void;
}) {
  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    expired: "bg-red-100 text-red-700 border-red-200",
    completed: "bg-blue-100 text-blue-700 border-blue-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200"
  };

  const statusIcons = {
    active: CheckCircle,
    expired: X,
    completed: CheckCircle,
    pending: Clock
  };

  const StatusIcon = statusIcons[prescription.status as keyof typeof statusIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Prescription header */}
      <div className="p-4 md:p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3 md:gap-4 w-full">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                <Pill className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              {prescription.refills > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-[8px] md:text-xs font-bold text-white">{prescription.refills}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h3 className="text-base md:text-lg font-bold text-slate-900 truncate">{prescription.medication}</h3>
                <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${statusColors[prescription.status as keyof typeof statusColors]}`}>
                  <StatusIcon className="w-3 h-3" />
                  {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                </span>
              </div>
              
              {/* Doctor info - responsive layout */}
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <User className="w-3 h-3 md:w-4 md:h-4 text-slate-400 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base truncate">{prescription.doctor}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-slate-600">
                  <Stethoscope className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{prescription.specialty}</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Prescribed: {prescription.date}</span>
                </div>
              </div>

              {/* Mobile only - specialty and date */}
              <div className="sm:hidden mt-2 space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Stethoscope className="w-3 h-3 text-slate-400" />
                  <span className="text-sm">{prescription.specialty}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span className="text-sm">Prescribed: {prescription.date}</span>
                </div>
              </div>
              
              {/* Dosage and refill info */}
              <div className="mt-3 flex flex-wrap gap-3 md:gap-4">
                <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                  <div className="text-xs text-slate-500">Dosage</div>
                  <div className="font-medium text-sm">{prescription.dosage}</div>
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                  <div className="text-xs text-slate-500">Frequency</div>
                  <div className="font-medium text-sm">{prescription.frequency}</div>
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                  <div className="text-xs text-slate-500">Refills</div>
                  <div className="font-medium text-sm">{prescription.refills} left</div>
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                  <div className="text-xs text-slate-500">Duration</div>
                  <div className="font-medium text-sm">{prescription.duration}</div>
                </div>
              </div>
            </div>
          </div>
          
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors self-start sm:self-center">
            <MoreVertical className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>
      
      {/* Prescription actions - Responsive layout */}
      <div className="p-3 md:p-4 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={onViewDetails}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg transition-all flex items-center gap-2 justify-center text-sm sm:text-base"
            >
              <Eye className="w-4 h-4" />
              <span className="truncate">View Details</span>
            </motion.button>
            
            {prescription.status === "active" && prescription.refills > 0 && (
              <motion.button
                onClick={onOrderRefill}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-100 transition-all flex items-center gap-2 justify-center text-sm sm:text-base"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="truncate">Order Refill</span>
              </motion.button>
            )}
          </div>
          
          <div className="flex justify-center gap-2">
            <button className="p-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center">
              <Download className="w-4 h-4 text-slate-600" />
            </button>
            <button className="p-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center">
              <Printer className="w-4 h-4 text-slate-600" />
            </button>
            <button className="p-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center">
              <Share2 className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Medication Detail Modal
function MedicationDetailModal({ 
  isOpen, 
  onClose,
  prescription 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  prescription: any;
}) {
  const [activeTab, setActiveTab] = useState("details");

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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* Modal header */}
              <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                      <Pill className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-slate-900">{prescription.medication}</h2>
                      <p className="text-slate-600 text-sm md:text-base">{prescription.genericName}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                
                {/* Tabs */}
                <div className="mt-4 md:mt-6 border-b border-slate-200">
                  <div className="flex space-x-4 md:space-x-8">
                    {[
                      { id: "details", label: "Details" },
                      { id: "instructions", label: "Instructions" },
                      { id: "sideeffects", label: "Side Effects" },
                      { id: "pharmacy", label: "Pharmacy Info" }
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
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Modal content */}
              <div className="overflow-y-auto p-4 md:p-6" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-slate-600 mb-2">Prescription Information</h4>
                          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Status</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${prescription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Date Prescribed</span>
                              <span className="font-medium">{prescription.date}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Expiry Date</span>
                              <span className="font-medium">{prescription.expiryDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Refills Remaining</span>
                              <span className="font-medium">{prescription.refills}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-slate-600 mb-2">Doctor Information</h4>
                          <div className="bg-blue-50/50 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{prescription.doctor}</div>
                                <div className="text-sm text-slate-600">{prescription.specialty}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-slate-600 mb-2">Dosage & Frequency</h4>
                          <div className="bg-emerald-50/50 rounded-xl p-4 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Strength</span>
                              <span className="font-medium">{prescription.strength}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Dosage</span>
                              <span className="font-medium">{prescription.dosage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Frequency</span>
                              <span className="font-medium">{prescription.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Duration</span>
                              <span className="font-medium">{prescription.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Route</span>
                              <span className="font-medium">{prescription.route}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-slate-600 mb-2">Quantity & Refills</h4>
                          <div className="bg-amber-50/50 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-2xl font-bold text-slate-900">{prescription.quantity}</div>
                                <div className="text-sm text-slate-600">Total quantity</div>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-emerald-600">{prescription.refills}</div>
                                <div className="text-sm text-slate-600">Refills left</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-blue-900 mb-1">Important Notes</div>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Take with food if stomach upset occurs</li>
                            <li>• Avoid alcohol while taking this medication</li>
                            <li>• Store at room temperature away from moisture</li>
                            <li>• Complete the full course even if symptoms improve</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "instructions" && (
                  <div className="space-y-6">
                    <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
                      <h4 className="text-lg font-bold text-slate-900 mb-4">Medication Instructions</h4>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 border border-emerald-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                              <Clock3 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">When to Take</div>
                              <div className="text-sm text-slate-600">Timing is important for effectiveness</div>
                            </div>
                          </div>
                          <ul className="space-y-2 text-slate-700">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                              <span>Take {prescription.frequency.toLowerCase()} as prescribed</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                              <span>Take with a full glass of water</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                              <span>Take at the same time each day for best results</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white rounded-xl p-4 border border-blue-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                              <AlertCircle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">Important Precautions</div>
                              <div className="text-sm text-slate-600">Safety information</div>
                            </div>
                          </div>
                          <ul className="space-y-2 text-slate-700">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                              <span>Do not stop taking this medication without consulting your doctor</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                              <span>Avoid driving if you feel dizzy after taking this medication</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                              <span>Inform your doctor if you experience severe side effects</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Modal footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 md:px-6 md:py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <X className="w-4 h-4" />
                    Close
                  </button>
                  
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button className="px-4 py-2 md:px-6 md:py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                    {prescription.status === "active" && prescription.refills > 0 && (
                      <button className="px-4 py-2 md:px-6 md:py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none">
                        <ShoppingCart className="w-4 h-4" />
                        Order Refill
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Refill Order Modal
function RefillOrderModal({ 
  isOpen, 
  onClose,
  prescription 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  prescription: any;
}) {
  const [pharmacy, setPharmacy] = useState("main");
  const [delivery, setDelivery] = useState("pickup");
  const [payment, setPayment] = useState("card");

  const pharmacies = [
    { id: "main", name: "Main Hospital Pharmacy", distance: "In-hospital", delivery: "Same day" },
    { id: "city", name: "City Care Pharmacy", distance: "1.2 miles", delivery: "2-3 hours" },
    { id: "wellness", name: "Wellness Pharmacy", distance: "2.5 miles", delivery: "4-6 hours" },
  ];

  const handleSubmit = () => {
    // Handle refill order
    console.log({ pharmacy, delivery, payment });
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* Modal header */}
              <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">Order Medication Refill</h2>
                    <p className="text-slate-600 mt-1 text-sm md:text-base">Refill your prescription and choose delivery options</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
              
              {/* Modal content */}
              <div className="overflow-y-auto p-4 md:p-6" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                <div className="space-y-6">
                  {/* Medication summary */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-900 text-lg md:text-xl">{prescription.medication}</div>
                        <div className="text-slate-600 text-sm md:text-base">{prescription.genericName}</div>
                        <div className="flex flex-wrap gap-3 mt-3">
                          <div className="bg-white/50 rounded-lg px-3 py-1.5">
                            <div className="text-xs text-slate-500">Strength</div>
                            <div className="font-medium text-sm">{prescription.strength}</div>
                          </div>
                          <div className="bg-white/50 rounded-lg px-3 py-1.5">
                            <div className="text-xs text-slate-500">Quantity</div>
                            <div className="font-medium text-sm">{prescription.quantity}</div>
                          </div>
                          <div className="bg-white/50 rounded-lg px-3 py-1.5">
                            <div className="text-xs text-slate-500">Refill</div>
                            <div className="font-medium text-sm">#{prescription.refills} of 3</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pharmacy selection */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Select Pharmacy</h3>
                    <div className="space-y-3">
                      {pharmacies.map((pharm) => (
                        <button
                          key={pharm.id}
                          onClick={() => setPharmacy(pharm.id)}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                            pharmacy === pharm.id
                              ? "border-emerald-500 bg-emerald-50/50"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-slate-900">{pharm.name}</div>
                              <div className="text-sm text-slate-600 mt-1">
                                {pharm.distance} • {pharm.delivery} delivery
                              </div>
                            </div>
                            {pharmacy === pharm.id && (
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Delivery options */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Delivery Method</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button
                        onClick={() => setDelivery("pickup")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          delivery === "pickup"
                            ? "border-blue-500 bg-blue-50/50"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">In-Pharmacy Pickup</div>
                            <div className="text-sm text-slate-600">Pick up today • Free</div>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => setDelivery("delivery")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          delivery === "delivery"
                            ? "border-blue-500 bg-blue-50/50"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">Home Delivery</div>
                            <div className="text-sm text-slate-600">2-3 hours • ₦500</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Order summary */}
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-bold text-slate-900 mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Medication cost</span>
                        <span className="font-medium">₦8,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Service fee</span>
                        <span className="font-medium">₦500</span>
                      </div>
                      {delivery === "delivery" && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Delivery fee</span>
                          <span className="font-medium">₦500</span>
                        </div>
                      )}
                      <div className="border-t border-slate-300 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-slate-900">Total</span>
                          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            {delivery === "delivery" ? "₦9,500" : "₦9,000"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 md:px-6 md:py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 md:px-8 md:py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium hover:from-emerald-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Place Order • {delivery === "delivery" ? "₦9,500" : "₦9,000"}</span>
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

export default function PrescriptionsPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  
  const prescriptions = {
    active: [
      {
        id: 1,
        medication: "Amoxicillin 500mg",
        genericName: "Amoxicillin Trihydrate",
        doctor: "Dr. Adebola Johnson",
        specialty: "Cardiology",
        date: "Nov 15, 2024",
        expiryDate: "Dec 15, 2024",
        status: "active",
        dosage: "1 tablet",
        frequency: "Every 8 hours",
        duration: "10 days",
        strength: "500mg",
        route: "Oral",
        quantity: "30 tablets",
        refills: 2,
        notes: "Take with food"
      },
      {
        id: 2,
        medication: "Lisinopril 10mg",
        genericName: "Lisinopril Dihydrate",
        doctor: "Dr. Chioma Okoro",
        specialty: "General Medicine",
        date: "Nov 10, 2024",
        expiryDate: "May 10, 2025",
        status: "active",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "30 days",
        strength: "10mg",
        route: "Oral",
        quantity: "30 tablets",
        refills: 3,
        notes: "Take in the morning"
      },
      {
        id: 3,
        medication: "Metformin 850mg",
        genericName: "Metformin Hydrochloride",
        doctor: "Dr. Ahmed Hassan",
        specialty: "Endocrinology",
        date: "Oct 28, 2024",
        expiryDate: "Jan 28, 2025",
        status: "active",
        dosage: "1 tablet",
        frequency: "Twice daily",
        duration: "30 days",
        strength: "850mg",
        route: "Oral",
        quantity: "60 tablets",
        refills: 1,
        notes: "Take with meals"
      },
    ],
    expired: [
      {
        id: 4,
        medication: "Ibuprofen 400mg",
        genericName: "Ibuprofen",
        doctor: "Dr. Fatima Bello",
        specialty: "Orthopedics",
        date: "Aug 15, 2024",
        expiryDate: "Sep 15, 2024",
        status: "expired",
        dosage: "1 tablet",
        frequency: "As needed",
        duration: "30 days",
        strength: "400mg",
        route: "Oral",
        quantity: "20 tablets",
        refills: 0,
        notes: "Take for pain relief"
      },
    ],
    completed: [
      {
        id: 5,
        medication: "Azithromycin 250mg",
        genericName: "Azithromycin Dihydrate",
        doctor: "Dr. Emmanuel Ade",
        specialty: "Pulmonology",
        date: "Sep 5, 2024",
        expiryDate: "Oct 5, 2024",
        status: "completed",
        dosage: "2 tablets",
        frequency: "Once daily",
        duration: "5 days",
        strength: "250mg",
        route: "Oral",
        quantity: "10 tablets",
        refills: 0,
        notes: "Complete full course"
      },
    ]
  };

  const handleViewDetails = (prescription: any) => {
    setSelectedPrescription(prescription);
    setShowDetailModal(true);
  };

  const handleOrderRefill = (prescription: any) => {
    setSelectedPrescription(prescription);
    setShowRefillModal(true);
  };

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Prescriptions</h1>
          <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">Manage your medications and refill requests</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export All</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white font-medium hover:from-purple-700 hover:to-violet-600 hover:shadow-lg transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Request New</span>
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-4 md:p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">{prescriptions.active.length}</div>
              <div className="text-xs md:text-sm text-slate-600">Active</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
              <Pill className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">3</div>
              <div className="text-xs md:text-sm text-slate-600">Refills Available</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">{prescriptions.completed.length}</div>
              <div className="text-xs md:text-sm text-slate-600">Completed</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-4 md:p-6 border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">{prescriptions.expired.length}</div>
              <div className="text-xs md:text-sm text-slate-600">Expired</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Search medications or doctors..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm md:text-base"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
        </div>
        <button className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 overflow-x-auto">
        <div className="flex space-x-4 md:space-x-8 min-w-max">
          {[
            { id: "active", label: "Active", count: prescriptions.active.length },
            { id: "completed", label: "Completed", count: prescriptions.completed.length },
            { id: "expired", label: "Expired", count: prescriptions.expired.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? "bg-purple-100 text-purple-600"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4 md:space-y-6">
        {prescriptions[activeTab as keyof typeof prescriptions].map((prescription) => (
          <PrescriptionCard
            key={prescription.id}
            prescription={prescription}
            onViewDetails={() => handleViewDetails(prescription)}
            onOrderRefill={() => handleOrderRefill(prescription)}
          />
        ))}
        
        {prescriptions[activeTab as keyof typeof prescriptions].length === 0 && (
          <div className="text-center py-8 md:py-12">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Pill className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
            </div>
            <h3 className="text-base md:text-lg font-medium text-slate-900 mb-1 md:mb-2">No prescriptions found</h3>
            <p className="text-slate-600 mb-4 md:mb-6 text-sm md:text-base">You don't have any {activeTab} prescriptions</p>
            <button
              onClick={() => {}}
              className="px-4 py-2.5 md:px-6 md:py-3 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 text-white font-medium hover:from-purple-600 hover:to-violet-600 hover:shadow-lg transition-all text-sm md:text-base"
            >
              Request New Prescription
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedPrescription && (
        <>
          <MedicationDetailModal
            isOpen={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            prescription={selectedPrescription}
          />
          
          <RefillOrderModal
            isOpen={showRefillModal}
            onClose={() => setShowRefillModal(false)}
            prescription={selectedPrescription}
          />
        </>
      )}
    </div>
  );
}