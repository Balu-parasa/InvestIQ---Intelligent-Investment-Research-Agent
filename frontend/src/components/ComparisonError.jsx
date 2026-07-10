import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ComparisonError({ error }) {
  if (!error) return null;

  return (
    <div className="dashboard-card p-5 max-w-xl mx-auto flex items-start gap-3.5 border-[#B05B54]/20 shadow-[0_1px_2px_rgba(0,0,0,0.015)] bg-white">
      <div className="p-2 bg-[#B05B54]/5 border border-[#B05B54]/15 rounded-lg text-[#B05B54] shrink-0">
        <AlertTriangle className="w-4 h-4" />
      </div>
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Comparison Error</h4>
        <p className="text-xs text-text-secondary leading-relaxed">
          {error}
        </p>
        <p className="text-[10px] text-text-secondary/50 pt-0.5 leading-normal">
          Please verify your inputs and ensure they are publicly listed tickers or company names.
        </p>
      </div>
    </div>
  );
}
