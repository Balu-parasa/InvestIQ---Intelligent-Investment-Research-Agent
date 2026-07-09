import React from 'react';
import { ExternalLink, Database } from 'lucide-react';

export default function Sources({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="dashboard-card p-5 relative overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 text-text-secondary">
          <Database className="w-4 h-4 text-[#8B5CF6]" />
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
              className="px-3.5 py-1.5 rounded-lg bg-[#F8F7F4] border border-border-base text-text-secondary hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/5 hover:border-[#8B5CF6]/30 flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.015)]"
            >
              {source.name}
              <ExternalLink className="w-3 h-3 text-text-secondary/50" />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
