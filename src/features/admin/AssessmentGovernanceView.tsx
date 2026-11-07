import React, { useState } from 'react';
import { Award, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AssessmentGovernanceView: React.FC = () => {
  const [gradingScale, setGradingScale] = useState<'4.0' | '5.0'>('4.0');
  const [passMark, setPassMark] = useState(50);
  const [latePenaltyPercent, setLatePenaltyPercent] = useState(5);
  const [requireModeration, setRequireModeration] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const handleSavePolicy = () => {
    setToast('Institutional assessment policies saved and propagated to faculty gradebooks.');
    setTimeout(() => setToast(null), 3500);
  };

  const scale4 = [
    { grade: 'A', range: '80% - 100%', gpa: '4.0', desc: 'Distinction / Exceptional' },
    { grade: 'B+', range: '75% - 79%', gpa: '3.5', desc: 'High Credit' },
    { grade: 'B', range: '70% - 74%', gpa: '3.0', desc: 'Credit' },
    { grade: 'C+', range: '65% - 69%', gpa: '2.5', desc: 'High Pass' },
    { grade: 'C', range: '60% - 64%', gpa: '2.0', desc: 'Pass' },
    { grade: 'D', range: '50% - 59%', gpa: '1.0', desc: 'Marginal Pass' },
    { grade: 'F', range: '0% - 49%', gpa: '0.0', desc: 'Fail / Retake' }
  ];

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Assessment Governance & Grading Policies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure senate-approved grading scales, moderation thresholds, and progression cutoffs.
          </p>
        </div>

        <Button variant="primary" onClick={handleSavePolicy}>
          Save Policy Standards
        </Button>
      </div>

      {/* Policy Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Active Grading Model
          </h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="scale"
                checked={gradingScale === '4.0'}
                onChange={() => setGradingScale('4.0')}
                className="text-blue-600 focus:ring-blue-600"
              />
              <span>Standard 4.0 Scale (US / Global Alignment)</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="scale"
                checked={gradingScale === '5.0'}
                onChange={() => setGradingScale('5.0')}
                className="text-blue-600 focus:ring-blue-600"
              />
              <span>5.0 Scale (Ugandan / East African Universities)</span>
            </label>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Pass Mark Threshold
          </h3>
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Undergraduate Course Minimum:</span>
              <strong className="font-mono text-blue-700">{passMark}%</strong>
            </div>
            <input
              type="range"
              min={40}
              max={60}
              value={passMark}
              onChange={(e) => setPassMark(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Late Submission Policy
          </h3>
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
              <span>Penalty Deduction per 24 hours:</span>
              <strong className="font-mono text-amber-700">{latePenaltyPercent}%</strong>
            </div>
            <input
              type="range"
              min={0}
              max={20}
              value={latePenaltyPercent}
              onChange={(e) => setLatePenaltyPercent(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Grade Scale Reference Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Configured Grade Conversion Table ({gradingScale} Model)
          </span>
          <span className="text-xs text-slate-500 font-mono">Senate Circular 2026/G1</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/40 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-5">Letter Grade</th>
                <th className="py-2.5 px-4">Score Band</th>
                <th className="py-2.5 px-4 text-center">Grade Point</th>
                <th className="py-2.5 px-5">Academic Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scale4.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-3 px-5 font-bold text-slate-900 font-mono text-sm">{row.grade}</td>
                  <td className="py-3 px-4 text-slate-700 font-mono">{row.range}</td>
                  <td className="py-3 px-4 text-center font-bold text-blue-700 font-mono">{row.gpa}</td>
                  <td className="py-3 px-5 text-slate-600">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
