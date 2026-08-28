import type { Supplier, AlertEvent, Settlement, RiskRegion, WhatIfScenarioInput, WhatIfSimulationResult } from '../types';

export const mockSuppliers: Supplier[] = [
  // Tier 1 Hero Supplier
  {
    id: "SUP-014",
    name: "ABC Components",
    tier: 1,
    country: "China",
    region: "East Asia",
    industry: "Electronics & PCB Assembly",
    riskScore: 61,
    riskLevel: "High",
    riskFactors: {
      financial: "Low",
      esg: "Low",
      geopolitical: "High",
      logistics: "High",
      country: "Medium",
      delivery: "Medium",
      dependency: "High"
    },
    riskExplanation: "Risk increased because geopolitical risk and port congestion rose while the supplier remains highly dependent on a single shipping route.",
    riskHistory: [
      { date: "2026-06-01", score: 78 },
      { date: "2026-07-01", score: 74 },
      { date: "2026-08-01", score: 61 }
    ],
    financing: {
      creditLimit: 3500000,
      previousCreditLimit: 5000000,
      rate: 7.0,
      previousRate: 5.5,
      riskPremium: 2.1,
      esgIncentive: 0.4,
      exposure: 3800000
    },
    trust: {
      score: 84,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Eligible for Review"
    },
    fx: {
      invoiceValue: 100000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 8600000,
      fxExposure: 210000,
      recommendedHedge: 80
    },
    criticality: "High",
    financingStatus: "Active",
    isSinglePointOfFailure: true,
    suppliesTo: ["BUYER-001"],
    suppliedBy: ["SUP-003", "SUP-007", "SUP-019"]
  },

  // Tier 1 Suppliers
  {
    id: "SUP-001",
    name: "Apex Semiconductors Ltd",
    tier: 1,
    country: "India",
    region: "South Asia",
    industry: "Semiconductor Assembly",
    riskScore: 24,
    riskLevel: "Low",
    riskFactors: {
      financial: "Low",
      esg: "Low",
      geopolitical: "Low",
      logistics: "Low",
      country: "Low",
      delivery: "Low",
      dependency: "Medium"
    },
    riskExplanation: "Exceptional financial stability, multi-source raw material contracts, and zero delivery delays over the last 18 months.",
    riskHistory: [
      { date: "2026-06-01", score: 26 },
      { date: "2026-07-01", score: 25 },
      { date: "2026-08-01", score: 24 }
    ],
    financing: {
      creditLimit: 12000000,
      previousCreditLimit: 10000000,
      rate: 4.8,
      previousRate: 5.0,
      riskPremium: 0.8,
      esgIncentive: 0.6,
      exposure: 8500000
    },
    trust: {
      score: 96,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 125000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 10750000,
      fxExposure: 110000,
      recommendedHedge: 50
    },
    criticality: "High",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["BUYER-001"],
    suppliedBy: ["SUP-010"]
  },
  {
    id: "SUP-002",
    name: "Bharat Dynamics Fabrication",
    tier: 1,
    country: "India",
    region: "South Asia",
    industry: "Heavy Fabrication & Enclosures",
    riskScore: 45,
    riskLevel: "Medium",
    riskFactors: {
      financial: "Medium",
      esg: "Low",
      geopolitical: "Low",
      logistics: "Medium",
      country: "Low",
      delivery: "Medium",
      dependency: "Low"
    },
    riskExplanation: "Stable domestic supply chain with occasional freight delays along western transit corridors; moderate debt service ratio.",
    riskHistory: [
      { date: "2026-06-01", score: 42 },
      { date: "2026-07-01", score: 44 },
      { date: "2026-08-01", score: 45 }
    ],
    financing: {
      creditLimit: 6000000,
      previousCreditLimit: 6000000,
      rate: 5.8,
      previousRate: 5.7,
      riskPremium: 1.4,
      esgIncentive: 0.3,
      exposure: 4200000
    },
    trust: {
      score: 88,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 50000,
      currency: "EUR",
      exchangeRate: 93.5,
      inrEquivalent: 4675000,
      fxExposure: 85000,
      recommendedHedge: 60
    },
    criticality: "Medium",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["BUYER-001"],
    suppliedBy: ["SUP-008", "SUP-011"]
  },
  {
    id: "SUP-004",
    name: "Vietnam Precision Molding",
    tier: 1,
    country: "Vietnam",
    region: "Southeast Asia",
    industry: "Precision Engineering",
    riskScore: 28,
    riskLevel: "Low",
    riskFactors: {
      financial: "Low",
      esg: "Low",
      geopolitical: "Low",
      logistics: "Low",
      country: "Low",
      delivery: "Low",
      dependency: "Low"
    },
    riskExplanation: "Strong operational cash flow, modern ISO-certified facilities, diversified shipping channels via Da Nang and Haiphong ports.",
    riskHistory: [
      { date: "2026-06-01", score: 30 },
      { date: "2026-07-01", score: 29 },
      { date: "2026-08-01", score: 28 }
    ],
    financing: {
      creditLimit: 4500000,
      previousCreditLimit: 4000000,
      rate: 5.1,
      previousRate: 5.3,
      riskPremium: 0.9,
      esgIncentive: 0.5,
      exposure: 3100000
    },
    trust: {
      score: 92,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 40000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 3440000,
      fxExposure: 45000,
      recommendedHedge: 40
    },
    criticality: "Medium",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["BUYER-001"],
    suppliedBy: ["SUP-012"]
  },
  {
    id: "SUP-005",
    name: "Dhaka Industrial Textiles",
    tier: 1,
    country: "Bangladesh",
    region: "South Asia",
    industry: "Protective Fabrics & Insulation",
    riskScore: 52,
    riskLevel: "Medium",
    riskFactors: {
      financial: "Medium",
      esg: "Medium",
      geopolitical: "Medium",
      logistics: "High",
      country: "Medium",
      delivery: "Medium",
      dependency: "Medium"
    },
    riskExplanation: "Elevated monsoon weather delays and port dwell times at Chittagong Port offset by strong buyer demand.",
    riskHistory: [
      { date: "2026-06-01", score: 48 },
      { date: "2026-07-01", score: 50 },
      { date: "2026-08-01", score: 52 }
    ],
    financing: {
      creditLimit: 3000000,
      previousCreditLimit: 3500000,
      rate: 6.4,
      previousRate: 6.0,
      riskPremium: 1.8,
      esgIncentive: 0.2,
      exposure: 1900000
    },
    trust: {
      score: 81,
      relationshipStrength: "Medium",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 25000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 2150000,
      fxExposure: 52000,
      recommendedHedge: 70
    },
    criticality: "Low",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["BUYER-001"],
    suppliedBy: ["SUP-009"]
  },
  {
    id: "SUP-006",
    name: "Red Sea Transit Logistics",
    tier: 1,
    country: "High-Risk Region",
    region: "High-Risk Corridor",
    industry: "Maritime Logistics & Cargo",
    riskScore: 79,
    riskLevel: "High",
    riskFactors: {
      financial: "Medium",
      esg: "Medium",
      geopolitical: "High",
      logistics: "High",
      country: "High",
      delivery: "High",
      dependency: "High"
    },
    riskExplanation: "Severe maritime insurance premiums, route diversions around Cape of Good Hope, and high geopolitical disruption risks.",
    riskHistory: [
      { date: "2026-06-01", score: 65 },
      { date: "2026-07-01", score: 72 },
      { date: "2026-08-01", score: 79 }
    ],
    financing: {
      creditLimit: 4000000,
      previousCreditLimit: 8000000,
      rate: 8.9,
      previousRate: 6.2,
      riskPremium: 3.5,
      esgIncentive: 0.1,
      exposure: 6400000
    },
    trust: {
      score: 64,
      relationshipStrength: "Medium",
      poVerified: true,
      eligibility: "Pending Audit"
    },
    fx: {
      invoiceValue: 80000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 6880000,
      fxExposure: 320000,
      recommendedHedge: 90
    },
    criticality: "High",
    financingStatus: "Under Review",
    isSinglePointOfFailure: true,
    suppliesTo: ["BUYER-001"]
  },
  {
    id: "SUP-018",
    name: "Shenzhen Optoelectronics",
    tier: 1,
    country: "China",
    region: "East Asia",
    industry: "Display & LED Arrays",
    riskScore: 49,
    riskLevel: "Medium",
    riskFactors: {
      financial: "Low",
      esg: "Low",
      geopolitical: "High",
      logistics: "Medium",
      country: "Medium",
      delivery: "Low",
      dependency: "Medium"
    },
    riskExplanation: "High technological output and strong balance sheet tempered by export control reviews and tariffs.",
    riskHistory: [
      { date: "2026-06-01", score: 45 },
      { date: "2026-07-01", score: 47 },
      { date: "2026-08-01", score: 49 }
    ],
    financing: {
      creditLimit: 7500000,
      previousCreditLimit: 7500000,
      rate: 6.1,
      previousRate: 5.9,
      riskPremium: 1.5,
      esgIncentive: 0.4,
      exposure: 5500000
    },
    trust: {
      score: 87,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 70000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 6020000,
      fxExposure: 140000,
      recommendedHedge: 65
    },
    criticality: "Medium",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["BUYER-001"]
  },

  // Tier 2 Suppliers
  {
    id: "SUP-003",
    name: "Ningbo Micro-Sensors Co.",
    tier: 2,
    country: "China",
    region: "East Asia",
    industry: "MEMS Sensor Components",
    riskScore: 68,
    riskLevel: "High",
    riskFactors: {
      financial: "Medium",
      esg: "Low",
      geopolitical: "High",
      logistics: "High",
      country: "Medium",
      delivery: "High",
      dependency: "High"
    },
    riskExplanation: "Crucial sub-assembly feeder for ABC Components; severely bottlenecked by East China Sea customs backlog.",
    riskHistory: [
      { date: "2026-06-01", score: 55 },
      { date: "2026-07-01", score: 62 },
      { date: "2026-08-01", score: 68 }
    ],
    financing: {
      creditLimit: 3000000,
      previousCreditLimit: 4000000,
      rate: 7.6,
      previousRate: 6.1,
      riskPremium: 2.4,
      esgIncentive: 0.3,
      exposure: 2400000
    },
    trust: {
      score: 79,
      relationshipStrength: "Medium",
      poVerified: true,
      eligibility: "Eligible for Review"
    },
    fx: {
      invoiceValue: 30000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 2580000,
      fxExposure: 78000,
      recommendedHedge: 85
    },
    criticality: "High",
    financingStatus: "Active",
    isSinglePointOfFailure: true,
    suppliesTo: ["SUP-014"],
    suppliedBy: ["SUP-019"]
  },
  {
    id: "SUP-007",
    name: "Haiphong Rare Earth Minerals",
    tier: 2,
    country: "Vietnam",
    region: "Southeast Asia",
    industry: "Refined Minerals & Magnets",
    riskScore: 72,
    riskLevel: "High",
    riskFactors: {
      financial: "Medium",
      esg: "High",
      geopolitical: "Medium",
      logistics: "High",
      country: "Low",
      delivery: "High",
      dependency: "High"
    },
    riskExplanation: "High carbon footprint and water usage flags triggering ESG penalty; supplies essential neodymium alloys to Tier 1.",
    riskHistory: [
      { date: "2026-06-01", score: 62 },
      { date: "2026-07-01", score: 67 },
      { date: "2026-08-01", score: 72 }
    ],
    financing: {
      creditLimit: 4000000,
      previousCreditLimit: 5000000,
      rate: 7.9,
      previousRate: 6.4,
      riskPremium: 2.7,
      esgIncentive: 0.0,
      exposure: 3600000
    },
    trust: {
      score: 74,
      relationshipStrength: "Medium",
      poVerified: true,
      eligibility: "Eligible for Review"
    },
    fx: {
      invoiceValue: 45000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 3870000,
      fxExposure: 120000,
      recommendedHedge: 80
    },
    criticality: "High",
    financingStatus: "Under Review",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-014"],
    suppliedBy: ["SUP-017"]
  },
  {
    id: "SUP-008",
    name: "Gujarat Specialty Chemicals",
    tier: 2,
    country: "India",
    region: "South Asia",
    industry: "Polymer Coatings & Resins",
    riskScore: 22,
    riskLevel: "Low",
    riskFactors: {
      financial: "Low",
      esg: "Low",
      geopolitical: "Low",
      logistics: "Low",
      country: "Low",
      delivery: "Low",
      dependency: "Low"
    },
    riskExplanation: "Zero supply chain bottlenecks, ISO 14001 green chemistry certification, seamless domestic rail access.",
    riskHistory: [
      { date: "2026-06-01", score: 23 },
      { date: "2026-07-01", score: 22 },
      { date: "2026-08-01", score: 22 }
    ],
    financing: {
      creditLimit: 5000000,
      previousCreditLimit: 4500000,
      rate: 4.6,
      previousRate: 4.8,
      riskPremium: 0.7,
      esgIncentive: 0.7,
      exposure: 2800000
    },
    trust: {
      score: 95,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 35000,
      currency: "INR",
      exchangeRate: 1,
      inrEquivalent: 2800000,
      fxExposure: 0,
      recommendedHedge: 0
    },
    criticality: "Low",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-002"]
  },
  {
    id: "SUP-009",
    name: "Chittagong Polymer Resins",
    tier: 2,
    country: "Bangladesh",
    region: "South Asia",
    industry: "Synthetic Resins",
    riskScore: 48,
    riskLevel: "Medium",
    riskFactors: {
      financial: "Medium",
      esg: "Medium",
      geopolitical: "Low",
      logistics: "Medium",
      country: "Medium",
      delivery: "Medium",
      dependency: "Low"
    },
    riskExplanation: "Reliable synthetic polymer output but vulnerable to domestic power grid fluctuations during summer peak.",
    riskHistory: [
      { date: "2026-06-01", score: 46 },
      { date: "2026-07-01", score: 47 },
      { date: "2026-08-01", score: 48 }
    ],
    financing: {
      creditLimit: 2500000,
      previousCreditLimit: 2500000,
      rate: 6.2,
      previousRate: 6.0,
      riskPremium: 1.6,
      esgIncentive: 0.3,
      exposure: 1500000
    },
    trust: {
      score: 83,
      relationshipStrength: "Medium",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 20000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 1720000,
      fxExposure: 38000,
      recommendedHedge: 60
    },
    criticality: "Low",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-005"],
    suppliedBy: ["SUP-016"]
  },
  {
    id: "SUP-010",
    name: "Dongguan Silicon Wafers",
    tier: 2,
    country: "China",
    region: "East Asia",
    industry: "Silicon Ingot & Wafer Sawing",
    riskScore: 44,
    riskLevel: "Medium",
    riskFactors: {
      financial: "Low",
      esg: "Medium",
      geopolitical: "High",
      logistics: "Low",
      country: "Medium",
      delivery: "Low",
      dependency: "High"
    },
    riskExplanation: "High production purity and yield, though high energy tariffs slightly increase operational cost volatility.",
    riskHistory: [
      { date: "2026-06-01", score: 41 },
      { date: "2026-07-01", score: 43 },
      { date: "2026-08-01", score: 44 }
    ],
    financing: {
      creditLimit: 6000000,
      previousCreditLimit: 6000000,
      rate: 5.7,
      previousRate: 5.5,
      riskPremium: 1.3,
      esgIncentive: 0.3,
      exposure: 3900000
    },
    trust: {
      score: 89,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 50000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 4300000,
      fxExposure: 95000,
      recommendedHedge: 70
    },
    criticality: "Medium",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-001"],
    suppliedBy: ["SUP-013"]
  },
  {
    id: "SUP-011",
    name: "Tamil Nadu Precision Alloys",
    tier: 2,
    country: "India",
    region: "South Asia",
    industry: "Specialty Metallurgy",
    riskScore: 19,
    riskLevel: "Low",
    riskFactors: {
      financial: "Low",
      esg: "Low",
      geopolitical: "Low",
      logistics: "Low",
      country: "Low",
      delivery: "Low",
      dependency: "Low"
    },
    riskExplanation: "Top tier Indian metallurgist with long-term sovereign raw material allocations and 99.4% on-time dispatch.",
    riskHistory: [
      { date: "2026-06-01", score: 20 },
      { date: "2026-07-01", score: 19 },
      { date: "2026-08-01", score: 19 }
    ],
    financing: {
      creditLimit: 5500000,
      previousCreditLimit: 5000000,
      rate: 4.5,
      previousRate: 4.6,
      riskPremium: 0.6,
      esgIncentive: 0.6,
      exposure: 3200000
    },
    trust: {
      score: 97,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 40000,
      currency: "INR",
      exchangeRate: 1,
      inrEquivalent: 3200000,
      fxExposure: 0,
      recommendedHedge: 0
    },
    criticality: "Low",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-002"],
    suppliedBy: ["SUP-015"]
  },
  {
    id: "SUP-012",
    name: "Mekong Packaging Solutions",
    tier: 2,
    country: "Vietnam",
    region: "Southeast Asia",
    industry: "Biodegradable Industrial Packaging",
    riskScore: 25,
    riskLevel: "Low",
    riskFactors: {
      financial: "Low",
      esg: "Low",
      geopolitical: "Low",
      logistics: "Low",
      country: "Low",
      delivery: "Low",
      dependency: "Low"
    },
    riskExplanation: "Eco-certified packaging producer with zero debt and automated rapid order fulfillment.",
    riskHistory: [
      { date: "2026-06-01", score: 27 },
      { date: "2026-07-01", score: 26 },
      { date: "2026-08-01", score: 25 }
    ],
    financing: {
      creditLimit: 2000000,
      previousCreditLimit: 1800000,
      rate: 4.9,
      previousRate: 5.1,
      riskPremium: 0.8,
      esgIncentive: 0.8,
      exposure: 1200000
    },
    trust: {
      score: 93,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 15000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 1290000,
      fxExposure: 18000,
      recommendedHedge: 30
    },
    criticality: "Low",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-004"]
  },

  // Tier 3 Suppliers (Deep Tier)
  {
    id: "SUP-019",
    name: "Malacca Strait Core Lithography",
    tier: 3,
    country: "High-Risk Region",
    region: "High-Risk Corridor",
    industry: "Specialized Lithography Optics",
    riskScore: 83,
    riskLevel: "High",
    riskFactors: {
      financial: "Medium",
      esg: "Low",
      geopolitical: "High",
      logistics: "High",
      country: "High",
      delivery: "High",
      dependency: "High"
    },
    riskExplanation: "Sole-source provider for extreme precision laser lenses. Any choke-point delay in the Malacca Strait cascades to 4 Tier-1 electronics assemblies.",
    riskHistory: [
      { date: "2026-06-01", score: 70 },
      { date: "2026-07-01", score: 76 },
      { date: "2026-08-01", score: 83 }
    ],
    financing: {
      creditLimit: 3000000,
      previousCreditLimit: 6000000,
      rate: 9.2,
      previousRate: 6.8,
      riskPremium: 3.8,
      esgIncentive: 0.1,
      exposure: 4800000
    },
    trust: {
      score: 71,
      relationshipStrength: "Medium",
      poVerified: true,
      eligibility: "Eligible for Review"
    },
    fx: {
      invoiceValue: 60000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 5160000,
      fxExposure: 260000,
      recommendedHedge: 95
    },
    criticality: "High",
    financingStatus: "Under Review",
    isSinglePointOfFailure: true,
    suppliesTo: ["SUP-003", "SUP-014"]
  },
  {
    id: "SUP-013",
    name: "Yunnan Quartzite Mining Corp",
    tier: 3,
    country: "China",
    region: "East Asia",
    industry: "High Purity Quartzite Extraction",
    riskScore: 65,
    riskLevel: "High",
    riskFactors: {
      financial: "Low",
      esg: "High",
      geopolitical: "High",
      logistics: "Medium",
      country: "Medium",
      delivery: "Medium",
      dependency: "High"
    },
    riskExplanation: "Heavy environmental audits by local provincial authorities causing intermittent 10-day processing pauses.",
    riskHistory: [
      { date: "2026-06-01", score: 58 },
      { date: "2026-07-01", score: 62 },
      { date: "2026-08-01", score: 65 }
    ],
    financing: {
      creditLimit: 3000000,
      previousCreditLimit: 3500000,
      rate: 7.3,
      previousRate: 6.2,
      riskPremium: 2.2,
      esgIncentive: 0.0,
      exposure: 2200000
    },
    trust: {
      score: 76,
      relationshipStrength: "Medium",
      poVerified: true,
      eligibility: "Eligible for Review"
    },
    fx: {
      invoiceValue: 28000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 2408000,
      fxExposure: 65000,
      recommendedHedge: 75
    },
    criticality: "Medium",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-010"]
  },
  {
    id: "SUP-015",
    name: "Karnataka Cobalt Refineries",
    tier: 3,
    country: "India",
    region: "South Asia",
    industry: "Refined Cobalt Salts",
    riskScore: 29,
    riskLevel: "Low",
    riskFactors: {
      financial: "Low",
      esg: "Low",
      geopolitical: "Low",
      logistics: "Low",
      country: "Low",
      delivery: "Low",
      dependency: "Low"
    },
    riskExplanation: "Strong balance sheet, ethical conflict-free mineral sourcing accreditation, direct rail connection to Chennai port.",
    riskHistory: [
      { date: "2026-06-01", score: 32 },
      { date: "2026-07-01", score: 30 },
      { date: "2026-08-01", score: 29 }
    ],
    financing: {
      creditLimit: 3000000,
      previousCreditLimit: 2500000,
      rate: 5.2,
      previousRate: 5.4,
      riskPremium: 0.9,
      esgIncentive: 0.5,
      exposure: 1800000
    },
    trust: {
      score: 91,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 22000,
      currency: "INR",
      exchangeRate: 1,
      inrEquivalent: 1800000,
      fxExposure: 0,
      recommendedHedge: 0
    },
    criticality: "Low",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-011"]
  },
  {
    id: "SUP-016",
    name: "Sylhet Natural Gas Processing",
    tier: 3,
    country: "Bangladesh",
    region: "South Asia",
    industry: "Industrial Gas Feedstock",
    riskScore: 54,
    riskLevel: "Medium",
    riskFactors: {
      financial: "Medium",
      esg: "Medium",
      geopolitical: "Low",
      logistics: "Medium",
      country: "Medium",
      delivery: "High",
      dependency: "Medium"
    },
    riskExplanation: "Pipeline maintenance schedules periodically reduce feedstock pressure to downstream Tier-2 polymer makers.",
    riskHistory: [
      { date: "2026-06-01", score: 50 },
      { date: "2026-07-01", score: 52 },
      { date: "2026-08-01", score: 54 }
    ],
    financing: {
      creditLimit: 2000000,
      previousCreditLimit: 2200000,
      rate: 6.7,
      previousRate: 6.3,
      riskPremium: 1.9,
      esgIncentive: 0.2,
      exposure: 1400000
    },
    trust: {
      score: 80,
      relationshipStrength: "Medium",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 18000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 1548000,
      fxExposure: 42000,
      recommendedHedge: 60
    },
    criticality: "Low",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-009"]
  },
  {
    id: "SUP-017",
    name: "Da Nang Solder Materials",
    tier: 3,
    country: "Vietnam",
    region: "Southeast Asia",
    industry: "Lead-Free Solder Paste",
    riskScore: 26,
    riskLevel: "Low",
    riskFactors: {
      financial: "Low",
      esg: "Low",
      geopolitical: "Low",
      logistics: "Low",
      country: "Low",
      delivery: "Low",
      dependency: "Low"
    },
    riskExplanation: "High-spec RoHS compliant chemical metallurgy with redundant shipping nodes across Central Vietnam.",
    riskHistory: [
      { date: "2026-06-01", score: 28 },
      { date: "2026-07-01", score: 27 },
      { date: "2026-08-01", score: 26 }
    ],
    financing: {
      creditLimit: 1800000,
      previousCreditLimit: 1500000,
      rate: 5.0,
      previousRate: 5.2,
      riskPremium: 0.8,
      esgIncentive: 0.5,
      exposure: 1100000
    },
    trust: {
      score: 94,
      relationshipStrength: "High",
      poVerified: true,
      eligibility: "Approved"
    },
    fx: {
      invoiceValue: 14000,
      currency: "USD",
      exchangeRate: 86,
      inrEquivalent: 1204000,
      fxExposure: 19000,
      recommendedHedge: 35
    },
    criticality: "Low",
    financingStatus: "Active",
    isSinglePointOfFailure: false,
    suppliesTo: ["SUP-007"]
  }
];

