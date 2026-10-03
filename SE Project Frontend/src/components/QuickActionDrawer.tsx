import React, { useState } from 'react';
import {
  X,
  Building2,
  AlertTriangle,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  Tag,
  FileText,
} from 'lucide-react';
import { CivicIssue } from '../constants/mockIssues';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { clsx } from 'clsx';

interface QuickActionDrawerProps {
  issue: CivicIssue;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedIssue: CivicIssue) => void;
}

export const QuickActionDrawer: React.FC<QuickActionDrawerProps> = ({
  issue,
  isOpen,
  onClose,
  onSave,
}) => {
  const [assignedDepartment, setAssignedDepartment] = useState<string>(
    issue.assignedDepartment || 'Public Works & Water Bureau'
  );
  const [status, setStatus] = useState<string>(issue.status);
  const [rejectionReason, setRejectionReason] = useState<string>(
    issue.rejectionReason || 'Out of Municipal Jurisdiction / Duplicate submission'
  );

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: CivicIssue = {
      ...issue,
      assignedDepartment,
      status: status as any,
      rejectionReason: status === 'Rejected' ? rejectionReason : undefined,
    };
    onSave(updated);
  };

  const departments = [
    'Public Works & Water Bureau',
    'Department of Transportation & Roads',
    'Electricity & Energy Grid',
    'Waste & Environmental Sanitation',
    'Code Enforcement & Zoning',
  ];

  const statuses = [
    'Pending',
    'Verified',
    'Assigned',
    'In Progress',
    'Inspection',
    'Resolved',
    'Escalated',
    'Rejected',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col justify-between border-l border-outline-variant animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-outline-variant/80 bg-surface-container-low flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary bg-primary-container text-white px-2 py-0.5 rounded">
                #{issue.id}
              </span>
              <Badge status={status as any} />
            </div>
            <h3 className="font-title-lg text-base font-bold text-primary tracking-tight">
              Admin Quick Action Control
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Form */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Issue Brief Summary Card */}
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/60 space-y-1">
            <h4 className="font-title-md text-xs font-bold text-primary line-clamp-1">
              {issue.title}
            </h4>
            <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-2">
              {issue.description}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-outline pt-1">
              <span>Location: {issue.location}</span>
            </div>
          </div>

          {/* Department Reassignment Dropdown */}
          <div className="space-y-2">
            <label className="block font-label-md text-xs font-bold text-primary flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-secondary" />
              Reassign Municipal Department
            </label>
            <select
              value={assignedDepartment}
              onChange={(e) => setAssignedDepartment(e.target.value)}
              className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none cursor-pointer"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status Override Selector */}
          <div className="space-y-2">
            <label className="block font-label-md text-xs font-bold text-primary flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-secondary" />
              Update Incident Status State
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none cursor-pointer"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Rejection Reason Textarea (Active when Status === 'Rejected') */}
          {status === 'Rejected' && (
            <div className="space-y-2 p-3.5 bg-red-50/70 border border-red-200 rounded-lg animate-in fade-in duration-150">
              <label className="block font-label-md text-xs font-bold text-red-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Rejection Determination Reason
              </label>
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Specify administrative or legal reason for case closure rejection..."
                className="w-full p-2.5 bg-white border border-red-300 rounded text-xs font-body-md text-on-surface placeholder:text-outline focus:border-red-600 outline-none resize-none"
              />
              <span className="font-body-sm text-[11px] text-red-800 block">
                Will render on the public case closure banner & ticket timeline.
              </span>
            </div>
          )}

          {/* Institutional Note */}
          <div className="p-3 bg-surface-container-low rounded border border-outline-variant/60 text-[11px] text-on-surface-variant space-y-1">
            <span className="font-bold text-primary flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-primary" /> Audit Trail Compliance
            </span>
            <p>
              Reassignments and status overrides are logged on the municipal transparency ledger under Administrator Badge #ADM-0924.
            </p>
          </div>
        </form>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-low flex items-center justify-end gap-2">
          <Button onClick={onClose} variant="outline" size="sm" className="text-xs">
            Cancel
          </Button>
          <Button
            onClick={handleFormSubmit}
            size="sm"
            className="bg-primary hover:bg-secondary text-white font-bold text-xs gap-1.5 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Quick Changes</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
