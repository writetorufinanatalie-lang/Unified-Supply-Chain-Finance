/**
 * Helper utilities for currency, percentage, and date formatting
 */

export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount)) return '₹0';

  if (compact) {
    if (amount >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      const lakh = amount / 100000;
      return `₹${lakh % 1 === 0 ? lakh : lakh.toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
    return `₹${amount}`;
  }

  // Standard Indian numbering format (e.g., ₹38,00,000)
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const str = absAmount.toString();
  let lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return `${isNegative ? '-' : ''}₹${res}`;
}

export function formatCurrency(amount: number, currency: string = 'INR', compact: boolean = false): string {
  if (currency === 'INR') {
    return formatINR(amount, compact);
  }
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  }
  if (currency === 'EUR') {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  }
  return `${currency} ${amount.toLocaleString()}`;
}

export function formatPercent(rate: number, includeSign: boolean = false): string {
  if (isNaN(rate)) return '0.0%';
  const prefix = includeSign && rate > 0 ? '+' : '';
  return `${prefix}${rate.toFixed(1)}%`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date('2026-08-28T14:00:00Z'); // Fixed anchor relative to context
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) return `${Math.max(1, diffInMinutes)}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}
