// app/patient/messages/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, MessageSquare, User, Clock,
  ChevronRight, MoreVertical, Phone, Video,
  Paperclip, Smile, Send, Check, CheckCheck,
  X, Maximize2, Minimize2, Archive, Trash2,
  Star, StarOff, Volume2, VolumeX, Bell,
  Download, Printer, Eye, Copy, Info,
  Calendar, MapPin, PhoneCall, Mail,
  AlertCircle, Shield, Lock, ExternalLink,
  ArrowLeft, Plus, Users, UserPlus,
  Camera, Mic, FileText, Image,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  EllipsisVertical, DollarSign, Stethoscope,
  Building, UserCheck, FileQuestion, Receipt
} from "lucide-react";

// Mock data for conversations (from patient's perspective)
const conversations = [
  {
    id: "1",
    contact: {
      id: "DOC-001",
      name: "Dr. Adebola Johnson",
      role: "General Physician",
      department: "General Medicine",
      avatarColor: "bg-blue-500",
      lastOnline: "Online"
    },
    lastMessage: {
      text: "Please remember to take your medication with food",
      sender: "doctor",
      time: "2:30 PM",
      read: true
    },
    unreadCount: 0,
    isPinned: true,
    isArchived: false,
    lastActive: "Just now"
  },
  {
    id: "2",
    contact: {
      id: "REC-001",
      name: "Reception Desk",
      role: "Hospital Reception",
      department: "Administration",
      avatarColor: "bg-purple-500",
      lastOnline: "Online"
    },
    lastMessage: {
      text: "Your lab results are ready for review",
      sender: "reception",
      time: "11:45 AM",
      read: false
    },
    unreadCount: 2,
    isPinned: false,
    isArchived: false,
    lastActive: "15 min ago"
  },
  {
    id: "3",
    contact: {
      id: "PHARM-001",
      name: "Pharmacy Department",
      role: "Medication & Prescriptions",
      department: "Pharmacy",
      avatarColor: "bg-green-500",
      lastOnline: "Away"
    },
    lastMessage: {
      text: "Your prescription is ready for pickup",
      sender: "pharmacy",
      time: "10:15 AM",
      read: true
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    lastActive: "1 hour ago"
  },
  {
    id: "4",
    contact: {
      id: "LAB-001",
      name: "Lab Department",
      role: "Laboratory Services",
      department: "Pathology",
      avatarColor: "bg-pink-500",
      lastOnline: "Online"
    },
    lastMessage: {
      text: "Please fast for 12 hours before your blood test",
      sender: "lab",
      time: "Yesterday",
      read: true
    },
    unreadCount: 0,
    isPinned: true,
    isArchived: false,
    lastActive: "2 hours ago"
  },
  {
    id: "5",
    contact: {
      id: "BILL-001",
      name: "Billing Department",
      role: "Payments & Invoices",
      department: "Finance",
      avatarColor: "bg-orange-500",
      lastOnline: "Offline"
    },
    lastMessage: {
      text: "Your invoice for November consultation is ready",
      sender: "billing",
      time: "Nov 12",
      read: true
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: true,
    lastActive: "2 days ago"
  }
];

// Mock messages for a conversation
const mockMessages = [
  {
    id: "1",
    sender: "patient",
    text: "Hello Doctor, I have some concerns about my medication",
    time: "10:30 AM",
    read: true,
    type: "text"
  },
  {
    id: "2",
    sender: "doctor",
    text: "Hello John, what seems to be the issue?",
    time: "10:32 AM",
    read: true,
    type: "text"
  },
  {
    id: "3",
    sender: "patient",
    text: "I'm experiencing dizziness after taking Lisinopril",
    time: "10:33 AM",
    read: true,
    type: "text"
  },
  {
    id: "4",
    sender: "doctor",
    text: "That can be a common side effect. Are you taking it with food?",
    time: "10:35 AM",
    read: true,
    type: "text"
  },
  {
    id: "5",
    sender: "doctor",
    text: "Prescription Update:\n\nMedication: Lisinopril\nDosage: Reduce to 5mg\nFrequency: Once daily\nInstructions: Take with breakfast\nFollow-up: In 2 weeks",
    time: "10:36 AM",
    read: true,
    type: "prescription"
  },
  {
    id: "6",
    sender: "patient",
    text: "Thank you doctor, I'll follow these instructions",
    time: "10:37 AM",
    read: true,
    type: "text"
  },
  {
    id: "7",
    sender: "doctor",
    text: "Let me know if dizziness persists after 3 days",
    time: "10:38 AM",
    read: true,
    type: "text"
  }
];

// Patient information
const patientInfo = {
  name: "John Doe",
  id: "P-001234",
  age: "35",
  bloodType: "O+",
  lastAppointment: "Nov 14, 2024",
  nextAppointment: "Nov 28, 2024",
  primaryDoctor: "Dr. Adebola Johnson"
};

export default function PatientMessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showMoreTabs, setShowMoreTabs] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(mockMessages);

  const tabs = [
    { id: "all", label: "All", count: conversations.filter(c => !c.isArchived).length },
    { id: "unread", label: "Unread", count: conversations.filter(c => c.unreadCount > 0).length },
    { id: "pinned", label: "Pinned", count: conversations.filter(c => c.isPinned).length },
    { id: "archived", label: "Archived", count: conversations.filter(c => c.isArchived).length }
  ];

  // Filter conversations based on active tab
  const filteredConversations = conversations.filter(conv => {
    if (activeTab === "unread") return conv.unreadCount > 0;
    if (activeTab === "pinned") return conv.isPinned;
    if (activeTab === "archived") return conv.isArchived;
    if (activeTab === "all") return !conv.isArchived;
    return true;
  });

  // Filter by search
  const searchedConversations = filteredConversations.filter(conv =>
    conv.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.contact.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: "patient",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "text"
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");

    // Simulate doctor reply after 2 seconds
    setTimeout(() => {
      const autoReply = {
        id: (Date.now() + 1).toString(),
        sender: "doctor",
        text: "Thank you for your message. I'll get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
        type: "text"
      };
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  // Handle sending a question
  const handleSendQuestion = () => {
    const questionMsg = {
      id: Date.now().toString(),
      sender: "patient",
      text: "I have a question about:\n\n- Medication side effects\n- Appointment scheduling\n- Test results interpretation\n- Billing inquiries",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "question"
    };

    setMessages(prev => [...prev, questionMsg]);
    setShowAttachmentMenu(false);
  };

  // Handle sending symptoms
  const handleSendSymptoms = () => {
    const symptomsMsg = {
      id: Date.now().toString(),
      sender: "patient",
      text: "Current Symptoms:\n\n- Headache (moderate)\n- Dizziness when standing\n- Mild nausea\n- Fatigue\nStarted: Yesterday\nSeverity: 5/10",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "symptoms"
    };

    setMessages(prev => [...prev, symptomsMsg]);
    setShowAttachmentMenu(false);
  };

  // Handle sending medication photo
  const handleSendMedicationPhoto = () => {
    const medicationMsg = {
      id: Date.now().toString(),
      sender: "patient",
      text: "Medication Photo Sent\n\nPlease review my current medication. I'm not sure if I'm taking the correct dosage.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "medication"
    };

    setMessages(prev => [...prev, medicationMsg]);
    setShowAttachmentMenu(false);
  };

  // Get active tab data
  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">My Messages</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Communicate with your healthcare team</p>
        </div>
        
        {/* Patient Quick Info */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPatientInfo(!showPatientInfo)}
            className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm sm:text-base"
          >
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>My Info</span>
          </button>
          <button className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">New Conversation</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Patient Info Panel */}
      <AnimatePresence>
        {showPatientInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">
                    JD
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{patientInfo.name}</h3>
                    <p className="text-sm text-slate-600">Patient ID: {patientInfo.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 max-w-2xl">
                  <div className="bg-white/80 rounded-lg p-3">
                    <div className="text-xs text-slate-500">Age</div>
                    <div className="font-semibold text-slate-900">{patientInfo.age} years</div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3">
                    <div className="text-xs text-slate-500">Blood Type</div>
                    <div className="font-semibold text-slate-900">{patientInfo.bloodType}</div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3">
                    <div className="text-xs text-slate-500">Last Visit</div>
                    <div className="font-semibold text-slate-900">{patientInfo.lastAppointment}</div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3">
                    <div className="text-xs text-slate-500">Next Appointment</div>
                    <div className="font-semibold text-slate-900">{patientInfo.nextAppointment}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left Column - Conversations List */}
        <div className={`${showChat ? 'hidden lg:block' : 'block'} lg:w-1/3 xl:w-1/4 flex flex-col`}>
          <div className="bg-white rounded-xl border border-slate-200 flex-1 flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search doctors, departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm sm:text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Tabs - Fixed Responsiveness */}
            <div className="border-b border-slate-200">
              <div className="relative overflow-hidden">
                {/* Desktop Tabs - Full width grid */}
                <div className="hidden sm:grid grid-cols-4">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-2 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center justify-center ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {tab.count > 0 && (
                        <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Mobile Tabs - Scrollable */}
                <div className="sm:hidden">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium text-slate-900 truncate">
                        {activeTabData?.label}
                      </span>
                      {activeTabData?.count && activeTabData.count > 0 && (
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full flex-shrink-0">
                          {activeTabData.count}
                        </span>
                      )}
                    </div>
                    
                    <div className="relative flex-shrink-0">
                      <button
                        onClick={() => setShowMoreTabs(!showMoreTabs)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                        aria-label="More tabs"
                      >
                        <EllipsisVertical className="w-5 h-5 text-slate-600" />
                      </button>
                      
                      <AnimatePresence>
                        {showMoreTabs && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 mt-2 bg-white rounded-xl border border-slate-200 shadow-lg z-20 min-w-[140px]"
                          >
                            {tabs.map(tab => (
                              <button
                                key={tab.id}
                                onClick={() => {
                                  setActiveTab(tab.id);
                                  setShowMoreTabs(false);
                                }}
                                className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-50 transition-colors ${
                                  activeTab === tab.id ? 'bg-blue-50' : ''
                                }`}
                              >
                                <span className="text-sm font-medium">{tab.label}</span>
                                {tab.count > 0 && (
                                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                                    activeTab === tab.id
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}>
                                    {tab.count}
                                  </span>
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  
                  {/* Alternative: Scrollable tabs for small screens */}
                  <div className="flex overflow-x-auto px-2 pb-2 scrollbar-hide">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                        {tab.count > 0 && (
                          <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                            activeTab === tab.id
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {searchedConversations.length > 0 ? (
                <div className="divide-y divide-slate-200">
                  {searchedConversations.map(conversation => (
                    <button
                      key={conversation.id}
                      onClick={() => {
                        setSelectedConversation(conversation);
                        setShowChat(true);
                      }}
                      className={`w-full p-3 sm:p-4 text-left hover:bg-slate-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${conversation.contact.avatarColor} flex items-center justify-center text-white font-bold text-lg`}>
                            {conversation.contact.name.charAt(0)}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                            conversation.contact.lastOnline === 'Online' ? 'bg-green-500' :
                            conversation.contact.lastOnline === 'Away' ? 'bg-yellow-500' : 'bg-slate-400'
                          }`}>
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                              <span className="text-xs text-white font-bold">{conversation.unreadCount}</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                            <div className="flex items-center gap-2">
                              <div className="font-medium text-slate-900 truncate text-sm sm:text-base">
                                {conversation.contact.name}
                              </div>
                              {conversation.isPinned && (
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                              )}
                            </div>
                            <div className="text-xs text-slate-500 whitespace-nowrap flex-shrink-0">
                              {conversation.lastMessage.time}
                            </div>
                          </div>
                          
                          <div className="mb-1">
                            <div className="text-xs text-slate-600 truncate mb-1">
                              {conversation.contact.role} • {conversation.contact.department}
                            </div>
                            <div className={`text-xs sm:text-sm truncate ${
                              conversation.unreadCount > 0 ? 'text-slate-900 font-medium' : 'text-slate-600'
                            }`}>
                              {conversation.lastMessage.sender !== 'patient' ? (
                                <span className={`${
                                  conversation.lastMessage.sender === 'doctor' ? 'text-blue-600' :
                                  conversation.lastMessage.sender === 'reception' ? 'text-purple-600' :
                                  conversation.lastMessage.sender === 'pharmacy' ? 'text-green-600' :
                                  conversation.lastMessage.sender === 'lab' ? 'text-pink-600' :
                                  'text-orange-600'
                                } font-medium`}>
                                  {conversation.lastMessage.sender}: 
                                </span>
                              ) : (
                                <span className="text-slate-900 font-medium">You: </span>
                              )}
                              {conversation.lastMessage.text}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div className="text-xs text-slate-500 truncate">
                              Status: {conversation.contact.lastOnline}
                            </div>
                            <div className="text-xs text-slate-400 whitespace-nowrap">
                              {conversation.lastActive}
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 sm:p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 text-sm sm:text-base">No conversations found</p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {searchQuery ? 'Try a different search term' : 'Start a new conversation with your healthcare team'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Back Button when chat is open */}
          {showChat && (
            <button
              onClick={() => setShowChat(false)}
              className="lg:hidden mt-4 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back to Conversations
            </button>
          )}
        </div>

        {/* Right Column - Chat Interface */}
        <AnimatePresence>
          {(showChat || selectedConversation) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} ${
                showChat ? 'block' : 'hidden lg:block'
              } lg:flex-1 flex flex-col`}
            >
              <div className={`${isFullscreen ? 'h-screen' : 'h-full'} bg-white rounded-xl border border-slate-200 flex flex-col`}>
                {/* Chat Header */}
                <div className="p-3 sm:p-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setShowChat(false)}
                      className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    
                    {/* Contact Info */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="relative">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ${selectedConversation?.contact.avatarColor} flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg flex-shrink-0`}>
                          {selectedConversation?.contact.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white ${
                          selectedConversation?.contact.lastOnline === 'Online' ? 'bg-green-500' :
                          selectedConversation?.contact.lastOnline === 'Away' ? 'bg-yellow-500' : 'bg-slate-400'
                        }`}></div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm sm:text-base truncate">
                          {selectedConversation?.contact.name}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 truncate">
                          {selectedConversation?.contact.role} • {selectedConversation?.contact.department}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </button>
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Video className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </button>
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </button>
                    <button 
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors hidden sm:flex"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      ) : (
                        <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      )}
                    </button>
                    <button className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    </button>
                    {isFullscreen && (
                      <button
                        onClick={() => setIsFullscreen(false)}
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                  <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                            message.sender === 'patient'
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none'
                              : 'bg-slate-100 text-slate-900 rounded-bl-none'
                          }`}
                        >
                          {/* Prescription Message (from doctor) */}
                          {message.type === 'prescription' && (
                            <div className={`mb-2 p-2 sm:p-3 rounded-lg ${
                              message.sender === 'patient' ? 'bg-white/10 border border-white/20' : 'bg-blue-50 border border-blue-100'
                            }`}>
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-bold text-sm sm:text-base">Updated Prescription</span>
                              </div>
                              <pre className="text-xs sm:text-sm whitespace-pre-wrap font-sans">{message.text}</pre>
                              <div className="mt-2 pt-2 border-t border-white/20 flex gap-2">
                                <button className="text-xs px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors">
                                  Save
                                </button>
                                <button className="text-xs px-2 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors">
                                  Ask Questions
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Question Message (from patient) */}
                          {message.type === 'question' && (
                            <div className="mb-2 p-2 sm:p-3 rounded-lg bg-white/10 border border-white/20">
                              <div className="flex items-center gap-2 mb-2">
                                <FileQuestion className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-bold text-sm sm:text-base">Questions</span>
                              </div>
                              <pre className="text-xs sm:text-sm whitespace-pre-wrap font-sans">{message.text}</pre>
                            </div>
                          )}

                          {/* Symptoms Message (from patient) */}
                          {message.type === 'symptoms' && (
                            <div className="mb-2 p-2 sm:p-3 rounded-lg bg-white/10 border border-white/20">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-bold text-sm sm:text-base">Symptoms Update</span>
                              </div>
                              <pre className="text-xs sm:text-sm whitespace-pre-wrap font-sans">{message.text}</pre>
                            </div>
                          )}

                          {/* Medication Photo Message (from patient) */}
                          {message.type === 'medication' && (
                            <div className="mb-2 p-2 sm:p-3 rounded-lg bg-white/10 border border-white/20">
                              <div className="flex items-center gap-2 mb-2">
                                <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-bold text-sm sm:text-base">Medication Photo</span>
                              </div>
                              <pre className="text-xs sm:text-sm whitespace-pre-wrap font-sans">{message.text}</pre>
                              <div className="mt-2 aspect-video bg-black/20 rounded flex items-center justify-center">
                                <div className="text-center">
                                  <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                  <p className="text-xs">medication_photo.jpg</p>
                                  <p className="text-xs opacity-70">Tap to view</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Regular Text Message */}
                          {message.type === 'text' && (
                            <p className="whitespace-pre-wrap text-sm sm:text-base">{message.text}</p>
                          )}

                          {/* Message Meta */}
                          <div className={`flex items-center justify-end gap-2 mt-1 sm:mt-2 text-xs ${
                            message.sender === 'patient' ? 'text-white/80' : 'text-slate-500'
                          }`}>
                            <span>{message.time}</span>
                            {message.sender === 'patient' && (
                              message.read ? (
                                <CheckCheck className="w-3 h-3" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Quick Actions Bar */}
                <div className="p-2 sm:p-3 border-t border-slate-200">
                  <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                    <button 
                      onClick={handleSendQuestion}
                      className="px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <FileQuestion className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Questions</span>
                      <span className="xs:hidden">Q&A</span>
                    </button>
                    <button 
                      onClick={handleSendSymptoms}
                      className="px-2 py-1.5 sm:px-3 sm:py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Symptoms</span>
                      <span className="xs:hidden">Symptoms</span>
                    </button>
                    <button 
                      onClick={handleSendMedicationPhoto}
                      className="px-2 py-1.5 sm:px-3 sm:py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Medication</span>
                      <span className="xs:hidden">Meds</span>
                    </button>
                    <button className="px-2 py-1.5 sm:px-3 sm:py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <Receipt className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Bill</span>
                      <span className="xs:hidden">Bill</span>
                    </button>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-3 sm:p-4 border-t border-slate-200">
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Attachment Button */}
                    <div className="relative">
                      <button
                        onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                        className="p-2 sm:p-3 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                      >
                        <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      </button>
                      
                      {/* Attachment Menu */}
                      <AnimatePresence>
                        {showAttachmentMenu && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute bottom-full left-0 mb-2 bg-white rounded-xl border border-slate-200 shadow-lg p-2 min-w-[180px] sm:min-w-[200px] z-10"
                          >
                            <button 
                              onClick={handleSendQuestion}
                              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 sm:gap-3"
                            >
                              <FileQuestion className="w-4 h-4 text-blue-600" />
                              <div className="min-w-0">
                                <div className="font-medium text-slate-900 text-sm sm:text-base">Questions</div>
                                <div className="text-xs text-slate-600 truncate">Ask about treatment or results</div>
                              </div>
                            </button>
                            <button 
                              onClick={handleSendSymptoms}
                              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 sm:gap-3"
                            >
                              <AlertCircle className="w-4 h-4 text-red-600" />
                              <div className="min-w-0">
                                <div className="font-medium text-slate-900 text-sm sm:text-base">Symptoms</div>
                                <div className="text-xs text-slate-600 truncate">Report new or worsening symptoms</div>
                              </div>
                            </button>
                            <button 
                              onClick={handleSendMedicationPhoto}
                              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 sm:gap-3"
                            >
                              <Camera className="w-4 h-4 text-green-600" />
                              <div className="min-w-0">
                                <div className="font-medium text-slate-900 text-sm sm:text-base">Medication Photo</div>
                                <div className="text-xs text-slate-600 truncate">Share medication for review</div>
                              </div>
                            </button>
                            <button className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 sm:gap-3">
                              <Receipt className="w-4 h-4 text-purple-600" />
                              <div className="min-w-0">
                                <div className="font-medium text-slate-900 text-sm sm:text-base">Billing Question</div>
                                <div className="text-xs text-slate-600 truncate">Ask about invoices or payments</div>
                              </div>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message Input */}
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message here..."
                        className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1">
                        <Smile className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>

                    {/* Send Button */}
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className={`p-2 sm:p-3 rounded-xl transition-all flex-shrink-0 ${
                        newMessage.trim()
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State when no chat is selected */}
        {!showChat && !selectedConversation && (
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="text-center max-w-md">
              <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Welcome to Patient Messaging</h3>
              <p className="text-slate-600 mb-6">
                Connect with your healthcare team. Send questions, report symptoms, or discuss your treatment plan securely.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border border-slate-200">
                  <Stethoscope className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-medium text-slate-900">Doctors</div>
                  <div className="text-sm text-slate-600">Consult with physicians</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200">
                  <Building className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="font-medium text-slate-900">Departments</div>
                  <div className="text-sm text-slate-600">Lab, pharmacy, billing</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200">
                  <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-medium text-slate-900">Secure</div>
                  <div className="text-sm text-slate-600">HIPAA compliant messaging</div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-slate-900 mb-2">Need immediate help?</h4>
                <p className="text-sm text-slate-600 mb-3">
                  For emergencies, please call our emergency line:
                </p>
                <div className="flex items-center justify-center gap-2">
                  <PhoneCall className="w-5 h-5 text-red-500" />
                  <span className="font-bold text-red-600">+234 800 123 4567</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}