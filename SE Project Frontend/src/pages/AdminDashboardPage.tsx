import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  Users,
  AlertTriangle,
  BarChart3,
  SlidersHorizontal,
  LayoutDashboard,
  FileCheck,
  CheckCircle,
  XCircle,
  Download,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { IssueDetail } from '../components/IssueDetail';
import { AdminIssueManagement } from '../components/AdminIssueManagement';
import { AdminAnalyticsReports } from '../components/AdminAnalyticsReports';
import { AdminUserManagement } from '../components/AdminUserManagement';
import { CivicIssue, MOCK_ISSUES } from '../constants/mockIssues';
import { clsx } from 'clsx';

export const AdminDashboardPage: React.FC = () => {
  const location = useLocation();
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);
  const [activeTab, setActiveTab] = useState<'management' | 'analytics' | 'users'>('management');

  useEffect(() => {
    if (location.hash === '#analytics' || location.hash === '#reports') {
      setActiveTab('analytics');
    } else if (location.hash === '#users' || location.hash === '#spam') {
      setActiveTab('users');
    } else {
      setActiveTab('management');
    }
  }, [location.hash]);

  if (selectedIssue) {
    return (
      <IssueDetail
        issue={selectedIssue}
        role="admin"
        onBack={() => setSelectedIssue(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/60 w-full sm:w-auto self-start overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('management');
            window.location.hash = 'management';
          }}
          type="button"
          className={clsx(
            'px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap',
            activeTab === 'management'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
          )}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Issue Verification & Triage</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('analytics');
            window.location.hash = 'analytics';
          }}
          type="button"
          className={clsx(
            'px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap',
            activeTab === 'analytics'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
          )}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Analytics & Reports</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('users');
            window.location.hash = 'users';
          }}
          type="button"
          className={clsx(
            'px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap',
            activeTab === 'users'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
          )}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Citizen Compliance & Users</span>
        </button>
      </div>

      {/* Render Active Sub-View */}
      {activeTab === 'management' && (
        <AdminIssueManagement onInspectIssue={(issue) => setSelectedIssue(issue)} />
      )}

      {activeTab === 'analytics' && <AdminAnalyticsReports />}

      {activeTab === 'users' && <AdminUserManagement />}
    </div>
  );
};

