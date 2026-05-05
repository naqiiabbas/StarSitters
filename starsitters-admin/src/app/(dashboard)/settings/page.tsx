"use client";

import React, { useState } from "react";
import { 
  User, 
  Shield, 
  CreditCard, 
  Bot, 
  Bell, 
  Lock,
  Save,
  ChevronDown,
  Check
} from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// --- Types ---
type SettingsTab = "profile" | "access" | "payment" | "scraper" | "notifications" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [toast, setToast] = useState({ show: false, message: "" });
  const isMobile = useMediaQuery("(max-width: 640px)");

  // Form States
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@gighub.com",
    role: "Super Admin"
  });

  const [payment, setPayment] = useState({
    provider: "Stripe",
    apiKey: "sk_live_xxxxxxxxxxxxxxxxxxxx",
    webhookSecret: "whsec_xxxxxxxxxxxxxxxxxxxx",
    holdPeriod: "24",
    fee: "12"
  });

  const [scraperSources, setScraperSources] = useState<Record<string, boolean>>({
    Eventbrite: true,
    Bandsintown: true,
    GigSalad: true,
    "The Bash": true,
    Thumbtack: true
  });

  const [emailPrefs, setEmailPrefs] = useState<Record<string, boolean>>({
    "New user registrations": true,
    "Dispute opened": true,
    "Payment issues": true,
    "Scraper failures": true,
    "Security alerts": true
  });

  const [systemPrefs, setSystemPrefs] = useState<Record<string, boolean>>({
    "Dashboard alerts": true,
    "Critical errors": true,
    "Weekly reports": true,
    "Monthly summaries": true
  });

  // --- Handlers ---
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // BACKEND DEVELOPER: Implement profile update API.
    setToast({ show: true, message: "Profile settings saved successfully." });
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // BACKEND DEVELOPER: Implement gateway configuration API.
    setToast({ show: true, message: "Payment gateway configuration updated." });
  };

  // --- Sidebar Items ---
  const sidebarItems = [
    { id: "profile", label: "Admin Profile", icon: User },
    { id: "access", label: "Access Control", icon: Shield },
    { id: "payment", label: "Payment Gateway", icon: CreditCard },
    { id: "scraper", label: "Scraper Settings", icon: Bot },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security Logs", icon: Lock },
  ];

  return (
    <div className="w-full text-white font-inter pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-[32px] font-bold mb-2 leading-tight">Settings</h1>
        <p className="text-[#999999] text-sm sm:text-[16px]">Manage system settings and configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Settings Navigation Sidebar */}
        <div className="col-span-1 lg:col-span-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-2 sm:p-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible custom-scrollbar whitespace-nowrap lg:whitespace-normal">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as SettingsTab)}
                className={`flex items-center gap-3.5 px-4 sm:px-5 py-3 sm:py-4 rounded-[8px] transition-all duration-200 border shrink-0 ${
                  isActive
                    ? "bg-[#A2F301] border-[#A2F301] text-black font-bold shadow-[0_0_15px_-5px_rgba(162,243,1,0.3)]"
                    : "bg-transparent border-transparent text-[#999999] hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={isMobile ? 18 : 20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[13px] sm:text-[14px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Area */}
        <div className="col-span-1 lg:col-span-8 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] overflow-hidden min-h-[400px] sm:min-h-[500px] shadow-2xl">
          
          {/* Admin Profile Tab */}
          {activeTab === "profile" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-[18px] sm:text-[20px] font-bold mb-8">Admin Profile Settings</h2>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">First Name</label>
                    <input 
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white focus:border-[#A2F301] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">Last Name</label>
                    <input 
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white focus:border-[#A2F301] outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">Email Address</label>
                  <input 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white focus:border-[#A2F301] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">Role</label>
                  <div className="w-full h-[48px] bg-white/[0.03] border border-[#2A2A2A] rounded-[8px] px-4 flex items-center text-[#666666] cursor-not-allowed text-[14px]">
                    {profile.role}
                  </div>
                </div>
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="h-[48px] px-8 bg-[#A2F301] text-black font-bold rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#8ed601] transition-all w-full sm:w-auto"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Access Control Tab */}
          {activeTab === "access" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-[18px] sm:text-[20px] font-bold mb-8">Role-Based Access Control</h2>
              <div className="space-y-4">
                {/* Super Admin */}
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-5 sm:p-6 shadow-lg hover:border-[#A2F301]/20 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-2">
                    <h3 className="text-white font-bold text-[16px]">Super Admin</h3>
                    <span className="px-2.5 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                      ALL PERMISSIONS
                    </span>
                  </div>
                  <p className="text-[#999999] text-[13px] sm:text-[14px]">Full system access and control</p>
                </div>

                {/* Admin */}
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-5 sm:p-6 shadow-lg hover:border-[#A2F301]/20 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <h3 className="text-white font-bold text-[16px]">Admin</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-[#A2F301]/10 text-[#A2F301] rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">USER MGMT</span>
                      <span className="px-2.5 py-1 bg-[#A2F301]/10 text-[#A2F301] rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">GIG MGMT</span>
                      <span className="px-2.5 py-1 bg-[#A2F301]/10 text-[#A2F301] rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">REVIEWS</span>
                    </div>
                  </div>
                  <p className="text-[#999999] text-[13px] sm:text-[14px]">Limited administrative access</p>
                </div>

                {/* Support */}
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-5 sm:p-6 shadow-lg hover:border-[#A2F301]/20 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                    <h3 className="text-white font-bold text-[16px]">Support</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">VIEW USERS</span>
                      <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">VIEW GIGS</span>
                      <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">DISPUTES</span>
                    </div>
                  </div>
                  <p className="text-[#999999] text-[13px] sm:text-[14px]">Customer support access only</p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Gateway Tab */}
          {activeTab === "payment" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-[18px] sm:text-[20px] font-bold mb-8">Payment Gateway Configuration</h2>
              <form onSubmit={handleSavePayment} className="space-y-6">
                <div>
                  <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">Payment Provider</label>
                  <div className="relative">
                    <select 
                      value={payment.provider}
                      onChange={(e) => setPayment({...payment, provider: e.target.value})}
                      className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white appearance-none focus:border-[#A2F301] outline-none text-[14px]"
                    >
                      <option>Stripe</option>
                      <option>PayPal</option>
                      <option>Crypto (Escrow)</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">API Key</label>
                  <input 
                    type="password"
                    value={payment.apiKey}
                    onChange={(e) => setPayment({...payment, apiKey: e.target.value})}
                    className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white focus:border-[#A2F301] outline-none transition-all text-[14px]"
                    placeholder="sk_live_..."
                  />
                </div>
                <div>
                  <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">Webhook Secret</label>
                  <input 
                    type="password"
                    value={payment.webhookSecret}
                    onChange={(e) => setPayment({...payment, webhookSecret: e.target.value})}
                    className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white focus:border-[#A2F301] outline-none transition-all text-[14px]"
                    placeholder="whsec_..."
                  />
                </div>
                
                <h3 className="text-[16px] font-bold pt-4 pb-2">Escrow Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">Hold Period (hours)</label>
                    <input 
                      type="number"
                      value={payment.holdPeriod}
                      onChange={(e) => setPayment({...payment, holdPeriod: e.target.value})}
                      className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white focus:border-[#A2F301] outline-none text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">Platform Fee (%)</label>
                    <input 
                      type="number"
                      value={payment.fee}
                      onChange={(e) => setPayment({...payment, fee: e.target.value})}
                      className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white focus:border-[#A2F301] outline-none text-[14px]"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="h-[48px] px-8 bg-[#A2F301] text-black font-bold rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#8ed601] transition-all w-full sm:w-auto"
                  >
                    <Save size={18} />
                    Save Configuration
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Logs Tab */}
          {activeTab === "security" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-[18px] sm:text-[20px] font-bold mb-8">Security Activity Logs</h2>
              <div className="space-y-4">
                {[
                  { action: "Admin login", email: "admin@gighub.com", date: "2026-02-17 09:30", status: "success" },
                  { action: "User suspended", email: "admin@gighub.com", date: "2026-02-17 08:15", status: "success" },
                  { action: "Failed login attempt", email: "unknown@example.com", date: "2026-02-17 03:22", status: "failed" },
                  { action: "Password changed", email: "admin@gighub.com", date: "2026-02-16 16:45", status: "success" },
                  { action: "Settings updated", email: "admin@gighub.com", date: "2026-02-16 14:30", status: "success" },
                ].map((log, idx) => (
                  <div key={idx} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-white/10 transition-all shadow-lg">
                    <div>
                      <h3 className="text-white font-bold text-[15px] sm:text-[16px] mb-1">{log.action}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[#999999] text-[12px] sm:text-[13px]">
                        <span>{log.email}</span>
                        <span className="hidden sm:inline w-1 h-1 rounded-full bg-[#333333]" />
                        <span>{log.date}</span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-[4px] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                      log.status === "success" 
                        ? "bg-[#10B981]/10 text-[#10B981]" 
                        : "bg-[#EF4444]/10 text-[#EF4444]"
                    }`}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-[18px] sm:text-[20px] font-bold mb-8">Notification Preferences</h2>
              
              <div className="space-y-8">
                {/* Email Notifications Section */}
                <div>
                  <h3 className="text-[#999999] text-[12px] sm:text-[14px] font-medium mb-4 uppercase tracking-wider">Email Notifications</h3>
                  <div className="space-y-3">
                    {Object.keys(emailPrefs).map((pref) => (
                      <div 
                        key={pref} 
                        onClick={() => setEmailPrefs(prev => ({ ...prev, [pref]: !prev[pref] }))}
                        className="flex items-center gap-3 px-4 sm:px-5 py-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] group hover:border-white/10 cursor-pointer transition-all shadow-md"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all shrink-0 ${
                          emailPrefs[pref] ? "bg-[#A2F301]" : "border-2 border-[#333333] bg-transparent"
                        }`}>
                          {emailPrefs[pref] && (
                            <Check size={12} strokeWidth={3} className="text-black" />
                          )}
                        </div>
                        <span className={`text-[13px] sm:text-[14px] font-medium transition-colors ${
                          emailPrefs[pref] ? "text-white" : "text-[#666666]"
                        }`}>
                          {pref}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Notifications Section */}
                <div>
                  <h3 className="text-[#999999] text-[12px] sm:text-[14px] font-medium mb-4 uppercase tracking-wider">System Notifications</h3>
                  <div className="space-y-3">
                    {Object.keys(systemPrefs).map((pref) => (
                      <div 
                        key={pref} 
                        onClick={() => setSystemPrefs(prev => ({ ...prev, [pref]: !prev[pref] }))}
                        className="flex items-center gap-3 px-4 sm:px-5 py-4 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] group hover:border-white/10 cursor-pointer transition-all shadow-md"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all shrink-0 ${
                          systemPrefs[pref] ? "bg-[#A2F301]" : "border-2 border-[#333333] bg-transparent"
                        }`}>
                          {systemPrefs[pref] && (
                            <Check size={12} strokeWidth={3} className="text-black" />
                          )}
                        </div>
                        <span className={`text-[13px] sm:text-[14px] font-medium transition-colors ${
                          systemPrefs[pref] ? "text-white" : "text-[#666666]"
                        }`}>
                          {pref}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setToast({ show: true, message: "Notification preferences saved." })}
                    className="h-[48px] px-8 bg-[#A2F301] text-black font-bold rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#8ed601] transition-all w-full sm:w-auto"
                  >
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Scraper Settings Tab */}
          {activeTab === "scraper" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-[18px] sm:text-[20px] font-bold mb-8">Scraper Schedule & Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">Schedule Frequency</label>
                  <div className="relative">
                    <select className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white appearance-none focus:border-[#A2F301] outline-none text-[14px]">
                      <option>Daily</option>
                      <option>Twice Daily</option>
                      <option>Weekly</option>
                      <option>Manual Only</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] pointer-events-none" />
                  </div>
                </div>

                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-5 sm:p-6 shadow-lg">
                  <h3 className="text-white font-bold text-[14px] mb-4">Active Sources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(scraperSources).map((source) => (
                      <div 
                        key={source} 
                        onClick={() => setScraperSources(prev => ({ ...prev, [source]: !prev[source] }))}
                        className="flex items-center gap-3 group cursor-pointer"
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all shrink-0 ${
                          scraperSources[source] ? "bg-[#A2F301]" : "border-2 border-[#333333] bg-transparent"
                        }`}>
                          {scraperSources[source] && (
                            <Check size={12} strokeWidth={3} className="text-black" />
                          )}
                        </div>
                        <span className={`text-[13px] sm:text-[14px] font-medium transition-colors ${
                          scraperSources[source] ? "text-white" : "text-[#666666]"
                        }`}>
                          {source}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">Duplicate Detection Threshold</label>
                  <input 
                    type="number"
                    defaultValue={85}
                    className="w-full h-[48px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] px-4 text-white focus:border-[#A2F301] outline-none text-[14px]"
                  />
                  <p className="text-[#666666] text-[11px] sm:text-[12px] mt-2 italic">Similarity percentage to flag as duplicate</p>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setToast({ show: true, message: "Scraper configurations updated." })}
                    className="h-[48px] px-8 bg-[#A2F301] text-black font-bold rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#8ed601] transition-all w-full sm:w-auto"
                  >
                    <Save size={18} />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs (None remaining currently) */}
        </div>
      </div>

      <Toast 
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

// Utility component for placeholders
function SettingsIcon({ tab }: { tab: string }) {
  if (tab === "scraper") return <Bot size={40} className="text-[#3B82F6]" />;
  if (tab === "notifications") return <Bell size={40} className="text-[#F59E0B]" />;
  if (tab === "security") return <Lock size={40} className="text-[#EF4444]" />;
  return null;
}
