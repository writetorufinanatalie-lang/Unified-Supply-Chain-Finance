import React, { useState, useMemo } from 'react';
import {
  Coins,
  Percent,
  ExternalLink,
  Sparkles,
  Search,
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { StatCard } from '../components/common/StatCard';
import { RiskBadge } from '../components/common/RiskBadge';
import { formatINR, formatPercent } from '../utils/formatters';

export const FinancingOverview: React.FC = () => {
  const { suppliers, selectSupplier, openCopilotWithQuery } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Portfolio metrics
  const totalExposure = suppliers.reduce((acc, s) => acc + s.financing.exposure, 0);
  const totalCreditFacility = suppliers.reduce((acc, s) => acc + s.financing.creditLimit, 0);
  const highRiskSuppliers = suppliers.filter((s) => s.riskLevel === 'High');
  const atRiskFinancing = highRiskSuppliers.reduce((acc, s) => acc + s.financing.exposure, 0);
  const avgRate = (
    suppliers.reduce((acc, s) => acc + s.financing.rate, 0) / suppliers.length
  ).toFixed(2);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTier = tierFilter === 'ALL' || s.tier.toString() === tierFilter;
      const matchesStatus = statusFilter === 'ALL' || s.financingStatus === statusFilter;
      return matchesSearch && matchesTier && matchesStatus;
    });
  }, [suppliers, searchQuery, tierFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <Coins className="w-5 h-5 text-accent" />
            <span>Dynamic Risk-Adjusted Financing Facility</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Continuous rate repricing and risk-weighted credit line allocation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openCopilotWithQuery("Why did the financing rate change?")}
            className="px-3 py-2 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explain Pricing Formula</span>
          </button>
        </div>
      </div>

      {/* Portfolio Summary KPI Row (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Drawn Liquidity"
          value={totalExposure}
          formatter={(val) => formatINR(val, true)}
          trend={{ value: 12.4, direction: 'up', label: 'vs last month', isGood: true }}
          tooltip="Total working capital currently funded across active invoices"
        />

        <StatCard
          label="At-Risk Working Capital"
          value={atRiskFinancing}
          formatter={(val) => formatINR(val, true)}
          trend={{ value: 18.1, direction: 'up', label: 'risk elevated', isGood: false }}
          tooltip="Financing extended to suppliers currently classified as High Risk"
        />

        <StatCard
          label="Portfolio Weighted APR"
          value={parseFloat(avgRate)}
          suffix="%"
          decimals={2}
          trend={{ value: 0.4, direction: 'up', label: 'risk premium hike', isGood: false }}
          tooltip="Average risk-adjusted financing spread across the portfolio"
        />

        <StatCard
          label="Approved Credit Facility"
          value={totalCreditFacility}
          formatter={(val) => formatINR(val, true)}
          trend={{ value: 5.2, direction: 'up', label: 'headroom ₹1.89 Cr', isGood: true }}
          tooltip="Aggregate approved credit facility capacity across all 18 nodes"
        />
      </div>

      {/* Dynamic Pricing Logic Info Banner */}
      <div className="fintech-card bg-bg-surface-2/60 border-accent/30 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-text-primary">
              Institutional Risk-Adjusted Pricing Formula
            </div>
            <p className="text-[11px] text-text-secondary mt-0.5">
              `Rate = Base SOFR (3.50%) + Risk Premium (0.60% - 3.80%) - ESG Incentive (0.00% - 0.80%)`
            </p>
          </div>
        </div>
        <div className="text-xs text-text-muted">
          Auto-repriced every 24h based on real-time transit & telemetry signals
        </div>
      </div>

      {/* Financing Directory Table */}
      <div className="fintech-card p-4 space-y-4">
        {/* Table Filter Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-custom">
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search financing accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
              />
            </div>

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Tiers</option>
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

          <span className="text-xs text-text-muted">
            Showing <strong className="text-text-primary">{filteredSuppliers.length}</strong> accounts
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-bg-surface-2/80 border-b border-border-custom text-text-secondary font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Supplier Entity</th>
                <th className="py-3 px-3">Risk Rating</th>
                <th className="py-3 px-4 text-right">Credit Limit</th>
                <th className="py-3 px-3 text-right">Risk Premium</th>
                <th className="py-3 px-3 text-right">ESG Discount</th>
                <th className="py-3 px-3 text-right">Effective APR</th>
                <th className="py-3 px-4 text-right">Current Exposure</th>
                <th className="py-3 px-3 text-center">Facility Status</th>
                <th className="py-3 px-4 text-right">Terms Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom/60">
              {filteredSuppliers.map((s) => {
                const isHero = s.id === 'SUP-014';
                return (
                  <tr
                    key={s.id}
                    onClick={() => selectSupplier(s.id)}
                    className={`hover:bg-bg-surface-2/80 cursor-pointer transition-colors ${
                      isHero ? 'bg-accent/5 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-text-primary flex items-center gap-1.5">
                        <span>{s.name}</span>
                        {isHero && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-accent/20 text-accent font-mono">
                            HERO
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-text-muted font-mono">
                        {s.id} • Tier {s.tier} • {s.country}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <RiskBadge level={s.riskLevel} score={s.riskScore} size="xs" />
                    </td>

                    {/* Credit Limit */}
                    <td className="py-3.5 px-4 text-right font-mono">
                      <div className="font-bold text-text-primary">
                        {formatINR(s.financing.creditLimit, true)}
                      </div>
                      {s.financing.creditLimit < s.financing.previousCreditLimit && (
                        <div className="text-[10px] text-text-muted line-through">
                          {formatINR(s.financing.previousCreditLimit, true)}
                        </div>
                      )}
                    </td>

                    {/* Risk Premium */}
                    <td className="py-3.5 px-3 text-right font-mono text-text-secondary">
                      +{s.financing.riskPremium.toFixed(1)}%
                    </td>

                    {/* ESG Discount */}
                    <td className="py-3.5 px-3 text-right font-mono text-positive">
                      -{s.financing.esgIncentive.toFixed(1)}%
                    </td>

                    {/* Effective Rate */}
                    <td className="py-3.5 px-3 text-right font-mono">
                      <div className={`font-bold ${s.financing.rate >= 7.0 ? 'text-risk-high' : 'text-text-primary'}`}>
                        {formatPercent(s.financing.rate)}
                      </div>
                      {s.financing.rate !== s.financing.previousRate && (
                        <div className="text-[10px] text-text-muted line-through">
                          {formatPercent(s.financing.previousRate)}
                        </div>
                      )}
                    </td>

                    {/* Exposure */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-text-primary">
                      {formatINR(s.financing.exposure, true)}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          s.financingStatus === 'Active'
                            ? 'bg-positive/15 text-positive'
                            : 'bg-risk-medium-bg text-risk-medium'
                        }`}
                      >
                        {s.financingStatus}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          selectSupplier(s.id);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bg-surface-2 hover:bg-accent hover:text-bg-base border border-border-custom text-text-secondary hover:border-accent text-xs font-semibold transition-all"
                      >
                        <span>Inspect Why</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
