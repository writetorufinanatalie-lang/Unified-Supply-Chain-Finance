import { create } from 'zustand';
import type { Supplier, AlertEvent, Settlement, RiskRegion, WhatIfSimulationResult } from '../types';
import { mockSuppliers, mockAlerts, mockSettlements, mockRiskRegions, runWhatIfSimulation } from '../services/mockData';

interface AppState {
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;

  // Sidebar
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // AI Copilot Drawer
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  toggleCopilot: () => void;
  copilotInitialQuery: string | null;
  openCopilotWithQuery: (query: string) => void;

  // Selected Supplier (for 600px drawer)
  selectedSupplierId: string | null;
  selectSupplier: (id: string | null) => void;

  // Global Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Data Collections
  suppliers: Supplier[];
  alerts: AlertEvent[];
  settlements: Settlement[];
  riskRegions: RiskRegion[];

  // What-If Simulation
  simulationResult: WhatIfSimulationResult | null;
  isSimulating: boolean;
  runSimulation: (type: 'Port Closure' | 'Supplier Failure' | 'Currency Shift', targetId: string, magnitude: number) => void;
  resetSimulation: () => void;
}

export const useAppStore = create<AppState>((set, get) => {
  // Initialize theme from localStorage or system
  const savedTheme = (typeof window !== 'undefined' && localStorage.getItem('chainshield_theme') as 'dark' | 'light') || 'dark';
  if (typeof document !== 'undefined') {
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }

  return {
    theme: savedTheme,
    toggleTheme: () => {
      const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('chainshield_theme', nextTheme);
        if (nextTheme === 'light') {
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
        }
      }
      set({ theme: nextTheme });
    },
    setTheme: (theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('chainshield_theme', theme);
        if (theme === 'light') {
          document.documentElement.classList.add('light');
        } else {
          document.documentElement.classList.remove('light');
        }
      }
      set({ theme });
    },

    sidebarCollapsed: false,
    toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

    copilotOpen: false,
    setCopilotOpen: (open) => set({ copilotOpen: open }),
    toggleCopilot: () => set((state) => ({ copilotOpen: !state.copilotOpen })),
    copilotInitialQuery: null,
    openCopilotWithQuery: (query) => set({ copilotOpen: true, copilotInitialQuery: query }),

    selectedSupplierId: null,
    selectSupplier: (id) => set({ selectedSupplierId: id }),

    searchQuery: '',
    setSearchQuery: (searchQuery) => set({ searchQuery }),

    suppliers: mockSuppliers,
    alerts: mockAlerts,
    settlements: mockSettlements,
    riskRegions: mockRiskRegions,

    simulationResult: null,
    isSimulating: false,
    runSimulation: (type, targetId, magnitude) => {
      set({ isSimulating: true });
      setTimeout(() => {
        const result = runWhatIfSimulation({ type, targetId, magnitude });
        set({ simulationResult: result, isSimulating: false });
      }, 600);
    },
    resetSimulation: () => set({ simulationResult: null, isSimulating: false })
  };
});
