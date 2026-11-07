import React, { useState } from 'react';
import { useAuth } from '../core/authentication/AuthContext';
import { useInstitution } from '../core/institution-context/InstitutionContext';
import { UserRole } from '../types';
import {
  Building2,
  ChevronDown,
  Bell,
  LogOut,
  Search,
  UserCheck,
  Check,
  GraduationCap
} from 'lucide-react';

interface TopbarProps {
  onMobileMenuToggle: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onMobileMenuToggle }) => {
  const { currentUser, currentRole, switchRole, logout } = useAuth();
  const { currentInstitution, institutions, selectInstitution } = useInstitution();

  const [showInstitutionDropdown, setShowInstitutionDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'New submission from Aine Sarah', detail: 'DES-301: Interface Design deliverable', time: '12m ago', unread: true },
    { id: 2, title: 'Senate Grading Deadline Notice', detail: 'Semester II provisional results due in 8 days', time: '2h ago', unread: true },
    { id: 3, title: 'Campus Timetable Update', detail: 'Design Studio Lab 3B room change approved', time: '1d ago', unread: false }
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-slate-200">
      {/* Zone 1: Mobile toggle + Breadcrumb / Institution indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 -ml-2 text-slate-600 rounded-lg lg:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label="Open sidebar navigation"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-900 tracking-tight text-sm">EkoWork</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="text-slate-700 font-medium">{currentInstitution.shortName}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-blue-600 font-medium">{currentInstitution.semester}</span>
        </div>
      </div>

      {/* Zone 2: Search Bar + Institution Switcher + Fast Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search Bar */}
        <div className="relative hidden md:block w-52 lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, tasks..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        {/* Institution Context Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowInstitutionDropdown(!showInstitutionDropdown);
              setShowRoleDropdown(false);
              setShowProfileDropdown(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 whitespace-nowrap"
            title="Switch Institution Context"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="max-w-[110px] sm:max-w-[140px] truncate">{currentInstitution.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showInstitutionDropdown && (
            <div className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-40">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Active Institution
              </div>
              {institutions.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => {
                    selectInstitution(inst.id);
                    setShowInstitutionDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors hover:bg-slate-50 ${
                    inst.id === currentInstitution.id ? 'bg-blue-50/60 font-semibold text-blue-700' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-base">{inst.logo}</span>
                    <div className="truncate">
                      <div className="truncate">{inst.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{inst.location}</div>
                    </div>
                  </div>
                  {inst.id === currentInstitution.id && (
                    <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fast Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleDropdown(!showRoleDropdown);
              setShowInstitutionDropdown(false);
              setShowProfileDropdown(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 whitespace-nowrap"
            title="Switch User Role"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="capitalize">{currentRole} Workspace</span>
            <ChevronDown className="w-3.5 h-3.5 text-blue-500" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-40">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Role View
              </div>
              {(['lecturer', 'student', 'admin'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    switchRole(role);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors hover:bg-slate-50 ${
                    role === currentRole ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="capitalize">{role}</span>
                    {role === 'lecturer' && <span className="text-[10px] text-slate-400">(Heimaux R.)</span>}
                    {role === 'student' && <span className="text-[10px] text-slate-400">(Aine S.)</span>}
                    {role === 'admin' && <span className="text-[10px] text-slate-400">(Dr. Kigozi)</span>}
                  </div>
                  {role === currentRole && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowInstitutionDropdown(false);
              setShowRoleDropdown(false);
              setShowProfileDropdown(false);
            }}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-1.5 w-80 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-40">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-900">Notifications</span>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-xs font-medium text-slate-800 leading-snug">{n.title}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{n.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowInstitutionDropdown(false);
              setShowRoleDropdown(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="User profile menu"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name || 'User'}
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <span className="hidden xl:block text-xs font-medium text-slate-800">
              {currentUser?.name}
            </span>
            <ChevronDown className="hidden xl:block w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-40">
              <div className="px-3.5 py-2.5 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900">{currentUser?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser?.email}</p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-blue-700 font-medium">
                  <GraduationCap className="w-3 h-3" />
                  <span>{currentUser?.identifier}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setShowProfileDropdown(false);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
