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
    <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section with Name and Symbol badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white font-sans tracking-tight">{name}</h2>
          {website !== 'N/A' && (
            <a 
              href={website.startsWith('http') ? website : `https://${website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-brand-cyan mt-1 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {website.replace(/https?:\/\/(www\.)?/, '')}
            </a>
          )}
        </div>
        <span className="px-3.5 py-1.5 text-sm font-bold tracking-widest text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg uppercase">
          {symbol}
        </span>
      </div>

      {/* Grid of micro cards for details */}
      <div className="grid grid-cols-2 gap-4">
        {cardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white/5 border border-white/5 rounded-xl p-3.5 hover:border-slate-800 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Icon className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-sm font-semibold text-slate-200 line-clamp-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Company Description */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Business Description</h3>
        <p className="text-slate-300 text-sm leading-relaxed font-light text-justify max-h-[160px] overflow-y-auto pr-1">
          {description}
        </p>
      </div>

    </div>
  );
}
