"use client";

import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Users,
  Shield,
  Database,
  History,
  ChevronDown,
  Save,
} from "lucide-react";

type SettingsTab = "platform" | "security" | "data" | "audit";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("platform");

  // Platform tab state
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [autoVerification, setAutoVerification] = useState(false);
  const [minAge, setMinAge] = useState("11 years");
  const [maxDuration, setMaxDuration] = useState("8 hours");
  const [gpsTracking, setGpsTracking] = useState("Required");

  // Security tab state
  const [twoFactor, setTwoFactor] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [loginAttempts, setLoginAttempts] = useState("5 attempts");

  // Data tab state
  const [retentionMonths, setRetentionMonths] = useState("24");
  const [autoCleanup, setAutoCleanup] = useState("Enabled");
  const [backupFrequency, setBackupFrequency] = useState("Daily");

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

      {/* Platform tab */}
      {activeTab === "platform" && (
        <div className="space-y-6">
          <SectionCard
            iconColor="cyan"
            icon={SettingsIcon}
            title="Platform Rules"
            description="Configure general platform behavior and rules"
          >
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
            <SaveButton label="Save Platform Settings" />
          </SectionCard>

          <SectionCard
            iconColor="purple"
            icon={Users}
            title="Role-Based Access Control"
            description="Manage admin roles and permissions"
          >
            <div className="space-y-3">
              <RoleRow
                name="Super Admin"
                description="Full system access"
                permissions="All permissions enabled"
                activeCount={1}
              />
            </div>
          </SectionCard>
        </div>
      )}

      {/* Security tab */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <SectionCard
            iconColor="green"
            icon={Shield}
            title="Security Settings"
            description="Configure security policies and authentication"
          >
            <div className="space-y-3">
              <ToggleSetting
                title="Two-Factor Authentication"
                description="Require 2FA for all admin accounts"
                checked={twoFactor}
                onChange={setTwoFactor}
              />
              <NumberWithSuffixSetting
                title="Session Timeout"
                value={sessionTimeout}
                onChange={setSessionTimeout}
                suffix="minutes of inactivity"
                description="Auto-logout after specified time"
              />
              <PasswordPolicySetting
                items={[
                  "Minimum 8 characters",
                  "Require uppercase and lowercase",
                  "Require numbers and special characters",
                  "Password expiry: 90 days",
                ]}
              />
              <SelectSetting
                title="Login Attempt Limits"
                description="Lock account after failed attempts"
                value={loginAttempts}
                onChange={setLoginAttempts}
                options={["3 attempts", "5 attempts", "10 attempts"]}
              />
            </div>
            <SaveButton label="Save Security Settings" />
          </SectionCard>
        </div>
      )}

      {/* Data tab */}
      {activeTab === "data" && (
        <div className="space-y-6">
          <SectionCard
            iconColor="purple"
            icon={Database}
            title="Data Management"
            description="Configure data retention and privacy policies"
          >
            <div className="space-y-3">
              <NumberWithSuffixSetting
                title="Data Retention Period"
                value={retentionMonths}
                onChange={setRetentionMonths}
                suffix="months"
                description="How long to retain user data after account deletion"
              />
              <SelectSetting
                title="Automated Data Cleanup"
                description="Automatically delete data after retention period"
                value={autoCleanup}
                onChange={setAutoCleanup}
                options={["Enabled", "Disabled"]}
              />
              <SelectSetting
                title="Backup Frequency"
                description="Automated database backup schedule"
                value={backupFrequency}
                onChange={setBackupFrequency}
                options={["Hourly", "Daily", "Weekly", "Monthly"]}
              />
              <EncryptionStatusBlock
                rows={[
                  { label: "Data at Rest", status: "Encrypted" },
                  { label: "Data in Transit", status: "SSL/TLS" },
                  { label: "Payment Data", status: "PCI Compliant" },
                ]}
              />
            </div>
            <SaveButton label="Save Data Settings" />
          </SectionCard>
        </div>
      )}

      {/* Audit Log tab */}
      {activeTab === "audit" && (
        <div className="space-y-6">
          <SectionCard
            iconColor="blue"
            icon={History}
            title="Audit Log"
            description="Complete history of administrative actions"
          >
            <AuditLogTable
              rows={[
                {
                  timestamp: "2024-02-24 15:30",
                  admin: "Admin User",
                  action: "Updated wage configuration for age 15-17",
                  category: "Configuration",
                },
                {
                  timestamp: "2024-02-24 10:15",
                  admin: "Admin User",
                  action: "Approved family verification for Johnson Family",
                  category: "Verification",
                },
                {
                  timestamp: "2024-02-23 16:45",
                  admin: "Admin User",
                  action: "Changed data retention policy to 24 months",
                  category: "Security",
                },
                {
                  timestamp: "2024-02-23 14:20",
                  admin: "Admin User",
                  action: "Approved certification for Emma Martinez",
                  category: "Certification",
                },
              ]}
            />
          </SectionCard>
        </div>
      )}
    </div>
  );
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

