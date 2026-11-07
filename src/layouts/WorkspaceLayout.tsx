import React, { useState, useEffect } from 'react';
import { useAuth } from '../core/authentication/AuthContext';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';

// Lecturer views
import { StudentWorkManagement } from '../features/student-work/StudentWorkManagement';
import { CourseBuilder } from '../features/lecturer/CourseBuilder';
import { GradebookView } from '../features/lecturer/GradebookView';
import { ClassInsightsView } from '../features/lecturer/ClassInsightsView';

// Student views
import { StudentDashboard } from '../features/student/StudentDashboard';
import { LearningCentre } from '../features/student/LearningCentre';
import { StudentAssessments } from '../features/student/StudentAssessments';
import { AcademicRecords } from '../features/student/AcademicRecords';
import { StudentTimetable } from '../features/student/StudentTimetable';
import { StudentServices } from '../features/student/StudentServices';

// Admin views
import { InstitutionSetupView } from '../features/admin/InstitutionSetupView';
import { PeopleAndAccessView } from '../features/admin/PeopleAndAccessView';
import { AcademicStructureView } from '../features/admin/AcademicStructureView';
import { AssessmentGovernanceView } from '../features/admin/AssessmentGovernanceView';
import { ReportingAndAuditView } from '../features/admin/ReportingAndAuditView';

export const WorkspaceLayout: React.FC = () => {
  const { currentRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Set default active tab based on role
  const getDefaultTab = (role: string) => {
    if (role === 'lecturer') return 'student-work'; // Matches the reference UI!
    if (role === 'student') return 'student-dashboard';
    return 'institution-setup';
  };

  const [activeTab, setActiveTab] = useState<string>(getDefaultTab(currentRole));

  // Sync active tab when user switches role via topbar
  useEffect(() => {
    setActiveTab(getDefaultTab(currentRole));
  }, [currentRole]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Topbar: Fixed at top, with institution and role switchers */}
      <Topbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />

      <div className="flex-1 flex">
        {/* Left Sidebar: Fixed navy navigation matching UI screenshot */}
        <Sidebar
          currentTab={activeTab}
          onSelectTab={(tabId) => setActiveTab(tabId)}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {/* LECTURER WORKSPACE VIEWS */}
            {currentRole === 'lecturer' && (
              <>
                {activeTab === 'student-work' && <StudentWorkManagement />}
                {activeTab === 'course-builder' && <CourseBuilder />}
                {activeTab === 'gradebook' && <GradebookView />}
                {activeTab === 'class-insights' && <ClassInsightsView />}
                {activeTab === 'management' && <StudentWorkManagement />}
                {activeTab === 'class-schedule' && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h2 className="text-base font-bold text-slate-900 mb-2">Teaching Schedule</h2>
                    <StudentTimetable />
                  </div>
                )}
                {activeTab === 'dissemination' && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <h2 className="text-base font-bold text-slate-900 mb-2">Class Announcements & Dissemination</h2>
                    <p className="text-xs text-slate-500 mb-4">Send instant broadcasts to enrolled student cohorts.</p>
                    <StudentWorkManagement />
                  </div>
                )}
              </>
            )}

            {/* STUDENT WORKSPACE VIEWS */}
            {currentRole === 'student' && (
              <>
                {activeTab === 'student-dashboard' && (
                  <StudentDashboard onNavigateTab={(tabId) => setActiveTab(tabId)} />
                )}
                {activeTab === 'learning-centre' && <LearningCentre />}
                {activeTab === 'assignments-assessments' && <StudentAssessments />}
                {activeTab === 'academic-records' && <AcademicRecords />}
                {activeTab === 'student-timetable' && <StudentTimetable />}
                {activeTab === 'student-services' && <StudentServices />}
              </>
            )}

            {/* INSTITUTIONAL ADMIN WORKSPACE VIEWS */}
            {currentRole === 'admin' && (
              <>
                {activeTab === 'institution-setup' && <InstitutionSetupView />}
                {activeTab === 'people-access' && <PeopleAndAccessView />}
                {activeTab === 'academic-structure' && <AcademicStructureView />}
                {activeTab === 'assessment-governance' && <AssessmentGovernanceView />}
                {activeTab === 'reporting-audit' && <ReportingAndAuditView />}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
