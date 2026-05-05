"use client";

import React, { useState } from "react";
import { Eye, Search, ChevronDown } from "lucide-react";
import {
  BabysitterDetailsModal,
  type BabysitterProfile,
} from "@/components/ui/BabysitterDetailsModal";

type CertificationStatus = "Certified" | "Pending";
type AccountStatus = "Active" | "Pending" | "Suspended";

interface Babysitter {
  id: string;
  name: string;
  age: number;
  registrationDate: string;
  certification: CertificationStatus;
  accountStatus: AccountStatus;
  totalHours: number;
  totalEarnings: number;
  profile: BabysitterProfile;
}

const initialBabysitters: Babysitter[] = [
  {
    id: "B001",
    name: "Sarah Davis",
    age: 16,
    registrationDate: "2024-01-10",
    certification: "Certified",
    accountStatus: "Active",
    totalHours: 124,
    totalEarnings: 1860,
    profile: {
      babysitterId: "B001",
      fullName: "Sarah Davis",
      age: 16,
      email: "sarah.davis@email.com",
      certificationStatus: "Certified",
      accountStatus: "Active",
      guardian: {
        name: "Jane Davis",
        relation: "Mother",
        email: "guardian@email.com",
        phone: "(555) 123-4567",
        consentVerified: true,
      },
      certifications: [
        { name: "CPR Certification", status: "Expires", date: "2025-01-15" },
        { name: "First Aid Training", status: "Completed", date: "2024-01-10" },
      ],
      totalHoursWorked: 124,
      totalEarnings: 1860,
    },
  },
  {
    id: "B002",
    name: "Emma Martinez",
    age: 15,
    registrationDate: "2024-02-18",
    certification: "Pending",
    accountStatus: "Pending",
    totalHours: 0,
    totalEarnings: 0,
    profile: {
      babysitterId: "B002",
      fullName: "Emma Martinez",
      age: 15,
      email: "emma.m@email.com",
      certificationStatus: "Pending",
      accountStatus: "Pending",
      guardian: {
        name: "Carlos Martinez",
        relation: "Father",
        email: "c.martinez@email.com",
        phone: "(555) 234-5678",
        consentVerified: false,
      },
      certifications: [],
      totalHoursWorked: 0,
      totalEarnings: 0,
    },
  },
  {
    id: "B003",
    name: "Jake Thompson",
    age: 17,
    registrationDate: "2024-01-22",
    certification: "Certified",
    accountStatus: "Active",
    totalHours: 98,
    totalEarnings: 1617,
    profile: {
      babysitterId: "B003",
      fullName: "Jake Thompson",
      age: 17,
      email: "jake.t@email.com",
      certificationStatus: "Certified",
      accountStatus: "Active",
      guardian: {
        name: "Linda Thompson",
        relation: "Mother",
        email: "l.thompson@email.com",
        phone: "(555) 345-6789",
        consentVerified: true,
      },
      certifications: [
        { name: "CPR Certification", status: "Expires", date: "2025-03-22" },
        { name: "First Aid Training", status: "Completed", date: "2024-01-22" },
      ],
      totalHoursWorked: 98,
      totalEarnings: 1617,
    },
  },
  {
    id: "B004",
    name: "Lily Chen",
    age: 14,
    registrationDate: "2024-02-05",
    certification: "Pending",
    accountStatus: "Pending",
    totalHours: 0,
    totalEarnings: 0,
    profile: {
      babysitterId: "B004",
      fullName: "Lily Chen",
      age: 14,
      email: "lily.chen@email.com",
      certificationStatus: "Pending",
      accountStatus: "Pending",
      guardian: {
        name: "Wei Chen",
        relation: "Father",
        email: "w.chen@email.com",
        phone: "(555) 456-7890",
        consentVerified: false,
      },
      certifications: [],
      totalHoursWorked: 0,
      totalEarnings: 0,
    },
  },
  {
    id: "B005",
    name: "Marcus Johnson",
    age: 16,
    registrationDate: "2024-01-15",
    certification: "Certified",
    accountStatus: "Active",
    totalHours: 156,
    totalEarnings: 2340,
    profile: {
      babysitterId: "B005",
      fullName: "Marcus Johnson",
      age: 16,
      email: "marcus.j@email.com",
      certificationStatus: "Certified",
      accountStatus: "Active",
      guardian: {
        name: "Andre Johnson",
        relation: "Father",
        email: "a.johnson@email.com",
        phone: "(555) 567-8901",
        consentVerified: true,
      },
      certifications: [
        { name: "CPR Certification", status: "Expires", date: "2025-01-15" },
        { name: "First Aid Training", status: "Completed", date: "2024-01-15" },
        { name: "Child Development Course", status: "Completed", date: "2024-02-01" },
      ],
      totalHoursWorked: 156,
      totalEarnings: 2340,
    },
  },
];

