import React, { useState } from 'react';
import { mockServiceTickets } from '../../data/mockData';
import { ServiceTicket } from '../../types';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import {
  CheckCircle2,
  Clock,
  FileCheck,
  FileText,
  HelpCircle,
  Plus,
  Send,
  Ticket
} from 'lucide-react';

export const StudentServices: React.FC = () => {
  const [tickets, setTickets] = useState<ServiceTicket[]>(mockServiceTickets);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [category, setCategory] = useState<ServiceTicket['category']>('Document');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const handleCreateTicket = () => {
    if (!title.trim()) return;

    const newTicket: ServiceTicket = {
      id: `tkt-${Date.now()}`,
      ticketNo: `TKT-2026-0${Math.floor(800 + Math.random() * 200)}`,
      studentId: 'usr-stu-1',
      category,
      title,
      submittedDate: new Date().toISOString().substring(0, 10),
      status: 'Submitted',
      priority: 'Medium',
      assignedTo: 'Academic Registrar Desk',
      notes: notes || 'Ticket initiated by student via EkoWork self-service desk.'
    };

    setTickets([newTicket, ...tickets]);
    setTitle('');
    setNotes('');
    setIsNewTicketOpen(false);
    setToast(`Service ticket ${newTicket.ticketNo} submitted successfully.`);
    setTimeout(() => setToast(null), 4000);
  };

  const faqs = [
    { q: 'How long does official transcript processing take?', a: 'Standard processing takes 2 to 3 business days once verified by the faculty dean.' },
    { q: 'What is the deadline for course add/drop requests?', a: 'Course registration changes close at the end of Week 3 of the active semester.' },
    { q: 'How can I appeal a coursework mark?', a: 'Submit an Academic Appeal ticket within 7 calendar days of mark publication.' }
  ];

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
            My Services & Academic Helpdesk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Submit document requests, grade remarks, registration appeals, and track approval workflows.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsNewTicketOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          New Service Request
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Active Tickets & Tracking */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Active Requests & Approval Tracking ({tickets.length})
          </h2>

          <div className="space-y-3">
            {tickets.map((tkt) => (
              <div
                key={tkt.id}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:border-blue-200 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">
                        {tkt.ticketNo}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{tkt.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Category: {tkt.category} · Assigned to: {tkt.assignedTo}</p>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      tkt.status === 'Approved' || tkt.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : tkt.status === 'Under Review'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {tkt.status}
                  </span>
                </div>

                <div className="p-3 bg-slate-50/70 rounded-lg text-xs text-slate-600 border border-slate-100">
                  <span className="font-semibold text-slate-700 block mb-0.5">Administrative Status Update:</span>
                  {tkt.notes}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>Filed on {tkt.submittedDate}</span>
                  <span>Priority: {tkt.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 cols: FAQs & Guidance */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Student Service FAQs
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-lg">
                <p className="text-xs font-semibold text-slate-800">{f.q}</p>
                <p className="text-[11px] text-slate-600 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      <Modal
        isOpen={isNewTicketOpen}
        onClose={() => setIsNewTicketOpen(false)}
        title="File Student Service Request"
        subtitle="Submitted to University Academic Registry"
        maxWidth="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsNewTicketOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateTicket} leftIcon={<Send className="w-4 h-4" />}>
              Submit Request
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Request Type</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            >
              <option value="Document">Official Document (Transcript / Recommendation)</option>
              <option value="Registration">Course Registration & Elective Substitution</option>
              <option value="Academic Appeal">Academic Appeal & Examination Remark</option>
              <option value="Financial">Tuition Clearance Statement</option>
            </select>
          </div>

          <Input
            label="Subject / Request Purpose"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Official transcript required for embassy visa application"
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Detailed Description</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="State any relevant course codes, reference dates, or specific recipients..."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
