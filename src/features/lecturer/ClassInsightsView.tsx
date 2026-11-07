import React, { useState } from 'react';
import { mockCourses } from '../../data/mockData';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Mail,
  Send,
  TrendingUp,
  Users
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ClassInsightsView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0].id);
  const [outreachSent, setOutreachSent] = useState<string | null>(null);

  const atRiskStudents = [
    {
      id: 'stu-risk-1',
      name: 'Ocen Emmanuel',
      matric: '22/U/10518/PS',
      reason: 'Missed 2 consecutive assignment deadlines (Interface Design, Color Practice).',
      attendance: '62%',
      lastActive: '5 days ago'
    },
    {
      id: 'stu-risk-2',
      name: 'Mugerwa Davis',
      matric: '22/U/10495/PS',
      reason: 'Average score dropped from 84% to 68% over past 2 modules.',
      attendance: '78%',
      lastActive: 'Yesterday'
    }
  ];

  const handleSendOutreach = (name: string) => {
    setOutreachSent(`Support consultation invite emailed to ${name}.`);
    setTimeout(() => setOutreachSent(null), 3500);
  };

  return (
    <div className="space-y-6">
      {outreachSent && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{outreachSent}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Class Engagement & Student Support Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Identify retention bottlenecks, submission trends, and at-risk students needing intervention.
          </p>
        </div>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 font-medium text-slate-800 shadow-xs cursor-pointer focus:ring-2 focus:ring-blue-600 focus:outline-none"
        >
          {mockCourses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}: {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">On-Time Submissions</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">87.5%</span>
            <span className="text-xs font-semibold text-emerald-600 font-mono">+4.2%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Higher than department median</p>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Studio Attendance Rate</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-mono">92.1%</span>
            <span className="text-xs font-semibold text-emerald-600 font-mono">+1.8%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Design Studio Lab 3B</p>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Resource Utilization</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-600 font-mono">74%</span>
            <span className="text-xs text-slate-400 font-mono">Downloads</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Lecture slides & handouts</p>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Academic Support Flags</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-600 font-mono">2 Students</span>
          </div>
          <p className="text-[11px] text-amber-700 font-medium mt-1">Requires immediate outreach</p>
        </div>
      </div>

      {/* At-Risk Student Intervention List */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 bg-amber-50/50 border-b border-amber-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Students Needing Academic Guidance & Remediation
            </h3>
          </div>
          <span className="text-xs text-amber-800 font-medium">Automated early warning system</span>
        </div>

        <div className="divide-y divide-slate-100">
          {atRiskStudents.map((st) => (
            <div key={st.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-slate-900 text-sm">{st.name}</span>
                  <span className="text-xs font-mono text-slate-400">({st.matric})</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-medium">
                    Attendance {st.attendance}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{st.reason}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Last portal activity: {st.lastActive}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSendOutreach(st.name)}
                  leftIcon={<Mail className="w-3.5 h-3.5" />}
                >
                  Send Academic Support Notice
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
