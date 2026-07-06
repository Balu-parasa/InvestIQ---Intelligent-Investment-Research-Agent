import React from 'react';
import { ExternalLink, Database } from 'lucide-react';

export default function Sources({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-slate-400">
          <Database className="w-4 h-4 text-brand-blue" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Grounding Data Sources Used
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
          {sources.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:border-brand-purple/40 hover:bg-white/10 flex items-center gap-1.5 transition-all"
            >
              {source.name}
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
