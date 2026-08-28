import React, { useState } from 'react';
import {
  Globe,
  ShieldAlert,
  ExternalLink,
  Sparkles,
  Anchor,
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { RiskBadge } from '../components/common/RiskBadge';
import { formatINR } from '../utils/formatters';
import type { RiskLevel } from '../types';

export const GlobalRiskMap: React.FC = () => {
  const { riskRegions, selectSupplier, openCopilotWithQuery } = useAppStore();

  const [selectedRegionId, setSelectedRegionId] = useState<string>('REG-EA'); // East Asia (China corridor) default
  const [riskTypeFilter, setRiskTypeFilter] = useState<'all' | 'geopolitical' | 'logistics' | 'weather' | 'ESG'>('all');

  const activeRegion = riskRegions.find((r) => r.id === selectedRegionId) || riskRegions[0];

  const getRegionFill = (level: RiskLevel, isSelected: boolean) => {
    if (isSelected) return 'var(--accent)';
    switch (level) {
      case 'High':
        return 'rgba(239, 68, 68, 0.45)';
      case 'Medium':
        return 'rgba(245, 158, 11, 0.45)';
      case 'Low':
      default:
        return 'rgba(34, 197, 94, 0.35)';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Risk Type Filter Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent" />
            <span>Global Risk Intelligence Heatmap</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Continuous geopolitical, port congestion, weather, and ESG corridor monitoring
          </p>
        </div>

        {/* Risk Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-bg-surface-2 rounded-lg border border-border-custom text-xs">
          {(['all', 'geopolitical', 'logistics', 'weather', 'ESG'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setRiskTypeFilter(type)}
              className={`px-2.5 py-1 font-semibold rounded-md uppercase tracking-wider text-[10px] transition-all ${
                riskTypeFilter === type
                  ? 'bg-accent text-bg-base shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Region Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[620px]">
        {/* Interactive SVG World Map Canvas (3 Cols) */}
        <div className="lg:col-span-3 fintech-card p-4 relative flex flex-col justify-between overflow-hidden bg-bg-surface rounded-xl border border-border-custom select-none">
          {/* Top Bar on Map */}
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              SATELLITE & AIS VESSEL TRACKING ACTIVE
            </span>
            <span className="text-xs font-semibold text-text-secondary">
              Click any regional cluster to inspect exposure
            </span>
          </div>

          {/* Interactive Vector World Map Visualization */}
          <div className="relative flex-1 flex items-center justify-center my-2">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full max-h-[460px] filter drop-shadow-md"
            >
              {/* Graticule Grid Lines */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                </pattern>
                <linearGradient id="routeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--risk-high)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <rect width="1000" height="500" fill="url(#grid)" />

              {/* Continents Base Vector Paths */}
              {/* North America */}
              <path
                d="M 120 100 Q 180 80 260 110 T 290 190 T 210 240 T 150 180 Z"
                fill="var(--bg-surface-2)"
                stroke="var(--border)"
                strokeWidth="1.5"
                opacity="0.7"
              />
              {/* South America */}
              <path
                d="M 230 260 Q 300 280 290 380 T 230 460 T 190 350 Z"
                fill="var(--bg-surface-2)"
                stroke="var(--border)"
                strokeWidth="1.5"
                opacity="0.7"
              />
              {/* Europe */}
              <path
                d="M 450 100 Q 520 90 560 140 T 520 190 T 440 160 Z"
                fill={getRegionFill('Low', selectedRegionId === 'REG-EU')}
                stroke={selectedRegionId === 'REG-EU' ? 'var(--accent)' : 'var(--border)'}
                strokeWidth={selectedRegionId === 'REG-EU' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedRegionId('REG-EU')}
              />
              {/* Africa */}
              <path
                d="M 460 200 Q 540 210 550 320 T 490 420 T 430 300 Z"
                fill="var(--bg-surface-2)"
                stroke="var(--border)"
                strokeWidth="1.5"
                opacity="0.7"
              />
              {/* South Asia / India (REG-SA) */}
              <path
                d="M 640 190 Q 710 180 720 250 T 670 320 T 630 240 Z"
                fill={getRegionFill('Medium', selectedRegionId === 'REG-SA')}
                stroke={selectedRegionId === 'REG-SA' ? 'var(--accent)' : 'var(--border)'}
                strokeWidth={selectedRegionId === 'REG-SA' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedRegionId('REG-SA')}
              />
              {/* East Asia / China (REG-EA) */}
              <path
                d="M 720 120 Q 840 110 880 180 T 820 260 T 730 210 Z"
                fill={getRegionFill('High', selectedRegionId === 'REG-EA')}
                stroke={selectedRegionId === 'REG-EA' ? 'var(--accent)' : 'var(--border)'}
                strokeWidth={selectedRegionId === 'REG-EA' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedRegionId('REG-EA')}
              />
              {/* Southeast Asia / Vietnam (REG-SEA) */}
              <path
                d="M 740 260 Q 810 270 820 340 T 750 370 T 730 300 Z"
                fill={getRegionFill('Medium', selectedRegionId === 'REG-SEA')}
                stroke={selectedRegionId === 'REG-SEA' ? 'var(--accent)' : 'var(--border)'}
                strokeWidth={selectedRegionId === 'REG-SEA' ? '2.5' : '1.5'}
                className="cursor-pointer transition-all hover:opacity-80"
                onClick={() => setSelectedRegionId('REG-SEA')}
              />
              {/* High Risk Maritime Corridor (Red Sea / Malacca) */}
              <path
                d="M 550 240 Q 640 260 740 330"
                fill="none"
                stroke="url(#routeLineGrad)"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-pulse"
              />

              {/* Pulsing Hotspot Pins */}
              {/* Shanghai Port Hotspot */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedRegionId('REG-EA')}
                transform="translate(800, 190)"
              >
                <circle r="14" fill="rgba(239, 68, 68, 0.25)" className="animate-ping" />
                <circle r="6" fill="var(--risk-high)" />
                <text x="10" y="4" fill="var(--text-primary)" fontSize="11" fontWeight="bold">
                  Shanghai (+40% Congestion)
                </text>
              </g>

              {/* Malacca Strait Hotspot */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedRegionId('REG-HRC')}
                transform="translate(735, 320)"
              >
                <circle r="14" fill="rgba(239, 68, 68, 0.25)" className="animate-ping" />
                <circle r="6" fill="var(--risk-high)" />
                <text x="10" y="4" fill="var(--text-primary)" fontSize="11" fontWeight="bold">
                  Malacca Choke-Point
                </text>
              </g>

              {/* India / Nhava Sheva Hub */}
              <g
                className="cursor-pointer"
                onClick={() => setSelectedRegionId('REG-SA')}
                transform="translate(660, 240)"
              >
                <circle r="5" fill="var(--risk-low)" />
                <text x="10" y="4" fill="var(--text-primary)" fontSize="11" fontWeight="bold">
                  Mumbai / Western Hub
                </text>
              </g>
            </svg>
          </div>

          {/* Map Legend Overlay */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-bg-surface-2/90 border border-border-custom text-xs">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-text-muted text-[11px] uppercase">Legend:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-risk-high" />
                <span className="text-text-primary text-[11px]">High Disruption Corridor</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-risk-medium" />
                <span className="text-text-primary text-[11px]">Medium Transit Delay</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-risk-low" />
                <span className="text-text-primary text-[11px]">Optimal Flow Corridor</span>
              </span>
            </div>
            <span className="font-mono text-text-muted text-[11px]">5 Monitored Global Corridors</span>
          </div>
        </div>

        {/* Region Details Inspector Panel (1 Col) */}
        <div className="fintech-card flex flex-col justify-between overflow-y-auto space-y-4 h-full">
          <div className="space-y-4">
            <div className="border-b border-border-custom pb-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-bg-surface-2 border border-border-custom text-text-muted">
                  CORRIDOR TELEMETRY
                </span>
                <RiskBadge level={activeRegion.riskLevel} score={activeRegion.riskScore} size="xs" />
              </div>
              <h3 className="text-base font-bold text-text-primary mt-2">
                {activeRegion.name}
              </h3>
              <div className="text-xs text-text-muted mt-0.5">
                Primary Risk Type: <strong className="text-accent uppercase font-mono">{activeRegion.riskType}</strong>
              </div>
            </div>

            {/* Region Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom">
                <span className="text-[10px] text-text-muted block uppercase font-medium">
                  Suppliers
                </span>
                <span className="text-sm font-bold text-text-primary font-mono block mt-0.5">
                  {activeRegion.supplierCount} Nodes
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom">
                <span className="text-[10px] text-text-muted block uppercase font-medium">
                  Active Events
                </span>
                <span className="text-sm font-bold text-risk-high font-mono block mt-0.5">
                  {activeRegion.activeEventsCount} Alerts
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom text-xs">
              <span className="text-[10px] text-text-muted block uppercase font-medium">
                At-Risk Financial Exposure
              </span>
              <span className="text-base font-bold text-text-primary font-mono block mt-0.5">
                {formatINR(activeRegion.financialExposure, true)}
              </span>
            </div>

            {/* Affected Routes */}
            <div className="space-y-1.5 text-xs">
              <div className="font-semibold text-text-primary flex items-center gap-1.5">
                <Anchor className="w-3.5 h-3.5 text-accent" />
                <span>Monitored Shipping Routes</span>
              </div>
              <div className="space-y-1">
                {activeRegion.affectedRoutes.map((route, i) => (
                  <div key={i} className="p-2 rounded bg-bg-surface-2/60 border border-border-custom/80 text-[11px] text-text-secondary">
                    {route}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Drivers */}
            <div className="space-y-1.5 text-xs">
              <div className="font-semibold text-text-primary flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-risk-high" />
                <span>Primary Risk Catalysts</span>
              </div>
              <ul className="space-y-1 text-[11px] text-text-secondary list-disc list-inside">
                {activeRegion.riskDrivers.map((driver, i) => (
                  <li key={i}>{driver}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-border-custom space-y-2">
            {activeRegion.id === 'REG-EA' && (
              <button
                onClick={() => selectSupplier('SUP-014')}
                className="w-full py-2 px-3 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Inspect ABC Components (Hero)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => openCopilotWithQuery(`What happens if the ${activeRegion.name} route is disrupted?`)}
              className="w-full py-2 px-3 rounded-lg bg-bg-surface-2 border border-border-custom hover:border-accent text-text-secondary hover:text-text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Simulate Regional Disruption</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
