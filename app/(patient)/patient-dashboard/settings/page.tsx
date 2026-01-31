// app/(user)/settings/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import {
  Bell,
  Moon,
  Globe,
  Smartphone,
  Mail,
  Shield,
  Eye,
  EyeOff,
  Save,
  Upload,
  Camera,
  User,
  LogOut,
  Palette,
  Database,
  Trash2,
  Lock,
  Download,
  ChevronRight,
  Check,
  X,
  Volume2,
  Clock,
  CreditCard,
  FileText,
  HelpCircle,
  MessageSquare,
  Share2,
  Languages,
  Smartphone as PhoneIcon,
  Mail as MailIcon,
  Bell as BellIcon,
  Shield as ShieldIcon,
  Moon as MoonIcon,
  Globe as GlobeIcon,
  Palette as PaletteIcon,
  Database as DatabaseIcon,
  Lock as LockIcon,
  Download as DownloadIcon,
  Trash2 as TrashIcon,
  Volume2 as VolumeIcon,
  Clock as ClockIcon,
  CreditCard as CardIcon,
  FileText as FileIcon,
  HelpCircle as HelpIcon,
  MessageSquare as MessageIcon,
  Share2 as ShareIcon,
  Languages as LanguageIcon
} from "lucide-react";

interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  marketingEmails: boolean;
  newsletter: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends";
  showOnlineStatus: boolean;
  allowMessages: "everyone" | "friends" | "none";
  showLastSeen: boolean;
  syncContacts: boolean;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("notifications");
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true,
    marketingEmails: false,
    newsletter: false
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "friends",
    showOnlineStatus: true,
    allowMessages: "friends",
    showLastSeen: true,
    syncContacts: true
  });

  // App preferences
  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    fontSize: "medium",
    timezone: "Africa/Lagos",
    autoPlayVideos: false,
    dataSaver: false,
    reduceAnimations: false
  });

  // Account settings
  const [account, setAccount] = useState({
    email: "user@example.com",
    phone: "+234 801 234 5678",
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30" // minutes
  });

  const sections = [
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "privacy", label: "Privacy", icon: ShieldIcon },
    { id: "appearance", label: "Appearance", icon: PaletteIcon },
    { id: "language", label: "Language", icon: LanguageIcon },
    { id: "account", label: "Account", icon: LockIcon },
    { id: "data", label: "Data & Storage", icon: DatabaseIcon },
    { id: "help", label: "Help & Support", icon: HelpIcon }
  ];

  const handleToggleNotification = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTogglePrivacy = (key: keyof PrivacySettings) => {
    if (typeof privacy[key] === "boolean") {
      setPrivacy(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const handleExportData = () => {
    alert("Data export started. You will receive an email with your data.");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Handle account deletion
      alert("Account deletion request submitted.");
    }
  };

  const handleChangePassword = () => {
    // TODO: Implement password change logic
    alert("Password change functionality not yet implemented.");
    setShowPasswordModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-2">Manage your app preferences and account settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-6">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">John Doe</h3>
                    <p className="text-sm text-slate-600">{account.email}</p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                {sections.map(section => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 text-blue-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            : 'bg-slate-100'
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            isActive ? 'text-white' : 'text-slate-600'
                          }`} />
                        </div>
                        <span className="font-medium">{section.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${
                        isActive ? 'text-blue-500' : 'text-slate-400'
                      }`} />
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 space-y-3">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>

                <button className="w-full px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Content Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${
                    activeSection === "notifications" ? "from-blue-500 to-cyan-500" :
                    activeSection === "privacy" ? "from-green-500 to-emerald-500" :
                    activeSection === "appearance" ? "from-purple-500 to-pink-500" :
                    activeSection === "language" ? "from-orange-500 to-amber-500" :
                    activeSection === "account" ? "from-red-500 to-rose-500" :
                    activeSection === "data" ? "from-indigo-500 to-violet-500" :
                    "from-cyan-500 to-blue-500"
                  }`}>
                    {sections.find(s => s.id === activeSection)?.icon && 
                      React.createElement(sections.find(s => s.id === activeSection)!.icon, {
                        className: "w-5 h-5 text-white"
                      })
                    }
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {sections.find(s => s.id === activeSection)?.label}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {activeSection === "notifications" && "Manage your notification preferences"}
                      {activeSection === "privacy" && "Control your privacy settings"}
                      {activeSection === "appearance" && "Customize the app look and feel"}
                      {activeSection === "language" && "Change language and region settings"}
                      {activeSection === "account" && "Manage your account security"}
                      {activeSection === "data" && "Control data usage and storage"}
                      {activeSection === "help" && "Get help and support"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6">
                {/* Notifications Section */}
                {activeSection === "notifications" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Push Notifications</h3>
                      {[
                        { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications on your device' },
                        { key: 'soundEnabled', label: 'Notification Sound', description: 'Play sound for notifications' },
                        { key: 'vibrationEnabled', label: 'Vibration', description: 'Vibrate for notifications' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                          <div>
                            <div className="font-medium text-slate-900">{item.label}</div>
                            <div className="text-sm text-slate-600 mt-1">{item.description}</div>
                          </div>
                          <button
                            onClick={() => handleToggleNotification(item.key as keyof NotificationSettings)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              notifications[item.key as keyof NotificationSettings] ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              notifications[item.key as keyof NotificationSettings] ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Email Notifications</h3>
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                        { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional emails and offers' },
                        { key: 'newsletter', label: 'Newsletter', description: 'Subscribe to our monthly newsletter' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                          <div>
                            <div className="font-medium text-slate-900">{item.label}</div>
                            <div className="text-sm text-slate-600 mt-1">{item.description}</div>
                          </div>
                          <button
                            onClick={() => handleToggleNotification(item.key as keyof NotificationSettings)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              notifications[item.key as keyof NotificationSettings] ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              notifications[item.key as keyof NotificationSettings] ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-3">
                        <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-blue-900">Notification Schedule</div>
                          <div className="text-sm text-blue-700 mt-1">
                            You can customize quiet hours and notification schedules in your device settings.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Section */}
                {activeSection === "privacy" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Profile Privacy</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Profile Visibility
                          </label>
                          <select
                            value={privacy.profileVisibility}
                            onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value as any})}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          >
                            <option value="public">Public</option>
                            <option value="friends">Friends Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Who Can Message You
                          </label>
                          <select
                            value={privacy.allowMessages}
                            onChange={(e) => setPrivacy({...privacy, allowMessages: e.target.value as any})}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          >
                            <option value="everyone">Everyone</option>
                            <option value="friends">Friends Only</option>
                            <option value="none">No One</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Activity Status</h3>
                      {[
                        { key: 'showOnlineStatus', label: 'Show Online Status', description: 'Let others see when you are online' },
                        { key: 'showLastSeen', label: 'Show Last Seen', description: 'Show when you were last active' },
                        { key: 'syncContacts', label: 'Sync Contacts', description: 'Find friends from your contacts' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                          <div>
                            <div className="font-medium text-slate-900">{item.label}</div>
                            <div className="text-sm text-slate-600 mt-1">{item.description}</div>
                          </div>
                          <button
                            onClick={() => handleTogglePrivacy(item.key as keyof PrivacySettings)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              privacy[item.key as keyof PrivacySettings] ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              privacy[item.key as keyof PrivacySettings] ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-green-900">Privacy Tips</div>
                          <div className="text-sm text-green-700 mt-1">
                            Review your privacy settings regularly to ensure you're comfortable with what information is shared.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Section */}
                {activeSection === "appearance" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Theme</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setPreferences({...preferences, theme: "light"})}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            preferences.theme === "light"
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                              <div className="w-6 h-6 bg-white rounded-full"></div>
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-slate-900">Light</div>
                              <div className="text-sm text-slate-600">Default theme</div>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => setPreferences({...preferences, theme: "dark"})}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            preferences.theme === "dark"
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                              <div className="w-6 h-6 bg-slate-800 rounded-full"></div>
                            </div>
                            <div className="text-left">
                              <div className="font-medium text-slate-900">Dark</div>
                              <div className="text-sm text-slate-600">Easier on the eyes</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Display</h3>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Text Size
                        </label>
                        <select
                          value={preferences.fontSize}
                          onChange={(e) => setPreferences({...preferences, fontSize: e.target.value})}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                          <option value="xlarge">Extra Large</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                          <div>
                            <div className="font-medium text-slate-900">Reduce Animations</div>
                            <div className="text-sm text-slate-600 mt-1">Minimize motion and animations</div>
                          </div>
                          <button
                            onClick={() => setPreferences({...preferences, reduceAnimations: !preferences.reduceAnimations})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              preferences.reduceAnimations ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              preferences.reduceAnimations ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Section */}
                {activeSection === "account" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Security</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                          <div>
                            <div className="font-medium text-slate-900">Two-Factor Authentication</div>
                            <div className="text-sm text-slate-600 mt-1">Add an extra layer of security</div>
                          </div>
                          <button
                            onClick={() => setAccount({...account, twoFactorEnabled: !account.twoFactorEnabled})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              account.twoFactorEnabled ? 'bg-green-600' : 'bg-slate-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              account.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                          <div>
                            <div className="font-medium text-slate-900">Login Alerts</div>
                            <div className="text-sm text-slate-600 mt-1">Get notified of new logins</div>
                          </div>
                          <button
                            onClick={() => setAccount({...account, loginAlerts: !account.loginAlerts})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              account.loginAlerts ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              account.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="w-full p-4 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5" />
                            <div>
                              <div className="font-medium">Change Password</div>
                              <div className="text-sm">Update your password regularly</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Session</h3>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Auto-lock After Inactivity
                        </label>
                        <select
                          value={account.sessionTimeout}
                          onChange={(e) => setAccount({...account, sessionTimeout: e.target.value})}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        >
                          <option value="5">5 minutes</option>
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="0">Never</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data & Storage Section */}
                {activeSection === "data" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Storage</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                          <div>
                            <div className="font-medium text-slate-900">Data Saver</div>
                            <div className="text-sm text-slate-600 mt-1">Reduce data usage</div>
                          </div>
                          <button
                            onClick={() => setPreferences({...preferences, dataSaver: !preferences.dataSaver})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              preferences.dataSaver ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              preferences.dataSaver ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="p-4 rounded-lg border border-slate-200">
                          <div className="mb-3">
                            <div className="font-medium text-slate-900">Cache Size</div>
                            <div className="text-sm text-slate-600 mt-1">256 MB used</div>
                          </div>
                          <button className="w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                            Clear Cache
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Data Management</h3>
                      
                      <div className="space-y-3">
                        <button
                          onClick={handleExportData}
                          className="w-full p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <DownloadIcon className="w-5 h-5 text-slate-600" />
                            <div>
                              <div className="font-medium text-slate-900">Export Data</div>
                              <div className="text-sm text-slate-600">Download your data</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        </button>

                        <button
                          onClick={handleDeleteAccount}
                          className="w-full p-4 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <TrashIcon className="w-5 h-5" />
                            <div>
                              <div className="font-medium">Delete Account</div>
                              <div className="text-sm">Permanently delete your account</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Help & Support Section */}
                {activeSection === "help" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex flex-col items-center text-center">
                        <HelpIcon className="w-8 h-8 text-blue-600 mb-3" />
                        <div className="font-medium text-slate-900">Help Center</div>
                        <div className="text-sm text-slate-600 mt-1">Find answers to common questions</div>
                      </button>

                      <button className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex flex-col items-center text-center">
                        <MessageIcon className="w-8 h-8 text-green-600 mb-3" />
                        <div className="font-medium text-slate-900">Contact Support</div>
                        <div className="text-sm text-slate-600 mt-1">Get help from our support team</div>
                      </button>

                      <button className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex flex-col items-center text-center">
                        <FileIcon className="w-8 h-8 text-purple-600 mb-3" />
                        <div className="font-medium text-slate-900">Terms & Policies</div>
                        <div className="text-sm text-slate-600 mt-1">Read our terms and policies</div>
                      </button>

                      <button className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex flex-col items-center text-center">
                        <ShareIcon className="w-8 h-8 text-orange-600 mb-3" />
                        <div className="font-medium text-slate-900">Share Feedback</div>
                        <div className="text-sm text-slate-600 mt-1">Tell us how we can improve</div>
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-sm text-slate-600">
                        <p className="font-medium text-slate-900 mb-2">App Version</p>
                        <p>Version 2.1.0 • Last updated: Nov 15, 2024</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Update Password
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}