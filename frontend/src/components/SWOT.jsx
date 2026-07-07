import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, MinusCircle, Lightbulb, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

function SWOTCard({ title, items, icon: Icon, colorStyles }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`dashboard-card transition-colors duration-200 overflow-hidden ${
        isOpen ? 'border-border-base' : 'hover:border-brand-blue/30'
      }`}
    >
      {/* Header section (Togglable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded bg-bg-base border border-border-base ${colorStyles.text}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-wider text-text-secondary">SWOT Category</h4>
            <h3 className="text-sm font-semibold text-text-primary tracking-tight mt-0.5">{title}</h3>
          </div>
        </div>
        <div className="p-1 rounded bg-bg-base border border-border-base text-text-secondary">
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Expandable items section */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-t border-border-base bg-bg-base/40"
          >
            <div className="p-5 space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="space-y-1 last:border-b-0 pb-3 last:pb-0 border-b border-border-base">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${colorStyles.badge} uppercase tracking-wider`}>
                      {title.slice(0, -1)} {idx + 1}
                    </span>
                    <h5 className="text-xs font-semibold text-text-primary">{item.title}</h5>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed pl-1">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SWOT({ swot }) {
  if (!swot) return null;

  const categories = [
    {
      title: 'Strengths',
      items: swot.strengths || [],
      icon: PlusCircle,
      colorStyles: {
        text: 'text-brand-success',
        badge: 'bg-brand-success/10 text-brand-success border border-brand-success/20',
      }
    },
    {
      title: 'Weaknesses',
      items: swot.weaknesses || [],
      icon: MinusCircle,
      colorStyles: {
        text: 'text-brand-warning',
        badge: 'bg-brand-warning/10 text-brand-warning border border-brand-warning/20',
      }
    },
    {
      title: 'Opportunities',
      items: swot.opportunities || [],
      icon: Lightbulb,
      colorStyles: {
        text: 'text-brand-blue',
        badge: 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20',
      }
    },
    {
      title: 'Risks',
      items: swot.risks || [],
      icon: AlertTriangle,
      colorStyles: {
        text: 'text-brand-danger',
        badge: 'bg-brand-danger/10 text-brand-danger border border-brand-danger/20',
      }
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest">AI Strategic SWOT Profile</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat, idx) => (
          <SWOTCard
            key={idx}
            title={cat.title}
            items={cat.items}
            icon={cat.icon}
            colorStyles={cat.colorStyles}
          />
        ))}
      </div>
    </div>
  );
}
