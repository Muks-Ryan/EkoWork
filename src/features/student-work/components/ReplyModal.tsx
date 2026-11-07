import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { StudentWorkItem } from '../../../types';
import { MessageSquare, Send } from 'lucide-react';

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  workItem: StudentWorkItem | null;
  onSendReply: (workId: string, replyText: string) => void;
}

export const ReplyModal: React.FC<ReplyModalProps> = ({
  isOpen,
  onClose,
  workItem,
  onSendReply
}) => {
  if (!workItem) return null;

  const [replyText, setReplyText] = useState('');
  const [quickTemplate, setQuickTemplate] = useState('');

  const quickTemplates = [
    'Submissions are currently undergoing rubric review. Grades will be posted shortly.',
    'Please review the formatting criteria in Lecture 02 notes before final file upload.',
    'Late submission window extended by 24 hours with standard 5% penalty.',
    'Office hours consultation available tomorrow at 14:00 in Design Studio Lab 3B.'
  ];

  const handleSelectTemplate = (tmpl: string) => {
    setQuickTemplate(tmpl);
    setReplyText(tmpl);
  };

  const handleSend = () => {
    if (!replyText.trim()) return;
    onSendReply(workItem.id, replyText);
    setReplyText('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Discussion & Feedback Dispatch"
      subtitle={`${workItem.workName} · ${workItem.courseName}`}
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={!replyText.trim()}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Send Reply
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Quick Templates */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Quick Feedback Templates
          </label>
          <div className="space-y-1.5">
            {quickTemplates.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectTemplate(tmpl)}
                className={`w-full text-left text-xs p-2 rounded-lg border transition-colors ${
                  quickTemplate === tmpl
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-medium'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tmpl}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Your Response / Message
          </label>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            rows={4}
            placeholder="Type your feedback message to the class..."
            className="w-full text-sm bg-white border border-slate-300 rounded-lg p-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
          />
        </div>
      </div>
    </Modal>
  );
};