export default function BabysittersPage() {
  const [babysitters] = useState<Babysitter[]>(initialBabysitters);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AccountStatus>("all");
  const [selected, setSelected] = useState<BabysitterProfile | null>(null);

  const filtered = babysitters.filter((b) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      b.name.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === "all" || b.accountStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[32px] leading-[40px] font-bold text-white">
          Babysitters Management
        </h1>
        <p className="mt-1 text-[15px] text-[#94a3b8]">
          Minor protection, compliance, and certification management
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleStatCard label="Total Babysitters" value="189" valueColor="text-white" />
        <SimpleStatCard label="Certified" value="156" valueColor="text-[#34d399]" />
        <SimpleStatCard label="Active" value="143" valueColor="text-[#c4b5fd]" />
        <SimpleStatCard label="Pending Approval" value="12" valueColor="text-[#ef4444]" />
      </div>

      {/* Table card */}
      <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h2 className="text-[18px] leading-[26px] font-semibold text-white">
            All Babysitters
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search babysitters..."
                className="w-full sm:w-[280px] h-[40px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-9 pr-4 text-[14px] text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | AccountStatus)
                }
                className="appearance-none w-full sm:w-[160px] h-[40px] bg-[#0f172a]/60 border border-[#334155]/50 rounded-[10px] pl-3 pr-9 text-[14px] text-white focus:outline-none focus:border-[#b8e0f0]/60 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[940px]">
            <thead>
              <tr className="border-b border-[#334155]/50">
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Registration Date</Th>
                <Th>Certification</Th>
                <Th>Account Status</Th>
                <Th>Total Hours</Th>
                <Th>Total Earnings</Th>
                <Th align="right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-[#334155]/30 last:border-0"
                >
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{b.id}</td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{b.name}</td>
                  <td className="py-4 pr-4 text-[14px] text-[#94a3b8]">{b.age}</td>
                  <td className="py-4 pr-4 text-[14px] text-[#94a3b8] whitespace-nowrap">{b.registrationDate}</td>
                  <td className="py-4 pr-4">
                    <Badge variant={b.certification} />
                  </td>
                  <td className="py-4 pr-4">
                    <Badge variant={b.accountStatus} />
                  </td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{b.totalHours}h</td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">${b.totalEarnings.toLocaleString()}</td>
                  <td className="py-4 pl-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelected(b.profile)}
                        aria-label="View details"
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
                  <td colSpan={9} className="py-10 text-center text-[14px] text-[#94a3b8]">
                    No babysitters match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <BabysitterDetailsModal
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

type BadgeVariant =
  | "Certified"
  | "Active"
  | "Pending"
  | "Suspended";

function Badge({ variant }: { variant: BadgeVariant }) {
  const isGreen = variant === "Certified" || variant === "Active";
  const isRed = variant === "Suspended";
  const styles = isGreen
    ? "bg-[#34d399]/15 border-[#34d399]/25 text-[#34d399]"
    : isRed
    ? "bg-[#ef4444]/15 border-[#ef4444]/25 text-[#ef4444]"
    : "bg-[#a78bfa]/15 border-[#a78bfa]/25 text-[#c4b5fd]";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[12px] font-medium ${styles}`}
    >
      {variant}
    </span>
  );
}
