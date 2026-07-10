import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle, ArrowUpRight, ChevronDown, ChevronUp, PlusCircle, MinusCircle, Lightbulb } from 'lucide-react';

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
  Strengths: {
    HeaderIcon: PlusCircle,
    headerColor: 'text-[#4A6D55]',
    renderIcon: () => <Check className="w-3.5 h-3.5 text-[#4A6D55] shrink-0 mt-0.5" />,
  },
  Weaknesses: {
    HeaderIcon: MinusCircle,
    headerColor: 'text-[#C29F68]',
    renderIcon: () => (
      <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C29F68] block" />
      </span>
    ),
  },
  Opportunities: {
    HeaderIcon: Lightbulb,
    headerColor: 'text-[#1E1C1A]',
    renderIcon: () => <ArrowUpRight className="w-3.5 h-3.5 text-[#1E1C1A] shrink-0 mt-0.5" />,
  },
  Risks: {
    HeaderIcon: AlertTriangle,
    headerColor: 'text-[#B05B54]',
    renderIcon: () => <AlertTriangle className="w-3.5 h-3.5 text-[#B05B54] shrink-0 mt-0.5" />,
  },
};

function SWOTCard({ title, items }) {
  const [isOpen, setIsOpen] = useState(true);
  const config = SWOT_CONFIG[title] || SWOT_CONFIG.Strengths;
  const { HeaderIcon } = config;

  return (
    <div className="dashboard-card overflow-hidden transition-all duration-200 hover:border-[#1E1C1A]/20">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer focus:outline-none bg-white hover:bg-[#FCFAF7] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <HeaderIcon className={`w-4 h-4 ${config.headerColor}`} />
          <h3 className="text-[13px] font-bold text-text-primary tracking-tight">{title}</h3>
        </div>
        {isOpen
          ? <ChevronUp className="w-3.5 h-3.5 text-text-secondary" />
          : <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />}
      </button>

      {/* Bullet list */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className="border-t border-border-base"
          >
            <ul className="px-5 py-4 space-y-2.5">
              {items.map((item, idx) => {
                const text = resolveItemText(item);
                return (
                  <li key={idx} className="flex items-start gap-2.5">
                    {config.renderIcon()}
                    <span className="text-xs font-medium text-text-primary leading-relaxed">{text}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SWOT({ swot }) {
  if (!swot) return null;

  const categories = [
    { title: 'Strengths',     items: swot.strengths     || [] },
    { title: 'Weaknesses',    items: swot.weaknesses    || [] },
    { title: 'Opportunities', items: swot.opportunities || [] },
    { title: 'Risks',         items: swot.risks         || [] },
  ];

  return (
    <div className="space-y-3.5">
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest">AI Strategic SWOT Profile</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
        {categories.map((cat, idx) => (
          <SWOTCard key={idx} title={cat.title} items={cat.items} />
        ))}
      </div>
    </div>
  );
}
