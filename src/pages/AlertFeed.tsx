import React, { useState, useMemo } from 'react';
import {
  BellRing,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Search,
  Clock,
  Layers,
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { RiskBadge } from '../components/common/RiskBadge';
import { EmptyState } from '../components/common/EmptyState';
import { formatRelativeTime } from '../utils/formatters';

export const AlertFeed: React.FC = () => {
  const { alerts, selectSupplier, openCopilotWithQuery } = useAppStore();

  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    return Array.from(new Set(alerts.map((a) => a.category)));
  }, [alerts]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      const matchesSearch =
        a.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity =
        severityFilter === 'ALL' || a.severity.toUpperCase() === severityFilter.toUpperCase();

      const matchesCategory = categoryFilter === 'ALL' || a.category === categoryFilter;

      return matchesSearch && matchesSeverity && matchesCategory;
    });
  }, [alerts, searchQuery, severityFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <BellRing className="w-5 h-5 text-accent" />
            <span>Early-Warning & Risk Propagation Feed</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Continuous anomaly detection, port dwell surges, and deep-tier cascade alerts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openCopilotWithQuery("Which suppliers should we monitor?")}
            className="px-3 py-2 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Event Correlation</span>
          </button>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="fintech-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {/* Search */}
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search alert by reason, supplier name, event ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
            />
          </div>

          {/* Severity Filter */}
          <div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Severities</option>
              <option value="HIGH">High Severity</option>
              <option value="MEDIUM">Medium Severity</option>
              <option value="LOW">Low Severity</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border-custom/60 text-xs text-text-muted">
          <span>Showing <strong className="text-text-primary">{filteredAlerts.length}</strong> active alerts</span>
          {(searchQuery || severityFilter !== 'ALL' || categoryFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSeverityFilter('ALL');
                setCategoryFilter('ALL');
              }}
              className="text-accent hover:underline text-xs font-semibold"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Alert Feed Cards */}
      {filteredAlerts.length === 0 ? (
        <EmptyState
          icon={BellRing}
          title="No Alerts Match Filter"
          description="There are currently no early warning signals matching the specified severity or search criteria."
          actionLabel="Reset Filters"
          onAction={() => {
            setSearchQuery('');
            setSeverityFilter('ALL');
            setCategoryFilter('ALL');
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const isHero = alert.supplierId === 'SUP-014';
            return (
              <div
                key={alert.id}
                className={`fintech-card p-5 space-y-4 border transition-all ${
                  alert.severity === 'High'
                    ? 'border-risk-high/40 bg-risk-high-bg/30 hover:border-risk-high'
                    : 'border-border-custom hover:border-accent/40'
                } ${isHero ? 'ring-1 ring-accent/30' : ''}`}
              >
                {/* Card Top: Supplier + Event ID + Severity + Timestamp */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-custom/80 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-bg-surface border border-border-custom flex items-center justify-center text-accent font-mono font-bold text-xs">
                      {alert.id}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-text-primary flex items-center gap-2">
                        <span>{alert.supplierName}</span>
                        {isHero && (
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-accent/20 text-accent font-mono">
                            HERO ENTITY
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-text-muted">
                          ({alert.supplierId})
                        </span>
                      </div>
                      <div className="text-xs text-text-secondary">
                        Category: <strong className="text-accent">{alert.category} Telemetry</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <RiskBadge level={alert.severity} size="sm" />
                    <span className="text-xs text-text-muted flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {formatRelativeTime(alert.timestamp)}
                    </span>
                  </div>
                </div>

                {/* Card Body: Reason & Financial Impact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="md:col-span-2 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">
                      Root Cause Anomaly
                    </span>
                    <p className="text-xs text-text-primary leading-relaxed bg-bg-surface-2 p-3 rounded-lg border border-border-custom">
                      {alert.reason}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">
                      Potential Financial Exposure
                    </span>
                    <div className="p-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs">
                      <div className="font-bold text-risk-high">{alert.potentialImpact}</div>
                      <div className="text-[10px] text-text-muted mt-1">
                        Immediate Working Capital Risk
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horizontal Chain Reaction Step Indicator (Feature 6 requirement) */}
                <div className="p-3 rounded-lg bg-bg-surface-2/80 border border-border-custom space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider flex items-center gap-1">
                    <Layers className="w-3 h-3 text-accent" />
                    <span>Cascading Risk Chain Reaction</span>
                  </span>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {alert.chainReaction.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                            idx === alert.chainReaction.length - 1
                              ? 'bg-risk-high-bg text-risk-high border-risk-high/40 font-bold'
                              : 'bg-bg-surface text-text-secondary border-border-custom'
                          }`}
                        >
                          {step}
                        </span>
                        {idx < alert.chainReaction.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-text-muted shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Recommended Action & Trigger Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-text-secondary">
                    <strong className="text-accent uppercase text-[10px] block font-bold">
                      Direct Treasury Protocol:
                    </strong>
                    {alert.recommendedAction}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => selectSupplier(alert.supplierId)}
                      className="px-3 py-2 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Review Exposure</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openCopilotWithQuery(`Why is ${alert.supplierName} risky?`)}
                      className="px-3 py-2 rounded-lg bg-bg-surface-2 border border-border-custom hover:border-accent text-text-secondary hover:text-text-primary text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-accent" />
                      <span>Copilot Audit</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