// Chronological Alert Feed
export const mockAlerts: AlertEvent[] = [
  {
    id: "EVT-002",
    severity: "High",
    supplierId: "SUP-014",
    supplierName: "ABC Components",
    category: "Logistics",
    reason: "Port congestion increased 40% over the past 2 weeks on the primary shipping route.",
    potentialImpact: "₹3.8 Cr financing exposure at risk within 30 days.",
    recommendedAction: "Review financing exposure and evaluate alternate suppliers.",
    chainReaction: ["Port Risk ↑", "Logistics Risk ↑", "Supplier Risk ↑", "Financial Exposure ↑"],
    timestamp: "2026-08-20T09:15:00Z"
  },
  {
    id: "EVT-004",
    severity: "High",
    supplierId: "SUP-019",
    supplierName: "Malacca Strait Core Lithography",
    category: "Geopolitical",
    reason: "Naval patrol density and regulatory inspections escalated transit dwell times by 6.2 days.",
    potentialImpact: "₹4.8 Cr deep-tier financing exposure impacted; critical single-point of failure for 4 assemblies.",
    recommendedAction: "Activate buffer stock reserve and invoke secondary optics qualification protocol.",
    chainReaction: ["Transit Security ↑", "Customs Delay ↑", "Tier-3 Bottleneck ↑", "Assembly Stoppage ↑"],
    timestamp: "2026-08-21T14:30:00Z"
  },
  {
    id: "EVT-006",
    severity: "High",
    supplierId: "SUP-006",
    supplierName: "Red Sea Transit Logistics",
    category: "Geopolitical",
    reason: "War-risk maritime insurance surcharges spiked 115% for Bab-el-Mandeb passage.",
    potentialImpact: "₹6.4 Cr in active transit trade receivables subject to 12-day rerouting delay.",
    recommendedAction: "Hedge carrier contracts and transition eligible invoices to Cape route escrow terms.",
    chainReaction: ["Regional Conflict ↑", "Freight Surcharge ↑", "Cash Cycle Delay ↑", "Working Capital Strain ↑"],
    timestamp: "2026-08-22T08:00:00Z"
  },
  {
    id: "EVT-007",
    severity: "High",
    supplierId: "SUP-007",
    supplierName: "Haiphong Rare Earth Minerals",
    category: "ESG",
    reason: "Provincial water conservation audit identified effluent runoff exceedance; temporary 30% capacity curb.",
    potentialImpact: "₹3.6 Cr financing under ESG review; rate premium adjusted +0.8%.",
    recommendedAction: "Audit remediation timeline before disbursing next tranche.",
    chainReaction: ["ESG Violation ↑", "Regulatory Fine ↑", "Output Reduction ↑", "Credit Premium Hike ↑"],
    timestamp: "2026-08-23T11:45:00Z"
  },
  {
    id: "EVT-003",
    severity: "Medium",
    supplierId: "SUP-003",
    supplierName: "Ningbo Micro-Sensors Co.",
    category: "Logistics",
    reason: "Customs electronic clearance system migration caused 72-hour feeder vessel delay.",
    potentialImpact: "₹2.4 Cr component shipment batch delayed for ABC Components.",
    recommendedAction: "Notify Tier-1 assembly planner and monitor Ningbo port throughput.",
    chainReaction: ["IT Migration ↑", "Customs Queue ↑", "Feeder Delay ↑", "Buffer Drawdown ↑"],
    timestamp: "2026-08-24T16:10:00Z"
  },
  {
    id: "EVT-005",
    severity: "Medium",
    supplierId: "SUP-005",
    supplierName: "Dhaka Industrial Textiles",
    category: "Weather",
    reason: "Monsoon flooding affected feeder highway from Gazipur industrial zone to Chittagong.",
    potentialImpact: "₹1.9 Cr export batch scheduled for dispatch delayed by 4 business days.",
    recommendedAction: "Authorize dry-port rail diversion via inland container depot.",
    chainReaction: ["Monsoon Surge ↑", "Highway Inundation ↑", "Transit Latency ↑", "Settlement Shift ↑"],
    timestamp: "2026-08-25T10:20:00Z"
  },
  {
    id: "EVT-001",
    severity: "Low",
    supplierId: "SUP-001",
    supplierName: "Apex Semiconductors Ltd",
    category: "Financial",
    reason: "Quarterly audited debt-to-equity ratio improved to 0.42; credit limit expanded by ₹20L.",
    potentialImpact: "Financing rate discounted by 20 bps; additional working capital unlocked.",
    recommendedAction: "Auto-approve expanded credit line of ₹1.2 Cr.",
    chainReaction: ["Solvency Boost ↑", "Credit Rating ↑", "Financing Spread ↓", "Working Capital Velocity ↑"],
    timestamp: "2026-08-26T13:00:00Z"
  }
];

