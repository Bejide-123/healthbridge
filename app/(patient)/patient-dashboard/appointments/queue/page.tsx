// app/patients-dashboard/appointments/queue/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Clock, User, Activity,
  Bell, MessageSquare, Video, Phone,
  MapPin, Navigation, Share2, Download,
  RefreshCw, AlertCircle, CheckCircle,
  Users, TrendingDown, Zap, Battery,
  Thermometer, Heart, Droplets, Stethoscope
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function QueuePage() {
  const params = useParams();
  const router = useRouter();
  const [queuePosition, setQueuePosition] = useState(3);
  const [waitTime, setWaitTime] = useState(45);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasJoinedWaitingRoom, setHasJoinedWaitingRoom] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Simulate queue movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (queuePosition > 1) {
        setQueuePosition(prev => {
          const newPos = prev - 0.1;
          return Math.max(1, Math.round(newPos * 10) / 10);
        });
        
        if (waitTime > 5) {
          setWaitTime(prev => Math.max(5, prev - 0.5));
        }
      }
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [queuePosition, waitTime]);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Simulate queue update
      if (queuePosition > 1) {
        setQueuePosition(prev => Math.max(1, prev - 0.5));
        setWaitTime(prev => Math.max(5, prev - 10));
      }
    }, 1000);
  };
  
  const handleJoinWaitingRoom = () => {
    setHasJoinedWaitingRoom(true);
    // In real app, this would connect to WebSocket/socket.io
  };
  
  const handleGetDirections = () => {
    // Open maps with hospital location
    window.open("https://maps.google.com/?q=Lagos+University+Teaching+Hospital", "_blank");
  };
  
  const handleShareQueue = () => {
    navigator.share?.({
      title: "My Hospital Queue Status",
      text: `I'm #${queuePosition} in queue for Dr. Adebola. Estimated wait: ${waitTime} minutes.`,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    });
  };
  
  // Mock queue data
  const queueData = {
    appointmentId: params.id || "123",
    doctor: {
      name: "Dr. Adebola Johnson",
      department: "Cardiology",
      status: "In Consultation",
      currentPatient: "Patient #HB234566",
      startTime: "2:15 PM",
      estimatedPerPatient: 15, // minutes
    },
    queue: [
      { position: 1, patientId: "HB234565", waitTime: 5 },
      { position: 2, patientId: "HB234564", waitTime: 20 },
      { position: 3, patientId: "HB234567", waitTime: 45 }, // Current user
      { position: 4, patientId: "HB234568", waitTime: 60 },
      { position: 5, patientId: "HB234569", waitTime: 75 },
    ],
    appointmentDetails: {
      time: "Today, 2:30 PM",
      type: "Consultation",
      reason: "Follow-up on heart condition",
      location: "Cardiology Wing, Floor 3, Room 302",
      hospital: "Lagos University Teaching Hospital",
    },
    metrics: {
      averageWaitTime: 35,
      patientsSeenToday: 24,
      satisfactionRate: 94,
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="flex items-center justify-between p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">Live Queue</h1>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Stethoscope className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{queueData.doctor.name} • {queueData.doctor.department}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 flex-shrink-0"
            >
              <RefreshCw className={`w-5 h-5 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleShareQueue}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
            >
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Queue Status */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Main Queue Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/50 shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6">
                  <div className="min-w-0">
                    <div className="text-sm font-medium opacity-90">Your Queue Position</div>
                    <div className="text-4xl sm:text-5xl font-bold mt-2 truncate">
                      {queuePosition.toFixed(queuePosition % 1 === 0 ? 0 : 1)}
                    </div>
                  </div>
                  <div className="min-w-0 text-right">
                    <div className="text-sm font-medium opacity-90">Estimated Wait Time</div>
                    <div className="text-2xl sm:text-3xl font-bold mt-2 truncate">{waitTime} min</div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="relative h-2 sm:h-3 bg-white/30 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((queueData.queue.length - queuePosition + 1) / queueData.queue.length) * 100}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              
              {/* Queue Info */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Current Consultation */}
                <div className="mb-6 sm:mb-8 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-sm sm:text-base truncate">Currently Consulting</div>
                      <div className="text-xs sm:text-sm text-slate-600 truncate">{queueData.doctor.currentPatient}</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <Activity className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">Started: {queueData.doctor.startTime}</span>
                    </div>
                    <div className="text-slate-500 truncate">
                      ~{queueData.doctor.estimatedPerPatient} min per patient
                    </div>
                  </div>
                </div>
                
                {/* Queue List */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">Patients Ahead of You</h3>
                    <span className="text-xs sm:text-sm text-slate-500">{queueData.queue.length - 1} patients</span>
                  </div>
                  
                  {queueData.queue.slice(0, -1).map((patient, index) => (
                    <motion.div
                      key={patient.patientId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all ${
                        patient.position === Math.floor(queuePosition)
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm sm:text-base ${
                          patient.position === Math.floor(queuePosition)
                            ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {patient.position}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 text-sm sm:text-base truncate">{patient.patientId}</div>
                          <div className="text-xs sm:text-sm text-slate-500 truncate">
                            ~{patient.waitTime} minutes wait
                          </div>
                        </div>
                      </div>
                      {patient.position === 1 && (
                        <div className="px-2 sm:px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium flex-shrink-0 ml-2">
                          Next
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Actions */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={handleJoinWaitingRoom}
                      disabled={hasJoinedWaitingRoom}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 sm:gap-3 ${
                        hasJoinedWaitingRoom
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                    >
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base truncate">
                        {hasJoinedWaitingRoom ? "Joined Waiting Room" : "Join Virtual Waiting Room"}
                      </span>
                    </button>
                    
                    <button
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 sm:gap-3 ${
                        notificationsEnabled
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Bell className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base truncate">
                        {notificationsEnabled ? "Notifications ON" : "Notifications OFF"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Appointment Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/50 shadow-xl p-4 sm:p-6 md:p-8"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Appointment Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-600 text-xs sm:text-sm">Scheduled Time</div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base truncate">{queueData.appointmentDetails.time}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-600 text-xs sm:text-sm">Appointment Type</div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base truncate">{queueData.appointmentDetails.type}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-600 text-xs sm:text-sm">Reason for Visit</div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base truncate">{queueData.appointmentDetails.reason}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-600 text-xs sm:text-sm">Location</div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base truncate">{queueData.appointmentDetails.location}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                <button
                  onClick={handleGetDirections}
                  className="w-full p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 hover:border-blue-200 transition-all flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-blue-700 text-sm sm:text-base truncate">Get Directions to Hospital</span>
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Stats & Actions */}
          <div className="space-y-6 sm:space-y-8">
            {/* Queue Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/50 shadow-xl p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6">Queue Statistics</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-slate-600 truncate">Avg. Wait Time</div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{queueData.metrics.averageWaitTime} min</div>
                    </div>
                  </div>
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-green-50/50">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-slate-600 truncate">Patients Seen Today</div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{queueData.metrics.patientsSeenToday}</div>
                    </div>
                  </div>
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/50">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-slate-600 truncate">Satisfaction Rate</div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base">{queueData.metrics.satisfactionRate}%</div>
                    </div>
                  </div>
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                <div className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3">Doctor's Schedule</div>
                <div className="space-y-2">
                  {["9:00 AM - 1:00 PM", "2:00 PM - 6:00 PM"].map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="text-xs sm:text-sm text-slate-700 truncate">{slot}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
                        Available
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/50 shadow-xl p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6">Quick Actions</h3>
              
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full p-2 sm:p-3 rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center gap-2 sm:gap-3">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-slate-700 text-sm sm:text-base truncate">Message Doctor</span>
                </button>
                
                <button className="w-full p-2 sm:p-3 rounded-xl border border-slate-200 hover:border-green-200 hover:bg-green-50 transition-all flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium text-slate-700 text-sm sm:text-base truncate">Call Reception</span>
                </button>
                
                <button className="w-full p-2 sm:p-3 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 transition-all flex items-center gap-2 sm:gap-3">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                  <span className="font-medium text-slate-700 text-sm sm:text-base truncate">Cancel Appointment</span>
                </button>
                
                <button className="w-full p-2 sm:p-3 rounded-xl border border-slate-200 hover:border-purple-200 hover:bg-purple-50 transition-all flex items-center gap-2 sm:gap-3">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                  <span className="font-medium text-slate-700 text-sm sm:text-base truncate">Download Queue Info</span>
                </button>
              </div>
              
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                <div className="text-xs sm:text-sm text-slate-600 mb-2 truncate">Estimated Time Remaining</div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 sm:mb-2">{waitTime} minutes</div>
                <div className="text-xs sm:text-sm text-slate-500">
                  Based on average consultation time of {queueData.doctor.estimatedPerPatient} minutes
                </div>
              </div>
            </motion.div>
            
            {/* Health Tips While Waiting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl sm:rounded-3xl border border-blue-100 p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">While You Wait</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Check Your Vitals</div>
                    <div className="text-xs sm:text-sm text-slate-600">Take your BP & heart rate if possible</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Stay Hydrated</div>
                    <div className="text-xs sm:text-sm text-slate-600">Drink water while waiting</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 sm:gap-3">
                  <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 text-sm sm:text-base truncate">Prepare Questions</div>
                    <div className="text-xs sm:text-sm text-slate-600">List down your concerns for the doctor</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-200">
                <div className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-2">Queue Last Updated</div>
                <div className="font-medium text-slate-900 text-sm sm:text-base">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}