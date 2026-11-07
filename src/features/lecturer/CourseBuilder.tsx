import React, { useState } from 'react';
import { mockCourses } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import {
  BookOpen,
  FileText,
  FolderPlus,
  Link,
  Plus,
  Trash2,
  Video,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface LessonItem {
  id: string;
  title: string;
  type: 'slides' | 'notes' | 'video' | 'link';
  fileOrUrl: string;
  duration?: string;
}

interface TopicModule {
  id: string;
  title: string;
  week: number;
  description: string;
  lessons: LessonItem[];
}

export const CourseBuilder: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(mockCourses[0].id);
  const currentCourse = mockCourses.find((c) => c.id === selectedCourseId) || mockCourses[0];

  const [modules, setModules] = useState<TopicModule[]>([
    {
      id: 'mod-1',
      title: 'Module 01: Typography, Tokens & Spatial Math',
      week: 1,
      description: 'Foundations of UI hierarchy, optical weight compensation, and zero-pill layout discipline.',
      lessons: [
        { id: 'les-1', title: 'Lecture Slide Deck: Design Token Architecture', type: 'slides', fileOrUrl: 'lecture01_tokens.pdf' },
        { id: 'les-2', title: 'Code Sandbox: Building Accessible Button Radii', type: 'notes', fileOrUrl: 'spatial_math_cheatsheet.pdf' },
        { id: 'les-3', title: 'Studio Walkthrough Video', type: 'video', fileOrUrl: 'https://video.ekowork.edu/hci/01', duration: '45 mins' }
      ]
    },
    {
      id: 'mod-2',
      title: 'Module 02: Responsive Tables, Tabular Numerals & High-Density Views',
      week: 2,
      description: 'Creating high-density data tables with aligned numeric values and mobile view transitions.',
      lessons: [
        { id: 'les-4', title: 'Guide: Decimal & Tabular Figure Formatting', type: 'notes', fileOrUrl: 'tabular_nums_guide.pdf' },
        { id: 'les-5', title: 'Case Study: Multi-Tenant Schema Performance', type: 'slides', fileOrUrl: 'database_isolation_slides.pdf' }
      ]
    }
  ]);

  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleDesc, setNewModuleDesc] = useState('');
  const [newModuleWeek, setNewModuleWeek] = useState(3);

  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [targetModuleId, setTargetModuleId] = useState<string | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonType, setNewLessonType] = useState<'slides' | 'notes' | 'video' | 'link'>('slides');
  const [newLessonFile, setNewLessonFile] = useState('');

  const [toast, setToast] = useState<string | null>(null);

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    const newMod: TopicModule = {
      id: `mod-${Date.now()}`,
      title: newModuleTitle,
      week: newModuleWeek,
      description: newModuleDesc,
      lessons: []
    };
    setModules([...modules, newMod]);
    setNewModuleTitle('');
    setNewModuleDesc('');
    setIsAddModuleOpen(false);
    setToast('New course topic module added.');
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddLesson = () => {
    if (!newLessonTitle.trim() || !targetModuleId) return;
    const newLes: LessonItem = {
      id: `les-${Date.now()}`,
      title: newLessonTitle,
      type: newLessonType,
      fileOrUrl: newLessonFile || 'material_resource.pdf'
    };
    setModules(modules.map(m => m.id === targetModuleId ? { ...m, lessons: [...m.lessons, newLes] } : m));
    setNewLessonTitle('');
    setNewLessonFile('');
    setIsAddLessonOpen(false);
    setToast('Lesson material uploaded to topic module.');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header & Course Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Course Builder & Syllabus Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Organize weekly topics, lessons, readings, and multimedia assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 font-medium text-slate-800 shadow-xs cursor-pointer focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            {mockCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}: {c.name}
              </option>
            ))}
          </select>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModuleOpen(true)}
            leftIcon={<FolderPlus className="w-4 h-4" />}
          >
            New Module
          </Button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((mod) => (
          <div key={mod.id} className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 bg-slate-50/60 border-b border-slate-100 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">
                    WEEK {mod.week}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">{mod.description}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTargetModuleId(mod.id);
                  setIsAddLessonOpen(true);
                }}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Lesson
              </Button>
            </div>

            {/* Lessons within module */}
            <div className="divide-y divide-slate-100 p-2 sm:p-4">
              {mod.lessons.map((les) => (
                <div key={les.id} className="p-3 flex items-center justify-between hover:bg-slate-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      {les.type === 'slides' && <BookOpen className="w-4 h-4" />}
                      {les.type === 'notes' && <FileText className="w-4 h-4" />}
                      {les.type === 'video' && <Video className="w-4 h-4" />}
                      {les.type === 'link' && <Link className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{les.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{les.fileOrUrl} {les.duration && `· ${les.duration}`}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    Published
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Module Modal */}
      <Modal
        isOpen={isAddModuleOpen}
        onClose={() => setIsAddModuleOpen(false)}
        title="Create New Topic Module"
        subtitle={`For ${currentCourse.name} (${currentCourse.code})`}
        maxWidth="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddModuleOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddModule}>Create Module</Button>
          </>
        }
      >
        <div className="space-y-3">
          <Input
            label="Module Title"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            placeholder="e.g. Module 03: Cognitive Walkthroughs & Form Usability"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Academic Week"
              type="number"
              value={newModuleWeek}
              onChange={(e) => setNewModuleWeek(parseInt(e.target.value) || 1)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Overview & Objectives</label>
            <textarea
              value={newModuleDesc}
              onChange={(e) => setNewModuleDesc(e.target.value)}
              rows={3}
              className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Outline what students will master in this module..."
            />
          </div>
        </div>
      </Modal>

      {/* Add Lesson Modal */}
      <Modal
        isOpen={isAddLessonOpen}
        onClose={() => setIsAddLessonOpen(false)}
        title="Add Lesson Material"
        maxWidth="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddLessonOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddLesson}>Upload Lesson</Button>
          </>
        }
      >
        <div className="space-y-3">
          <Input
            label="Material Title"
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            placeholder="e.g. Slide Deck: Information Architecture Principles"
          />
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Material Format</label>
            <select
              value={newLessonType}
              onChange={(e) => setNewLessonType(e.target.value as any)}
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            >
              <option value="slides">Lecture Slide Deck (PDF)</option>
              <option value="notes">Reading Notes / Handout</option>
              <option value="video">Recorded Video Lecture</option>
              <option value="link">External Academic Link / Sandbox</option>
            </select>
          </div>
          <Input
            label="File Name or URL"
            value={newLessonFile}
            onChange={(e) => setNewLessonFile(e.target.value)}
            placeholder="e.g. lecture_03_notes.pdf or https://..."
          />
        </div>
      </Modal>
    </div>
  );
};