// Smart Contract Settlements
export const mockSettlements: Settlement[] = [
  {
    id: "STL-9041",
    invoiceNumber: "INV-2026-8842",
    supplierId: "SUP-014",
    supplierName: "ABC Components",
    buyerName: "Global Auto Electronics Corp",
    totalAmount: 8600000,
    currency: "INR",
    status: "Paused",
    pauseReason: "Customs hold at Shanghai Port due to missing phytosanitary seal on container batch #C-881.",
    currentMilestoneIndex: 3,
    createdAt: "2026-08-10",
    estimatedSettlementDate: "2026-09-05",
    milestones: [
      { step: 1, title: "Invoice Created", description: "Smart contract initialized and PO verified on ledger", completed: true, timestamp: "2026-08-10 09:30" },
      { step: 2, title: "Dispatch Verified", description: "Bill of Lading #BOL-7731 authenticated via IoT sensor", completed: true, timestamp: "2026-08-14 14:15" },
      { step: 3, title: "30% Released", description: "₹25,80,000 disbursed to supplier escrow account", completed: true, amountReleased: 2580000, timestamp: "2026-08-14 15:00" },
      { step: 4, title: "Customs Cleared", description: "Awaiting electronic customs port clearance verification", completed: false, isCurrent: true, timestamp: "Pending Verification" },
      { step: 5, title: "40% Released", description: "₹34,40,000 scheduled tranche upon customs seal confirmation", completed: false, amountReleased: 3440000 },
      { step: 6, title: "Final Delivery Verified", description: "Buyer warehouse optical gate scan & quality inspection", completed: false },
      { step: 7, title: "30% Released", description: "₹25,80,000 final settlement tranche and contract closeout", completed: false, amountReleased: 2580000 }
    ]
  },
  {
    id: "STL-9042",
    invoiceNumber: "INV-2026-8849",
    supplierId: "SUP-001",
    supplierName: "Apex Semiconductors Ltd",
    buyerName: "Global Auto Electronics Corp",
    totalAmount: 10750000,
    currency: "INR",
    status: "On Track",
    currentMilestoneIndex: 5,
    createdAt: "2026-08-05",
    estimatedSettlementDate: "2026-08-30",
    milestones: [
      { step: 1, title: "Invoice Created", description: "Smart contract initialized and PO verified", completed: true, timestamp: "2026-08-05 10:00" },
      { step: 2, title: "Dispatch Verified", description: "Express air cargo dispatch authenticated", completed: true, timestamp: "2026-08-08 11:20" },
      { step: 3, title: "30% Released", description: "₹32,25,000 disbursed automatically", completed: true, amountReleased: 3225000, timestamp: "2026-08-08 11:45" },
      { step: 4, title: "Customs Cleared", description: "Bengaluru air cargo customs stamp verified", completed: true, timestamp: "2026-08-18 16:30" },
      { step: 5, title: "40% Released", description: "₹43,00,000 tranche successfully disbursed", completed: true, amountReleased: 4300000, timestamp: "2026-08-18 17:00" },
      { step: 6, title: "Final Delivery Verified", description: "Incoming dock inspection in progress", completed: false, isCurrent: true, timestamp: "In Progress" },
      { step: 7, title: "30% Released", description: "₹32,25,000 final release upon signoff", completed: false, amountReleased: 3225000 }
    ]
  },
  {
    id: "STL-9043",
    invoiceNumber: "INV-2026-8855",
    supplierId: "SUP-002",
    supplierName: "Bharat Dynamics Fabrication",
    buyerName: "Global Auto Electronics Corp",
    totalAmount: 4675000,
    currency: "INR",
    status: "On Track",
    currentMilestoneIndex: 2,
    createdAt: "2026-08-20",
    estimatedSettlementDate: "2026-09-12",
    milestones: [
      { step: 1, title: "Invoice Created", description: "Smart contract created and PO verified", completed: true, timestamp: "2026-08-20 08:30" },
      { step: 2, title: "Dispatch Verified", description: "GPS freight tracking initialized", completed: true, timestamp: "2026-08-22 13:00" },
      { step: 3, title: "30% Released", description: "₹14,02,500 initial release completed", completed: true, amountReleased: 1402500, timestamp: "2026-08-22 13:30" },
      { step: 4, title: "Customs Cleared", description: "Interstate GST e-Way bill verified", completed: false, isCurrent: true, timestamp: "In Transit" },
      { step: 5, title: "40% Released", description: "₹18,70,000 scheduled release", completed: false, amountReleased: 1870000 },
      { step: 6, title: "Final Delivery Verified", description: "Assembly plant delivery verification", completed: false },
      { step: 7, title: "30% Released", description: "₹14,02,500 final settlement", completed: false, amountReleased: 1402500 }
    ]
  },
  {
    id: "STL-9044",
    invoiceNumber: "INV-2026-8861",
    supplierId: "SUP-006",
    supplierName: "Red Sea Transit Logistics",
    buyerName: "Global Auto Electronics Corp",
    totalAmount: 6880000,
    currency: "INR",
    status: "Paused",
    pauseReason: "Carrier diverted around Cape of Good Hope; milestone timeline extended by 14 days.",
    currentMilestoneIndex: 1,
    createdAt: "2026-08-15",
    estimatedSettlementDate: "2026-09-28",
    milestones: [
      { step: 1, title: "Invoice Created", description: "Maritime freight smart contract initialized", completed: true, timestamp: "2026-08-15 11:00" },
      { step: 2, title: "Dispatch Verified", description: "Vessel departed origin port", completed: true, timestamp: "2026-08-17 06:00" },
      { step: 3, title: "30% Released", description: "₹20,64,000 initial release", completed: true, amountReleased: 2064000, timestamp: "2026-08-17 07:00" },
      { step: 4, title: "Customs Cleared", description: "Awaiting vessel arrival at destination port", completed: false, isCurrent: true, timestamp: "Rerouted" },
      { step: 5, title: "40% Released", description: "₹27,52,000 scheduled release", completed: false, amountReleased: 2752000 },
      { step: 6, title: "Final Delivery Verified", description: "Terminal gate delivery confirmation", completed: false },
      { step: 7, title: "30% Released", description: "₹20,64,000 final settlement", completed: false, amountReleased: 2064000 }
    ]
  }
];

