"use client";

import React, { useState } from "react";
import { Eye, Trash2, CheckCircle2, XCircle } from "lucide-react";
import {
  CourseDetailsModal,
  type CourseProfile,
} from "@/components/ui/CourseDetailsModal";
import { DeleteCourseModal } from "@/components/ui/DeleteCourseModal";
import {
  CertificationSubmissionDetailsModal,
  type CertificationSubmissionDetail,
} from "@/components/ui/CertificationSubmissionDetailsModal";
import { ApproveCertificationModal } from "@/components/ui/ApproveCertificationModal";
import { RejectCertificationModal } from "@/components/ui/RejectCertificationModal";

type CourseStatus = "Published" | "Draft" | "Archived";

interface Course {
  id: string;
  name: string;
  category: string;
  createdDate: string;
  status: CourseStatus;
  enrolled: number;
  completion: number;
  description: string;
  modules: string[];
}

const initialCourses: Course[] = [
  {
    id: "C001",
    name: "CPR & First Aid Certification",
    category: "Safety",
    createdDate: "2024-01-05",
    status: "Published",
    enrolled: 145,
    completion: 87,
    description: "This comprehensive course covers essential skills and knowledge required for safety in childcare settings.",
    modules: ["Module 1: Introduction", "Module 2: Core Concepts", "Module 3: Practical Application"],
  },
  {
    id: "C002",
    name: "Child Development Basics",
    category: "Education",
    createdDate: "2024-01-10",
    status: "Published",
    enrolled: 98,
    completion: 92,
    description: "Foundational knowledge of child development stages, behavior, and age-appropriate engagement strategies.",
    modules: ["Module 1: Developmental Stages", "Module 2: Cognitive Growth", "Module 3: Social & Emotional Skills"],
  },
  {
    id: "C003",
    name: "Emergency Response Training",
    category: "Safety",
    createdDate: "2024-02-01",
    status: "Published",
    enrolled: 67,
    completion: 79,
    description: "Critical training on responding to emergencies and ensuring child safety in high-pressure situations.",
    modules: ["Module 1: Risk Assessment", "Module 2: Response Protocols", "Module 3: Recovery & Reporting"],
  },
  {
    id: "C004",
    name: "Age-Appropriate Activities",
    category: "Education",
    createdDate: "2024-02-15",
    status: "Draft",
    enrolled: 0,
    completion: 0,
    description: "Curated activity ideas tailored to children of various age groups and interests.",
    modules: ["Module 1: Infants & Toddlers", "Module 2: Preschoolers", "Module 3: School-Age"],
  },
];

function toCourseProfile(c: Course): CourseProfile {
  return {
    courseId: c.id,
    courseName: c.name,
    category: c.category,
    createdDate: c.createdDate,
    status: c.status,
    enrolledStudents: c.enrolled,
    completionRate: c.completion,
    description: c.description,
    modules: c.modules,
  };
}

type ApprovalStatus = "Pending" | "Approved" | "Rejected";

interface CertificationSubmission {
  id: string;
  babysitterName: string;
  courseName: string;
  submissionDate: string;
  score: number;
  status: ApprovalStatus;
  questionsAnswered: string;
  correctAnswers: string;
  timeTaken: string;
}

const initialApprovals: CertificationSubmission[] = [
  { id: "S001", babysitterName: "Emma Martinez", courseName: "CPR & First Aid Certification", submissionDate: "2024-02-20", score: 94, status: "Pending", questionsAnswered: "50/50", correctAnswers: "47/50", timeTaken: "45 minutes" },
  { id: "S002", babysitterName: "Lily Chen", courseName: "Child Development Basics", submissionDate: "2024-02-21", score: 88, status: "Pending", questionsAnswered: "40/40", correctAnswers: "35/40", timeTaken: "38 minutes" },
  { id: "S003", babysitterName: "Jake Thompson", courseName: "Emergency Response Training", submissionDate: "2024-02-18", score: 96, status: "Approved", questionsAnswered: "50/50", correctAnswers: "48/50", timeTaken: "42 minutes" },
  { id: "S004", babysitterName: "Sarah Davis", courseName: "CPR & First Aid Certification", submissionDate: "2024-02-17", score: 92, status: "Approved", questionsAnswered: "50/50", correctAnswers: "46/50", timeTaken: "47 minutes" },
  { id: "S005", babysitterName: "Marcus Johnson", courseName: "Child Development Basics", submissionDate: "2024-02-19", score: 85, status: "Pending", questionsAnswered: "40/40", correctAnswers: "34/40", timeTaken: "40 minutes" },
  { id: "S006", babysitterName: "Olivia Brown", courseName: "Emergency Response Training", submissionDate: "2024-02-16", score: 78, status: "Rejected", questionsAnswered: "50/50", correctAnswers: "39/50", timeTaken: "55 minutes" },
  { id: "S007", babysitterName: "Noah Williams", courseName: "Age-Appropriate Activities", submissionDate: "2024-02-22", score: 91, status: "Pending", questionsAnswered: "30/30", correctAnswers: "27/30", timeTaken: "28 minutes" },
  { id: "S008", babysitterName: "Sophia Patel", courseName: "CPR & First Aid Certification", submissionDate: "2024-02-15", score: 89, status: "Approved", questionsAnswered: "50/50", correctAnswers: "44/50", timeTaken: "44 minutes" },
  { id: "S009", babysitterName: "Liam Garcia", courseName: "Child Development Basics", submissionDate: "2024-02-23", score: 82, status: "Pending", questionsAnswered: "40/40", correctAnswers: "33/40", timeTaken: "39 minutes" },
  { id: "S010", babysitterName: "Ava Rodriguez", courseName: "Emergency Response Training", submissionDate: "2024-02-14", score: 95, status: "Approved", questionsAnswered: "50/50", correctAnswers: "48/50", timeTaken: "41 minutes" },
];

