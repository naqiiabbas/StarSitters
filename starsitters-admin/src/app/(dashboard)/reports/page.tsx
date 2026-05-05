"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const jobsPerMonth = [
  { month: "Jan", jobs: 120 },
  { month: "Feb", jobs: 140 },
  { month: "Mar", jobs: 155 },
  { month: "Apr", jobs: 145 },
  { month: "May", jobs: 165 },
  { month: "Jun", jobs: 190 },
];

const hoursWorkedPerMonth = [
  { month: "Jan", hours: 500 },
  { month: "Feb", hours: 570 },
  { month: "Mar", hours: 635 },
  { month: "Apr", hours: 580 },
  { month: "May", hours: 670 },
  { month: "Jun", hours: 770 },
];

const wageDistribution = [
  { name: "Age 11-12", value: 12500, color: "#a5d8eb" },
  { name: "Age 13-14", value: 18300, color: "#c4b5fd" },
  { name: "Age 15-17", value: 27900, color: "#86efac" },
];

const jobStatusDistribution = [
  { name: "Completed", value: 1847, color: "#86efac" },
  { name: "Scheduled", value: 56, color: "#c4b5fd" },
  { name: "In Progress", value: 34, color: "#a78bfa" },
];

const userGrowth = [
  { month: "Jan", families: 205, babysitters: 140 },
  { month: "Feb", families: 220, babysitters: 155 },
  { month: "Mar", families: 230, babysitters: 165 },
  { month: "Apr", families: 240, babysitters: 175 },
  { month: "May", families: 247, babysitters: 183 },
  { month: "Jun", families: 252, babysitters: 189 },
];

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false);
  const [period, setPeriod] = useState("Last 6 Months");
  useEffect(() => setMounted(true), []);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[32px] leading-[40px] font-bold text-white">
          Reports &amp; Analytics
        </h1>
        <p className="mt-1 text-[15px] text-[#94a3b8]">
          Platform performance metrics and data insights
        </p>
      </div>

      {/* Period + export buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative inline-block">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none h-[44px] bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-[10px] pl-9 pr-10 text-[14px] text-white focus:outline-none focus:border-[#b8e0f0]/60 transition-all"
          >
            <option className="bg-[#1e293b]">Last 6 Months</option>
            <option className="bg-[#1e293b]">Last 30 Days</option>
            <option className="bg-[#1e293b]">Last 12 Months</option>
            <option className="bg-[#1e293b]">All Time</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8] pointer-events-none" />
        </div>

        <div className="flex gap-3">
          <ExportButton label="Export CSV" />
          <ExportButton label="Export PDF" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DeltaStatCard label="Total Revenue" value="$58,704" delta="+12.5% vs last period" />
        <DeltaStatCard label="Total Jobs" value="1,847" delta="+8.3% vs last period" />
        <DeltaStatCard label="Total Hours" value="4,892" delta="+10.2% vs last period" />
        <DeltaStatCard label="Avg Job Duration" value="2.6h" caption="Per job average" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Jobs Per Month">
          {mounted && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobsPerMonth} margin={{ top: 12, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: "#334155", strokeOpacity: 0.4 }} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 200]} ticks={[0, 50, 100, 150, 200]} />
                <Tooltip
                  cursor={{ fill: "#334155", fillOpacity: 0.2 }}
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 13 }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#cbd5e1" }}
                />
                <Bar dataKey="jobs" fill="#bae6fd" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Hours Worked Per Month">
          {mounted && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hoursWorkedPerMonth} margin={{ top: 12, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.4} vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: "#334155", strokeOpacity: 0.4 }} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[200, 800]} ticks={[200, 400, 600, 800]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 13 }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#cbd5e1" }}
                />
                <Line type="monotone" dataKey="hours" stroke="#86efac" strokeWidth={2} dot={{ r: 4, fill: "#86efac", strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Charts row 2 — pie charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Wage Distribution by Age Group">
          {mounted && (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={wageDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  stroke="none"
                  label={(entry: { name?: string; value?: number }) =>
                    `${entry.name}: $${(entry.value ?? 0).toLocaleString()}`
                  }
                  labelLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
                >
                  {wageDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 13 }}
                  itemStyle={{ color: "#cbd5e1" }}
                  formatter={(v) => `$${Number(v).toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Job Status Distribution">
          {mounted && (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={jobStatusDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  stroke="none"
                  label={(entry: { name?: string; value?: number }) =>
                    `${entry.name}: ${entry.value}`
                  }
                  labelLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
                >
                  {jobStatusDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 13 }}
                  itemStyle={{ color: "#cbd5e1" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Full-width line chart */}
      <ChartCard title="User Growth (Families vs Babysitters)">
        {mounted && (
          <ResponsiveContainer width="100%" height={360}>
            <LineChart data={userGrowth} margin={{ top: 12, right: 12, left: -16, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.4} vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={{ stroke: "#334155", strokeOpacity: 0.4 }} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 260]} ticks={[0, 65, 130, 195, 260]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 13 }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#cbd5e1" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 13, color: "#cbd5e1", paddingTop: 12 }}
              />
              <Line type="monotone" dataKey="families" name="Families" stroke="#7dd3fc" strokeWidth={2} dot={{ r: 4, fill: "#7dd3fc", strokeWidth: 0 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="babysitters" name="Babysitters" stroke="#c4b5fd" strokeWidth={2} dot={{ r: 4, fill: "#c4b5fd", strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Certification Statistics */}
      <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
        <h2 className="text-[18px] leading-[26px] font-semibold text-white mb-5">
          Certification Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CertStatCard label="Approval Rate" value="94%" valueColor="text-[#34d399]" caption="168 of 179 submissions" />
          <CertStatCard label="Avg Processing Time" value="2.3 days" valueColor="text-white" caption="From submission to approval" />
          <CertStatCard label="Most Popular Course" value="CPR" valueColor="text-[#c4b5fd]" caption="145 enrollments" />
        </div>
      </section>
    </div>
  );
}

function ExportButton({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 px-4 h-[44px] bg-[#1e293b]/60 backdrop-blur-md border border-white/10 hover:border-white/25 text-white text-[14px] font-medium rounded-[10px] transition-all">
      <Download className="w-4 h-4" strokeWidth={1.75} />
      {label}
    </button>
  );
}

function DeltaStatCard({
  label,
  value,
  delta,
  caption,
}: {
  label: string;
  value: string;
  delta?: string;
  caption?: string;
}) {
  return (
    <div className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
      <p className="text-[13px] leading-[18px] font-medium text-[#94a3b8]">{label}</p>
      <p className="mt-3 text-[28px] leading-[36px] font-bold text-white">{value}</p>
      {delta && (
        <div className="mt-2 flex items-center gap-1.5 text-[12px] text-[#34d399]">
          <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} />
          <span>{delta}</span>
        </div>
      )}
      {caption && !delta && (
        <p className="mt-2 text-[12px] text-[#94a3b8]">{caption}</p>
      )}
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
      <h3 className="text-[16px] leading-[24px] font-semibold text-white mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function CertStatCard({
  label,
  value,
  valueColor,
  caption,
}: {
  label: string;
  value: string;
  valueColor: string;
  caption: string;
}) {
  return (
    <div className="bg-[#0f172a]/60 border border-white/10 rounded-[12px] p-5">
      <p className="text-[13px] text-[#94a3b8]">{label}</p>
      <p className={`mt-2 text-[28px] leading-[36px] font-bold ${valueColor}`}>
        {value}
      </p>
      <p className="mt-2 text-[12px] text-[#94a3b8]">{caption}</p>
    </div>
  );
}
