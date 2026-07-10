import React from 'react';
import { Building2, User, MapPin, Calendar, Globe } from 'lucide-react';

export default function Overview({ overview }) {
  const { name, symbol, industry, ceo, headquarters, founded, website, description } = overview;

  const cardStats = [
    { label: 'Industry', value: industry, icon: Building2 },
    { label: 'CEO', value: ceo, icon: User },
    { label: 'Headquarters', value: headquarters, icon: MapPin },
  ];

  return (
    <div className="dashboard-card p-8 space-y-6 h-full flex flex-col justify-between shadow-[0_1px_3px_rgba(0,0,0,0.02)]">

      {/* Header section with Name and Symbol badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-base pb-5 shrink-0">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">{name}</h2>
          {website !== 'N/A' && (
            <a
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-[#1E1C1A] transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
        <span className="px-3 py-1.5 text-xs font-bold tracking-wider text-[#1E1C1A] bg-[#EAE5DB]/70 border border-[#E5E0DA] rounded-lg uppercase shadow-sm">
          {symbol}
        </span>
      </div>

      {/* Grid of details cards */}
      <div className="grid grid-cols-2 gap-4">
        {cardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-[#FCFAF7] border border-border-base rounded-xl p-4 flex flex-col justify-between hover:border-[#1E1C1A]/20 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
              <div className="flex items-center gap-2 text-text-secondary mb-1.5">
                <Icon className="w-3.5 h-3.5 text-[#1E1C1A] shrink-0" />
                <span className="text-[9px] font-bold uppercase tracking-wider">{stat.label}</span>
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
