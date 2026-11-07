import React, { useState } from 'react';
import { UserRole } from '../../types';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import {
  CheckCircle2,
  Filter,
  Plus,
  Search,
  Shield,
  UserCheck,
  UserPlus,
  Users
} from 'lucide-react';

interface DirectoryMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  identifier: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Suspended';
}

export const PeopleAndAccessView: React.FC = () => {
  const [members, setMembers] = useState<DirectoryMember[]>([
    {
      id: 'mem-1',
      name: 'Heimaux Ronald',
      email: 'heimaux.ronald@mak.ac.ug',
      role: 'lecturer',
      identifier: 'STAFF-MAK-4491',
      department: 'Interactive Design & HCI',
      status: 'Active'
    },
    {
      id: 'mem-2',
      name: 'Aine Sarah',
      email: 'aine.sarah@students.mak.ac.ug',
      role: 'student',
      identifier: '22/U/10492/PS',
      department: 'Software Engineering',
      status: 'Active'
    },
    {
      id: 'mem-3',
      name: 'Dr. Kigozi Edward',
      email: 'kigozi.academic@mak.ac.ug',
      role: 'admin',
      identifier: 'ADMIN-SYS-001',
      department: 'Directorate of Academic Affairs',
      status: 'Active'
    },
    {
      id: 'mem-4',
      name: 'Dr. Tumwebaze Paul',
      email: 'tumwebaze.p@mak.ac.ug',
      role: 'lecturer',
      identifier: 'STAFF-MAK-3108',
      department: 'Computer Science',
      status: 'Active'
    },
    {
      id: 'mem-5',
      name: 'Prof. Nalubega Grace',
      email: 'nalubega.grace@mak.ac.ug',
      role: 'lecturer',
      identifier: 'STAFF-MAK-1022',
      department: 'Information Systems',
      status: 'Active'
    },
    {
      id: 'mem-6',
      name: 'Mugerwa Davis',
      email: 'davis.m@students.mak.ac.ug',
      role: 'student',
      identifier: '22/U/10495/PS',
      department: 'Software Engineering',
      status: 'Active'
    }
  ]);

  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('student');
  const [newDept, setNewDept] = useState('');
  const [newId, setNewId] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const filtered = members.filter((m) => {
    if (roleFilter !== 'all' && m.role !== roleFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.identifier.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateUser = () => {
    if (!newName.trim() || !newEmail.trim()) return;

    const newMember: DirectoryMember = {
      id: `mem-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      identifier: newId || `ID-${Math.floor(1000 + Math.random() * 9000)}`,
      department: newDept || 'Department of Computing',
      status: 'Active'
    };

    setMembers([newMember, ...members]);
    setNewName('');
    setNewEmail('');
    setNewDept('');
    setNewId('');
    setIsAddUserOpen(false);
    setToast(`New account provisioned for ${newMember.name}.`);
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
            People & Access Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage academic personas, institutional roles, credential provisioning, and departmental privileges.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddUserOpen(true)}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Provision New User
        </Button>
      </div>

      {/* Filter Strip */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, matric..."
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['all', 'student', 'lecturer', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                  roleFilter === r
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r === 'all' ? 'All Roles' : `${r}s`}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          {filtered.length} Registered Accounts
        </span>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-5">User & Identifier</th>
                <th className="py-3 px-4">Institutional Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Faculty / Department</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-5">
                    <div className="font-semibold text-slate-900">{m.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{m.identifier}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">{m.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        m.role === 'admin'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : m.role === 'lecturer'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{m.department}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        title="Provision University Account"
        subtitle="Registers user in institutional directory"
        maxWidth="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateUser}>Provision User</Button>
          </>
        }
      >
        <div className="space-y-3">
          <Input
            label="Full Legal Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Dr. Juliet Namubiru"
          />
          <Input
            label="Institutional Email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="e.g. j.namubiru@mak.ac.ug"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Assigned Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as UserRole)}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer / Faculty</option>
                <option value="admin">Administrator / Registrar</option>
              </select>
            </div>
            <Input
              label="Staff ID / Matric Number"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              placeholder="e.g. 23/U/19401/PS"
            />
          </div>
          <Input
            label="Department / School"
            value={newDept}
            onChange={(e) => setNewDept(e.target.value)}
            placeholder="e.g. Department of Computer Science"
          />
        </div>
      </Modal>
    </div>
  );
};
