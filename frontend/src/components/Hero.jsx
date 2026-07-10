import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp } from 'lucide-react';

const SUGGESTIONS = [
  { name: 'Apple', symbol: 'AAPL' },
  { name: 'Tesla', symbol: 'TSLA' },
  { name: 'NVIDIA', symbol: 'NVDA' },
  { name: 'Microsoft', symbol: 'MSFT' }
];

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
      <div className="max-w-3xl w-full text-center space-y-6">
        
        {/* Header Tagline */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-border-base shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <span className="text-[10px] font-bold tracking-wider uppercase text-text-secondary">
              Investment Research Dashboard
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary"
          >
            Invest<span className="text-[#1E1C1A] font-extrabold ml-0.5">IQ</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm md:text-base text-text-secondary max-w-lg mx-auto font-normal leading-relaxed"
          >
            Research publicly listed companies using financial statements, market news and AI-assisted investment insights.
          </motion.p>
        </div>

        {/* Clean Search Box */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="relative max-w-xl mx-auto w-full"
        >
          <div className="flex items-center bg-white border border-border-base focus-within:border-[#1E1C1A]/50 rounded-xl p-1.5 pl-3.5 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02)]">
            <Search className="w-4 h-4 text-text-secondary shrink-0" />
            <input
              type="text"
              placeholder="Search company name or ticker..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-0 ring-0 outline-none focus:ring-0 focus:outline-none text-text-primary px-3 py-2 placeholder-text-secondary/50 text-sm font-sans"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="px-4 py-2 bg-[#1E1C1A] hover:bg-[#2D2A27] disabled:bg-border-base disabled:text-text-secondary/50 text-white rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:cursor-not-allowed"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Analyze Company
            </button>
          </div>
        </motion.form>

        {/* Suggestions chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs text-text-secondary"
        >
          <span className="font-medium text-text-secondary">Popular Searches:</span>
          {SUGGESTIONS.map((item) => (
            <button
              key={item.symbol}
              onClick={() => onSearch(item.name)}
              className="px-3.5 py-1.5 rounded-full bg-[#EAE5DB]/70 border border-transparent text-[#1E1C1A] hover:bg-[#E0DAD0] transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.015)] font-medium"
            >
              {item.name} ({item.symbol})
            </button>
          ))}
        </motion.div>
        
      </div>
    </div>
  );
}
