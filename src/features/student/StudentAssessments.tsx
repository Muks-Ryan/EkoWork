import React, { useState } from 'react';
import { initialStudentWorkItems, mockSubmissions } from '../../data/mockData';
import { StudentWorkItem, Submission } from '../../types';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileUp,
  HelpCircle,
  ShieldCheck,
  UploadCloud
} from 'lucide-react';

export const StudentAssessments: React.FC = () => {
  const [workItems, setWorkItems] = useState<StudentWorkItem[]>(initialStudentWorkItems);
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);

  // Active submission flow
  const [submittingWork, setSubmittingWork] = useState<StudentWorkItem | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [submissionComments, setSubmissionComments] = useState('');
  const [generatedReceipt, setGeneratedReceipt] = useState<Submission | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // View feedback modal
  const [feedbackSubmission, setFeedbackSubmission] = useState<Submission | null>(null);

  const handleSimulateSubmit = () => {
    if (!submittingWork) return;

    const receiptId = `RCP-2026-${submittingWork.courseCode}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      workId: submittingWork.id,
      studentId: 'usr-stu-1',
      studentName: 'Aine Sarah',
      studentMatric: '22/U/10492/PS',
      studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'submitted',
      maxScore: 100,
      fileName: uploadedFileName || `${submittingWork.workName.toLowerCase().replace(/\s+/g, '_')}_final_deliverable.pdf`,
      fileSize: '6.4 MB',
      submissionReceiptId: receiptId
    };

    setSubmissions([newSub, ...submissions]);
    setGeneratedReceipt(newSub);
    setSubmittingWork(null);
    setUploadedFileName('');
    setSubmissionComments('');
    setIsReceiptModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Assignments, Assessments & Submissions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Submit coursework deliverables, view grading rubrics, and generate official cryptographic receipts.
        </p>
      </div>

      {/* Coursework Items List */}
      <div className="grid grid-cols-1 gap-4">
        {workItems.map((item) => {
          // Check if student already submitted this
          const mySubmission = submissions.find(
            (s) => s.workId === item.id && s.studentId === 'usr-stu-1'
          );

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">
                    {item.courseCode}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.workName}</h3>
                  <span className="text-xs text-slate-400 font-mono">· Weighting: {item.weighting}%</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Due: {item.dueDate.replace('T', ' ').substring(0, 16)}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Updated: {item.updateTime}
                  </span>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                {mySubmission ? (
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      {mySubmission.status === 'graded' ? (
                        <div>
                          <span className="text-sm font-bold text-emerald-600 font-mono">
                            {mySubmission.score} / {mySubmission.maxScore} (Grade {mySubmission.grade})
                          </span>
                          <p className="text-[10px] text-emerald-700 font-medium">Assessment Graded</p>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xs font-semibold text-blue-600">Submitted</span>
                          <p className="text-[10px] text-slate-400 font-mono">Under Review</p>
                        </div>
                      )}
                    </div>

                    {mySubmission.feedback && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setFeedbackSubmission(mySubmission)}
                      >
                        View Feedback
                      </Button>
                    )}

                    <button
                      onClick={() => {
                        setGeneratedReceipt(mySubmission);
                        setIsReceiptModalOpen(true);
                      }}
                      className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                      title="View Official Submission Receipt"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSubmittingWork(item)}
                    leftIcon={<FileUp className="w-4 h-4" />}
                  >
                    Submit Work
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {submittingWork && (
        <Modal
          isOpen={Boolean(submittingWork)}
          onClose={() => setSubmittingWork(null)}
          title={`Submit Deliverable: ${submittingWork.workName}`}
          subtitle={`${submittingWork.courseName} (${submittingWork.courseCode}) · Maximum 100 Marks`}
          maxWidth="lg"
          footer={
            <>
              <Button variant="ghost" onClick={() => setSubmittingWork(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleSimulateSubmit} leftIcon={<UploadCloud className="w-4 h-4" />}>
                Confirm & Generate Receipt
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200/60 text-xs text-blue-900">
              <span className="font-semibold block mb-0.5">Assessment Submission Rules</span>
              {submittingWork.instructions}
            </div>

            {/* Rubrics Preview */}
            <div>
              <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                Evaluation Criteria (Grading Rubric)
              </span>
              <div className="space-y-1.5">
                {submittingWork.rubricItems.map((r, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs flex justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{r.criterion}</p>
                      <p className="text-[11px] text-slate-500">{r.description}</p>
                    </div>
                    <span className="font-mono text-slate-700 font-bold shrink-0 ml-2">{r.maxPoints} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* File Upload Simulator */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Upload Work Deliverable (.PDF, .ZIP, .FIG)
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center bg-slate-50/50 transition-colors cursor-pointer">
                <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-800">
                  {uploadedFileName || 'Click to select deliverable file'}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">Maximum file size 50 MB</p>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setUploadedFileName(e.target.files[0].name);
                    }
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>

            {/* Submission Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Comments to Lecturer (Optional)
              </label>
              <textarea
                value={submissionComments}
                onChange={(e) => setSubmissionComments(e.target.value)}
                rows={2}
                placeholder="Include any specific prototype links or execution notes..."
                className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Official Cryptographic Submission Receipt Modal */}
      {isReceiptModalOpen && generatedReceipt && (
        <Modal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          title="Official Academic Submission Receipt"
          subtitle="Verifiable institutional proof of coursework upload"
          maxWidth="md"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert('Receipt downloaded to PDF format.')}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Download Receipt PDF
              </Button>
              <Button variant="primary" size="sm" onClick={() => setIsReceiptModalOpen(false)}>
                Done
              </Button>
            </>
          }
        >
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 font-sans text-sm">EkoWork LMS Receipt</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                VERIFIED
              </span>
            </div>

            <div className="space-y-1.5 text-slate-700 text-[11px]">
              <div>Receipt ID: <strong className="text-blue-700">{generatedReceipt.submissionReceiptId}</strong></div>
              <div>Student: <strong>{generatedReceipt.studentName}</strong> ({generatedReceipt.studentMatric})</div>
              <div>Timestamp: <strong>{generatedReceipt.submittedAt} UTC</strong></div>
              <div>Deliverable: <strong>{generatedReceipt.fileName}</strong> ({generatedReceipt.fileSize})</div>
              <div>SHA-256 Hash: <span className="text-[10px] text-slate-500 break-all">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></div>
            </div>
          </div>
        </Modal>
      )}

      {/* Lecturer Feedback Modal */}
      {feedbackSubmission && (
        <Modal
          isOpen={Boolean(feedbackSubmission)}
          onClose={() => setFeedbackSubmission(null)}
          title="Lecturer Feedback & Assessment Result"
          subtitle={`Deliverable: ${feedbackSubmission.fileName}`}
          maxWidth="md"
          footer={
            <Button variant="primary" onClick={() => setFeedbackSubmission(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-medium">Final Assessed Mark</span>
                <p className="text-2xl font-bold text-emerald-900 font-mono mt-0.5">
                  {feedbackSubmission.score} / {feedbackSubmission.maxScore}
                </p>
              </div>
              <span className="text-lg font-bold px-3 py-1 bg-white border border-emerald-300 text-emerald-800 rounded-lg">
                Grade {feedbackSubmission.grade}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-1">Lecturer Notes:</h4>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed font-sans">
                {feedbackSubmission.feedback}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
