import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Shield,
  ClipboardList,
  Clock,
  CheckCircle2,
  Upload,
  AlertTriangle,
  MapPin,
  Camera,
  Navigation,
  ArrowUpRight,
  ListFilter,
  LayoutDashboard,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { IssueDetail } from '../components/IssueDetail';
import { OfficerAssignedIssues } from '../components/OfficerAssignedIssues';
import { CivicIssue, MOCK_ISSUES } from '../constants/mockIssues';
import { clsx } from 'clsx';

export const OfficerDashboardPage: React.FC = () => {
  const location = useLocation();
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'assigned'>('overview');

  useEffect(() => {
    if (location.hash === '#assigned' || location.hash === '#issues') {
      setActiveTab('assigned');
    } else {
      setActiveTab('overview');
    }
  }, [location.hash]);

  if (selectedIssue) {
    return (
      <IssueDetail
        issue={selectedIssue}
        role="officer"
        onBack={() => setSelectedIssue(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* View Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/60 w-full sm:w-auto self-start overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('overview');
            window.location.hash = 'overview';
          }}
          type="button"
          className={clsx(
            'px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap',
            activeTab === 'overview'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
          )}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dispatch Overview</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('assigned');
            window.location.hash = 'assigned';
          }}
          type="button"
          className={clsx(
            'px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap',
            activeTab === 'assigned'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
          )}
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Assigned Work Orders Table</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-secondary text-white font-bold">
            5
          </span>
        </button>
      </div>

      {/* Render Active Sub-View */}
      {activeTab === 'assigned' ? (
        <OfficerAssignedIssues onInspectIssue={(issue) => setSelectedIssue(issue)} />
      ) : (
        <div className="space-y-6">
          {/* Officer Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-1">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-mono text-[10px] bg-primary-container text-on-primary px-2 py-0.5 rounded font-bold">
                  DISPATCH FIELD OFFICERS
                </span>
                <span>Public Works Department</span>
              </div>
              <h1 className="font-headline-lg text-xl md:text-2xl font-bold text-primary tracking-tight">
                Field Operations & Work Orders
              </h1>
              <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
                Manage assigned repair tickets, update status logs, and submit completion proof.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <Button size="sm" className="gap-1.5 text-xs shadow-sm">
                <Camera className="w-3.5 h-3.5" />
                <span>Upload Resolution Proof</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-surface-container-lowest">
              <p className="font-label-sm text-xs font-semibold text-on-surface-variant">Assigned Work Orders</p>
              <p className="font-headline-md text-2xl font-bold text-primary mt-2">5</p>
              <span className="font-code-sm text-[11px] text-secondary font-medium mt-1 block">2 pending action today</span>
            </Card>

            <Card className="bg-surface-container-lowest">
              <p className="font-label-sm text-xs font-semibold text-on-surface-variant">SLA Compliant Ratio</p>
              <p className="font-headline-md text-2xl font-bold text-emerald-700 mt-2">98%</p>
              <span className="font-code-sm text-[11px] text-emerald-800 font-medium mt-1 block">Avg response: 1.4h</span>
            </Card>

            <Card className="bg-surface-container-lowest">
              <p className="font-label-sm text-xs font-semibold text-on-surface-variant">In-Progress Repairs</p>
              <p className="font-headline-md text-2xl font-bold text-blue-700 mt-2">3</p>
              <span className="font-code-sm text-[11px] text-blue-800 font-medium mt-1 block">Crews on-site</span>
            </Card>

            <Card className="bg-surface-container-lowest">
              <p className="font-label-sm text-xs font-semibold text-on-surface-variant">Proof Under Review</p>
              <p className="font-headline-md text-2xl font-bold text-indigo-700 mt-2">1</p>
              <span className="font-code-sm text-[11px] text-indigo-800 font-medium mt-1 block">Awaiting admin sign-off</span>
            </Card>
          </div>

          {/* Assigned Work Orders List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-title-lg text-base font-bold text-primary flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" />
                <span>Active Dispatch Queue</span>
              </h2>
              <span className="font-code-sm text-xs text-outline font-semibold">
                OFFICER ID: #PW-4821
              </span>
            </div>

            {/* Work Order 1 */}
            <Card className="space-y-4 border-l-4 border-l-secondary">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/40 pb-3">
                <div className="flex items-center gap-2">
                  <Badge status="In Progress" />
                  <span className="font-mono text-xs font-bold text-primary">#CT-10482</span>
                  <span className="text-xs text-outline">• Priority: High</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>SLA Target: 3h 45m remaining</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-2">
                  <h3 className="font-title-md text-base font-bold text-primary">
                    Severe Water Main Rupture & Street Flooding
                  </h3>
                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                    Pressurized water surging through asphalt fault. Isolation valve #12-B targeted.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-outline font-medium pt-1">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>MG Road & 4th Ave Crossing, Ward 4</span>
                  </div>
                </div>

                <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant space-y-2 flex flex-col justify-between">
                  <div>
                    <p className="font-label-sm text-[11px] uppercase font-bold text-outline">Dispatch Action</p>
                    <p className="font-body-sm text-xs font-semibold text-primary mt-0.5">Status: Crew On-Site</p>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <Button onClick={() => setSelectedIssue(MOCK_ISSUES[0])} size="sm" className="w-full text-xs gap-1.5 bg-primary text-white">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Submit Proof Photo / Open Detail</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

