import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { CopilotPanel } from '../copilot/CopilotPanel';
import { SupplierDetailDrawer } from '../suppliers/SupplierDetailDrawer';
import { useAppStore } from '../../stores/useAppStore';

export const AppLayout: React.FC = () => {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col antialiased selection:bg-accent selection:text-bg-base">
      {/* Sidebar Rail */}
      <Sidebar />

      {/* Top Navigation Bar */}
      <TopBar />

      {/* Main Workspace Area */}
      <main
        className={`flex-1 pt-14 transition-all duration-300 ${
          sidebarCollapsed ? 'pl-16' : 'pl-60'
        }`}
      >
        <div className="max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <Outlet />
        </div>
      </main>

      {/* Global Overlays */}
      <CopilotPanel />
      <SupplierDetailDrawer />
    </div>
  );
};
