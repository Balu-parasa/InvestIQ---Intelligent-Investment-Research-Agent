import React from 'react';
import { Search } from 'lucide-react';

export default function ComparisonSearch({
  company1,
  setCompany1,
  company2,
  setCompany2,
  onCompare,
  isLoading
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (company1.trim() && company2.trim() && !isLoading) {
      onCompare();
    }
  };

  const isDisabled = !company1.trim() || !company2.trim() || isLoading;

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company 1 Search Input */}
        <div className="space-y-2">
          <label htmlFor="company1-search" className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
            Company 1
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="company1-search"
              type="text"
              value={company1}
              onChange={(e) => setCompany1(e.target.value)}
              placeholder="e.g. Apple or AAPL"
              disabled={isLoading}
              className="w-full pl-11 pr-4 py-3.5 bg-dark-900/50 border border-white/5 focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/20 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Company 2 Search Input */}
        <div className="space-y-2">
          <label htmlFor="company2-search" className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
            Company 2
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="company2-search"
              type="text"
              value={company2}
              onChange={(e) => setCompany2(e.target.value)}
              placeholder="e.g. Microsoft or MSFT"
              disabled={isLoading}
              className="w-full pl-11 pr-4 py-3.5 bg-dark-900/50 border border-white/5 focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/20 rounded-xl text-sm text-slate-200 placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full md:w-auto min-w-[200px] px-8 py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
            isDisabled
              ? 'bg-slate-800/40 text-slate-500 border border-slate-700/20 cursor-not-allowed'
              : 'bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg hover:shadow-brand-purple/20 hover:scale-[1.02] cursor-pointer'
          }`}
        >
          {isLoading ? 'Comparing companies...' : 'Compare'}
        </button>
      </div>
    </form>
  );
}
