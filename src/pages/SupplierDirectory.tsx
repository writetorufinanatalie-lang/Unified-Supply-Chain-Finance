import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  ExternalLink,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { RiskBadge } from '../components/common/RiskBadge';
import { EmptyState } from '../components/common/EmptyState';
import { TableSkeleton } from '../components/common/SkeletonLoader';
import { ErrorState } from '../components/common/ErrorState';
import { formatINR, formatPercent } from '../utils/formatters';
import type { Supplier } from '../types';

export const SupplierDirectory: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRiskFilter = searchParams.get('risk') || 'ALL';

  const { suppliers, selectSupplier, openCopilotWithQuery } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [riskFilter, setRiskFilter] = useState<string>(initialRiskFilter);
  const [countryFilter, setCountryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof Supplier | 'exposure' | 'rate'>('riskScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Unique countries
  const countries = useMemo(() => {
    return Array.from(new Set(suppliers.map((s) => s.country)));
  }, [suppliers]);

  // Filter and Sort Logic
  const filteredSuppliers = useMemo(() => {
    return suppliers
      .filter((s) => {
        const matchesSearch =
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.industry.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTier = tierFilter === 'ALL' || s.tier.toString() === tierFilter;
        const matchesRisk = riskFilter === 'ALL' || s.riskLevel.toUpperCase() === riskFilter.toUpperCase();
        const matchesCountry = countryFilter === 'ALL' || s.country === countryFilter;
        const matchesStatus = statusFilter === 'ALL' || s.financingStatus === statusFilter;

        return matchesSearch && matchesTier && matchesRisk && matchesCountry && matchesStatus;
      })
      .sort((a, b) => {
        let valA: any = a[sortField as keyof Supplier];
        let valB: any = b[sortField as keyof Supplier];

        if (sortField === 'exposure') {
          valA = a.financing.exposure;
          valB = b.financing.exposure;
        } else if (sortField === 'rate') {
          valA = a.financing.rate;
          valB = b.financing.rate;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }, [suppliers, searchQuery, tierFilter, riskFilter, countryFilter, statusFilter, sortField, sortDirection]);

  const handleSort = (field: keyof Supplier | 'exposure' | 'rate') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setTierFilter('ALL');
    setRiskFilter('ALL');
    setCountryFilter('ALL');
    setStatusFilter('ALL');
  };

  if (hasError) {
    return (
      <div className="space-y-6">
        <ErrorState
          title="Supplier Risk Directory Offline"
          message="Failed to stream risk evaluation scores from node consensus ledger."
          onRetry={() => setHasError(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Quick Summary Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight">
            Supplier Risk & Financing Directory
          </h2>
          <p className="text-xs text-text-secondary">
            Continuous multi-tier risk scoring, dynamic limits, and early payment terms
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 500);
            }}
            title="Refresh Ledger Sync"
            className="p-2 rounded-lg bg-bg-surface-2 border border-border-custom hover:border-accent text-text-secondary hover:text-text-primary transition-colors text-xs font-semibold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync Ledger</span>
          </button>
          <button
            onClick={() => openCopilotWithQuery("Which suppliers should we monitor?")}
            className="px-3 py-2 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Risk Audit</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="fintech-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, ID, component..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
            />
          </div>

          {/* Tier Filter */}
          <div>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Tiers (1, 2, 3)</option>
              <option value="1">Tier 1 (Direct)</option>
              <option value="2">Tier 2 (Sub-Assembly)</option>
              <option value="3">Tier 3 (Raw Materials)</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Paused">Paused</option>
            </select>
          </div>
        </div>

        {/* Filter Status Pills & Clear */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border-custom/60 text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-text-primary">{filteredSuppliers.length}</strong> of {suppliers.length} suppliers</span>
            {(searchQuery || tierFilter !== 'ALL' || riskFilter !== 'ALL' || countryFilter !== 'ALL' || statusFilter !== 'ALL') && (
              <button
                onClick={clearFilters}
                className="text-accent hover:underline text-xs font-semibold ml-2"
              >
                Clear all filters
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px]">Sort By:</span>
            <button
              onClick={() => handleSort('riskScore')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                sortField === 'riskScore'
                  ? 'bg-accent/15 border-accent text-accent'
                  : 'bg-bg-surface-2 border-border-custom text-text-secondary'
              }`}
            >
              Risk Score {sortField === 'riskScore' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => handleSort('exposure')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                sortField === 'exposure'
                  ? 'bg-accent/15 border-accent text-accent'
                  : 'bg-bg-surface-2 border-border-custom text-text-secondary'
              }`}
            >
              Exposure {sortField === 'exposure' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
            <button
              onClick={() => handleSort('rate')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                sortField === 'rate'
                  ? 'bg-accent/15 border-accent text-accent'
                  : 'bg-bg-surface-2 border-border-custom text-text-secondary'
              }`}
            >
              Rate APR {sortField === 'rate' && (sortDirection === 'desc' ? '↓' : '↑')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      {isLoading ? (
        <TableSkeleton rows={8} cols={7} />
      ) : filteredSuppliers.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No Suppliers Found"
          description="No supplier nodes match your active search criteria or risk filters."
          actionLabel="Clear Filter Criteria"
          onAction={clearFilters}
        />
      ) : (
        <div className="fintech-card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-bg-surface-2/80 border-b border-border-custom text-text-secondary font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Supplier / ID</th>
                  <th className="py-3 px-3">Tier</th>
                  <th className="py-3 px-3">Country / Region</th>
                  <th className="py-3 px-4">Risk Rating</th>
                  <th className="py-3 px-4 text-right">Credit Limit</th>
                  <th className="py-3 px-3 text-right">Rate APR</th>
                  <th className="py-3 px-4 text-right">Active Exposure</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-custom/60">
                {filteredSuppliers.map((supplier) => {
                  const isHero = supplier.id === 'SUP-014';
                  return (
                    <tr
                      key={supplier.id}
                      onClick={() => selectSupplier(supplier.id)}
                      className={`hover:bg-bg-surface-2/80 cursor-pointer transition-colors group ${
                        isHero ? 'bg-accent/5 font-medium' : ''
                      }`}
                    >
                      {/* Name & ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-semibold text-text-primary group-hover:text-accent transition-colors flex items-center gap-1.5">
                              <span>{supplier.name}</span>
                              {supplier.isSinglePointOfFailure && (
                                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-risk-high-bg text-risk-high font-bold">
                                  SPOF
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-text-muted font-mono mt-0.5">
                              {supplier.id} • {supplier.industry}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Tier */}
                      <td className="py-3.5 px-3">
                        <span className="font-mono px-2 py-0.5 rounded bg-bg-surface-2 border border-border-custom text-text-primary text-[11px] font-bold">
                          T{supplier.tier}
                        </span>
                      </td>

                      {/* Country */}
                      <td className="py-3.5 px-3 text-text-secondary">
                        <div>{supplier.country}</div>
                        <div className="text-[10px] text-text-muted">{supplier.region}</div>
                      </td>

                      {/* Risk Rating */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <RiskBadge level={supplier.riskLevel} score={supplier.riskScore} size="xs" />
                        </div>
                      </td>

                      {/* Credit Limit */}
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-text-primary">
                        <div>{formatINR(supplier.financing.creditLimit, true)}</div>
                        {supplier.financing.creditLimit < supplier.financing.previousCreditLimit && (
                          <div className="text-[10px] text-text-muted line-through">
                            {formatINR(supplier.financing.previousCreditLimit, true)}
                          </div>
                        )}
                      </td>

                      {/* Rate */}
                      <td className="py-3.5 px-3 text-right font-mono">
                        <span
                          className={`font-semibold ${
                            supplier.financing.rate >= 7.0 ? 'text-risk-high' : 'text-text-primary'
                          }`}
                        >
                          {formatPercent(supplier.financing.rate)}
                        </span>
                      </td>

                      {/* Active Exposure */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-text-primary">
                        {formatINR(supplier.financing.exposure, true)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            supplier.financingStatus === 'Active'
                              ? 'bg-positive/15 text-positive border border-positive/30'
                              : supplier.financingStatus === 'Under Review'
                              ? 'bg-risk-medium-bg text-risk-medium border border-risk-medium/30'
                              : 'bg-risk-high-bg text-risk-high border border-risk-high/30'
                          }`}
                        >
                          {supplier.financingStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectSupplier(supplier.id);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bg-surface-2 hover:bg-accent hover:text-bg-base border border-border-custom text-text-secondary hover:border-accent text-xs font-semibold transition-all"
                        >
                          <span>Inspect</span>
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
      )}
    </div>
  );
};
