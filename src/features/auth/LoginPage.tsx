import React, { useState } from 'react';
import { useAuth } from '../../core/authentication/AuthContext';
import { useInstitution } from '../../core/institution-context/InstitutionContext';
import { UserRole } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Building2,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { currentInstitution, institutions, selectInstitution } = useInstitution();

  const [email, setEmail] = useState('heimaux.ronald@mak.ac.ug');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('lecturer');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickLogin = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'lecturer') setEmail('heimaux.ronald@mak.ac.ug');
    if (role === 'student') setEmail('aine.sarah@students.mak.ac.ug');
    if (role === 'admin') setEmail('kigozi.academic@mak.ac.ug');

    setIsLoading(true);
    setTimeout(() => {
      login(role);
      setIsLoading(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole, email);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top institution brand header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
            EK
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">EkoWork</span>
            <span className="text-[11px] block text-slate-500 font-medium">Multi-Institutional LMS</span>
          </div>
        </div>

        {/* Institution selector on login */}
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-400" />
          <select
            value={currentInstitution.id}
            onChange={(e) => selectInstitution(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer"
          >
            {institutions.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.name} ({inst.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md mx-auto my-auto bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-100 shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Sign In to {currentInstitution.shortName}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {currentInstitution.tagline} · {currentInstitution.location}
          </p>
        </div>

        {/* 1-Click Persona Quick-Fill */}
        <div className="mb-6 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              1-Click Demo Evaluation Personas
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('lecturer')}
              className={`p-2 rounded-lg border text-center transition-all ${
                selectedRole === 'lecturer'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="block text-xs font-bold">Lecturer</span>
              <span className={`text-[10px] block truncate ${selectedRole === 'lecturer' ? 'text-blue-100' : 'text-slate-400'}`}>
                Heimaux R.
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('student')}
              className={`p-2 rounded-lg border text-center transition-all ${
                selectedRole === 'student'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="block text-xs font-bold">Student</span>
              <span className={`text-[10px] block truncate ${selectedRole === 'student' ? 'text-blue-100' : 'text-slate-400'}`}>
                Aine Sarah
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className={`p-2 rounded-lg border text-center transition-all ${
                selectedRole === 'admin'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="block text-xs font-bold">Admin</span>
              <span className={`text-[10px] block truncate ${selectedRole === 'admin' ? 'text-blue-100' : 'text-slate-400'}`}>
                Dr. Kigozi
              </span>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Institutional Email or Username"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            required
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-600" />
              <span>Remember session</span>
            </label>
            <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Password reset link dispatched to your verified institutional email.'); }} className="text-blue-600 hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Sign In to {selectedRole.toUpperCase()} Portal
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Protected by Institutional Single Sign-On (SSO) & RBAC
          </p>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="w-full max-w-5xl mx-auto py-3 text-center text-xs text-slate-400">
        EkoWork LMS · {currentInstitution.name} Academic Portal · Privacy & Terms of Service
      </div>
    </div>
  );
};
