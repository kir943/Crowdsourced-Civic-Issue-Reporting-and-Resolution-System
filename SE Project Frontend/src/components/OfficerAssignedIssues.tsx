import React, { useState } from 'react';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Camera,
  Search,
  Filter,
  Eye,
  Building,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { CivicIssue, MOCK_ISSUES } from '../constants/mockIssues';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { clsx } from 'clsx';

interface OfficerAssignedIssuesProps {
  onInspectIssue?: (issue: CivicIssue) => void;
}

export const OfficerAssignedIssues: React.FC<OfficerAssignedIssuesProps> = ({ onInspectIssue }) => {
  // Filter mock issues for Officer's department (Public Works & Water Bureau)
  const [issues, setIssues] = useState<CivicIssue[]>(
    MOCK_ISSUES.filter(
      (i) =>
        i.category === 'Water' ||
        i.category === 'Roads' ||
        i.assignedDepartment?.includes('Public Works')
    )
  );

  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredIssues = issues.filter(
    (i) =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Compute stat counts
  const assignedCount = issues.filter((i) => i.status === 'Assigned' || i.status === 'Pending').length;
  const inProgressCount = issues.filter((i) => i.status === 'In Progress' || i.status === 'Escalated').length;
  const completedCount = issues.filter((i) => i.status === 'Resolved' || i.status === 'Inspection').length + 18;
  const overdueCount = issues.filter((i) => i.isOverdue).length;

  // Status Forward Transition Logic (Constrained to valid forward transitions: Assigned -> In Progress -> Resolved)
  const getValidForwardStatuses = (currentStatus: string): string[] => {
    if (currentStatus === 'Assigned' || currentStatus === 'Pending' || currentStatus === 'Verified') {
      return ['Assigned', 'In Progress'];
    }
    if (currentStatus === 'In Progress' || currentStatus === 'Escalated') {
      return ['In Progress', 'Resolved'];
    }
    if (currentStatus === 'Resolved' || currentStatus === 'Inspection') {
      return ['Resolved'];
    }
    return [currentStatus];
  };

  const handleStatusTransition = (issueId: string, newStatus: string) => {
    setIssues((prev) =>
      prev.map((i) => (i.id === issueId ? { ...i, status: newStatus as any } : i))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/80">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-mono text-[10px] bg-primary-container text-white font-bold px-2 py-0.5 rounded">
              OFFICER DISPATCH
            </span>
            <span className="text-xs text-on-surface-variant font-semibold">Public Works Squad #4</span>
          </div>
          <h1 className="font-headline-lg text-xl md:text-2xl font-bold text-primary tracking-tight mt-1">
            Department Officer Assigned Issues
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant">
            Work orders assigned to your squad. Transition status forward as repair teams isolate faults and submit proof.
          </p>
        </div>

        <div className="font-code-sm text-xs font-bold text-primary bg-surface-container-low p-2.5 rounded-lg border border-outline-variant">
          OFFICER: Marcus Vance (#PW-4821)
        </div>
      </div>

      {/* Compact Stat Strip Above Table */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-surface-container-lowest border-outline-variant/80 space-y-1">
          <span className="font-label-sm text-xs text-outline uppercase font-semibold">Assigned</span>
          <div className="font-display-lg text-2xl font-bold text-amber-700">{assignedCount}</div>
          <span className="text-xs text-amber-800 font-semibold">Awaiting on-site arrival</span>
        </Card>

        <Card className="p-4 bg-surface-container-lowest border-outline-variant/80 space-y-1">
          <span className="font-label-sm text-xs text-outline uppercase font-semibold">In Progress</span>
          <div className="font-display-lg text-2xl font-bold text-blue-700">{inProgressCount}</div>
          <span className="text-xs text-blue-800 font-semibold">Active crew isolation</span>
        </Card>

        <Card className="p-4 bg-surface-container-lowest border-outline-variant/80 space-y-1">
          <span className="font-label-sm text-xs text-outline uppercase font-semibold">Completed This Month</span>
          <div className="font-display-lg text-2xl font-bold text-emerald-700">{completedCount}</div>
          <span className="text-xs text-emerald-800 font-semibold">Verified proof uploaded</span>
        </Card>

        <Card className="p-4 bg-surface-container-lowest border-outline-variant/80 space-y-1">
          <span className="font-label-sm text-xs text-outline uppercase font-semibold">Overdue SLA</span>
          <div className="font-display-lg text-2xl font-bold text-red-700">{overdueCount}</div>
          <span className="text-xs text-red-800 font-semibold">SLA window breached</span>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-surface-container-lowest border-outline-variant/80 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="search"
            placeholder="Search work orders by Ticket #, title, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
          />
        </div>
      </Card>

      {/* Assigned Issues Table */}
      <Card className="p-0 overflow-hidden border-outline-variant/80 bg-surface-container-lowest shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low font-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Issue Title & Location</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Forward Status Transition</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 font-body-sm">
              {filteredIssues.map((issue) => {
                const validOptions = getValidForwardStatuses(issue.status);
                const isCompleted = issue.status === 'Resolved' || issue.status === 'Inspection';

                return (
                  <tr key={issue.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-primary">
                      #{issue.id}
                    </td>
                    <td className="py-3 px-4">
                      <p
                        onClick={() => onInspectIssue?.(issue)}
                        className="font-bold text-primary text-xs hover:underline cursor-pointer"
                      >
                        {issue.title}
                      </p>
                      <p className="text-on-surface-variant text-[11px]">
                        {issue.location} ({issue.ward})
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={clsx(
                          'px-2 py-0.5 rounded text-[10px] font-bold border',
                          issue.priority === 'CRITICAL'
                            ? 'bg-red-50 text-red-800 border-red-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        )}
                      >
                        {issue.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge status={issue.status} />
                    </td>
                    <td className="py-3 px-4">
                      {isCompleted ? (
                        <span className="font-label-sm text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                          ✓ Completed (Locked)
                        </span>
                      ) : (
                        <select
                          value={issue.status}
                          onChange={(e) => handleStatusTransition(issue.id, e.target.value)}
                          className="py-1.5 px-2.5 bg-surface-container-lowest border border-secondary rounded-lg text-xs font-bold text-secondary outline-none cursor-pointer focus:ring-2 focus:ring-secondary/20 shadow-2xs"
                        >
                          {validOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              Transition to: {opt}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        onClick={() => onInspectIssue?.(issue)}
                        size="sm"
                        className="h-7 px-2.5 text-[11px] gap-1 bg-primary text-white font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect / Upload Proof
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
