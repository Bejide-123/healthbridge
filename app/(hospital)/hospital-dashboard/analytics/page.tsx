// app/hospital/analytics/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp, TrendingDown, Users, Calendar, DollarSign,
  Activity, Download, Filter, Calendar as CalendarIcon,
  BarChart3, PieChart, LineChart, Eye, Printer,
  FileText, Clock, UserCheck, UserX,
  Thermometer, Heart, Weight, RefreshCw,
  ArrowUpRight, ArrowDownRight, ChevronDown,
  Search, BarChart2, Target, Award
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Mock data for charts
const revenueData = [
  { month: 'Jan', revenue: 4.5, expenses: 2.2 },
  { month: 'Feb', revenue: 5.2, expenses: 2.3 },
  { month: 'Mar', revenue: 4.8, expenses: 2.1 },
  { month: 'Apr', revenue: 6.1, expenses: 2.4 },
  { month: 'May', revenue: 5.8, expenses: 2.5 },
  { month: 'Jun', revenue: 6.5, expenses: 2.6 },
  { month: 'Jul', revenue: 7.2, expenses: 2.8 },
  { month: 'Aug', revenue: 6.8, expenses: 2.7 },
  { month: 'Sep', revenue: 7.5, expenses: 2.9 },
  { month: 'Oct', revenue: 8.2, expenses: 3.1 },
  { month: 'Nov', revenue: 8.9, expenses: 3.3 },
  { month: 'Dec', revenue: 9.5, expenses: 3.5 }
];

const patientData = [
  { day: 'Mon', new: 45, returning: 65 },
  { day: 'Tue', new: 52, returning: 72 },
  { day: 'Wed', new: 48, returning: 68 },
  { day: 'Thu', new: 61, returning: 81 },
  { day: 'Fri', new: 58, returning: 76 },
  { day: 'Sat', new: 42, returning: 55 },
  { day: 'Sun', new: 35, returning: 48 }
];

const departmentData = [
  { name: 'General', value: 28, color: '#3B82F6' },
  { name: 'Pediatrics', value: 22, color: '#10B981' },
  { name: 'Cardiology', value: 18, color: '#EF4444' },
  { name: 'Orthopedics', value: 15, color: '#F59E0B' },
  { name: 'Dermatology', value: 12, color: '#8B5CF6' },
  { name: 'Other', value: 5, color: '#6366F1' }
];

const appointmentData = [
  { time: '9 AM', appointments: 18 },
  { time: '10 AM', appointments: 32 },
  { time: '11 AM', appointments: 28 },
  { time: '12 PM', appointments: 22 },
  { time: '1 PM', appointments: 15 },
  { time: '2 PM', appointments: 25 },
  { time: '3 PM', appointments: 30 },
  { time: '4 PM', appointments: 26 },
  { time: '5 PM', appointments: 18 }
];

const topDoctorsData = [
  { name: 'Dr. Adebola Johnson', appointments: 245, revenue: 3.65 },
  { name: 'Dr. Chioma Okafor', appointments: 218, revenue: 3.28 },
  { name: 'Dr. Emeka Nwosu', appointments: 195, revenue: 2.98 },
  { name: 'Dr. Fatima Bello', appointments: 182, revenue: 2.75 },
  { name: 'Dr. Tunde Lawal', appointments: 165, revenue: 2.48 }
];

const topServicesData = [
  { service: 'Consultation', revenue: 12.5, change: '+12%' },
  { service: 'Lab Tests', revenue: 8.9, change: '+18%' },
  { service: 'Procedures', revenue: 6.5, change: '+8%' },
  { service: 'Medications', revenue: 4.2, change: '+22%' },
  { service: 'Emergency', revenue: 3.8, change: '+15%' }
];

