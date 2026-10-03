import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Medal,
  Star,
  ShieldCheck,
  Search,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { MOCK_LEADERBOARD, LeaderboardEntry } from '../constants/mockLeaderboard';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { clsx } from 'clsx';

export const LeaderboardSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const remainingRankings = MOCK_LEADERBOARD.slice(3).filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.badgeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-5 md:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/40 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary mb-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Ward 4 Civic Engagement Program</span>
            </div>
            <h1 className="font-headline-lg text-xl md:text-2xl font-bold text-primary tracking-tight">
              Civic Guardian Leaderboard
            </h1>
            <p className="font-body-md text-xs text-on-surface-variant mt-1 max-w-3xl leading-relaxed">
              Recognizing active citizens who report infrastructure hazards, verify community repairs, and improve municipal safety in Ward 4.
            </p>
          </div>
        </div>

        {/* User Standing Strip */}
        <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold bg-primary text-on-primary px-2.5 py-1 rounded">
              Your Rank: #9
            </span>
            <div>
              <p className="font-label-md font-bold text-primary">Sarah Jenkins</p>
              <p className="font-body-sm text-[11px] text-on-surface-variant">Ward 4 Advisory Member • Badge #CT-9942</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-secondary flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              420 Civic Points
            </span>
            <span className="text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              9 Resolved Repairs
            </span>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rank 1: Gold */}
        <Card className="bg-gradient-to-b from-amber-500/10 to-surface-container-lowest border-2 border-amber-400 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg flex items-center gap-1">
            <Trophy className="w-3 h-3" /> #1 CHAMPION
          </div>

          <div className="flex items-center gap-3 pt-2">
            <img
              src={topThree[0].avatar}
              alt={topThree[0].name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400 shadow-xs"
            />
            <div>
              <h3 className="font-title-md text-base font-bold text-primary">{topThree[0].name}</h3>
              <p className="font-body-sm text-xs text-on-surface-variant">{topThree[0].ward}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs">
            <div>
              <p className="font-label-sm text-[10px] text-outline uppercase font-semibold">Civic Points</p>
              <p className="font-headline-md text-lg font-bold text-amber-700">{topThree[0].points} pts</p>
            </div>
            <div className="text-right">
              <p className="font-label-sm text-[10px] text-outline uppercase font-semibold">Resolved</p>
              <p className="font-headline-md text-lg font-bold text-emerald-700">{topThree[0].issuesResolved} fixes</p>
            </div>
          </div>
        </Card>

        {/* Rank 2: Silver */}
        <Card className="bg-gradient-to-b from-slate-200/30 to-surface-container-lowest border-2 border-slate-300 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-slate-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg flex items-center gap-1">
            <Medal className="w-3 h-3" /> #2 RUNNER-UP
          </div>

          <div className="flex items-center gap-3 pt-2">
            <img
              src={topThree[1].avatar}
              alt={topThree[1].name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-400 shadow-xs"
            />
            <div>
              <h3 className="font-title-md text-base font-bold text-primary">{topThree[1].name}</h3>
              <p className="font-body-sm text-xs text-on-surface-variant">{topThree[1].ward}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>
              <p className="font-label-sm text-[10px] text-outline uppercase font-semibold">Civic Points</p>
              <p className="font-headline-md text-lg font-bold text-slate-700">{topThree[1].points} pts</p>
            </div>
            <div className="text-right">
              <p className="font-label-sm text-[10px] text-outline uppercase font-semibold">Resolved</p>
              <p className="font-headline-md text-lg font-bold text-emerald-700">{topThree[1].issuesResolved} fixes</p>
            </div>
          </div>
        </Card>

        {/* Rank 3: Bronze */}
        <Card className="bg-gradient-to-b from-amber-900/10 to-surface-container-lowest border-2 border-amber-700/40 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-800 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg flex items-center gap-1">
            <Award className="w-3 h-3" /> #3 ADVOCATE
          </div>

          <div className="flex items-center gap-3 pt-2">
            <img
              src={topThree[2].avatar}
              alt={topThree[2].name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-700/50 shadow-xs"
            />
            <div>
              <h3 className="font-title-md text-base font-bold text-primary">{topThree[2].name}</h3>
              <p className="font-body-sm text-xs text-on-surface-variant">{topThree[2].ward}</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-800/20 flex items-center justify-between text-xs">
            <div>
              <p className="font-label-sm text-[10px] text-outline uppercase font-semibold">Civic Points</p>
              <p className="font-headline-md text-lg font-bold text-amber-800">{topThree[2].points} pts</p>
            </div>
            <div className="text-right">
              <p className="font-label-sm text-[10px] text-outline uppercase font-semibold">Resolved</p>
              <p className="font-headline-md text-lg font-bold text-emerald-700">{topThree[2].issuesResolved} fixes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Rankings Table */}
      <Card className="p-0 overflow-hidden border-outline-variant">
        <div className="p-4 bg-surface-container-lowest border-b border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-title-lg text-base font-bold text-primary tracking-tight">
              Community Rankings (4 – 10)
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Points are audited weekly based on verified municipal repair reports.
            </p>
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rankings..."
              className="w-full pl-8 pr-3 py-1 text-xs bg-surface-container-low border border-outline-variant rounded-md focus:outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low font-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Citizen</th>
                <th className="py-3 px-4">Ward / District</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4 text-center">Reported</th>
                <th className="py-3 px-4 text-center">Resolved</th>
                <th className="py-3 px-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 bg-surface-container-lowest font-body-sm">
              {remainingRankings.map((entry) => {
                const isCurrentUser = entry.name === 'Sarah Jenkins';
                return (
                  <tr
                    key={entry.id}
                    className={clsx(
                      'transition-colors',
                      isCurrentUser
                        ? 'bg-secondary/10 hover:bg-secondary/15 font-semibold'
                        : 'hover:bg-surface-container-low/60'
                    )}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-primary">#{entry.rank}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-outline-variant"
                        />
                        <div>
                          <p className="font-bold text-primary text-xs flex items-center gap-1.5">
                            <span>{entry.name}</span>
                            {isCurrentUser && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] bg-secondary text-on-secondary font-bold">
                                YOU
                              </span>
                            )}
                          </p>
                          <p className="text-outline font-mono text-[10px]">{entry.badgeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">{entry.ward}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="text-[10px]">
                        {entry.tier}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center font-mono">{entry.issuesReported}</td>
                    <td className="py-3 px-4 text-center font-mono text-emerald-700 font-bold">
                      {entry.issuesResolved}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-secondary text-sm">
                      {entry.points} pts
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
