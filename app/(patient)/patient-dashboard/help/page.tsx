// app/patients-dashboard/help-support/page.tsx
"use client";

import { useState } from "react";
import {
  HelpCircle, MessageSquare, Phone, Mail,
  Search, ChevronRight, ChevronDown,
  BookOpen, FileText, Video, Headphones,
  Shield, Clock, CheckCircle, AlertCircle,
  ExternalLink, MessageCircle, Smartphone,
  Globe, CreditCard, User, Calendar,
  FileQuestion, Paperclip, Camera,
  Star, Heart, ThumbsUp, ThumbsDown,
  Send, X, LifeBuoy, Zap,
  TrendingUp, Users, ShieldCheck, Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// FAQ Accordion Component
function FAQItem({ faq, isOpen, onClick }: { faq: any; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={false}
      className="border border-slate-200/50 rounded-xl lg:rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={onClick}
        className="w-full p-4 md:p-5 lg:p-6 text-left flex items-center justify-between hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
            <FileQuestion className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-sm md:text-base lg:text-lg mb-1 line-clamp-2">{faq.question}</h3>
            <p className="text-slate-600 text-xs md:text-sm truncate">{faq.category} • Updated {faq.updated}</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 lg:px-6 pb-4 md:pb-5 lg:pb-6 pt-0 md:pt-2">
              <div className="bg-slate-50/50 rounded-lg md:rounded-xl border border-slate-100 p-3 md:p-4">
                <p className="text-slate-700 text-sm md:text-base mb-3 md:mb-4">{faq.answer}</p>
                
                {faq.steps && (
                  <div className="mt-3 md:mt-4">
                    <h4 className="font-medium text-slate-900 mb-2 md:mb-3 text-sm md:text-base">Steps to follow:</h4>
                    <ol className="space-y-1.5 md:space-y-2 text-sm md:text-base">
                      {faq.steps.map((step: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 md:gap-3">
                          <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 text-blue-700 font-medium text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-slate-700 flex-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {faq.tips && (
                  <div className="mt-3 md:mt-4 p-2 md:p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                    <h4 className="font-medium text-blue-900 mb-1 text-sm md:text-base flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Pro Tip
                    </h4>
                    <p className="text-blue-800 text-xs md:text-sm">{faq.tips}</p>
                  </div>
                )}
                
                <div className="mt-3 md:mt-4 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 pt-2 md:pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2 md:gap-3 w-full xs:w-auto">
                    <button className="text-xs md:text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                      <ThumbsUp className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Helpful ({faq.helpful})</span>
                    </button>
                    <button className="text-xs md:text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                      <ThumbsDown className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Not helpful ({faq.notHelpful})</span>
                    </button>
                  </div>
                  <button className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-blue-50 transition-colors w-full xs:w-auto justify-center xs:justify-start">
                    Report issue
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Contact Card Component
function ContactCard({ contact }: { contact: any }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl lg:rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all p-4 md:p-5 lg:p-6"
    >
      <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${contact.color}`}>
          {contact.icon === 'message' && <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />}
          {contact.icon === 'phone' && <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />}
          {contact.icon === 'mail' && <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />}
          {contact.icon === 'chat' && <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-sm md:text-base lg:text-lg mb-1 line-clamp-1">{contact.title}</h3>
          <p className="text-slate-600 text-xs md:text-sm line-clamp-2">{contact.description}</p>
        </div>
      </div>
      
      <div className="space-y-2 md:space-y-3">
        <div className="text-slate-900 font-medium text-sm md:text-base truncate">{contact.detail}</div>
        <div className="text-xs md:text-sm text-slate-500 truncate">{contact.hours}</div>
        
        <div className="pt-2 md:pt-3 border-t border-slate-100">
          <button className="w-full py-2 md:py-2.5 px-3 md:px-4 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 md:gap-2 text-sm md:text-base">
            {contact.actionIcon === 'message' && <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            {contact.actionIcon === 'phone' && <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            {contact.actionIcon === 'mail' && <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            <span className="truncate">{contact.actionText}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMethod, setContactMethod] = useState<string>("chat");
  const [message, setMessage] = useState("");
  
  const categories = [
    { id: "all", label: "All Topics", icon: BookOpen, count: 48 },
    { id: "appointments", label: "Appointments", icon: Calendar, count: 12 },
    { id: "medical", label: "Medical Records", icon: FileText, count: 8 },
    { id: "billing", label: "Billing & Payments", icon: CreditCard, count: 10 },
    { id: "account", label: "Account & Profile", icon: User, count: 6 },
    { id: "technical", label: "Technical Support", icon: Smartphone, count: 8 },
    { id: "security", label: "Security & Privacy", icon: Shield, count: 4 },
  ];
  
  const faqs = [
    {
      id: 1,
      question: "How do I book a new appointment?",
      category: "Appointments",
      updated: "2 days ago",
      answer: "You can book appointments through the dashboard by clicking the 'Book Appointment' button. You'll be guided through selecting a doctor, choosing a date and time, specifying appointment type, and providing reason for visit.",
      steps: [
        "Navigate to Appointments page",
        "Click 'Book New Appointment' button",
        "Select doctor from available specialists",
        "Choose preferred date and time slot",
        "Select appointment type (consultation, follow-up, etc.)",
        "Provide reason for visit and confirm booking",
        "Make payment if required"
      ],
      tips: "Book appointments 24-48 hours in advance for best availability. Emergency appointments can be requested via phone support.",
      helpful: 42,
      notHelpful: 3
    },
    {
      id: 2,
      question: "How can I access my medical records?",
      category: "Medical Records",
      updated: "1 week ago",
      answer: "All your medical records are available in the Medical Records section. You can view, download, and share your records with authorized healthcare providers.",
      steps: [
        "Go to Medical Records page",
        "Use filters to find specific records",
        "Click 'View Details' on any record",
        "Download PDF copies if needed",
        "Share with doctors using secure link"
      ],
      tips: "Enable notifications to get alerts when new records are added by your healthcare providers.",
      helpful: 38,
      notHelpful: 2
    },
    {
      id: 3,
      question: "What payment methods are accepted?",
      category: "Billing & Payments",
      updated: "3 days ago",
      answer: "We accept multiple payment methods including credit/debit cards, bank transfers, mobile money, and our HealthBridge Wallet. Insurance claims are also processed directly with most providers.",
      steps: [
        "Credit/Debit Cards (Visa, Mastercard, Verve)",
        "Bank Transfer (All Nigerian banks)",
        "USSD payments",
        "HealthBridge Wallet",
        "Insurance direct billing"
      ],
      tips: "Save your payment method for faster checkout. Set up auto-pay for recurring prescriptions.",
      helpful: 56,
      notHelpful: 4
    },
    {
      id: 4,
      question: "How do I update my personal information?",
      category: "Account & Profile",
      updated: "1 month ago",
      answer: "You can update your personal information, contact details, and medical preferences in the Profile Settings section.",
      steps: [
        "Click on your profile picture",
        "Select 'Profile Settings'",
        "Edit personal information",
        "Update contact details",
        "Save changes"
      ],
      tips: "Keep your emergency contact information updated at all times for better care coordination.",
      helpful: 29,
      notHelpful: 1
    },
    {
      id: 5,
      question: "Is my medical data secure?",
      category: "Security & Privacy",
      updated: "2 weeks ago",
      answer: "Yes, we use end-to-end encryption and comply with healthcare data protection regulations (HIPAA/NHIP). Your data is stored securely and only accessible to you and authorized healthcare providers.",
      steps: [
        "End-to-end encryption",
        "Two-factor authentication",
        "Regular security audits",
        "Access logs tracking",
        "Data anonymization for research"
      ],
      tips: "Enable two-factor authentication for added security. Regularly review your access logs.",
      helpful: 47,
      notHelpful: 0
    },
    {
      id: 6,
      question: "How do I cancel or reschedule an appointment?",
      category: "Appointments",
      updated: "5 days ago",
      answer: "You can cancel or reschedule appointments from the Appointments page. Cancellations within 24 hours may incur fees as per hospital policy.",
      steps: [
        "Go to Appointments page",
        "Find the appointment to modify",
        "Click 'View Details'",
        "Select 'Cancel' or 'Reschedule'",
        "Follow the prompts"
      ],
      tips: "Reschedule at least 2 hours before appointment time to avoid cancellation fees.",
      helpful: 33,
      notHelpful: 5
    },
    {
      id: 7,
      question: "How do I upload my medical documents?",
      category: "Medical Records",
      updated: "2 weeks ago",
      answer: "You can upload medical documents, lab results, prescriptions, and other health records through the Medical Records page.",
      steps: [
        "Navigate to Medical Records",
        "Click 'Upload Record'",
        "Select file from device",
        "Add description and category",
        "Submit for verification"
      ],
      tips: "Upload PDF or clear images for best results. Include dates and doctor names for easy organization.",
      helpful: 41,
      notHelpful: 3
    },
    {
      id: 8,
      question: "How do I request prescription refills?",
      category: "Medical Records",
      updated: "3 days ago",
      answer: "Prescription refills can be requested through your medical records or by contacting your doctor directly through the messaging system.",
      steps: [
        "Go to Medical Records",
        "Find the prescription",
        "Click 'Request Refill'",
        "Select pharmacy for pickup",
        "Doctor reviews and approves"
      ],
      tips: "Request refills at least 3 days before you run out of medication.",
      helpful: 28,
      notHelpful: 2
    },
  ];
  
  const contactOptions = [
    {
      title: "Live Chat Support",
      description: "Instant help from our support team",
      detail: "Available 24/7",
      hours: "Average response: <2 minutes",
      icon: "chat",
      actionText: "Start Chat",
      actionIcon: "message",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      title: "Phone Support",
      description: "Speak with a support specialist",
      detail: "+234 800 123 4567",
      hours: "Mon-Fri: 7AM-10PM, Sat-Sun: 8AM-8PM",
      icon: "phone",
      actionText: "Call Now",
      actionIcon: "phone",
      color: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      title: "Email Support",
      description: "Send us your questions",
      detail: "support@healthbridge.ng",
      hours: "Response within 4 hours",
      icon: "mail",
      actionText: "Send Email",
      actionIcon: "mail",
      color: "bg-gradient-to-br from-purple-500 to-violet-500"
    },
    {
      title: "Emergency Hotline",
      description: "For urgent medical concerns",
      detail: "+234 700 911 911",
      hours: "24/7 Emergency line",
      icon: "phone",
      actionText: "Emergency Call",
      actionIcon: "phone",
      color: "bg-gradient-to-br from-red-500 to-rose-500"
    },
  ];
  
  const guides = [
    {
      title: "Getting Started Guide",
      description: "Learn how to navigate the HealthBridge platform",
      icon: BookOpen,
      type: "PDF Guide",
      duration: "10 min read",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features",
      icon: Video,
      type: "Video Series",
      duration: "15 videos",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Security Best Practices",
      description: "How to keep your health data secure",
      icon: Shield,
      type: "Security Guide",
      duration: "8 min read",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Mobile App Guide",
      description: "Using HealthBridge on your phone",
      icon: Smartphone,
      type: "Mobile Guide",
      duration: "12 min read",
      color: "from-orange-500 to-amber-500"
    },
  ];
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category.toLowerCase().includes(activeCategory);
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleFAQClick = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };
  
  const handleSubmitContact = () => {
    console.log("Contact submitted:", { contactMethod, message });
    setShowContactModal(false);
    setMessage("");
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Help & Support</h1>
            <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg max-w-3xl">
              Get help with HealthBridge. Find answers, guides, and contact support.
            </p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowContactModal(true)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 justify-center text-sm sm:text-base"
            >
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="truncate">Contact Support</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 md:py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center text-sm sm:text-base"
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="truncate hidden sm:inline">Guides</span>
              <span className="truncate sm:hidden">Help</span>
            </motion.button>
          </div>
        </div>
        
        {/* Stats & Quick Help */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl md:rounded-2xl border border-blue-100 p-4 md:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">24/7</div>
                <div className="text-xs md:text-sm text-slate-600 truncate">Support Available</div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Headphones className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <div className="mt-2 md:mt-3 text-xs md:text-sm text-blue-700 flex items-center gap-1">
              <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="truncate">Live chat always online</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl border border-green-100 p-4 md:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">&lt;2 min</div>
                <div className="text-xs md:text-sm text-slate-600 truncate">Avg. Response</div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <div className="mt-2 md:mt-3 text-xs md:text-sm text-green-700 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="truncate">Fastest in healthcare</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl md:rounded-2xl border border-purple-100 p-4 md:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">98%</div>
                <div className="text-xs md:text-sm text-slate-600 truncate">Satisfaction</div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <div className="mt-2 md:mt-3 text-xs md:text-sm text-purple-700 flex items-center gap-1">
              <Heart className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="truncate">Rated excellent</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl md:rounded-2xl border border-orange-100 p-4 md:p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">48</div>
                <div className="text-xs md:text-sm text-slate-600 truncate">Help Articles</div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <div className="mt-2 md:mt-3 text-xs md:text-sm text-orange-700 truncate">
              Updated regularly
            </div>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-5 lg:p-6 mb-6 md:mb-8">
          <div className="text-center mb-4 md:mb-6 lg:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3 md:mb-4">
              <HelpCircle className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-2">How can we help you today?</h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto px-2">
              Search our knowledge base for answers to common questions, or contact our support team for personalized help.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-3xl mx-auto">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you need help with? Try 'appointment booking', 'medical records', 'payment issues'..."
              className="w-full pl-10 md:pl-12 pr-24 md:pr-28 py-3 md:py-4 rounded-xl md:rounded-2xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm md:text-base"
            />
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all text-sm md:text-base">
              Search
            </button>
          </div>
          
          {/* Popular Searches */}
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-slate-600 text-sm md:text-base mb-2 md:mb-3">Popular searches:</p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
              {["Book appointment", "Download record", "Cancel appointment", "Update profile", "Payment", "Password", "Share", "Emergency"].map((term, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(term.includes(" ") ? term : term === "Password" ? "Reset password" : term === "Share" ? "Share records" : term)}
                  className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs md:text-sm whitespace-nowrap"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Categories & FAQ */}
          <div className="xl:col-span-2 space-y-6 md:space-y-8">
            {/* FAQ Categories */}
            <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-5 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Browse by Category</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View all
                  <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`p-2 md:p-3 rounded-lg md:rounded-xl border transition-all text-left ${
                        isActive
                          ? "border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-1 md:gap-2">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                          isActive 
                            ? "bg-gradient-to-br from-blue-500 to-cyan-500" 
                            : "bg-slate-100"
                        }`}>
                          <Icon className={`w-4 h-4 md:w-5 md:h-5 ${
                            isActive ? "text-white" : "text-slate-600"
                          }`} />
                        </div>
                        <div>
                          <h3 className={`font-medium text-xs md:text-sm ${
                            isActive ? "text-blue-900" : "text-slate-900"
                          }`}>
                            {category.label.split(" ")[0]}
                          </h3>
                          <span className={`px-1 py-0.5 rounded-full text-xs ${
                            isActive
                              ? "bg-blue-100 text-blue-600"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-5 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg md:text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
                  <p className="text-slate-600 text-sm md:text-base mt-1">
                    {filteredFAQs.length} questions found {searchQuery && `for "${searchQuery}"`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                    <Download className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq) => (
                    <FAQItem
                      key={faq.id}
                      faq={faq}
                      isOpen={openFAQ === faq.id}
                      onClick={() => handleFAQClick(faq.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 md:py-12 lg:py-16">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <FileQuestion className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-slate-900 mb-1 md:mb-2">No results found</h3>
                    <p className="text-slate-600 text-sm md:text-base mb-4 md:mb-6 max-w-md mx-auto px-2">
                      {searchQuery ? `We couldn't find any FAQs matching "${searchQuery}". Try different keywords.` : 'No FAQs available for this category.'}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                      }}
                      className="px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg transition-all text-sm md:text-base"
                    >
                      View All FAQs
                    </button>
                  </div>
                )}
              </div>
              
              {filteredFAQs.length > 0 && (
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
                    <p className="text-slate-600 text-sm md:text-base text-center sm:text-left">
                      Didn't find what you were looking for?
                    </p>
                    <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => setShowContactModal(true)}
                        className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 md:gap-2 text-sm md:text-base justify-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Contact Support
                      </button>
                      <button
                        onClick={() => {}}
                        className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-1.5 md:gap-2 text-sm md:text-base justify-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        Submit Request
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Quick Guides */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl md:rounded-2xl border border-slate-200 p-4 md:p-5 lg:p-6">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6">Quick Guides & Resources</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {guides.map((guide, index) => {
                  const Icon = guide.icon;
                  
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all p-3 md:p-4 text-left"
                    >
                      <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1 line-clamp-1">{guide.title}</h3>
                          <p className="text-slate-600 text-xs md:text-sm line-clamp-2">{guide.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {guide.type}
                        </span>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {guide.duration}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              
              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-4">
                  <p className="text-slate-600 text-sm md:text-base text-center sm:text-left">Need more detailed documentation?</p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm md:text-base">
                    Visit Documentation Center
                    <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact & Support */}
          <div className="space-y-6 md:space-y-8">
            {/* Contact Options */}
            <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Get in Touch</h2>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center">
                  <LifeBuoy className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {contactOptions.map((contact, index) => (
                  <ContactCard key={index} contact={contact} />
                ))}
              </div>
              
              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs md:text-sm font-medium text-blue-900">Secure & Confidential</div>
                    <div className="text-xs text-blue-700">All conversations are encrypted and protected</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Support Status */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl border border-green-200 p-4 md:p-5 lg:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-green-900 text-sm md:text-base">All Systems Operational</h3>
                  <p className="text-green-700 text-xs md:text-sm">Last updated: Just now</p>
                </div>
              </div>
              
              <div className="space-y-2 md:space-y-3">
                {["Website", "Mobile App", "APIs", "Payment Processing"].map((system, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="text-green-800 text-sm md:text-base">{system}</div>
                    <span className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Operational
                    </span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 md:mt-6 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium hover:from-green-700 hover:to-emerald-600 hover:shadow-lg transition-all text-sm md:text-base">
                View System Status
              </button>
            </div>
            
            {/* Community & Feedback */}
            <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-5 lg:p-6">
              <h3 className="font-bold text-slate-900 mb-3 md:mb-4 text-sm md:text-base">Community & Feedback</h3>
              
              <div className="space-y-3 md:space-y-4">
                <button className="w-full p-3 md:p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-medium text-slate-900 text-sm md:text-base">Join Community</div>
                    <div className="text-slate-600 text-xs md:text-sm">Connect with other patients</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </button>
                
                <button className="w-full p-3 md:p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-medium text-slate-900 text-sm md:text-base">Give Feedback</div>
                    <div className="text-slate-600 text-xs md:text-sm">Help us improve HealthBridge</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </button>
                
                <button className="w-full p-3 md:p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-medium text-slate-900 text-sm md:text-base">Follow Updates</div>
                    <div className="text-slate-600 text-xs md:text-sm">News, features & announcements</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
            >
              <div className="bg-white rounded-xl md:rounded-2xl lg:rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col mx-2">
                {/* Modal header */}
                <div className="flex-shrink-0 border-b border-slate-200 p-4 md:p-5 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base md:text-lg lg:text-xl font-bold text-slate-900 truncate">Contact Support</h3>
                        <p className="text-slate-600 text-xs md:text-sm truncate">We're here to help you</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="p-1.5 md:p-2 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                    </button>
                  </div>
                </div>
                
                {/* Modal content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-5 lg:p-6 space-y-4 md:space-y-5 lg:space-y-6">
                  {/* Contact method selection */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2 md:mb-3 text-sm md:text-base">How would you like to contact us?</h4>
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <button
                        onClick={() => setContactMethod("chat")}
                        className={`p-3 md:p-4 rounded-lg md:rounded-xl border transition-all flex flex-col items-center ${
                          contactMethod === "chat"
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <MessageSquare className={`w-5 h-5 md:w-6 md:h-6 mb-2 ${
                          contactMethod === "chat" ? "text-blue-600" : "text-slate-600"
                        }`} />
                        <span className={`font-medium text-sm md:text-base ${
                          contactMethod === "chat" ? "text-blue-900" : "text-slate-900"
                        }`}>Live Chat</span>
                        <span className="text-xs text-slate-500 mt-1">&lt;2 min response</span>
                      </button>
                      
                      <button
                        onClick={() => setContactMethod("phone")}
                        className={`p-3 md:p-4 rounded-lg md:rounded-xl border transition-all flex flex-col items-center ${
                          contactMethod === "phone"
                            ? "border-green-500 bg-green-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <Phone className={`w-5 h-5 md:w-6 md:h-6 mb-2 ${
                          contactMethod === "phone" ? "text-green-600" : "text-slate-600"
                        }`} />
                        <span className={`font-medium text-sm md:text-base ${
                          contactMethod === "phone" ? "text-green-900" : "text-slate-900"
                        }`}>Phone Call</span>
                        <span className="text-xs text-slate-500 mt-1">Available now</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Message input */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2 md:mb-3 text-sm md:text-base">Describe your issue</h4>
                    <div className="space-y-2 md:space-y-3">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please describe your issue in detail. Include any error messages, steps to reproduce, and what you were trying to do..."
                        className="w-full h-32 md:h-40 p-3 md:p-4 rounded-lg md:rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none text-sm md:text-base"
                      />
                      
                      <div className="flex items-center gap-2 md:gap-3">
                        <button className="p-2 md:p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                          <Paperclip className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                        </button>
                        <button className="p-2 md:p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
                          <Camera className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                        </button>
                        <div className="text-xs text-slate-500 flex-1 text-right hidden xs:block">
                          Attach screenshots if helpful
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Urgency */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2 md:mb-3 text-sm md:text-base">Urgency level</h4>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {["Low", "Medium", "High"].map((level) => (
                        <button
                          key={level}
                          className={`p-2 md:p-3 rounded-lg border text-sm md:text-base ${
                            level === "Medium"
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Contact info */}
                  <div className="bg-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-slate-200">
                    <div className="text-xs md:text-sm text-slate-600 mb-1">We'll respond to:</div>
                    <div className="font-medium text-slate-900 text-sm md:text-base truncate">john.doe@email.com • +234 812 345 6789</div>
                    <button className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium mt-2">
                      Update contact information
                    </button>
                  </div>
                </div>
                
                {/* Modal footer */}
                <div className="flex-shrink-0 border-t border-slate-200 p-4 md:p-5 lg:p-6">
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <button
                      onClick={() => setShowContactModal(false)}
                      className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm md:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitContact}
                      disabled={!message.trim()}
                      className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base flex items-center justify-center gap-1.5 md:gap-2"
                    >
                      {contactMethod === "chat" ? (
                        <>
                          <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          Start Live Chat
                        </>
                      ) : (
                        <>
                          <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          Request Callback
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
    </div>
  );
}