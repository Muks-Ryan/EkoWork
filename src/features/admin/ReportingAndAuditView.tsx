import React, { useState } from 'react';
import { BarChart3, Download, History, Shield, TrendingUp, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ReportingAndAuditView: React.FC = () => {
  const auditLogs = [
    {
      id: 'log-1',
      action: 'Grade Modified',
      actor: 'Heimaux Ronald (Lecturer)',
      target: 'Aine Sarah · DES-301 Interface Design',
      timestamp: '2026-03-04 14:35:12 UTC',
      detail: 'Score updated to 94/100 (Grade A) with rubric justification.'
    },
    {
      id: 'log-2',
      action: 'Curriculum Added',
      actor: 'Dr. Kigozi Edward (Registrar)',
      target: 'Course Catalogue: DBS-202',
      timestamp: '2026-03-03 11:20:05 UTC',
      detail: 'Registered 3 Credit Units under School of Computing & Informatics.'
    },
    {
      id: 'log-3',
      action: 'Account Provisioned',
      actor: 'System Administrator',
      target: 'Mugerwa Davis (Student)',
      timestamp: '2026-03-01 09:15:44 UTC',
      detail: 'Matriculation ID 22/U/10495/PS issued with portal credentials.'
    },
    {
      id: 'log-4',
      action: 'Policy Adjusted',
      actor: 'Academic Senate Board',
      target: 'Grading Scheme',
      timestamp: '2026-02-28 16:40:00 UTC',
      detail: 'Ratified late submission window penalty cap at 5% per 24 hours.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Institutional Analytics & Security Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Immutable operational logs of grade changes, enrollment statistics, and role modifications.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => alert('Exporting full audit trail for external academic accreditation review.')}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Export Compliance Audit Log
        </Button>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total University Enrolment</span>
          <p className="text-2xl font-bold text-slate-900 font-mono mt-1">4,820</p>
          <span className="text-xs text-emerald-600 font-medium font-mono">+6.4% this session</span>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Semester Completion Rate</span>
          <p className="text-2xl font-bold text-blue-600 font-mono mt-1">94.8%</p>
          <span className="text-xs text-slate-400">Across 18 faculties</span>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Coursework Submissions</span>
          <p className="text-2xl font-bold text-slate-900 font-mono mt-1">12,490</p>
          <span className="text-xs text-slate-400 font-mono">100% receipt verified</span>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Senate Moderation Status</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">Compliant</p>
          <span className="text-xs text-slate-400">Zero unmoderated results</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              System Audit Trail & Privilege Execution Records
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Real-time tamper-evident log</span>
        </div>

        <div className="divide-y divide-slate-100">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-900">{log.action}</span>
                  <span className="text-[11px] text-slate-400 font-mono">· {log.target}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{log.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{log.detail}</p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-blue-700 font-medium">
                <span>Authorized Actor: {log.actor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
