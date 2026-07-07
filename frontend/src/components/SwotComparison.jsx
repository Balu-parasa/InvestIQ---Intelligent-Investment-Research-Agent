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
      textColor: 'text-brand-success',
      borderColor: 'border-brand-success/20',
      bulletBg: 'bg-brand-success',
      items1: a1.strengths || [],
      items2: a2.strengths || []
    },
    {
      key: 'weaknesses',
      title: 'Weaknesses',
      icon: MinusCircle,
      textColor: 'text-brand-danger',
      borderColor: 'border-brand-danger/20',
      bulletBg: 'bg-brand-danger',
      items1: a1.weaknesses || [],
      items2: a2.weaknesses || []
    },
    {
      key: 'opportunities',
      title: 'Opportunities',
      icon: Lightbulb,
      textColor: 'text-brand-blue',
      borderColor: 'border-brand-blue/20',
      bulletBg: 'bg-brand-blue',
      items1: a1.opportunities || [],
      items2: a2.opportunities || []
    },
    {
      key: 'risks',
      title: 'Risks',
      icon: AlertTriangle,
      textColor: 'text-brand-warning',
      borderColor: 'border-brand-warning/20',
      bulletBg: 'bg-brand-warning',
      items1: a1.risks || [],
      items2: a2.risks || []
    }
  ];

  const renderSwotList = (items, fallbackTitle, bulletBg) => {
    if (!items || items.length === 0) {
      return <p className="text-text-secondary/50 text-xs italic">No data analyzed.</p>;
    }

    return (
      <ul className="space-y-3">
        {items.map((item, index) => {
          const parsed = parseSwotItem(item, index, fallbackTitle);
          return (
            <li key={index} className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${bulletBg}`} />
                <h5 className="text-xs font-semibold text-text-primary">{parsed.title}</h5>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed pl-3.5">
                {parsed.description}
              </p>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest">
        AI SWOT Matrix Analysis
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {swotCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.key}
              className="dashboard-card p-5 space-y-4"
            >
              {/* SWOT Category Title */}
              <div className="flex items-center gap-2 pb-3 border-b border-border-base">
                <Icon className={`w-4 h-4 ${category.textColor}`} />
                <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                  {category.title}
                </h4>
              </div>

              {/* Side-by-side comparison columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Company 1 SWOT */}
                <div className="space-y-3 sm:border-r sm:border-border-base sm:pr-4">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                    {c1.symbol}
                  </span>
                  {renderSwotList(category.items1, category.title.slice(0, -1), category.bulletBg)}
                </div>

                {/* Company 2 SWOT */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                    {c2.symbol}
                  </span>
                  {renderSwotList(category.items2, category.title.slice(0, -1), category.bulletBg)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
