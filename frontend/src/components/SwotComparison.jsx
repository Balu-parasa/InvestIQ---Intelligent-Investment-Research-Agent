import React from 'react';
import { Check, AlertTriangle, Rocket, PlusCircle, MinusCircle, Lightbulb } from 'lucide-react';

function resolveItemText(item) {
  if (!item) return '';
  if (typeof item === 'object' && item.description) return item.description;
  if (typeof item === 'object' && item.title) return item.title;
  const str = String(item);
  const colonIndex = str.indexOf(':');
  if (colonIndex !== -1 && colonIndex < 35) {
    return str.slice(colonIndex + 1).trim();
  }
  return str;
}

const SWOT_CONFIG = {
  strengths: {
    title: 'Strengths',
    ItemIcon: Check,
    HeaderIcon: PlusCircle,
    headerColor: 'text-[#16A34A]',
    iconColor: 'text-[#16A34A]',
  },
  weaknesses: {
    title: 'Weaknesses',
    ItemIcon: AlertTriangle,
    HeaderIcon: MinusCircle,
    headerColor: 'text-[#D97706]',
    iconColor: 'text-[#D97706]',
  },
  opportunities: {
    title: 'Opportunities',
    ItemIcon: Rocket,
    HeaderIcon: Lightbulb,
    headerColor: 'text-[#7C3AED]',
    iconColor: 'text-[#7C3AED]',
  },
  risks: {
    title: 'Risks',
    ItemIcon: AlertTriangle,
    HeaderIcon: AlertTriangle,
    headerColor: 'text-[#DC2626]',
    iconColor: 'text-[#DC2626]',
  },
};

function BulletList({ items, configKey }) {
  const { ItemIcon, iconColor } = SWOT_CONFIG[configKey];

  if (!items || items.length === 0) {
    return <p className="text-text-secondary/50 text-xs italic">No data analyzed.</p>;
  }

  return (
    <ul className="list-none pl-0 m-0" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, index) => {
        const text = resolveItemText(item);
        return (
          <li key={index} className="flex items-start gap-2">
            <ItemIcon className={`w-3 h-3 shrink-0 mt-0.5 ${iconColor}`} />
            <span style={{ fontSize: '14px' }} className="text-text-primary font-medium leading-snug">
              {text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default function SwotComparison({ company1, company2 }) {
  if (!company1 || !company2) return null;

  const c1 = company1.company;
  const c2 = company2.company;
  const a1 = company1.analysis;
  const a2 = company2.analysis;

  const swotCategories = [
    { key: 'strengths',     items1: a1.strengths     || [], items2: a2.strengths     || [] },
    { key: 'weaknesses',    items1: a1.weaknesses    || [], items2: a2.weaknesses    || [] },
    { key: 'opportunities', items1: a1.opportunities || [], items2: a2.opportunities || [] },
    { key: 'risks',         items1: a1.risks         || [], items2: a2.risks         || [] },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest">
        AI SWOT Matrix Analysis
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {swotCategories.map((category) => {
          const config = SWOT_CONFIG[category.key];
          const { HeaderIcon, headerColor } = config;
          return (
            <div key={category.key} className="dashboard-card p-5 space-y-4">
              {/* Category header */}
              <div className="flex items-center gap-2 pb-3 border-b border-border-base">
                <HeaderIcon className={`w-4 h-4 ${headerColor}`} />
                <h4 className="text-[13px] font-semibold uppercase tracking-wider text-text-primary">
                  {config.title}
                </h4>
              </div>

              {/* Side-by-side columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Company 1 */}
                <div className="space-y-3 sm:border-r sm:border-border-base sm:pr-4">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                    {c1.symbol}
                  </span>
                  <BulletList items={category.items1} configKey={category.key} />
                </div>

                {/* Company 2 */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                    {c2.symbol}
                  </span>
                  <BulletList items={category.items2} configKey={category.key} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
