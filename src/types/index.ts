export type RiskLevel = 'Low' | 'Medium' | 'High';

export type RiskFactors = {
  financial: RiskLevel;
  esg: RiskLevel;
  geopolitical: RiskLevel;
  logistics: RiskLevel;
  country: RiskLevel;
  delivery: RiskLevel;
  dependency: RiskLevel;
};

export interface RiskHistoryPoint {
  date: string;
  score: number;
}

export interface SupplierFinancing {
  creditLimit: number;
  previousCreditLimit: number;
  rate: number; // percentage, e.g. 7.0
  previousRate: number; // e.g. 5.5
  riskPremium: number; // e.g. 2.1
  esgIncentive: number; // e.g. 0.4
  exposure: number; // current drawn/at-risk amount in INR
}

export interface SupplierTrust {
  score: number; // 0-100
  relationshipStrength: 'Low' | 'Medium' | 'High';
  poVerified: boolean;
  eligibility: 'Approved' | 'Eligible for Review' | 'Pending Audit' | 'Ineligible';
}

export interface SupplierFX {
  invoiceValue: number;
  currency: string;
  exchangeRate: number;
  inrEquivalent: number;
  fxExposure: number;
  recommendedHedge: number; // percentage e.g. 80
}

export interface Supplier {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  country: string;
  region: string;
  industry: string;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  riskFactors: RiskFactors;
  riskExplanation: string;
  riskHistory: RiskHistoryPoint[];
  financing: SupplierFinancing;
  trust?: SupplierTrust;
  fx: SupplierFX;
  criticality: 'High' | 'Medium' | 'Low';
  financingStatus: 'Active' | 'Under Review' | 'Paused';
  isSinglePointOfFailure?: boolean;
  suppliesTo?: string[]; // IDs of tier above
  suppliedBy?: string[]; // IDs of tier below
}

export interface AlertEvent {
  id: string;
  severity: RiskLevel;
  supplierId: string;
  supplierName: string;
  reason: string;
  potentialImpact: string;
  recommendedAction: string;
  chainReaction: string[];
  timestamp: string;
  category: 'Logistics' | 'Geopolitical' | 'Financial' | 'ESG' | 'Weather';
}

export interface SettlementMilestone {
  step: number;
  title: string;
  description: string;
  completed: boolean;
  isCurrent?: boolean;
  amountReleased?: number; // INR
  timestamp?: string;
}

export interface Settlement {
  id: string;
  invoiceNumber: string;
  supplierId: string;
  supplierName: string;
  buyerName: string;
  totalAmount: number; // INR
  currency: string;
  status: 'On Track' | 'Paused';
  pauseReason?: string;
  currentMilestoneIndex: number;
  milestones: SettlementMilestone[];
  createdAt: string;
  estimatedSettlementDate: string;
}

export interface RiskRegion {
  id: string;
  name: string;
  code: string;
  riskLevel: RiskLevel;
  riskScore: number;
  supplierCount: number;
  activeEventsCount: number;
  financialExposure: number; // INR
  affectedRoutes: string[];
  riskDrivers: string[];
  riskType: 'geopolitical' | 'logistics' | 'weather' | 'ESG' | 'all';
}

export interface WhatIfScenarioInput {
  type: 'Port Closure' | 'Supplier Failure' | 'Currency Shift';
  targetId: string; // Region, Supplier ID, or Currency
  magnitude: number; // Days or Percentage
}

export interface WhatIfSimulationResult {
  scenarioName: string;
  affectedSuppliersCount: number;
  affectedSuppliers: { id: string; name: string; tier: number; riskIncrease: number; exposure: number }[];
  affectedBuyersCount: number;
  atRiskFinancing: number; // INR
  estimatedDelayDays: number;
  riskScoreImpact: number; // +points
  beforeRiskScore: number;
  afterRiskScore: number;
  beforeFinancingRate: number;
  afterFinancingRate: number;
  beforeCreditLimit: number;
  afterCreditLimit: number;
  explanation: string;
}
