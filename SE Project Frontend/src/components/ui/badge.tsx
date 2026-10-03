import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IssueStatus } from '../../types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'resolved' | 'assigned' | 'inProgress' | 'pending' | 'escalated' | 'inspection';
  status?: IssueStatus;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  status,
  dot = false,
  children,
  ...props
}) => {
  // If status is supplied, override variant automatically according to design spec
  let computedVariant = variant;
  if (status) {
    switch (status) {
      case 'Resolved':
        computedVariant = 'resolved';
        break;
      case 'Assigned':
      case 'In Progress':
        computedVariant = 'assigned';
        break;
      case 'Pending':
      case 'Verified':
        computedVariant = 'pending';
        break;
      case 'Escalated':
      case 'Rejected':
        computedVariant = 'escalated';
        break;
      case 'Inspection':
        computedVariant = 'inspection';
        break;
    }
  }

  const baseStyles = 'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold tracking-wide border transition-colors';

  const variants = {
    default: 'bg-surface-container-low text-on-surface-variant border-outline-variant',
    primary: 'bg-primary-container text-on-primary border-primary',
    secondary: 'bg-surface-container text-secondary border-outline-variant',
    outline: 'bg-transparent text-on-surface border-outline-variant',
    resolved: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    assigned: 'bg-blue-50 border-blue-200 text-blue-800',
    inProgress: 'bg-sky-50 border-sky-200 text-sky-800',
    pending: 'bg-amber-50 border-amber-200 text-amber-800',
    escalated: 'bg-red-50 border-red-200 text-red-800',
    inspection: 'bg-indigo-50 border-indigo-200 text-indigo-800',
  };

  const dotColors = {
    default: 'bg-outline',
    primary: 'bg-on-primary',
    secondary: 'bg-secondary',
    outline: 'bg-outline',
    resolved: 'bg-emerald-600',
    assigned: 'bg-blue-600',
    inProgress: 'bg-sky-600',
    pending: 'bg-amber-600',
    escalated: 'bg-red-600',
    inspection: 'bg-indigo-600',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[computedVariant], className))}
      {...props}
    >
      {(dot || status) && (
        <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[computedVariant])} />
      )}
      {children || status}
    </span>
  );
};
