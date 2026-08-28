import React from 'react';
import type { RiskLevel } from '../../types';

interface RiskGaugeProps {
  score: number; // 0-100
  level: RiskLevel;
  size?: number; // width/height in px
  strokeWidth?: number;
  showLabel?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  level,
  size = 140,
  strokeWidth = 10,
  showLabel = true,
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = Math.PI * radius; // Half circle arc
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#22C55E'; // Low
  if (level === 'High') {
    strokeColor = '#EF4444';
  } else if (level === 'Medium') {
    strokeColor = '#F59E0B';
  }

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <svg
        width={size}
        height={size * 0.65}
        viewBox={`0 0 ${size} ${size * 0.7}`}
        className="overflow-visible"
      >
        {/* Background Track Arc */}
        <path
          d={`M ${strokeWidth},${size * 0.6} A ${radius},${radius} 0 0,1 ${size - strokeWidth},${size * 0.6}`}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Animated Value Arc */}
        <path
          d={`M ${strokeWidth},${size * 0.6} A ${radius},${radius} 0 0,1 ${size - strokeWidth},${size * 0.6}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Centered Score */}
      <div className="absolute top-[35%] flex flex-col items-center">
        <span className="text-3xl font-bold tabular-nums text-text-primary">
          {score}
        </span>
        <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider -mt-1">
          / 100 Score
        </span>
      </div>
      {showLabel && (
        <div className="mt-1">
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{
              color: strokeColor,
              backgroundColor: `${strokeColor}20`,
              border: `1px solid ${strokeColor}40`,
            }}
          >
            {level} Risk Rating
          </span>
        </div>
      )}
    </div>
  );
};
