import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Radio,
  Trophy,
  Bell,
  User,
  ShieldCheck,
  Building2,
  Users,
  AlertTriangle,
  BarChart3,
  ClipboardList,
  RefreshCw,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import { UserRole, NavItem } from '../types';
import { ROLE_NAV_ITEMS } from '../constants/navigation';
import { clsx } from 'clsx';

interface SidebarProps {
  role: UserRole;
  onItemClick?: () => void;
  className?: string;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Radio,
  Trophy,
  Bell,
  User,
  ShieldCheck,
  Building2,
  Users,
  AlertTriangle,
  BarChart3,
  ClipboardList,
  RefreshCw,
  CheckCircle2,
};

export const Sidebar: React.FC<SidebarProps> = ({ role, onItemClick, className }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = ROLE_NAV_ITEMS[role] || [];

  const handleNavigate = (item: NavItem) => {
    navigate(item.href);
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <aside
      className={clsx(
        'w-64 bg-surface-container-lowest border-r border-outline-variant/60 flex flex-col justify-between py-4 select-none',
        className
      )}
    >
      <div className="space-y-6 px-3">
        {/* Role Header Badge */}
        <div className="px-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant/60 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <div>
            <p className="font-label-sm text-[10px] uppercase font-bold text-outline tracking-wider">
              PORTAL CONSOLE
            </p>
            <p className="font-title-md text-xs font-bold text-primary capitalize">
              {role} Workspace
            </p>
          </div>
        </div>

        {/* Menu Items Group */}
        <div className="space-y-1">
          <p className="px-3 font-label-sm text-[10px] uppercase font-bold text-outline tracking-wider mb-2">
            Navigation Menu
          </p>
          {navItems.map((item) => {
            const Icon = ICON_MAP[item.iconName] || LayoutDashboard;
            const currentUrl = location.pathname + (location.hash || '');
            const isActive =
              currentUrl === item.href ||
              (location.pathname === item.href && !item.href.includes('#')) ||
              (!location.hash && item.href.endsWith('/dashboard'));

            return (
              <button
                key={item.title}
                onClick={() => handleNavigate(item)}
                className={clsx(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold font-label-md transition-all duration-150',
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={clsx('w-4 h-4', isActive ? 'text-on-primary' : 'text-on-surface-variant')} />
                  <span>{item.title}</span>
                </div>

                {item.badgeCount ? (
                  <span
                    className={clsx(
                      'px-1.5 py-0.5 rounded-full text-[10px] font-bold font-code-sm',
                      isActive
                        ? 'bg-on-primary text-primary'
                        : 'bg-secondary/15 text-secondary border border-secondary/30'
                    )}
                  >
                    {item.badgeText || item.badgeCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Municipal Security Trust Badge */}
      <div className="px-4 pt-4 border-t border-outline-variant/40">
        <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/60 text-center space-y-1">
          <p className="font-code-sm text-[10px] text-primary font-bold tracking-wider">
            256-BIT SSL ENCRYPTED
          </p>
          <p className="font-body-sm text-[11px] text-on-surface-variant">
            NIST-800 & CJIS Compliant
          </p>
        </div>
      </div>
    </aside>
  );
};