type IconAccent = "cyan" | "purple" | "green" | "blue";

const accentMap: Record<
  IconAccent,
  { bg: string; border: string; text: string }
> = {
  cyan: {
    bg: "bg-[#b8e0f0]/10",
    border: "border-[#b8e0f0]/20",
    text: "text-[#b8e0f0]",
  },
  purple: {
    bg: "bg-[#a78bfa]/10",
    border: "border-[#a78bfa]/20",
    text: "text-[#c4b5fd]",
  },
  green: {
    bg: "bg-[#86efac]/10",
    border: "border-[#86efac]/20",
    text: "text-[#86efac]",
  },
  blue: {
    bg: "bg-[#3b82f6]/10",
    border: "border-[#3b82f6]/20",
    text: "text-[#60a5fa]",
  },
};

function SectionCard({
  icon: Icon,
  iconColor,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconColor: IconAccent;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const accent = accentMap[iconColor];
  return (
    <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-start gap-3 mb-6">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-[10px] ${accent.bg} border ${accent.border} flex items-center justify-center`}
        >
          <Icon className={`w-[18px] h-[18px] ${accent.text}`} strokeWidth={1.75} />
        </div>
        <div>
          <h2 className="text-[18px] leading-[26px] font-semibold text-white">
            {title}
          </h2>
          <p className="mt-0.5 text-[14px] text-[#94a3b8]">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function SaveButton({ label }: { label: string }) {
  return (
    <div className="mt-6">
      <button
        type="button"
        className="inline-flex items-center gap-2 h-[44px] px-5 bg-[#86efac] hover:bg-[#6ee7b7] text-[#064e3b] text-[14px] font-semibold rounded-[10px] transition-all"
      >
        <Save className="w-[16px] h-[16px]" strokeWidth={2.25} />
        {label}
      </button>
    </div>
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

function NumberWithSuffixSetting({
  title,
  value,
  onChange,
  suffix,
  description,
}: {
  title: string;
  value: string;
  onChange: (next: string) => void;
  suffix: string;
  description: string;
}) {
  return (
    <div className="bg-[#0f172a]/60 border border-white/10 rounded-[12px] px-5 py-4">
      <p className="text-[15px] font-medium text-white mb-3">{title}</p>
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-[120px] h-[44px] bg-[#0f172a]/80 border border-[#334155]/60 rounded-[10px] px-4 text-[14px] text-white focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
        />
        <span className="text-[14px] text-[#cbd5e1]">{suffix}</span>
      </div>
      <p className="mt-3 text-[13px] text-[#94a3b8]">{description}</p>
    </div>
  );
}

function PasswordPolicySetting({ items }: { items: string[] }) {
  return (
    <div className="bg-[#0f172a]/60 border border-white/10 rounded-[12px] px-5 py-4">
      <p className="text-[15px] font-medium text-white mb-3">Password Policy</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86efac] flex-shrink-0" />
            <span className="text-[14px] text-[#cbd5e1]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EncryptionStatusBlock({
  rows,
}: {
  rows: { label: string; status: string }[];
}) {
  return (
    <div className="bg-[#0f172a]/60 border border-white/10 rounded-[12px] px-5 py-4">
      <p className="text-[15px] font-medium text-white mb-3">Encryption Status</p>
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4"
          >
            <span className="text-[14px] text-[#cbd5e1]">{row.label}</span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#86efac]/15 border border-[#86efac]/30 text-[#86efac] text-[12px] font-medium">
              {row.status}
            </span>
          </div>
        ))}
      </div>
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

interface AuditLogRow {
  timestamp: string;
  admin: string;
  action: string;
  category: string;
}

function AuditLogTable({ rows }: { rows: AuditLogRow[] }) {
  return (
    <div className="bg-[#0f172a]/60 border border-white/10 rounded-[12px] overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-[#334155]/50">
              <th className="text-[13px] font-medium text-[#94a3b8] py-3 px-5 text-left">
                Timestamp
              </th>
              <th className="text-[13px] font-medium text-[#94a3b8] py-3 px-5 text-left">
                Admin
              </th>
              <th className="text-[13px] font-medium text-[#94a3b8] py-3 px-5 text-left">
                Action
              </th>
              <th className="text-[13px] font-medium text-[#94a3b8] py-3 px-5 text-left">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-[#334155]/30 last:border-0"
              >
                <td className="py-4 px-5 text-[14px] text-white whitespace-nowrap">
                  {row.timestamp}
                </td>
                <td className="py-4 px-5 text-[14px] text-white whitespace-nowrap">
                  {row.admin}
                </td>
                <td className="py-4 px-5 text-[14px] text-[#cbd5e1]">
                  {row.action}
                </td>
                <td className="py-4 px-5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#cbd5e1] text-[12px] font-medium">
                    {row.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
