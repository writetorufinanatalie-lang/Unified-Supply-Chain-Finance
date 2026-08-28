import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center fintech-card border-dashed ${className}`}>
      <div className="w-12 h-12 rounded-full bg-bg-surface-2 border border-border-custom flex items-center justify-center text-text-muted mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-base font-semibold text-text-primary mb-1">{title}</h4>
      <p className="text-sm text-text-secondary max-w-md mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-bg-base font-semibold text-sm hover:bg-accent-hover transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
