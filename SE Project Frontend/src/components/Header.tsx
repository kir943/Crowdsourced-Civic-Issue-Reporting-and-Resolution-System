import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Building2,
  Search,
  Bell,
  User as UserIcon,
  LogOut,
  Shield,
  CheckCircle,
} from 'lucide-react';
import { UserRole, User } from '../types';
import { Dropdown } from './ui/dropdown';
import { NotificationPanel } from './NotificationPanel';
import { Badge } from './ui/badge';

interface HeaderProps {
  role: UserRole;
  user?: User;
  onOpenMobileMenu?: () => void;
}

const DEFAULT_USERS: Record<UserRole, User> = {
  citizen: {
    id: 'usr-cit-1',
    name: 'Clara Oswald',
    email: 'clara.oswald@neighborhood.org',
    role: 'citizen',
    district: 'District 4 Resident',
  },
  admin: {
    id: 'usr-adm-1',
    name: 'Marcus Vance',
    email: 'admin.intake@civictrack.gov',
    role: 'admin',
    badge: 'ADMIN',
    department: 'City Administrator',
  },
  officer: {
    id: 'usr-off-1',
    name: 'Lt. Daniel Hayes',
    email: 'm.vance@citygov.org',
    role: 'officer',
    badge: 'PW-4821',
    department: 'Public Works Dispatch',
  },
};

export const Header: React.FC<HeaderProps> = ({
  role,
  user = DEFAULT_USERS[role],
  onOpenMobileMenu,
}) => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(role === 'admin' ? 7 : role === 'officer' ? 5 : 4);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleBadgeVariant = (r: UserRole) => {
    switch (r) {
      case 'admin':
        return 'bg-tertiary-container text-tertiary-fixed border-outline';
      case 'officer':
        return 'bg-surface-container-high text-primary border-outline-variant';
      case 'citizen':
        return 'bg-surface-container text-secondary border-outline-variant';
    }
  };

  const getRoleBadgeText = (r: UserRole) => {
    switch (r) {
      case 'admin':
        return 'ADMIN';
      case 'officer':
        return 'OFFICER';
      case 'citizen':
        return 'CITIZEN';
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 h-16 bg-surface-container-lowest border-b border-outline-variant px-4 md:px-6 flex items-center justify-between transition-colors duration-150">
      {/* Left section: Hamburger trigger + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Open navigation drawer"
          className="lg:hidden p-2 text-primary hover:bg-surface-container-high rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
          type="button"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => navigate(`/${role}/dashboard`)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-extrabold leading-none">
              CivicTrack
            </span>
            <span className="hidden sm:inline-block font-code-sm text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-outline-variant bg-surface-container-low text-on-surface-variant">
              {role === 'admin' ? 'OPS-CONSOLE' : role === 'officer' ? 'DISPATCH' : 'CITIZEN'}
            </span>
          </div>
        </div>
      </div>

      {/* Middle section: Global Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ticket #, keyword, or location..."
            className="w-full pl-9 pr-3 py-1.5 h-9 bg-surface-container-low border border-outline-variant rounded-lg font-body-sm text-xs text-on-surface placeholder:text-outline focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right section: Search icon (mobile), Notification Bell, User Dropdown */}
      <div className="flex items-center gap-2">
        {/* Notification Bell Dropdown */}
        <Dropdown
          isOpen={isNotifOpen}
          onOpenChange={setIsNotifOpen}
          align="right"
          trigger={
            <button
              aria-label={`Notifications (${unreadCount} unread)`}
              className="relative p-2 text-primary hover:bg-surface-container-high rounded-lg transition-colors flex items-center justify-center focus:outline-none"
              type="button"
            >
              <Bell className="w-5 h-5 text-primary" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold leading-none text-on-error bg-error rounded-full ring-2 ring-surface-container-lowest">
                  {unreadCount}
                </span>
              )}
            </button>
          }
        >
          <NotificationPanel
            onMarkAllAsRead={() => setUnreadCount(0)}
          />
        </Dropdown>

        <div className="h-6 w-px bg-outline-variant mx-1 hidden sm:block" />

        {/* User Profile Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2 pl-1 cursor-pointer group">
              <div className="relative w-8 h-8 rounded-lg border border-outline-variant overflow-hidden bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs shadow-xs">
                {user.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-xs font-semibold text-on-surface leading-tight">
                    {user.name}
                  </span>
                  <span
                    className={`font-code-sm text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${getRoleBadgeVariant(
                      role
                    )}`}
                  >
                    {getRoleBadgeText(role)}
                  </span>
                </div>
                <span className="font-body-sm text-[10px] text-on-surface-variant leading-none mt-0.5">
                  {user.department || user.district || 'Municipal Portal'}
                </span>
              </div>
            </div>
          }
        >
          <div className="p-3 border-b border-outline-variant/60 bg-surface-container-low">
            <p className="font-label-md text-sm font-bold text-primary">{user.name}</p>
            <p className="font-body-sm text-xs text-on-surface-variant">{user.email}</p>
            <div className="mt-2 flex items-center gap-1.5">
              <Badge variant="secondary" className="text-[10px]">
                {user.role.toUpperCase()}
              </Badge>
              {user.badge && (
                <span className="font-code-sm text-[10px] text-outline font-semibold">
                  #{user.badge}
                </span>
              )}
            </div>
          </div>

          <div className="p-1 space-y-0.5">
            <div className="px-3 py-1 text-[10px] font-bold text-outline uppercase tracking-wider">
              Switch Portal View
            </div>
            <button
              onClick={() => navigate('/citizen/dashboard')}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-md flex items-center justify-between hover:bg-surface-container-high ${
                role === 'citizen' ? 'text-primary font-bold bg-surface-container' : 'text-on-surface'
              }`}
            >
              <span>Citizen Dashboard</span>
              {role === 'citizen' && <CheckCircle className="w-3.5 h-3.5 text-secondary" />}
            </button>
            <button
              onClick={() => navigate('/officer/dashboard')}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-md flex items-center justify-between hover:bg-surface-container-high ${
                role === 'officer' ? 'text-primary font-bold bg-surface-container' : 'text-on-surface'
              }`}
            >
              <span>Officer Dashboard</span>
              {role === 'officer' && <CheckCircle className="w-3.5 h-3.5 text-secondary" />}
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-md flex items-center justify-between hover:bg-surface-container-high ${
                role === 'admin' ? 'text-primary font-bold bg-surface-container' : 'text-on-surface'
              }`}
            >
              <span>Admin Operations</span>
              {role === 'admin' && <CheckCircle className="w-3.5 h-3.5 text-secondary" />}
            </button>
          </div>

          <div className="p-1 border-t border-outline-variant/60">
            <button
              onClick={() => navigate('/login')}
              className="w-full text-left px-3 py-1.5 text-xs font-medium text-error hover:bg-error-container/40 rounded-md flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};
