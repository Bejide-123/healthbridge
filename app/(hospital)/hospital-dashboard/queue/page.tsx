// app/hospital/queue/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Clock, UserCheck, PlayCircle, PauseCircle,
  SkipForward, MoreVertical, ArrowUpDown, Filter,
  Search, Bell, MessageSquare, Phone, Eye, Edit,
  Trash2, Maximize2, Minimize2, Volume2, AlertCircle,
  Stethoscope, User, Calendar, ChevronRight, X
} from "lucide-react";

// Queue Card Component
function QueueCard({ patient, position, onCall, onMessage, onRemove }: {
  patient: any;
  position: number;
  onCall: () => void;
  onMessage: () => void;
  onRemove: () => void;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Left side - Patient info */}
          <div className="flex items-center gap-3">
            {/* Queue position */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                position === 1
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white'
                  : position === 2
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                  : position === 3
                  ? 'bg-gradient-to-br from-purple-500 to-violet-500 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {position}
              </div>
              <div className="text-xs text-slate-500 mt-1">Position</div>
            </div>

            {/* Patient details */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900">{patient.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  patient.priority === 'emergency'
                    ? 'bg-red-100 text-red-700'
                    : patient.priority === 'urgent'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {patient.priority}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Dr. {patient.doctor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Waiting: {patient.waitTime}</span>
                </div>
              </div>
              
              <div className="mt-2">
                <p className="text-sm text-slate-500 line-clamp-1">
                  <span className="font-medium">Reason:</span> {patient.reason}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            {/* Call button */}
            {position === 1 && (
              <button
                onClick={onCall}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-lg hover:shadow-sm transition-all flex items-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Call Now
              </button>
            )}

            {/* More actions menu */}
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
                      onMessage();
                      setShowActions(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 hover:bg-slate-50 text-slate-700 rounded-t-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Message
                  </button>
                  <button
                    onClick={() => {
                      setShowActions(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 hover:bg-slate-50 text-slate-700"
                  >
                    <Phone className="w-4 h-4" />
                    Call Patient
                  </button>
                  <button
                    onClick={() => {
                      onRemove();
                      setShowActions(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-3 hover:bg-red-50 text-red-600 rounded-b-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove from Queue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
          <button className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors">
            View Patient File
          </button>
          <button className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors">
            Add Notes
          </button>
          {position > 1 && (
            <button
              onClick={onCall}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded-lg hover:shadow-sm transition-all"
            >
              Call Next (Skip)
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Current Patient Display
function CurrentPatient({ patient, onComplete, onNext }: {
  patient: any;
  onComplete: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-blue-600 mb-2 flex items-center gap-2">
            <Bell className="w-4 h-4 animate-pulse" />
            NOW SERVING
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{patient.name}</h3>
          <div className="flex items-center gap-4 mt-2 text-slate-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Dr. {patient.doctor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              <span>{patient.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Started: {patient.startTime}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <UserCheck className="w-5 h-5" />
            Complete Consultation
          </button>
          <button
            onClick={onNext}
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2"
          >
            <SkipForward className="w-5 h-5" />
            Call Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Queue Display (Fullscreen mode)
function QueueDisplay({ isFullscreen, onToggleFullscreen, currentPatient, queue }: {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  currentPatient: any;
  queue: any[];
}) {
  if (!isFullscreen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 to-slate-800 text-white"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">HEALTHBRIDGE HOSPITAL</h1>
          <p className="text-2xl text-slate-300 mt-2">Patient Queue Display</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
          <button
            onClick={onToggleFullscreen}
            className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Minimize2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-screen flex flex-col items-center justify-center p-8">
        {/* Current Patient */}
        {currentPatient && (
          <div className="text-center mb-12">
            <div className="text-5xl font-bold text-green-400 mb-4">NOW SERVING</div>
            <div className="text-7xl font-bold mb-4">{currentPatient.name}</div>
            <div className="text-4xl text-slate-300 mb-2">
              Dr. {currentPatient.doctor} • {currentPatient.department}
            </div>
            <div className="text-2xl text-slate-400">Room {currentPatient.room}</div>
          </div>
        )}

        {/* Waiting Queue */}
        <div className="w-full max-w-6xl">
          <div className="text-3xl font-bold text-center mb-8 text-slate-300">
            WAITING PATIENTS
          </div>
          <div className="grid grid-cols-3 gap-6">
            {queue.slice(0, 6).map((patient, index) => (
              <div
                key={patient.id}
                className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className={`text-3xl font-bold ${
                    index === 0 ? 'text-green-400' :
                    index === 1 ? 'text-blue-400' :
                    index === 2 ? 'text-purple-400' : 'text-slate-400'
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{patient.name}</div>
                    <div className="text-xl text-slate-300">Dr. {patient.doctor}</div>
                    <div className="text-lg text-slate-400">{patient.department}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10">
        <div className="flex justify-between items-center">
          <div className="text-slate-400">
            Total Waiting: {queue.length} patients • Last updated: {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-4">
            <Volume2 className="w-6 h-6 text-slate-400" />
            <div className="text-2xl font-bold text-green-400">
              PLEASE PROCEED TO RECEPTION FOR ASSISTANCE
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function QueuePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([
    {
      id: 1,
      name: "John Doe",
      doctor: "Adebola",
      department: "Cardiology",
      reason: "Chest pain consultation",
      waitTime: "15 min",
      checkInTime: "9:00 AM",
      priority: "normal",
      room: "3"
    },
    {
      id: 2,
      name: "Amina Yusuf",
      doctor: "Chioma",
      department: "Pediatrics",
      reason: "Child's vaccination",
      waitTime: "22 min",
      checkInTime: "9:15 AM",
      priority: "normal",
      room: "5"
    },
    {
      id: 3,
      name: "Chinedu Okoro",
      doctor: "Ahmed",
      department: "Dermatology",
      reason: "Skin allergy",
      waitTime: "35 min",
      checkInTime: "9:30 AM",
      priority: "urgent",
      room: "2"
    },
    {
      id: 4,
      name: "Fatima Bello",
      doctor: "Fatima",
      department: "Gynecology",
      reason: "Prenatal checkup",
      waitTime: "45 min",
      checkInTime: "9:45 AM",
      priority: "normal",
      room: "4"
    },
    {
      id: 5,
      name: "David Brown",
      doctor: "Adebola",
      department: "Cardiology",
      reason: "Blood pressure follow-up",
      waitTime: "52 min",
      checkInTime: "10:00 AM",
      priority: "normal",
      room: "3"
    },
    {
      id: 6,
      name: "Sarah Johnson",
      doctor: "Chioma",
      department: "Pediatrics",
      reason: "Child's fever",
      waitTime: "1 hr 5 min",
      checkInTime: "10:15 AM",
      priority: "urgent",
      room: "5"
    },
  ]);

  const doctors = ["All Doctors", "Dr. Adebola", "Dr. Chioma", "Dr. Ahmed", "Dr. Fatima"];

  const filteredQueue = queue.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDoctor = filterDoctor === "all" || patient.doctor === filterDoctor;
    return matchesSearch && matchesDoctor;
  });

  const handleCallPatient = (patientId: number) => {
    const patient = queue.find(p => p.id === patientId);
    if (patient) {
      setCurrentPatient(patient);
      // Remove from queue
      setQueue(prev => prev.filter(p => p.id !== patientId));
      // Send notification to patient
      console.log(`Calling ${patient.name} for consultation`);
    }
  };

  const handleCompleteConsultation = () => {
    console.log(`Completed consultation for ${currentPatient?.name}`);
    setCurrentPatient(null);
  };

  const handleCallNext = () => {
    if (currentPatient) {
      handleCompleteConsultation();
    }
    if (filteredQueue.length > 0) {
      handleCallPatient(filteredQueue[0].id);
    }
  };

  const handleRemoveFromQueue = (patientId: number) => {
    setQueue(prev => prev.filter(p => p.id !== patientId));
  };

  const handleSendMessage = (patient: any) => {
    console.log(`Sending message to ${patient.name}`);
    // Open chat with patient
  };

  const handleRequeue = () => {
    if (currentPatient) {
      setQueue(prev => [currentPatient, ...prev]);
      setCurrentPatient(null);
    }
  };

  const handleSkipToNext = (patientId: number) => {
    const patientIndex = queue.findIndex(p => p.id === patientId);
    if (patientIndex > 0) {
      const patient = queue[patientIndex];
      const newQueue = [...queue];
      newQueue.splice(patientIndex, 1);
      newQueue.unshift(patient);
      setQueue(newQueue);
    }
  };

  // Auto-refresh queue display
  useEffect(() => {
    if (isFullscreen) {
      const interval = setInterval(() => {
        // Update wait times
        setQueue(prev => prev.map(p => ({
          ...p,
          waitTime: calculateWaitTime(p.checkInTime)
        })));
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [isFullscreen]);

  const calculateWaitTime = (checkInTime: string) => {
    // Simplified wait time calculation
    const now = new Date();
    const [time, period] = checkInTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    const checkInDate = new Date();
    checkInDate.setHours(hours, minutes, 0, 0);
    
    const diffMs = now.getTime() - checkInDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} min`;
    const hoursDiff = Math.floor(diffMins / 60);
    const minsDiff = diffMins % 60;
    return `${hoursDiff} hr ${minsDiff} min`;
  };

  return (
    <div className="space-y-6">
      {/* Queue Display Fullscreen */}
      <QueueDisplay
        isFullscreen={isFullscreen}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        currentPatient={currentPatient}
        queue={queue}
      />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Queue Management</h1>
          <p className="text-slate-600 mt-1">Manage patient queue and consultations</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition-all"
          >
            {isPlaying ? (
              <>
                <PauseCircle className="w-5 h-5" />
                Pause Announcements
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Start Announcements
              </>
            )}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all"
          >
            <Maximize2 className="w-5 h-5" />
            Fullscreen Display
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">{queue.length}</div>
              <div className="text-sm text-slate-600">In Queue</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {currentPatient ? 1 : 0}
              </div>
              <div className="text-sm text-slate-600">Consulting Now</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-amber-600">
                {queue.filter(p => p.priority === 'urgent' || p.priority === 'emergency').length}
              </div>
              <div className="text-sm text-slate-600">Priority Patients</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {queue.length > 0 ? calculateWaitTime(queue[queue.length - 1].checkInTime) : '0 min'}
              </div>
              <div className="text-sm text-slate-600">Max Wait Time</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Patient Card */}
      {currentPatient && (
        <CurrentPatient
          patient={currentPatient}
          onComplete={handleCompleteConsultation}
          onNext={handleCallNext}
        />
      )}

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
                placeholder="Search patients in queue..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none"
              >
                {doctors.map(doctor => (
                  <option key={doctor} value={doctor === "All Doctors" ? "all" : doctor.replace("Dr. ", "")}>
                    {doctor}
                  </option>
                ))}
              </select>
            </div>

            <button className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors">
              <ArrowUpDown className="w-5 h-5" />
              Reorder Queue
            </button>
          </div>
        </div>
      </div>

      {/* Queue List */}
      <div className="space-y-4">
        {filteredQueue.map((patient, index) => (
          <QueueCard
            key={patient.id}
            patient={patient}
            position={index + 1}
            onCall={() => handleCallPatient(patient.id)}
            onMessage={() => handleSendMessage(patient)}
            onRemove={() => {
              if (confirm(`Remove ${patient.name} from queue?`)) {
                handleRemoveFromQueue(patient.id);
              }
            }}
          />
        ))}

        {filteredQueue.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Queue is empty</h3>
            <p className="text-slate-600 mb-6">
              {searchQuery 
                ? `No patients match "${searchQuery}"`
                : 'No patients waiting in queue'}
            </p>
            <p className="text-sm text-slate-500">
              Patients will appear here when they check in for appointments
            </p>
          </div>
        )}
      </div>

      {/* Queue Controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Queue Controls</h3>
            <p className="text-sm text-slate-600">Manage the patient flow</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {currentPatient && (
              <button
                onClick={handleRequeue}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Requeue Current Patient
              </button>
            )}
            
            <button
              onClick={handleCallNext}
              disabled={filteredQueue.length === 0}
              className={`px-6 py-3 rounded-lg font-medium ${
                filteredQueue.length === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:shadow-lg'
              }`}
            >
              Call Next Patient
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-6 py-3 rounded-lg font-medium ${
                isPlaying
                  ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
              } hover:shadow-lg transition-all`}
            >
              {isPlaying ? 'Stop Announcements' : 'Start Announcements'}
            </button>
          </div>
        </div>

        {/* Announcement settings */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-6 border-t border-slate-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Announcement Interval
                </label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-300">
                  <option>Every 5 minutes</option>
                  <option>Every 10 minutes</option>
                  <option>Every 15 minutes</option>
                  <option>Only when called</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Volume
                </label>
                <input type="range" min="0" max="100" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Language
                </label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-300">
                  <option>English</option>
                  <option>Yoruba</option>
                  <option>Hausa</option>
                  <option>Igbo</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}