import React, { useState } from 'react';
import { mockCourses, mockLearningResources } from '../../data/mockData';
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Play,
  Search,
  Video
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const LearningCentre: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const filteredResources = mockLearningResources.filter((res) => {
    if (selectedCourseId !== 'all' && res.courseId !== selectedCourseId) return false;
    if (selectedType !== 'all' && res.type !== selectedType) return false;
    if (searchQuery.trim() && !res.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Learning Centre & Course Materials
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Access verified lecture slide decks, studio recordings, reading lists, and study notes.
        </p>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resource title..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Course filter */}
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 cursor-pointer focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="all">All Courses</option>
            {mockCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}: {c.name}
              </option>
            ))}
          </select>

          {/* Type filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['all', 'slides', 'video', 'notes', 'reading'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                  selectedType === t
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          {filteredResources.length} Resources available
        </span>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => {
          const course = mockCourses.find((c) => c.id === res.courseId);

          return (
            <div
              key={res.id}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">
                    {course?.code || 'CRS'} · WEEK {res.week}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    {res.type}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    {res.type === 'slides' && <BookOpen className="w-4 h-4" />}
                    {res.type === 'video' && <Video className="w-4 h-4" />}
                    {res.type === 'notes' && <FileText className="w-4 h-4" />}
                    {res.type === 'reading' && <ExternalLink className="w-4 h-4" />}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">{res.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-1">{res.topic}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">{res.sizeOrDuration}</span>

                {res.type === 'video' ? (
                  <button
                    onClick={() => alert(`Simulating playback for: ${res.title}`)}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch Recording</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Downloading verified material: ${res.title}`)}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
