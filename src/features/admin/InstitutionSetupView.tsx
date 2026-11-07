import React, { useState } from 'react';
import { useInstitution } from '../../core/institution-context/InstitutionContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import {
  Building2,
  CheckCircle2,
  MapPin,
  Plus,
  School,
  Settings2,
  Sparkles
} from 'lucide-react';

export const InstitutionSetupView: React.FC = () => {
  const { currentInstitution, updateInstitutionBranding } = useInstitution();

  const [tagline, setTagline] = useState(currentInstitution.tagline);
  const [academicYear, setAcademicYear] = useState(currentInstitution.academicYear);
  const [semester, setSemester] = useState(currentInstitution.semester);
  const [campuses, setCampuses] = useState<string[]>(currentInstitution.campuses);
  const [faculties, setFaculties] = useState<string[]>(currentInstitution.faculties);

  const [isAddCampusOpen, setIsAddCampusOpen] = useState(false);
  const [newCampus, setNewCampus] = useState('');

  const [isAddFacultyOpen, setIsAddFacultyOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState('');

  const [toast, setToast] = useState<string | null>(null);

  const handleSaveSettings = () => {
    updateInstitutionBranding(currentInstitution.id, {
      tagline,
      academicYear,
      semester,
      campuses,
      faculties
    });
    setToast('Institutional configuration and academic calendar updated.');
    setTimeout(() => setToast(null), 3500);
  };

  const handleAddCampus = () => {
    if (!newCampus.trim()) return;
    setCampuses([...campuses, newCampus]);
    setNewCampus('');
    setIsAddCampusOpen(false);
  };

  const handleAddFaculty = () => {
    if (!newFaculty.trim()) return;
    setFaculties([...faculties, newFaculty]);
    setNewFaculty('');
    setIsAddFacultyOpen(false);
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
            Institutional Setup & Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure {currentInstitution.name} multi-campus parameters, faculties, and session rules.
          </p>
        </div>

        <Button variant="primary" onClick={handleSaveSettings}>
          Save Configuration Changes
        </Button>
      </div>

      {/* Institution Identity Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          University Identity & Academic Calendar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Institution Name"
            value={currentInstitution.name}
            disabled
          />
          <Input
            label="Institutional Tagline / Motto"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
          <Input
            label="Official Code"
            value={currentInstitution.code}
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <Input
            label="Active Academic Session"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            placeholder="e.g. 2026/2027"
          />
          <Input
            label="Active Semester / Term"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            placeholder="e.g. Semester II"
          />
        </div>
      </div>

      {/* Campuses & Faculties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campuses */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recognized Campuses ({campuses.length})
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddCampusOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Campus
            </Button>
          </div>

          <div className="space-y-2">
            {campuses.map((camp, idx) => (
              <div key={idx} className="p-3 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 flex items-center justify-between">
                <span>{camp}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Faculties & Schools */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Faculties & Schools ({faculties.length})
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddFacultyOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Faculty
            </Button>
          </div>

          <div className="space-y-2">
            {faculties.map((fac, idx) => (
              <div key={idx} className="p-3 bg-slate-50/70 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 flex items-center justify-between">
                <span>{fac}</span>
                <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">Academic Unit</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Campus Modal */}
      <Modal
        isOpen={isAddCampusOpen}
        onClose={() => setIsAddCampusOpen(false)}
        title="Add Institutional Campus"
        maxWidth="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddCampusOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddCampus}>Add</Button>
          </>
        }
      >
        <Input
          label="Campus Name & Location"
          value={newCampus}
          onChange={(e) => setNewCampus(e.target.value)}
          placeholder="e.g. Entebbe Innovation Campus"
        />
      </Modal>

      {/* Add Faculty Modal */}
      <Modal
        isOpen={isAddFacultyOpen}
        onClose={() => setIsAddFacultyOpen(false)}
        title="Add Faculty or College"
        maxWidth="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddFacultyOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddFaculty}>Add</Button>
          </>
        }
      >
        <Input
          label="Faculty / School Title"
          value={newFaculty}
          onChange={(e) => setNewFaculty(e.target.value)}
          placeholder="e.g. School of Built Environment"
        />
      </Modal>
    </div>
  );
};
