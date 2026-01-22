// app/patients-dashboard/telemedicine/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Video, Phone, MessageSquare, Camera,
  Calendar, Clock, User, Stethoscope,
  MapPin, Star, CheckCircle, X,
  ChevronRight, Search, Filter, Plus,
  Bell, Activity, Thermometer, Pill,
  Download, Printer, Share2, Settings,
  Wifi, Battery, Mic, MicOff,
  Volume2, VolumeX, PhoneCall, PhoneOff,
  MessageCircle, VideoOff, Users,
  Shield, Zap, Headphones, Monitor,
  FileText, Heart, AlertCircle, Info,
  Upload, Image as ImageIcon, File,
  Lock, Eye, EyeOff, Key,
  FileCheck, Clipboard, BookOpen,
  Target, TrendingUp, Share,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Virtual Consultation Card Component - Updated for hospital perspective
function VirtualConsultationCard({ 
  consultation,
  onJoinCall,
  onSchedule,
  onMessage
}: { 
  consultation: any;
  onJoinCall: () => void;
  onSchedule: () => void;
  onMessage: () => void;
}) {
  const statusColors = {
    scheduled: "bg-blue-100 text-blue-700 border-blue-200",
    in_progress: "bg-emerald-100 text-emerald-700 border-emerald-200",
    completed: "bg-slate-100 text-slate-700 border-slate-200",
    cancelled: "bg-red-100 text-red-700 border-red-200"
  };

  const statusIcons = {
    scheduled: Calendar,
    in_progress: Video,
    completed: CheckCircle,
    cancelled: X
  };

  const StatusIcon = statusIcons[consultation.status as keyof typeof statusIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3 md:gap-4 w-full">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Video className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              {consultation.status === "in_progress" && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-emerald-500 rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h3 className="text-base md:text-lg font-bold text-slate-900 truncate">
                  {consultation.specialty} Department
                </h3>
                <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit ${
                  statusColors[consultation.status as keyof typeof statusColors]
                }`}>
                  <StatusIcon className="w-3 h-3" />
                  {consultation.status.replace('_', ' ').charAt(0).toUpperCase() + consultation.status.replace('_', ' ').slice(1)}
                </span>
              </div>
              
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <User className="w-3 h-3 md:w-4 md:h-4 text-slate-400 flex-shrink-0" />
                  <span className="font-medium text-sm md:text-base truncate">
                    {consultation.doctor ? `Dr. ${consultation.doctor}` : "Doctor will be assigned"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 text-slate-400" />
                  <span className="font-medium text-sm md:text-base">{consultation.date}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 text-slate-400" />
                  <span className="text-sm">{consultation.time}</span>
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap items-center gap-3 md:gap-4">
                <div className="flex items-center gap-1">
                  {consultation.hospital && (
                    <>
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-xs md:text-sm text-slate-500">{consultation.hospital}</span>
                    </>
                  )}
                </div>
                <div className="text-xs md:text-sm text-slate-500">
                  {consultation.duration} • {consultation.type}
                </div>
                {consultation.recording && (
                  <div className="text-xs md:text-sm text-blue-600 font-medium flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Recording available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {consultation.status === "scheduled" && (
              <motion.button
                onClick={onJoinCall}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 justify-center text-sm sm:text-base flex-1"
              >
                <Video className="w-4 h-4" />
                Join Virtual Room
              </motion.button>
            )}
            
            {consultation.status === "completed" && (
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center text-sm sm:text-base flex-1">
                  <Video className="w-4 h-4" />
                  View Recording
                </button>
                <button className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center text-sm sm:text-base flex-1">
                  <Download className="w-4 h-4" />
                  Consultation Summary
                </button>
              </div>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={onMessage}
                className="p-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center"
              >
                <MessageSquare className="w-4 h-4 text-slate-600" />
              </button>
              <button className="p-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center">
                <Calendar className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
          
          {/* Waiting room info */}
          {consultation.status === "scheduled" && (
            <div className="mt-3 bg-blue-50/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Clock className="w-4 h-4" />
                <span>Virtual waiting room opens 15 minutes before appointment</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Virtual Consultation Room with ALL features
function VirtualConsultationRoom({ 
  isOpen, 
  onClose,
  consultation 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  consultation: any;
}) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState("connecting");
  const [activeSidePanel, setActiveSidePanel] = useState<"tools" | "chat" | "notes" | "health" | "documents">("tools");
  const [chatMessage, setChatMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [healthMetrics, setHealthMetrics] = useState({
    heartRate: 72,
    bloodPressure: "120/80",
    temperature: 36.6,
    bloodSugar: 95
  });
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "doctor", message: "Hello, how are you feeling today?", time: "2:30 PM" },
    { id: 2, sender: "you", message: "I'm doing better, thank you", time: "2:31 PM" },
    { id: 3, sender: "doctor", message: "Good to hear. Let's start by reviewing your symptoms", time: "2:31 PM" },
  ]);

  useEffect(() => {
    if (isOpen) {
      // Simulate call connection
      setTimeout(() => setCallStatus("connected"), 2000);
      
      // Start call timer
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    setCallStatus("ending");
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: "you",
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage("");
    
    // Simulate doctor response after 2 seconds
    setTimeout(() => {
      const doctorResponse = {
        id: chatMessages.length + 2,
        sender: "doctor",
        message: "I see. Let me note that down.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, doctorResponse]);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newDocuments = Array.from(files).map((file, index) => ({
      id: uploadedDocuments.length + index + 1,
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
  };

  const updateHealthMetric = (metric: string, value: any) => {
    setHealthMetrics(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  // Close side panel without ending the call
  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900"
          />
          
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Call header with privacy indicators */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Video className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-base md:text-lg">{consultation.specialty} Department</div>
                    <div className="text-slate-300 text-sm md:text-base">
                      {consultation.doctor ? `Dr. ${consultation.doctor}` : "Hospital Consultation"}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Privacy indicators */}
                  <div className="hidden sm:flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${privacyMode ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}`}>
                      {privacyMode ? <Lock className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                      <span className="hidden sm:inline">{privacyMode ? 'Enhanced Privacy' : 'Standard Security'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <Wifi className="w-4 h-4" />
                      <span className="text-xs hidden sm:inline">Good</span>
                    </div>
                  </div>
                  <div className="text-white font-mono text-lg md:text-xl">
                    {formatTime(callDuration)}
                  </div>
                </div>
              </div>
            </div>

            {/* Video feeds */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-6xl h-full">
                {/* Doctor's video feed */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-slate-800">
                  {/* Simulated video feed */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                        <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
                      </div>
                      <div className="text-white font-bold text-lg md:text-xl">{consultation.specialty} Department</div>
                      <div className="text-slate-300 text-sm md:text-base">
                        {consultation.doctor ? `Dr. ${consultation.doctor}` : "Hospital Doctor"}
                      </div>
                      {callStatus === "connecting" && (
                        <div className="text-slate-400 text-sm mt-4">Connecting to hospital network...</div>
                      )}
                    </div>
                  </div>
                  
                  {/* Security overlay */}
                  {privacyMode && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-black/50 text-emerald-300 rounded-full px-3 py-1 text-xs">
                        <Lock className="w-3 h-3" />
                        <span className="hidden sm:inline">Enhanced Privacy Active</span>
                        <span className="sm:hidden">Privacy</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Connection status */}
                  {callStatus === "connecting" && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center gap-2 text-white bg-black/50 rounded-full px-4 py-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm hidden sm:inline">Connecting to hospital...</span>
                        <span className="text-sm sm:hidden">Connecting...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Self view (picture-in-picture) */}
                <div className="absolute bottom-24 right-6 w-32 h-48 md:w-48 md:h-64 rounded-xl overflow-hidden border-2 border-white shadow-lg">
                  <div className="absolute inset-0 bg-slate-700 flex items-center justify-center">
                    {isVideoOn ? (
                      <div className="text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
                          <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <div className="text-white text-xs">You</div>
                        {privacyMode && (
                          <div className="text-emerald-300 text-[10px] mt-1">
                            <Lock className="w-2 h-2 inline mr-1" />
                            Privacy
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-600 flex items-center justify-center mx-auto mb-2">
                          <VideoOff className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />
                        </div>
                        <div className="text-slate-400 text-xs">Camera off</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Call controls */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/50 to-transparent p-4 md:p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6">
                  {/* Video toggle */}
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                      isVideoOn 
                        ? "bg-slate-700/50 hover:bg-slate-600/50 text-white" 
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    {isVideoOn ? (
                      <Camera className="w-4 h-4 md:w-6 md:h-6" />
                    ) : (
                      <VideoOff className="w-4 h-4 md:w-6 md:h-6" />
                    )}
                  </button>

                  {/* Audio toggle */}
                  <button
                    onClick={() => setIsAudioOn(!isAudioOn)}
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                      isAudioOn 
                        ? "bg-slate-700/50 hover:bg-slate-600/50 text-white" 
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    {isAudioOn ? (
                      <Mic className="w-4 h-4 md:w-6 md:h-6" />
                    ) : (
                      <MicOff className="w-4 h-4 md:w-6 md:h-6" />
                    )}
                  </button>

                  {/* Mute toggle */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                      !isMuted 
                        ? "bg-slate-700/50 hover:bg-slate-600/50 text-white" 
                        : "bg-amber-500 hover:bg-amber-600 text-white"
                    }`}
                  >
                    {!isMuted ? (
                      <Volume2 className="w-4 h-4 md:w-6 md:h-6" />
                    ) : (
                      <VolumeX className="w-4 h-4 md:w-6 md:h-6" />
                    )}
                  </button>

                  {/* End call button */}
                  <button
                    onClick={endCall}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                  >
                    <PhoneOff className="w-5 h-5 md:w-7 md:h-7" />
                  </button>

                  {/* Screen share */}
                  <button
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                      isScreenSharing 
                        ? "bg-blue-500 hover:bg-blue-600 text-white" 
                        : "bg-slate-700/50 hover:bg-slate-600/50 text-white"
                    }`}
                  >
                    <Monitor className="w-4 h-4 md:w-6 md:h-6" />
                  </button>

                  {/* Privacy toggle */}
                  <button
                    onClick={() => setPrivacyMode(!privacyMode)}
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                      privacyMode 
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
                        : "bg-slate-700/50 hover:bg-slate-600/50 text-white"
                    }`}
                  >
                    {privacyMode ? (
                      <Lock className="w-4 h-4 md:w-6 md:h-6" />
                    ) : (
                      <Shield className="w-4 h-4 md:w-6 md:h-6" />
                    )}
                  </button>

                  {/* Chat toggle */}
                  <button
                    onClick={() => {
                      setIsSidePanelOpen(!isSidePanelOpen);
                      setActiveSidePanel("chat");
                    }}
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                      activeSidePanel === "chat" && isSidePanelOpen
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-slate-700/50 hover:bg-slate-600/50 text-white"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 md:w-6 md:h-6" />
                  </button>

                  {/* Tools toggle */}
                  <button
                    onClick={() => {
                      setIsSidePanelOpen(!isSidePanelOpen);
                      setActiveSidePanel("tools");
                    }}
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center ${
                      activeSidePanel === "tools" && isSidePanelOpen
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-slate-700/50 hover:bg-slate-600/50 text-white"
                    }`}
                  >
                    <Activity className="w-4 h-4 md:w-6 md:h-6" />
                  </button>
                </div>

                {/* Control labels - hidden on mobile, visible on desktop */}
                <div className="hidden md:flex items-center gap-4 text-white text-xs">
                  <span>{isVideoOn ? "Camera On" : "Camera Off"}</span>
                  <span>{isAudioOn ? "Mic On" : "Mic Off"}</span>
                  <span>{isMuted ? "Muted" : "Unmuted"}</span>
                  <span className="text-red-300">End Call</span>
                  <span>{isScreenSharing ? "Stop Share" : "Share"}</span>
                  <span>{privacyMode ? "Privacy On" : "Privacy"}</span>
                  <span>Chat</span>
                  <span>Tools</span>
                </div>
              </div>
            </div>

            {/* Enhanced Side Panel with all features */}
            {isSidePanelOpen && (
              <div className={`absolute top-20 right-6 w-64 md:w-80 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isScreenSharing ? 'h-3/4' : 'h-2/3'}`}>
                {/* Panel Header */}
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-900 text-sm md:text-base">
                        {activeSidePanel === "tools" && "Consultation Tools"}
                        {activeSidePanel === "chat" && "Secure Chat"}
                        {activeSidePanel === "notes" && "Call Notes"}
                        {activeSidePanel === "health" && "Health Metrics"}
                        {activeSidePanel === "documents" && "Documents"}
                      </h3>
                      {activeSidePanel === "chat" && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handleCloseSidePanel}
                        className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Panel Tabs */}
                  <div className="flex gap-2 mt-3 overflow-x-auto">
                    {[
                      { id: "tools", label: "Tools", icon: Activity },
                      { id: "chat", label: "Chat", icon: MessageSquare },
                      { id: "notes", label: "Notes", icon: BookOpen },
                      { id: "health", label: "Health", icon: Heart },
                      { id: "documents", label: "Docs", icon: FileText },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveSidePanel(tab.id as any)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 whitespace-nowrap ${
                            activeSidePanel === tab.id
                              ? "bg-blue-500 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Panel Content */}
                <div className="overflow-y-auto p-4" style={{ height: 'calc(100% - 100px)' }}>
                  {/* Tools Panel */}
                  {activeSidePanel === "tools" && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-blue-700 text-sm">
                          <Shield className="w-4 h-4" />
                          <span>End-to-end encrypted connection to hospital</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2 text-sm md:text-base">Quick Actions</h4>
                        <div className="space-y-2">
                          <button 
                            onClick={() => setActiveSidePanel("health")}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 text-sm"
                          >
                            <Activity className="w-4 h-4" />
                            Share Health Metrics
                          </button>
                          <button 
                            onClick={() => setActiveSidePanel("documents")}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 text-sm"
                          >
                            <Upload className="w-4 h-4" />
                            Share Documents
                          </button>
                          <button 
                            onClick={() => setActiveSidePanel("notes")}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 text-sm"
                          >
                            <BookOpen className="w-4 h-4" />
                            Take Notes
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2 text-sm md:text-base">Security Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                            <span className="text-sm text-slate-700">Connection</span>
                            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Secure
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                            <span className="text-sm text-slate-700">Encryption</span>
                            <span className="text-sm font-medium text-emerald-600">AES-256</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                            <span className="text-sm text-slate-700">Privacy Mode</span>
                            <span className={`text-sm font-medium ${privacyMode ? 'text-emerald-600' : 'text-slate-600'}`}>
                              {privacyMode ? 'Active' : 'Standard'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Chat Panel */}
                  {activeSidePanel === "chat" && (
                    <div className="h-full flex flex-col">
                      {/* Chat messages */}
                      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                        {chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`max-w-[80%] rounded-xl p-3 ${
                              msg.sender === "you" 
                                ? "bg-blue-500 text-white rounded-br-none" 
                                : "bg-slate-100 text-slate-900 rounded-bl-none"
                            }`}>
                              <div className="text-sm">{msg.message}</div>
                              <div className={`text-xs mt-1 ${msg.sender === "you" ? "text-blue-200" : "text-slate-500"}`}>
                                {msg.time}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Chat input */}
                      <div className="border-t border-slate-200 pt-4">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                          />
                          <button
                            onClick={sendChatMessage}
                            className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Messages are encrypted and secure
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Notes Panel */}
                  {activeSidePanel === "notes" && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2 text-sm md:text-base">Consultation Notes</h4>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Take notes during your consultation..."
                          className="w-full h-48 p-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none text-sm"
                        />
                      </div>
                      
                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-amber-700">
                            These notes are automatically saved and will be included in your consultation summary.
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm">
                          <Download className="w-4 h-4 inline mr-1" />
                          Save Notes
                        </button>
                        <button className="flex-1 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm">
                          <Share className="w-4 h-4 inline mr-1" />
                          Share with Doctor
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Health Metrics Panel */}
                  {activeSidePanel === "health" && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-3 text-sm md:text-base">Share Health Metrics</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span className="text-sm font-medium">Heart Rate</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                              <input
                                type="number"
                                value={healthMetrics.heartRate}
                                onChange={(e) => updateHealthMetric("heartRate", e.target.value)}
                                className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-lg font-bold"
                              />
                              <span className="text-sm text-slate-600">bpm</span>
                            </div>
                          </div>
                          
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Activity className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium">Blood Pressure</span>
                            </div>
                            <input
                              type="text"
                              value={healthMetrics.bloodPressure}
                              onChange={(e) => updateHealthMetric("bloodPressure", e.target.value)}
                              className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-lg font-bold"
                              placeholder="120/80"
                            />
                          </div>
                          
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Thermometer className="w-4 h-4 text-amber-500" />
                              <span className="text-sm font-medium">Temperature</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                              <input
                                type="number"
                                value={healthMetrics.temperature}
                                onChange={(e) => updateHealthMetric("temperature", e.target.value)}
                                className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-lg font-bold"
                              />
                              <span className="text-sm text-slate-600">°C</span>
                            </div>
                          </div>
                          
                          <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-4 h-4 text-purple-500" />
                              <span className="text-sm font-medium">Blood Sugar</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                              <input
                                type="number"
                                value={healthMetrics.bloodSugar}
                                onChange={(e) => updateHealthMetric("bloodSugar", e.target.value)}
                                className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-lg font-bold"
                              />
                              <span className="text-sm text-slate-600">mg/dL</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                        <Share className="w-4 h-4" />
                        Share All Metrics with Doctor
                      </button>
                      
                      <div className="text-xs text-slate-500">
                        <div className="flex items-center gap-1 mb-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>These metrics will be added to your medical record</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Documents Panel */}
                  {activeSidePanel === "documents" && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-3 text-sm md:text-base">Share Documents</h4>
                        
                        {/* Upload area */}
                        <div 
                          className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                            <Upload className="w-6 h-6 text-blue-500" />
                          </div>
                          <div className="font-medium text-slate-900 mb-1">Upload Documents</div>
                          <div className="text-sm text-slate-600 mb-3">
                            Lab results, prescriptions, medical images
                          </div>
                          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm">
                            Select Files
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            className="hidden"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          />
                        </div>
                      </div>
                      
                      {/* Uploaded documents */}
                      {uploadedDocuments.length > 0 && (
                        <div>
                          <h5 className="font-medium text-slate-900 mb-2 text-sm md:text-base">Uploaded Documents</h5>
                          <div className="space-y-2">
                            {uploadedDocuments.map((doc) => (
                              <div key={doc.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-slate-600" />
                                  <div>
                                    <div className="text-sm font-medium text-slate-900 truncate max-w-[180px]">{doc.name}</div>
                                    <div className="text-xs text-slate-500">{doc.size} • {doc.uploadedAt}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button className="p-1 hover:bg-white rounded">
                                    <Eye className="w-4 h-4 text-slate-600" />
                                  </button>
                                  <button className="p-1 hover:bg-white rounded">
                                    <Share className="w-4 h-4 text-slate-600" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Lock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-700">
                            All documents are encrypted and securely transferred to the hospital system.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Updated Schedule Consultation Modal - Hospital focused
function ScheduleConsultationModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<string>("video");
  const [reason, setReason] = useState("");

  const departments = [
    { id: "cardiology", name: "Cardiology Department", description: "Heart and cardiovascular care", waitTime: "24 hours", icon: Heart },
    { id: "pediatrics", name: "Pediatrics Department", description: "Child healthcare", waitTime: "12 hours", icon: Users },
    { id: "dermatology", name: "Dermatology Department", description: "Skin and hair care", waitTime: "48 hours", icon: Activity },
    { id: "general", name: "General Medicine", description: "Primary care and consultations", waitTime: "6 hours", icon: Stethoscope },
    { id: "orthopedics", name: "Orthopedics Department", description: "Bone and joint care", waitTime: "36 hours", icon: Activity },
    { id: "gynecology", name: "Gynecology Department", description: "Women's health", waitTime: "24 hours", icon: User },
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const consultationTypes = [
    { id: "video", label: "Video Consultation", icon: Video, color: "from-blue-500 to-cyan-500", description: "Face-to-face video call with hospital doctor" },
    { id: "audio", label: "Audio Consultation", icon: PhoneCall, color: "from-emerald-500 to-teal-500", description: "Voice call consultation" },
    { id: "message", label: "Secure Messaging", icon: MessageSquare, color: "from-purple-500 to-violet-500", description: "Text-based consultation with hospital team" },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log({ selectedDepartment, selectedDate, selectedTime, consultationType, reason });
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
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">Schedule Hospital Consultation</h2>
                    <p className="text-slate-600 mt-1 text-sm md:text-base">Book a virtual appointment with hospital department</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                
                {/* Progress steps */}
                <div className="flex items-center justify-between mt-4 md:mt-6">
                  {[1, 2, 3, 4].map((stepNum) => (
                    <div key={stepNum} className="flex items-center flex-1">
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-medium text-xs md:text-sm ${
                        step === stepNum 
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" 
                          : step > stepNum 
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {step > stepNum ? <CheckCircle className="w-3 h-3 md:w-4 md:h-4" /> : stepNum}
                      </div>
                      {stepNum < 4 && (
                        <div className={`flex-1 h-1 mx-2 ${
                          step > stepNum ? "bg-emerald-500" : "bg-slate-200"
                        }`} />
                      )}
                    </div>
                  ))}
                  <div className="ml-4 text-sm font-medium text-slate-600 whitespace-nowrap">
                    Step {step} of 4
                  </div>
                </div>
              </div>
              
              {/* Modal content */}
              <div className="overflow-y-auto p-4 md:p-6" style={{ maxHeight: 'calc(90vh - 160px)' }}>
                {/* Step 1: Select Department */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Select Hospital Department</h3>
                      <div className="relative mb-6">
                        <input
                          type="search"
                          placeholder="Search departments or specialties..."
                          className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm md:text-base"
                        />
                        <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {departments.map((dept) => {
                          const Icon = dept.icon;
                          return (
                            <button
                              key={dept.id}
                              onClick={() => setSelectedDepartment(dept.id)}
                              className={`p-4 rounded-xl border-2 transition-all text-left ${
                                selectedDepartment === dept.id
                                  ? "border-blue-500 bg-blue-50/50"
                                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-bold text-slate-900">{dept.name}</div>
                                  <div className="text-sm text-slate-600 mt-1">{dept.description}</div>
                                  <div className="flex items-center gap-4 mt-2">
                                    <div className="text-sm text-blue-600 font-medium">
                                      Avg. wait: {dept.waitTime}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Select Time & Type */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Select Date & Time</h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-4">
                          {["Today", "Tomorrow", "Nov 28", "Nov 29", "Nov 30", "Dec 1"].map((date) => (
                            <button
                              key={date}
                              onClick={() => setSelectedDate(date)}
                              className={`px-3 py-2 md:px-4 md:py-3 rounded-xl whitespace-nowrap text-sm md:text-base ${
                                selectedDate === date
                                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              <div className="font-medium">{date}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-slate-600 mb-3">Available Time Slots</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`p-2 md:p-3 rounded-lg border transition-all text-sm md:text-base ${
                                selectedTime === time
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className="font-medium">{time}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Consultation Type</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {consultationTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.id}
                              onClick={() => setConsultationType(type.id)}
                              className={`p-4 rounded-xl border-2 transition-all ${
                                consultationType === type.id
                                  ? `border-blue-500 bg-gradient-to-br ${type.color} bg-opacity-10`
                                  : "border-slate-200 hover:border-slate-300"
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3 mx-auto`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="font-bold text-slate-900 text-center">{type.label}</div>
                              <div className="text-sm text-slate-600 text-center mt-1">{type.description}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 3: Reason for Consultation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Reason for Consultation</h3>
                      <p className="text-slate-600 mb-4 text-sm md:text-base">
                        Please describe your symptoms or reason for the virtual consultation. This helps the hospital department prepare.
                      </p>
                      
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Example: I've been experiencing chest pain for the past 2 days, especially when walking. I have a history of high blood pressure..."
                        className="w-full h-48 p-3 md:p-4 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none text-sm md:text-base"
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Step 4: Review & Confirm */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Review & Confirm</h3>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-6 border border-blue-100">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                              <Stethoscope className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">Cardiology Department</div>
                              <div className="text-sm text-slate-600">Hospital Consultation</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">Today, 2:30 PM</div>
                              <div className="text-sm text-slate-600">30 minute virtual consultation</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                              <Video className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">Video Consultation</div>
                              <div className="text-sm text-slate-600">Secure hospital video call</div>
                            </div>
                          </div>
                          
                          {reason && (
                            <div className="mt-4 pt-4 border-t border-slate-200">
                              <div className="text-sm font-medium text-slate-600 mb-2">Reason for Visit</div>
                              <div className="text-slate-700 text-sm">{reason.substring(0, 100)}...</div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Consultation Fee</span>
                              <span className="font-medium">₦5,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Hospital Platform Fee</span>
                              <span className="font-medium">₦500</span>
                            </div>
                            <div className="flex justify-between mt-3 pt-3 border-t border-slate-300">
                              <span className="font-bold text-slate-900">Total Amount</span>
                              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                ₦5,500
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mt-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-700">
                            <span className="font-medium">Important:</span> A hospital doctor from the Cardiology Department will conduct your consultation. You can join the virtual waiting room 15 minutes before your scheduled time.
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Modal footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={step === 1 ? onClose : handleBack}
                    className="px-4 py-2 md:px-6 md:py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {step === 1 ? "Cancel" : "Back"}
                  </button>
                  
                  <button
                    onClick={step === 4 ? handleSubmit : handleNext}
                    disabled={(step === 1 && !selectedDepartment) || (step === 2 && !selectedTime) || (step === 3 && !reason)}
                    className="px-6 py-2 md:px-8 md:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    {step === 4 ? (
                      <>
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Book Hospital Consultation - ₦5,500</span>
                      </>
                    ) : (
                      <>
                        <span>Next Step</span>
                        <ChevronRight className="w-4 h-4" />
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

export default function TelemedicinePage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showConsultationRoom, setShowConsultationRoom] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  
  const consultations = {
    upcoming: [
      {
        id: 1,
        specialty: "Cardiology",
        hospital: "Main Hospital",
        date: "Today",
        time: "2:30 PM",
        status: "scheduled",
        duration: "30 minutes",
        type: "Video Consultation",
        doctor: "To be assigned",
        recording: false
      },
      {
        id: 2,
        specialty: "Pediatrics",
        hospital: "Children's Wing",
        date: "Tomorrow",
        time: "10:00 AM",
        status: "scheduled",
        duration: "45 minutes",
        type: "Video Consultation",
        doctor: "To be assigned",
        recording: false
      },
    ],
    past: [
      {
        id: 3,
        specialty: "Dermatology",
        hospital: "Main Hospital",
        date: "Nov 15",
        time: "3:00 PM",
        status: "completed",
        duration: "20 minutes",
        type: "Video Consultation",
        doctor: "Johnson",
        recording: true
      },
      {
        id: 4,
        specialty: "General Medicine",
        hospital: "Main Hospital",
        date: "Nov 10",
        time: "11:00 AM",
        status: "completed",
        duration: "30 minutes",
        type: "Audio Consultation",
        doctor: "Okoro",
        recording: false
      },
    ]
  };

  // Hospital departments available for consultation
  const availableDepartments = [
    {
      id: 1,
      name: "Emergency Triage",
      specialty: "Emergency",
      waitTime: "Immediate",
      available: true,
      description: "Urgent medical concerns"
    },
    {
      id: 2,
      name: "General Medicine",
      specialty: "Primary Care",
      waitTime: "15 mins",
      available: true,
      description: "General health consultations"
    },
    {
      id: 3,
      name: "Mental Health Support",
      specialty: "Psychiatry",
      waitTime: "30 mins",
      available: true,
      description: "Counseling and mental wellness"
    },
  ];

  const handleJoinCall = (consultation: any) => {
    setSelectedConsultation(consultation);
    setShowConsultationRoom(true);
  };

  const handleScheduleConsultation = () => {
    setShowScheduleModal(true);
  };

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Video className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Hospital Telemedicine</h1>
              <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">Virtual consultations with hospital departments</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleScheduleConsultation()}
            className="px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Schedule</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // Start immediate consultation with emergency department
              setSelectedConsultation({
                specialty: "Emergency Triage",
                hospital: "Main Hospital",
                status: "in_progress",
                doctor: "Triage Doctor"
              });
              setShowConsultationRoom(true);
            }}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium hover:from-emerald-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
          >
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Urgent Care</span>
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">6</div>
              <div className="text-xs md:text-sm text-slate-600">Departments</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">{consultations.upcoming.length}</div>
              <div className="text-xs md:text-sm text-slate-600">Upcoming</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-4 md:p-6 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">{consultations.past.length}</div>
              <div className="text-xs md:text-sm text-slate-600">Past Consultations</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 md:p-6 border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl md:text-2xl font-bold text-slate-900">15 min</div>
              <div className="text-xs md:text-sm text-slate-600">Avg. Wait Time</div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Available Departments Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Available Departments</h2>
            <p className="text-slate-600 mt-1 text-sm md:text-base">Connect with hospital departments now</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-sm font-medium">
              All Online
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-700 text-sm font-medium hover:bg-emerald-50">
              Filter by Specialty
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableDepartments.map((dept) => (
            <div key={dept.id} className="bg-white rounded-xl border border-emerald-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{dept.name}</div>
                    <div className="text-sm text-slate-600">{dept.specialty}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium min-w-[60px] justify-center">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">{dept.waitTime}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">{dept.description}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedConsultation({
                      specialty: dept.name,
                      hospital: "Main Hospital",
                      status: "in_progress",
                      doctor: "Department Doctor"
                    });
                    setShowConsultationRoom(true);
                  }}
                  className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Video className="w-4 h-4" />
                  Connect Now
                </button>
                <button 
                  onClick={() => handleScheduleConsultation()}
                  className="px-3 py-2 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors text-sm font-medium"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-4 md:space-x-8 overflow-x-auto pb-2">
          {[
            { id: "upcoming", label: "Upcoming", count: consultations.upcoming.length },
            { id: "past", label: "Past", count: consultations.past.length },
            { id: "recordings", label: "Recordings", count: consultations.past.filter(c => c.recording).length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Consultations List */}
      <div className="space-y-4 md:space-y-6">
        {(activeTab === "upcoming" ? consultations.upcoming : 
          activeTab === "past" ? consultations.past : 
          consultations.past.filter(c => c.recording)).map((consultation) => (
          <VirtualConsultationCard
            key={consultation.id}
            consultation={consultation}
            onJoinCall={() => handleJoinCall(consultation)}
            onSchedule={() => handleScheduleConsultation()}
            onMessage={() => {}}
          />
        ))}
        
        {((activeTab === "upcoming" && consultations.upcoming.length === 0) ||
          (activeTab === "past" && consultations.past.length === 0) ||
          (activeTab === "recordings" && consultations.past.filter(c => c.recording).length === 0)) && (
          <div className="text-center py-12 md:py-16">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />
            </div>
            <h3 className="text-lg md:text-xl font-medium text-slate-900 mb-2">
              No {activeTab} consultations
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm md:text-base">
              {activeTab === "upcoming" 
                ? "Schedule a virtual consultation with a hospital department to get started."
                : "Your past hospital consultations will appear here."
              }
            </p>
            <button
              onClick={() => handleScheduleConsultation()}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg transition-all"
            >
              Schedule Hospital Consultation
            </button>
          </div>
        )}
      </div>

      {/* Hospital Telemedicine Features */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Hospital Telemedicine Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Hospital-Grade Security</h4>
            <p className="text-slate-600 text-sm">End-to-end encrypted connections meeting hospital security standards</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Integrated Medical Records</h4>
            <p className="text-slate-600 text-sm">All consultations automatically added to your hospital medical record</p>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Multi-Department Access</h4>
            <p className="text-slate-600 text-sm">Connect with various hospital departments from one platform</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedConsultation && (
        <VirtualConsultationRoom
          isOpen={showConsultationRoom}
          onClose={() => setShowConsultationRoom(false)}
          consultation={selectedConsultation}
        />
      )}
      
      <ScheduleConsultationModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      />
    </div>
  );
}