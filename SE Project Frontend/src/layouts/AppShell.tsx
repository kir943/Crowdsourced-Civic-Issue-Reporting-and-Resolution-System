import React, { useState } from 'react';
import { UserRole } from '../types';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Drawer } from '../components/ui/drawer';

interface AppShellProps {
  role: UserRole;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ role, children }) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans">
      {/* Fixed Top Header */}
      <Header
        role={role}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
      />

      {/* Main Layout Body */}
      <div className="flex-1 pt-16 flex">
        {/* Desktop Sidebar (visible lg+) */}
        <Sidebar
          role={role}
          className="hidden lg:flex fixed left-0 top-16 bottom-0 z-30"
        />

        {/* Mobile Off-Canvas Drawer (visible < lg) */}
        <Drawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          title="CivicTrack Portal"
          side="left"
        >
          <Sidebar
            role={role}
            onItemClick={() => setIsMobileDrawerOpen(false)}
            className="w-full border-r-0 border-t-0 border-b-0 py-0"
          />
        </Drawer>

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 w-full min-h-[calc(100vh-4rem)] p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
