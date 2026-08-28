import React from 'react';
import {
  X,
  ShieldAlert,
  Coins,
  ArrowLeftRight,
  Sparkles,
  CheckCircle2,
  Globe2,
  Calendar,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useAppStore } from '../../stores/useAppStore';
import { RiskBadge } from '../common/RiskBadge';
import { RiskGauge } from '../common/RiskGauge';
import { formatINR, formatPercent, formatDate } from '../../utils/formatters';
import type { RiskLevel } from '../../types';

export const SupplierDetailDrawer: React.FC = () => {
  const {
    selectedSupplierId,
    selectSupplier,
    suppliers,
    openCopilotWithQuery,
  } = useAppStore();

  if (!selectedSupplierId) return null;

  const supplier = suppliers.find((s) => s.id === selectedSupplierId);
  if (!supplier) return null;

  // Factor colors helper
  const getFactorColor = (level: RiskLevel) => {
    switch (level) {
      case 'High':
        return {
          bg: 'bg-risk-high',
          text: 'text-risk-high',
          border: 'border-risk-high/30',
          pill: 'bg-risk-high-bg text-risk-high',
          width: 'w-5/6',
        };
      case 'Medium':
        return {
          bg: 'bg-risk-medium',
          text: 'text-risk-medium',
          border: 'border-risk-medium/30',
          pill: 'bg-risk-medium-bg text-risk-medium',
          width: 'w-3/6',
        };
      case 'Low':
      default:
        return {
          bg: 'bg-risk-low',
          text: 'text-risk-low',
          border: 'border-risk-low/30',
          pill: 'bg-risk-low-bg text-risk-low',
          width: 'w-1/6',
        };
    }
  };

  const factorKeys: { key: keyof typeof supplier.riskFactors; label: string }[] = [
    { key: 'geopolitical', label: 'Geopolitical Risk' },
    { key: 'logistics', label: 'Logistics & Route Risk' },
    { key: 'dependency', label: 'Dependency / Choke-point' },
    { key: 'country', label: 'Sovereign / Country Risk' },
    { key: 'delivery', label: 'Historical Delivery Delay' },
    { key: 'financial', label: 'Financial Health / Solvency' },
    { key: 'esg', label: 'ESG & Environmental Risk' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Backdrop */}
      <div
        onClick={() => selectSupplier(null)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity pointer-events-auto"
      />

      {/* 600px Detail Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-[620px] bg-bg-surface border-l border-border-custom shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-right duration-200 z-10">
        {/* Drawer Header */}
        <div className="h-16 px-6 border-b border-border-custom flex items-center justify-between bg-bg-surface-2/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-bg-base border border-border-custom flex items-center justify-center text-accent font-mono font-bold text-sm">
              T{supplier.tier}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-text-primary">
                  {supplier.name}
                </h3>
                <span className="text-xs font-mono text-text-muted">
                  ({supplier.id})
                </span>
                {supplier.isSinglePointOfFailure && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-risk-high-bg text-risk-high border border-risk-high/30">
                    SPOF Node
                  </span>
                )}
              </div>
              <div className="text-xs text-text-secondary flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1">
                  <Globe2 className="w-3 h-3 text-text-muted" />
                  {supplier.country} ({supplier.region})
                </span>
                <span>•</span>
                <span>{supplier.industry}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                openCopilotWithQuery(`Why is ${supplier.name} risky?`);
              }}
              title="Ask AI Copilot about this supplier"
              className="p-2 rounded-lg bg-accent/15 border border-accent/30 text-accent hover:bg-accent/25 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => selectSupplier(null)}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Top Section: Risk Score Gauge + Plain Language Explanation */}
          <div className="fintech-card flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0 flex flex-col items-center">
              <RiskGauge score={supplier.riskScore} level={supplier.riskLevel} size={150} />
            </div>
            <div className="flex-1 space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Risk Assessment Summary
                </span>
                <RiskBadge level={supplier.riskLevel} score={supplier.riskScore} />
              </div>
              <p className="text-xs text-text-primary leading-relaxed bg-bg-surface-2 p-3 rounded-lg border border-border-custom">
                {supplier.riskExplanation}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-text-muted pt-1">
                <span>Criticality: <strong className="text-text-primary">{supplier.criticality}</strong></span>
                <span>Financing Status: <strong className="text-accent">{supplier.financingStatus}</strong></span>
              </div>
            </div>
          </div>

          {/* 7-Factor Risk Breakdown (Horizontal Bars) */}
          <div className="fintech-card space-y-3">
            <div className="flex items-center justify-between border-b border-border-custom pb-2">
              <h4 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-accent" />
                <span>7-Factor Risk Decomposition</span>
              </h4>
              <span className="text-[11px] text-text-muted">Multi-signal telemetry</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {factorKeys.map(({ key, label }) => {
                const level = supplier.riskFactors[key];
                const styling = getFactorColor(level);
                return (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary font-medium">{label}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${styling.pill}`}>
                        {level} Risk
                      </span>
                    </div>
                    {/* Horizontal Bar */}
                    <div className="h-1.5 w-full bg-bg-surface-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${styling.bg} ${styling.width}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk History Line Chart (Recharts) */}
          <div className="fintech-card space-y-3">
            <div className="flex items-center justify-between border-b border-border-custom pb-2">
              <h4 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-text-muted" />
                <span>90-Day Risk Trajectory</span>
              </h4>
              <div className="text-[11px] text-text-secondary">
                {supplier.riskHistory[0]?.score} →{' '}
                <strong className={supplier.riskLevel === 'High' ? 'text-risk-high' : 'text-accent'}>
                  {supplier.riskHistory[supplier.riskHistory.length - 1]?.score}
                </strong>{' '}
                Score
              </div>
            </div>

            <div className="h-44 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={supplier.riskHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(val) => formatDate(String(val))}
                    stroke="var(--text-muted)"
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    stroke="var(--text-muted)"
                    fontSize={10}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--bg-surface-2)',
                      borderColor: 'var(--border)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                    formatter={(val: any) => [`${val} Score`, 'Risk Level']}
                    labelFormatter={(val) => formatDate(String(val))}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={supplier.riskLevel === 'High' ? 'var(--risk-high)' : 'var(--accent)'}
                    strokeWidth={2.5}
                    dot={{ fill: 'var(--bg-surface)', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic Financing Terms Panel */}
          <div className="fintech-card space-y-3 border-accent/30 bg-bg-surface-2/40">
            <div className="flex items-center justify-between border-b border-border-custom pb-2">
              <h4 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-accent" />
                <span>Dynamic Risk-Adjusted Financing Terms</span>
              </h4>
              <span className="text-[10px] font-mono uppercase bg-accent/15 text-accent px-2 py-0.5 rounded font-bold">
                AUTO-REPRICED
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-bg-surface border border-border-custom">
                <span className="text-[10px] uppercase font-semibold text-text-muted block">
                  Credit Limit
                </span>
                <span className="text-sm font-bold text-text-primary font-mono block mt-0.5">
                  {formatINR(supplier.financing.creditLimit, true)}
                </span>
                <span className="text-[10px] text-text-muted line-through">
                  Was {formatINR(supplier.financing.previousCreditLimit, true)}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-bg-surface border border-border-custom">
                <span className="text-[10px] uppercase font-semibold text-text-muted block">
                  Financing APR
                </span>
                <span className="text-sm font-bold text-risk-high font-mono block mt-0.5">
                  {formatPercent(supplier.financing.rate)}
                </span>
                <span className="text-[10px] text-text-muted line-through">
                  Was {formatPercent(supplier.financing.previousRate)}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-bg-surface border border-border-custom">
                <span className="text-[10px] uppercase font-semibold text-text-muted block">
                  Active Exposure
                </span>
                <span className="text-sm font-bold text-text-primary font-mono block mt-0.5">
                  {formatINR(supplier.financing.exposure, true)}
                </span>
                <span className="text-[10px] text-text-muted">
                  Drawn Working Capital
                </span>
              </div>
            </div>

            {/* Rate Composition Breakdown */}
            <div className="p-3 rounded-lg bg-bg-surface border border-border-custom text-xs space-y-1.5">
              <div className="text-[11px] font-semibold text-text-secondary flex justify-between">
                <span>Pricing Model: Base SOFR (3.5%) + Risk Premium ({supplier.financing.riskPremium}%) - ESG Discount ({supplier.financing.esgIncentive}%)</span>
                <strong className="text-text-primary">{supplier.financing.rate}% APR</strong>
              </div>
              <p className="text-[11px] text-text-muted italic">
                {supplier.financing.rate > supplier.financing.previousRate
                  ? `Financing rate increased from ${supplier.financing.previousRate}% to ${supplier.financing.rate}% due to elevated logistics and shipping route disruption risks.`
                  : `Financing rate maintained at optimal ${supplier.financing.rate}% reflecting strong balance sheet solvency.`}
              </p>
            </div>
          </div>

          {/* Feature 8: Deep-Tier Financing & Trust Propagation (Tier 2/3 Only) */}
          {supplier.tier > 1 && supplier.trust && (
            <div className="fintech-card space-y-3 border-border-custom bg-bg-surface-2/30">
              <div className="flex items-center justify-between border-b border-border-custom pb-2">
                <h4 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-accent" />
                  <span>Deep-Tier Trust & Relationship Verification (Tier {supplier.tier})</span>
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent/15 text-accent">
                  {supplier.trust.eligibility}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 rounded-lg bg-bg-surface border border-border-custom">
                  <span className="text-[10px] uppercase font-semibold text-text-muted block">
                    Network Trust Score
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-text-primary font-mono">
                      {supplier.trust.score}/100
                    </span>
                    <span className="text-[10px] text-accent font-medium">
                      ({supplier.trust.relationshipStrength} Strength)
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-bg-surface border border-border-custom">
                  <span className="text-[10px] uppercase font-semibold text-text-muted block">
                    PO Verification Status
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-positive" />
                    <span className="text-xs font-semibold text-text-primary">
                      Smart Contract Verified
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-text-muted leading-relaxed">
                By leveraging Tier-1 anchor buyer credit propagation, this Tier-{supplier.tier} node qualifies for receivables financing prior to delivery sign-off.
              </p>
            </div>
          )}

          {/* Feature 10: FX Risk Management Mini-Panel */}
          <div className="fintech-card space-y-3 border-border-custom">
            <div className="flex items-center justify-between border-b border-border-custom pb-2">
              <h4 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                <ArrowLeftRight className="w-4 h-4 text-accent" />
                <span>FX Cross-Border Currency Exposure</span>
              </h4>
              <span className="text-[10px] font-mono text-text-muted">
                1 {supplier.fx.currency} = ₹{supplier.fx.exchangeRate}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom">
                <span className="text-[10px] uppercase font-semibold text-text-muted block">
                  Invoice Value
                </span>
                <span className="text-sm font-bold text-text-primary font-mono block mt-0.5">
                  {supplier.fx.currency} {supplier.fx.invoiceValue.toLocaleString()}
                </span>
                <span className="text-[10px] text-text-muted">
                  ≈ {formatINR(supplier.fx.inrEquivalent, true)}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom">
                <span className="text-[10px] uppercase font-semibold text-text-muted block">
                  At-Risk FX Loss
                </span>
                <span className="text-sm font-bold text-risk-high font-mono block mt-0.5">
                  {formatINR(supplier.fx.fxExposure)}
                </span>
                <span className="text-[10px] text-text-muted">
                  30-day volatility
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom">
                <span className="text-[10px] uppercase font-semibold text-text-muted block">
                  Recommended Hedge
                </span>
                <span className="text-sm font-bold text-accent font-mono block mt-0.5">
                  {supplier.fx.recommendedHedge}%
                </span>
                <span className="text-[10px] text-text-muted">
                  Forward contract
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Footer inside Drawer */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                openCopilotWithQuery(`What happens if ${supplier.name} route is disrupted?`);
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulate Risk in AI Copilot</span>
            </button>
            <button
              onClick={() => selectSupplier(null)}
              className="px-4 py-2.5 rounded-lg bg-bg-surface-2 border border-border-custom text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
