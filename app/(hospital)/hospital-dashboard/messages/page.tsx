// app/hospital/messages/page.tsx
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
  EllipsisVertical, DollarSign
} from "lucide-react";

// Mock data for conversations
const conversations = [
  {
    id: "1",
    patient: {
      id: "P-001234",
      name: "John Doe",
      phone: "+234 801 234 5678",
      avatarColor: "bg-blue-500",
      lastVisit: "Today"
    },
    lastMessage: {
      text: "Doctor said I should take the medication twice daily",
      sender: "patient",
      time: "2:30 PM",
      read: true
    },
    unreadCount: 0,
    isPinned: true,
    isArchived: false,
    lastActive: "2 min ago"
  },
  {
    id: "2",
    patient: {
      id: "P-001235",
      name: "Mary Johnson",
      phone: "+234 802 345 6789",
      avatarColor: "bg-purple-500",
      lastVisit: "Yesterday"
    },
    lastMessage: {
      text: "When will my lab results be ready?",
      sender: "patient",
      time: "11:45 AM",
      read: false
    },
    unreadCount: 3,
    isPinned: false,
    isArchived: false,
    lastActive: "30 min ago"
  },
  {
    id: "3",
    patient: {
      id: "P-001236",
      name: "David Smith",
      phone: "+234 803 456 7890",
      avatarColor: "bg-green-500",
      lastVisit: "Nov 14, 2024"
    },
    lastMessage: {
      text: "Prescription sent successfully. Please proceed to pharmacy",
      sender: "receptionist",
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
    patient: {
      id: "P-001237",
      name: "Sarah Williams",
      phone: "+234 804 567 8901",
      avatarColor: "bg-pink-500",
      lastVisit: "Nov 13, 2024"
    },
    lastMessage: {
      text: "Your appointment has been rescheduled to 3 PM",
      sender: "receptionist",
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
    patient: {
      id: "P-001238",
      name: "Peter Parker",
      phone: "+234 805 678 9012",
      avatarColor: "bg-orange-500",
      lastVisit: "Nov 12, 2024"
    },
    lastMessage: {
      text: "Thank you for the prescription!",
      sender: "patient",
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
    text: "Hello, I have a question about my prescription",
    time: "10:30 AM",
    read: true,
    type: "text"
  },
  {
    id: "2",
    sender: "receptionist",
    text: "Hello John, how can I help you today?",
    time: "10:32 AM",
    read: true,
    type: "text"
  },
  {
    id: "3",
    sender: "patient",
    text: "The doctor prescribed Lisinopril but I'm not sure about the dosage",
    time: "10:33 AM",
    read: true,
    type: "text"
  },
  {
    id: "4",
    sender: "receptionist",
    text: "Lisinopril 10mg, once daily in the morning with food",
    time: "10:35 AM",
    read: true,
    type: "text"
  },
  {
    id: "5",
    sender: "receptionist",
    text: "Here's your prescription details:\n\nMedication: Lisinopril\nDosage: 10mg\nFrequency: Once daily\nDuration: 30 days\nInstructions: Take with food in the morning",
    time: "10:36 AM",
    read: true,
    type: "prescription"
  },
  {
    id: "6",
    sender: "patient",
    text: "Thank you! That's very clear",
    time: "10:37 AM",
    read: true,
    type: "text"
  },
  {
    id: "7",
    sender: "receptionist",
    text: "You can collect it from the pharmacy or choose home delivery",
    time: "10:38 AM",
    read: true,
    type: "text"
  }
];

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showMoreTabs, setShowMoreTabs] = useState(false);
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
    conv.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.patient.phone.includes(searchQuery) ||
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
      sender: "receptionist",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "text"
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");

    // Simulate patient reply after 2 seconds
    setTimeout(() => {
      const autoReply = {
        id: (Date.now() + 1).toString(),
        sender: "patient",
        text: "Thank you for your response",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: true,
        type: "text"
      };
      setMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  // Handle sending a prescription template
  const handleSendPrescription = () => {
    const prescriptionMsg = {
      id: Date.now().toString(),
      sender: "receptionist",
      text: "Prescription Details:\n\nMedication: Amoxicillin\nDosage: 500mg\nFrequency: Three times daily\nDuration: 7 days\nInstructions: Take before meals\nRefills: 0\nPrescribed by: Dr. Adebola Johnson",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "prescription"
    };

    setMessages(prev => [...prev, prescriptionMsg]);
    setShowAttachmentMenu(false);
  };

  // Handle sending appointment reminder
  const handleSendAppointmentReminder = () => {
    const appointmentMsg = {
      id: Date.now().toString(),
      sender: "receptionist",
      text: "Appointment Reminder:\n\nDate: Tomorrow, Nov 16, 2024\nTime: 10:30 AM\nDoctor: Dr. Chioma Okafor\nDepartment: General Medicine\nLocation: Room 305\nPlease arrive 15 minutes early",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "appointment"
    };

    setMessages(prev => [...prev, appointmentMsg]);
    setShowAttachmentMenu(false);
  };

  // Handle sending payment link
  const handleSendPaymentLink = () => {
    const paymentMsg = {
      id: Date.now().toString(),
      sender: "receptionist",
      text: "Payment Request:\n\nAmount: ₦15,000\nDescription: Consultation & Lab Tests\nDue Date: Today\nPayment Link: https://pay.healthbridge.ng/abc123\nYou can pay via Remita, card, or transfer",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "payment"
    };

    setMessages(prev => [...prev, paymentMsg]);
    setShowAttachmentMenu(false);
  };

  // Get active tab data
  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Communicate with patients via secure messaging</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 sm:px-4 sm:py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm sm:text-base">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm sm:text-base">
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">New Group</span>
            <span className="sm:hidden">Group</span>
          </button>
        </div>
      </div>

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
                  placeholder="Search patients..."
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
                      {/* FIXED LINE: Check if count exists and is greater than 0 */}
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
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${conversation.patient.avatarColor} flex items-center justify-center text-white font-bold text-lg`}>
                            {conversation.patient.name.charAt(0)}
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
                                {conversation.patient.name}
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
                            <div className={`text-xs sm:text-sm truncate ${
                              conversation.unreadCount > 0 ? 'text-slate-900 font-medium' : 'text-slate-600'
                            }`}>
                              {conversation.lastMessage.sender === 'receptionist' ? (
                                <span className="text-blue-600 font-medium">You: </span>
                              ) : (
                                <span className="text-slate-900 font-medium">{conversation.patient.name.split(' ')[0]}: </span>
                              )}
                              {conversation.lastMessage.text}
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <div className="text-xs text-slate-500 truncate">
                              <span className="hidden sm:inline">{conversation.patient.phone}</span>
                              <span className="sm:hidden">{conversation.patient.phone.replace('+234 ', '')}</span>
                              <span className="mx-1 hidden sm:inline">•</span>
                              <span className="sm:inline">Last visit: {conversation.patient.lastVisit}</span>
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
                    {searchQuery ? 'Try a different search term' : 'Start a new conversation'}
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
                    
                    {/* Patient Info */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full ${selectedConversation?.patient.avatarColor} flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg flex-shrink-0`}>
                        {selectedConversation?.patient.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm sm:text-base truncate">
                          {selectedConversation?.patient.name}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 truncate">
                          <span className="hidden sm:inline">ID: {selectedConversation?.patient.id} • </span>
                          {selectedConversation?.patient.phone}
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
                        className={`flex ${message.sender === 'receptionist' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                            message.sender === 'receptionist'
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none'
                              : 'bg-slate-100 text-slate-900 rounded-bl-none'
                          }`}
                        >
                          {/* Prescription Message */}
                          {message.type === 'prescription' && (
                            <div className="mb-2 p-2 sm:p-3 rounded-lg bg-white/10 border border-white/20">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-bold text-sm sm:text-base">Prescription</span>
                              </div>
                              <pre className="text-xs sm:text-sm whitespace-pre-wrap font-sans">{message.text}</pre>
                            </div>
                          )}

                          {/* Appointment Message */}
                          {message.type === 'appointment' && (
                            <div className="mb-2 p-2 sm:p-3 rounded-lg bg-white/10 border border-white/20">
                              <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-bold text-sm sm:text-base">Appointment Details</span>
                              </div>
                              <pre className="text-xs sm:text-sm whitespace-pre-wrap font-sans">{message.text}</pre>
                            </div>
                          )}

                          {/* Payment Message */}
                          {message.type === 'payment' && (
                            <div className="mb-2 p-2 sm:p-3 rounded-lg bg-white/10 border border-white/20">
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-bold text-sm sm:text-base">Payment Request</span>
                              </div>
                              <pre className="text-xs sm:text-sm whitespace-pre-wrap font-sans">{message.text}</pre>
                            </div>
                          )}

                          {/* Regular Text Message */}
                          {message.type === 'text' && (
                            <p className="whitespace-pre-wrap text-sm sm:text-base">{message.text}</p>
                          )}

                          {/* Message Meta */}
                          <div className={`flex items-center justify-end gap-2 mt-1 sm:mt-2 text-xs ${
                            message.sender === 'receptionist' ? 'text-white/80' : 'text-slate-500'
                          }`}>
                            <span>{message.time}</span>
                            {message.sender === 'receptionist' && (
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
                      onClick={handleSendPrescription}
                      className="px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Prescription</span>
                      <span className="xs:hidden">Rx</span>
                    </button>
                    <button 
                      onClick={handleSendAppointmentReminder}
                      className="px-2 py-1.5 sm:px-3 sm:py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Appointment</span>
                      <span className="xs:hidden">Appt</span>
                    </button>
                    <button 
                      onClick={handleSendPaymentLink}
                      className="px-2 py-1.5 sm:px-3 sm:py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Payment</span>
                      <span className="xs:hidden">Pay</span>
                    </button>
                    <button className="px-2 py-1.5 sm:px-3 sm:py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <PhoneCall className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Call</span>
                      <span className="xs:hidden">Call</span>
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
                              onClick={handleSendPrescription}
                              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 sm:gap-3"
                            >
                              <FileText className="w-4 h-4 text-blue-600" />
                              <div className="min-w-0">
                                <div className="font-medium text-slate-900 text-sm sm:text-base">Prescription</div>
                                <div className="text-xs text-slate-600 truncate">Send medication details</div>
                              </div>
                            </button>
                            <button 
                              onClick={handleSendAppointmentReminder}
                              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 sm:gap-3"
                            >
                              <Calendar className="w-4 h-4 text-green-600" />
                              <div className="min-w-0">
                                <div className="font-medium text-slate-900 text-sm sm:text-base">Appointment</div>
                                <div className="text-xs text-slate-600 truncate">Send appointment details</div>
                              </div>
                            </button>
                            <button 
                              onClick={handleSendPaymentLink}
                              className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 sm:gap-3"
                            >
                              <DollarSign className="w-4 h-4 text-purple-600" />
                              <div className="min-w-0">
                                <div className="font-medium text-slate-900 text-sm sm:text-base">Payment</div>
                                <div className="text-xs text-slate-600 truncate">Send payment request</div>
                              </div>
                            </button>
                            <button className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-left rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 sm:gap-3">
                              <Image className="w-4 h-4 text-orange-600" />
                              <div className="min-w-0">
                                <div className="font-medium text-slate-900 text-sm sm:text-base">Image</div>
                                <div className="text-xs text-slate-600 truncate">Send photo/document</div>
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">Select a conversation</h3>
              <p className="text-slate-600 mb-6">
                Choose a patient from the list to start chatting, send prescriptions, or share important updates.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border border-slate-200">
                  <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-medium text-slate-900">Prescriptions</div>
                  <div className="text-sm text-slate-600">Send medication details</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200">
                  <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="font-medium text-slate-900">Appointments</div>
                  <div className="text-sm text-slate-600">Share appointment details</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200">
                  <DollarSign className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-medium text-slate-900">Payments</div>
                  <div className="text-sm text-slate-600">Send payment links</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}