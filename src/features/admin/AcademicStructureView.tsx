import React, { useState } from 'react';
import { mockCourses } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { BookOpen, CheckCircle2, Layers, Plus } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';

export const AcademicStructureView: React.FC = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [credits, setCredits] = useState(3);
  const [lecturer, setLecturer] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const handleCreateCourse = () => {
    if (!courseCode.trim() || !courseName.trim()) return;

    const newC: any = {
      id: `crs-${Date.now()}`,
      code: courseCode.toUpperCase(),
      name: courseName,
      faculty: 'School of Computing & Informatics',
      department: 'Software Engineering & HCI',
      credits,
      semester: 'Semester II',
      lecturerName: lecturer || 'Staff Faculty',
      lecturerId: 'usr-lec-custom',
      enrolledStudents: 0,
      description: 'Accredited university curriculum offering for undergraduate and graduate students.',
      schedule: 'TBD',
      room: 'TBD'
    };

    setCourses([...courses, newC]);
    setCourseCode('');
    setCourseName('');
    setLecturer('');
    setIsAddCourseOpen(false);
    setToast(`Course ${newC.code} added to institutional course catalogue.`);
    setTimeout(() => setToast(null), 3500);
  };

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
            Academic Structure & Course Catalogues
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Accredited course versions, prerequisites, credit weighting, and modular curriculum offerings.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddCourseOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Course Catalogue Item
        </Button>
      </div>

      {/* Courses Catalog Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-5">Code & Title</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-3 text-center">Credit Units</th>
                <th className="py-3 px-4">Primary Instructor</th>
                <th className="py-3 px-4 text-center">Enrolled</th>
                <th className="py-3 px-4">Schedule & Hall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((crs) => (
                <tr key={crs.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-5">
                    <span className="font-bold text-blue-700 font-mono">{crs.code}</span>
                    <p className="font-semibold text-slate-900 mt-0.5">{crs.name}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{crs.department}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">{crs.credits}</td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{crs.lecturerName}</td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums text-slate-600">
                    {crs.enrolledStudents} students
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px] font-mono">
                    {crs.schedule} ({crs.room})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Course Modal */}
      <Modal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        title="Add Course to Institutional Catalogue"
        maxWidth="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddCourseOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateCourse}>Register Course</Button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="e.g. CSC-401"
            />
            <Input
              label="Credit Units (CU)"
              type="number"
              value={credits}
              onChange={(e) => setCredits(parseInt(e.target.value) || 3)}
            />
          </div>
          <Input
            label="Course Title"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="e.g. Distributed Computing & Cloud Infrastructure"
          />
          <Input
            label="Lead Lecturer / Course Director"
            value={lecturer}
            onChange={(e) => setLecturer(e.target.value)}
            placeholder="e.g. Dr. Paul Tumwebaze"
          />
        </div>
      </Modal>
    </div>
  );
};
