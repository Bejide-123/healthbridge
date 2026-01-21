// app/patients-dashboard/health-tracker/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Activity, Heart, Thermometer, Weight, 
  Moon, Droplets, Apple, Brain,
  Calendar, Clock, TrendingUp, TrendingDown,
  ChevronRight, Search, Filter, Plus,
  Download, Printer, Share2, Settings,
  X, ChevronLeft, ChevronDown, MoreVertical,
  Bell, MessageSquare, Video, Phone,
  AlertCircle, CheckCircle, Battery,
  Target, Zap, Sunrise, Coffee
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Health Metric Card Component
function HealthMetricCard({ 
  metric,
  onViewDetails
}: { 
  metric: any;
  onViewDetails: () => void;
}) {
  const getStatusColor = (value: number, normalRange: [number, number]) => {
    if (value < normalRange[0]) return "text-amber-500";
    if (value > normalRange[1]) return "text-red-500";
    return "text-emerald-500";
  };

  const getStatusIcon = (value: number, normalRange: [number, number]) => {
    if (value < normalRange[0] || value > normalRange[1]) return TrendingDown;
    return TrendingUp;
  };

  const StatusIcon = getStatusIcon(metric.value, metric.normalRange);
  const statusColor = getStatusColor(metric.value, metric.normalRange);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${metric.bgColor}`}>
              <metric.icon className={`w-5 h-5 md:w-6 md:h-6 ${metric.iconColor}`} />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-slate-900">{metric.title}</h3>
              <p className="text-xs md:text-sm text-slate-600">{metric.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onViewDetails}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-slate-900">{metric.value}</span>
              <span className="text-sm text-slate-600">{metric.unit}</span>
              <StatusIcon className={`w-4 h-4 ${statusColor}`} />
            </div>
            <div className={`text-xs md:text-sm ${statusColor} font-medium mt-1`}>
              {metric.status}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-600">Last updated</div>
            <div className="text-sm font-medium text-slate-900">{metric.lastUpdated}</div>
          </div>
        </div>

        {/* Progress/Status bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>{metric.normalRange[0]}{metric.unit}</span>
            <span>Normal Range</span>
            <span>{metric.normalRange[1]}{metric.unit}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${statusColor.replace('text-', 'bg-')}`}
              style={{ 
                width: `${Math.min(Math.max(
                  ((metric.value - metric.normalRange[0]) / (metric.normalRange[1] - metric.normalRange[0])) * 100,
                  0
                ), 100)}%` 
              }}
            />
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-xs md:text-sm font-medium flex items-center justify-center gap-1">
            <Clock className="w-3 h-3 md:w-4 md:h-4" />
            Log Entry
          </button>
          <button 
            onClick={onViewDetails}
            className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-colors text-xs md:text-sm font-medium flex items-center justify-center gap-1"
          >
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            View Trends
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Health Log Modal
function HealthLogModal({ 
  isOpen, 
  onClose,
  metric 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  metric: any;
}) {
  const [value, setValue] = useState(metric.value.toString());
  const [notes, setNotes] = useState("");
  const [time, setTime] = useState("Now");

  const handleSubmit = () => {
    // Handle log submission
    console.log({ metric: metric.title, value, notes, time });
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
            <div className="relative w-full max-w-md max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* Modal header */}
              <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${metric.bgColor}`}>
                      <metric.icon className={`w-5 h-5 md:w-6 md:h-6 ${metric.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-slate-900">Log {metric.title}</h2>
                      <p className="text-slate-600 text-sm md:text-base">Record your measurement</p>
                    </div>
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
                  {/* Current status */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-slate-600">Current Reading</div>
                        <div className="text-3xl md:text-4xl font-bold text-slate-900">{metric.value}<span className="text-lg text-slate-600">{metric.unit}</span></div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600">Normal Range</div>
                        <div className="font-bold text-slate-900">{metric.normalRange[0]}-{metric.normalRange[1]}{metric.unit}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${metric.status === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {metric.status === 'Normal' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {metric.status}
                    </div>
                  </div>
                  
                  {/* Input form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Measurement Value
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-lg"
                          placeholder={`Enter ${metric.title.toLowerCase()}`}
                        />
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 font-medium">
                          {metric.unit}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Time of Measurement
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {["Now", "Morning", "Afternoon", "Evening"].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                              time === t
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Notes (Optional)
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any notes about how you're feeling, symptoms, or context..."
                        className="w-full h-24 p-3 rounded-xl bg-slate-100 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none text-sm"
                      />
                    </div>
                    
                    <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-700">
                          <span className="font-medium">Note:</span> If your reading is outside normal range or you're experiencing severe symptoms, please contact your doctor immediately.
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
                    className="px-6 py-2 md:px-8 md:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                    Save Log Entry
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

// Trend Chart Component
function TrendChart({ data, color }: { data: any[], color: string }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '0.5rem'
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={`url(#color${color.replace('#', '')})`}
            strokeWidth={2}
          />
          <defs>
            <linearGradient id={`color${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function HealthTrackerPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  
  // Sample health metrics data
  const healthMetrics = [
    {
      id: 1,
      title: "Heart Rate",
      subtitle: "Resting BPM",
      icon: Heart,
      value: 72,
      unit: "bpm",
      normalRange: [60, 100],
      status: "Normal",
      lastUpdated: "2 hours ago",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      trend: "up",
      chartData: [
        { date: "Mon", value: 75 },
        { date: "Tue", value: 72 },
        { date: "Wed", value: 70 },
        { date: "Thu", value: 68 },
        { date: "Fri", value: 72 },
        { date: "Sat", value: 74 },
        { date: "Sun", value: 72 }
      ],
      chartColor: "#ef4444"
    },
    {
      id: 2,
      title: "Blood Pressure",
      subtitle: "Systolic/Diastolic",
      icon: Activity,
      value: "120/80",
      unit: "mmHg",
      normalRange: [90, 140],
      status: "Normal",
      lastUpdated: "Today",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "stable",
      chartData: [
        { date: "Mon", value: 125 },
        { date: "Tue", value: 122 },
        { date: "Wed", value: 120 },
        { date: "Thu", value: 118 },
        { date: "Fri", value: 120 },
        { date: "Sat", value: 123 },
        { date: "Sun", value: 120 }
      ],
      chartColor: "#3b82f6"
    },
    {
      id: 3,
      title: "Blood Sugar",
      subtitle: "Fasting glucose",
      icon: Droplets,
      value: 95,
      unit: "mg/dL",
      normalRange: [70, 100],
      status: "Normal",
      lastUpdated: "Yesterday",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "down",
      chartData: [
        { date: "Mon", value: 105 },
        { date: "Tue", value: 100 },
        { date: "Wed", value: 98 },
        { date: "Thu", value: 95 },
        { date: "Fri", value: 92 },
        { date: "Sat", value: 95 },
        { date: "Sun", value: 95 }
      ],
      chartColor: "#8b5cf6"
    },
    {
      id: 4,
      title: "Weight",
      subtitle: "Body weight",
      icon: Weight,
      value: 68.5,
      unit: "kg",
      normalRange: [60, 75],
      status: "Normal",
      lastUpdated: "3 days ago",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      trend: "down",
      chartData: [
        { date: "Mon", value: 70 },
        { date: "Tue", value: 69.5 },
        { date: "Wed", value: 69 },
        { date: "Thu", value: 68.8 },
        { date: "Fri", value: 68.5 },
        { date: "Sat", value: 68.3 },
        { date: "Sun", value: 68.5 }
      ],
      chartColor: "#10b981"
    },
    {
      id: 5,
      title: "Temperature",
      subtitle: "Body temperature",
      icon: Thermometer,
      value: 36.6,
      unit: "°C",
      normalRange: [36.1, 37.2],
      status: "Normal",
      lastUpdated: "4 hours ago",
      bgColor: "bg-amber-100",
      iconColor: "text-amber-600",
      trend: "stable",
      chartData: [
        { date: "Mon", value: 36.5 },
        { date: "Tue", value: 36.6 },
        { date: "Wed", value: 36.7 },
        { date: "Thu", value: 36.6 },
        { date: "Fri", value: 36.5 },
        { date: "Sat", value: 36.6 },
        { date: "Sun", value: 36.6 }
      ],
      chartColor: "#f59e0b"
    },
    {
      id: 6,
      title: "Sleep",
      subtitle: "Hours per night",
      icon: Moon,
      value: 7.5,
      unit: "hrs",
      normalRange: [7, 9],
      status: "Good",
      lastUpdated: "Today",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      trend: "up",
      chartData: [
        { date: "Mon", value: 6.5 },
        { date: "Tue", value: 7 },
        { date: "Wed", value: 7.5 },
        { date: "Thu", value: 8 },
        { date: "Fri", value: 7 },
        { date: "Sat", value: 8.5 },
        { date: "Sun", value: 7.5 }
      ],
      chartColor: "#6366f1"
    }
  ];

  // Health goals data
  const healthGoals = [
    {
      id: 1,
      title: "Daily Steps",
      target: 10000,
      current: 7542,
      unit: "steps",
      icon: Activity,
      color: "from-emerald-500 to-teal-500",
      progress: 75
    },
    {
      id: 2,
      title: "Water Intake",
      target: 2000,
      current: 1500,
      unit: "ml",
      icon: Droplets,
      color: "from-blue-500 to-cyan-500",
      progress: 75
    },
    {
      id: 3,
      title: "Exercise",
      target: 30,
      current: 25,
      unit: "minutes",
      icon: Zap,
      color: "from-purple-500 to-violet-500",
      progress: 83
    },
    {
      id: 4,
      title: "Meditation",
      target: 10,
      current: 8,
      unit: "minutes",
      icon: Brain,
      color: "from-indigo-500 to-blue-500",
      progress: 80
    }
  ];

  // Recent logs data
  const recentLogs = [
    { id: 1, metric: "Heart Rate", value: "72 bpm", time: "2 hours ago", status: "normal" },
    { id: 2, metric: "Blood Pressure", value: "120/80 mmHg", time: "Today", status: "normal" },
    { id: 3, metric: "Weight", value: "68.5 kg", time: "3 days ago", status: "normal" },
    { id: 4, metric: "Sleep", value: "7.5 hours", time: "Today", status: "good" },
  ];

  const handleViewMetric = (metric: any) => {
    setSelectedMetric(metric);
    setShowLogModal(true);
  };

  // Chart data for overview
  const overviewChartData = [
    { date: 'Mon', heartRate: 75, bloodPressure: 125, bloodSugar: 105 },
    { date: 'Tue', heartRate: 72, bloodPressure: 122, bloodSugar: 100 },
    { date: 'Wed', heartRate: 70, bloodPressure: 120, bloodSugar: 98 },
    { date: 'Thu', heartRate: 68, bloodPressure: 118, bloodSugar: 95 },
    { date: 'Fri', heartRate: 72, bloodPressure: 120, bloodSugar: 92 },
    { date: 'Sat', heartRate: 74, bloodPressure: 123, bloodSugar: 95 },
    { date: 'Sun', heartRate: 72, bloodPressure: 120, bloodSugar: 95 },
  ];

  return (
    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Health Tracker</h1>
          <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base">Monitor your health metrics and trends</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Data</span>
          </motion.button>
          <motion.button
            onClick={() => {
              setSelectedMetric(healthMetrics[0]);
              setShowLogModal(true);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium hover:from-emerald-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 justify-center flex-1 sm:flex-none"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Log Health Data</span>
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 overflow-x-auto">
        <div className="flex space-x-4 md:space-x-8 min-w-max">
          {[
            { id: "overview", label: "Overview" },
            { id: "metrics", label: "All Metrics" },
            { id: "goals", label: "Health Goals" },
            { id: "trends", label: "Trends" },
            { id: "logs", label: "Recent Logs" },
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
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6 md:space-y-8">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-4 md:p-6 border border-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-slate-900">6</div>
                  <div className="text-xs md:text-sm text-slate-600">Metrics Tracked</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                  <Activity className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-slate-900">5</div>
                  <div className="text-xs md:text-sm text-slate-600">Normal Readings</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-6 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-slate-900">24</div>
                  <div className="text-xs md:text-sm text-slate-600">Entries This Week</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-4 md:p-6 border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-slate-900">75%</div>
                  <div className="text-xs md:text-sm text-slate-600">Goal Progress</div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                  <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Overview Chart */}
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900">Health Trends Overview</h3>
                <p className="text-slate-600 text-sm md:text-base">Weekly trends across key metrics</p>
              </div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button className="px-3 py-1.5 text-xs rounded-lg bg-slate-100 text-slate-700">Week</button>
                <button className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">Month</button>
                <button className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">Year</button>
              </div>
            </div>
            
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overviewChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '0.5rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="heartRate" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bloodPressure" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bloodSugar" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-slate-600">Heart Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-slate-600">Blood Pressure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-slate-600">Blood Sugar</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Health Goals Progress */}
            <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Health Goals Progress</h3>
              <div className="space-y-4">
                {healthGoals.slice(0, 2).map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${goal.color} flex items-center justify-center`}>
                          <goal.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{goal.title}</div>
                          <div className="text-xs text-slate-600">{goal.current}/{goal.target} {goal.unit}</div>
                        </div>
                      </div>
                      <div className="font-bold text-slate-900">{goal.progress}%</div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Goal
              </button>
            </div>

            {/* Recent Logs */}
            <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Recent Logs</h3>
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div>
                      <div className="font-medium text-slate-900">{log.metric}</div>
                      <div className="text-sm text-slate-600">{log.time}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-slate-900">{log.value}</div>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        log.status === 'normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {log.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-2">
                View All Logs
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Tab */}
      {activeTab === "metrics" && (
        <div className="space-y-4 md:space-y-6">
          {/* Health Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {healthMetrics.map((metric) => (
              <HealthMetricCard
                key={metric.id}
                metric={metric}
                onViewDetails={() => handleViewMetric(metric)}
              />
            ))}
          </div>

          {/* Add Custom Metric */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-300 border-dashed p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-300 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Track Additional Metrics</h3>
            <p className="text-slate-600 mb-4 max-w-md mx-auto">
              Add custom metrics like pain levels, mood, medication adherence, or any other health indicators you want to monitor.
            </p>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-slate-600 to-slate-500 text-white font-medium hover:from-slate-700 hover:to-slate-600 hover:shadow-lg transition-all">
              Add Custom Metric
            </button>
          </div>
        </div>
      )}

      {/* Goals Tab */}
      {activeTab === "goals" && (
        <div className="space-y-6">
          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {healthGoals.map((goal) => (
              <div key={goal.id} className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center`}>
                      <goal.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{goal.title}</h3>
                      <p className="text-slate-600 text-sm">Daily Target: {goal.target} {goal.unit}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                    <MoreVertical className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{goal.current}</div>
                    <div className="text-xs text-slate-600">Current</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{goal.target - goal.current}</div>
                    <div className="text-xs text-slate-600">Remaining</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{goal.target}</div>
                    <div className="text-xs text-slate-600">Target</div>
                  </div>
                </div>

                <button className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Log Progress
                </button>
              </div>
            ))}
          </div>

          {/* Add New Goal */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Set New Health Goal</h3>
                <p className="text-slate-600 max-w-md">Track your progress towards better health with personalized goals.</p>
              </div>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium hover:from-emerald-700 hover:to-teal-600 hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap">
                <Plus className="w-5 h-5" />
                Create New Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === "trends" && (
        <div className="space-y-6">
          {/* Time Range Selector */}
          <div className="flex flex-wrap gap-2">
            {["Day", "Week", "Month", "3 Months", "Year", "All Time"].map((range) => (
              <button
                key={range}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  range === "Week"
                    ? "bg-blue-500 text-white"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {healthMetrics.slice(0, 4).map((metric) => (
              <div key={metric.id} className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                      <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{metric.title} Trend</h3>
                      <p className="text-slate-600 text-sm">Last 7 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{metric.value}<span className="text-sm text-slate-600">{metric.unit}</span></div>
                    <div className={`text-sm font-medium ${metric.status === 'Normal' ? 'text-emerald-500' : 'text-amber-500'}`}>
                      {metric.status}
                    </div>
                  </div>
                </div>
                <TrendChart data={metric.chartData} color={metric.chartColor} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === "logs" && (
        <div className="space-y-6">
          {/* Logs Table */}
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">Health Log History</h3>
                  <p className="text-slate-600 text-sm md:text-base">All your recorded health measurements</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
                    <Filter className="w-4 h-4 inline mr-2" />
                    Filter
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
                    <Download className="w-4 h-4 inline mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Metric</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Notes</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    { id: 1, metric: "Heart Rate", value: "72 bpm", status: "Normal", time: "2 hours ago", notes: "After morning walk" },
                    { id: 2, metric: "Blood Pressure", value: "120/80 mmHg", status: "Normal", time: "Today, 8:00 AM", notes: "Before breakfast" },
                    { id: 3, metric: "Blood Sugar", value: "95 mg/dL", status: "Normal", time: "Yesterday, 7:30 AM", notes: "Fasting" },
                    { id: 4, metric: "Weight", value: "68.5 kg", status: "Normal", time: "3 days ago", notes: "" },
                    { id: 5, metric: "Temperature", value: "36.6°C", status: "Normal", time: "4 hours ago", notes: "Evening reading" },
                    { id: 6, metric: "Sleep", value: "7.5 hours", status: "Good", time: "Today", notes: "Slept well" },
                  ].map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Activity className="w-4 h-4 text-slate-600" />
                          </div>
                          <span className="font-medium text-slate-900">{log.metric}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-slate-900">{log.value}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === 'Normal' || log.status === 'Good' 
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{log.time}</td>
                      <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{log.notes || "-"}</td>
                      <td className="px-4 py-3">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-600">
                Showing <span className="font-medium">1-6</span> of <span className="font-medium">24</span> entries
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm">
                  Previous
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm">
                  1
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm">
                  2
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm">
                  3
                </button>
                <button className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Health Log Modal */}
      {selectedMetric && (
        <HealthLogModal
          isOpen={showLogModal}
          onClose={() => setShowLogModal(false)}
          metric={selectedMetric}
        />
      )}
    </div>
  );
}