import React, { useState } from 'react';
import { useAuth } from '../core/authentication/AuthContext';
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Settings,
  Users,
  Award,
  Bell,
  BarChart2,
  HelpCircle,
  FolderKanban,
  CheckSquare,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onClose
}) => {
  const { currentRole } = useAuth();

  // Collapsible section states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    teaching: true,
    academics: true,
    governance: true,
    information: false,
    settings: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container: Deep Navy #102A43 adhering to reference UI and design tokens */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#102A43] text-slate-300 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-1/2 -translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header matching UI reference */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/80 bg-[#0C1E30]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md">
              EK
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">EkoWork</span>
              <span className="text-[10px] block text-blue-400 font-medium uppercase tracking-wider">
                {currentRole} Workspace
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs">
          {/* LECTURER WORKSPACE NAVIGATION */}
          {currentRole === 'lecturer' && (
            <>
              {/* Teaching Section - mirrors the reference image hierarchy */}
              <div>
                <button
                  onClick={() => toggleSection('teaching')}
                  className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-white font-medium uppercase tracking-wider text-[11px] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    Teaching
                  </span>
                  {openSections.teaching ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>

                {openSections.teaching && (
                  <div className="mt-1 space-y-0.5">
                    <button
                      onClick={() => handleTabClick('management')}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                        currentTab === 'management'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <Layers className="w-4 h-4 shrink-0" />
                      <span>Management</span>
                    </button>

                    <button
                      onClick={() => handleTabClick('class-schedule')}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                        currentTab === 'class-schedule'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>Class Schedule</span>
                    </button>

                    {/* Student Work: highlighted tab as in reference image! */}
                    <button
                      onClick={() => handleTabClick('student-work')}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-semibold transition-all ${
                        currentTab === 'student-work'
                          ? 'bg-[#2563EB] text-white shadow-md'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckSquare className="w-4 h-4 shrink-0" />
                        <span>Student Work</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-700/60 text-blue-100 font-mono">
                        Active
                      </span>
                    </button>

                    <button
                      onClick={() => handleTabClick('dissemination')}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                        currentTab === 'dissemination'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <Bell className="w-4 h-4 shrink-0" />
                      <span>Dissemination</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Course Operations */}
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Course & Assessment
                </div>
                <div className="mt-1 space-y-0.5">
                  <button
                    onClick={() => handleTabClick('course-builder')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'course-builder'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <FolderKanban className="w-4 h-4 shrink-0" />
                    <span>Course Builder</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('gradebook')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'gradebook'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <Award className="w-4 h-4 shrink-0" />
                    <span>Gradebook</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('class-insights')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'class-insights'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <BarChart2 className="w-4 h-4 shrink-0" />
                    <span>Class Insights</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* STUDENT WORKSPACE NAVIGATION */}
          {currentRole === 'student' && (
            <>
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Student Academics
                </div>
                <div className="mt-1 space-y-0.5">
                  <button
                    onClick={() => handleTabClick('student-dashboard')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'student-dashboard'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('learning-centre')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'learning-centre'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>Learning Centre</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('assignments-assessments')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'assignments-assessments'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <CheckSquare className="w-4 h-4 shrink-0" />
                    <span>Assignments & Tasks</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('academic-records')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'academic-records'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>Academic Records & GPA</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Campus Life
                </div>
                <div className="mt-1 space-y-0.5">
                  <button
                    onClick={() => handleTabClick('student-timetable')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'student-timetable'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Timetable & Calendar</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('student-services')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'student-services'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>My Services & Appeals</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ADMIN WORKSPACE NAVIGATION */}
          {currentRole === 'admin' && (
            <>
              <div>
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Institutional Setup
                </div>
                <div className="mt-1 space-y-0.5">
                  <button
                    onClick={() => handleTabClick('institution-setup')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'institution-setup'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <Settings className="w-4 h-4 shrink-0" />
                    <span>Institution & Campuses</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('people-access')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'people-access'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4 shrink-0" />
                    <span>People & Access</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('academic-structure')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'academic-structure'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>Academic Structure</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Governance & Reports
                </div>
                <div className="mt-1 space-y-0.5">
                  <button
                    onClick={() => handleTabClick('assessment-governance')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'assessment-governance'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <Award className="w-4 h-4 shrink-0" />
                    <span>Assessment Governance</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('reporting-audit')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                      currentTab === 'reporting-audit'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <BarChart2 className="w-4 h-4 shrink-0" />
                    <span>Reporting & Audit</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0C1E30] text-[11px] text-slate-400">
          <div className="flex items-center justify-between">
            <span>EkoWork v1.0</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles className="w-3 h-3" />
              <span>Multi-Tenant</span>
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