// Global Risk Heatmap Regions
export const mockRiskRegions: RiskRegion[] = [
  {
    id: "REG-EA",
    name: "East Asia (China / Taiwan Corridor)",
    code: "CHN",
    riskLevel: "High",
    riskScore: 64,
    supplierCount: 4,
    activeEventsCount: 3,
    financialExposure: 15600000,
    affectedRoutes: ["Shanghai -> Mumbai", "Ningbo -> Chennai", "Shenzhen -> Singapore"],
    riskDrivers: ["Port congestion at Shanghai/Ningbo", "Export control scrutinies", "Semiconductor trade friction"],
    riskType: "logistics"
  },
  {
    id: "REG-HRC",
    name: "High-Risk Maritime Corridor (Malacca & Red Sea)",
    code: "HRC",
    riskLevel: "High",
    riskScore: 81,
    supplierCount: 2,
    activeEventsCount: 2,
    financialExposure: 11200000,
    affectedRoutes: ["Strait of Malacca Transit", "Bab-el-Mandeb Strait", "Suez Canal Bypass"],
    riskDrivers: ["Choke-point naval inspections", "War-risk insurance hikes (+115%)", "Single-point-of-failure dependencies"],
    riskType: "geopolitical"
  },
  {
    id: "REG-SA",
    name: "South Asia (India & Bangladesh)",
    code: "IND",
    riskLevel: "Medium",
    riskScore: 36,
    supplierCount: 7,
    activeEventsCount: 2,
    financialExposure: 22100000,
    affectedRoutes: ["Western Dedicated Freight Corridor", "Chittagong -> Kolkata", "Bengaluru Air Cargo"],
    riskDrivers: ["Seasonal monsoon transit delays", "Substation power grid maintenance in Sylhet"],
    riskType: "weather"
  },
  {
    id: "REG-SEA",
    name: "Southeast Asia (Vietnam / ASEAN)",
    code: "VNM",
    riskLevel: "Medium",
    riskScore: 42,
    supplierCount: 4,
    activeEventsCount: 1,
    financialExposure: 9000000,
    affectedRoutes: ["Haiphong -> Da Nang", "Ho Chi Minh City -> Singapore"],
    riskDrivers: ["ESG wastewater compliance reviews in Haiphong", "Surging container yard demand"],
    riskType: "ESG"
  },
  {
    id: "REG-EU",
    name: "Western Europe & Mediterranean",
    code: "EUR",
    riskLevel: "Low",
    riskScore: 18,
    supplierCount: 1,
    activeEventsCount: 0,
    financialExposure: 4675000,
    affectedRoutes: ["Rotterdam -> Nhava Sheva", "Hamburg Transit"],
    riskDrivers: ["Stable regulatory climate", "Low carbon supply corridors"],
    riskType: "all"
  }
];

