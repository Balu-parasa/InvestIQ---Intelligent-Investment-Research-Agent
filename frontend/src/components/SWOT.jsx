import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, MinusCircle, Lightbulb, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

function SWOTCard({ title, items, icon: Icon, colorStyles }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? colorStyles.borderActive + ' ring-1 ' + colorStyles.ring : 'border-white/5 hover:border-slate-800'
      }`}
    >
      {/* Header section (Togglable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-white/5 ${colorStyles.text}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">AI SWOT Analysis</h4>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">{title}</h3>
          </div>
        </div>
        <div className={`p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 ${colorStyles.textHover}`}>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable items section */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-white/5 bg-white/[0.01]"
          >
            <div className="p-5 md:p-6 space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="space-y-1.5 last:border-b-0 pb-3 last:pb-0 border-b border-white/5">
                  <div className="flex items-start gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colorStyles.badge} uppercase tracking-wider mt-0.5`}>
                      {title.slice(0, -1)} {idx + 1}
                    </span>
                    <h5 className="text-sm font-bold text-slate-200">{item.title}</h5>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-light pl-1">
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
        text: 'text-emerald-400',
        textHover: 'group-hover:text-emerald-400',
        borderActive: 'border-emerald-500/35',
        ring: 'ring-emerald-500/10',
        badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      }
    },
    {
      title: 'Weaknesses',
      items: swot.weaknesses || [],
      icon: MinusCircle,
      colorStyles: {
        text: 'text-amber-400',
        textHover: 'group-hover:text-amber-400',
        borderActive: 'border-amber-500/35',
        ring: 'ring-amber-500/10',
        badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      }
    },
    {
      title: 'Opportunities',
      items: swot.opportunities || [],
      icon: Lightbulb,
      colorStyles: {
        text: 'text-brand-blue',
        textHover: 'group-hover:text-brand-blue',
        borderActive: 'border-brand-blue/35',
        ring: 'ring-brand-blue/10',
        badge: 'bg-blue-500/10 text-brand-blue border border-blue-500/20',
      }
    },
    {
      title: 'Risks',
      items: swot.risks || [],
      icon: AlertTriangle,
      colorStyles: {
        text: 'text-rose-400',
        textHover: 'group-hover:text-rose-400',
        borderActive: 'border-rose-500/35',
        ring: 'ring-rose-500/10',
        badge: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
      }
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">AI Strategic SWOT Profile</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
