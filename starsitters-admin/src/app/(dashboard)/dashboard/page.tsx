"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  Clock,
  Smile,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  OnboardingDetailsModal,
  type OnboardingDetails,
} from "@/components/ui/OnboardingDetailsModal";
import {
  fetchDashboardStats,
  fetchRegistrationTrend,
  type DashboardStats,
} from "@/lib/supabase/admin";

const revenueData = [
  { month: "Jan", revenue: 7800 },
  { month: "Feb", revenue: 9000 },
  { month: "Mar", revenue: 9500 },
  { month: "Apr", revenue: 9300 },
  { month: "May", revenue: 10800 },
  { month: "Jun", revenue: 12200 },
];

type OnboardingType = "Family" | "Babysitter";
type OnboardingStatus = "Verified" | "Pending";

interface OnboardingRow {
  type: OnboardingType;
  name: string;
  email: string;
  date: string;
  status: OnboardingStatus;
  details: OnboardingDetails;
}

const recentOnboarding: OnboardingRow[] = [
  {
    type: "Family",
    name: "Johnson Family",
    email: "johnson@email.com",
    date: "2024-02-24",
    status: "Verified",
    details: {
      type: "Family",
      name: "Johnson Family",
      registeredOn: "2024-02-24",
      status: "Verified",
      email: "johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Maple Street, Boston, MA 02101",
      numberOfChildren: 2,
      childrenAges: "5, 8 years",
      backgroundCheck: "Completed - 2024-02-20",
      preferredRate: "$15-20/hour",
    },
  },
  {
    type: "Babysitter",
    name: "Emma Martinez",
    email: "emma.m@email.com",
    date: "2024-02-24",
    status: "Pending",
    details: {
      type: "Babysitter",
      name: "Emma Martinez",
      registeredOn: "2024-02-24",
      status: "Pending",
      email: "emma.m@email.com",
      phone: "+1 (555) 234-5678",
      address: "45 Oak Avenue, Cambridge, MA 02139",
      yearsOfExperience: 3,
      ageGroups: "Toddlers, School-age",
      backgroundCheck: "In Progress",
      hourlyRate: "$18/hour",
    },
  },
  {
    type: "Family",
    name: "Miller Family",
    email: "miller@email.com",
    date: "2024-02-23",
    status: "Verified",
    details: {
      type: "Family",
      name: "Miller Family",
      registeredOn: "2024-02-23",
      status: "Verified",
      email: "miller@email.com",
      phone: "+1 (555) 345-6789",
      address: "78 Pine Road, Newton, MA 02458",
      numberOfChildren: 3,
      childrenAges: "2, 6, 10 years",
      backgroundCheck: "Completed - 2024-02-19",
      preferredRate: "$18-22/hour",
    },
  },
  {
    type: "Babysitter",
    name: "Jake Thompson",
    email: "jake.t@email.com",
    date: "2024-02-23",
    status: "Verified",
    details: {
      type: "Babysitter",
      name: "Jake Thompson",
      registeredOn: "2024-02-23",
      status: "Verified",
      email: "jake.t@email.com",
      phone: "+1 (555) 456-7890",
      address: "12 Elm Street, Brookline, MA 02446",
      yearsOfExperience: 5,
      ageGroups: "School-age, Teens",
      backgroundCheck: "Completed - 2024-02-18",
      hourlyRate: "$22/hour",
    },
  },
  {
    type: "Family",
    name: "Davis Family",
    email: "davis@email.com",
    date: "2024-02-23",
    status: "Pending",
    details: {
      type: "Family",
      name: "Davis Family",
      registeredOn: "2024-02-23",
      status: "Pending",
      email: "davis@email.com",
      phone: "+1 (555) 567-8901",
      address: "34 Birch Lane, Somerville, MA 02143",
      numberOfChildren: 1,
      childrenAges: "4 years",
      backgroundCheck: "Pending",
      preferredRate: "$15/hour",
    },
  },
  {
    type: "Babysitter",
    name: "Lily Chen",
    email: "lily.chen@email.com",
    date: "2024-02-22",
    status: "Pending",
    details: {
      type: "Babysitter",
      name: "Lily Chen",
      registeredOn: "2024-02-22",
      status: "Pending",
      email: "lily.chen@email.com",
      phone: "+1 (555) 678-9012",
      address: "90 Cedar Court, Quincy, MA 02169",
      yearsOfExperience: 2,
      ageGroups: "Infants, Toddlers",
      backgroundCheck: "Pending",
      hourlyRate: "$16/hour",
    },
  },
  {
    type: "Family",
    name: "Wilson Family",
    email: "wilson@email.com",
    date: "2024-02-22",
    status: "Verified",
    details: {
      type: "Family",
      name: "Wilson Family",
      registeredOn: "2024-02-22",
      status: "Verified",
      email: "wilson@email.com",
      phone: "+1 (555) 789-0123",
      address: "56 Spruce Drive, Medford, MA 02155",
      numberOfChildren: 2,
      childrenAges: "7, 11 years",
      backgroundCheck: "Completed - 2024-02-17",
      preferredRate: "$20/hour",
    },
  },
  {
    type: "Babysitter",
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    date: "2024-02-22",
    status: "Verified",
    details: {
      type: "Babysitter",
      name: "Marcus Johnson",
      registeredOn: "2024-02-22",
      status: "Verified",
      email: "marcus.j@email.com",
      phone: "+1 (555) 890-1234",
      address: "23 Willow Way, Arlington, MA 02474",
      yearsOfExperience: 4,
      ageGroups: "Toddlers, School-age",
      backgroundCheck: "Completed - 2024-02-16",
      hourlyRate: "$20/hour",
    },
  },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<OnboardingDetails | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [registrationData, setRegistrationData] = useState<
    { month: string; families: number; babysitters: number }[]
  >([]);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const s = await fetchDashboardStats();
        if (!cancelled) setStats(s);
      } catch (e) {
        if (!cancelled)
          setStatsError(e instanceof Error ? e.message : "Failed to load stats");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const trend = await fetchRegistrationTrend();
        if (cancelled) return;
        const byDay = new Map<string, { families: number; babysitters: number }>();
        for (const row of trend) {
          const key = row.d.slice(0, 10);
          if (!byDay.has(key)) byDay.set(key, { families: 0, babysitters: 0 });
          const v = byDay.get(key)!;
          if (row.role === "family") v.families += row.cnt;
          if (row.role === "sitter") v.babysitters += row.cnt;
        }
        const chart = [...byDay.entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .slice(-14)
          .map(([d, v]) => ({
            month: d.slice(5),
            families: v.families,
            babysitters: v.babysitters,
          }));
        setRegistrationData(chart);
      } catch {
        if (!cancelled) setRegistrationData([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const familiesTotal = stats?.families_total ?? 0;
  const familiesApproved = stats?.families_approved_bg ?? 0;
  const familiesPending = stats?.families_pending_bg ?? 0;
  const sittersTotal = stats?.sitters_total ?? 0;
  const verifiedRate =
    familiesTotal > 0
      ? Math.round((familiesApproved / familiesTotal) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[32px] leading-[40px] font-bold text-white">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-[15px] text-[#94a3b8]">
          Platform metrics and recent activity
        </p>
      </div>

      {statsError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-200"
        >
          {statsError}
        </p>
      ) : null}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Registered Families"
          value={familiesTotal.toLocaleString()}
          caption={stats ? "Live from Supabase" : "Loading…"}
          icon={<Users className="w-5 h-5" strokeWidth={1.75} />}
          iconColor="#5eead4"
        />
        <StatCard
          label="Verified Families"
          value={familiesApproved.toLocaleString()}
          caption={stats ? `${verifiedRate}% verification rate` : "Loading…"}
          icon={<UserCheck className="w-5 h-5" strokeWidth={1.75} />}
          iconColor="#34d399"
        />
        <StatCard
          label="Pending Family Verifications"
          value={familiesPending.toLocaleString()}
          caption={stats ? "Requires attention" : "Loading…"}
          icon={<Clock className="w-5 h-5" strokeWidth={1.75} />}
          iconColor="#fbbf24"
        />
        <StatCard
          label="Total Babysitters"
          value={sittersTotal.toLocaleString()}
          caption={stats ? "Live from Supabase" : "Loading…"}
          icon={<Smile className="w-5 h-5" strokeWidth={1.75} />}
          iconColor="#c4b5fd"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="User Registration Trends"
          subtitle="Monthly registrations for families and babysitters"
        >
          {mounted && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrationData} margin={{ top: 12, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: "#334155", strokeOpacity: 0.4 }} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 60]} ticks={[0, 15, 30, 45, 60]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 10,
                    fontSize: 13,
                  }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#cbd5e1" }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 13, color: "#cbd5e1", paddingTop: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="families"
                  name="Families"
                  stroke="#7dd3fc"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#7dd3fc", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="babysitters"
                  name="Babysitters"
                  stroke="#c4b5fd"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#c4b5fd", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard
          title="Revenue Trends"
          subtitle="Monthly platform revenue from completed jobs"
        >
          {mounted && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData} margin={{ top: 12, right: 12, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: "#334155", strokeOpacity: 0.4 }} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 14000]} ticks={[0, 3500, 7000, 10500, 14000]} />
                <Tooltip
                  cursor={{ fill: "#334155", fillOpacity: 0.2 }}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: 10,
                    fontSize: 13,
                  }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#cbd5e1" }}
                  formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="#86efac" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Recent Onboarding */}
      <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
        <div className="mb-5">
          <h2 className="text-[18px] leading-[26px] font-semibold text-white">
            Recent Onboarding
          </h2>
          <p className="mt-1 text-[14px] text-[#94a3b8]">
            Latest registered families and babysitters
          </p>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-[#334155]/50">
                <th className="text-left text-[13px] font-medium text-[#94a3b8] py-3 pr-4 w-[140px]">Type</th>
                <th className="text-left text-[13px] font-medium text-[#94a3b8] py-3 pr-4">Name</th>
                <th className="text-left text-[13px] font-medium text-[#94a3b8] py-3 pr-4">Email</th>
                <th className="text-left text-[13px] font-medium text-[#94a3b8] py-3 pr-4 w-[160px]">Registration Date</th>
                <th className="text-left text-[13px] font-medium text-[#94a3b8] py-3 pr-4 w-[140px]">Status</th>
                <th className="text-right text-[13px] font-medium text-[#94a3b8] py-3 pl-4 w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOnboarding.map((row) => (
                <tr
                  key={`${row.name}-${row.date}`}
                  className="border-b border-[#334155]/30 last:border-0"
                >
                  <td className="py-4 pr-4">
                    <TypeBadge type={row.type} />
                  </td>
                  <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{row.name}</td>
                  <td className="py-4 pr-4 text-[14px] text-[#94a3b8] whitespace-nowrap">{row.email}</td>
                  <td className="py-4 pr-4 text-[14px] text-[#94a3b8] whitespace-nowrap">{row.date}</td>
                  <td className="py-4 pr-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-4 pl-4 text-right">
                    <button
                      onClick={() => setSelectedDetails(row.details)}
                      className="text-[14px] text-white hover:text-[#b8e0f0] transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <OnboardingDetailsModal
        isOpen={selectedDetails !== null}
        onClose={() => setSelectedDetails(null)}
        data={selectedDetails}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  caption,
  icon,
  iconColor,
}: {
  label: string;
  value: string;
  caption: string;
  icon: React.ReactNode;
  iconColor: string;
}) {
  return (
    <div className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] leading-[18px] font-medium text-[#94a3b8]">
          {label}
        </p>
        <span style={{ color: iconColor }} className="flex-shrink-0">
          {icon}
        </span>
      </div>
      <p className="mt-4 text-[32px] leading-[40px] font-bold text-white">
        {value}
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-[12px] text-[#94a3b8]">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#34d399]" strokeWidth={2} />
        <span>{caption}</span>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="mb-4">
        <h3 className="text-[16px] leading-[24px] font-semibold text-white">{title}</h3>
        <p className="mt-1 text-[13px] text-[#94a3b8]">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function TypeBadge({ type }: { type: OnboardingType }) {
  const styles =
    type === "Family"
      ? "bg-[#334155]/50 text-[#cbd5e1] border-[#475569]/40"
      : "bg-[#a78bfa]/15 text-[#c4b5fd] border-[#a78bfa]/25";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[12px] font-medium ${styles}`}
    >
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: OnboardingStatus }) {
  if (status === "Verified") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#34d399]/15 border border-[#34d399]/25 text-[#34d399] text-[12px] font-medium">
        <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
        Verified
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#a78bfa]/15 border border-[#a78bfa]/25 text-[#c4b5fd] text-[12px] font-medium">
      <Clock className="w-3.5 h-3.5" strokeWidth={2} />
      Pending
    </span>
  );
}
