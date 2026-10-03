export type UserRole = 'citizen' | 'admin' | 'officer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  badge?: string;
  department?: string;
  district?: string;
}

export interface NavItem {
  title: string;
  href: string;
  iconName: string; // Lucide icon identifier
  badgeCount?: number;
  badgeText?: string;
}

export type NotificationCategory = 'VERIFIED' | 'ASSIGNED' | 'INSPECTION' | 'RESOLVED' | 'ALERT';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  category: NotificationCategory;
  ticketId?: string;
}

export type IssueStatus =
  | 'Pending'
  | 'Verified'
  | 'Assigned'
  | 'In Progress'
  | 'Inspection'
  | 'Resolved'
  | 'Escalated'
  | 'Rejected';
