"use client";

import React from "react";
import { 
  Music, 
  Users, 
  Briefcase, 
  Database, 
  Calendar, 
  DollarSign, 
  ShieldAlert, 
  TrendingUp,
  UserPlus,
  Play,
  CheckCircle2,
  AlertCircle,
  Activity
} from "lucide-react";

const stats = [
  { label: "Total Musicians", value: "1,248", change: "+12% from last month", isTrend: true, icon: Music },
  { label: "Total Organizers", value: "342", change: "+8% from last month", isTrend: true, icon: Users },
  { label: "Total Active Gigs", value: "1,000", change: "+24% from last month", isTrend: true, icon: Briefcase },
  { label: "Scraped Gigs Count", value: "680", change: "68% of total gigs", isTrend: false, icon: Database },
  { label: "Active Bookings", value: "234", change: "+18% from last month", isTrend: true, icon: Calendar },
  { label: "Escrow Funds", value: "$312,450", change: "Total locked amount", isTrend: false, icon: DollarSign },
  { label: "Open Disputes", value: "12", change: "-3 from last week", isTrend: true, icon: ShieldAlert },
  { label: "Monthly Revenue", value: "$53,200", change: "+24% from last month", isTrend: true, icon: DollarSign },
];

const activities = [
  { icon: UserPlus, title: "New musician registered: Sarah Johnson", time: "5 mins ago", color: "text-[#b3ff00]", bg: "bg-[#b3ff00]/10" },
  { icon: Briefcase, title: "New gig posted: Jazz Night at Blue Note", time: "12 mins ago", color: "text-[#b3ff00]", bg: "bg-[#b3ff00]/10" },
  { icon: Database, title: "Scraper run completed: 45 new gigs imported", time: "23 mins ago", color: "text-[#b3ff00]", bg: "bg-[#b3ff00]/10" },
  { icon: AlertCircle, title: "New dispute opened: Payment delay issue", time: "1 hour ago", color: "text-[#b3ff00]", bg: "bg-[#b3ff00]/10" },
  { icon: Users, title: "New organizer registered: Metro Events LLC", time: "2 hours ago", color: "text-[#b3ff00]", bg: "bg-[#b3ff00]/10" },
  { icon: Calendar, title: "Booking confirmed: The Jazz Quartet", time: "3 hours ago", color: "text-[#b3ff00]", bg: "bg-[#b3ff00]/10" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Title Section */}
      <div>
        <h1 className="text-2xl sm:text-[32px] font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-[#a1a1aa] text-sm sm:text-[16px]">High-level system control and monitoring</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1A1A1A] border border-[#1a1a1e] rounded-xl p-6 hover:border-[#b3ff00]/20 transition-all group">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[#a1a1aa] text-[14px] font-normal mb-1">{stat.label}</p>
                <p className="text-[28px] font-bold text-white tracking-tight mb-1">{stat.value}</p>
                <p className={`text-[13px] ${stat.isTrend ? 'text-[#10B981]' : 'text-[#a1a1aa]'} font-medium`}>{stat.change}</p>
              </div>
              <div className="w-11 h-11 bg-[#b3ff00]/10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                <stat.icon className="w-6 h-6 text-[#b3ff00]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Trend */}
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#1a1a1e] rounded-2xl p-4 sm:p-8 pb-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-white font-bold text-[18px]">User Growth Trend</h3>
          </div>
          <div className="h-auto w-full relative overflow-x-auto custom-scrollbar">
            {/* 
                BACKEND DEVELOPER: 
                Simply update these arrays with data from your API.
                The graph will automatically re-scale and re-plot.
            */}
            {(() => {
              const musicianGrowth = [180, 260, 340, 480, 620, 700];
              const organizerGrowth = [90, 120, 160, 210, 240, 280];
              const maxVal = 800;
              const chartHeight = 280;
              const chartWidth = 850;
              
              const valueToY = (val: number) => chartHeight - (val / maxVal * chartHeight);
              const getPath = (data: number[]) => 
                data.map((val, i) => `${i === 0 ? 'M' : 'L'} ${50 + (i * 160)} ${valueToY(val)}`).join(' ');

              return (
                <div className="h-[320px] min-w-[850px] relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 850 320">
                    {/* Horizontal Grid Lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <g key={`h-${i}`}>
                        <line x1="50" y1={chartHeight - (i * 70)} x2="850" y2={chartHeight - (i * 70)} stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
                        <text x="0" y={chartHeight - (i * 70) + 5} className="fill-[#a1a1aa] text-[12px]">{i * 200}</text>
                      </g>
                    ))}

                    {/* Vertical Grid Lines */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <line 
                        key={`v-${i}`} 
                        x1={50 + (i * 160)} 
                        y1="0" 
                        x2={50 + (i * 160)} 
                        y2={chartHeight} 
                        stroke="#27272a" 
                        strokeWidth="1" 
                        strokeDasharray="4 4" 
                      />
                    ))}

                    {/* Month Labels */}
                    {[
                      { x: 50, m: "Jan" },
                      { x: 210, m: "Feb" },
                      { x: 370, m: "Mar" },
                      { x: 530, m: "Apr" },
                      { x: 690, m: "May" },
                      { x: 850, m: "Jun" }
                    ].map((obj, i) => (
                      <g key={`label-${i}`} className="fill-[#a1a1aa] text-[12px]">
                        <text x={obj.x} y="310" textAnchor="middle">{obj.m}</text>
                      </g>
                    ))}
                    
                    {/* Organizers Line (Blue) */}
                    <path d={getPath(organizerGrowth)} fill="none" stroke="#3b82f6" strokeWidth="2" />
                    {organizerGrowth.map((val, i) => (
                      <g key={`p-org-${i}`}>
                        <circle cx={50 + (i * 160)} cy={valueToY(val)} r="5" fill="#3b82f6" />
                        <circle cx={50 + (i * 160)} cy={valueToY(val)} r="2" fill="white" />
                      </g>
                    ))}

                    {/* Musicians Line (Neon Green) */}
                    <path d={getPath(musicianGrowth)} fill="none" stroke="#b3ff00" strokeWidth="2" />
                    {musicianGrowth.map((val, i) => (
                      <g key={`p-mus-${i}`}>
                        <circle cx={50 + (i * 160)} cy={valueToY(val)} r="5" fill="#b3ff00" />
                        <circle cx={50 + (i * 160)} cy={valueToY(val)} r="2" fill="white" />
                      </g>
                    ))}
                  </svg>
                </div>
              );
            })()}

            {/* Legend at Bottom Center */}
            <div className="flex justify-center gap-4 sm:gap-8 mt-16 min-w-[300px]">
              <div className="flex items-center gap-2">
                <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 3.20557H4.66267M4.66267 3.20557C4.66267 2.58726 4.90829 1.99428 5.3455 1.55707C5.78271 1.11986 6.3757 0.874237 6.99401 0.874237C7.61231 0.874237 8.2053 1.11986 8.64251 1.55707C9.07972 1.99428 9.32534 2.58726 9.32534 3.20557M4.66267 3.20557C4.66267 3.82388 4.90829 4.41687 5.3455 4.85408C5.78271 5.29129 6.3757 5.53691 6.99401 5.53691C7.61231 5.53691 8.2053 5.29129 8.64251 4.85408C9.07972 4.41687 9.32534 3.82388 9.32534 3.20557M9.32534 3.20557H13.988" stroke="#b3ff00" strokeWidth="1.7485"/>
                </svg>
                <span className="text-[#b3ff00] text-sm sm:text-[15px] font-medium">Musicians</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 3.20557H4.66267M4.66267 3.20557C4.66267 2.58726 4.90829 1.99428 5.3455 1.55707C5.78271 1.11986 6.3757 0.874237 6.99401 0.874237C7.61231 0.874237 8.2053 1.11986 8.64251 1.55707C9.07972 1.99428 9.32534 2.58726 9.32534 3.20557M4.66267 3.20557C4.66267 3.82388 4.90829 4.41687 5.3455 4.85408C5.78271 5.29129 6.3757 5.53691 6.99401 5.53691C7.61231 5.53691 8.2053 5.29129 8.64251 4.85408C9.07972 4.41687 9.32534 3.82388 9.32534 3.20557M9.32534 3.20557H13.988" stroke="#3b82f6" strokeWidth="1.7485"/>
                </svg>
                <span className="text-[#3b82f6] text-sm sm:text-[15px] font-medium">Organizers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gig Source Distribution */}
        <div className="bg-[#1A1A1A] border border-[#1a1a1e] rounded-2xl p-4 sm:p-8 flex flex-col">
          <h3 className="text-white font-bold text-[18px] mb-8">Gig Source Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px] overflow-x-auto custom-scrollbar">
            {/* 
                BACKEND DEVELOPER: 
                Simply update these two counts. 
                The pie chart and labels will update automatically.
            */}
            {(() => {
              const scrapedCount = 680;
              const manualCount = 320;
              const total = scrapedCount + manualCount;
              const manualPercent = Math.round((manualCount / total) * 100);
              const scrapedPercent = 100 - manualPercent;
              
              // Pie chart logic (SVG arcs)
              const radius = 75;
              const cx = 200;
              const cy = 100;
              
              // Angle for the split (32% of 360 = 115.2deg)
              const startAngle = 90 - ((manualCount / total) * 360);
              const endAngle = 90;
              
              const x1 = cx + radius * Math.cos((startAngle * Math.PI) / 180);
              const y1 = cy + radius * Math.sin((startAngle * Math.PI) / 180);
              const x2 = cx + radius * Math.cos((endAngle * Math.PI) / 180);
              const y2 = cy + radius * Math.sin((endAngle * Math.PI) / 180);
              
              const manualPath = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
              const scrapedPath = `M ${cx} ${cy} L ${x2} ${y2} A ${radius} ${radius} 0 1 1 ${x1} ${y1} Z`;

              return (
                <div className="relative w-full h-full min-w-[320px] flex items-center justify-center">
                  <svg className="w-full h-64 overflow-visible" viewBox="0 0 400 200">
                    <path d={scrapedPath} fill="#3b82f6" stroke="white" strokeWidth="1.5" />
                    <path d={manualPath} fill="#b3ff00" stroke="white" strokeWidth="1.5" />
                    
                    {/* External Labels positioned like the image */}
                    <text x="290" y="30" textAnchor="start" className="fill-[#b3ff00] text-[12px] font-bold">Manual Posts: {manualPercent}%</text>
                    <text x="110" y="180" textAnchor="end" className="fill-[#3b82f6] text-[12px] font-bold">Scraped Gigs: {scrapedPercent}%</text>
                  </svg>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Revenue & Escrow Analytics */}
      <div className="bg-[#1A1A1A] border border-[#1a1a1e] rounded-2xl p-4 sm:p-8 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-white font-bold text-[18px]">Revenue & Escrow Analytics</h3>
        </div>
        <div className="h-auto w-full relative overflow-x-auto custom-scrollbar">
          {/* 
              BACKEND DEVELOPER: 
              Update these arrays with financial data.
              The area chart will auto-update.
          */}
          {(() => {
            const revenueData = [1200, 1800, 2500, 3200, 4500, 5800];
            const escrowData = [800, 1200, 1600, 1900, 2400, 3100];
            const maxVal = 6000;
            const chartHeight = 280;
            const chartWidth = 850; 
            const offsetLeft = 50;
            
            const valueToY = (val: number) => chartHeight - (val / maxVal * chartHeight);
            
            const getAreaPath = (data: number[]) => {
              const points = data.map((val, i) => `${offsetLeft + (i * 160)} ${valueToY(val)}`).join(' L ');
              return `M ${offsetLeft} ${chartHeight} L ${points} L ${offsetLeft + (data.length - 1) * 160} ${chartHeight} Z`;
            };
            
            const getLinePath = (data: number[]) => 
              data.map((val, i) => `${i === 0 ? 'M' : 'L'} ${offsetLeft + (i * 160)} ${valueToY(val)}`).join(' ');

            return (
              <div className="h-[320px] min-w-[850px] relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 850 320">
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b3ff00" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#b3ff00" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="escGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <g key={`h-rev-${i}`}>
                      <line x1={offsetLeft} y1={chartHeight - (i * 70)} x2="850" y2={chartHeight - (i * 70)} stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" />
                      <text x="0" y={chartHeight - (i * 70) + 5} className="fill-[#a1a1aa] text-[12px]">{i * 1500}</text>
                    </g>
                  ))}

                  {/* Vertical Grid Lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <line 
                      key={`v-rev-${i}`} 
                      x1={offsetLeft + (i * 160)} 
                      y1="0" 
                      x2={offsetLeft + (i * 160)} 
                      y2={chartHeight} 
                      stroke="#27272a" 
                      strokeWidth="1" 
                      strokeDasharray="4 4" 
                    />
                  ))}

                  {/* Month Labels */}
                  {[
                    { x: 50, m: "Jan" },
                    { x: 210, m: "Feb" },
                    { x: 370, m: "Mar" },
                    { x: 530, m: "Apr" },
                    { x: 690, m: "May" },
                    { x: 850, m: "Jun" }
                  ].map((obj, i) => (
                    <g key={`label-rev-${i}`} className="fill-[#a1a1aa] text-[12px]">
                      <text x={obj.x} y="310" textAnchor="middle">{obj.m}</text>
                    </g>
                  ))}

                  {/* Escrow Area & Line */}
                  <path d={getAreaPath(escrowData)} fill="url(#escGrad)" />
                  <path d={getLinePath(escrowData)} fill="none" stroke="#3b82f6" strokeWidth="2" />
                  
                  {/* Revenue Area & Line */}
                  <path d={getAreaPath(revenueData)} fill="url(#revGrad)" />
                  <path d={getLinePath(revenueData)} fill="none" stroke="#b3ff00" strokeWidth="2" />
                </svg>
              </div>
            );
          })()}

          {/* Legend at Bottom Center */}
          <div className="flex justify-center gap-4 sm:gap-8 mt-16 min-w-[300px]">
            <div className="flex items-center gap-2">
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3.20557H4.66267M4.66267 3.20557C4.66267 2.58726 4.90829 1.99428 5.3455 1.55707C5.78271 1.11986 6.3757 0.874237 6.99401 0.874237C7.61231 0.874237 8.2053 1.11986 8.64251 1.55707C9.07972 1.99428 9.32534 2.58726 9.32534 3.20557M4.66267 3.20557C4.66267 3.82388 4.90829 4.41687 5.3455 4.85408C5.78271 5.29129 6.3757 5.53691 6.99401 5.53691C7.61231 5.53691 8.2053 5.29129 8.64251 4.85408C9.07972 4.41687 9.32534 3.82388 9.32534 3.20557M9.32534 3.20557H13.988" stroke="#b3ff00" strokeWidth="1.7485"/>
              </svg>
              <span className="text-[#b3ff00] text-sm sm:text-[15px] font-medium">Revenue ($)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 3.20557H4.66267M4.66267 3.20557C4.66267 2.58726 4.90829 1.99428 5.3455 1.55707C5.78271 1.11986 6.3757 0.874237 6.99401 0.874237C7.61231 0.874237 8.2053 1.11986 8.64251 1.55707C9.07972 1.99428 9.32534 2.58726 9.32534 3.20557M4.66267 3.20557C4.66267 3.82388 4.90829 4.41687 5.3455 4.85408C5.78271 5.29129 6.3757 5.53691 6.99401 5.53691C7.61231 5.53691 8.2053 5.29129 8.64251 4.85408C9.07972 4.41687 9.32534 3.82388 9.32534 3.20557M9.32534 3.20557H13.988" stroke="#3b82f6" strokeWidth="1.7485"/>
              </svg>
              <span className="text-[#3b82f6] text-sm sm:text-[15px] font-medium">Escrow ($)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-[#1A1A1A] border border-[#1a1a1e] rounded-2xl p-4 sm:p-8">
        <h3 className="text-white font-bold text-[18px] mb-8">Recent Activity Feed</h3>
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-5 group cursor-pointer">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${activity.bg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 flex-shrink-0`}>
                <activity.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-normal text-sm sm:text-[14px] leading-[20px] mb-1 group-hover:text-[#b3ff00] transition-colors truncate sm:whitespace-normal">{activity.title}</p>
                <p className="text-[#a1a1aa] font-normal text-[11px] sm:text-[12px] leading-[16px]">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