// KPI data
const kpis = [
  {
    title: 'Total Revenue',
    value: '₦95.2M',
    change: '+18.5%',
    isPositive: true,
    period: 'vs last month',
    icon: DollarSign,
    color: 'bg-green-500'
  },
  {
    title: 'Total Patients',
    value: '2,845',
    change: '+12.3%',
    isPositive: true,
    period: 'vs last month',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Appointments',
    value: '1,248',
    change: '+8.7%',
    isPositive: true,
    period: 'vs last month',
    icon: Calendar,
    color: 'bg-purple-500'
  },
  {
    title: 'Avg. Response Time',
    value: '14.2 min',
    change: '-2.3%',
    isPositive: true,
    period: 'vs last month',
    icon: Clock,
    color: 'bg-orange-500'
  }
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = (type: 'pdf' | 'excel') => {
    setExporting(true);
    setTimeout(() => {
      alert(`${type.toUpperCase()} export started. Check your downloads.`);
      setExporting(false);
    }, 1500);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Custom formatter for revenue values
  const formatRevenue = (value: number) => `₦${value}M`;
  
  // Custom formatter for tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-slate-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('revenue') ? `₦${entry.value}M` : `${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 px-4 sm:px-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Monitor hospital performance and trends</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm min-w-[120px]"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 min-w-[40px]"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('pdf')}
              disabled={exporting}
              className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 min-w-[80px]"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={() => handleExport('excel')}
              disabled={exporting}
              className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm disabled:opacity-50 min-w-[80px]"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Excel</span>
            </button>
            <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors min-w-[40px]">
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-4 sm:px-0">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-slate-600 mb-1 truncate">{kpi.title}</p>
                  <div className="flex items-end gap-2">
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900 truncate">{kpi.value}</h3>
                    <span className={`flex items-center text-sm font-medium flex-shrink-0 ${
                      kpi.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 truncate">{kpi.period}</p>
                </div>
                <div className={`p-2 rounded-lg ${kpi.color} text-white flex-shrink-0 ml-2`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Grid */}
      <div className="flex-1 overflow-y-auto pb-6 px-4 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue vs Expenses Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Revenue vs Expenses</h3>
                <p className="text-xs sm:text-sm text-slate-600">Monthly comparison (₦M)</p>
              </div>
              <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0" />
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6B7280" 
                    fontSize={12}
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    stroke="#6B7280" 
                    fontSize={12}
                    tick={{ fill: '#6B7280' }}
                    tickFormatter={(value) => `₦${value}M`}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                  />
                  <Legend 
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Patient Volume Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Patient Volume</h3>
                <p className="text-xs sm:text-sm text-slate-600">Daily patient count</p>
              </div>
              <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={patientData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#6B7280" 
                    fontSize={12}
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    stroke="#6B7280" 
                    fontSize={12}
                    tick={{ fill: '#6B7280' }}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} patients`, 
                      name === 'new' ? 'New Patients' : 'Returning Patients'
                    ]}
                    labelStyle={{ fontSize: '12px', color: '#6B7280' }}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Legend 
                    verticalAlign="top"
                    height={36}
                    wrapperStyle={{ fontSize: '12px' }}
                  />
                  <Bar 
                    dataKey="new" 
                    name="New Patients" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={40}
                  />
                  <Bar 
                    dataKey="returning" 
                    name="Returning Patients" 
                    fill="#8B5CF6" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Department Distribution</h3>
                <p className="text-xs sm:text-sm text-slate-600">Patient visits by department</p>
              </div>
              <PieChart className="w-5 h-5 text-purple-600 flex-shrink-0" />
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="#ffffff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Legend 
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: '12px', paddingLeft: '20px' }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Appointment Trends */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Appointment Trends</h3>
                <p className="text-xs sm:text-sm text-slate-600">Hourly appointment distribution</p>
              </div>
              <CalendarIcon className="w-5 h-5 text-orange-600 flex-shrink-0" />
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={appointmentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#6B7280" 
                    fontSize={12}
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    stroke="#6B7280" 
                    fontSize={12}
                    tick={{ fill: '#6B7280' }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} appointments`, 'Appointments']}
                    labelStyle={{ fontSize: '12px', color: '#6B7280' }}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Bar 
                    dataKey="appointments" 
                    name="Appointments" 
                    fill="#F59E0B" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performing Doctors */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Top Performing Doctors</h3>
                <p className="text-xs sm:text-sm text-slate-600">By appointments and revenue</p>
              </div>
              <Award className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            </div>
            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
              {topDoctorsData.map((doctor, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {doctor.name.split(' ')[1]?.charAt(0) || 'D'}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 text-sm truncate">{doctor.name}</div>
                      <div className="text-xs text-slate-600">{doctor.appointments} appointments</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="font-bold text-slate-900 text-sm">₦{doctor.revenue.toFixed(1)}M</div>
                    <div className="text-xs text-green-600">+{Math.floor(Math.random() * 20) + 5}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Services by Revenue */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Top Services by Revenue</h3>
                <p className="text-xs sm:text-sm text-slate-600">Revenue contribution by service</p>
              </div>
              <BarChart2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            </div>
            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
              {topServicesData.map((service, index) => (
                <div key={index} className="space-y-2 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-slate-900 text-sm truncate">{service.service}</div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="font-bold text-slate-900 text-sm">₦{service.revenue.toFixed(1)}M</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        service.change.startsWith('+') 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {service.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${(service.revenue / 12.5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4 min-w-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <UserCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-blue-900 text-sm">Patient Satisfaction</div>
                <div className="text-xl lg:text-2xl font-bold text-slate-900 truncate">94.2%</div>
              </div>
            </div>
            <div className="text-xs text-blue-700 mt-2">+2.1% from last month</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 min-w-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-green-900 text-sm">Avg. Wait Time</div>
                <div className="text-xl lg:text-2xl font-bold text-slate-900 truncate">18 min</div>
              </div>
            </div>
            <div className="text-xs text-green-700 mt-2">-3.2 min from last month</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200 p-4 min-w-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-purple-900 text-sm">Bed Occupancy</div>
                <div className="text-xl lg:text-2xl font-bold text-slate-900 truncate">72%</div>
              </div>
            </div>
            <div className="text-xs text-purple-700 mt-2">Optimal range: 70-85%</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-4 min-w-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                <Activity className="w-4 h-4 text-orange-600" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-orange-900 text-sm">Staff Efficiency</div>
                <div className="text-xl lg:text-2xl font-bold text-slate-900 truncate">88.5%</div>
              </div>
            </div>
            <div className="text-xs text-orange-700 mt-2">+4.7% from last month</div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-4 lg:p-6">
          <h3 className="font-bold text-slate-900 text-sm lg:text-base mb-4">Insights & Recommendations</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 text-sm lg:text-base mb-1">High Demand Period</div>
                  <div className="text-xs lg:text-sm text-blue-700">
                    Peak hours are 10 AM - 3 PM. Consider extending doctor shifts or adding more appointment slots.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-start gap-3">
                <DollarSign className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-green-900 text-sm lg:text-base mb-1">Revenue Opportunity</div>
                  <div className="text-xs lg:text-sm text-green-700">
                    Lab tests show 18% growth. Consider expanding lab capacity and promoting package deals.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-amber-900 text-sm lg:text-base mb-1">Patient Retention</div>
                  <div className="text-xs lg:text-sm text-amber-700">
                    New patient conversion rate is 68%. Focus on follow-up consultations and loyalty programs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}