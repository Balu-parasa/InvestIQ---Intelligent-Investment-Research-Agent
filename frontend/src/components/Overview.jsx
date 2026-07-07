import React from 'react';
import { Building2, User, MapPin, Calendar, Globe } from 'lucide-react';

export default function Overview({ overview }) {
  const { name, symbol, industry, ceo, headquarters, founded, website, description } = overview;

  const cardStats = [
    { label: 'Industry', value: industry, icon: Building2 },
    { label: 'CEO', value: ceo, icon: User },
    { label: 'Headquarters', value: headquarters, icon: MapPin },
    { label: 'Founded', value: founded, icon: Calendar },
  ];

  return (
    <div className="dashboard-card p-6 space-y-6 h-full flex flex-col justify-between">
      
      {/* Header section with Name and Symbol badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-base pb-5 shrink-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">{name}</h2>
          {website !== 'N/A' && (
            <a 
              href={website.startsWith('http') ? website : `https://${website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-brand-blue mt-1 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold tracking-wider text-brand-blue bg-brand-blue/10 border border-brand-blue/20 rounded uppercase">
          {symbol}
        </span>
      </div>

      {/* Grid of details cards */}
      <div className="grid grid-cols-2 gap-4">
        {cardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-bg-base border border-border-base rounded-lg p-3 hover:border-brand-blue/30 transition-colors">
              <div className="flex items-center gap-1.5 text-text-secondary mb-1">
                <Icon className="w-3.5 h-3.5 text-text-secondary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-xs font-semibold text-text-primary truncate" title={stat.value}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Company Description */}
      <div className="space-y-2 pt-2">
        <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Business Description</h3>
        <p className="text-text-secondary text-xs leading-relaxed max-h-[140px] overflow-y-auto pr-1">
          {description}
        </p>
      </div>

    </div>
  );
}
