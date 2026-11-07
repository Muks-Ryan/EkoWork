import React, { useState } from 'react';
import { mockTimetableEvents } from '../../data/mockData';
import {
  AlertCircle,
  Building,
  Calendar,
  Clock,
  MapPin,
  User
} from 'lucide-react';

export const StudentTimetable: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('All');

  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredEvents = mockTimetableEvents.filter((ev) => {
    if (selectedDay !== 'All' && ev.day !== selectedDay) return false;
    return true;
  });

  const institutionalDates = [
    { date: 'March 15, 2026', title: 'Mid-Semester Coursework Audit Deadline', type: 'Academic' },
    { date: 'March 22, 2026', title: 'Makerere Innovation Expo & Hackathon', type: 'Campus' },
    { date: 'April 10, 2026', title: 'Easter Academic Recess Begins', type: 'Holiday' },
    { date: 'May 18, 2026', title: 'End of Semester University Examinations', type: 'Exam' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Timetable & Academic Calendar
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Weekly lecture schedules, studio labs, room reallocation notices, and institutional dates.
        </p>
      </div>

      {/* Day Filter Segmented Controls */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-slate-200/90 shadow-xs overflow-x-auto">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedDay === day
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Timetable Events */}
        <div className="lg:col-span-8 space-y-3">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className={`p-4 sm:p-5 rounded-xl border bg-white shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                ev.status === 'Room Changed'
                  ? 'border-amber-300 ring-1 ring-amber-300/50'
                  : 'border-slate-200/90 hover:border-blue-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">
                    {ev.courseCode}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{ev.courseTitle}</span>
                  <span className="text-[10px] uppercase font-semibold text-slate-400">
                    {ev.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {ev.day} · {ev.startTime} - {ev.endTime}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {ev.room} ({ev.building})
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {ev.lecturer}
                  </span>
                </div>

                {ev.status === 'Room Changed' && (
                  <div className="mt-2 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-amber-200">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Reallocated from Studio Lab 3A due to workstation hardware upgrade</span>
                  </div>
                )}
              </div>

              <div className="shrink-0">
                <span
                  className={`text-[11px] px-2.5 py-1 rounded font-semibold ${
                    ev.status === 'Room Changed'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {ev.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right 4 cols: Important Institutional Dates */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Institutional Calendar
            </h3>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3">
            {institutionalDates.map((item, i) => (
              <div key={i} className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg">
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">
                  {item.date}
                </span>
                <p className="text-xs font-semibold text-slate-800 mt-0.5">{item.title}</p>
                <span className="text-[10px] text-slate-400 font-medium">{item.type} Milestone</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
