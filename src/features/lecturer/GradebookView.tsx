import React, { useState } from 'react';
import { mockCourses } from '../../data/mockData';
import { Award, Download, Filter, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

interface GradeRow {
  studentId: string;
  name: string;
  matric: string;
  iconDesign: number; // 15%
  interfaceDesign: number; // 20%
  productExperience: number; // 25%
  finalExam: number; // 40%
  status: 'Complete' | 'Missing Result';
}

export const GradebookView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0].id);

  const [students, setStudents] = useState<GradeRow[]>([
    {
      studentId: 'usr-stu-1',
      name: 'Aine Sarah',
      matric: '22/U/10492/PS',
      iconDesign: 95,
      interfaceDesign: 94,
      productExperience: 91,
      finalExam: 88,
      status: 'Complete'
    },
    {
      studentId: 'usr-stu-2',
      name: 'Mugerwa Davis',
      matric: '22/U/10495/PS',
      iconDesign: 84,
      interfaceDesign: 82,
      productExperience: 78,
      finalExam: 80,
      status: 'Complete'
    },
    {
      studentId: 'usr-stu-3',
      name: 'Nakato Brenda',
      matric: '22/U/10502/PS',
      iconDesign: 88,
      interfaceDesign: 90,
      productExperience: 85,
      finalExam: 92,
      status: 'Complete'
    },
    {
      studentId: 'usr-stu-4',
      name: 'Ocen Emmanuel',
      matric: '22/U/10518/PS',
      iconDesign: 70,
      interfaceDesign: 0,
      productExperience: 65,
      finalExam: 72,
      status: 'Missing Result'
    },
    {
      studentId: 'usr-stu-5',
      name: 'Tumuhimbise Joan',
      matric: '22/U/10530/PS',
      iconDesign: 92,
      interfaceDesign: 89,
      productExperience: 95,
      finalExam: 90,
      status: 'Complete'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const calculateWeightedTotal = (row: GradeRow) => {
    const total =
      row.iconDesign * 0.15 +
      row.interfaceDesign * 0.2 +
      row.productExperience * 0.25 +
      row.finalExam * 0.4;
    return Math.round(total * 10) / 10;
  };

  const getFinalGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', gpa: 4.0 };
    if (score >= 80) return { grade: 'B+', gpa: 3.5 };
    if (score >= 70) return { grade: 'B', gpa: 3.0 };
    if (score >= 60) return { grade: 'C', gpa: 2.0 };
    if (score >= 50) return { grade: 'D', gpa: 1.0 };
    return { grade: 'F', gpa: 0.0 };
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.matric.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Official Course Gradebook
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configured weightings: Icon Design (15%) · Interface (20%) · Product Exp (25%) · Final Exam (40%)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Official Gradebook exported for University Examination Board.')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Official Grade Sheet</span>
          </button>
        </div>
      </div>

      {/* Filter and stats strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Class Enrolled</span>
          <p className="text-xl font-bold text-slate-900 font-mono mt-1">80 Students</p>
        </div>
        <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Class Average Total</span>
          <p className="text-xl font-bold text-blue-600 font-mono mt-1">84.2%</p>
        </div>
        <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Highest Score</span>
          <p className="text-xl font-bold text-emerald-600 font-mono mt-1">91.8% (Aine S.)</p>
        </div>
        <div className="p-4 bg-white border border-slate-200/90 rounded-xl shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Flagged Missing Results</span>
          <p className="text-xl font-bold text-amber-600 font-mono mt-1">1 Student</p>
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student or matric..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono">Grading Scale: 4.0 Standard Scale</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Student & Matric</th>
                <th className="py-3 px-3 text-right">Icon Design (15%)</th>
                <th className="py-3 px-3 text-right">Interface (20%)</th>
                <th className="py-3 px-3 text-right">Product Exp (25%)</th>
                <th className="py-3 px-3 text-right">Final Exam (40%)</th>
                <th className="py-3 px-4 text-right font-bold text-blue-900">Total (100%)</th>
                <th className="py-3 px-3 text-center">Grade</th>
                <th className="py-3 px-3 text-center">GPA</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filtered.map((s) => {
                const total = calculateWeightedTotal(s);
                const { grade, gpa } = getFinalGrade(total);

                return (
                  <tr key={s.studentId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-sans font-medium text-slate-900">
                      <div>{s.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{s.matric}</div>
                    </td>
                    <td className="py-3 px-3 text-right text-slate-700 tabular-nums">{s.iconDesign}</td>
                    <td className={`py-3 px-3 text-right tabular-nums ${s.interfaceDesign === 0 ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                      {s.interfaceDesign === 0 ? '0 (Missing)' : s.interfaceDesign}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-700 tabular-nums">{s.productExperience}</td>
                    <td className="py-3 px-3 text-right text-slate-700 tabular-nums">{s.finalExam}</td>
                    <td className="py-3 px-4 text-right font-bold text-blue-700 text-sm tabular-nums">
                      {total}%
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-bold text-slate-900 font-sans">{grade}</span>
                    </td>
                    <td className="py-3 px-3 text-center text-slate-700 tabular-nums">
                      {gpa.toFixed(1)}
                    </td>
                    <td className="py-3 px-4 text-center font-sans">
                      {s.status === 'Complete' ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
                          Complete
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold flex items-center justify-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Missing Result
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
