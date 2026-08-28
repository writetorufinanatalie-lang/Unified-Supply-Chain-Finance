import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  GitGraph,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Info,
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { RiskBadge } from '../components/common/RiskBadge';
import { formatINR, formatPercent } from '../utils/formatters';

// Custom Supply Chain Node Component
const CustomSupplyNode = ({ data }: { data: any }) => {
  const isSelected = data.isSelected;
  const isSpof = data.isSpof;
  const highlightSpof = data.highlightSpof;

  let borderColor = 'border-border-custom';
  let badgeColor = 'bg-risk-low-bg text-risk-low border-risk-low/40';
  let pulseRing = '';

  if (data.riskLevel === 'High') {
    borderColor = 'border-risk-high/80';
    badgeColor = 'bg-risk-high-bg text-risk-high border-risk-high/40';
    if (highlightSpof && isSpof) {
      pulseRing = 'ring-4 ring-risk-high/50 animate-pulse';
    }
  } else if (data.riskLevel === 'Medium') {
    borderColor = 'border-risk-medium/80';
    badgeColor = 'bg-risk-medium-bg text-risk-medium border-risk-medium/40';
  } else if (data.isBuyer) {
    borderColor = 'border-accent';
    badgeColor = 'bg-accent/20 text-accent border-accent/40';
  }

  return (
    <div
      className={`p-3 rounded-xl bg-bg-surface border-2 ${borderColor} ${pulseRing} shadow-fintech min-w-[200px] max-w-[220px] transition-all cursor-pointer select-none ${
        isSelected ? 'ring-2 ring-accent scale-105 shadow-glow-accent' : 'hover:scale-102'
      }`}
    >
      <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-accent border-2 border-bg-base" />

      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-bg-surface-2 border border-border-custom text-text-muted">
          {data.tierLabel}
        </span>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${badgeColor}`}>
          {data.riskLevel ? `${data.riskLevel} (${data.riskScore})` : 'Anchor'}
        </span>
      </div>

      {/* Node Title */}
      <div className="font-bold text-xs text-text-primary truncate mb-1" title={data.name}>
        {data.name}
      </div>

      {/* Exposure / Country Details */}
      <div className="flex items-center justify-between text-[10px] text-text-secondary pt-1 border-t border-border-custom/50">
        <span>{data.country || 'HQ'}</span>
        <span className="font-mono font-bold text-text-primary">
          {data.exposure ? formatINR(data.exposure, true) : 'Buyer Core'}
        </span>
      </div>

      {isSpof && (
        <div className="mt-1.5 text-[9px] font-bold uppercase text-risk-high flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          <span>Single Point of Failure</span>
        </div>
      )}

      <Handle type="source" position={Position.Right} className="w-2.5 h-2.5 bg-accent border-2 border-bg-base" />
    </div>
  );
};

const nodeTypes = {
  supplyNode: CustomSupplyNode,
};

export const SupplyChainGraph: React.FC = () => {
  const { suppliers, selectSupplier, openCopilotWithQuery } = useAppStore();

  const [highlightSpof, setHighlightSpof] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('SUP-014'); // Default to Hero ABC Components

  // Selected supplier entity
  const activeSupplier = useMemo(() => {
    return suppliers.find((s) => s.id === selectedNodeId) || null;
  }, [suppliers, selectedNodeId]);

  // Construct ReactFlow Nodes
  const initialNodes: Node[] = useMemo(() => {
    const nodes: Node[] = [];

    // 1. Anchor Buyer Node (Column 0, X: 50)
    nodes.push({
      id: 'BUYER-001',
      type: 'supplyNode',
      position: { x: 40, y: 260 },
      data: {
        id: 'BUYER-001',
        name: 'Global Auto Electronics Corp',
        tierLabel: 'BUYER',
        country: 'Global HQ',
        isBuyer: true,
        riskLevel: 'Anchor',
        isSelected: selectedNodeId === 'BUYER-001',
        highlightSpof,
      },
    });

    // 2. Tier 1 Suppliers (Column 1, X: 340)
    const tier1 = suppliers.filter((s) => s.tier === 1);
    tier1.forEach((s, idx) => {
      nodes.push({
        id: s.id,
        type: 'supplyNode',
        position: { x: 340, y: 40 + idx * 110 },
        data: {
          ...s,
          tierLabel: 'TIER 1',
          exposure: s.financing.exposure,
          isSpof: s.isSinglePointOfFailure,
          isSelected: selectedNodeId === s.id,
          highlightSpof,
        },
      });
    });

    // 3. Tier 2 Suppliers (Column 2, X: 640)
    const tier2 = suppliers.filter((s) => s.tier === 2);
    tier2.forEach((s, idx) => {
      nodes.push({
        id: s.id,
        type: 'supplyNode',
        position: { x: 640, y: 40 + idx * 110 },
        data: {
          ...s,
          tierLabel: 'TIER 2',
          exposure: s.financing.exposure,
          isSpof: s.isSinglePointOfFailure,
          isSelected: selectedNodeId === s.id,
          highlightSpof,
        },
      });
    });

    // 4. Tier 3 Suppliers (Column 3, X: 940)
    const tier3 = suppliers.filter((s) => s.tier === 3);
    tier3.forEach((s, idx) => {
      nodes.push({
        id: s.id,
        type: 'supplyNode',
        position: { x: 940, y: 80 + idx * 120 },
        data: {
          ...s,
          tierLabel: 'TIER 3',
          exposure: s.financing.exposure,
          isSpof: s.isSinglePointOfFailure,
          isSelected: selectedNodeId === s.id,
          highlightSpof,
        },
      });
    });

    return nodes;
  }, [suppliers, selectedNodeId, highlightSpof]);

  // Construct ReactFlow Edges
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];

    // Buyer <- Tier 1 edges
    const tier1 = suppliers.filter((s) => s.tier === 1);
    tier1.forEach((t1) => {
      const isCritical = t1.id === 'SUP-014' || t1.riskLevel === 'High';
      edges.push({
        id: `e-buyer-${t1.id}`,
        source: 'BUYER-001',
        target: t1.id,
        animated: isCritical,
        style: {
          stroke: isCritical ? 'var(--risk-high)' : 'var(--accent)',
          strokeWidth: isCritical ? 2.5 : 1.5,
          opacity: 0.8,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isCritical ? 'var(--risk-high)' : 'var(--accent)',
        },
      });
    });

    // Tier 1 <- Tier 2 edges
    const tier2 = suppliers.filter((s) => s.tier === 2);
    tier2.forEach((t2) => {
      t2.suppliesTo?.forEach((targetId) => {
        const isCritical = t2.riskLevel === 'High' || targetId === 'SUP-014';
        edges.push({
          id: `e-${targetId}-${t2.id}`,
          source: targetId,
          target: t2.id,
          animated: isCritical,
          style: {
            stroke: isCritical ? 'var(--risk-high)' : 'var(--text-muted)',
            strokeWidth: isCritical ? 2 : 1,
            strokeDasharray: isCritical ? undefined : '4 4',
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isCritical ? 'var(--risk-high)' : 'var(--text-muted)',
          },
        });
      });
    });

    // Tier 2 <- Tier 3 edges
    const tier3 = suppliers.filter((s) => s.tier === 3);
    tier3.forEach((t3) => {
      t3.suppliesTo?.forEach((targetId) => {
        const isCritical = t3.isSinglePointOfFailure || t3.riskLevel === 'High';
        edges.push({
          id: `e-${targetId}-${t3.id}`,
          source: targetId,
          target: t3.id,
          animated: isCritical,
          style: {
            stroke: isCritical ? 'var(--risk-high)' : 'var(--text-muted)',
            strokeWidth: isCritical ? 2.5 : 1,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isCritical ? 'var(--risk-high)' : 'var(--text-muted)',
          },
        });
      });
    });

    return edges;
  }, [suppliers]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Sync selection & highlight changes to node state
  React.useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    []
  );

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <GitGraph className="w-5 h-5 text-accent" />
            <span>Multi-Tier Supply Chain Network Topology</span>
          </h2>
          <p className="text-xs text-text-secondary">
            Visualizing dependency flow from Anchor Buyer down to Tier-3 raw material lithography
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-surface-2 border border-border-custom cursor-pointer text-xs font-semibold text-text-primary select-none">
            <input
              type="checkbox"
              checked={highlightSpof}
              onChange={(e) => setHighlightSpof(e.target.checked)}
              className="rounded accent-accent"
            />
            <AlertTriangle className="w-3.5 h-3.5 text-risk-high" />
            <span>Highlight Single Points of Failure</span>
          </label>

          <button
            onClick={() => openCopilotWithQuery("Which Tier-3 supplier is the biggest single point of failure?")}
            className="px-3 py-1.5 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Choke-Point Analysis</span>
          </button>
        </div>
      </div>

      {/* Main Canvas + Side Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[650px]">
        {/* Graph Canvas (3 Cols) */}
        <div className="lg:col-span-3 fintech-card p-0 relative overflow-hidden h-full rounded-xl border border-border-custom bg-bg-base">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.3}
            maxZoom={1.5}
          >
            <Background color="var(--border)" gap={16} size={1} />
            <Controls position="top-left" className="bg-bg-surface border border-border-custom rounded-lg fill-text-primary text-text-primary" />
            <MiniMap
              nodeColor={(node) => {
                if (node.data?.riskLevel === 'High') return 'var(--risk-high)';
                if (node.data?.riskLevel === 'Medium') return 'var(--risk-medium)';
                if (node.data?.isBuyer) return 'var(--accent)';
                return 'var(--risk-low)';
              }}
              maskColor="rgba(11, 15, 20, 0.7)"
              className="border border-border-custom rounded-lg overflow-hidden bg-bg-surface"
            />
          </ReactFlow>

          {/* Graph Legend Overlay */}
          <div className="absolute bottom-4 left-4 p-3.5 rounded-xl bg-bg-surface-2/95 backdrop-blur-md border-2 border-border-custom text-text-primary text-xs space-y-2 shadow-2xl z-20 select-none">
            <div className="font-bold text-text-primary uppercase tracking-wider text-[11px] pb-1.5 border-b border-border-custom/80 flex items-center justify-between gap-4">
              <span className="text-text-primary">Topology Legend</span>
              <span className="text-[10px] font-mono font-bold text-accent px-1.5 py-0.2 rounded bg-accent/15 border border-accent/30">
                LIVE
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-text-primary">
              <span className="w-3 h-3 rounded-full bg-risk-high shadow-[0_0_8px_rgba(239,68,68,0.7)] shrink-0" />
              <span className="text-text-primary">High Risk Node / Choke-Point</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-text-primary">
              <span className="w-3 h-3 rounded-full bg-risk-medium shadow-[0_0_8px_rgba(245,158,11,0.7)] shrink-0" />
              <span className="text-text-primary">Medium Risk Node</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-text-primary">
              <span className="w-3 h-3 rounded-full bg-risk-low shadow-[0_0_8px_rgba(34,197,94,0.7)] shrink-0" />
              <span className="text-text-primary">Low Risk Node</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-text-primary">
              <span className="w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_rgba(45,212,191,0.7)] shrink-0" />
              <span className="text-text-primary">Anchor Buyer / Active Flow</span>
            </div>
          </div>
        </div>

        {/* Selected Node Inspector Side Panel (1 Col) */}
        <div className="fintech-card flex flex-col justify-between overflow-y-auto space-y-4 h-full">
          {activeSupplier ? (
            <div className="space-y-4">
              <div className="border-b border-border-custom pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-bg-surface-2 border border-border-custom text-text-muted">
                    TIER {activeSupplier.tier} NODE
                  </span>
                  <RiskBadge level={activeSupplier.riskLevel} score={activeSupplier.riskScore} size="xs" />
                </div>
                <h3 className="text-base font-bold text-text-primary mt-2">
                  {activeSupplier.name}
                </h3>
                <span className="text-xs text-text-muted font-mono">{activeSupplier.id}</span>
              </div>

              {/* Stats Grid */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom flex justify-between">
                  <span className="text-text-secondary">Financing Exposure:</span>
                  <strong className="font-mono text-text-primary">
                    {formatINR(activeSupplier.financing.exposure, true)}
                  </strong>
                </div>

                <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom flex justify-between">
                  <span className="text-text-secondary">Current Rate APR:</span>
                  <strong className="font-mono text-risk-high">
                    {formatPercent(activeSupplier.financing.rate)}
                  </strong>
                </div>

                <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom flex justify-between">
                  <span className="text-text-secondary">Origin Country:</span>
                  <strong className="text-text-primary">{activeSupplier.country}</strong>
                </div>

                <div className="p-2.5 rounded-lg bg-bg-surface-2 border border-border-custom flex justify-between">
                  <span className="text-text-secondary">Criticality Status:</span>
                  <strong className="text-accent">{activeSupplier.criticality} Criticality</strong>
                </div>
              </div>

              {/* Risk Summary */}
              <div className="p-3 rounded-lg bg-bg-surface-2 border border-border-custom text-xs space-y-1">
                <div className="font-semibold text-text-primary">Vulnerability Synopsis</div>
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  {activeSupplier.riskExplanation}
                </p>
              </div>

              {activeSupplier.isSinglePointOfFailure && (
                <div className="p-2.5 rounded-lg bg-risk-high-bg border border-risk-high/40 text-xs text-risk-high space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Single Point of Failure</span>
                  </div>
                  <p className="text-[10px] text-text-primary leading-tight">
                    Sole-source dependency for optical components. A disruption halts downstream Tier-1 assembly.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-text-muted space-y-2">
              <Info className="w-8 h-8 mx-auto text-text-muted opacity-50" />
              <p>Select any node on the graph to inspect upstream and downstream linkages.</p>
            </div>
          )}

          {/* Action Footer */}
          {activeSupplier && (
            <div className="pt-3 border-t border-border-custom space-y-2">
              <button
                onClick={() => selectSupplier(activeSupplier.id)}
                className="w-full py-2.5 px-3 rounded-lg bg-accent text-bg-base font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>View Full 7-Factor Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => openCopilotWithQuery(`Why is ${activeSupplier.name} risky?`)}
                className="w-full py-2 px-3 rounded-lg bg-bg-surface-2 border border-border-custom hover:border-accent text-text-secondary hover:text-text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Simulate Node Disruption</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