function toSubmissionDetail(s: CertificationSubmission): CertificationSubmissionDetail {
  return {
    submissionId: s.id,
    babysitterName: s.babysitterName,
    courseName: s.courseName,
    submissionDate: s.submissionDate,
    score: s.score,
    status: s.status,
    questionsAnswered: s.questionsAnswered,
    correctAnswers: s.correctAnswers,
    timeTaken: s.timeTaken,
  };
}

type Tab = "courses" | "approvals";

export default function CertificationsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("courses");
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [approvals, setApprovals] = useState<CertificationSubmission[]>(initialApprovals);
  const [selectedCourse, setSelectedCourse] = useState<CourseProfile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

  const [activeSub, setActiveSub] = useState<CertificationSubmission | null>(null);
  const [activeSubModal, setActiveSubModal] = useState<"details" | "approve" | "reject" | null>(null);

  const openSubModal = (sub: CertificationSubmission, modal: "details" | "approve" | "reject") => {
    setActiveSub(sub);
    setActiveSubModal(modal);
  };

  const closeSubModal = () => {
    setActiveSubModal(null);
    setActiveSub(null);
  };

  const handleDelete = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleApprovalAction = (id: string, status: "Approved" | "Rejected") => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-[32px] leading-[40px] font-bold text-white">
          Certifications &amp; Training Management
        </h1>
        <p className="mt-1 text-[15px] text-[#94a3b8]">
          Manage courses, training materials, and certification approvals
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SimpleStatCard label="Active Courses" value="12" valueColor="text-white" />
        <SimpleStatCard label="Total Enrollments" value="156" valueColor="text-[#34d399]" />
        <SimpleStatCard label="Pending Approvals" value="12" valueColor="text-[#c4b5fd]" />
        <SimpleStatCard label="Avg Completion Rate" value="86%" valueColor="text-[#34d399]" />
      </div>

      {/* Tabs */}
      <div className="inline-flex items-center gap-2 bg-[#0f172a]/60 border border-white/10 rounded-full p-1.5">
        <TabButton active={activeTab === "courses"} onClick={() => setActiveTab("courses")}>
          Course Management
        </TabButton>
        <TabButton active={activeTab === "approvals"} onClick={() => setActiveTab("approvals")}>
          Certification Approvals
        </TabButton>
      </div>

      {/* Tab content */}
      {activeTab === "courses" ? (
        <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
          <h2 className="text-[18px] leading-[26px] font-semibold text-white mb-5">
            All Courses
          </h2>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[860px]">
              <thead>
                <tr className="border-b border-[#334155]/50">
                  <Th>Course Name</Th>
                  <Th>Category</Th>
                  <Th>Created Date</Th>
                  <Th>Status</Th>
                  <Th>Enrolled</Th>
                  <Th>Completion</Th>
                  <Th align="right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-[#334155]/30 last:border-0"
                  >
                    <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{c.name}</td>
                    <td className="py-4 pr-4 text-[14px] text-[#94a3b8]">{c.category}</td>
                    <td className="py-4 pr-4 text-[14px] text-[#94a3b8] whitespace-nowrap">{c.createdDate}</td>
                    <td className="py-4 pr-4">
                      <CourseStatusBadge status={c.status} />
                    </td>
                    <td className="py-4 pr-4 text-[14px] text-white">{c.enrolled}</td>
                    <td className="py-4 pr-4 text-[14px] text-white">{c.completion}%</td>
                    <td className="py-4 pl-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedCourse(toCourseProfile(c))}
                          aria-label="View course"
                          className="p-1.5 text-[#94a3b8] hover:text-white transition-colors"
                        >
                          <Eye className="w-[18px] h-[18px]" strokeWidth={1.75} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(c)}
                          aria-label="Delete course"
                          className="p-1.5 text-[#ef4444] hover:text-[#dc2626] transition-colors"
                        >
                          <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.75} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-[14px] text-[#94a3b8]">
                      No courses yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
          <h2 className="text-[18px] leading-[26px] font-semibold text-white mb-5">
            Certification Submissions
          </h2>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr className="border-b border-[#334155]/50">
                  <Th>Babysitter Name</Th>
                  <Th>Course Name</Th>
                  <Th>Submission Date</Th>
                  <Th>Score</Th>
                  <Th>Status</Th>
                  <Th align="right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {approvals.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-[#334155]/30 last:border-0"
                  >
                    <td className="py-4 pr-4 text-[14px] text-white whitespace-nowrap">{a.babysitterName}</td>
                    <td className="py-4 pr-4 text-[14px] text-white">{a.courseName}</td>
                    <td className="py-4 pr-4 text-[14px] text-[#94a3b8] whitespace-nowrap">{a.submissionDate}</td>
                    <td className="py-4 pr-4 text-[14px] font-bold text-white">{a.score}%</td>
                    <td className="py-4 pr-4">
                      <ApprovalBadge status={a.status} />
                    </td>
                    <td className="py-4 pl-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openSubModal(a, "details")}
                          aria-label="View submission"
                          className="p-1.5 text-[#94a3b8] hover:text-white transition-colors"
                        >
                          <Eye className="w-[18px] h-[18px]" strokeWidth={1.75} />
                        </button>
                        {a.status === "Pending" && (
                          <>
                            <button
                              onClick={() => openSubModal(a, "approve")}
                              aria-label="Approve"
                              className="p-1.5 text-[#34d399] hover:text-[#22c55e] transition-colors"
                            >
                              <CheckCircle2 className="w-[18px] h-[18px]" strokeWidth={1.75} />
                            </button>
                            <button
                              onClick={() => openSubModal(a, "reject")}
                              aria-label="Reject"
                              className="p-1.5 text-[#ef4444] hover:text-[#dc2626] transition-colors"
                            >
                              <XCircle className="w-[18px] h-[18px]" strokeWidth={1.75} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {approvals.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-[14px] text-[#94a3b8]">
                      No certification submissions.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <CourseDetailsModal
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        data={selectedCourse}
      />

      <DeleteCourseModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) handleDelete(deleteTarget.id);
        }}
        courseName={deleteTarget?.name ?? ""}
        category={deleteTarget?.category ?? ""}
        enrolled={deleteTarget?.enrolled ?? 0}
      />

      <CertificationSubmissionDetailsModal
        isOpen={activeSubModal === "details" && activeSub !== null}
        onClose={closeSubModal}
        data={activeSub ? toSubmissionDetail(activeSub) : null}
        onApprove={() => setActiveSubModal("approve")}
        onReject={() => setActiveSubModal("reject")}
      />

      <ApproveCertificationModal
        isOpen={activeSubModal === "approve" && activeSub !== null}
        onClose={closeSubModal}
        onConfirm={() => {
          if (activeSub) handleApprovalAction(activeSub.id, "Approved");
        }}
        babysitterName={activeSub?.babysitterName ?? ""}
        courseName={activeSub?.courseName ?? ""}
        score={activeSub?.score ?? 0}
      />

      <RejectCertificationModal
        isOpen={activeSubModal === "reject" && activeSub !== null}
        onClose={closeSubModal}
        onConfirm={() => {
          if (activeSub) handleApprovalAction(activeSub.id, "Rejected");
        }}
        babysitterName={activeSub?.babysitterName ?? ""}
        courseName={activeSub?.courseName ?? ""}
        score={activeSub?.score ?? 0}
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

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 h-[40px] rounded-full text-[14px] font-medium transition-all ${
        active
          ? "bg-[#1e293b]/90 border border-white/20 text-white"
          : "border border-transparent text-[#94a3b8] hover:text-white"
      }`}
    >
      {children}
    </button>
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

function ApprovalBadge({ status }: { status: ApprovalStatus }) {
  if (status === "Approved") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#34d399]/15 border border-[#34d399]/25 text-[#34d399] text-[12px] font-medium">
        Approved
      </span>
    );
  }
  if (status === "Rejected") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#ef4444]/15 border border-[#ef4444]/25 text-[#ef4444] text-[12px] font-medium">
        Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#a78bfa]/15 border border-[#a78bfa]/25 text-[#c4b5fd] text-[12px] font-medium">
      Pending
    </span>
  );
}

function CourseStatusBadge({ status }: { status: CourseStatus }) {
  if (status === "Published") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#34d399]/15 border border-[#34d399]/25 text-[#34d399] text-[12px] font-medium">
        Published
      </span>
    );
  }
  if (status === "Draft") {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#7dd3fc]/15 border border-[#7dd3fc]/25 text-[#7dd3fc] text-[12px] font-medium">
        Draft
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#94a3b8]/15 border border-[#94a3b8]/25 text-[#94a3b8] text-[12px] font-medium">
      Archived
    </span>
  );
}
