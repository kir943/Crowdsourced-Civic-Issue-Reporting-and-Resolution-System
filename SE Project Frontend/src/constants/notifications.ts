import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Your issue was Verified',
    message: 'Ticket #CV-8921 (Pothole on Elm Ave) was inspected and verified by Municipal Officer. Status changed to Verified.',
    timestamp: '3m ago',
    isRead: false,
    category: 'VERIFIED',
    ticketId: 'CV-8921',
  },
  {
    id: 'notif-2',
    title: 'New issue assigned to Road Dept.',
    message: 'Emergency water main leak at 5th & Pine routed to Public Works Team 2.',
    timestamp: '18m ago',
    isRead: false,
    category: 'ASSIGNED',
    ticketId: 'CV-8904',
  },
  {
    id: 'notif-3',
    title: 'Resolution Proof Submitted',
    message: 'Contractor uploaded completion photo for Traffic Light Signal #402. Verification requested.',
    timestamp: '45m ago',
    isRead: false,
    category: 'INSPECTION',
    ticketId: 'CV-8872',
  },
  {
    id: 'notif-4',
    title: 'Issue Resolved & Closed',
    message: 'Streetlight outage at Oak St #108 was marked resolved by Officer Vance.',
    timestamp: 'Yesterday',
    isRead: true,
    category: 'RESOLVED',
    ticketId: 'CV-8820',
  },
  {
    id: 'notif-5',
    title: 'High Priority Dispatch Warning',
    message: 'Storm drain blockage reported near City General Hospital entrance.',
    timestamp: '2 days ago',
    isRead: true,
    category: 'ALERT',
    ticketId: 'CV-8799',
  },
];
