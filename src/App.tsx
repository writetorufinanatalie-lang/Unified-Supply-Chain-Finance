import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { CommandCenter } from './pages/CommandCenter';
import { SupplierDirectory } from './pages/SupplierDirectory';
import { SupplyChainGraph } from './pages/SupplyChainGraph';
import { GlobalRiskMap } from './pages/GlobalRiskMap';
import { FinancingOverview } from './pages/FinancingOverview';
import { WhatIfSimulator } from './pages/WhatIfSimulator';
import { AlertFeed } from './pages/AlertFeed';
import { TradeSettlement } from './pages/TradeSettlement';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<CommandCenter />} />
          <Route path="suppliers" element={<SupplierDirectory />} />
          <Route path="graph" element={<SupplyChainGraph />} />
          <Route path="map" element={<GlobalRiskMap />} />
          <Route path="financing" element={<FinancingOverview />} />
          <Route path="simulator" element={<WhatIfSimulator />} />
          <Route path="alerts" element={<AlertFeed />} />
          <Route path="settlement" element={<TradeSettlement />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
