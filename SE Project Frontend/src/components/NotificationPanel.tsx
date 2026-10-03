import React, { useState } from 'react';
import { CheckCheck, ChevronRight, Bell } from 'lucide-react';
import { NotificationItem, NotificationCategory } from '../types';
import { INITIAL_NOTIFICATIONS } from '../constants/notifications';
import { clsx } from 'clsx';

interface NotificationPanelProps {
  notifications?: NotificationItem[];
  onMarkAllAsRead?: () => void;
  onSelectNotification?: (item: NotificationItem) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications: initialPropsNotifications,
  onMarkAllAsRead: propsMarkAllAsRead,
  onSelectNotification,
}) => {
  const [items, setItems] = useState<NotificationItem[]>(initialPropsNotifications || INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'alerts'>('all');

  const unreadCount = items.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    if (propsMarkAllAsRead) {
      propsMarkAllAsRead();
    }
  };

  const handleItemClick = (item: NotificationItem) => {
    setItems((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
    if (onSelectNotification) {
      onSelectNotification(item);
    }
  };

  const filteredItems = items.filter((item) => {
    if (activeTab === 'unread') return !item.isRead;
    if (activeTab === 'alerts') return item.category === 'ALERT';
    return true;
  });

  const getCategoryBadgeClass = (category: NotificationCategory) => {
    switch (category) {
      case 'VERIFIED':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'ASSIGNED':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'INSPECTION':
        return 'bg-indigo-50 border-indigo-200 text-indigo-800';
      case 'RESOLVED':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'ALERT':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-slate-100 border-slate-200 text-slate-700';
    }
  };

  return (
    <div className="w-80 sm:w-96 bg-surface-container-lowest rounded-xl shadow-2xl border border-outline-variant overflow-hidden flex flex-col max-h-[85vh]">
      {/* Panel Header */}
      <div className="px-4 pt-4 pb-3 border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-title-lg text-title-lg font-bold text-primary tracking-tight">Notifications</h2>
            {unreadCount > 0 ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-secondary text-on-secondary shadow-xs">
                {unreadCount} Unread
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container-low text-on-surface-variant">
                All read
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="font-label-sm text-xs font-semibold text-secondary hover:text-primary transition-colors focus:outline-none flex items-center gap-1"
              type="button"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
          )}
        </div>

        {/* Filter Segmented Tabs */}
        <div className="mt-3 flex items-center gap-1.5 p-1 bg-surface-container-low rounded-lg border border-outline-variant/60">
          <button
            onClick={() => setActiveTab('all')}
            className={clsx(
              'flex-1 py-1 px-2.5 rounded-md text-xs font-semibold font-label-sm transition-all text-center',
              activeTab === 'all'
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
            )}
            type="button"
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={clsx(
              'flex-1 py-1 px-2.5 rounded-md text-xs font-semibold font-label-sm transition-all text-center flex items-center justify-center gap-1',
              activeTab === 'unread'
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
            )}
            type="button"
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={clsx(
              'flex-1 py-1 px-2.5 rounded-md text-xs font-semibold font-label-sm transition-all text-center',
              activeTab === 'alerts'
                ? 'bg-secondary text-on-secondary shadow-xs'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
            )}
            type="button"
          >
            Alerts
          </button>
        </div>
      </div>

      {/* Notification Items List */}
      <div className="overflow-y-auto divide-y divide-outline-variant/40 overscroll-contain max-h-[380px]">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">
            <Bell className="w-8 h-8 mx-auto text-outline/50 mb-2" />
            <p className="font-label-md text-sm">No notifications to show</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={clsx(
                'p-3.5 transition-colors relative cursor-pointer group flex items-start gap-3',
                item.isRead
                  ? 'bg-surface-container-lowest hover:bg-surface-container-low/50'
                  : 'bg-surface-container-low/70 hover:bg-surface-container-high'
              )}
            >
              {!item.isRead ? (
                <span
                  aria-label="Unread notification"
                  className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-secondary ring-4 ring-secondary/20"
                />
              ) : (
                <span className="w-2 flex-shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={clsx(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide border',
                      getCategoryBadgeClass(item.category)
                    )}
                  >
                    {item.category}
                  </span>
                  <span className="font-code-sm text-[11px] text-on-surface-variant font-medium">
                    {item.timestamp}
                  </span>
                </div>
                <h3
                  className={clsx(
                    'font-title-md text-xs tracking-tight leading-snug',
                    item.isRead ? 'font-medium text-on-surface' : 'font-bold text-primary'
                  )}
                >
                  {item.title}
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant/90 mt-0.5 leading-relaxed">
                  {item.message}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
            </article>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-surface-container-low border-t border-outline-variant text-center">
        <span className="font-code-sm text-[11px] text-on-surface-variant/80">
          CivicTrack Realtime Dispatch Feed • District 4
        </span>
      </div>
    </div>
  );
};
