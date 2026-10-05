import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FolderCheck,
  Calendar,
  Building2,
  Download,
  FileText,
  SlidersHorizontal,
  Sparkles,
  Shield,
  Layers,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { clsx } from 'clsx';

export const AdminAnalyticsReports: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('30days');
  const [selectedWard, setSelectedWard] = useState<string>('Ward 4');

  // Department Resolution Data for Bar Chart
  const departmentData = [
    { department: 'Public Works', count: 480, target: 250, color: '#0F3D6E' },
    { department: 'Bureau of Water', count: 340, target: 250, color: '#1D4ED8' },
    { department: 'Traffic & Signals', count: 290, target: 250, color: '#2563EB' },
    { department: 'Waste & Sanitation', count: 210, target: 250, color: '#15803D' },
    { department: 'Code Enforcement', count: 145, target: 250, color: '#D97706' },
  ];

  // Weekly Trend Data for Issues Over Time (Reported, In Progress, Resolved)
  const timelineData = [
    { week: 'W1 (May 1)', reported: 240, inProgress: 180, resolved: 160 },
    { week: 'W2 (May 8)', reported: 310, inProgress: 240, resolved: 220 },
    { week: 'W3 (May 15)', reported: 280, inProgress: 260, resolved: 290 },
    { week: 'W4 (May 22)', reported: 350, inProgress: 290, resolved: 330 },
    { week: 'W5 (May 29)', reported: 248, inProgress: 210, resolved: 265 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-outline-variant/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-xl md:text-2xl font-bold text-primary tracking-tight">
              Municipal Performance Analytics & Reports
            </h1>
            <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold px-2 py-0.5 rounded">
              Ward Oversight
            </span>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant mt-1">
            Operational throughput, SLA compliance metrics, and departmental resolution velocity across Ward 4.
          </p>
        </div>

        {/* Header Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start xl:self-auto">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="h-9 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs font-semibold text-on-surface outline-none cursor-pointer shadow-2xs"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days (May 2025)</option>
            <option value="quarter">Q2 2025 Executive Report</option>
          </select>

          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="h-9 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs font-semibold text-primary outline-none cursor-pointer shadow-2xs"
          >
            <option value="Ward 4">Ward 4 - Central & Metro</option>
            <option value="Ward 3">Ward 3 - East District</option>
            <option value="All Wards">All Municipal Wards</option>
          </select>

          <Button variant="outline" size="sm" className="gap-1.5 text-xs h-9 shadow-2xs">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Button>
          <Button size="sm" className="gap-1.5 text-xs h-9 bg-primary text-white shadow-xs">
            <FileText className="w-3.5 h-3.5" />
            <span>Export PDF Report</span>
          </Button>
        </div>
      </div>

      {/* Top Summary Stat Cards (Row of 4) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Total Issues Filed */}
        <Card className="p-5 bg-surface-container-lowest hover:border-outline transition-all space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-sm text-xs text-outline uppercase tracking-wider font-semibold">
                Total Issues Filed
              </span>
              <div className="font-display-lg text-2xl font-bold text-primary">1,428</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-secondary">
              <FolderCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between font-label-sm text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              +12% vs last month
            </span>
            <span className="text-on-surface-variant font-medium">98.2% verified</span>
          </div>
        </Card>

        {/* Card 2: Avg. Resolution Time */}
        <Card className="p-5 bg-surface-container-lowest hover:border-outline transition-all space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-sm text-xs text-outline uppercase tracking-wider font-semibold">
                Avg. Resolution Time
              </span>
              <div className="font-display-lg text-2xl font-bold text-primary">4.2 hrs</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between font-label-sm text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <TrendingDown className="w-3.5 h-3.5" />
              -1.8 hrs improvement
            </span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              Within 6h SLA
            </span>
          </div>
        </Card>

        {/* Card 3: Escalation & Breach Rate */}
        <Card className="p-5 bg-surface-container-lowest hover:border-outline transition-all space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-sm text-xs text-outline uppercase tracking-wider font-semibold">
                Escalation & Breach Rate
              </span>
              <div className="font-display-lg text-2xl font-bold text-primary">2.4%</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between font-label-sm text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <TrendingDown className="w-3.5 h-3.5" />
              -0.8% decrease
            </span>
            <span className="text-amber-800 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              34 escalations
            </span>
          </div>
        </Card>

        {/* Card 4: Citizen Satisfaction / Fix Rate */}
        <Card className="p-5 bg-surface-container-lowest hover:border-outline transition-all space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="font-label-sm text-xs text-outline uppercase tracking-wider font-semibold">
                Citizen Satisfaction
              </span>
              <div className="font-display-lg text-2xl font-bold text-primary">88.6%</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-secondary">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between font-label-sm text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              +4.1% increase
            </span>
            <span className="text-on-surface-variant font-medium">1,265 confirmed</span>
          </div>
        </Card>
      </section>

      {/* Main Data Visualizations Grid (2 Panels) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Panel 1: Issues Resolved per Department (Horizontal SVG Bar Chart) */}
        <Card className="lg:col-span-6 p-5 bg-surface-container-lowest border-outline-variant/80 rounded-xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/60">
            <div>
              <h2 className="font-title-lg text-base font-bold text-primary">
                Issues Resolved per Department
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Total completed field dispatches against SLA target
              </p>
            </div>
            <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
              Target SLA: 250
            </span>
          </div>

          {/* Structured Responsive SVG Bar Chart */}
          <div className="pt-2">
            <svg className="w-full h-60 overflow-visible" viewBox="0 0 540 220" fill="none">
              {/* Benchmark SLA Line at 250 (x = 310) */}
              <line x1="310" y1="10" x2="310" y2="200" stroke="#DC2626" strokeDasharray="4 3" strokeWidth="1.5" />
              <text x="310" y="8" fill="#DC2626" fontSize="9" fontWeight="700" textAnchor="middle">
                TARGET 250
              </text>

              {/* Department Horizontal Bars */}
              {departmentData.map((d, i) => {
                const yPos = 24 + i * 38;
                const barWidth = Math.min((d.count / 500) * 360, 380);

                return (
                  <g key={d.department} className="hover:opacity-90 transition-opacity">
                    <text x="115" y={yPos + 15} fill="#131b2e" fontSize="11" fontWeight="600" textAnchor="end">
                      {d.department}
                    </text>
                    <rect x="125" y={yPos} width={barWidth} height="22" rx="3" fill={d.color} />
                    <text x={135 + barWidth} y={yPos + 15} fill={d.color} fontSize="11" fontWeight="700" fontFamily="JetBrains Mono">
                      {d.count}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </Card>

        {/* Panel 2: Issues Over Time by Status (Line/Area Trend Chart) */}
        <Card className="lg:col-span-6 p-5 bg-surface-container-lowest border-outline-variant/80 rounded-xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/60">
            <div>
              <h2 className="font-title-lg text-base font-bold text-primary">
                Issues Over Time by Status
              </h2>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Weekly intake, dispatch, and completion trajectory (May 2025)
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1 text-primary">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Reported
              </span>
              <span className="flex items-center gap-1 text-secondary">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" /> In Progress
              </span>
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Resolved
              </span>
            </div>
          </div>

          {/* SVG Line / Trend Area Chart */}
          <div className="pt-2">
            <svg className="w-full h-60 overflow-visible" viewBox="0 0 540 220" fill="none">
              {/* Horizontal Grid lines */}
              <line x1="40" y1="40" x2="520" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="90" x2="520" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="520" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="190" x2="520" y2="190" stroke="#f1f5f9" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="30" y="44" fill="#94a3b8" fontSize="10" textAnchor="end">400</text>
              <text x="30" y="94" fill="#94a3b8" fontSize="10" textAnchor="end">300</text>
              <text x="30" y="144" fill="#94a3b8" fontSize="10" textAnchor="end">200</text>
              <text x="30" y="194" fill="#94a3b8" fontSize="10" textAnchor="end">100</text>

              {/* X Axis Labels */}
              {timelineData.map((d, idx) => {
                const xPos = 60 + idx * 110;
                return (
                  <text key={d.week} x={xPos} y="212" fill="#64748b" fontSize="10" fontWeight="600" textAnchor="middle">
                    {d.week}
                  </text>
                );
              })}

              {/* Trend Polyline: Reported (Navy) */}
              <polyline
                fill="none"
                stroke="#0F3D6E"
                strokeWidth="3"
                points="60,110 170,80 280,95 390,65 500,105"
              />

              {/* Trend Polyline: In Progress (Blue) */}
              <polyline
                fill="none"
                stroke="#1D4ED8"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                points="60,135 170,110 280,102 390,90 500,120"
              />

              {/* Trend Polyline: Resolved (Emerald Green) */}
              <polyline
                fill="none"
                stroke="#15803D"
                strokeWidth="3"
                points="60,145 170,120 280,90 390,75 500,98"
              />

              {/* Data Point Circles */}
              <circle cx="60" cy="110" r="4" fill="#0F3D6E" />
              <circle cx="170" cy="80" r="4" fill="#0F3D6E" />
              <circle cx="280" cy="95" r="4" fill="#0F3D6E" />
              <circle cx="390" cy="65" r="4" fill="#0F3D6E" />
              <circle cx="500" cy="105" r="4" fill="#0F3D6E" />

              <circle cx="500" cy="98" r="4" fill="#15803D" />
            </svg>
          </div>
        </Card>
      </section>
    </div>
  );
};
