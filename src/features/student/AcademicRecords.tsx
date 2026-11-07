import React, { useState } from 'react';
import { mockAcademicRecord } from '../../data/mockData';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  GraduationCap,
  Printer,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AcademicRecords: React.FC = () => {
  const record = mockAcademicRecord;
  const [selectedSemester, setSelectedSemester] = useState<number>(0);
  const [isTranscriptModalOpen, setIsTranscriptModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Academic Records & Published Transcripts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Verified university grades, cumulative GPA, and degree credit progression.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => alert('Official digital transcript generated with cryptographic university seal.')}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Download Official Transcript (PDF)
        </Button>
      </div>

      {/* KPI Cards: CGPA, Progression, Credits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Cumulative GPA (CGPA)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-700 font-mono tabular-nums">
              {record.cgpa.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ {record.maxGpa.toFixed(1)}</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">First Class Standing</p>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Degree Credit Accumulation</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {record.creditsEarned}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ {record.totalCreditsRequired} Credits</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full"
              style={{ width: `${(record.creditsEarned / record.totalCreditsRequired) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Progression Status</span>
          <p className="text-xl font-bold text-slate-900 mt-1">{record.progressionStatus}</p>
          <p className="text-[11px] text-slate-400 mt-1">Approved by Senate Board</p>
        </div>

        <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Enrolled Academic Degree</span>
          <p className="text-xs font-bold text-slate-900 mt-1 leading-snug">{record.program}</p>
          <p className="text-[11px] text-slate-400 mt-1">Year {record.currentYear} · Semester {record.currentSemester}</p>
        </div>
      </div>

      {/* Semester Results Breakdown */}
      <div className="space-y-4">
        {record.semesters.map((sem, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{sem.semesterName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Total Registered Credits: {sem.credits}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Semester GPA:</span>
                <span className="text-sm font-bold text-blue-700 font-mono px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  {sem.gpa.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/30 text-slate-500 font-semibold">
                    <th className="py-2.5 px-5">Course Code</th>
                    <th className="py-2.5 px-5">Course Title</th>
                    <th className="py-2.5 px-3 text-center">Credits</th>
                    <th className="py-2.5 px-3 text-center">Score</th>
                    <th className="py-2.5 px-3 text-center">Grade</th>
                    <th className="py-2.5 px-3 text-center">Grade Point</th>
                    <th className="py-2.5 px-4 text-center">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sem.courses.map((c, cIdx) => (
                    <tr key={cIdx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-5 font-bold font-mono text-slate-800">{c.courseCode}</td>
                      <td className="py-3 px-5 text-slate-700">{c.courseTitle}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums text-slate-600">{c.credits}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums text-slate-800 font-semibold">{c.score}%</td>
                      <td className="py-3 px-3 text-center font-bold text-slate-900">{c.grade}</td>
                      <td className="py-3 px-3 text-center font-mono tabular-nums text-slate-700">{c.gradePoint.toFixed(1)}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                          c.status === 'Distinction'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
