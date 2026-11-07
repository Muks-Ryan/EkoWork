import React from 'react';
import { mockCourses, initialStudentWorkItems, mockTimetableEvents } from '../../data/mockData';
import { useAuth } from '../../core/authentication/AuthContext';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface StudentDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigateTab }) => {
  const { currentUser } = useAuth();

  const pendingTasks = initialStudentWorkItems.slice(0, 3);
  const todayClasses = mockTimetableEvents.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#102A43] text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-600/30 text-blue-300 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Semester II Academic Session · Week 5</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Welcome back, {currentUser?.name || 'Aine Sarah'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            You have <strong className="text-white font-mono">2 assignments</strong> due this week and 1 timetable room change. Keep up the high standard!
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigateTab('assignments-assessments')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Pending Homework
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigateTab('learning-centre')}
            >
              Open Learning Centre
            </Button>
          </div>
        </div>
      </div>

      {/* Grid: Enrolled Courses & Pending Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Enrolled Courses */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Enrolled Courses ({mockCourses.length})
            </h2>
            <button
              onClick={() => onNavigateTab('learning-centre')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Browse all materials →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockCourses.map((crs) => (
              <div
                key={crs.id}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">
                      {crs.code}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{crs.credits} Credits</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2">{crs.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Lecturer: {crs.lecturerName}</p>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{crs.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Syllabus Progress</span>
                    <span className="font-mono font-semibold text-slate-800">{crs.progressPercent || 50}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${crs.progressPercent || 50}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 cols: Pending Homework & Today's Schedule */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pending Tasks */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Upcoming Deadlines
              </h3>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900">{task.workName}</p>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded font-mono">
                      {task.weighting}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{task.courseName}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Updated: {task.updateTime}</span>
                    <span className="text-amber-700 font-semibold">Active</span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onNavigateTab('assignments-assessments')}
            >
              Submit Coursework
            </Button>
          </div>

          {/* Today's Classes */}
          <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Today's Lectures
              </h3>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-2.5">
              {todayClasses.map((cl) => (
                <div key={cl.id} className="p-2.5 border-l-2 border-l-blue-600 bg-slate-50/60 pl-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{cl.courseCode}</span>
                    <span className="font-mono text-slate-500">{cl.startTime} - {cl.endTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{cl.courseTitle}</p>
                  <p className="text-[10px] text-blue-600 font-medium mt-0.5">{cl.room} · {cl.building}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
