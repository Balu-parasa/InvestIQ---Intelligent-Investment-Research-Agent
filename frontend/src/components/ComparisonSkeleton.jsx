import React from 'react';

export default function ComparisonSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Side-by-side Company Profile Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="glass-card rounded-2xl p-6 md:p-8 space-y-6 border border-white/5">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-5">
              <div className="space-y-2 flex-1 mr-4">
                <div className="h-6 w-3/4 skeleton-shimmer rounded-lg" />
                <div className="h-3 w-1/3 skeleton-shimmer rounded-lg" />
              </div>
              <div className="h-8 w-16 skeleton-shimmer rounded-lg shrink-0" />
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-2">
                  <div className="h-2 w-1/2 skeleton-shimmer rounded-lg" />
                  <div className="h-4 w-3/4 skeleton-shimmer rounded-lg" />
                </div>
              ))}
            </div>

            {/* Company Overview List */}
            <div className="space-y-3 pt-2">
              <div className="h-2 w-1/4 skeleton-shimmer rounded-lg mb-1" />
              {[1, 2, 3, 4, 5].map((k) => (
                <div key={k} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full skeleton-shimmer shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-1/3 skeleton-shimmer rounded-lg" />
                    <div className="h-3 w-2/3 skeleton-shimmer rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table Skeleton */}
      <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
        <div className="p-5 border-b border-white/5 bg-white/[0.01]">
          <div className="h-4 w-1/4 skeleton-shimmer rounded-lg" />
        </div>
        <div className="p-4 space-y-4">
          {/* Header Row */}
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <div className="h-3 w-1/5 skeleton-shimmer rounded-lg" />
            <div className="h-3 w-1/4 skeleton-shimmer rounded-lg" />
            <div className="h-3 w-1/4 skeleton-shimmer rounded-lg" />
          </div>
          {/* Table Rows */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((rowIdx) => (
            <div key={rowIdx} className="flex justify-between items-center py-2.5">
              <div className="h-3 w-1/4 skeleton-shimmer rounded-lg" />
              <div className="h-3 w-1/6 skeleton-shimmer rounded-lg" />
              <div className="h-3 w-1/6 skeleton-shimmer rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* SWOT Comparison Skeleton */}
      <div className="space-y-6">
        <div className="h-4 w-1/6 skeleton-shimmer rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((swotIdx) => (
            <div key={swotIdx} className="glass-card rounded-2xl p-5 md:p-6 space-y-4 border border-white/5">
              <div className="h-4 w-1/3 skeleton-shimmer rounded-lg pb-3 border-b border-white/5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map((colIdx) => (
                  <div key={colIdx} className="space-y-3">
                    <div className="h-2.5 w-1/4 skeleton-shimmer rounded-lg" />
                    {[1, 2, 3].map((bulletIdx) => (
                      <div key={bulletIdx} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full skeleton-shimmer shrink-0" />
                          <div className="h-2 w-1/2 skeleton-shimmer rounded-lg" />
                        </div>
                        <div className="h-3 w-5/6 skeleton-shimmer rounded-lg ml-3.5" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verdict Summary Card Skeleton */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/5">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="space-y-4 lg:w-1/3">
            <div className="h-5 w-1/2 skeleton-shimmer rounded-full" />
            <div className="h-8 w-2/3 skeleton-shimmer rounded-lg" />
            <div className="space-y-3 pt-3 border-t border-white/5">
              <div className="h-3 w-1/3 skeleton-shimmer rounded-lg" />
              <div className="space-y-2">
                <div className="h-6 w-full skeleton-shimmer rounded-lg" />
                <div className="h-6 w-full skeleton-shimmer rounded-lg" />
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex-1 bg-white/[0.01] border border-white/5 rounded-2xl p-5 md:p-6 space-y-4">
            <div className="space-y-2">
              <div className="h-3.5 w-1/4 skeleton-shimmer rounded-lg" />
              <div className="h-4 w-full skeleton-shimmer rounded-lg" />
              <div className="h-4 w-5/6 skeleton-shimmer rounded-lg" />
              <div className="h-4 w-4/5 skeleton-shimmer rounded-lg" />
            </div>
            <div className="pt-3 border-t border-white/5 space-y-2">
              <div className="h-2.5 w-1/6 skeleton-shimmer rounded-lg" />
              <div className="h-3 w-full skeleton-shimmer rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
