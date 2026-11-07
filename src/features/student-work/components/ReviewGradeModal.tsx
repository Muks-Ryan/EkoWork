import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { StudentWorkItem, Submission } from '../../../types';
import {
  Award,
  CheckCircle2,
  Download,
  FileCheck,
  FileText,
  Save,
  UserCheck
} from 'lucide-react';

interface ReviewGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  workItem: StudentWorkItem | null;
  submissions: Submission[];
  onSaveGrade: (submissionId: string, score: number, grade: string, feedback: string) => void;
}

export const ReviewGradeModal: React.FC<ReviewGradeModalProps> = ({
  isOpen,
  onClose,
  workItem,
  submissions,
  onSaveGrade
}) => {
  if (!workItem) return null;

  // Filter submissions for this work item
  const itemSubmissions = submissions.filter((s) => s.workId === workItem.id);
  const [selectedSubId, setSelectedSubId] = useState<string>(
    itemSubmissions[0]?.id || ''
  );

  const currentSubmission = itemSubmissions.find((s) => s.id === selectedSubId) || itemSubmissions[0];

  // Rubric scores state
  const [rubricScores, setRubricScores] = useState<Record<string, number>>({
    '0': 35,
    '1': 38,
    '2': 28
  });

  const [feedback, setFeedback] = useState(
    currentSubmission?.feedback ||
      'Solid execution adhering to typographic hierarchy and clean spacing ratios. Consider testing keyboard tab ordering on multi-level select components.'
  );

  const handleScoreChange = (index: number, val: number, max: number) => {
    const clamped = Math.max(0, Math.min(val, max));
    setRubricScores((prev) => ({ ...prev, [index.toString()]: clamped }));
  };

  // Calculate total score
  const totalScore = Object.values(rubricScores).reduce((acc, curr) => acc + curr, 0);

  const computeGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const currentGrade = computeGrade(totalScore);

  const handleSave = () => {
    if (currentSubmission) {
      onSaveGrade(currentSubmission.id, totalScore, currentGrade, feedback);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Submission Assessment & Grading: ${workItem.workName}`}
      subtitle={`Course: ${workItem.courseName} · Max Marks: 100 · Weighting: ${workItem.weighting}%`}
      maxWidth="3xl"
      footer={
        <>
          <div className="mr-auto flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">Calculated Grade:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-blue-700 font-mono tabular-nums">
                {totalScore} / 100
              </span>
              <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 text-blue-800 rounded">
                Grade {currentGrade}
              </span>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save & Publish Mark
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left column: Student Submission Selector & File info */}
        <div className="md:col-span-5 space-y-4 border-r border-slate-200/80 pr-0 md:pr-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Student Submission ({itemSubmissions.length} Available)
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {itemSubmissions.length === 0 ? (
                <div className="text-xs text-slate-400 italic p-3 border border-dashed rounded-lg text-center">
                  No submissions uploaded yet
                </div>
              ) : (
                itemSubmissions.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setSelectedSubId(sub.id);
                      if (sub.feedback) setFeedback(sub.feedback);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-colors ${
                      sub.id === currentSubmission?.id
                        ? 'border-blue-600 bg-blue-50/70 font-medium text-blue-900 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <img
                        src={sub.studentAvatar}
                        alt=""
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="truncate">
                        <div className="text-xs truncate">{sub.studentName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{sub.studentMatric}</div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${
                        sub.status === 'graded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sub.status === 'late'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Current submission details */}
          {currentSubmission && (
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Submission Receipt</span>
                <span className="text-[10px] font-mono text-slate-400">
                  {currentSubmission.submissionReceiptId || 'RCP-VERIFIED'}
                </span>
              </div>
              <div className="text-slate-600">
                Submitted on: <span className="font-mono text-slate-800">{currentSubmission.submittedAt}</span>
              </div>

              {/* Downloadable / Inspectable File Card */}
              <div className="mt-2 p-2.5 bg-white border border-slate-200 rounded-md flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="truncate">
                    <p className="font-medium text-slate-900 truncate">{currentSubmission.fileName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{currentSubmission.fileSize}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Simulated downloading: ${currentSubmission.fileName}`)}
                  className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded transition-colors"
                  title="Download student file"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right column: Interactive Rubric Scoring & Written Feedback */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
              Grading Criteria & Rubric Breakdown
            </h4>

            <div className="space-y-3">
              {workItem.rubricItems.map((rubric, idx) => {
                const currentVal = rubricScores[idx.toString()] ?? Math.round(rubric.maxPoints * 0.85);
                return (
                  <div key={idx} className="p-3 bg-slate-50/80 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-slate-800">{rubric.criterion}</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">{rubric.description}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <input
                          type="number"
                          min={0}
                          max={rubric.maxPoints}
                          value={currentVal}
                          onChange={(e) =>
                            handleScoreChange(idx, parseInt(e.target.value) || 0, rubric.maxPoints)
                          }
                          className="w-14 text-center text-xs font-bold bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 font-mono tabular-nums"
                        />
                        <span className="text-xs text-slate-400 font-mono">/ {rubric.maxPoints}</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={rubric.maxPoints}
                      value={currentVal}
                      onChange={(e) =>
                        handleScoreChange(idx, parseInt(e.target.value) || 0, rubric.maxPoints)
                      }
                      className="w-full mt-2 accent-blue-600 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Written Feedback & Pedagogical Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Lecturer Feedback & Guidance
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              placeholder="Provide constructive feedback, strengths, and areas for improvement..."
              className="w-full text-sm bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors font-sans"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
