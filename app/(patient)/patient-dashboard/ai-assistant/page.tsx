// app/patients-dashboard/ai-assistant/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MessageSquare, Send, Bot, User, Sparkles,
  Clock, Shield, Mic, Volume2, Paperclip,
  Camera, AlertCircle, ThumbsUp, ThumbsDown,
  RefreshCw, X, Stethoscope, Hospital,
  Thermometer, Activity, Calendar, Pill,
  ChevronRight, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Message Component
function Message({ message, isUser }: { message: any; isUser: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
          : 'bg-gradient-to-br from-purple-500 to-violet-500'
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      {/* Message Content */}
      <div className={`flex-1 max-w-[85%] ${isUser ? 'items-end' : ''}`}>
        <div className={`rounded-2xl p-4 ${
          isUser
            ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-tr-none'
            : 'bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-tl-none'
        }`}>
          <p className={`text-sm md:text-base ${isUser ? 'text-blue-900' : 'text-slate-900'}`}>
            {message.text}
          </p>
          
          {message.actions && !isUser && (
            <div className="mt-3 space-y-2">
              {message.actions.map((action: any, index: number) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.onClick}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border transition-all text-sm ${
                    action.type === 'primary'
                      ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white border-transparent hover:shadow-lg'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {action.label}
                </motion.button>
              ))}
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-2 mt-2 text-xs text-slate-500 ${isUser ? 'justify-end' : ''}`}>
          <Clock className="w-3 h-3" />
          <span>{message.time}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Quick Question Card
function QuickQuestion({ question, icon: Icon, onClick }: { 
  question: string; 
  icon: any;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all text-left"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <span className="font-medium text-slate-900 text-sm flex-1 text-left">{question}</span>
      </div>
    </motion.button>
  );
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      text: "Hello! I'm HealthBridge AI Assistant. I can help with general health information and guide you to healthcare services. Remember: I'm not a doctor. For emergencies, call 112 immediately.",
      time: "Just now",
      isUser: false,
      actions: [
        { 
          label: "🚨 Emergency Services", 
          type: "primary",
          onClick: () => window.location.href = "/patient-dashboard/emergency"
        },
        { 
          label: "📅 Book Doctor Appointment", 
          type: "secondary",
          onClick: () => window.location.href = "/patient-dashboard/appointments"
        }
      ]
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const quickQuestions = [
    {
      question: "Malaria symptoms?",
      icon: Thermometer,
      response: "Common malaria symptoms: high fever, chills, headache, muscle pain, fatigue. Symptoms appear 7-30 days after mosquito bite.\n\n⚠️ Visit a healthcare facility for testing. Would you like help finding hospitals?"
    },
    {
      question: "Manage diabetes?",
      icon: Activity,
      response: "Diabetes management: monitor blood sugar, balanced diet, regular exercise, medication adherence, doctor check-ups.\n\n📅 I can help you book a consultation with a specialist."
    },
    {
      question: "When to go to ER?",
      icon: AlertCircle,
      response: "Go to ER immediately for: chest pain, difficulty breathing, severe bleeding, head injury, sudden severe pain.\n\n🚨 Call 112 or use our Emergency Services page."
    },
    {
      question: "Book appointment?",
      icon: Calendar,
      response: "Book through HealthBridge:\n1. Go to Appointments page\n2. Select doctor & time\n3. Pay deposit\n4. Get confirmation\n\nReady to book now?"
    }
  ];
  
  const getAIResponse = (userInput: string) => {
    const inputLower = userInput.toLowerCase();
    
    // Smart response based on question type
    if (inputLower.includes('malaria') || inputLower.includes('fever') || inputLower.includes('headache')) {
      return "Based on your symptoms, it could be malaria or another infection. Malaria symptoms include fever, chills, headache, and body aches.\n\n⚠️ Important: Visit a healthcare facility for proper testing (blood test). Self-treatment can be dangerous.\n\nWould you like help finding nearby hospitals or booking an appointment?";
    }
    
    if (inputLower.includes('diabet') || inputLower.includes('sugar') || inputLower.includes('blood sugar')) {
      return "Diabetes requires medical management. Key aspects: regular monitoring, diet control, medication, exercise, and doctor visits.\n\n📅 I recommend booking a consultation with an endocrinologist or general physician for personalized advice.\n\nWould you like to schedule an appointment?";
    }
    
    if (inputLower.includes('emergency') || inputLower.includes('urgent') || inputLower.includes('help')) {
      return "For urgent medical concerns:\n🚨 Call 112 (Nigeria emergency)\n🏥 Go to nearest hospital ER\n📱 Use our Emergency Services page for ambulance\n\nWould you like me to connect you with emergency services?";
    }
    
    if (inputLower.includes('appointment') || inputLower.includes('book') || inputLower.includes('doctor')) {
      return "To book a doctor's appointment:\n1. Visit Appointments page\n2. Select preferred doctor\n3. Choose date & time\n4. Pay deposit\n5. Receive confirmation\n\nReady to book now? I can take you directly to the booking page.";
    }
    
    if (inputLower.includes('medicine') || inputLower.includes('drug') || inputLower.includes('prescription')) {
      return "For medication information and prescriptions:\n💊 Only take medicines prescribed by doctors\n🏥 Pharmacists can provide guidance\n📋 Never self-medicate based on symptoms\n\nWould you like to consult a doctor or pharmacist?";
    }
    
    if (inputLower.includes('pain') || inputLower.includes('hurt') || inputLower.includes('ache')) {
      return "Pain can indicate various conditions. Location and type of pain help determine seriousness.\n\n🩺 Mild pain: Rest, over-the-counter pain relief (as directed)\n🚨 Severe/sudden pain: Seek medical attention immediately\n\nWould you like help assessing the pain or finding a doctor?";
    }
    
    // Default responses for general questions
    const defaultResponses = [
      "I understand your health concern. While I can provide general information, it's important to consult a healthcare professional for accurate diagnosis and treatment.\n\nWould you like me to help you find a doctor or hospital?",
      "Thank you for your question. For proper medical advice, I recommend consulting with a licensed doctor. I can help you book an appointment or find healthcare services.\n\nRemember: I'm an AI assistant, not a substitute for professional medical care.",
      "Your health is important! Medical conditions require proper diagnosis by healthcare professionals. I suggest scheduling a consultation for personalized advice.\n\nWould you like to explore healthcare options?"
    ];
    
    return `${defaultResponses[Math.floor(Math.random() * defaultResponses.length)]}\n\n**Always consult healthcare professionals for medical treatment.**`;
  };
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      time: "Just now",
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Get smart AI response after delay
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        time: "Just now",
        isUser: false,
        actions: [
          { 
            label: "📅 Book Doctor Appointment", 
            type: "primary",
            onClick: () => window.location.href = "/patient-dashboard/appointments"
          },
          { 
            label: "🏥 Find Hospitals", 
            type: "secondary",
            onClick: () => window.location.href = "/patient-dashboard/appointments?tab=hospitals"
          }
        ]
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleQuickQuestion = (question: string, response: string) => {
    // Add user question
    const userMessage = {
      id: messages.length + 1,
      text: question,
      time: "Just now",
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Add AI response after delay
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: response,
        time: "Just now",
        isUser: false,
        actions: [
          { 
            label: "📅 Book Consultation", 
            type: "primary",
            onClick: () => window.location.href = "/patient-dashboard/appointments"
          },
          { 
            label: "🏥 Emergency Services", 
            type: "secondary",
            onClick: () => window.location.href = "/patient-dashboard/emergency"
          }
        ]
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">AI Health Assistant</h1>
                <p className="text-slate-600 text-sm">
                  General health guidance • Not medical advice • Consult doctors for treatment
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/patient-dashboard/appointments"}
              className="flex-1 lg:flex-none px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 justify-center text-sm"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Book Doctor</span>
            </motion.button>
          </div>
        </div>
        
        {/* Main Chat Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Chat Container */}
            <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
              {/* Chat Header */}
              <div className="border-b border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">HealthBridge AI</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Online</span>
                        </div>
                        <span>•</span>
                        <span>General health information only</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setMessages([messages[0]])}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-sm text-slate-600 flex items-center gap-1"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">Clear Chat</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <Message key={message.id} message={message} isUser={message.isUser} />
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl rounded-tl-none p-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input */}
              <div className="border-t border-slate-200 p-4 bg-slate-50/50">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask about symptoms, health concerns, or healthcare services..."
                        className="w-full pl-4 pr-24 py-3 rounded-xl bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none text-sm min-h-[48px] max-h-[120px]"
                        rows={1}
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                          <Mic className="w-4 h-4 text-slate-400" />
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSend}
                          disabled={!input.trim()}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:from-blue-700 hover:to-teal-600 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send</span>
                        </motion.button>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 mt-2 px-1">
                      💡 Ask about symptoms, medications, or healthcare services. Remember: Consult doctors for medical treatment.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Questions Below Chat */}
            <div>
              <h3 className="font-medium text-slate-900 mb-3 text-sm">Quick Questions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {quickQuestions.map((q, index) => (
                  <QuickQuestion
                    key={index}
                    question={q.question}
                    icon={q.icon}
                    onClick={() => handleQuickQuestion(q.question, q.response)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar - 1/4 width */}
          <div className="space-y-6">
            {/* Emergency Info */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-red-900 text-sm">Emergency</h3>
              </div>
              
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-white/50 border border-red-100">
                  <div className="font-medium text-red-900 text-sm">Emergency Numbers</div>
                  <div className="text-red-700 text-base font-bold">112 • 767 • 199</div>
                </div>
                
                <button
                  onClick={() => window.location.href = "/patient-dashboard/emergency"}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-500 text-white font-medium hover:from-red-700 hover:to-rose-600 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  Emergency Services
                </button>
              </div>
            </div>
            
            {/* Healthcare Services */}
            <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-4">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Healthcare Services</h3>
              
              <div className="space-y-2">
                {[
                  { icon: Stethoscope, label: "Book Doctor", link: "/patient-dashboard/appointments" },
                  { icon: Hospital, label: "Emergency", link: "/patient-dashboard/emergency" },
                  { icon: Activity, label: "Lab Tests", link: "/patient-dashboard/lab-results" },
                  { icon: Pill, label: "Pharmacy", link: "/patient-dashboard/prescriptions" },
                ].map((service, index) => (
                  <button
                    key={index}
                    onClick={() => window.location.href = service.link}
                    className="w-full p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all flex items-center gap-3 text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 flex items-center justify-center">
                      <service.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-slate-900 text-sm">{service.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Disclaimer */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-blue-900 text-sm">Important Notice</h3>
              </div>
              
              <div className="text-xs text-blue-800 space-y-1">
                <p>• AI provides general information only</p>
                <p>• Not a substitute for medical advice</p>
                <p>• Always consult healthcare professionals</p>
                <p>• For emergencies, call 112 immediately</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Notice */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="text-center text-slate-600 text-sm">
            <p>
              ⚠️ This AI assistant provides general health information. For medical diagnosis and treatment, consult healthcare professionals through{" "}
              <Link href="/patient-dashboard/appointments" className="text-blue-600 hover:text-blue-700 font-medium">
                Appointments
              </Link>{" "}
              or{" "}
              <Link href="/patient-dashboard/emergency" className="text-red-600 hover:text-red-700 font-medium">
                Emergency Services
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}