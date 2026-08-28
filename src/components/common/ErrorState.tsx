import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Data Telemetry Interrupted',
  message = 'Unable to synchronize real-time intelligence feeds from the smart ledger stream.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center fintech-card border-risk-high/30 bg-risk-high-bg ${className}`}>
      <div className="w-10 h-10 rounded-full bg-risk-high/20 border border-risk-high/40 flex items-center justify-center text-risk-high mb-3">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-semibold text-text-primary mb-1">{title}</h4>
      <p className="text-xs text-text-secondary max-w-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-custom bg-bg-surface text-text-primary text-xs font-semibold hover:bg-bg-surface-2 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Telemetry
        </button>
      )}
    </div>
  );
};