// What-If Simulation Generator
export function runWhatIfSimulation(input: WhatIfScenarioInput): WhatIfSimulationResult {
  if (input.type === 'Port Closure') {
    return {
      scenarioName: `Port Disruption Simulation: Shanghai & Ningbo Terminal Congestion (+${input.magnitude} Days)`,
      affectedSuppliersCount: 4,
      affectedSuppliers: [
        { id: "SUP-014", name: "ABC Components", tier: 1, riskIncrease: 17, exposure: 3800000 },
        { id: "SUP-003", name: "Ningbo Micro-Sensors Co.", tier: 2, riskIncrease: 13, exposure: 2400000 },
        { id: "SUP-018", name: "Shenzhen Optoelectronics", tier: 1, riskIncrease: 8, exposure: 5500000 },
        { id: "SUP-019", name: "Malacca Strait Core Lithography", tier: 3, riskIncrease: 11, exposure: 4800000 }
      ],
      affectedBuyersCount: 2,
      atRiskFinancing: 16500000,
      estimatedDelayDays: input.magnitude,
      riskScoreImpact: 17,
      beforeRiskScore: 78,
      afterRiskScore: 61,
      beforeFinancingRate: 5.5,
      afterFinancingRate: 7.0,
      beforeCreditLimit: 5000000,
      afterCreditLimit: 3500000,
      explanation: `Simulating a ${input.magnitude}-day port congestion surge on the Shanghai/Ningbo route increases aggregate portfolio risk by +17 points. Hero supplier ABC Components (SUP-014) triggers an automatic credit limit adjustment from ₹50L down to ₹35L and interest rate repricing from 5.5% up to 7.0% due to ₹3.8 Cr delivery exposure.`
    };
  } else if (input.type === 'Supplier Failure') {
    return {
      scenarioName: `Critical Node Failure: Malacca Strait Core Lithography (SUP-019)`,
      affectedSuppliersCount: 5,
      affectedSuppliers: [
        { id: "SUP-019", name: "Malacca Strait Core Lithography", tier: 3, riskIncrease: 28, exposure: 4800000 },
        { id: "SUP-003", name: "Ningbo Micro-Sensors Co.", tier: 2, riskIncrease: 22, exposure: 2400000 },
        { id: "SUP-014", name: "ABC Components", tier: 1, riskIncrease: 19, exposure: 3800000 },
        { id: "SUP-001", name: "Apex Semiconductors Ltd", tier: 1, riskIncrease: 12, exposure: 8500000 },
        { id: "SUP-007", name: "Haiphong Rare Earth Minerals", tier: 2, riskIncrease: 10, exposure: 3600000 }
      ],
      affectedBuyersCount: 3,
      atRiskFinancing: 23100000,
      estimatedDelayDays: Math.round(input.magnitude * 1.5),
      riskScoreImpact: 24,
      beforeRiskScore: 75,
      afterRiskScore: 51,
      beforeFinancingRate: 5.8,
      afterFinancingRate: 8.2,
      beforeCreditLimit: 14000000,
      afterCreditLimit: 8500000,
      explanation: `A full outage at Tier-3 single point of failure SUP-019 paralyzes optical sensor assembly across Tier-2 and Tier-1 partners, putting ₹2.31 Cr in total supply chain financing at immediate default risk with an estimated ${Math.round(input.magnitude * 1.5)}-day production delay.`
    };
  } else {
    return {
      scenarioName: `FX Volatility Scenario: USD/INR +${input.magnitude}% Depreciation Shock`,
      affectedSuppliersCount: 8,
      affectedSuppliers: [
        { id: "SUP-014", name: "ABC Components", tier: 1, riskIncrease: 9, exposure: 3800000 },
        { id: "SUP-001", name: "Apex Semiconductors Ltd", tier: 1, riskIncrease: 5, exposure: 8500000 },
        { id: "SUP-006", name: "Red Sea Transit Logistics", tier: 1, riskIncrease: 14, exposure: 6400000 },
        { id: "SUP-018", name: "Shenzhen Optoelectronics", tier: 1, riskIncrease: 8, exposure: 5500000 }
      ],
      affectedBuyersCount: 2,
      atRiskFinancing: 24200000,
      estimatedDelayDays: 0,
      riskScoreImpact: 12,
      beforeRiskScore: 70,
      afterRiskScore: 58,
      beforeFinancingRate: 5.6,
      afterFinancingRate: 6.9,
      beforeCreditLimit: 22000000,
      afterCreditLimit: 17500000,
      explanation: `A +${input.magnitude}% currency shift on USD/EUR denominated cross-border payables expands total unhedged FX exposure by ₹14.8 Lakhs across 8 international suppliers, requiring an aggregate hedge ratio adjustment up to 85%.`
    };
  }
}

