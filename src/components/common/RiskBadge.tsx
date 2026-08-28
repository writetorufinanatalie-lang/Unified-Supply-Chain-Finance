import React from 'react';
import type { RiskLevel } from '../../types';

interface RiskBadgeProps {
  level: RiskLevel | string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showDot?: boolean;
  score?: number;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  size = 'sm',
  showDot = true,
  score,
  className = '',
}) => {
  const normalizedLevel = (level || '').toString().toLowerCase();

  let colorClasses = 'text-risk-low bg-risk-low-bg border-risk-low/40';
  let dotColor = 'bg-risk-low';

  if (normalizedLevel.includes('high')) {
    colorClasses = 'text-risk-high bg-risk-high-bg border-risk-high/40';
    dotColor = 'bg-risk-high';
  } else if (normalizedLevel.includes('med')) {
    colorClasses = 'text-risk-medium bg-risk-medium-bg border-risk-medium/40';
    dotColor = 'bg-risk-medium';
  }

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 font-medium',
    sm: 'text-xs px-2 py-0.5 font-semibold',
    md: 'text-sm px-2.5 py-1 font-semibold',
    lg: 'text-base px-3.5 py-1.5 font-bold',
  }[size];

  const dotSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  }[size];

  const displayLabel = normalizedLevel.includes('high')
    ? 'High'
    : normalizedLevel.includes('med')
    ? 'Medium'
    : 'Low';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${colorClasses} ${sizeClasses} ${className} select-none`}
      aria-label={`Risk Level: ${displayLabel}${score !== undefined ? `, Score: ${score}` : ''}`}
    >
      {showDot && (
        <span className={`rounded-full shrink-0 ${dotColor} ${dotSize} animate-pulse`} />
      )}
      <span>{displayLabel} Risk</span>
      {score !== undefined && (
        <span className="opacity-80 font-mono text-[0.9em] ml-0.5">({score})</span>
      )}
    </span>
  );
};
