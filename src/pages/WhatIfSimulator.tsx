import React, { useState } from 'react';
import {
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { MetricCounter } from '../components/common/MetricCounter';
import { formatINR, formatPercent } from '../utils/formatters';

export const WhatIfSimulator: React.FC = () => {
  const {
    simulationResult,
    isSimulating,
    runSimulation,
    resetSimulation,
    selectSupplier,
    openCopilotWithQuery,
  } = useAppStore();

  const [scenarioType, setScenarioType] = useState<'Port Closure' | 'Supplier Failure' | 'Currency Shift'>('Port Closure');
  const [targetId, setTargetId] = useState<string>('SHANGHAI-PORT');
  const [magnitude, setMagnitude] = useState<number>(14); // 14 days or 15%

  // Update defaults when scenario type changes
  const handleScenarioChange = (type: 'Port Closure' | 'Supplier Failure' | 'Currency Shift') => {
    setScenarioType(type);
    if (type === 'Port Closure') {
      setTargetId('SHANGHAI-PORT');
      setMagnitude(14);
    } else if (type === 'Supplier Failure') {
      setTargetId('SUP-019');
      setMagnitude(30);
    } else {
      setTargetId('USD-INR');
      setMagnitude(15);
    }
  };

  const handleExecute = () => {
    runSimulation(scenarioType, targetId, magnitude);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-accent" />
            <span>What-If Scenario Stress Testing Simulator</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Simulate shipping route bottlenecks, choke-point outages, and dynamic margin shifts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openCopilotWithQuery("What happens if the Shanghai route is disrupted?")}
            className="px-3 py-2 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask Copilot Scenario Logic</span>
          </button>
        </div>
      </div>

      {/* Simulator Control Cockpit */}
      <div className="fintech-card p-6 space-y-6 border-accent/40 bg-bg-surface-2/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Scenario Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-text-muted block">
              1. Disruption Archetype
            </label>
            <div className="space-y-2">
              {[
                { type: 'Port Closure', label: 'Port Congestion / Closure', desc: 'Shanghai & Ningbo route delay (+14d)' },
                { type: 'Supplier Failure', label: 'Critical Node Insolvency', desc: 'Tier-3 Malacca Lithography outage' },
                { type: 'Currency Shift', label: 'Cross-Border FX Volatility', desc: 'USD/INR +15% exchange shock' },
              ].map((item) => (
                <div
                  key={item.type}
                  onClick={() => handleScenarioChange(item.type as any)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    scenarioType === item.type
                      ? 'bg-accent/15 border-accent text-text-primary shadow-sm'
                      : 'bg-bg-surface border-border-custom text-text-secondary hover:border-text-secondary/40'
                  }`}
                >
                  <div className="font-semibold text-xs text-text-primary">{item.label}</div>
                  <div className="text-[10px] text-text-muted mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Target Entity / Route Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-text-muted block">
              2. Target Choke-Point / Vector
            </label>
            <div className="space-y-3">
              {scenarioType === 'Port Closure' && (
                <div>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-bg-surface border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
                  >
                    <option value="SHANGHAI-PORT">Shanghai Port Terminal & East China Corridor</option>
                    <option value="NINGBO-PORT">Ningbo-Zhoushan Container Terminal</option>
                    <option value="RED-SEA-ROUTE">Bab-el-Mandeb Strait / Red Sea Corridor</option>
                  </select>
                  <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
                    Cascades transit delays to Tier-1 ABC Components and sub-assembly suppliers.
                  </p>
                </div>
              )}

              {scenarioType === 'Supplier Failure' && (
                <div>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-bg-surface border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
                  >
                    <option value="SUP-019">Malacca Strait Core Lithography (Tier-3 SPOF)</option>
                    <option value="SUP-007">Haiphong Rare Earth Minerals (Tier-2 ESG)</option>
                    <option value="SUP-006">Red Sea Transit Logistics (Tier-1 Maritime)</option>
                  </select>
                  <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
                    Evaluates multi-tier propagation and single-point-of-failure exposure.
                  </p>
                </div>
              )}

              {scenarioType === 'Currency Shift' && (
                <div>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-bg-surface border border-border-custom text-xs text-text-primary focus:outline-none focus:border-accent"
                  >
                    <option value="USD-INR">USD / INR Volatility Corridor</option>
                    <option value="EUR-INR">EUR / INR Volatility Corridor</option>
                  </select>
                  <p className="text-[11px] text-text-muted mt-2 leading-relaxed">
                    Evaluates unhedged import trade payables and working capital margin drain.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 3. Magnitude Slider & Trigger */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold uppercase tracking-wider text-text-muted">
                  3. Shock Magnitude
                </label>
                <span className="font-mono font-bold text-accent text-sm">
                  {magnitude} {scenarioType === 'Currency Shift' ? '% shift' : 'days delay'}
                </span>
              </div>
              <input
                type="range"
                min={scenarioType === 'Currency Shift' ? 5 : 5}
                max={scenarioType === 'Currency Shift' ? 35 : 45}
                value={magnitude}
                onChange={(e) => setMagnitude(parseInt(e.target.value))}
                className="w-full h-2 bg-bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] text-text-muted font-mono">
                <span>Min: {scenarioType === 'Currency Shift' ? '5%' : '5 Days'}</span>
                <span>Max: {scenarioType === 'Currency Shift' ? '35%' : '45 Days'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleExecute}
                disabled={isSimulating}
                className="flex-1 py-3 px-4 rounded-xl bg-accent text-bg-base font-bold text-sm hover:bg-accent-hover disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-glow-accent"
              >
                {isSimulating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Recalculating Port Ledger...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-bg-base" />
                    <span>Run Simulation</span>
                  </>
                )}
              </button>

              {simulationResult && (
                <button
                  onClick={resetSimulation}
                  title="Reset Simulator"
                  className="p-3 rounded-xl bg-bg-surface border border-border-custom text-text-secondary hover:text-text-primary transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Output Panel (Animates with counting up numbers over ~600ms) */}
      {simulationResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Header Bar of Result */}
          <div className="fintech-card bg-bg-surface border-accent/60 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase font-bold text-accent font-mono tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Simulation Complete • Stress-Test Output</span>
              </div>
              <h3 className="text-base font-bold text-text-primary mt-0.5">
                {simulationResult.scenarioName}
              </h3>
            </div>
            <div className="text-xs font-mono text-text-muted">
              Live Monte Carlo Calibration
            </div>
          </div>

          {/* 5 Count-Up KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="fintech-card">
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary block mb-1">
                Affected Suppliers
              </span>
              <div className="text-3xl font-bold text-text-primary">
                <MetricCounter value={simulationResult.affectedSuppliersCount} />
              </div>
              <span className="text-[11px] text-risk-high mt-1 block">Tier 1 & Tier 2 Nodes</span>
            </div>

            <div className="fintech-card">
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary block mb-1">
                At-Risk Liquidity
              </span>
              <div className="text-3xl font-bold text-risk-high font-mono">
                <MetricCounter
                  value={simulationResult.atRiskFinancing}
                  formatter={(val) => formatINR(val, true)}
                />
              </div>
              <span className="text-[11px] text-text-muted mt-1 block">Capital exposed</span>
            </div>

            <div className="fintech-card">
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary block mb-1">
                Estimated Latency
              </span>
              <div className="text-3xl font-bold text-text-primary font-mono">
                <MetricCounter value={simulationResult.estimatedDelayDays} suffix=" Days" />
              </div>
              <span className="text-[11px] text-text-muted mt-1 block">Production schedule slip</span>
            </div>

            <div className="fintech-card">
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary block mb-1">
                Risk Score Spike
              </span>
              <div className="text-3xl font-bold text-risk-high font-mono">
                +<MetricCounter value={simulationResult.riskScoreImpact} suffix=" pts" />
              </div>
              <span className="text-[11px] text-risk-high mt-1 block">Rating degradation</span>
            </div>

            <div className="fintech-card">
              <span className="text-xs font-medium uppercase tracking-wide text-text-secondary block mb-1">
                Affected Buyers
              </span>
              <div className="text-3xl font-bold text-text-primary font-mono">
                <MetricCounter value={simulationResult.affectedBuyersCount} />
              </div>
              <span className="text-[11px] text-text-muted mt-1 block">Anchor assemblers</span>
            </div>
          </div>

          {/* Before vs After Hero Supplier Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Risk Score Before -> After */}
            <div className="fintech-card space-y-2 border-border-custom">
              <span className="text-xs font-bold uppercase text-text-muted tracking-wider block">
                Portfolio Risk Score Impact
              </span>
              <div className="flex items-center justify-between text-lg font-bold font-mono">
                <span className="text-positive">{simulationResult.beforeRiskScore} (Healthy)</span>
                <ArrowRight className="w-5 h-5 text-text-muted" />
                <span className="text-risk-high">{simulationResult.afterRiskScore} (High Risk)</span>
              </div>
              <div className="text-[11px] text-text-muted">
                Matches live ABC Components (SUP-014) shift from 78 to 61
              </div>
            </div>

            {/* Rate Before -> After */}
            <div className="fintech-card space-y-2 border-border-custom">
              <span className="text-xs font-bold uppercase text-text-muted tracking-wider block">
                Financing APR Repricing
              </span>
              <div className="flex items-center justify-between text-lg font-bold font-mono">
                <span className="text-text-primary">{formatPercent(simulationResult.beforeFinancingRate)}</span>
                <ArrowRight className="w-5 h-5 text-text-muted" />
                <span className="text-risk-high">{formatPercent(simulationResult.afterFinancingRate)}</span>
              </div>
              <div className="text-[11px] text-text-muted">
                Risk premium reprices +150 bps across active drawn invoices
              </div>
            </div>

            {/* Credit Limit Before -> After */}
            <div className="fintech-card space-y-2 border-border-custom">
              <span className="text-xs font-bold uppercase text-text-muted tracking-wider block">
                Credit Line Contraction
              </span>
              <div className="flex items-center justify-between text-lg font-bold font-mono">
                <span className="text-text-primary">{formatINR(simulationResult.beforeCreditLimit, true)}</span>
                <ArrowRight className="w-5 h-5 text-text-muted" />
                <span className="text-risk-high">{formatINR(simulationResult.afterCreditLimit, true)}</span>
              </div>
              <div className="text-[11px] text-text-muted">
                Automatic liquidity brake activates to preserve default safety
              </div>
            </div>
          </div>

          {/* Generated Plain-Language Narrative Explanation */}
          <div className="fintech-card p-5 bg-bg-surface-2/70 border-accent/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>ChainShield AI Scenario Synthesis</span>
            </div>
            <p className="text-xs text-text-primary leading-relaxed">
              {simulationResult.explanation}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border-custom">
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">Affected Entity:</span>
                <button
                  onClick={() => selectSupplier('SUP-014')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                >
                  <span>ABC Components (SUP-014)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={() => openCopilotWithQuery(`What happens if the ${scenarioType} happens?`)}
                className="px-3 py-1.5 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors"
              >
                Launch Copilot Remediation Playbook
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