// AI Copilot Knowledge Base
export const copilotKnowledgeBase: Record<string, { answer: string; recommendedAction?: string; relatedSupplierId?: string }> = {
  "which suppliers are currently high risk": {
    answer: "There are currently 5 suppliers classified as **High Risk** across our portfolio: **ABC Components (SUP-014)** with risk score 61, **Red Sea Transit Logistics (SUP-006)** at 79, **Ningbo Micro-Sensors (SUP-003)** at 68, **Haiphong Rare Earth Minerals (SUP-007)** at 72, and deep-tier single point of failure **Malacca Strait Core Lithography (SUP-019)** at 83. The primary drivers are maritime port congestion, geopolitical transit friction, and ESG compliance penalties.",
    recommendedAction: "Review credit line caps for high-risk Tier-1 & Tier-2 nodes and activate buffer inventory allocations.",
    relatedSupplierId: "SUP-014"
  },
  "why is abc components risky": {
    answer: "ABC Components (**SUP-014**) risk score recently degraded from **78 to 61 (High Risk)**. Key drivers include a **40% increase in port congestion** at Shanghai, high dependency on a single shipping corridor, and elevated geopolitical risk factors, while ₹3.8 Cr in active financing exposure is currently tied up in transit.",
    recommendedAction: "Adjust financing terms: credit limit reduced to ₹35L and rate increased to 7.0% with mandatory 80% FX hedge.",
    relatedSupplierId: "SUP-014"
  },
  "how much financing is exposed to high-risk suppliers": {
    answer: "Total financing currently exposed to High-Risk suppliers stands at **₹2,10,00,000 (₹2.10 Cr)**, representing approximately **36.3%** of our total active platform portfolio (₹5.79 Cr). The largest individual at-risk exposure is **Red Sea Transit Logistics (₹64 Lakhs)**, followed by **Malacca Strait Core Lithography (₹48 Lakhs)** and **ABC Components (₹38 Lakhs)**.",
    recommendedAction: "Enforce dynamic risk premiums on next invoice discount cycle to preserve yield margin."
  },
  "which tier-3 supplier is the biggest single point of failure": {
    answer: "**Malacca Strait Core Lithography (SUP-019)** is our most critical Tier-3 single point of failure. It has a high risk score of **83** and serves as the sole-source laser optics supplier for both Tier-2 Ningbo Micro-Sensors (SUP-003) and Tier-1 ABC Components (SUP-014). Any disruption here directly stalls 4 downstream assembly lines.",
    recommendedAction: "Initiate secondary supplier qualification in India or Vietnam to eliminate sole-source vulnerability.",
    relatedSupplierId: "SUP-019"
  },
  "what happens if the shanghai route is disrupted": {
    answer: "A disruption on the Shanghai shipping route immediately impacts **4 key suppliers** and ₹1.65 Cr in active financing. ABC Components (SUP-014) risk score would drop from 78 to 61, requiring an immediate credit limit contraction from ₹50L down to ₹35L, an interest rate hike from 5.5% to 7.0%, and causing an estimated 14-day production delay.",
    recommendedAction: "Run a live simulation in the What-If Simulator to calculate exact margin shifts.",
    relatedSupplierId: "SUP-014"
  },
  "why did the financing rate change": {
    answer: "Financing rates are dynamically calculated using our risk-adjusted pricing formula: `Base Rate (3.5%) + Risk Premium (0.6% - 3.8%) - ESG Incentive (0.0% - 0.8%)`. When ABC Components' risk score degraded to 61 due to port congestion, its risk premium jumped from 1.2% to 2.1%, adjusting the total rate from 5.5% to **7.0%**.",
    recommendedAction: "Suppliers can lower rates by meeting ESG benchmarks (+0.4% discount) and routing through low-congestion secondary ports.",
    relatedSupplierId: "SUP-014"
  },
  "which suppliers should we monitor": {
    answer: "We recommend priority monitoring on **3 suppliers**: \n1. **ABC Components (SUP-014)** — ₹3.8 Cr exposure with active customs hold on invoice INV-2026-8842.\n2. **Malacca Strait Core Lithography (SUP-019)** — Critical Tier-3 choke point with +6.2 day transit dwell times.\n3. **Red Sea Transit Logistics (SUP-006)** — ₹6.4 Cr exposure undergoing 14-day Cape route detour.",
    recommendedAction: "Set automated threshold alerts for customs milestone clearances on these 3 entities."
  }
};

