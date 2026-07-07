import React from 'react';
import { PlusCircle, MinusCircle, Lightbulb, AlertTriangle } from 'lucide-react';

export default function SwotComparison({ company1, company2 }) {
  if (!company1 || !company2) return null;

  const c1 = company1.company;
  const c2 = company2.company;
  const a1 = company1.analysis;
  const a2 = company2.analysis;

  // SWOT Parsing logic to split "Title: Description" or handle object inputs
  const parseSwotItem = (item, index, fallbackTitle) => {
    if (!item) return { title: '', description: '' };
    if (typeof item === 'object' && item.title && item.description) {
      return item;
    }
    const str = String(item);
    const colonIndex = str.indexOf(':');
    if (colonIndex !== -1) {
      return {
        title: str.slice(0, colonIndex).trim(),
        description: str.slice(colonIndex + 1).trim()
      };
    }
    return {
      title: `${fallbackTitle} ${index + 1}`,
      description: str
    };
  };

  const swotCategories = [
    {
      key: 'strengths',
      title: 'Strengths',
      icon: PlusCircle,
      colorClass: 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5',
      bulletColor: 'bg-emerald-500/20 text-emerald-400',
      items1: a1.strengths || [],
      items2: a2.strengths || []
    },
    {
      key: 'weaknesses',
      title: 'Weaknesses',
      icon: MinusCircle,
      colorClass: 'text-rose-400 border-rose-500/10 bg-rose-500/5',
      bulletColor: 'bg-rose-500/20 text-rose-400',
      items1: a1.weaknesses || [],
      items2: a2.weaknesses || []
    },
    {
      key: 'opportunities',
      title: 'Opportunities',
      icon: Lightbulb,
      colorClass: 'text-brand-blue border-brand-blue/10 bg-brand-blue/5',
      bulletColor: 'bg-brand-blue/20 text-brand-blue',
      items1: a1.opportunities || [],
      items2: a2.opportunities || []
    },
    {
      key: 'risks',
      title: 'Risks',
      icon: AlertTriangle,
      colorClass: 'text-amber-400 border-amber-500/10 bg-amber-500/5',
      bulletColor: 'bg-amber-500/20 text-amber-400',
      items1: a1.risks || [],
      items2: a2.risks || []
    }
  ];

  const renderSwotList = (items, fallbackTitle, bulletColor) => {
    if (!items || items.length === 0) {
      return <p className="text-slate-500 text-xs italic">No data analyzed.</p>;
    }

    return (
      <ul className="space-y-3">
        {items.map((item, index) => {
          const parsed = parseSwotItem(item, index, fallbackTitle);
          return (
            <li key={index} className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${bulletColor.split(' ')[0]}`} />
                <h5 className="text-xs font-bold text-slate-200">{parsed.title}</h5>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light pl-3.5">
                {parsed.description}
              </p>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
        AI SWOT Matrix Analysis
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {swotCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.key}
              className={`glass-card rounded-2xl p-5 md:p-6 space-y-4 border ${category.colorClass.split(' ')[1]}`}
            >
              {/* SWOT Category Title */}
              <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                <Icon className={`w-5 h-5 ${category.colorClass.split(' ')[0]}`} />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  {category.title}
                </h4>
              </div>

              {/* Side-by-side comparison columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[350px] overflow-y-auto pr-1">
                {/* Company 1 SWOT */}
                <div className="space-y-3 sm:border-r sm:border-white/5 sm:pr-4">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                    {c1.symbol}
                  </span>
                  {renderSwotList(category.items1, category.title.slice(0, -1), category.bulletColor)}
                </div>

                {/* Company 2 SWOT */}
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                    {c2.symbol}
                  </span>
                  {renderSwotList(category.items2, category.title.slice(0, -1), category.bulletColor)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
