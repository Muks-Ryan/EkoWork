import React, { useState, useMemo } from 'react';
import { initialStudentWorkItems, mockCourses, mockSubmissions } from '../../data/mockData';
import { StudentWorkItem, Submission, WorkCategory } from '../../types';
import { NoticeModal } from './components/NoticeModal';
import { ReplyModal } from './components/ReplyModal';
import { ReviewGradeModal } from './components/ReviewGradeModal';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export const StudentWorkManagement: React.FC = () => {
  const [workItems, setWorkItems] = useState<StudentWorkItem[]>(initialStudentWorkItems);
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);

  // Active folder tab matching reference UI: 'all' | 'daily' | 'public' | 'cancelled'
  const [activeTab, setActiveTab] = useState<WorkCategory>('all');

  // Filters
  const [searchName, setSearchName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Modal states
  const [activeNoticeItem, setActiveNoticeItem] = useState<StudentWorkItem | null>(null);
  const [activeReplyItem, setActiveReplyItem] = useState<StudentWorkItem | null>(null);
  const [activeReviewItem, setActiveReviewItem] = useState<StudentWorkItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter logic
  const filteredItems = useMemo(() => {
    return workItems.filter((item) => {
      // Category filter
      if (activeTab === 'daily' && item.category !== 'daily') return false;
      if (activeTab === 'public' && item.category !== 'public') return false;
      if (activeTab === 'cancelled' && item.category !== 'cancelled') return false;

      // Search Name filter
      if (searchName.trim() && !item.workName.toLowerCase().includes(searchName.toLowerCase())) {
        return false;
      }

      // Course Name filter
      if (selectedCourse !== 'all' && item.courseName !== selectedCourse) {
        return false;
      }

      return true;
    });
  }, [workItems, activeTab, searchName, selectedCourse]);

  // Paginated slice
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  // Handler for sending notice
  const handleSendNotice = (workId: string, title: string, message: string, recipientCount: number) => {
    setToastMessage(`Notice sent successfully to ${recipientCount} students.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handler for sending reply
  const handleSendReply = (workId: string, replyText: string) => {
    setToastMessage(`Response published to course discussion thread.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handler for saving grade
  const handleSaveGrade = (submissionId: string, score: number, grade: string, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? { ...sub, score, grade, feedback, status: 'graded' }
          : sub
      )
    );

    // Update finished count for this work item
    if (activeReviewItem) {
      setWorkItems((prev) =>
        prev.map((item) => {
          if (item.id === activeReviewItem.id) {
            const nextFinished = Math.min(item.total, item.finished + 1);
            return { ...item, finished: nextFinished };
          }
          return item;
        })
      );
    }

    setToastMessage(`Grade (${score}/100 - Grade ${grade}) saved and published.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ['Work Name', 'Course Name', 'Update Time', 'Finished', 'Total', 'Due Date'];
    const rows = filteredItems.map((item) => [
      `"${item.workName}"`,
      `"${item.courseName}"`,
      `"${item.updateTime}"`,
      item.finished,
      item.total,
      `"${item.dueDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EkoWork_Student_Work_${activeTab}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Student work report exported to CSV successfully.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cancel / Toggle work status
  const handleToggleCancel = (itemId: string) => {
    setWorkItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextCat: WorkCategory = item.category === 'cancelled' ? 'all' : 'cancelled';
          return { ...item, category: nextCat };
        }
        return item;
      })
    );
    setToastMessage('Work item status updated.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Header matching Reference UI */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Student Work Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Class students' homework correction and management.
        </p>
      </div>

      {/* Main Card Container with Reference UI Folder Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Folder-style Tab Bar matching reference image layout */}
        <div className="flex items-center gap-1 px-4 pt-3 border-b border-slate-200 bg-slate-50/50 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('all');
              setCurrentPage(1);
            }}
            className={`px-5 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-white text-blue-600 border-t-2 border-t-blue-600 border-x border-slate-200 shadow-xs -mb-px'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            All Homework
          </button>

          <button
            onClick={() => {
              setActiveTab('daily');
              setCurrentPage(1);
            }}
            className={`px-5 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'daily'
                ? 'bg-white text-blue-600 border-t-2 border-t-blue-600 border-x border-slate-200 shadow-xs -mb-px'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            Daily Practice
          </button>

          <button
            onClick={() => {
              setActiveTab('public');
              setCurrentPage(1);
            }}
            className={`px-5 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'public'
                ? 'bg-white text-blue-600 border-t-2 border-t-blue-600 border-x border-slate-200 shadow-xs -mb-px'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            Public Courses
          </button>

          <button
            onClick={() => {
              setActiveTab('cancelled');
              setCurrentPage(1);
            }}
            className={`px-5 py-2.5 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === 'cancelled'
                ? 'bg-white text-blue-600 border-t-2 border-t-blue-600 border-x border-slate-200 shadow-xs -mb-px'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/70'
            }`}
          >
            Cancel Work
          </button>
        </div>

        {/* Filter Strip matching reference UI: Work Name, Course Name, Search, Export */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 flex-1">
              {/* Work Name Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-slate-700 whitespace-nowrap">Work Name</span>
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Please enter here"
                  className="w-40 sm:w-48 text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              {/* Course Name Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-slate-700 whitespace-nowrap">Course Name</span>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-40 sm:w-48 text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="all">Please choose</option>
                  <option value="Design Training Camp">Design Training Camp</option>
                  <option value="Interactive Course">Interactive Course</option>
                </select>
              </div>

              {/* Search Action Button */}
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className="px-4 py-1.5 text-xs font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Search
              </button>
            </div>

            {/* Export Action Button in Reference UI Blue */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Table matching reference UI layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold">
                <th className="py-3 px-5 whitespace-nowrap">Work Name</th>
                <th className="py-3 px-5 whitespace-nowrap">Course Name</th>
                <th className="py-3 px-5 whitespace-nowrap">Update Time</th>
                <th className="py-3 px-5 text-center whitespace-nowrap">Finish/Undone</th>
                <th className="py-3 px-5 text-center whitespace-nowrap">Operate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium">No homework items found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your search or course filter.</p>
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => {
                  const undone = item.total - item.finished;
                  const ratioPercent = Math.round((item.finished / item.total) * 100);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Work Name */}
                      <td className="py-3.5 px-5 font-medium text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>{item.workName}</span>
                          {item.category === 'cancelled' && (
                            <span className="text-[10px] text-rose-600 font-normal">
                              (Cancelled)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Course Name */}
                      <td className="py-3.5 px-5 text-slate-600 whitespace-nowrap">
                        {item.courseName}
                      </td>

                      {/* Update Time */}
                      <td className="py-3.5 px-5 text-slate-500 font-mono tabular-nums whitespace-nowrap">
                        {item.updateTime}
                      </td>

                      {/* Finish / Undone ratio with visual representation */}
                      <td className="py-3.5 px-5 text-center whitespace-nowrap">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-mono tabular-nums font-semibold text-slate-800">
                            {item.finished} / {undone}
                          </span>
                          {/* Subtle progress indicator */}
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full bg-blue-600 transition-all duration-300"
                              style={{ width: `${ratioPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Operate Action Buttons: Notice, Reply, Cancel/Grade */}
                      <td className="py-3.5 px-5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveNoticeItem(item)}
                            className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-blue-600"
                          >
                            Notice
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveReplyItem(item)}
                            className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-blue-600"
                          >
                            Reply
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveReviewItem(item)}
                            className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-blue-600"
                            title="Open grading rubrics and review submissions"
                          >
                            Review / Grade
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleCancel(item.id)}
                            className={`px-2 py-1 text-xs font-medium rounded-md transition-colors border ${
                              item.category === 'cancelled'
                                ? 'text-emerald-700 bg-emerald-50 border-emerald-300 hover:bg-emerald-100'
                                : 'text-slate-500 hover:text-rose-600 hover:bg-rose-50 border-slate-200'
                            }`}
                            title={item.category === 'cancelled' ? 'Restore Work' : 'Cancel Work Item'}
                          >
                            {item.category === 'cancelled' ? 'Restore' : 'Cancel'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination matching Reference UI footer: < [1] 2 3 4 5 ... 17 > */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono">
            Showing <span className="font-semibold text-slate-800">{paginatedItems.length}</span> of{' '}
            <span className="font-semibold text-slate-800">{filteredItems.length}</span> items
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-7 h-7 text-xs font-semibold rounded-md transition-colors font-mono ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <span className="px-1 text-slate-400 text-xs font-mono">...</span>

            <button
              onClick={() => setCurrentPage(17)}
              className={`w-7 h-7 text-xs font-semibold rounded-md transition-colors font-mono ${
                currentPage === 17
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              17
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(17, p + 1))}
              disabled={currentPage === 17}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg disabled:opacity-40 disabled:pointer-events-none transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Modals */}
      <NoticeModal
        isOpen={Boolean(activeNoticeItem)}
        onClose={() => setActiveNoticeItem(null)}
        workItem={activeNoticeItem}
        onSendNotice={handleSendNotice}
      />

      <ReplyModal
        isOpen={Boolean(activeReplyItem)}
        onClose={() => setActiveReplyItem(null)}
        workItem={activeReplyItem}
        onSendReply={handleSendReply}
      />

      <ReviewGradeModal
        isOpen={Boolean(activeReviewItem)}
        onClose={() => setActiveReviewItem(null)}
        workItem={activeReviewItem}
        submissions={submissions}
        onSaveGrade={handleSaveGrade}
      />
    </div>
  );
};
