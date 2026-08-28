import React, { useEffect, useState } from 'react';

interface MetricCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number; // in ms, default 600
  formatter?: (val: number) => string;
  className?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 600,
  formatter,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValue;
    const endValue = value;

    if (startValue === endValue) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Smooth ease-out quad formula
      const easeOutProgress = 1 - (1 - progress) * (1 - progress);
      const current = startValue + (endValue - startValue) * easeOutProgress;
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [value, duration]);

  const formattedNumber = formatter
    ? formatter(displayValue)
    : displayValue.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return (
    <span className={`tabular-nums font-semibold ${className}`}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};
