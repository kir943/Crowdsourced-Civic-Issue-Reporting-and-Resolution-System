import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MoreVertical,
  CheckSquare,
  Square,
  Building2,
  Clock,
  AlertTriangle,
  User,
  SlidersHorizontal,
  ChevronDown,
  Edit3,
  Eye,
  ArrowUpDown,
  Download,
  Trash2,
} from 'lucide-react';
import { CivicIssue, MOCK_ISSUES } from '../constants/mockIssues';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { QuickActionDrawer } from './QuickActionDrawer';
import { clsx } from 'clsx';

interface AdminIssueManagementProps {
  onInspectIssue?: (issue: CivicIssue) => void;
}

export const AdminIssueManagement: React.FC<AdminIssueManagementProps> = ({ onInspectIssue }) => {
  const [issues, setIssues] = useState<CivicIssue[]>(MOCK_ISSUES);
  const [selectedIssueIds, setSelectedIssueIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  
  // Drawer State
  const [drawerIssue, setDrawerIssue] = useState<CivicIssue | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Filter Issues
  const filteredIssues = issues.filter((issue) => {
    if (selectedCategory !== 'All' && issue.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && issue.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        issue.title.toLowerCase().includes(q) ||
        issue.id.toLowerCase().includes(q) ||
        issue.location.toLowerCase().includes(q) ||
        issue.reporterName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Toggle Single Selection
  const toggleSelectRow = (id: string) => {
    setSelectedIssueIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle Select All
  const toggleSelectAll = () => {
    if (selectedIssueIds.length === filteredIssues.length) {
      setSelectedIssueIds([]);
    } else {
      setSelectedIssueIds(filteredIssues.map((i) => i.id));
    }
  };

  // Bulk Actions
  const handleBulkVerify = () => {
    setIssues((prev) =>
      prev.map((issue) =>
        selectedIssueIds.includes(issue.id)
          ? { ...issue, status: 'Verified' as const }
          : issue
      )
    );
    setSelectedIssueIds([]);
  };

  const handleBulkReject = () => {
    setIssues((prev) =>
      prev.map((issue) =>
        selectedIssueIds.includes(issue.id)
          ? { ...issue, status: 'Rejected' as const, rejectionReason: 'Bulk administrative rejection' }
          : issue
      )
    );
    setSelectedIssueIds([]);
  };

  // Handle Save from Quick Action Drawer
  const handleSaveDrawerChanges = (updated: CivicIssue) => {
    setIssues((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setIsDrawerOpen(false);
    setDrawerIssue(null);
  };

  return (
    <div className="space-y-5">
      {/* Quick Action Drawer Component */}
      {drawerIssue && (
        <QuickActionDrawer
          issue={drawerIssue}
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setDrawerIssue(null);
          }}
          onSave={handleSaveDrawerChanges}
        />
      )}

      {/* Header Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-outline-variant/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] bg-primary-container text-white font-bold px-2 py-0.5 rounded">
              ADMIN TRIAGE
            </span>
            <span className="text-xs text-on-surface-variant font-semibold">Ward 4 Incident Control</span>
          </div>
          <h1 className="font-headline-lg text-xl md:text-2xl font-bold text-primary tracking-tight mt-1">
            Admin Issue Management Registry
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant">
            Verify complaints, assign municipal department field squads, or issue rejection determinations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs shadow-2xs">
            <Download className="w-3.5 h-3.5" />
            <span>Export Registry CSV</span>
          </Button>
        </div>
      </div>

      {/* Bulk Action Contextual Toolbar (Shows when rows are selected) */}
      {selectedIssueIds.length > 0 && (
        <div className="p-3 bg-primary text-white rounded-xl flex items-center justify-between shadow-md animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <span className="font-label-md text-xs font-bold bg-white/20 px-2.5 py-1 rounded">
              {selectedIssueIds.length} Issues Selected
            </span>
            <span className="text-xs text-white/80 hidden sm:inline">
              Apply batch status determinations to selected tickets
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleBulkVerify}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-2xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Bulk Verify</span>
            </Button>
            <Button
              onClick={handleBulkReject}
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs gap-1.5 shadow-2xs"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Bulk Reject</span>
            </Button>
            <Button
              onClick={() => setSelectedIssueIds([])}
              variant="outline"
              size="sm"
              className="text-white border-white/30 hover:bg-white/10 text-xs"
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-surface-container-lowest border-outline-variant/80 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="search"
              placeholder="Filter by Ticket #, title, location, or citizen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
            />
          </div>

          {/* Category Filter Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 bg-surface-container-low border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:border-secondary outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Roads">Roads & Infrastructure</option>
              <option value="Water">Water & Sanitation</option>
              <option value="Electricity">Electricity & Power</option>
              <option value="Waste Management">Waste Management</option>
            </select>
          </div>

          {/* Status Filter Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 bg-surface-container-low border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:border-secondary outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </Card>

      {/* DESKTOP DATA TABLE (md:block) & MOBILE STACKED CARD LIST (block md:hidden) */}
      <Card className="p-0 overflow-hidden border-outline-variant/80 bg-surface-container-lowest shadow-xs">
        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low font-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
              <tr>
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredIssues.length > 0 &&
                      selectedIssueIds.length === filteredIssues.length
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-outline text-primary focus:ring-secondary cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Issue Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Reporting Citizen</th>
                <th className="py-3 px-4">Assigned Dept</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 font-body-sm">
              {filteredIssues.map((issue) => {
                const isSelected = selectedIssueIds.includes(issue.id);
                return (
                  <tr
                    key={issue.id}
                    className={clsx(
                      'hover:bg-surface-container-low/60 transition-colors',
                      isSelected && 'bg-blue-50/50'
                    )}
                  >
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(issue.id)}
                        className="rounded border-outline text-primary focus:ring-secondary cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-primary">
                      #{issue.id}
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p
                        onClick={() => onInspectIssue?.(issue)}
                        className="font-bold text-primary text-xs hover:underline cursor-pointer truncate"
                      >
                        {issue.title}
                      </p>
                      <p className="text-on-surface-variant text-[11px] truncate">
                        {issue.location}
                      </p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-on-surface">
                      {issue.category}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={clsx(
                          'px-2 py-0.5 rounded text-[10px] font-bold border',
                          issue.priority === 'CRITICAL'
                            ? 'bg-red-50 text-red-800 border-red-200'
                            : issue.priority === 'HIGH'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-blue-50 text-blue-800 border-blue-200'
                        )}
                      >
                        {issue.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge status={issue.status} />
                    </td>
                    <td className="py-3 px-4 font-medium text-on-surface">
                      {issue.reporterName}
                    </td>
                    <td className="py-3 px-4 font-medium text-on-surface-variant text-[11px]">
                      {issue.assignedDepartment || 'Unassigned'}
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <Button
                        onClick={() => {
                          setDrawerIssue(issue);
                          setIsDrawerOpen(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="h-7 px-2.5 text-[11px] gap-1 border-outline-variant text-secondary hover:bg-secondary/10"
                      >
                        <SlidersHorizontal className="w-3 h-3" /> Quick Action
                      </Button>
                      <Button
                        onClick={() => onInspectIssue?.(issue)}
                        size="sm"
                        className="h-7 px-2.5 text-[11px] gap-1 bg-primary text-white"
                      >
                        <Eye className="w-3 h-3" /> Detail
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE STACKED CARD LIST VIEW (block md:hidden) */}
        <div className="block md:hidden divide-y divide-outline-variant/50">
          {filteredIssues.map((issue) => {
            const isSelected = selectedIssueIds.includes(issue.id);
            return (
              <div
                key={issue.id}
                className={clsx(
                  'p-4 space-y-3 transition-colors',
                  isSelected ? 'bg-blue-50/70' : 'bg-surface-container-lowest'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectRow(issue.id)}
                      className="rounded border-outline text-primary focus:ring-secondary h-4 w-4 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-xs text-primary bg-surface-container-high px-2 py-0.5 rounded">
                      #{issue.id}
                    </span>
                    <Badge status={issue.status} />
                  </div>
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
                </div>

                <div className="space-y-1">
                  <h4
                    onClick={() => onInspectIssue?.(issue)}
                    className="font-title-md text-sm font-bold text-primary hover:underline cursor-pointer leading-snug"
                  >
                    {issue.title}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    {issue.location} • {issue.category}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-outline pt-2 border-t border-outline-variant/40">
                  <span>Reporter: {issue.reporterName}</span>
                  <span className="font-semibold text-primary">
                    Dept: {issue.assignedDepartment || 'Unassigned'}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    onClick={() => {
                      setDrawerIssue(issue);
                      setIsDrawerOpen(true);
                    }}
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs gap-1.5 text-secondary border-outline-variant"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Quick Action
                  </Button>
                  <Button
                    onClick={() => onInspectIssue?.(issue)}
                    size="sm"
                    className="h-8 px-3 text-xs gap-1.5 bg-primary text-white"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Detail
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
