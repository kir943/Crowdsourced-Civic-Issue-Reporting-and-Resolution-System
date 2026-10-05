import React, { useState } from 'react';
import {
  Users,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserX,
  UserCheck,
  AlertTriangle,
  Search,
  Download,
  Mail,
  MapPin,
  Calendar,
  Filter,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { clsx } from 'clsx';

export interface CitizenUser {
  id: string;
  name: string;
  email: string;
  ward: string;
  strikes: number;
  status: 'Active' | 'Warning' | 'Blocked';
  joinedDate: string;
  reportsSubmitted: number;
  avatar?: string;
}

export const MOCK_CITIZENS: CitizenUser[] = [
  {
    id: 'USR-891',
    name: 'Derek Vance',
    email: 'derek.vance@example.org',
    ward: 'Ward 4 - Central',
    strikes: 3,
    status: 'Blocked',
    joinedDate: 'Jan 2025',
    reportsSubmitted: 12,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'USR-104',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    ward: 'Ward 4 - Central',
    strikes: 0,
    status: 'Active',
    joinedDate: 'Mar 2024',
    reportsSubmitted: 24,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8f5WQe0alqhFWuEJeQF5i393AzAkiAXXMIp_QpirvibNntFh32INguS-hAjaSdUZWXANU_3qfLCm-lavK_mWBhGTz_fx5J5clkIrJcGZtw1GrE97L1Dw7MMbo2Fryetz4j0Tl0msuTdU1z3koIqHM5uzvTs7OM7TwWvqpf_xsQ8lfkpj0s5WLigjRqLERnxH4GiautlsRoNOXvZj9s6hdMKA1lrkeZp739-SRnXxi4BMZg7H13bHa',
  },
  {
    id: 'USR-209',
    name: 'Clara Oswald',
    email: 'clara.o@example.com',
    ward: 'Ward 4 - East',
    strikes: 1,
    status: 'Warning',
    joinedDate: 'Aug 2024',
    reportsSubmitted: 8,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'USR-312',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@example.com',
    ward: 'Ward 4 - Central',
    strikes: 0,
    status: 'Active',
    joinedDate: 'Nov 2024',
    reportsSubmitted: 15,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'USR-488',
    name: 'Anita Roy',
    email: 'anita.r@example.org',
    ward: 'Ward 4 - North',
    strikes: 2,
    status: 'Warning',
    joinedDate: 'Feb 2025',
    reportsSubmitted: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  },
];

export const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<CitizenUser[]>(MOCK_CITIZENS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleBlockUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const isBlocked = u.status === 'Blocked';
          return {
            ...u,
            status: isBlocked ? 'Active' : 'Blocked',
            strikes: isBlocked ? 0 : 3,
          };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-headline-lg text-xl md:text-2xl font-bold text-primary tracking-tight">
              Citizen & Contributor Management
            </h1>
            <span className="bg-primary-container text-white text-xs font-semibold px-2 py-0.5 rounded">
              Compliance Desk
            </span>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant mt-1">
            Monitor civic trust standing, review warning strikes, and enforce municipal code compliance.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs shadow-2xs">
            <Download className="w-3.5 h-3.5" />
            <span>Export Registry</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-surface-container-lowest border-outline-variant/80 space-y-1">
          <span className="font-label-sm text-xs text-outline uppercase font-semibold">
            Registered Citizens
          </span>
          <div className="font-display-lg text-2xl font-bold text-primary">1,842</div>
          <span className="text-xs text-emerald-700 font-semibold">+48 this week</span>
        </Card>

        <Card className="p-5 bg-surface-container-lowest border-outline-variant/80 space-y-1">
          <span className="font-label-sm text-xs text-outline uppercase font-semibold">
            Users on Warning
          </span>
          <div className="font-display-lg text-2xl font-bold text-amber-700">14</div>
          <span className="text-xs text-amber-800 font-semibold">1-2 Warning strikes</span>
        </Card>

        <Card className="p-5 bg-surface-container-lowest border-outline-variant/80 space-y-1">
          <span className="font-label-sm text-xs text-outline uppercase font-semibold">
            Blocked Accounts
          </span>
          <div className="font-display-lg text-2xl font-bold text-red-700">
            {users.filter((u) => u.status === 'Blocked').length}
          </div>
          <span className="text-xs text-red-800 font-semibold">3 Strikes / Spam abuse</span>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 bg-surface-container-lowest border-outline-variant/80 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="search"
            placeholder="Search citizens by name, email, or User ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none"
          />
        </div>
      </Card>

      {/* Citizens Table */}
      <Card className="p-0 overflow-hidden border-outline-variant/80 bg-surface-container-lowest shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low font-label-sm uppercase tracking-wider text-outline border-b border-outline-variant">
              <tr>
                <th className="py-3 px-4">User ID & Citizen Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Municipal Ward</th>
                <th className="py-3 px-4">Reports</th>
                <th className="py-3 px-4">Warning Strikes</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Compliance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 font-body-sm">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-outline-variant shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-primary text-xs">{user.name}</p>
                        <p className="font-code-sm text-[10px] text-outline font-bold">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-on-surface">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 font-medium text-on-surface-variant">
                    {user.ward}
                  </td>
                  <td className="py-3 px-4 font-code-sm font-bold text-primary">
                    {user.reportsSubmitted}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((strikeNum) => (
                        <span
                          key={strikeNum}
                          className={clsx(
                            'w-3 h-3 rounded-full border border-outline-variant text-[9px] flex items-center justify-center font-bold',
                            strikeNum <= user.strikes
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-surface-container-high text-outline'
                          )}
                        >
                          {strikeNum <= user.strikes ? '!' : ''}
                        </span>
                      ))}
                      <span className="font-code-sm text-[11px] font-bold text-outline ml-1.5">
                        {user.strikes}/3
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={clsx(
                        'px-2 py-0.5 rounded text-[10px] font-bold border',
                        user.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : user.status === 'Warning'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-red-50 text-red-800 border-red-200'
                      )}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      onClick={() => toggleBlockUser(user.id)}
                      variant={user.status === 'Blocked' ? 'primary' : 'destructive'}
                      size="sm"
                      className={clsx(
                        'h-7 px-2.5 text-[11px] gap-1 font-bold shadow-2xs',
                        user.status === 'Blocked' && 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      )}
                    >
                      {user.status === 'Blocked' ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5" /> Unblock Citizen
                        </>
                      ) : (
                        <>
                          <UserX className="w-3.5 h-3.5" /> Block User
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
