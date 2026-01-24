// app/hospital/emergency/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ambulance, Phone, MapPin, Navigation, User,
  Clock, X, AlertTriangle, CheckCircle, MessageSquare,
  MoreVertical, Filter, Search, Eye, PhoneCall,
  Navigation2, Shield, FileText, Download,
  ChevronRight, Users, Activity, Heart,
  Send, Map, Bell, Volume2, Maximize2,
  Calendar, Home, Mail, Download as DownloadIcon
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock emergency requests data
const mockEmergencyRequests = [
  {
    id: "EMG-001234",
    patient: {
      id: "P-001234",
      name: "John Doe",
      age: 45,
      bloodGroup: "O+",
      phone: "+234 801 234 5678",
      address: "12 Banana Island, Ikoyi, Lagos"
    },
    type: "Heart Attack Symptoms",
    location: {
      lat: 6.5244,
      lng: 3.3792,
      address: "12 Banana Island, Ikoyi, Lagos",
      type: "saved-address" as "saved-address" | "live-location" | "text-address"
    },
    time: "Just now",
    status: "pending" as "pending" | "en-route" | "arrived" | "completed",
    ambulance: null,
    medicalInfo: {
      conditions: ["Hypertension"],
      allergies: ["None"],
      medications: ["Lisinopril"]
    },
    emergencyContacts: [
      { name: "Sarah Doe", phone: "+234 802 345 6789", relationship: "Wife" },
      { name: "Mike Doe", phone: "+234 803 456 7890", relationship: "Brother" }
    ]
  },
  {
    id: "EMG-001235",
    patient: {
      id: "P-001235",
      name: "Mary Johnson",
      age: 32,
      bloodGroup: "A-",
      phone: "+234 802 345 6789",
      address: "15 Victoria Island, Lagos"
    },
    type: "Severe Allergic Reaction",
    location: {
      lat: 6.4281,
      lng: 3.4235,
      address: "Shoprite Complex, Victoria Island",
      type: "live-location"
    },
    time: "5 min ago",
    status: "en-route",
    ambulance: "AMB-001",
    medicalInfo: {
      conditions: ["Asthma"],
      allergies: ["Peanuts", "Penicillin"],
      medications: ["Ventolin"]
    },
    emergencyContacts: [
      { name: "David Johnson", phone: "+234 804 567 8901", relationship: "Husband" }
    ]
  },
  {
    id: "EMG-001236",
    patient: {
      id: "P-001236",
      name: "David Smith",
      age: 58,
      bloodGroup: "B+",
      phone: "+234 803 456 7890",
      address: "8 Lekki Phase 1, Lagos"
    },
    type: "Car Accident",
    location: {
      lat: 6.4654,
      lng: 3.4756,
      address: "Lekki-Epe Expressway, opposite Shoprite",
      type: "text-address"
    },
    time: "15 min ago",
    status: "arrived",
    ambulance: "AMB-002",
    medicalInfo: {
      conditions: ["Diabetes"],
      allergies: ["None"],
      medications: ["Metformin"]
    },
    emergencyContacts: [
      { name: "Grace Smith", phone: "+234 805 678 9012", relationship: "Wife" },
      { name: "James Smith", phone: "+234 806 789 0123", relationship: "Son" }
    ]
  }
];

// Mock ambulances data
const mockAmbulances = [
  {
    id: "AMB-001",
    name: "Alpha",
    status: "on-call" as "available" | "on-call" | "maintenance",
    currentLocation: "Victoria Island",
    patient: "Mary Johnson",
    eta: "5 min",
    driver: {
      name: "Chinedu Okoro",
      phone: "+234 807 890 1234"
    }
  },
  {
    id: "AMB-002",
    name: "Bravo",
    status: "on-call",
    currentLocation: "Lekki",
    patient: "David Smith",
    eta: "Arrived",
    driver: {
      name: "Emeka Nwosu",
      phone: "+234 808 901 2345"
    }
  },
  {
    id: "AMB-003",
    name: "Charlie",
    status: "available",
    currentLocation: "Hospital",
    patient: null,
    eta: "Available",
    driver: {
      name: "Adebayo Yusuf",
      phone: "+234 809 012 3456"
    }
  },
  {
    id: "AMB-004",
    name: "Delta",
    status: "maintenance",
    currentLocation: "Garage",
    patient: null,
    eta: "Unavailable",
    driver: {
      name: "Tunde Lawal",
      phone: "+234 810 123 4567"
    }
  }
];

// Mock statistics
const mockStats = {
  today: {
    emergencies: 8,
    avgResponseTime: "12 min",
    ambulancesDispatched: 6
  },
  weekly: {
    emergencies: 42,
    avgResponseTime: "15 min",
    successRate: "94%"
  }
};

