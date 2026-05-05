"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
} from "lucide-react";
import {
  JobDetailsModal,
  type JobDetail,
  type JobStatus,
} from "@/components/ui/JobDetailsModal";

interface Job {
  id: string;
  familyName: string;
  babysitterName: string | null;
  date: string;
  status: JobStatus;
  totalHours: number | null;
  totalWage: number | null;
  detail: JobDetail;
}

const LOCATION = "123 Main Street, Springfield, IL";

const initialJobs: Job[] = [
  {
    id: "J1247",
    familyName: "Johnson Family",
    babysitterName: "Sarah Davis",
    date: "2024-02-24",
    status: "Completed",
    totalHours: 4,
    totalWage: 60,
    detail: {
      id: "J1247",
      familyName: "Johnson Family",
      babysitterName: "Sarah Davis",
      date: "2024-02-24",
      status: "Completed",
      totalHoursLabel: "4 hours",
      location: LOCATION,
      locationVerified: true,
      clockIn: "14:00",
      clockOut: "18:00",
      hourlyRate: 15.0,
      hoursWorked: 4,
      totalWage: 60,
      timeline: [
        { kind: "posted", title: "Job posted by family", timestamp: "2024-02-22 10:30" },
        { kind: "accepted", title: "Babysitter accepted job", timestamp: "2024-02-22 14:15" },
        { kind: "clockIn", title: "Clock in recorded", timestamp: "2024-02-24 14:00" },
        { kind: "clockOut", title: "Clock out recorded", timestamp: "2024-02-24 18:00" },
      ],
    },
  },
  {
    id: "J1248",
    familyName: "Miller Family",
    babysitterName: "Jake Thompson",
    date: "2024-02-24",
    status: "In Progress",
    totalHours: null,
    totalWage: null,
    detail: {
      id: "J1248",
      familyName: "Miller Family",
      babysitterName: "Jake Thompson",
      date: "2024-02-24",
      status: "In Progress",
      totalHoursLabel: "Not completed",
      location: LOCATION,
      locationVerified: true,
      clockIn: "15:30",
      clockOut: null,
      timeline: [
        { kind: "posted", title: "Job posted by family", timestamp: "2024-02-22 10:30" },
        { kind: "accepted", title: "Babysitter accepted job", timestamp: "2024-02-22 14:15" },
        { kind: "clockIn", title: "Clock in recorded", timestamp: "2024-02-24 15:30" },
      ],
    },
  },
  {
    id: "J1249",
    familyName: "Davis Family",
    babysitterName: "Emma Martinez",
    date: "2024-02-25",
    status: "Hired",
    totalHours: null,
    totalWage: null,
    detail: {
      id: "J1249",
      familyName: "Davis Family",
      babysitterName: "Emma Martinez",
      date: "2024-02-25",
      status: "Hired",
      totalHoursLabel: "Not completed",
      location: LOCATION,
      locationVerified: true,
      timeline: [
        { kind: "posted", title: "Job posted by family", timestamp: "2024-02-22 10:30" },
        { kind: "accepted", title: "Babysitter accepted job", timestamp: "2024-02-22 14:15" },
        { kind: "clockIn", title: "Clock in recorded", timestamp: "2024-02-25" },
      ],
    },
  },
  {
    id: "J1250",
    familyName: "Wilson Family",
    babysitterName: null,
    date: "2024-02-26",
    status: "Open",
    totalHours: null,
    totalWage: null,
    detail: {
      id: "J1250",
      familyName: "Wilson Family",
      babysitterName: null,
      date: "2024-02-26",
      status: "Open",
      totalHoursLabel: "Not completed",
      location: LOCATION,
      locationVerified: true,
      timeline: [
        { kind: "posted", title: "Job posted by family", timestamp: "2024-02-22 10:30" },
        { kind: "accepted", title: "Babysitter accepted job", timestamp: "2024-02-22 14:15" },
        { kind: "clockIn", title: "Clock in recorded", timestamp: "2024-02-26" },
      ],
    },
  },
  {
    id: "J1246",
    familyName: "Anderson Family",
    babysitterName: "Marcus Johnson",
    date: "2024-02-23",
    status: "Completed",
    totalHours: 5,
    totalWage: 75,
    detail: {
      id: "J1246",
      familyName: "Anderson Family",
      babysitterName: "Marcus Johnson",
      date: "2024-02-23",
      status: "Completed",
      totalHoursLabel: "5 hours",
      location: LOCATION,
      locationVerified: true,
      clockIn: "13:00",
      clockOut: "18:00",
      hourlyRate: 15.0,
      hoursWorked: 5,
      totalWage: 75,
      timeline: [
        { kind: "posted", title: "Job posted by family", timestamp: "2024-02-21 09:15" },
        { kind: "accepted", title: "Babysitter accepted job", timestamp: "2024-02-21 13:40" },
        { kind: "clockIn", title: "Clock in recorded", timestamp: "2024-02-23 13:00" },
        { kind: "clockOut", title: "Clock out recorded", timestamp: "2024-02-23 18:00" },
      ],
    },
  },
];