export function matchCopilotQuery(query: string): { answer: string; recommendedAction?: string; relatedSupplierId?: string } {
  const normalized = query.toLowerCase().trim().replace(/[?.,!]/g, '');

  for (const [key, val] of Object.entries(copilotKnowledgeBase)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return val;
    }
  }

  if (normalized.includes("abc") || normalized.includes("sup-014")) {
    return copilotKnowledgeBase["why is abc components risky"];
  }
  if (normalized.includes("high risk") || normalized.includes("riskiest")) {
    return copilotKnowledgeBase["which suppliers are currently high risk"];
  }
  if (normalized.includes("exposure") || normalized.includes("at-risk financing") || normalized.includes("total risk")) {
    return copilotKnowledgeBase["how much financing is exposed to high-risk suppliers"];
  }
  if (normalized.includes("single point") || normalized.includes("spof") || normalized.includes("tier-3") || normalized.includes("tier 3")) {
    return copilotKnowledgeBase["which tier-3 supplier is the biggest single point of failure"];
  }
  if (normalized.includes("shanghai") || normalized.includes("port closure") || normalized.includes("route")) {
    return copilotKnowledgeBase["what happens if the shanghai route is disrupted"];
  }
  if (normalized.includes("rate") || normalized.includes("interest") || normalized.includes("credit limit")) {
    return copilotKnowledgeBase["why did the financing rate change"];
  }
  if (normalized.includes("monitor") || normalized.includes("watch") || normalized.includes("urgent")) {
    return copilotKnowledgeBase["which suppliers should we monitor"];
  }

  return {
    answer: "The available ChainShield intelligence parameters do not contain explicit telemetry for that specific query. You can ask about **high-risk suppliers**, **why ABC Components is risky**, **Tier-3 single points of failure**, **Shanghai route disruption impact**, or **financing rate calculations**.",
    recommendedAction: "Try selecting one of the suggested query chips above for real-time intelligence."
  };
}
