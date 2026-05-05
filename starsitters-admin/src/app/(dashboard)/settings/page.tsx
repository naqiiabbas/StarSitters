"use client";

import React, { useState } from "react";
import { Settings as SettingsIcon, Users, ChevronDown, Save } from "lucide-react";

type SettingsTab = "platform" | "security" | "data" | "audit";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("platform");

  const [systemNotifications, setSystemNotifications] = useState(true);
  const [autoVerification, setAutoVerification] = useState(false);
  const [minAge, setMinAge] = useState("11 years");
  const [maxDuration, setMaxDuration] = useState("8 hours");
  const [gpsTracking, setGpsTracking] = useState("Required");

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[32px] leading-[40px] font-bold text-white">
          System Settings
        </h1>
        <p className="mt-1 text-[15px] text-[#94a3b8]">
          Configure platform rules, security, and administrative controls
        </p>
      </div>

      {/* Tabs */}
      <div className="inline-flex gap-2 bg-[#0f172a]/60 border border-[#334155]/50 rounded-full p-1.5">
        <TabButton
          label="Platform"
          active={activeTab === "platform"}
          onClick={() => setActiveTab("platform")}
        />
        <TabButton
          label="Security"
          active={activeTab === "security"}
          onClick={() => setActiveTab("security")}
        />
        <TabButton
          label="Data"
          active={activeTab === "data"}
          onClick={() => setActiveTab("data")}
        />
        <TabButton
          label="Audit Log"
          active={activeTab === "audit"}
          onClick={() => setActiveTab("audit")}
        />
      </div>

      {/* Platform tab content */}
      {activeTab === "platform" && (
        <div className="space-y-6">
          {/* Platform Rules card */}
          <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-start gap-3 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-[10px] bg-[#b8e0f0]/10 border border-[#b8e0f0]/20 flex items-center justify-center">
                <SettingsIcon
                  className="w-[18px] h-[18px] text-[#b8e0f0]"
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <h2 className="text-[18px] leading-[26px] font-semibold text-white">
                  Platform Rules
                </h2>
                <p className="mt-0.5 text-[14px] text-[#94a3b8]">
                  Configure general platform behavior and rules
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <ToggleSetting
                title="System Notifications"
                description="Enable automated notifications for platform events"
                checked={systemNotifications}
                onChange={setSystemNotifications}
              />
              <ToggleSetting
                title="Auto-Verification"
                description="Automatically approve low-risk verifications"
                checked={autoVerification}
                onChange={setAutoVerification}
              />
              <SelectSetting
                title="Minimum Babysitter Age"
                description="Minimum age required to register as a babysitter"
                value={minAge}
                onChange={setMinAge}
                options={["11 years", "12 years", "13 years", "14 years", "15 years"]}
              />
              <SelectSetting
                title="Maximum Job Duration"
                description="Maximum allowed duration for a single job"
                value={maxDuration}
                onChange={setMaxDuration}
                options={["4 hours", "6 hours", "8 hours", "10 hours", "12 hours"]}
              />
              <SelectSetting
                title="GPS Tracking"
                description="GPS location verification for clock in/out"
                value={gpsTracking}
                onChange={setGpsTracking}
                options={["Required", "Optional", "Disabled"]}
              />
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center gap-2 h-[44px] px-5 bg-[#86efac] hover:bg-[#6ee7b7] text-[#064e3b] text-[14px] font-semibold rounded-[10px] transition-all"
              >
                <Save className="w-[16px] h-[16px]" strokeWidth={2.25} />
                Save Platform Settings
              </button>
            </div>
          </section>

          {/* Role-Based Access Control card */}
          <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-start gap-3 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-[10px] bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center">
                <Users
                  className="w-[18px] h-[18px] text-[#c4b5fd]"
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <h2 className="text-[18px] leading-[26px] font-semibold text-white">
                  Role-Based Access Control
                </h2>
                <p className="mt-0.5 text-[14px] text-[#94a3b8]">
                  Manage admin roles and permissions
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <RoleRow
                name="Super Admin"
                description="Full system access"
                permissions="All permissions enabled"
                activeCount={1}
              />
            </div>
          </section>
        </div>
      )}

      {/* Other tabs — placeholder until UI provided */}
      {activeTab !== "platform" && (
        <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-12 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] text-center">
          <p className="text-[15px] text-[#94a3b8]">
            {tabLabel(activeTab)} settings — UI coming soon.
          </p>
        </section>
      )}
    </div>
  );
}

function tabLabel(tab: SettingsTab): string {
  if (tab === "security") return "Security";
  if (tab === "data") return "Data";
  return "Audit Log";
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[40px] px-7 rounded-full text-[14px] font-medium transition-all ${
        active
          ? "bg-[#1e293b]/80 border border-white/10 text-white"
          : "bg-transparent border border-transparent text-[#94a3b8] hover:text-white hover:bg-white/5"
      }`}
    >
      {label}
    </button>
  );
}

function ToggleSetting({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="bg-[#0f172a]/60 border border-white/10 rounded-[12px] px-5 py-4 flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[15px] font-medium text-white">{title}</p>
        <p className="mt-0.5 text-[13px] text-[#94a3b8]">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative flex-shrink-0 w-[44px] h-[24px] rounded-full transition-colors ${
          checked ? "bg-[#b8e0f0]" : "bg-[#334155]"
        }`}
      >
        <span
          className={`absolute top-[2px] w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
            checked ? "left-[22px]" : "left-[2px]"
          }`}
        />
      </button>
    </div>
  );
}

function SelectSetting({
  title,
  description,
  value,
  onChange,
  options,
}: {
  title: string;
  description: string;
  value: string;
  onChange: (next: string) => void;
  options: string[];
}) {
  return (
    <div className="bg-[#0f172a]/60 border border-white/10 rounded-[12px] px-5 py-4">
      <p className="text-[15px] font-medium text-white mb-3">{title}</p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full h-[44px] bg-[#0f172a]/80 border border-[#334155]/60 rounded-[10px] pl-4 pr-10 text-[14px] text-white focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
      </div>
      <p className="mt-2 text-[13px] text-[#94a3b8]">{description}</p>
    </div>
  );
}

function RoleRow({
  name,
  description,
  permissions,
  activeCount,
}: {
  name: string;
  description: string;
  permissions: string;
  activeCount: number;
}) {
  return (
    <div className="bg-[#0f172a]/60 border border-white/10 rounded-[12px] px-5 py-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[15px] font-semibold text-white">{name}</p>
        <p className="mt-0.5 text-[13px] text-[#94a3b8]">{description}</p>
        <p className="mt-1 text-[13px] text-[#94a3b8]">{permissions}</p>
      </div>
      <span className="flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-md bg-[#86efac]/15 border border-[#86efac]/30 text-[#86efac] text-[12px] font-medium">
        {activeCount} Active
      </span>
    </div>
  );
}