export default function JobsMonitoringPage() {
  const [jobs] = useState<Job[]>(initialJobs);
  const [topSearch, setTopSearch] = useState("");
  const [topFilter, setTopFilter] = useState<"all" | JobStatus>("all");
  const [tableSearch, setTableSearch] = useState("");
  const [tableFilter, setTableFilter] = useState<"all" | JobStatus>("all");
  const [selected, setSelected] = useState<JobDetail | null>(null);

  const search = (tableSearch || topSearch).toLowerCase();
  const statusFilter = tableFilter !== "all" ? tableFilter : topFilter;

  const filtered = jobs.filter((j) => {
    const matchesSearch =
      !search ||
      j.id.toLowerCase().includes(search) ||
      j.familyName.toLowerCase().includes(search) ||
      (j.babysitterName?.toLowerCase().includes(search) ?? false);
    const matchesStatus = statusFilter === "all" || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[32px] leading-[40px] font-bold text-white">
          Jobs Monitoring
        </h1>
        <p className="mt-1 text-[15px] text-[#94a3b8]">
          Platform transparency and job activity tracking
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleStatCard label="Open Jobs" value="12" valueColor="text-white" />
        <SimpleStatCard label="In Progress" value="38" valueColor="text-[#7dd3fc]" />
        <SimpleStatCard label="Completed Today" value="18" valueColor="text-[#34d399]" />
        <SimpleStatCard label="Total Jobs" value="1,847" valueColor="text-[#c4b5fd]" />
      </div>

      {/* Top search card */}
      <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#64748b]" />
            <input
              value={topSearch}
              onChange={(e) => setTopSearch(e.target.value)}
              placeholder="Search jobs by family, babysitter, or ID..."
              className="w-full h-[48px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-11 pr-4 text-[14px] text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
            />
          </div>
          <button
            type="button"
            aria-label="Filter"
            className="hidden sm:flex w-[48px] h-[48px] items-center justify-center bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] text-[#94a3b8] hover:text-white transition-colors"
          >
            <Filter className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
          <div className="relative">
            <select
              value={topFilter}
              onChange={(e) => setTopFilter(e.target.value as "all" | JobStatus)}
              className="appearance-none w-full sm:w-[180px] h-[48px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-4 pr-10 text-[14px] text-white focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
            >
              <option value="all">All Jobs</option>
              <option value="Open">Open</option>
              <option value="Hired">Hired</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Jobs table */}
      <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h2 className="text-[18px] leading-[26px] font-semibold text-white">
            All Jobs
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Search jobs..."
                className="w-full sm:w-[280px] h-[40px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-9 pr-4 text-[14px] text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={tableFilter}
                onChange={(e) => setTableFilter(e.target.value as "all" | JobStatus)}
                className="appearance-none w-full sm:w-[170px] h-[40px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-3 pr-9 text-[14px] text-white focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
              >
                <option value="all">All Statuses</option>
                <option value="Open">Open</option>
                <option value="Hired">Hired</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[940px]">
            <thead>
              <tr className="border-b border-[#334155]/50">
                <Th>Job ID</Th>
                <Th>Family Name</Th>
                <Th>Babysitter Name</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Total Hours</Th>
                <Th>Total Wage</Th>
                <Th align="right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((j) => (
                <tr
                  key={j.id}
                  className="border-b border-[#334155]/30 last:border-0"
                >
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{j.id}</td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{j.familyName}</td>
                  <td className="py-4 pr-4 text-[14px] whitespace-nowrap">
                    {j.babysitterName ? (
                      <span className="text-white">{j.babysitterName}</span>
                    ) : (
                      <span className="text-[#94a3b8]">-</span>
                    )}
                  </td>
                  <td className="py-4 pr-4 text-[14px] text-[#94a3b8] whitespace-nowrap">{j.date}</td>
                  <td className="py-4 pr-4">
                    <StatusBadge status={j.status} />
                  </td>
                  <td className="py-4 pr-4 text-[14px] whitespace-nowrap">
                    {j.totalHours !== null ? (
                      <span className="text-white">{j.totalHours}h</span>
                    ) : (
                      <span className="text-[#94a3b8]">-</span>
                    )}
                  </td>
                  <td className="py-4 pr-4 text-[14px] whitespace-nowrap">
                    {j.totalWage !== null ? (
                      <span className="text-white">${j.totalWage}</span>
                    ) : (
                      <span className="text-[#94a3b8]">-</span>
                    )}
                  </td>
                  <td className="py-4 pl-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => setSelected(j.detail)}
                        aria-label="View job"
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
                    No jobs match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <JobDetailsModal
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        data={selected}
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

function StatusBadge({ status }: { status: JobStatus }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#34d399]/15 border border-[#34d399]/25 text-[#34d399] text-[12px] font-medium">
        Completed
      </span>
    );
  }
  if (status === "In Progress") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#7dd3fc]/15 border border-[#7dd3fc]/25 text-[#7dd3fc] text-[12px] font-medium whitespace-nowrap">
        In Progress
      </span>
    );
  }
  if (status === "Hired") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#a78bfa]/15 border border-[#a78bfa]/25 text-[#c4b5fd] text-[12px] font-medium">
        Hired
      </span>
    );
  }
  if (status === "Cancelled") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#ef4444]/15 border border-[#ef4444]/25 text-[#ef4444] text-[12px] font-medium">
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#475569]/40 border border-[#475569]/50 text-[#cbd5e1] text-[12px] font-medium">
      Open
    </span>
  );
}
