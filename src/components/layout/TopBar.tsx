import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Sun,
  Moon,
  Sparkles,
  X,
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';

export const TopBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    sidebarCollapsed,
    theme,
    toggleTheme,
    copilotOpen,
    toggleCopilot,
    suppliers,
    selectSupplier,
    alerts,
  } = useAppStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Derive readable page title
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Command Center';
      case '/suppliers':
        return 'Supplier Risk Directory';
      case '/graph':
        return 'Multi-Tier Supply Chain Graph';
      case '/map':
        return 'Global Risk Intelligence Heatmap';
      case '/financing':
        return 'Dynamic Risk-Adjusted Financing';
      case '/simulator':
        return 'What-If Scenario Simulator';
      case '/alerts':
        return 'Early-Warning & Risk Impact Feed';
      case '/settlement':
        return 'Smart Contract Trade Settlement';
      default:
        return 'Financial Intelligence';
    }
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for Copilot, Escape to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCopilot();
      }
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCopilot]);

  // Filtered search results
  const filteredSuppliers = searchQuery.trim()
    ? suppliers.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredAlerts = searchQuery.trim()
    ? alerts.filter(
        (a) =>
          a.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.reason.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header
      className={`fixed top-0 right-0 z-20 h-14 bg-bg-surface/90 backdrop-blur-md border-b border-border-custom flex items-center justify-between px-6 transition-all duration-300 ${
        sidebarCollapsed ? 'left-16' : 'left-60'
      }`}
    >
      {/* Page Title & Breadcrumb Indicator */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-text-primary tracking-tight">
          {getPageTitle()}
        </h1>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-bg-surface-2 border border-border-custom text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          LIVE TELEMETRY
        </span>
      </div>

      {/* Center-Right Tools */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar with Autocomplete Dropdown */}
        <div className="relative">
          <div className="flex items-center w-48 sm:w-64 md:w-80 h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-sm focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/30 transition-all">
            <Search className="w-4 h-4 text-text-muted mr-2 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search suppliers, IDs, alerts... (/)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              className="bg-transparent text-text-primary placeholder:text-text-muted text-xs focus:outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchOpen(false);
                }}
                className="text-text-muted hover:text-text-primary p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Overlay */}
          {searchOpen && searchQuery.trim() && (
            <div className="absolute right-0 top-11 w-96 max-h-96 overflow-y-auto bg-bg-surface border border-border-custom rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-text-muted flex justify-between">
                <span>Search Results</span>
                <span>ESC to close</span>
              </div>

              {filteredSuppliers.length === 0 && filteredAlerts.length === 0 ? (
                <div className="p-4 text-center text-xs text-text-secondary">
                  No matching suppliers or events found.
                </div>
              ) : (
                <div className="space-y-2 mt-1">
                  {filteredSuppliers.length > 0 && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-text-muted px-2">
                        Suppliers ({filteredSuppliers.length})
                      </span>
                      {filteredSuppliers.slice(0, 5).map((s) => (
                        <div
                          key={s.id}
                          onClick={() => {
                            selectSupplier(s.id);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-bg-surface-2 cursor-pointer transition-colors group"
                        >
                          <div>
                            <div className="text-xs font-semibold text-text-primary group-hover:text-accent flex items-center gap-1.5">
                              <span>{s.name}</span>
                              <span className="text-[10px] text-text-muted font-mono">
                                ({s.id})
                              </span>
                            </div>
                            <div className="text-[11px] text-text-secondary">
                              Tier {s.tier} • {s.country} • {s.industry}
                            </div>
                          </div>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              s.riskLevel === 'High'
                                ? 'bg-risk-high-bg text-risk-high'
                                : s.riskLevel === 'Medium'
                                ? 'bg-risk-medium-bg text-risk-medium'
                                : 'bg-risk-low-bg text-risk-low'
                            }`}
                          >
                            {s.riskLevel} ({s.riskScore})
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredAlerts.length > 0 && (
                    <div className="pt-2 border-t border-border-custom">
                      <span className="text-[10px] uppercase font-bold text-text-muted px-2">
                        Risk Events ({filteredAlerts.length})
                      </span>
                      {filteredAlerts.slice(0, 3).map((a) => (
                        <div
                          key={a.id}
                          onClick={() => {
                            navigate('/alerts');
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="p-2 rounded-lg hover:bg-bg-surface-2 cursor-pointer transition-colors"
                        >
                          <div className="text-xs font-semibold text-text-primary flex items-center justify-between">
                            <span>{a.supplierName}</span>
                            <span className="text-[10px] text-text-muted font-mono">{a.id}</span>
                          </div>
                          <div className="text-[11px] text-text-secondary truncate mt-0.5">
                            {a.reason}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark/light theme"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="p-2 rounded-lg bg-bg-surface-2 border border-border-custom text-text-secondary hover:text-text-primary hover:border-text-secondary/40 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Persistent AI Copilot Launcher */}
        <button
          onClick={toggleCopilot}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-semibold text-xs transition-all shadow-sm ${
            copilotOpen
              ? 'bg-accent text-bg-base border-accent ring-2 ring-accent/30'
              : 'bg-bg-surface-2 border-accent/40 text-text-primary hover:border-accent hover:bg-accent/10'
          }`}
        >
          <Sparkles className="w-4 h-4 text-accent fill-accent/20 animate-pulse" />
          <span className="hidden sm:inline">AI Copilot</span>
          <span className="hidden md:inline-flex items-center text-[10px] font-mono px-1 rounded bg-bg-base/60 text-text-muted border border-border-custom">
            ⌘K
          </span>
        </button>
      </div>
    </header>
  );
};
