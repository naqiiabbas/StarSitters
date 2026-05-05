"use client";

import React, { useState } from "react";
import { Eye, Search, ChevronDown, AlertTriangle } from "lucide-react";
import {
  DisputeDetailsModal,
  type DisputeDetail,
  type DisputePriority,
  type DisputeStatus,
} from "@/components/ui/DisputeDetailsModal";

interface Dispute {
  id: string;
  jobId: string;
  reportedBy: string;
  issueType: string;
  reportedDate: string;
  priority: DisputePriority;
  status: DisputeStatus;
  detail: DisputeDetail;
}

const initialDisputes: Dispute[] = [
  {
    id: "D001",
    jobId: "J1247",
    reportedBy: "Johnson Family",
    issueType: "Time Discrepancy",
    reportedDate: "2024-02-24 18:30",
    priority: "High",
    status: "Open",
    detail: {
      id: "D001",
      jobId: "J1247",
      reportedBy: "Johnson Family",
      issueType: "Time Discrepancy",
      priority: "High",
      status: "Open",
      description: "Clock-out time doesn't match actual end time",
      clockIn: "2024-02-24 14:00",
      clockOut: "2024-02-24 18:00",
      calculatedHours: "4.0 hours",
      calculatedWage: "$60.00",
      messageHistory: [
        {
          author: "Johnson Family",
          body: "The session actually ended at 17:45, not 18:00",
          timestamp: "2024-02-24 18:30",
        },
      ],
    },
  },
  {
    id: "D002",
    jobId: "J1245",
    reportedBy: "Sarah Davis (Babysitter)",
    issueType: "Payment Issue",
    reportedDate: "2024-02-23 20:15",
    priority: "Medium",
    status: "Investigating",
    detail: {
      id: "D002",
      jobId: "J1245",
      reportedBy: "Sarah Davis (Babysitter)",
      issueType: "Payment Issue",
      priority: "Medium",
      status: "Investigating",
      description: "Wage calculation appears incorrect",
      clockIn: "2024-02-23 14:00",
      clockOut: "2024-02-23 18:00",
      calculatedHours: "4.0 hours",
      calculatedWage: "$60.00",
      messageHistory: [
        {
          author: "Sarah Davis",
          body: "I worked 4 hours but was only paid for 3.5",
          timestamp: "2024-02-23 20:15",
        },
      ],
    },
  },
  {
    id: "D003",
    jobId: "J1240",
    reportedBy: "Miller Family",
    issueType: "No-Show",
    reportedDate: "2024-02-22 15:00",
    priority: "High",
    status: "Resolved",
    detail: {
      id: "D003",
      jobId: "J1240",
      reportedBy: "Miller Family",
      issueType: "No-Show",
      priority: "High",
      status: "Resolved",
      description: "Babysitter did not arrive at scheduled time",
      clockIn: "2024-02-22 14:00",
      clockOut: "2024-02-22 18:00",
      calculatedHours: "4.0 hours",
      calculatedWage: "$60.00",
      messageHistory: [
        {
          author: "Miller Family",
          body: "The session actually ended at 17:45, not 18:00",
          timestamp: "2024-02-22 15:00",
        },
      ],
      resolutionNotes:
        "Time adjusted to 3.75 hours. Wage recalculated to $56.25. Family notified.",
    },
  },
  {
    id: "D004",
    jobId: "J1238",
    reportedBy: "Jake Thompson (Babysitter)",
    issueType: "Safety Concern",
    reportedDate: "2024-02-21 14:30",
    priority: "High",
    status: "Resolved",
    detail: {
      id: "D004",
      jobId: "J1238",
      reportedBy: "Jake Thompson (Babysitter)",
      issueType: "Safety Concern",
      priority: "High",
      status: "Resolved",
      description: "Reported unsafe situation at the family residence",
      clockIn: "2024-02-21 09:00",
      clockOut: "2024-02-21 12:00",
      calculatedHours: "3.0 hours",
      calculatedWage: "$45.00",
      messageHistory: [
        {
          author: "Jake Thompson",
          body: "There was no one home when I arrived for the scheduled session",
          timestamp: "2024-02-21 14:30",
        },
      ],
      resolutionNotes:
        "Family contacted and warned. Session marked complete. Babysitter compensated for full booked hours.",
    },
  },
];