export default function HospitalEmergencyPage() {
  const [emergencies, setEmergencies] = useState(mockEmergencyRequests);
  const [ambulances, setAmbulances] = useState(mockAmbulances);
  const [selectedEmergency, setSelectedEmergency] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMapView, setIsMapView] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [newEmergencyCount, setNewEmergencyCount] = useState(1);

  // Filter emergencies based on status
  const filteredEmergencies = emergencies.filter(emergency => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return emergency.status === "pending";
    if (activeFilter === "en-route") return emergency.status === "en-route";
    if (activeFilter === "arrived") return emergency.status === "arrived";
    return true;
  });

  // Search emergencies
  const searchedEmergencies = filteredEmergencies.filter(emergency =>
    emergency.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emergency.patient.phone.includes(searchQuery) ||
    emergency.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle ambulance assignment
  const handleAssignAmbulance = (emergencyId: string, ambulanceId: string) => {
    setEmergencies(prev => prev.map(emergency => {
      if (emergency.id === emergencyId) {
        return {
          ...emergency,
          ambulance: ambulanceId,
          status: "en-route"
        };
      }
      return emergency;
    }));

    setAmbulances(prev => prev.map(ambulance => {
      if (ambulance.id === ambulanceId) {
        const emergency = emergencies.find(e => e.id === emergencyId);
        return {
          ...ambulance,
          status: "on-call",
          patient: emergency?.patient.name || null,
          eta: "8 min"
        };
      }
      return ambulance;
    }));

    // Close selection
    setSelectedEmergency(null);
  };

  // Handle status update
  const handleUpdateStatus = (emergencyId: string, status: "en-route" | "arrived" | "completed") => {
    setEmergencies(prev => prev.map(emergency => {
      if (emergency.id === emergencyId) {
        return { ...emergency, status };
      }
      return emergency;
    }));

    // If completed, free the ambulance
    if (status === "completed") {
      const emergency = emergencies.find(e => e.id === emergencyId);
      if (emergency?.ambulance) {
        setAmbulances(prev => prev.map(ambulance => {
          if (ambulance.id === emergency.ambulance) {
            return {
              ...ambulance,
              status: "available",
              patient: null,
              eta: "Available"
            };
          }
          return ambulance;
        }));
      }
    }
  };

  // Simulate new emergency
  const handleSimulateNewEmergency = () => {
    const newEmergency = {
      id: `EMG-00${1236 + newEmergencyCount}`,
      patient: {
        id: `P-00${1236 + newEmergencyCount}`,
        name: `New Patient ${newEmergencyCount}`,
        age: Math.floor(Math.random() * 50) + 20,
        bloodGroup: ["O+", "A-", "B+", "AB+"][Math.floor(Math.random() * 4)],
        phone: `+234 81${Math.floor(Math.random() * 10000000)}`,
        address: `Location ${newEmergencyCount}, Lagos`
      },
      type: ["Heart Attack", "Stroke Symptoms", "Difficulty Breathing", "Severe Injury"][Math.floor(Math.random() * 4)],
      location: {
        lat: 6.5244 + (Math.random() - 0.5) * 0.1,
        lng: 3.3792 + (Math.random() - 0.5) * 0.1,
        address: `Emergency Location ${newEmergencyCount}, Lagos`,
        type: ["saved-address", "live-location", "text-address"][Math.floor(Math.random() * 3)] as any
      },
      time: "Just now",
      status: "pending" as const,
      ambulance: null,
      medicalInfo: {
        conditions: [["Hypertension"], ["Diabetes"], ["Asthma"], ["None"]][Math.floor(Math.random() * 4)],
        allergies: [["None"], ["Peanuts"], ["Penicillin"]][Math.floor(Math.random() * 3)],
        medications: [["None"], ["Lisinopril"], ["Metformin"]][Math.floor(Math.random() * 3)]
      },
      emergencyContacts: [
        { name: `Contact ${newEmergencyCount}`, phone: `+234 80${Math.floor(Math.random() * 10000000)}`, relationship: "Family" }
      ]
    };

    setEmergencies(prev => [newEmergency, ...prev]);
    setNewEmergencyCount(prev => prev + 1);

    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`New Emergency: ${newEmergency.type}`, {
        body: `${newEmergency.patient.name} needs urgent assistance`,
        icon: '/ambulance-icon.png'
      });
    }
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Chart data for response times
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Response Time (minutes)',
        data: [18, 15, 12, 14, 11, 16, 13],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Emergency Response</h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Monitor emergencies and dispatch ambulances</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsMapView(!isMapView)}
            className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm"
          >
            <Map className="w-4 h-4" />
            {isMapView ? "List View" : "Map View"}
          </button>
          <button
            onClick={handleSimulateNewEmergency}
            className="px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm"
          >
            <AlertTriangle className="w-4 h-4" />
            Simulate Emergency
          </button>
          <button
            onClick={() => setShowStats(!showStats)}
            className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm"
          >
            <Activity className="w-4 h-4" />
            {showStats ? "Hide Stats" : "Show Stats"}
          </button>
        </div>
      </div>

      {/* Statistics */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6"
          >
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Today's Stats */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-red-800">Today</div>
                    <Calendar className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Emergencies</span>
                      <span className="font-bold text-slate-900">{mockStats.today.emergencies}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Avg Response</span>
                      <span className="font-bold text-slate-900">{mockStats.today.avgResponseTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Ambulances</span>
                      <span className="font-bold text-slate-900">{mockStats.today.ambulancesDispatched}</span>
                    </div>
                  </div>
                </div>

                {/* Weekly Stats */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-blue-800">This Week</div>
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Emergencies</span>
                      <span className="font-bold text-slate-900">{mockStats.weekly.emergencies}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Avg Response</span>
                      <span className="font-bold text-slate-900">{mockStats.weekly.avgResponseTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Success Rate</span>
                      <span className="font-bold text-slate-900">{mockStats.weekly.successRate}</span>
                    </div>
                  </div>
                </div>

                {/* Active Emergencies */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-amber-800">Active Now</div>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Pending</span>
                      <span className="font-bold text-slate-900">{emergencies.filter(e => e.status === "pending").length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">En Route</span>
                      <span className="font-bold text-slate-900">{emergencies.filter(e => e.status === "en-route").length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Arrived</span>
                      <span className="font-bold text-slate-900">{emergencies.filter(e => e.status === "arrived").length}</span>
                    </div>
                  </div>
                </div>

                {/* Ambulance Status */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-green-800">Ambulances</div>
                    <Ambulance className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Available</span>
                      <span className="font-bold text-slate-900">{ambulances.filter(a => a.status === "available").length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">On Call</span>
                      <span className="font-bold text-slate-900">{ambulances.filter(a => a.status === "on-call").length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Maintenance</span>
                      <span className="font-bold text-slate-900">{ambulances.filter(a => a.status === "maintenance").length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time Chart */}
              <div className="mt-4 p-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-medium text-slate-900">Response Time Trend (Last 7 Days)</div>
                  <div className="text-sm text-slate-600">Lower is better</div>
                </div>
                <div className="h-[200px]">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left Column - Emergency List */}
        <div className="lg:w-2/3 xl:w-3/4 flex flex-col">
          <div className="bg-white rounded-xl border border-slate-200 flex-1 flex flex-col">
            {/* Header with search and filters */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search emergencies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2">
                  {["all", "pending", "en-route", "arrived"].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                        activeFilter === filter
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                  <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Emergency List */}
            <div className="flex-1 overflow-y-auto">
              {searchedEmergencies.length > 0 ? (
                <div className="divide-y divide-slate-200">
                  {searchedEmergencies.map(emergency => (
                    <div
                      key={emergency.id}
                      className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedEmergency?.id === emergency.id ? 'bg-red-50' : ''
                      }`}
                      onClick={() => setSelectedEmergency(emergency)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Status Indicator */}
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          emergency.status === "pending" ? 'bg-red-500 animate-pulse' :
                          emergency.status === "en-route" ? 'bg-amber-500' :
                          emergency.status === "arrived" ? 'bg-blue-500' :
                          'bg-green-500'
                        }`} />

                        {/* Emergency Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <div>
                              <div className="font-bold text-slate-900 text-sm sm:text-base">
                                {emergency.type}
                              </div>
                              <div className="text-sm text-slate-600">
                                {emergency.patient.name} • {emergency.patient.age}y • {emergency.patient.bloodGroup}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-xs text-slate-500 whitespace-nowrap">
                                {emergency.time}
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          </div>

                          {/* Location Info */}
                          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{emergency.location.address}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                              emergency.location.type === "saved-address" ? "bg-blue-100 text-blue-700" :
                              emergency.location.type === "live-location" ? "bg-green-100 text-green-700" :
                              "bg-amber-100 text-amber-700"
                            }`}>
                              {emergency.location.type === "saved-address" ? "Saved Address" :
                               emergency.location.type === "live-location" ? "Live Location" : "Text Address"}
                            </span>
                          </div>

                          {/* Status and Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                emergency.status === "pending" ? "bg-red-100 text-red-700" :
                                emergency.status === "en-route" ? "bg-amber-100 text-amber-700" :
                                emergency.status === "arrived" ? "bg-blue-100 text-blue-700" :
                                "bg-green-100 text-green-700"
                              }`}>
                                {emergency.status.toUpperCase()}
                              </span>
                              {emergency.ambulance && (
                                <span className="text-sm text-slate-600">
                                  Ambulance: {emergency.ambulance}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`tel:${emergency.patient.phone}`, '_blank');
                                }}
                                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                title="Call Patient"
                              >
                                <Phone className="w-4 h-4 text-slate-600" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateStatus(emergency.id, "completed");
                                }}
                                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                              >
                                Mark Complete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No emergencies found</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {searchQuery ? 'Try a different search term' : 'All emergencies handled'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Emergency Details & Ambulances */}
        <div className="lg:w-1/3 xl:w-1/4 flex flex-col gap-4 sm:gap-6">
          {/* Selected Emergency Details */}
          {selectedEmergency ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border border-slate-200 flex flex-col"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Emergency Details</h3>
                  <button
                    onClick={() => setSelectedEmergency(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Patient Info */}
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg">
                    {selectedEmergency.patient.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{selectedEmergency.patient.name}</div>
                    <div className="text-sm text-slate-600">
                      {selectedEmergency.patient.age}y • {selectedEmergency.patient.bloodGroup}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700">{selectedEmergency.patient.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Home className="w-4 h-4 text-slate-400 mt-0.5" />
                    <span className="text-slate-700">{selectedEmergency.patient.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-medium text-red-600">{selectedEmergency.type}</span>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div className="p-4 border-b border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Medical Information
                </h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-slate-600">Conditions: </span>
                    <span className="text-slate-900">{selectedEmergency.medicalInfo.conditions.join(", ")}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-600">Allergies: </span>
                    <span className="text-slate-900">{selectedEmergency.medicalInfo.allergies.join(", ")}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-600">Medications: </span>
                    <span className="text-slate-900">{selectedEmergency.medicalInfo.medications.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="p-4 border-b border-slate-200">
                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Emergency Contacts
                </h4>
                <div className="space-y-2">
                  {selectedEmergency.emergencyContacts.map((contact: any, index: number) => (
                    <div key={index} className="p-2 bg-slate-50 rounded-lg">
                      <div className="font-medium text-slate-900 text-sm">{contact.name}</div>
                      <div className="text-xs text-slate-600">{contact.relationship}</div>
                      <div className="text-xs text-blue-600">{contact.phone}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4">
                <div className="space-y-3">
                  <button
                    onClick={() => window.open(`tel:${selectedEmergency.patient.phone}`, '_blank')}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call Patient
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => window.open('https://maps.google.com', '_blank')}
                      className="py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <MapPin className="w-4 h-4" />
                      View Map
                    </button>
                    <button
                      onClick={() => {/* Open chat */}}
                      className="py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Select an emergency to view details</p>
              <p className="text-sm text-slate-500 mt-1">
                Click on any emergency from the list
              </p>
            </div>
          )}

          {/* Ambulance Status */}
          <div className="bg-white rounded-xl border border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-900">Ambulance Status</h3>
              <p className="text-sm text-slate-600 mt-1">Available: {ambulances.filter(a => a.status === "available").length}</p>
            </div>

            <div className="p-4 space-y-3">
              {ambulances.map(ambulance => (
                <div key={ambulance.id} className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-slate-900">{ambulance.name}</div>
                      <div className="text-xs text-slate-600">Driver: {ambulance.driver.name}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      ambulance.status === "available" ? "bg-green-100 text-green-700" :
                      ambulance.status === "on-call" ? "bg-amber-100 text-amber-700" :
                      "bg-slate-100 text-slate-700"
                    }`}>
                      {ambulance.status === "available" ? "Available" :
                       ambulance.status === "on-call" ? "On Call" : "Maintenance"}
                    </span>
                  </div>
                  
                  <div className="text-sm text-slate-600 mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {ambulance.currentLocation}
                    </div>
                    {ambulance.patient && (
                      <div className="mt-1 text-slate-700">
                        Patient: {ambulance.patient}
                      </div>
                    )}
                    <div className="mt-1 font-medium">
                      ETA: {ambulance.eta}
                    </div>
                  </div>

                  {ambulance.status === "available" && selectedEmergency && (
                    <button
                      onClick={() => handleAssignAmbulance(selectedEmergency.id, ambulance.id)}
                      className="w-full py-2 bg-gradient-to-r from-red-600 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all text-sm"
                    >
                      Assign to Emergency
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-sm text-slate-600">
              {emergencies.filter(e => e.status === "pending").length} pending emergencies
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm">
              <DownloadIcon className="w-4 h-4" />
              Export Reports
            </button>
            <button
              onClick={handleSimulateNewEmergency}
              className="px-3 py-2 bg-gradient-to-r from-red-600 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              Simulate Test
            </button>
            <button className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm">
              <Ambulance className="w-4 h-4" />
              Dispatch New Ambulance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}