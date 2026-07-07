import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ComparisonError({ error }) {
  if (!error) return null;

  return (
    <div className="glass-card rounded-2xl p-6 border border-rose-500/20 bg-rose-500/5 max-w-xl mx-auto flex items-start gap-4 shadow-xl">
      <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400 shrink-0">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Comparison Error</h4>
        <p className="text-xs text-rose-300 leading-relaxed font-light">
          {error}
        </p>
        <p className="text-[10px] text-slate-500 pt-1 font-medium">
          Please verify your inputs and ensure they are publicly listed tickers or company names.
        </p>
      </div>
    </div>
  );
}
