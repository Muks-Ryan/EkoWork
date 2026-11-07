import React from 'react';
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';

export type StatusType = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  icon?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  icon = true,
  className = ''
}) => {
  const configs = {
    success: {
      text: 'text-emerald-700 font-medium',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
    },
    warning: {
      text: 'text-amber-700 font-medium',
      icon: <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
    },
    danger: {
      text: 'text-rose-700 font-medium',
      icon: <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
    },
    info: {
      text: 'text-blue-700 font-medium',
      icon: <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
    },
    neutral: {
      text: 'text-slate-600 font-medium',
      icon: <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
    }
  };

  const current = configs[status] || configs.neutral;

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs ${current.text} ${className}`}>
      {icon && current.icon}
      <span>{label}</span>
    </span>
  );
};
