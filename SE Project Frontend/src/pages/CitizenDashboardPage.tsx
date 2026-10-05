import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  FolderCheck,
  Clock,
  CheckCircle2,
  Award,
  TrendingUp,
  Sparkles,
  Flame,
  LayoutDashboard,
  Radio,
  Trophy,
  FilePlus,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CivicIssueStream } from '../components/CivicIssueStream';
import { LeaderboardSection } from '../components/LeaderboardSection';
import { ReportIssueWizard } from '../components/ReportIssueWizard';
import { IssueDetail } from '../components/IssueDetail';
import { CivicIssue } from '../constants/mockIssues';
import { clsx } from 'clsx';

export const CitizenDashboardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'stream' | 'leaderboard' | 'report'>('overview');
  const [selectedIssue, setSelectedIssue] = useState<CivicIssue | null>(null);

  // Respond to hash changes or route parameters from AppShell sidebar navigation
  useEffect(() => {
    if (location.pathname === '/citizen/report' || location.hash === '#report' || location.hash === '#report-issue') {
      setActiveTab('report');
    } else if (location.hash === '#stream' || location.hash === '#civic-stream') {
      setActiveTab('stream');
    } else if (location.hash === '#leaderboard') {
      setActiveTab('leaderboard');
    } else if (location.hash === '#dashboard' || location.hash === '') {
      setActiveTab('overview');
    }
  }, [location.pathname, location.hash]);

  if (selectedIssue) {
    return (
      <IssueDetail
        issue={selectedIssue}
        role="citizen"
        onBack={() => setSelectedIssue(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/60 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-secondary mb-1">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Ward 4 Municipal Portal • Central District
          </div>
          <h1 className="font-headline-lg text-xl md:text-2xl font-bold text-primary tracking-tight">
            Citizen Operations & Community Hub
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant mt-0.5">
            Welcome back, Sarah. Track neighborhood repair dispatches and contribute to community safety.
          </p>
        </div>
        <Button
          onClick={() => {
            setActiveTab('report');
            window.location.hash = 'report';
          }}
          size="md"
          className="gap-2 shadow-sm self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Report New Issue</span>
        </Button>
      </div>

      {/* Sub-Navigation View Switcher Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/60 w-full sm:w-auto self-start overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('overview');
            window.location.hash = 'dashboard';
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
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('report');
            window.location.hash = 'report';
          }}
          type="button"
          className={clsx(
            'px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap',
            activeTab === 'report'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
          )}
        >
          <FilePlus className="w-3.5 h-3.5" />
          <span>Report an Issue</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('stream');
            window.location.hash = 'stream';
          }}
          type="button"
          className={clsx(
            'px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap',
            activeTab === 'stream'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
          )}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Civic Stream</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-secondary text-on-secondary font-bold">
            LIVE
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('leaderboard');
            window.location.hash = 'leaderboard';
          }}
          type="button"
          className={clsx(
            'px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap',
            activeTab === 'leaderboard'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
          )}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Leaderboard</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-500 text-white font-bold">
            #9
          </span>
        </button>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Row of 4 KPI Stat Cards */}
          <section aria-label="Key Performance Indicators" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Filed */}
            <Card className="bg-surface-container-lowest hover:border-outline transition-all">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Total Filed
                </span>
                <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <FolderCheck className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-2">
                <span className="font-display-lg text-2xl font-bold text-primary tracking-tight">24</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-secondary font-label-sm text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+3 this month</span>
              </div>
            </Card>

            {/* Card 2: Pending */}
            <Card className="bg-surface-container-lowest hover:border-outline transition-all">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Pending
                </span>
                <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-2">
                <span className="font-display-lg text-2xl font-bold text-primary tracking-tight">5</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-amber-800 font-label-sm text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <span>Awaiting inspection</span>
              </div>
            </Card>

            {/* Card 3: Resolved */}
            <Card className="bg-surface-container-lowest hover:border-outline transition-all">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Resolved
                </span>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-2">
                <span className="font-display-lg text-2xl font-bold text-primary tracking-tight">18</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-emerald-800 font-label-sm text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>75% resolution rate</span>
              </div>
            </Card>

            {/* Card 4: Civic Points Earned */}
            <Card className="bg-surface-container-lowest hover:border-outline transition-all">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Civic Points
                </span>
                <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-2">
                <span className="font-display-lg text-2xl font-bold text-primary tracking-tight">420</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-secondary font-label-sm text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>+60 pts from verified fixes</span>
              </div>
            </Card>
          </section>

          {/* Unified Civic Issue Stream Component */}
          <CivicIssueStream onSelectIssue={(issue) => setSelectedIssue(issue)} />
        </div>
      )}

      {/* Report Issue Dedicated View */}
      {activeTab === 'report' && <ReportIssueWizard />}

      {/* Civic Stream Dedicated View */}
      {activeTab === 'stream' && <CivicIssueStream onSelectIssue={(issue) => setSelectedIssue(issue)} />}

      {/* Leaderboard Dedicated View */}
      {activeTab === 'leaderboard' && <LeaderboardSection />}
    </div>
  );
};
