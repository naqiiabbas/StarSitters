"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, User, Menu } from "lucide-react";
import { NotificationPanel } from "./NotificationPanel";
import { ProfileDropdown } from "./ProfileDropdown";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-[80px] bg-[#0f172a]/60 backdrop-blur-md border-b border-[#334155]/40 fixed top-0 right-0 left-0 xl:left-[280px] z-40 flex items-center justify-between px-4 sm:px-8">
      {/* Left: hamburger + search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="xl:hidden p-2 text-[#94a3b8] hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="relative w-full max-w-[420px] hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#64748b]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-[44px] bg-[#0f172a]/70 border border-[#334155]/60 rounded-[10px] pl-11 pr-4 text-[14px] text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#b8e0f0]/50 focus:ring-2 focus:ring-[#b8e0f0]/15 transition-all"
          />
        </div>
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-4 sm:gap-6 relative">
        <button
          onClick={() => {
            setIsNotificationsOpen(!isNotificationsOpen);
            if (isProfileOpen) setIsProfileOpen(false);
          }}
          aria-label="Notifications"
          className={`relative p-2 transition-colors ${
            isNotificationsOpen ? "text-[#b8e0f0]" : "text-[#94a3b8] hover:text-white"
          }`}
        >
          <Bell className="w-[22px] h-[22px]" strokeWidth={1.75} />
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#ef4444] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
            2
          </span>
        </button>

        <NotificationPanel
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />

        <div
          onClick={() => {
            setIsProfileOpen(!isProfileOpen);
            if (isNotificationsOpen) setIsNotificationsOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group relative"
        >
          <div className="text-right hidden sm:flex flex-col justify-center">
            <p className="text-[14px] font-semibold text-white leading-none mb-1 group-hover:text-[#b8e0f0] transition-colors">
              Leah Pierce
            </p>
            <p className="text-[12px] text-[#94a3b8] leading-none">Super Admin</p>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#334155]/70 border border-[#475569]/40 flex items-center justify-center">
            <User className="w-5 h-5 text-[#cbd5e1]" strokeWidth={1.75} />
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#94a3b8] transition-transform ${
              isProfileOpen ? "rotate-180 text-white" : ""
            }`}
          />

          <ProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
