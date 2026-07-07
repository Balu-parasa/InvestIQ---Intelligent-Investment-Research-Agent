import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ComparisonError({ error }) {
  if (!error) return null;

  return (
    <div className="dashboard-card p-5 max-w-xl mx-auto flex items-start gap-3.5 border-brand-danger/30">
      <div className="p-1.5 bg-brand-danger/10 rounded text-brand-danger shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Comparison Error</h4>
        <p className="text-xs text-text-secondary leading-relaxed">
          {error}
        </p>
        <p className="text-[10px] text-text-secondary/50 pt-0.5">
          Please verify your inputs and ensure they are publicly listed tickers or company names.
        </p>
      </div>
    </div>
  );
}
