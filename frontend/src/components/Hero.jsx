import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, TrendingUp } from 'lucide-react';

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
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 md:px-8">
      {/* Dynamic Background Glow Layer */}
      <div className="absolute top-[20%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-brand-purple/10 blur-[80px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[40%] w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full bg-brand-blue/10 blur-[80px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '1.2s' }} />

      <div className="max-w-3xl w-full text-center z-10 space-y-8">
        
        {/* Logo and Tagline with Hero Text Reveal */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
              AI-Powered Financial Analyst
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400"
            >
              Invest<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">IQ</span> AI
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.p 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto font-light"
            >
              AI Investment Research Agent. Enter any company to evaluate growth, financials, and receive an instant investment opinion.
            </motion.p>
          </div>
        </div>

        {/* Glowing Search Box */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto w-full group"
        >
          {/* Glowing Outline under the input */}
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan opacity-25 group-focus-within:opacity-75 blur-md transition-all duration-300" />
          
          <div className="relative flex items-center bg-dark-900 border border-white/10 rounded-2xl p-2 pl-4">
            <Search className="w-6 h-6 text-slate-400 group-focus-within:text-brand-purple transition-colors duration-200" />
            <input
              type="text"
              placeholder="Enter Company Name or Ticker (e.g. Tesla or TSLA)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-0 ring-0 outline-none focus:ring-0 focus:outline-none text-slate-100 px-3 py-3 md:py-4 placeholder-slate-500 font-sans"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="btn-glow-purple px-6 py-3 md:py-4 bg-gradient-to-r from-brand-purple to-brand-blue disabled:from-slate-800 disabled:to-slate-900 text-white rounded-xl font-medium tracking-wide flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <TrendingUp className="w-4 h-4" />
              Analyze
            </button>
          </div>
        </motion.form>

        {/* Suggestions chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2 text-sm text-slate-500"
        >
          <span>Popular Searches:</span>
          {SUGGESTIONS.map((item) => (
            <button
              key={item.symbol}
              onClick={() => onSearch(item.name)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-brand-purple/40 transition-all duration-200"
            >
              {item.name} ({item.symbol})
            </button>
          ))}
        </motion.div>
        
      </div>
    </div>
  );
}
