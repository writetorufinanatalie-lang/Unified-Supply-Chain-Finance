import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  GitGraph,
  Globe,
  Coins,
  Sliders,
  BellRing,
  FileCheck2,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  isFxModal?: boolean;
}

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, selectSupplier } = useAppStore();

  const navItems: NavItem[] = [
    { name: 'Command Center', path: '/', icon: LayoutDashboard },
    { name: 'Suppliers', path: '/suppliers', icon: Users, badge: '18' },
    { name: 'Supply Chain Graph', path: '/graph', icon: GitGraph },
    { name: 'Global Risk Map', path: '/map', icon: Globe },
    { name: 'Financing', path: '/financing', icon: Coins },
    { name: 'What-If Simulator', path: '/simulator', icon: Sliders },
    { name: 'Alerts', path: '/alerts', icon: BellRing, badge: '7' },
    { name: 'Settlement', path: '/settlement', icon: FileCheck2 },
    { name: 'FX Risk', path: '/suppliers?tab=fx', icon: ArrowLeftRight, isFxModal: true },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.isFxModal) {
      selectSupplier('SUP-014'); // Open hero supplier drawer directly to FX panel
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-30 flex flex-col bg-bg-surface border-r border-border-custom transition-all duration-300 select-none ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 flex items-center px-4 border-b border-border-custom justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 shadow-glow-accent">
            <ShieldAlert className="w-5 h-5" />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-text-primary">
                Chain<span className="text-accent">Shield</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-text-muted">
                FINANCIAL INTELLIGENCE
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => handleNavClick(item)}
              title={sidebarCollapsed ? item.name : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive && !item.isFxModal
                    ? 'bg-bg-surface-2 text-accent border-l-4 border-accent shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-2/60'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`
              }
            >
              <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
              {!sidebarCollapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-bg-surface-2 border border-border-custom text-text-secondary font-mono">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* AI Telemetry Quick Status Widget */}
      {!sidebarCollapsed && (
        <div className="p-3 mx-2 mb-2 rounded-lg bg-bg-surface-2/80 border border-border-custom text-xs">
          <div className="flex items-center gap-2 text-accent font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Ledger Monitor</span>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed">
            18 Nodes Active • Live Choke-point detection enabled
          </p>
        </div>
      )}

      {/* Collapse Toggle Footer */}
      <div className="h-12 border-t border-border-custom flex items-center px-3 justify-between">
        {!sidebarCollapsed && (
          <span className="text-xs text-text-muted font-mono">v2.4.0-fintech</span>
        )}
        <button
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-1.5 rounded-md hover:bg-bg-surface-2 text-text-secondary hover:text-text-primary transition-colors mx-auto"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
};
