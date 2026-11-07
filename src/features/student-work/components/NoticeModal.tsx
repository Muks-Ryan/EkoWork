import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { StudentWorkItem } from '../../../types';
import { Bell, Check, Send, Users } from 'lucide-react';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  workItem: StudentWorkItem | null;
  onSendNotice: (workId: string, title: string, message: string, recipientCount: number) => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  workItem,
  onSendNotice
}) => {
  if (!workItem) return null;

  const undoneCount = workItem.total - workItem.finished;
  const [recipientScope, setRecipientScope] = useState<'undone' | 'all'>('undone');
  const [title, setTitle] = useState(`Reminder: Submission Due for ${workItem.workName}`);
  const [message, setMessage] = useState(
    `Dear students,\n\nPlease remember that the submission for ${workItem.workName} (${workItem.courseName}) is approaching. Ensure your deliverables follow the grading rubrics and are uploaded before the scheduled cutoff.\n\nBest regards,\nCourse Coordinator`
  );
  const [isUrgent, setIsUrgent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const targetCount = recipientScope === 'undone' ? undoneCount : workItem.total;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onSendNotice(workItem.id, title, message, targetCount);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispatch Student Work Notice"
      subtitle={`Course: ${workItem.courseName} (${workItem.courseCode}) · Assignment: ${workItem.workName}`}
      maxWidth="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSending}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            isLoading={isSending}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Dispatch Notice ({targetCount} Recipients)
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Recipient Targeting Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Target Recipients
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRecipientScope('undone')}
              className={`p-3 rounded-lg border text-left transition-all ${
                recipientScope === 'undone'
                  ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-xs ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Pending Students Only</span>
                {recipientScope === 'undone' && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Target the <strong className="text-slate-800 font-mono">{undoneCount}</strong> students who have not yet submitted.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRecipientScope('all')}
              className={`p-3 rounded-lg border text-left transition-all ${
                recipientScope === 'all'
                  ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-xs ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Entire Enrolled Class</span>
                {recipientScope === 'all' && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Send to all <strong className="text-slate-800 font-mono">{workItem.total}</strong> enrolled students.
              </p>
            </button>
          </div>
        </div>

        {/* Notice Subject */}
        <Input
          label="Notice Subject"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Critical deadline notice..."
        />

        {/* Notice Body */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Notice Body / Instructions
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full text-sm bg-white border border-slate-300 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors font-sans"
          />
        </div>

        {/* Delivery Options */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-500" />
            <div>
              <span className="text-xs font-medium text-slate-800 block">Mark as High Priority</span>
              <span className="text-[11px] text-slate-500">Flags notice in student dashboards with push notification</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </Modal>
  );
};
