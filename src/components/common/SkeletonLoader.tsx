import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', style }) => {
  return (
    <div className={`skeleton-pulse rounded-md ${className}`} style={style} />
  );
};

export const KPISkeletonGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="fintech-card flex flex-col justify-between h-28">
          <Skeleton className="h-3.5 w-24 mb-2" />
          <Skeleton className="h-8 w-28 my-1" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ rows = 6, cols = 6 }) => {
  return (
    <div className="fintech-card overflow-hidden">
      <div className="flex gap-4 pb-4 border-b border-border-custom">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-border-custom/50">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex gap-4 py-4 items-center">
            {Array.from({ length: cols }).map((_, colIdx) => (
              <Skeleton key={colIdx} className={`h-4 flex-1 ${colIdx === 0 ? 'w-1/4' : ''}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChartSkeleton: React.FC<{ height?: string }> = ({ height = 'h-72' }) => {
  return (
    <div className={`fintech-card ${height} flex flex-col justify-between p-5`}>
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex-1 flex items-end gap-2 pt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t"
            style={{ height: `${20 + Math.sin(i) * 60 + 20}%` }}
          />
        ))}
      </div>
    </div>
  );
};
