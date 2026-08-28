import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ArrowRight,
  Globe,
  Sliders,
  BellRing,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useAppStore } from '../stores/useAppStore';
import { StatCard } from '../components/common/StatCard';
import { RiskBadge } from '../components/common/RiskBadge';
import { formatINR, formatDate, formatRelativeTime } from '../utils/formatters';

export const CommandCenter: React.FC = () => {
  const navigate = useNavigate();
  const {
    suppliers,
    alerts,
    riskRegions,
    selectSupplier,
    openCopilotWithQuery,
  } = useAppStore();

  const [timeRange, setTimeRange] = useState<'30d' | '90d'>('90d');

  // Aggregated KPIs calculation
  const highRiskSuppliers = suppliers.filter((s) => s.riskLevel === 'High');
  const atRiskExposure = highRiskSuppliers.reduce((acc, s) => acc + s.financing.exposure, 0);
  const totalFinancing = suppliers.reduce((acc, s) => acc + s.financing.exposure, 0);
  const totalFXExposure = suppliers.reduce((acc, s) => acc + s.fx.fxExposure, 0);
  const avgRiskScore = Math.round(
    suppliers.reduce((acc, s) => acc + s.riskScore, 0) / suppliers.length
  );

  // 90-Day vs 30-Day Portfolio Risk Trend Data
  const trendData90d = [
    { date: '2026-06-01', avgScore: 41, highRiskCount: 2, totalExposureCr: 4.8 },
    { date: '2026-06-15', avgScore: 43, highRiskCount: 3, totalExposureCr: 5.1 },
    { date: '2026-07-01', avgScore: 44, highRiskCount: 3, totalExposureCr: 5.2 },
    { date: '2026-07-15', avgScore: 46, highRiskCount: 4, totalExposureCr: 5.5 },
    { date: '2026-08-01', avgScore: 48, highRiskCount: 5, totalExposureCr: 5.79 },
    { date: '2026-08-15', avgScore: 48, highRiskCount: 5, totalExposureCr: 5.79 },
    { date: '2026-08-28', avgScore: 48, highRiskCount: 5, totalExposureCr: 5.79 },
  ];

  const trendData30d = [
    { date: '2026-08-01', avgScore: 47, highRiskCount: 4, totalExposureCr: 5.5 },
    { date: '2026-08-08', avgScore: 47, highRiskCount: 4, totalExposureCr: 5.6 },
    { date: '2026-08-15', avgScore: 48, highRiskCount: 5, totalExposureCr: 5.75 },
    { date: '2026-08-22', avgScore: 48, highRiskCount: 5, totalExposureCr: 5.79 },
    { date: '2026-08-28', avgScore: 48, highRiskCount: 5, totalExposureCr: 5.79 },
  ];

  const activeTrendData = timeRange === '90d' ? trendData90d : trendData30d;

  // Top Risk Drivers
  const riskDrivers = [
    { name: 'Shanghai Port Congestion', impact: '+17 pts', affectedCount: 4, region: 'East Asia', severity: 'High' },
    { name: 'Malacca Strait Choke-Point', impact: '+22 pts', affectedCount: 2, region: 'Malacca Corridor', severity: 'High' },
    { name: 'Red Sea Cape Route Diversion', impact: '+14 pts', affectedCount: 1, region: 'High-Risk Corridor', severity: 'High' },
    { name: 'Monsoon Inland Transit Lag', impact: '+6 pts', affectedCount: 3, region: 'South Asia', severity: 'Medium' },
    { name: 'Wastewater ESG Capacity Review', impact: '+8 pts', affectedCount: 1, region: 'Southeast Asia', severity: 'Medium' },
  ];

  // Recommended Actions
  const recommendedActions = [
    {
      id: 'act-1',
      title: 'Review ABC Components (SUP-014) Financing Spread',
      desc: 'Port congestion increased risk rating to 61. Reprice financing rate to 7.0% APR.',
      actionLabel: 'Reprice Terms',
      supplierId: 'SUP-014',
    },
    {
      id: 'act-2',
      title: 'Hedge USD Exposure for Ningbo Micro-Sensors',
      desc: 'Unhedged FX exposure is ₹78,000 against 30-day currency volatility.',
      actionLabel: 'Execute 85% Hedge',
      supplierId: 'SUP-003',
    },
    {
      id: 'act-3',
      title: 'Activate Buffer Sourcing for Malacca Lithography',
      desc: 'Single point of failure node experiencing +6.2 day naval patrol delay.',
      actionLabel: 'View Node Graph',
      route: '/graph',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 6 Hero KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="High-Risk Suppliers"
          value={highRiskSuppliers.length}
          trend={{ value: 40, direction: 'up', label: 'vs last quarter', isGood: false }}
          tooltip="Total suppliers flagged with High risk rating across all 3 tiers"
          onClick={() => navigate('/suppliers?risk=High')}
        />

        <StatCard
          label="At-Risk Exposure"
          value={atRiskExposure}
          formatter={(val) => formatINR(val, true)}
          trend={{ value: 14.2, direction: 'up', label: 'vs 30d ago', isGood: false }}
          tooltip="Total active working capital deployed to suppliers with High risk ratings"
          onClick={() => navigate('/financing')}
        />

        <StatCard
          label="Active Risk Events"
          value={alerts.length}
          trend={{ value: 28, direction: 'up', label: '+3 this week', isGood: false }}
          tooltip="Unresolved early-warning alerts requiring credit or logistics intervention"
          onClick={() => navigate('/alerts')}
        />

        <StatCard
          label="FX Exposure"
          value={totalFXExposure}
          formatter={(val) => formatINR(val, true)}
          trend={{ value: 8.5, direction: 'up', label: 'unhedged drift', isGood: false }}
          tooltip="Total cross-border currency exposure across non-INR denominated trade invoices"
          onClick={() => selectSupplier('SUP-014')}
        />

        <StatCard
          label="Total Financing"
          value={totalFinancing}
          formatter={(val) => formatINR(val, true)}
          trend={{ value: 12.0, direction: 'up', label: 'portfolio growth', isGood: true }}
          tooltip="Total drawn working capital and invoice discounting liquidity deployed"
          onClick={() => navigate('/financing')}
        />

        <StatCard
          label="Avg Risk Score"
          value={avgRiskScore}
          suffix="/100"
          trend={{ value: 4.2, direction: 'up', label: 'risk elevated', isGood: false }}
          tooltip="Weighted average risk index across all 18 monitored enterprise nodes"
          onClick={() => navigate('/suppliers')}
        />
      </div>

      {/* Main Grid: Risk Trajectory Chart & Compact Global Risk Map Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 30/90-Day Portfolio Risk Trend Line/Area Chart */}
        <div className="lg:col-span-2 fintech-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-custom pb-3">
            <div>
              <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span>Supply Chain Risk & Exposure Velocity</span>
              </h2>
              <p className="text-xs text-text-muted">
                Aggregate portfolio risk score vs. capital at risk
              </p>
            </div>

            {/* 30d / 90d Toggle */}
            <div className="flex items-center gap-1 p-1 bg-bg-surface-2 rounded-lg border border-border-custom">
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  timeRange === '30d'
                    ? 'bg-accent text-bg-base shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange('90d')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  timeRange === '90d'
                    ? 'bg-accent text-bg-base shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                90 Days
              </button>
            </div>
          </div>

          <div className="h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--risk-high)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--risk-high)" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(val) => formatDate(String(val))}
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                  domain={[30, 60]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-surface-2)',
                    borderColor: 'var(--border)',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                  labelFormatter={(val) => formatDate(String(val))}
                />
                <Area
                  type="monotone"
                  dataKey="avgScore"
                  name="Avg Risk Score"
                  stroke="var(--risk-high)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#riskGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border-custom text-xs">
            <div>
              <span className="text-[11px] text-text-muted block">Risk Trajectory</span>
              <span className="text-sm font-semibold text-risk-high">
                41 → 48 (+7 pts)
              </span>
            </div>
            <div>
              <span className="text-[11px] text-text-muted block">High-Risk Nodes</span>
              <span className="text-sm font-semibold text-text-primary">
                5 of 18 Suppliers
              </span>
            </div>
            <div>
              <span className="text-[11px] text-text-muted block">Hero Node (ABC Comp)</span>
              <span
                onClick={() => selectSupplier('SUP-014')}
                className="text-sm font-semibold text-accent hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>78 → 61 Score</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Compact Global Risk Map Preview Panel */}
        <div className="fintech-card space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border-custom pb-3">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                <span>Global Risk Heatmap</span>
              </h3>
              <button
                onClick={() => navigate('/map')}
                className="text-xs font-semibold text-accent hover:text-accent-hover inline-flex items-center gap-1"
              >
                <span>Full Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Region List Preview */}
            <div className="space-y-3 pt-3">
              {riskRegions.slice(0, 4).map((region) => (
                <div
                  key={region.id}
                  onClick={() => navigate('/map')}
                  className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom hover:border-accent/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-text-primary">
                      {region.name}
                    </span>
                    <RiskBadge level={region.riskLevel} size="xs" score={region.riskScore} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-text-muted mt-1.5">
                    <span>{region.supplierCount} Suppliers • {region.activeEventsCount} Events</span>
                    <span className="font-mono text-text-secondary">
                      {formatINR(region.financialExposure, true)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border-custom">
            <button
              onClick={() => navigate('/simulator')}
              className="w-full py-2 px-3 rounded-lg bg-bg-surface-2 border border-border-custom hover:border-accent text-text-primary text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-accent" />
              <span>Simulate Port & Route Shocks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lower Row: Top Risk Drivers, Recommended Actions, Early-Warning Feed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top Risk Drivers */}
        <div className="fintech-card space-y-3">
          <div className="flex items-center justify-between border-b border-border-custom pb-2">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-risk-high" />
              <span>Top Risk Drivers</span>
            </h3>
            <span className="text-[11px] text-text-muted">Ranked by impact</span>
          </div>

          <div className="space-y-2 pt-1">
            {riskDrivers.map((driver, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-text-primary">{driver.name}</div>
                  <div className="text-[10px] text-text-muted">
                    {driver.region} • {driver.affectedCount} Nodes affected
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-risk-high font-mono">{driver.impact}</span>
                  <div className="text-[10px] text-text-muted">{driver.severity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions Feed */}
        <div className="fintech-card space-y-3">
          <div className="flex items-center justify-between border-b border-border-custom pb-2">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>AI Action Directives</span>
            </h3>
            <span className="text-[11px] text-text-muted">High Priority</span>
          </div>

          <div className="space-y-2.5 pt-1">
            {recommendedActions.map((action) => (
              <div
                key={action.id}
                className="p-3 rounded-lg bg-bg-surface-2 border border-border-custom space-y-2"
              >
                <div className="text-xs font-semibold text-text-primary">
                  {action.title}
                </div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  {action.desc}
                </p>
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => {
                      if (action.supplierId) {
                        selectSupplier(action.supplierId);
                      } else if (action.route) {
                        navigate(action.route);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-accent/15 hover:bg-accent/25 text-accent text-xs font-semibold transition-colors"
                  >
                    <span>{action.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Condensed Early-Warning Feed (Links to /alerts) */}
        <div className="fintech-card space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border-custom pb-2">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                <BellRing className="w-4 h-4 text-accent" />
                <span>Early Warning Feed</span>
              </h3>
              <button
                onClick={() => navigate('/alerts')}
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
              >
                <span>View All ({alerts.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5 pt-2">
              {alerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => selectSupplier(alert.supplierId)}
                  className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom hover:border-accent/40 cursor-pointer transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text-primary truncate">
                      {alert.supplierName}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {formatRelativeTime(alert.timestamp)}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                    {alert.reason}
                  </p>
                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <span className="font-bold text-risk-high">{alert.potentialImpact}</span>
                    <RiskBadge level={alert.severity} size="xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-border-custom">
            <button
              onClick={() => openCopilotWithQuery("Which suppliers are currently high risk?")}
              className="w-full py-2 px-3 rounded-lg bg-accent text-bg-base hover:bg-accent-hover text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Copilot for Full Risk Brief</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
