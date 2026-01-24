// app/patients-dashboard/appointments/queue/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Clock, User, Bell, 
  MessageSquare, Phone, Stethoscope,
  AlertCircle, CheckCircle, Users,
  TrendingDown, Zap, Heart, Activity,
  RefreshCw, ChevronRight, MoreVertical,
  Eye, Video, MapPin, Download,
  Calendar, Filter, Search, Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Queue Card Component (Similar to hospital side)
function QueueCard({ patient, position, onCall }: {
  patient: any;
  position: number;
  onCall: () => void;
}) {
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
                <h3 className="font-bold text-slate-900">{patient.patientId}</h3>
                {patient.isYou && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    You
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-1 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Waiting: {patient.waitTime}</span>
                </div>
                {patient.estimatedTime && (
                  <div className="flex items-center gap-1 text-blue-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Est. consultation: {patient.estimatedTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Status */}
          <div className="text-right">
            {position === 1 && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Next in line
              </span>
            )}
            <div className="text-sm text-slate-500 mt-1">
              Checked in: {patient.checkInTime}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        {patient.isYou && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
            <button className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors">
              Update My Status
            </button>
            <button
              onClick={onCall}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded-lg hover:shadow-sm transition-all"
            >
              Notify I'm Here
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Current Patient Display (Similar to hospital)
function CurrentPatient({ patient, onComplete, onMessage }: {
  patient: any;
  onComplete: () => void;
  onMessage: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 p-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-sm font-medium text-blue-600 mb-2 flex items-center gap-2">
            <Bell className="w-4 h-4 animate-pulse" />
            NOW CONSULTING
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
            onClick={onMessage}
            className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Message
          </button>
          <button
            onClick={onComplete}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            My Turn
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function PatientQueuePage() {
  const params = useParams();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [queuePosition, setQueuePosition] = useState(3);
  const [waitTime, setWaitTime] = useState(45);
  
  // Mock queue data matching hospital format
  const [currentPatient, setCurrentPatient] = useState<any>({
    id: 1,
    name: "John Doe",
    doctor: "Adebola",
    department: "Cardiology",
    startTime: "2:15 PM",
    room: "Room 302"
  });

  const [queue, setQueue] = useState<any[]>([
    {
      id: 2,
      patientId: "HB234565",
      name: "Amina Yusuf",
      waitTime: "5 min",
      checkInTime: "1:45 PM",
      priority: "normal",
      isYou: false
    },
    {
      id: 3,
      patientId: "HB234564",
      name: "Chinedu Okoro",
      waitTime: "20 min",
      checkInTime: "2:00 PM",
      priority: "normal",
      isYou: false
    },
    {
      id: 4,
      patientId: "HB234567",
      name: "You",
      waitTime: "45 min",
      checkInTime: "2:15 PM",
      priority: "normal",
      isYou: true,
      estimatedTime: "3:00 PM"
    },
    {
      id: 5,
      patientId: "HB234568",
      name: "Fatima Bello",
      waitTime: "60 min",
      checkInTime: "2:30 PM",
      priority: "urgent",
      isYou: false
    },
    {
      id: 6,
      patientId: "HB234569",
      name: "David Brown",
      waitTime: "75 min",
      checkInTime: "2:45 PM",
      priority: "normal",
      isYou: false
    },
  ]);

  const appointmentData = {
    doctor: {
      name: "Dr. Adebola Johnson",
      department: "Cardiology",
      status: "In Consultation",
      currentPatient: "John Doe",
      startTime: "2:15 PM",
      estimatedPerPatient: 15,
    },
    appointmentDetails: {
      time: "Today, 2:30 PM",
      type: "Consultation",
      reason: "Follow-up on heart condition",
      location: "Cardiology Wing, Floor 3, Room 302",
      hospital: "HealthBridge Hospital",
    },
    metrics: {
      averageWaitTime: 35,
      patientsSeenToday: 24,
      satisfactionRate: 94,
    }
  };

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

  const handleNotifyHere = () => {
    alert("Receptionist notified that you're present!");
  };

  const handleMessageDoctor = () => {
    console.log("Messaging doctor");
  };

  const handleMyTurn = () => {
    console.log("Marking as my turn");
  };

  // Auto-refresh queue
  useEffect(() => {
    const interval = setInterval(() => {
      if (queue.find(p => p.isYou)?.waitTime) {
        setQueue(prev => prev.map(p => ({
          ...p,
          waitTime: calculateWaitTime(p.checkInTime)
        })));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const calculateWaitTime = (checkInTime: string) => {
    // Simplified calculation
    return "45 min";
  };

  return (
    <div className="space-y-6">
      {/* Header - Matching hospital design */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/patient-dashboard/appointments"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Appointments
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Live Queue</h1>
          <p className="text-slate-600 mt-1">Track your position in the queue</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition-all"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
              notificationsEnabled
                ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:shadow-lg'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bell className="w-5 h-5" />
            {notificationsEnabled ? 'Notifications ON' : 'Notifications OFF'}
          </button>
        </div>
      </div>

      {/* Stats - Matching hospital design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-slate-900">
                #{queue.findIndex(p => p.isYou) + 2}
              </div>
              <div className="text-sm text-slate-600">Your Position</div>
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
                {queue.find(p => p.isYou)?.waitTime || '45 min'}
              </div>
              <div className="text-sm text-slate-600">Estimated Wait</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-amber-600">
                {queue.length}
              </div>
              <div className="text-sm text-slate-600">In Queue</div>
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
                {appointmentData.metrics.satisfactionRate}%
              </div>
              <div className="text-sm text-slate-600">Satisfaction</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Patient Card */}
      {currentPatient && (
        <CurrentPatient
          patient={currentPatient}
          onComplete={handleMyTurn}
          onMessage={handleMessageDoctor}
        />
      )}

      {/* Your Position Card - Prominent display */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium opacity-90 mb-2">YOUR POSITION IN QUEUE</div>
            <div className="text-4xl font-bold mb-2">
              #{queue.findIndex(p => p.isYou) + 2}
            </div>
            <div className="text-lg opacity-90">
              Estimated wait: {queue.find(p => p.isYou)?.waitTime || '45 min'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium opacity-90 mb-2">ESTIMATED TIME</div>
            <div className="text-2xl font-bold mb-2">
              {queue.find(p => p.isYou)?.estimatedTime || '3:00 PM'}
            </div>
            <div className="text-sm opacity-90">
              Based on {appointmentData.doctor.estimatedPerPatient}min consultations
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 relative h-3 bg-white/30 rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${((queue.length - (queue.findIndex(p => p.isYou) + 1)) / queue.length) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search in queue..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Queue header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Patients Ahead of You</h3>
          <span className="text-sm text-slate-500">
            {queue.filter(p => !p.isYou && queue.indexOf(p) < queue.findIndex(p => p.isYou)).length} patients
          </span>
        </div>

        {/* Queue cards */}
        <div className="space-y-4">
          {queue
            .filter(p => !p.isYou && queue.indexOf(p) < queue.findIndex(p => p.isYou))
            .map((patient, index) => (
              <QueueCard
                key={patient.id}
                patient={patient}
                position={index + 1}
                onCall={handleNotifyHere}
              />
            ))}

          {/* Your position card (highlighted) */}
          {queue.filter(p => p.isYou).map((patient, index) => (
            <motion.div
              key="you"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="border-2 border-blue-500 rounded-xl bg-blue-50"
            >
              <QueueCard
                patient={patient}
                position={queue.findIndex(p => p.isYou) + 2}
                onCall={handleNotifyHere}
              />
            </motion.div>
          ))}

          {/* Patients after you */}
          {queue
            .filter(p => !p.isYou && queue.indexOf(p) > queue.findIndex(p => p.isYou))
            .map((patient, index) => (
              <QueueCard
                key={patient.id}
                patient={patient}
                position={queue.findIndex(p => p.isYou) + index + 3}
                onCall={handleNotifyHere}
              />
            ))}
        </div>

        {queue.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Queue is empty</h3>
            <p className="text-slate-600 mb-6">
              You're next in line!
            </p>
          </div>
        )}
      </div>

      {/* Appointment Details & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment Details */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-6">Appointment Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Doctor</div>
                  <div className="font-bold text-slate-900">{appointmentData.doctor.name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Department</div>
                  <div className="font-bold text-slate-900">{appointmentData.doctor.department}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Scheduled Time</div>
                  <div className="font-bold text-slate-900">{appointmentData.appointmentDetails.time}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-slate-600">Location</div>
                  <div className="font-bold text-slate-900">{appointmentData.appointmentDetails.location}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="text-sm text-slate-600 mb-2">Reason for Visit</div>
            <div className="font-medium text-slate-900">{appointmentData.appointmentDetails.reason}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-6">Quick Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full p-3 rounded-lg border border-slate-300 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-slate-700">Message Reception</span>
            </button>
            
            <button className="w-full p-3 rounded-lg border border-slate-300 hover:border-green-300 hover:bg-green-50 transition-all flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600" />
              <span className="font-medium text-slate-700">Call Reception</span>
            </button>
            
            <button className="w-full p-3 rounded-lg border border-slate-300 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center gap-3">
              <Video className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-slate-700">Join Virtual Wait</span>
            </button>
            
            <button className="w-full p-3 rounded-lg border border-slate-300 hover:border-red-300 hover:bg-red-50 transition-all flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-slate-700">Emergency</span>
            </button>
            
            <button className="w-full p-3 rounded-lg border border-slate-300 hover:border-amber-300 hover:bg-amber-50 transition-all flex items-center gap-3">
              <Download className="w-5 h-5 text-amber-600" />
              <span className="font-medium text-slate-700">Download Info</span>
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="text-sm text-slate-600 mb-2">Queue Last Updated</div>
            <div className="font-medium text-slate-900">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-6">Queue Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-sm text-slate-600">Average Wait Time</div>
                <div className="text-2xl font-bold text-slate-900">
                  {appointmentData.metrics.averageWaitTime} min
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-green-50 border border-green-100">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-sm text-slate-600">Today's Efficiency</div>
                <div className="text-2xl font-bold text-slate-900">
                  {appointmentData.metrics.patientsSeenToday} patients
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-sm text-slate-600">Patient Satisfaction</div>
                <div className="text-2xl font-bold text-slate-900">
                  {appointmentData.metrics.satisfactionRate}%
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            The queue updates automatically every minute. You'll receive a notification when it's your turn.
          </p>
        </div>
      </div>
    </div>
  );
}