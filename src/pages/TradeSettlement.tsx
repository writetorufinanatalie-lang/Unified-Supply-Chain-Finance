import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  PauseCircle,
  Sparkles,
  Search,
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { formatINR, formatDate } from '../utils/formatters';

export const TradeSettlement: React.FC = () => {
  const { settlements, selectSupplier, openCopilotWithQuery } = useAppStore();

  const [selectedSettlementId, setSelectedSettlementId] = useState<string>('STL-9041'); // Default to ABC Components paused invoice
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeSettlement =
    settlements.find((s) => s.id === selectedSettlementId) || settlements[0];

  const filteredSettlements = settlements.filter((s) => {
    const matchesSearch =
      s.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-accent" />
            <span>Smart Contract Automated Trade Settlement</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Multi-tranche milestone escrow execution triggered by IoT and electronic customs verify
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openCopilotWithQuery("Why is ABC Components invoice paused?")}
            className="px-3 py-2 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Audit Escrow Holds</span>
          </button>
        </div>
      </div>

      {/* Featured Milestone Stepper Tracker (Hero Invoice) */}
      {activeSettlement && (
        <div className="fintech-card p-6 space-y-6 border-accent/40 bg-bg-surface-2/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-custom pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-bg-surface border border-border-custom text-accent">
                  {activeSettlement.id}
                </span>
                <h3 className="text-base font-bold text-text-primary">
                  {activeSettlement.invoiceNumber}
                </h3>
                <span
                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    activeSettlement.status === 'On Track'
                      ? 'bg-positive/15 text-positive border border-positive/30'
                      : 'bg-risk-high-bg text-risk-high border border-risk-high/30 animate-pulse'
                  }`}
                >
                  {activeSettlement.status === 'On Track' ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <PauseCircle className="w-3 h-3" />
                  )}
                  <span>{activeSettlement.status}</span>
                </span>
              </div>
              <div className="text-xs text-text-secondary mt-1">
                Supplier:{' '}
                <strong
                  onClick={() => selectSupplier(activeSettlement.supplierId)}
                  className="text-text-primary hover:text-accent cursor-pointer underline"
                >
                  {activeSettlement.supplierName} ({activeSettlement.supplierId})
                </strong>{' '}
                • Buyer: <strong className="text-text-primary">{activeSettlement.buyerName}</strong>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-text-muted uppercase font-bold block">
                Total Escrow Value
              </span>
              <span className="text-xl font-bold font-mono text-text-primary">
                {formatINR(activeSettlement.totalAmount)}
              </span>
              <div className="text-[10px] text-text-muted">
                Est. Final Settlement: {formatDate(activeSettlement.estimatedSettlementDate)}
              </div>
            </div>
          </div>

          {/* Paused Alert Banner if Paused */}
          {activeSettlement.status === 'Paused' && (
            <div className="p-3.5 rounded-xl bg-risk-high-bg border border-risk-high/40 text-xs text-risk-high flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Automatic Smart Contract Escrow Pause</strong>
                <span className="text-text-primary text-xs leading-relaxed">
                  {activeSettlement.pauseReason}
                </span>
              </div>
            </div>
          )}

          {/* 7-Step Milestone Horizontal Stepper */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-muted block">
              Multi-Tranche Execution Pipeline (30% / 40% / 30%)
            </span>

            <div className="overflow-x-auto pb-4 pt-2">
              <div className="flex items-start min-w-[760px] justify-between relative">
                {/* Connecting horizontal line */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-border-custom -z-0" />

                {activeSettlement.milestones.map((m) => {
                  let stepStatusClass = 'bg-bg-surface text-text-muted border-border-custom';
                  if (m.completed) {
                    stepStatusClass = 'bg-positive text-bg-base border-positive shadow-sm';
                  } else if (m.isCurrent) {
                    stepStatusClass =
                      activeSettlement.status === 'Paused'
                        ? 'bg-risk-high text-bg-base border-risk-high ring-4 ring-risk-high/20 animate-pulse'
                        : 'bg-accent text-bg-base border-accent ring-4 ring-accent/20';
                  }

                  return (
                    <div
                      key={m.step}
                      className="flex flex-col items-center text-center relative z-10 w-28 px-1"
                    >
                      {/* Step Circle */}
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs mb-2 transition-all ${stepStatusClass}`}
                      >
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : m.isCurrent && activeSettlement.status === 'Paused' ? (
                          <PauseCircle className="w-4 h-4" />
                        ) : (
                          m.step
                        )}
                      </div>

                      {/* Step Title */}
                      <span className="text-xs font-bold text-text-primary leading-tight">
                        {m.title}
                      </span>

                      {/* Release Amount if Tranche */}
                      {m.amountReleased && (
                        <span className="text-[10px] font-mono font-semibold text-accent mt-0.5">
                          {formatINR(m.amountReleased, true)}
                        </span>
                      )}

                      {/* Timestamp / Status */}
                      <span className="text-[10px] text-text-muted mt-1 leading-tight">
                        {m.timestamp || (m.completed ? 'Completed' : 'Pending')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Invoice Settlement Browser Table */}
      <div className="fintech-card p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-custom">
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search invoice number, supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
            >
              <option value="ALL">All Statuses</option>
              <option value="On Track">On Track</option>
              <option value="Paused">Paused (On Hold)</option>
            </select>
          </div>

          <span className="text-xs text-text-muted">
            Showing <strong className="text-text-primary">{filteredSettlements.length}</strong> active settlement contracts
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-bg-surface-2/80 border-b border-border-custom text-text-secondary font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Contract / Invoice</th>
                <th className="py-3 px-3">Supplier Name</th>
                <th className="py-3 px-4 text-right">Escrow Amount</th>
                <th className="py-3 px-3 text-center">Progress</th>
                <th className="py-3 px-3 text-center">Settlement Status</th>
                <th className="py-3 px-3">Est. Settlement</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom/60">
              {filteredSettlements.map((s) => {
                const isSelected = s.id === activeSettlement?.id;
                return (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedSettlementId(s.id)}
                    className={`hover:bg-bg-surface-2/80 cursor-pointer transition-colors ${
                      isSelected ? 'bg-accent/10 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-text-primary">{s.invoiceNumber}</div>
                      <div className="text-[10px] text-text-muted font-mono">{s.id}</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-text-primary">{s.supplierName}</div>
                      <div className="text-[10px] text-text-muted font-mono">{s.supplierId}</div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-text-primary">
                      {formatINR(s.totalAmount)}
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono">
                      <span className="px-2 py-0.5 rounded bg-bg-surface-2 border border-border-custom text-text-secondary text-[11px]">
                        Step {s.currentMilestoneIndex} of 7
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          s.status === 'On Track'
                            ? 'bg-positive/15 text-positive'
                            : 'bg-risk-high-bg text-risk-high font-bold'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-text-muted font-mono text-[11px]">
                      {formatDate(s.estimatedSettlementDate)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSettlementId(s.id);
                        }}
                        className="px-2.5 py-1 rounded bg-bg-surface-2 hover:bg-accent hover:text-bg-base border border-border-custom text-xs font-semibold text-text-secondary transition-all"
                      >
                        Track Stepper
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