export default function DisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(initialDisputes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | DisputeStatus>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = disputes.find((d) => d.id === selectedId) ?? null;

  const handleResolve = (notes: string) => {
    if (!selectedId) return;
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === selectedId
          ? {
              ...d,
              status: "Resolved",
              detail: { ...d.detail, status: "Resolved", resolutionNotes: notes },
            }
          : d,
      ),
    );
    setSelectedId(null);
  };

  const handleUpdateStatus = (status: DisputeStatus) => {
    if (!selectedId) return;
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === selectedId
          ? { ...d, status, detail: { ...d.detail, status } }
          : d,
      ),
    );
  };

  const filtered = disputes.filter((d) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      d.id.toLowerCase().includes(q) ||
      d.jobId.toLowerCase().includes(q) ||
      d.reportedBy.toLowerCase().includes(q) ||
      d.issueType.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[32px] leading-[40px] font-bold text-white">
          Disputes &amp; Issues
        </h1>
        <p className="mt-1 text-[15px] text-[#94a3b8]">
          Manage reported issues and dispute resolution
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleStatCard label="Open Disputes" value="3" valueColor="text-white" />
        <SimpleStatCard label="Investigating" value="5" valueColor="text-[#3b82f6]" />
        <SimpleStatCard label="Resolved This Month" value="28" valueColor="text-[#34d399]" />
        <SimpleStatCard label="Avg Resolution Time" value="1.8 days" valueColor="text-[#c4b5fd]" />
      </div>

      {/* Table card */}
      <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h2 className="text-[18px] leading-[26px] font-semibold text-white">
            All Disputes
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search disputes..."
                className="w-full sm:w-[280px] h-[40px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-9 pr-4 text-[14px] text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | DisputeStatus)
                }
                className="appearance-none w-full sm:w-[170px] h-[40px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-3 pr-9 text-[14px] text-white focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
              >
                <option value="all">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Investigating">Investigating</option>
                <option value="Resolved">Resolved</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[940px]">
            <thead>
              <tr className="border-b border-[#334155]/50">
                <Th>Dispute ID</Th>
                <Th>Job ID</Th>
                <Th>Reported By</Th>
                <Th>Issue Type</Th>
                <Th>Reported Date</Th>
                <Th>Priority</Th>
                <Th>Status</Th>
                <Th align="right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-[#334155]/30 last:border-0"
                >
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{d.id}</td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{d.jobId}</td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{d.reportedBy}</td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{d.issueType}</td>
                  <td className="py-4 pr-4 text-[14px] text-[#94a3b8] whitespace-nowrap">{d.reportedDate}</td>
                  <td className="py-4 pr-4">
                    <PriorityBadge priority={d.priority} />
                  </td>
                  <td className="py-4 pr-4">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="py-4 pl-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => setSelectedId(d.id)}
                        aria-label="View dispute"
                        className="p-1.5 text-[#94a3b8] hover:text-white transition-colors"
                      >
                        <Eye className="w-[18px] h-[18px]" strokeWidth={1.75} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-[14px] text-[#94a3b8]">
                    No disputes match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <DisputeDetailsModal
        isOpen={selected !== null}
        onClose={() => setSelectedId(null)}
        data={selected?.detail ?? null}
        onResolve={handleResolve}
        onUpdateStatus={handleUpdateStatus}
      />
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

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`text-[13px] font-medium text-[#94a3b8] py-3 ${
        align === "right" ? "text-right pl-4" : "text-left pr-4"
      }`}
    >
      {children}
    </th>
  );
}

function PriorityBadge({ priority }: { priority: DisputePriority }) {
  if (priority === "High") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#ef4444] text-[12px] font-medium">
        <AlertTriangle className="w-3 h-3" strokeWidth={2.5} />
        High
      </span>
    );
  }
  if (priority === "Medium") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#a78bfa]/15 border border-[#a78bfa]/25 text-[#c4b5fd] text-[12px] font-medium">
        Medium
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#fbbf24]/15 border border-[#fbbf24]/25 text-[#fbbf24] text-[12px] font-medium">
      Low
    </span>
  );
}

function StatusBadge({ status }: { status: DisputeStatus }) {
  if (status === "Open") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#a78bfa]/15 border border-[#a78bfa]/25 text-[#c4b5fd] text-[12px] font-medium">
        Open
      </span>
    );
  }
  if (status === "Investigating") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#3b82f6]/15 border border-[#3b82f6]/30 text-[#60a5fa] text-[12px] font-medium">
        Investigating
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#34d399]/15 border border-[#34d399]/25 text-[#34d399] text-[12px] font-medium">
      Resolved
    </span>
  );
}
