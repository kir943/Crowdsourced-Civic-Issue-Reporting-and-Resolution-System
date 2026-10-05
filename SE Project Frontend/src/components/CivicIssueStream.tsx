import React, { useState } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  ThumbsUp,
  MessageSquare,
  MapPin,
  Clock,
  Car,
  Droplets,
  Zap,
  Trash2,
  Layers,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { CivicIssue, MOCK_ISSUES } from '../constants/mockIssues';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { clsx } from 'clsx';

export interface CivicIssueStreamProps {
  onSelectIssue?: (issue: CivicIssue) => void;
}

export const CivicIssueStream: React.FC<CivicIssueStreamProps> = ({ onSelectIssue }) => {
  const [issues, setIssues] = useState<CivicIssue[]>(MOCK_ISSUES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortOption, setSortOption] = useState<'newest' | 'upvoted' | 'priority'>('upvoted');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState<boolean>(true);

  // Upvote Handler
  const handleUpvote = (issueId: string) => {
    setIssues((prev) =>
      prev.map((issue) => {
        if (issue.id === issueId) {
          const nextIsEndorsed = !issue.isEndorsed;
          return {
            ...issue,
            isEndorsed: nextIsEndorsed,
            upvotes: nextIsEndorsed ? issue.upvotes + 1 : issue.upvotes - 1,
          };
        }
        return issue;
      })
    );
  };

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSearchQuery('');
    setSortOption('upvoted');
  };

  // Category list definitions
  const categories = [
    { label: 'All Categories', value: 'All', icon: Layers },
    { label: 'Roads & Infrastructure', value: 'Roads', icon: Car },
    { label: 'Water & Sanitation', value: 'Water', icon: Droplets },
    { label: 'Electricity & Power', value: 'Electricity', icon: Zap },
    { label: 'Waste Management', value: 'Waste Management', icon: Trash2 },
  ];

  // Status list definitions
  const statuses = [
    { label: 'All Statuses', value: 'All', colorDot: 'bg-outline' },
    { label: 'Pending', value: 'Pending', colorDot: 'bg-amber-500' },
    { label: 'In Progress', value: 'In Progress', colorDot: 'bg-blue-600' },
    { label: 'Resolved', value: 'Resolved', colorDot: 'bg-emerald-600' },
    { label: 'Rejected', value: 'Rejected', colorDot: 'bg-red-600' },
  ];

  // Filter Logic
  const filteredIssues = issues
    .filter((issue) => {
      // Category filter
      if (selectedCategory !== 'All' && issue.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'All' && issue.status !== selectedStatus) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = issue.title.toLowerCase().includes(query);
        const matchesLocation = issue.location.toLowerCase().includes(query);
        const matchesId = issue.id.toLowerCase().includes(query);
        const matchesDesc = issue.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesId && !matchesDesc) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'upvoted') {
        return b.upvotes - a.upvotes;
      }
      if (sortOption === 'priority') {
        const priorityRank = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        return priorityRank[b.priority] - priorityRank[a.priority];
      }
      return 0; // Default order
    });

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedStatus !== 'All' ? 1 : 0) +
    (searchQuery !== '' ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Stream Control Bar */}
      <div className="bg-surface-container-lowest p-4 md:p-5 rounded-xl border border-outline-variant/60 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-secondary" />
            <h2 className="font-title-lg text-base font-bold text-primary tracking-tight">
              Civic Stream Filters
            </h2>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-secondary text-on-secondary shadow-xs">
                {activeFilterCount} Active Filter{activeFilterCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-error hover:underline flex items-center gap-1"
                type="button"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}

            <button
              onClick={() => setIsFiltersPanelOpen(!isFiltersPanelOpen)}
              className="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1 sm:hidden"
              type="button"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{isFiltersPanelOpen ? 'Hide Controls' : 'Show Controls'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Filter Panel */}
        {isFiltersPanelOpen && (
          <div className="space-y-4 pt-1">
            {/* Category Filter Pills */}
            <div className="space-y-1.5">
              <label className="block font-label-sm text-[11px] uppercase font-bold text-outline tracking-wider">
                Category Domain
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      type="button"
                      className={clsx(
                        'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all',
                        isSelected
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high border border-outline-variant/60'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Operational Status Filters */}
            <div className="space-y-1.5 pt-1">
              <label className="block font-label-sm text-[11px] uppercase font-bold text-outline tracking-wider">
                Operational Lifecycle Status
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {statuses.map((st) => {
                  const isSelected = selectedStatus === st.value;
                  const count =
                    st.value === 'All'
                      ? issues.length
                      : issues.filter((i) => i.status === st.value).length;

                  return (
                    <button
                      key={st.value}
                      onClick={() => setSelectedStatus(st.value)}
                      type="button"
                      className={clsx(
                        'px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all',
                        isSelected
                          ? 'bg-primary text-on-primary font-bold shadow-xs'
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low border border-outline-variant/60'
                      )}
                    >
                      <span className={clsx('w-2 h-2 rounded-full', isSelected ? 'bg-on-primary' : st.colorDot)} />
                      <span>{st.label}</span>
                      <span
                        className={clsx(
                          'px-1.5 py-0.2 rounded font-code-sm text-[10px]',
                          isSelected
                            ? 'bg-on-primary/20 text-on-primary'
                            : 'bg-surface-container-low text-on-surface-variant border border-outline-variant'
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Bar & Sort Dropdown Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-outline-variant/40 items-center">
              <div className="sm:col-span-8 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by street name, ticket ID, or issue description..."
                  className="w-full pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
                />
              </div>

              <div className="sm:col-span-4 flex items-center gap-2 justify-end">
                <span className="font-label-sm text-xs font-semibold text-outline whitespace-nowrap">Sort:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="w-full py-1.5 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs font-semibold text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none cursor-pointer"
                >
                  <option value="upvoted">Most Upvoted</option>
                  <option value="newest">Newest First</option>
                  <option value="priority">Highest Priority</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Issues List or Empty State */}
      {filteredIssues.length === 0 ? (
        /* Empty State Screen */
        <Card className="p-12 text-center bg-surface-container-lowest border border-outline-variant/60 shadow-xs space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-surface-container-low border border-outline-variant flex items-center justify-center text-outline">
            <Filter className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-title-lg text-lg font-bold text-primary">No issues match these filters</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              We couldn't find any civic reports matching your selected category, status, or search query. Try broadening your parameters.
            </p>
          </div>
          <Button onClick={handleResetFilters} variant="secondary" size="md" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </Button>
        </Card>
      ) : (
        /* Issue Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIssues.map((issue) => (
            <Card
              key={issue.id}
              className="p-0 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all border-outline-variant/60 group"
            >
              <div className="cursor-pointer" onClick={() => onSelectIssue?.(issue)}>
                {/* Thumbnail Image Header */}
                <div className="relative h-44 w-full bg-surface-container-high overflow-hidden border-b border-outline-variant/60">
                  <img
                    src={issue.thumbnail}
                    alt={issue.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-xs border border-outline-variant font-label-sm text-[11px] text-primary font-bold shadow-xs">
                      {issue.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={clsx(
                        'px-2 py-0.5 rounded text-[10px] font-bold font-code-sm border shadow-xs',
                        issue.priority === 'CRITICAL'
                          ? 'bg-red-50 text-red-800 border-red-200'
                          : issue.priority === 'HIGH'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      )}
                    >
                      {issue.priority}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge status={issue.status} />
                    <span className="font-code-sm text-xs font-bold text-outline">{issue.id}</span>
                  </div>

                  <h3 className="font-title-md text-sm font-bold text-primary tracking-tight leading-snug line-clamp-2">
                    {issue.title}
                  </h3>

                  <p className="font-body-sm text-xs text-on-surface-variant/90 leading-relaxed line-clamp-2">
                    {issue.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-outline font-medium pt-1">
                    <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                    <span className="truncate">{issue.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-3 bg-surface-container-low/50 border-t border-outline-variant/40 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => handleUpvote(issue.id)}
                  className={clsx(
                    'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all',
                    issue.isEndorsed
                      ? 'bg-secondary text-on-secondary shadow-xs'
                      : 'bg-surface-container-lowest text-secondary border border-secondary/30 hover:bg-secondary/10'
                  )}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{issue.upvotes} {issue.isEndorsed ? 'Endorsed' : 'Upvote'}</span>
                </button>

                <div className="flex items-center gap-3 text-on-surface-variant font-medium text-[11px]">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-outline" />
                    {issue.commentsCount}
                  </span>
                  <span>{issue.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
