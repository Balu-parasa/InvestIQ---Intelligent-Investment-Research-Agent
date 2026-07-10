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
    <form onSubmit={handleSubmit} className="dashboard-card p-6 space-y-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company 1 Search Input */}
        <div className="space-y-2">
          <label htmlFor="company1-search" className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
            Company 1
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary/50">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="company1-search"
              type="text"
              value={company1}
              onChange={(e) => setCompany1(e.target.value)}
              placeholder="e.g. Apple or AAPL"
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FCFAF7] border border-border-base focus:border-[#1E1C1A]/50 focus:ring-0 outline-none rounded-lg text-sm text-text-primary placeholder-text-secondary/40 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Company 2 Search Input */}
        <div className="space-y-2">
          <label htmlFor="company2-search" className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
            Company 2
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary/50">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="company2-search"
              type="text"
              value={company2}
              onChange={(e) => setCompany2(e.target.value)}
              placeholder="e.g. Microsoft or MSFT"
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FCFAF7] border border-border-base focus:border-[#1E1C1A]/50 focus:ring-0 outline-none rounded-lg text-sm text-text-primary placeholder-text-secondary/40 transition-all disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isDisabled}
          className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed ${
            isDisabled
              ? 'bg-border-base text-text-secondary/50 border border-border-base'
              : 'bg-[#1E1C1A] text-white hover:bg-[#2D2A27]'
          }`}
        >
          {isLoading ? 'Comparing...' : 'Compare'}
        </button>
      </div>
    </form>
  );
}
