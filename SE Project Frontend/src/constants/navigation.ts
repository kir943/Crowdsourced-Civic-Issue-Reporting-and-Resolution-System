import { NavItem, UserRole } from '../types';

export const ROLE_NAV_ITEMS: Record<UserRole, NavItem[]> = {
  citizen: [
    { title: 'Dashboard', href: '/citizen/dashboard', iconName: 'LayoutDashboard' },
    { title: 'Report an Issue', href: '/citizen/dashboard#report', iconName: 'PlusCircle' },
    { title: 'My Issues', href: '/citizen/dashboard#my-issues', iconName: 'FileText' },
    { title: 'Civic Stream', href: '/citizen/dashboard#stream', iconName: 'Radio' },
    { title: 'Leaderboard', href: '/citizen/dashboard#leaderboard', iconName: 'Trophy' },
    { title: 'Notifications', href: '/citizen/dashboard#notifications', iconName: 'Bell', badgeCount: 4 },
    { title: 'Profile', href: '/citizen/dashboard#profile', iconName: 'User' },
  ],
  admin: [
    { title: 'Dashboard', href: '/admin/dashboard', iconName: 'LayoutDashboard' },
    { title: 'Issue Verification', href: '/admin/dashboard#verify', iconName: 'ShieldCheck', badgeCount: 2, badgeText: '2 New' },
    { title: 'Department Assignment', href: '/admin/dashboard#assignment', iconName: 'Building2' },
    { title: 'User Management', href: '/admin/dashboard#users', iconName: 'Users' },
    { title: 'Spam / Warnings', href: '/admin/dashboard#spam', iconName: 'AlertTriangle' },
    { title: 'Analytics & Reports', href: '/admin/dashboard#analytics', iconName: 'BarChart3' },
    { title: 'Notifications', href: '/admin/dashboard#notifications', iconName: 'Bell', badgeCount: 7 },
  ],
  officer: [
    { title: 'Dashboard', href: '/officer/dashboard', iconName: 'LayoutDashboard' },
    { title: 'Assigned Issues', href: '/officer/dashboard#assigned', iconName: 'ClipboardList', badgeCount: 5 },
    { title: 'Status Updates', href: '/officer/dashboard#status-updates', iconName: 'RefreshCw' },
    { title: 'Resolution Proof', href: '/officer/dashboard#proof', iconName: 'CheckCircle2' },
    { title: 'Notifications', href: '/officer/dashboard#notifications', iconName: 'Bell', badgeCount: 5 },
  ],
};
