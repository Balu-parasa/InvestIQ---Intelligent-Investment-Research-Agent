import React from 'react';
import { ExternalLink, Database } from 'lucide-react';

export default function Sources({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="dashboard-card p-5 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-text-secondary">
          <Database className="w-4 h-4 text-brand-blue" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Grounding Data Sources Used
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          {sources.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-bg-base border border-border-base text-text-secondary hover:text-text-primary hover:border-brand-blue/40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {source.name}
              <ExternalLink className="w-3 h-3 text-text-secondary/60" />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
