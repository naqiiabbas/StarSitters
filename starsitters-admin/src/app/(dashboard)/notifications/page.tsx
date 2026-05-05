"use client";

import React, { useState } from "react";
import { Search, ChevronDown, CheckCircle2, Clock, XCircle } from "lucide-react";

type NotificationRole = "Family" | "Babysitter";
type NotificationStatus = "Delivered" | "Sent" | "Failed";

interface NotificationLog {
  id: string;
  recipient: string;
  role: NotificationRole;
  triggerType: string;
  message: string;
  sentDate: string;
  status: NotificationStatus;
}

const initialNotifications: NotificationLog[] = [
  {
    id: "N001",
    recipient: "Johnson Family",
    role: "Family",
    triggerType: "Job Completed",
    message: "Your babysitting job with Sarah Davis has been completed",
    sentDate: "2024-02-24 18:05",
    status: "Delivered",
  },
  {
    id: "N002",
    recipient: "Sarah Davis",
    role: "Babysitter",
    triggerType: "Payment Processed",
    message: "Your payment of $60.00 has been processed",
    sentDate: "2024-02-24 18:10",
    status: "Delivered",
  },
  {
    id: "N003",
    recipient: "Emma Martinez",
    role: "Babysitter",
    triggerType: "Certification Approved",
    message: "Your CPR Certification has been approved",
    sentDate: "2024-02-24 16:30",
    status: "Delivered",
  },
  {
    id: "N004",
    recipient: "Miller Family",
    role: "Family",
    triggerType: "Account Verified",
    message: "Your account has been verified and is now active",
    sentDate: "2024-02-24 14:20",
    status: "Delivered",
  },
  {
    id: "N005",
    recipient: "Jake Thompson",
    role: "Babysitter",
    triggerType: "New Job Available",
    message: "A new babysitting job is available in your area",
    sentDate: "2024-02-24 12:00",
    status: "Sent",
  },
  {
    id: "N006",
    recipient: "Wilson Family",
    role: "Family",
    triggerType: "Verification Pending",
    message: "Your account verification is pending review",
    sentDate: "2024-02-24 10:15",
    status: "Failed",
  },
];

export default function NotificationsPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | NotificationRole>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | NotificationStatus>("all");

  const filtered = initialNotifications.filter((n) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      n.id.toLowerCase().includes(q) ||
      n.recipient.toLowerCase().includes(q) ||
      n.triggerType.toLowerCase().includes(q) ||
      n.message.toLowerCase().includes(q);
    const matchesRole = roleFilter === "all" || n.role === roleFilter;
    const matchesStatus = statusFilter === "all" || n.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[32px] leading-[40px] font-bold text-white">
          Notification Logs
        </h1>
        <p className="mt-1 text-[15px] text-[#94a3b8]">
          View all sent notifications and delivery status
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleStatCard label="Total Sent Today" value="847" valueColor="text-white" />
        <SimpleStatCard label="Delivered" value="832" valueColor="text-[#3b82f6]" />
        <SimpleStatCard label="Pending" value="12" valueColor="text-[#34d399]" />
        <SimpleStatCard label="Failed Delivery" value="3" valueColor="text-[#ef4444]" />
      </div>

      {/* Table card */}
      <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h2 className="text-[18px] leading-[26px] font-semibold text-white">
            All Notifications
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notifications..."
                className="w-full sm:w-[280px] h-[40px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-9 pr-4 text-[14px] text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(e.target.value as "all" | NotificationRole)
                }
                className="appearance-none w-full sm:w-[150px] h-[40px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-3 pr-9 text-[14px] text-white focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
              >
                <option value="all">All Roles</option>
                <option value="Family">Family</option>
                <option value="Babysitter">Babysitter</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | NotificationStatus)
                }
                className="appearance-none w-full sm:w-[170px] h-[40px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-3 pr-9 text-[14px] text-white focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
              >
                <option value="all">All Statuses</option>
                <option value="Delivered">Delivered</option>
                <option value="Sent">Sent</option>
                <option value="Failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[1040px]">
            <thead>
              <tr className="border-b border-[#334155]/50">
                <Th>ID</Th>
                <Th>Recipient</Th>
                <Th>Role</Th>
                <Th>Trigger Type</Th>
                <Th>Message</Th>
                <Th>Sent Date</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n) => (
                <tr
                  key={n.id}
                  className="border-b border-[#334155]/30 last:border-0"
                >
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">
                    {n.id}
                  </td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">
                    {n.recipient}
                  </td>
                  <td className="py-4 pr-4">
                    <RoleBadge role={n.role} />
                  </td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">
                    {n.triggerType}
                  </td>
                  <td className="py-4 pr-4 text-[14px] text-[#cbd5e1] max-w-[320px] truncate">
                    {n.message}
                  </td>
                  <td className="py-4 pr-4 text-[14px] text-[#94a3b8] whitespace-nowrap">
                    {n.sentDate}
                  </td>
                  <td className="py-4 pr-4">
                    <StatusBadge status={n.status} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10 text-center text-[14px] text-[#94a3b8]"
                  >
                    No notifications match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function SimpleStatCard({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor: string;
}) {
  return (
    <div className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
      <p className="text-[13px] leading-[18px] font-medium text-[#94a3b8]">
        {label}
      </p>
      <p className={`mt-3 text-[32px] leading-[40px] font-bold ${valueColor}`}>
        {value}
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-[13px] font-medium text-[#94a3b8] py-3 text-left pr-4">
      {children}
    </th>
  );
}

function RoleBadge({ role }: { role: NotificationRole }) {
  if (role === "Family") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#3b82f6]/15 border border-[#3b82f6]/30 text-[#60a5fa] text-[12px] font-medium">
        Family
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#a78bfa]/15 border border-[#a78bfa]/25 text-[#c4b5fd] text-[12px] font-medium">
      Babysitter
    </span>
  );
}

function StatusBadge({ status }: { status: NotificationStatus }) {
  if (status === "Delivered") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#34d399]/15 border border-[#34d399]/25 text-[#34d399] text-[12px] font-medium">
        <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
        Delivered
      </span>
    );
  }
  if (status === "Sent") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#3b82f6]/15 border border-[#3b82f6]/30 text-[#60a5fa] text-[12px] font-medium">
        <Clock className="w-3 h-3" strokeWidth={2.5} />
        Sent
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#ef4444] text-[12px] font-medium">
      <XCircle className="w-3 h-3" strokeWidth={2.5} />
      Failed
    </span>
  );
}
