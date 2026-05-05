"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Ban,
  Star,
  UserCheck,
  UserX
} from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { UserProfileModal } from "@/components/ui/UserProfileModal";

interface Musician {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  bookings: number;
  rating: number;
  joined: string;
}

interface Organizer {
  id: number;
  name: string;
  email: string;
  status: "active" | "suspended";
  totalGigs: number;
  totalSpent: string;
  joined: string;
}

const initialMusicians: Musician[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", status: "active", bookings: 24, rating: 4.8, joined: "2024-01-15" },
  { id: 2, name: "Mike Peterson", email: "mike.p@example.com", status: "active", bookings: 18, rating: 4.6, joined: "2024-02-20" },
  { id: 3, name: "Lisa Anderson", email: "lisa.a@example.com", status: "inactive", bookings: 5, rating: 4.2, joined: "2024-03-10" },
  { id: 4, name: "David Chen", email: "david.c@example.com", status: "active", bookings: 32, rating: 4.9, joined: "2023-12-05" },
];

const initialOrganizers: Organizer[] = [
  { id: 101, name: "Metro Events LLC", email: "contact@metroevents.com", status: "active", totalGigs: 45, totalSpent: "$125,400", joined: "2024-01-10" },
  { id: 102, name: "Blue Note Jazz Club", email: "info@bluenote.com", status: "active", totalGigs: 78, totalSpent: "$234,600", joined: "2023-11-22" },
  { id: 103, name: "City Sound Productions", email: "hello@citysound.com", status: "suspended", totalGigs: 12, totalSpent: "$45,200", joined: "2024-02-14" },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState<"musicians" | "organizers">("musicians");
  const [searchQuery, setSearchQuery] = useState("");
  const [musicians, setMusicians] = useState<Musician[]>(initialMusicians);
  const [organizers, setOrganizers] = useState<Organizer[]>(initialOrganizers);

  // Notifications & Modals
  const [notification, setNotification] = useState<{ show: boolean; message: string }>({ show: false, message: "" });
  const [suspendModal, setSuspendModal] = useState<{ show: boolean; userId: number | null; userType: "musician" | "organizer" | null }>({ show: false, userId: null, userType: null });
  const [viewModal, setViewModal] = useState<{ show: boolean; userData: any | null }>({ show: false, userData: null });

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
  };

  const handleStatusToggle = (id: number, currentStatus: string, type: "musician" | "organizer") => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    if (type === "musician") {
      setMusicians(prev => prev.map(m => m.id === id ? { ...m, status: newStatus as any } : m));
    } else {
      setOrganizers(prev => prev.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
    }
    showNotification(`User ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
  };

  const handleSuspendConfirm = () => {
    if (suspendModal.userId && suspendModal.userType) {
      if (suspendModal.userType === "musician") {
        setMusicians(prev => prev.map(m => m.id === suspendModal.userId ? { ...m, status: "suspended" } : m));
      } else {
        setOrganizers(prev => prev.map(o => o.id === suspendModal.userId ? { ...o, status: "suspended" } : o));
      }
      showNotification("User suspended successfully");
      setSuspendModal({ show: false, userId: null, userType: null });
    }
  };

  const filteredMusicians = musicians.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrganizers = organizers.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen">
      <div className="space-y-8 animate-in fade-in duration-700 pb-20">
        {/* --- HEADER --- */}
        <div>
          <h1 className="text-2xl sm:text-[32px] font-bold text-white mb-2">User Management</h1>
          <p className="text-[#a1a1aa] text-sm sm:text-[16px]">Manage musicians, organizers, and user accounts</p>
        </div>

        {/* --- TABS --- */}
        <div className="flex gap-4 sm:gap-8 border-b border-[#1a1a1e] overflow-x-auto custom-scrollbar whitespace-nowrap">
          <button 
            onClick={() => setActiveTab("musicians")}
            className={`pb-4 text-[14px] sm:text-[15px] font-bold transition-all relative ${
              activeTab === "musicians" ? "text-[#b3ff00]" : "text-[#a1a1aa] hover:text-white"
            }`}
          >
            Musicians ({musicians.length})
            {activeTab === "musicians" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b3ff00]" />}
          </button>
          <button 
            onClick={() => setActiveTab("organizers")}
            className={`pb-4 text-[14px] sm:text-[15px] font-bold transition-all relative ${
              activeTab === "organizers" ? "text-[#b3ff00]" : "text-[#a1a1aa] hover:text-white"
            }`}
          >
            Organizers ({organizers.length})
            {activeTab === "organizers" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b3ff00]" />}
          </button>
        </div>

        {/* --- FILTERS --- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa] group-focus-within:text-[#b3ff00] transition-colors" />
            <input 
              type="text"
              placeholder="Search by name or email..."
              className="w-full bg-[#1A1A1A] border border-[#1a1a1e] rounded-xl py-3.5 pl-11 pr-4 text-[14px] text-white focus:outline-none focus:border-[#b3ff00]/50 transition-all shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 bg-[#1A1A1A] border border-[#1a1a1e] px-6 py-3.5 rounded-xl text-white font-medium hover:border-[#b3ff00]/50 transition-all shadow-lg text-[14px]">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* --- DATA TABLE --- */}
        <div className="bg-[#1A1A1A] border border-[#1a1a1e] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1F1F1F] border-b border-[#1a1a1e]">
                  <th className="px-6 py-5 text-[14px] font-medium text-[#a1a1aa]">Name</th>
                  <th className="px-6 py-5 text-[14px] font-medium text-[#a1a1aa]">Email</th>
                  <th className="px-6 py-5 text-[14px] font-medium text-[#a1a1aa]">Status</th>
                  
                  {activeTab === "musicians" ? (
                    <>
                      <th className="px-6 py-5 text-[14px] font-medium text-[#a1a1aa]">Bookings</th>
                      <th className="px-6 py-5 text-[14px] font-medium text-[#a1a1aa]">Rating</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-5 text-[14px] font-medium text-[#a1a1aa]">Total Gigs</th>
                      <th className="px-6 py-5 text-[14px] font-medium text-[#a1a1aa]">Total Spent</th>
                    </>
                  )}
                  
                  <th className="px-6 py-5 text-[14px] font-medium text-[#a1a1aa]">Joined</th>
                  <th className="px-6 py-5 text-[14px] font-medium text-[#a1a1aa]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1e]">
                {activeTab === "musicians" ? (
                  filteredMusicians.map((musician) => (
                    <tr key={musician.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <span className="text-white font-bold text-[15px] group-hover:text-[#b3ff00] transition-colors">{musician.name}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[#a1a1aa] text-[14px] font-medium">{musician.email}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${
                          musician.status === 'active' ? 'bg-[#10b981]/10 text-[#10b981]' : 
                          musician.status === 'inactive' ? 'bg-[#52525b]/10 text-[#a1a1aa]' : 'bg-[#ef4444]/10 text-[#ef4444]'
                        }`}>
                          {musician.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-white text-[14px] font-medium opacity-80">{musician.bookings}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
                          <span className="text-white text-[14px] font-bold">{musician.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-[#a1a1aa] text-[14px] font-medium">{musician.joined}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <button onClick={() => setViewModal({ show: true, userData: musician })} className="text-white/70 hover:text-white hover:scale-110 transition-all"><Eye className="w-[18px] h-[18px]" /></button>
                          
                          <button 
                            onClick={() => handleStatusToggle(musician.id, musician.status, "musician")} 
                            className={`hover:scale-110 transition-all ${musician.status === 'active' ? 'text-[#f59e0b] hover:text-[#f59e0b]/80' : 'text-[#10b981] hover:text-[#10b981]/80'}`}
                          >
                            {musician.status === 'active' ? <UserX className="w-[18px] h-[18px]" /> : <UserCheck className="w-[18px] h-[18px]" />}
                          </button>

                          <button onClick={() => setSuspendModal({ show: true, userId: musician.id, userType: "musician" })} className="text-[#ef4444] hover:text-[#ef4444]/80 hover:scale-110 transition-all"><Ban className="w-[18px] h-[18px]" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredOrganizers.map((organizer) => (
                    <tr key={organizer.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <span className="text-white font-bold text-[15px] group-hover:text-[#b3ff00] transition-colors">{organizer.name}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[#a1a1aa] text-[14px] font-medium">{organizer.email}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${
                          organizer.status === 'active' ? 'bg-[#10b981]/10 text-[#10b981]' : 'bg-[#ef4444]/10 text-[#ef4444]'
                        }`}>
                          {organizer.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-white text-[14px] font-medium opacity-80">{organizer.totalGigs}</td>
                      <td className="px-6 py-5">
                        <span className="text-[#b3ff00] text-[15px] font-bold">{organizer.totalSpent}</span>
                      </td>
                      <td className="px-6 py-5 text-[#a1a1aa] text-[14px] font-medium">{organizer.joined}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <button onClick={() => setViewModal({ show: true, userData: organizer })} className="text-white/70 hover:text-white hover:scale-110 transition-all"><Eye className="w-[18px] h-[18px]" /></button>
                          
                          <button 
                            onClick={() => handleStatusToggle(organizer.id, organizer.status, "organizer")} 
                            className={`hover:scale-110 transition-all ${organizer.status === 'active' ? 'text-[#f59e0b] hover:text-[#f59e0b]/80' : 'text-[#10b981] hover:text-[#10b981]/80'}`}
                          >
                            {organizer.status === 'active' ? <UserX className="w-[18px] h-[18px]" /> : <UserCheck className="w-[18px] h-[18px]" />}
                          </button>

                          <button onClick={() => setSuspendModal({ show: true, userId: organizer.id, userType: "organizer" })} className="text-[#ef4444] hover:text-[#ef4444]/80 hover:scale-110 transition-all"><Ban className="w-[18px] h-[18px]" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Toast show={notification.show} message={notification.message} onClose={() => setNotification({ show: false, message: "" })} />
      <UserProfileModal isOpen={viewModal.show} onClose={() => setViewModal({ show: false, userData: null })} userData={viewModal.userData} />
      
      <ConfirmationModal 
        isOpen={suspendModal.show}
        onClose={() => setSuspendModal({ show: false, userId: null, userType: null })}
        onConfirm={handleSuspendConfirm}
        title="Suspend User?"
        description="This user will be suspended and unable to access the platform."
        cancelLabel="Cancel"
        confirmLabel="Suspend"
        confirmVariant="warning"
      />
    </div>
  );
}
