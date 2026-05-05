"use client";

import React, { useState } from "react";
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  Search,
  Calendar,
  ChevronDown
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Legend,
  Cell
} from "recharts";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// --- Types & Interfaces ---
interface GrowthData {
  month: string;
  musicians: number;
  organizers: number;
  total: number;
}

interface GigTrendData {
  month: string;
  manual: number;
  scraped: number;
}

interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

interface PerformanceMetric {
  label: string;
  value: string;
  subtext: string;
  color?: string;
}

// --- Mock Data ---
// BACKEND DEVELOPER: Replace these mock arrays with calls to your analytics/reporting API.
// It is recommended to have a single "GET /api/admin/analytics/dashboard" endpoint that 
// returns all these datasets in one payload for better performance.

const MOCK_GROWTH_DATA: GrowthData[] = [
  { month: "Jan", musicians: 120, organizers: 40, total: 160 },
  { month: "Feb", musicians: 180, organizers: 55, total: 235 },
  { month: "Mar", musicians: 240, organizers: 80, total: 320 },
  { month: "Apr", musicians: 320, organizers: 110, total: 430 },
  { month: "May", musicians: 480, organizers: 145, total: 625 },
  { month: "Jun", musicians: 610, organizers: 190, total: 800 },
];

const MOCK_GIG_TRENDS: GigTrendData[] = [
  { month: "Jan", manual: 45, scraped: 82 },
  { month: "Feb", manual: 58, scraped: 110 },
  { month: "Mar", manual: 65, scraped: 155 },
  { month: "Apr", manual: 82, scraped: 190 },
  { month: "May", manual: 95, scraped: 240 },
  { month: "Jun", manual: 105, scraped: 285 },
];

const MOCK_REVENUE_DATA: RevenueData[] = [
  { month: "Jan", revenue: 1500, bookings: 45 },
  { month: "Feb", revenue: 2200, bookings: 68 },
  { month: "Mar", revenue: 2800, bookings: 92 },
  { month: "Apr", revenue: 3500, bookings: 124 },
  { month: "May", revenue: 4600, bookings: 158 },
  { month: "Jun", revenue: 5400, bookings: 180 },
];

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState("Last 6 months");
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // BACKEND DEVELOPER: Initialize these states with data from your API.
  const [growthData] = useState<GrowthData[]>(MOCK_GROWTH_DATA);
  const [gigTrends] = useState<GigTrendData[]>(MOCK_GIG_TRENDS);
  const [revenueData] = useState<RevenueData[]>(MOCK_REVENUE_DATA);

  // --- UI Configuration Arrays ---
  const mainStats = [
    { label: "Total Users", value: "1,590", growth: "24% growth", icon: Users, color: "text-[#A2F301]", bg: "bg-[#A2F301]/10", border: "border-[#A2F301]/20" },
    { label: "Total Gigs Posted", value: "1,000", growth: "32% growth", icon: Briefcase, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10", border: "border-[#3B82F6]/20" },
    { label: "Total Revenue", value: "$183K", growth: "45% growth", icon: DollarSign, color: "text-[#10B981]", bg: "bg-[#10B981]/10", border: "border-[#10B981]/20" },
    { label: "Booking Success", value: "76%", growth: "8% growth", icon: TrendingUp, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/20" }
  ];

  const scraperMetrics: PerformanceMetric[] = [
    { label: "Total Scraping Runs", value: "247", subtext: "Last 30 days" },
    { label: "Success Rate", value: "94.2%", subtext: "233 successful runs", color: "text-[#10B981]" },
    { label: "Gigs Imported", value: "1,845", subtext: "58% of total gigs", color: "text-[#A2F301]" }
  ];

  return (
    <div className="w-full text-white font-inter pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-[32px] font-bold mb-2 leading-tight">Reports & Analytics</h1>
        <p className="text-[#999999] text-sm sm:text-[16px]">Comprehensive analytics and data insights</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {mainStats.map((stat, idx) => (
          <div key={idx} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[10px] p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 group hover:border-white/10 transition-all shadow-xl">
            <div className={`w-12 h-12 sm:w-[56px] sm:h-[56px] rounded-[12px] ${stat.bg} ${stat.border} border flex items-center justify-center shrink-0`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-[#999999] text-[12px] sm:text-[14px] mb-0.5">{stat.label}</p>
              <h3 className="text-xl sm:text-[28px] font-bold leading-tight">{stat.value}</h3>
              <p className="text-[#10B981] text-[11px] sm:text-[13px] font-medium flex items-center gap-1 mt-0.5">
                <span className="text-[12px] sm:text-[14px]">↑</span>
                {stat.growth.replace('+ ', '').replace('increase', 'growth')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* User Growth Trends Chart */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-[18px] sm:text-[20px] font-bold">User Growth Trends</h2>
          <div className="relative group w-full sm:w-auto">
            <button className="w-full sm:w-auto h-[36px] px-4 bg-[#0D0D0D] border border-[#2A2A2A] rounded-[8px] text-[14px] flex items-center justify-between sm:justify-start gap-2 text-[#999999] hover:text-white transition-all">
              {timeframe}
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
        <div className="h-[300px] sm:h-[320px] w-full min-w-0">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#666666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#666666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '20px', fontSize: '10px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="musicians" 
                  name="Musicians" 
                  stroke="#A2F301" 
                  strokeWidth={2} 
                  dot={{ fill: '#A2F301', r: 3 }} 
                  activeDot={{ r: 5 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="organizers" 
                  name="Organizers" 
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  dot={{ fill: '#3B82F6', r: 3 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  name="Total Users" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                  dot={{ fill: '#8B5CF6', r: 3 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Gig Posting Trends Chart */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-[18px] sm:text-[20px] font-bold">Gig Posting Trends</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#A2F301]" />
              <span className="text-[11px] sm:text-[12px] text-[#999999]">Manual Posts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#3B82F6]" />
              <span className="text-[11px] sm:text-[12px] text-[#999999]">Scraped Gigs</span>
            </div>
          </div>
        </div>
        <div className="h-[300px] sm:h-[320px] w-full min-w-0">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={gigTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#666666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#666666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                />
                <Bar dataKey="manual" name="Manual Posts" fill="#A2F301" radius={[4, 4, 0, 0]} barSize={isMobile ? 15 : 40} />
                <Bar dataKey="scraped" name="Scraped Gigs" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={isMobile ? 15 : 40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Revenue & Booking Analytics Chart */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="mb-8">
          <h2 className="text-[18px] sm:text-[20px] font-bold">Revenue & Booking Analytics</h2>
        </div>
        <div className="h-[300px] sm:h-[320px] w-full min-w-0">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#666666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#666666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#666666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '20px', fontSize: '10px' }}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue ($)" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  dot={{ fill: '#F59E0B', r: 3 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="bookings" 
                  name="Bookings" 
                  stroke="#A2F301" 
                  strokeWidth={2} 
                  dot={{ fill: '#A2F301', r: 3 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Scraper Performance Report Grid */}
      <div className="mb-8">
        <h2 className="text-[18px] sm:text-[20px] font-bold mb-6">Scraper Performance Report</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scraperMetrics.map((metric, idx) => (
            <div key={idx} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[8px] p-6 sm:p-8 shadow-xl">
              <p className="text-[#999999] text-[13px] sm:text-[14px] mb-2 font-medium">{metric.label}</p>
              <h3 className={`${metric.color || 'text-white'} text-2xl sm:text-[32px] font-bold mb-1`}>{metric.value}</h3>
              <p className="text-[#999999] text-[11px] sm:text-[12px]">{metric.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
