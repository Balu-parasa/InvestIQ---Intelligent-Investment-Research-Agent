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
    <form onSubmit={handleSubmit} className="dashboard-card p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company 1 Search Input */}
        <div className="space-y-1.5">
          <label htmlFor="company1-search" className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
            Company 1
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary/60">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="company1-search"
              type="text"
              value={company1}
              onChange={(e) => setCompany1(e.target.value)}
              placeholder="e.g. Apple or AAPL"
              disabled={isLoading}
              className="w-full pl-9 pr-4 py-2 bg-bg-base border border-border-base focus:border-brand-blue focus:ring-0 outline-none rounded-lg text-sm text-text-primary placeholder-text-secondary/50 transition-colors"
            />
          </div>
        </div>

        {/* Company 2 Search Input */}
        <div className="space-y-1.5">
          <label htmlFor="company2-search" className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">
            Company 2
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary/60">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="company2-search"
              type="text"
              value={company2}
              onChange={(e) => setCompany2(e.target.value)}
              placeholder="e.g. Microsoft or MSFT"
              disabled={isLoading}
              className="w-full pl-9 pr-4 py-2 bg-bg-base border border-border-base focus:border-brand-blue focus:ring-0 outline-none rounded-lg text-sm text-text-primary placeholder-text-secondary/50 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isDisabled}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer ${
            isDisabled
              ? 'bg-border-base text-text-secondary/60 cursor-not-allowed border border-border-base'
              : 'bg-brand-blue text-white hover:bg-brand-blue/90'
          }`}
        >
          {isLoading ? 'Comparing...' : 'Compare'}
        </button>
      </div>
    </form>
  );
}
