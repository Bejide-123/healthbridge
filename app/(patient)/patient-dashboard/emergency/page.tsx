// app/patients-dashboard/emergency/page.tsx
"use client";

import { useState, useEffect } from "react";
import { 
  Ambulance, Phone, MapPin, Navigation,
  AlertTriangle, Shield, Clock, X,
  Heart, Activity, User, MessageSquare,
  Bell, Settings, Plus, Home,
  CheckCircle, XCircle, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmergencyPage() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "granted" | "denied" | "unavailable">("idle");
  const [locationError, setLocationError] = useState<string>("");

  // Get user's current location on component mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setLocationStatus("loading");
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationStatus("granted");
        setLocationError("");
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationStatus("denied");
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location permission denied. Please enable location services.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information unavailable.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out.");
            break;
          default:
            setLocationError("An unknown error occurred.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Countdown timer for emergency activation
  useEffect(() => {
    if (isEmergencyActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isEmergencyActive) {
      // Trigger actual emergency response
      triggerEmergencyResponse();
    }
  }, [isEmergencyActive, countdown]);

  const triggerEmergencyResponse = () => {
    // In real app, this would:
    // 1. Send location to emergency services
    // 2. Notify emergency contacts
    // 3. Start tracking ambulance
    
    let locationInfo = "Location: Unknown";
    if (userLocation) {
      locationInfo = `Location: ${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)}`;
    } else if (locationStatus === "denied") {
      locationInfo = "Location: Permission denied - using last known or provided address";
    }
    
    console.log("EMERGENCY RESPONSE TRIGGERED");
    console.log(locationInfo);
    
    // Simulate ambulance dispatch
    setTimeout(() => {
      alert(`✅ Emergency services notified!\n🚑 Ambulance dispatched!\n📱 Your emergency contacts have been alerted.\n\n${locationInfo}`);
    }, 1000);
  };

  const handleEmergencyClick = () => {
    if (!isEmergencyActive) {
      // Check location status before activating emergency
      if (locationStatus === "denied" || locationStatus === "unavailable") {
        const proceed = confirm(
          "⚠️ Location services are not available. " +
          "Emergency services may have difficulty finding you. " +
          "Do you want to proceed anyway?"
        );
        if (!proceed) return;
      }
      
      setIsEmergencyActive(true);
      setCountdown(5); // 5 second countdown before actual dispatch
    }
  };

  const handleCancelEmergency = () => {
    setIsEmergencyActive(false);
    setCountdown(5);
  };

  const handleCallDriver = () => {
    window.open("tel:+234112", "_blank");
  };

  const handleShareLocation = () => {
    if (userLocation) {
      const url = `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`;
      navigator.clipboard.writeText(url);
      alert("📍 Location copied to clipboard!");
    } else {
      alert("📍 Location not available. Please enable location services.");
    }
  };

  const handleCallEmergency = () => {
    window.open("tel:112", "_blank");
  };

  const handleRetryLocation = () => {
    requestLocationPermission();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Location Status Banner */}
      <AnimatePresence>
        {locationStatus !== "granted" && !isEmergencyActive && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className={`${
              locationStatus === "loading" 
                ? "bg-blue-500" 
                : locationStatus === "denied" || locationStatus === "unavailable"
                ? "bg-amber-500"
                : "bg-slate-800"
            } text-white`}
          >
            <div className="max-w-md mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {locationStatus === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : locationStatus === "denied" || locationStatus === "unavailable" ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {locationStatus === "loading" && "Getting your location..."}
                    {locationStatus === "denied" && "Location access denied"}
                    {locationStatus === "unavailable" && "Location unavailable"}
                    {locationStatus === "idle" && "Location services"}
                  </span>
                </div>
                
                {locationStatus === "denied" || locationStatus === "unavailable" ? (
                  <button
                    onClick={handleRetryLocation}
                    className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                  >
                    Retry
                  </button>
                ) : locationStatus === "loading" ? (
                  <div className="text-sm opacity-80">Please wait...</div>
                ) : null}
              </div>
              
              {locationError && (
                <div className="mt-2 text-sm opacity-90">
                  {locationError}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Granted Banner */}
      <AnimatePresence>
        {locationStatus === "granted" && !isEmergencyActive && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="bg-green-500 text-white"
          >
            <div className="max-w-md mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Location enabled • Ready for emergency
                  </span>
                </div>
                {userLocation && (
                  <div className="text-xs opacity-80">
                    {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Emergency Interface */}
      <div className="max-w-md mx-auto p-6 pt-12">
        {/* Emergency Status */}
        {isEmergencyActive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-red-600 mb-2">EMERGENCY ACTIVATED</h1>
            <p className="text-slate-600 mb-6">Help is on the way. Stay calm.</p>
            
            {/* Countdown */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-red-600 mb-2">{countdown}</div>
              <div className="text-sm text-slate-600">Seconds until dispatch...</div>
            </div>

            {/* Location Status in Emergency */}
            <div className={`mb-6 p-4 rounded-2xl ${
              locationStatus === "granted" 
                ? "bg-green-50 border border-green-200" 
                : "bg-amber-50 border border-amber-200"
            }`}>
              <div className="flex items-center gap-3">
                {locationStatus === "granted" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                )}
                <div className="text-left">
                  <div className="font-medium text-slate-900">
                    {locationStatus === "granted" ? "Location shared with emergency services" : "Location services unavailable"}
                  </div>
                  <div className="text-sm text-slate-600">
                    {locationStatus === "granted" 
                      ? "Ambulance can find you quickly" 
                      : "Emergency services may need additional location information"}
                  </div>
                </div>
              </div>
            </div>

            {/* Cancel Button */}
            <motion.button
              onClick={handleCancelEmergency}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 rounded-2xl bg-white border-2 border-red-200 text-red-600 font-bold text-lg hover:bg-red-50 transition-all"
            >
              <X className="w-5 h-5 inline mr-2" />
              CANCEL EMERGENCY
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Emergency</h1>
            <p className="text-slate-600 mb-8">Press the button below in case of emergency</p>
            
            {/* Big Red Emergency Button */}
            <motion.button
              onClick={handleEmergencyClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-500 to-rose-500 shadow-2xl hover:shadow-red-500/30 transition-all"
            >
              {/* Pulsing effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-red-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <Ambulance className="w-16 h-16 text-white mx-auto mb-4" />
                <div className="text-white text-2xl font-bold">SOS</div>
                <div className="text-white/80 text-sm mt-2">Press for emergency</div>
              </div>
            </motion.button>

            {/* Location Status */}
            <div className={`mb-6 p-4 rounded-2xl ${
              locationStatus === "granted" 
                ? "bg-green-50 border border-green-200" 
                : locationStatus === "loading"
                ? "bg-blue-50 border border-blue-200"
                : "bg-amber-50 border border-amber-200"
            }`}>
              <div className="flex items-center gap-3">
                {locationStatus === "granted" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : locationStatus === "loading" ? (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                )}
                <div className="text-left flex-1">
                  <div className="font-medium text-slate-900">
                    {locationStatus === "granted" && "📍 Location services enabled"}
                    {locationStatus === "loading" && "📍 Getting your location..."}
                    {locationStatus === "denied" && "📍 Location access required"}
                    {locationStatus === "unavailable" && "📍 Location unavailable"}
                    {locationStatus === "idle" && "📍 Location services"}
                  </div>
                  <div className="text-sm text-slate-600">
                    {locationStatus === "granted" && "Emergency services can find you quickly"}
                    {locationStatus === "loading" && "Please allow location access when prompted"}
                    {locationStatus === "denied" && "Enable location for faster emergency response"}
                    {locationStatus === "unavailable" && "Your browser doesn't support location services"}
                    {locationStatus === "idle" && "Waiting for location permission"}
                  </div>
                </div>
                {locationStatus === "denied" && (
                  <button
                    onClick={handleRetryLocation}
                    className="px-3 py-1 rounded-lg bg-amber-100 text-amber-700 text-sm font-medium hover:bg-amber-200 transition-colors"
                  >
                    Enable
                  </button>
                )}
              </div>
            </div>

            {/* Safety Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="font-medium text-blue-900 mb-1">Your safety is our priority</div>
                  <div className="text-sm text-blue-700">
                    This will immediately notify emergency services and your emergency contacts
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions (Only show when NOT in emergency) */}
        {!isEmergencyActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Settings Toggle */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-900">Emergency Settings</span>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                showSettings ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {showSettings ? '-' : '+'}
              </div>
            </button>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
                    {/* Location */}
                    <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-900">Your Location</span>
                      </div>
                      <div className="text-sm text-blue-700 mb-3">
                        {locationStatus === "granted" && userLocation ? (
                          <>📍 Ready • {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}</>
                        ) : locationStatus === "loading" ? (
                          "📍 Getting location..."
                        ) : (
                          "📍 Enable location services for faster response"
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleShareLocation}
                          disabled={locationStatus !== "granted"}
                          className={`flex-1 py-2 rounded-lg border text-sm ${
                            locationStatus === "granted"
                              ? "border-blue-200 text-blue-700 hover:bg-blue-50 bg-white"
                              : "border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed"
                          }`}
                        >
                          Share Location
                        </button>
                        <button
                          onClick={handleRetryLocation}
                          className="flex-1 py-2 rounded-lg bg-blue-100 border border-blue-200 text-blue-700 hover:bg-blue-200 text-sm"
                        >
                          {locationStatus === "granted" ? "Update" : "Enable"}
                        </button>
                      </div>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="p-3 rounded-xl bg-red-50/50 border border-red-100">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-900">Emergency Contacts</span>
                      </div>
                      <div className="text-sm text-red-700 mb-3">
                        3 contacts will be notified
                      </div>
                      <button className="w-full py-2 rounded-lg bg-white border border-red-200 text-red-700 hover:bg-red-50 transition-all text-sm">
                        Manage Contacts
                      </button>
                    </div>

                    {/* Medical Information */}
                    <div className="p-3 rounded-xl bg-green-50/50 border border-green-100">
                      <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-900">Medical Info</span>
                      </div>
                      <div className="text-sm text-green-700 mb-3">
                        Blood Type: O+ • Allergies: None
                      </div>
                      <button className="w-full py-2 rounded-lg bg-white border border-green-200 text-green-700 hover:bg-green-50 transition-all text-sm">
                        Update Medical Info
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleCallEmergency}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-2">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-slate-900">Call 112</span>
                <span className="text-xs text-slate-500">Emergency line</span>
              </button>

              <button
                onClick={() => window.open('tel:+2348031234567', '_blank')}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 transition-all flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center mb-2">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-slate-900">SOS Alert</span>
                <span className="text-xs text-slate-500">Notify contacts</span>
              </button>

              <button
                onClick={() => window.open('https://maps.google.com', '_blank')}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-green-200 hover:bg-green-50 transition-all flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-2">
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-slate-900">Hospitals</span>
                <span className="text-xs text-slate-500">Find nearest</span>
              </button>

              <button
                onClick={() => window.open('/patients-dashboard/first-aid', '_blank')}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-orange-200 hover:bg-orange-50 transition-all flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-2">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-slate-900">First Aid</span>
                <span className="text-xs text-slate-500">Quick guide</span>
              </button>
            </div>

            {/* Emergency Instructions */}
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="font-medium text-slate-900 mb-2">In case of emergency:</div>
                  <ol className="text-sm text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                      <span>Press the red SOS button above</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                      <span>Stay on the line if possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                      <span>Follow instructions from emergency services</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Emergency Info */}
        {isEmergencyActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mt-8"
          >
            {/* Emergency Response Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Ambulance className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-green-900">Emergency Response Activated</div>
                  <div className="text-sm text-green-700">Help is on the way</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Ambulance ETA</span>
                  <span className="font-bold text-slate-900">8-12 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Nearest Hospital</span>
                  <span className="font-bold text-slate-900">LUTH (2.5km)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Contacts Notified</span>
                  <span className="font-bold text-slate-900">3/3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Location Status</span>
                  <span className={`font-bold ${
                    locationStatus === "granted" ? "text-green-600" : "text-amber-600"
                  }`}>
                    {locationStatus === "granted" ? "Shared" : "Manual needed"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions During Emergency */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleCallDriver}
                className="p-4 rounded-2xl bg-white border border-blue-200 hover:bg-blue-50 transition-all flex flex-col items-center"
              >
                <Phone className="w-6 h-6 text-blue-600 mb-2" />
                <span className="font-medium text-slate-900">Call Driver</span>
              </button>
              
              <button
                onClick={handleShareLocation}
                disabled={locationStatus !== "granted"}
                className={`p-4 rounded-2xl border flex flex-col items-center ${
                  locationStatus === "granted"
                    ? "border-green-200 hover:bg-green-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <MapPin className={`w-6 h-6 mb-2 ${
                  locationStatus === "granted" ? "text-green-600" : "text-slate-400"
                }`} />
                <span className={`font-medium ${
                  locationStatus === "granted" ? "text-slate-900" : "text-slate-400"
                }`}>
                  Share Location
                </span>
              </button>
              
              <button
                onClick={() => window.open('tel:112', '_blank')}
                className="p-4 rounded-2xl bg-white border border-red-200 hover:bg-red-50 transition-all flex flex-col items-center"
              >
                <MessageSquare className="w-6 h-6 text-red-600 mb-2" />
                <span className="font-medium text-slate-900">Update Status</span>
              </button>
              
              <button
                onClick={() => window.open('https://maps.google.com', '_blank')}
                className="p-4 rounded-2xl bg-white border border-purple-200 hover:bg-purple-50 transition-all flex flex-col items-center"
              >
                <Navigation className="w-6 h-6 text-purple-600 mb-2" />
                <span className="font-medium text-slate-900">View Route</span>
              </button>
            </div>

            {/* Stay Calm Reminder */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="font-medium text-blue-900 mb-1">Stay Calm & Safe</div>
                  <div className="text-sm text-blue-700">
                    • Keep your phone accessible<br/>
                    • Unlock doors for emergency services<br/>
                    • Have your ID and medical info ready<br/>
                    • Follow instructions from responders
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}