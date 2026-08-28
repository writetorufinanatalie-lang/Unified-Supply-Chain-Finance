import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { MetricCounter } from './MetricCounter';

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatter?: (val: number) => string;
  trend?: {
    value: number; // percentage e.g. 12.4
    direction: 'up' | 'down';
    label?: string; // e.g. 'vs last month'
    isGood?: boolean; // if up is good or bad
  };
  tooltip?: string;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  formatter,
  trend,
  tooltip,
  onClick,
  className = '',
}) => {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`fintech-card flex flex-col justify-between select-none ${
        isClickable ? 'cursor-pointer fintech-card-hover group' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium uppercase tracking-wide text-text-secondary truncate">
          {label}
        </span>
        {tooltip && (
          <div className="relative group/tooltip">
            <HelpCircle className="w-3.5 h-3.5 text-text-muted hover:text-text-secondary transition-colors cursor-help" />
            <div className="absolute right-0 top-5 w-48 p-2 rounded-md bg-bg-surface-2 border border-border-custom text-[11px] text-text-primary shadow-xl z-30 opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity">
              {tooltip}
            </div>
          </div>
        )}
      </div>

      <div className="my-1">
        <div className="text-3xl font-bold text-text-primary tracking-tight">
          <MetricCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            formatter={formatter}
          />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 mt-2 text-xs">
          <span
            className={`inline-flex items-center font-medium ${
              trend.isGood !== undefined
                ? trend.isGood
                  ? 'text-positive'
                  : 'text-negative'
                : trend.direction === 'up'
                ? 'text-positive'
                : 'text-negative'
            }`}
          >
            {trend.direction === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
            )}
            {trend.value > 0 ? `${trend.value}%` : `${trend.value}%`}
          </span>
          <span className="text-text-muted text-[11px] truncate">
            {trend.label || 'vs last period'}
          </span>
        </div>
      )}
    </div>
  );
};
