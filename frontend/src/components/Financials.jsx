import React from 'react';
import { DollarSign, BarChart3, Scale, TrendingUp, Heart } from 'lucide-react';

export default function Financials({ financials }) {
  const { revenue, netIncome, marketCap, peRatio, revenueGrowth } = financials;

  // Formatter for large financial numbers
  const formatCurrency = (val) => {
    if (val === null || val === undefined) return 'N/A';
    const num = Number(val);
    const absVal = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    
    if (absVal >= 1e12) {
      return `${sign}$${(absVal / 1e12).toFixed(2)}T`;
    }
    if (absVal >= 1e9) {
      return `${sign}$${(absVal / 1e9).toFixed(2)}B`;
    }
    if (absVal >= 1e6) {
      return `${sign}$${(absVal / 1e6).toFixed(2)}M`;
    }
    return `${sign}$${num.toLocaleString()}`;
  };

  // Formatter for percentage
  const formatPercent = (val) => {
    if (val === null || val === undefined) return 'N/A';
    const pct = Number(val) * 100;
    const sign = pct > 0 ? '+' : '';
    return `${sign}${pct.toFixed(2)}%`;
  };

  const isGrowthPositive = revenueGrowth && Number(revenueGrowth) > 0;
  const isIncomePositive = netIncome && Number(netIncome) > 0;

  const cards = [
    {
      title: 'Market Capitalization',
      value: formatCurrency(marketCap),
      icon: Scale,
      colorClass: 'text-brand-cyan',
      description: 'Total value of outstanding shares'
    },
    {
      title: 'Total Revenue (TTM)',
      value: formatCurrency(revenue),
      icon: DollarSign,
      colorClass: 'text-brand-blue',
      description: 'Gross top-line sales'
    },
    {
      title: 'Net Income',
      value: formatCurrency(netIncome),
      icon: Heart,
      colorClass: isIncomePositive ? 'text-emerald-400' : 'text-rose-400',
      description: 'Net bottom-line profits'
    },
    {
      title: 'P/E Ratio',
      value: peRatio ? peRatio.toFixed(2) : 'N/A',
      icon: BarChart3,
      colorClass: 'text-brand-purple',
      description: 'Price to trailing earnings multiple'
    },
    {
      title: 'Revenue Growth (YoY)',
      value: formatPercent(revenueGrowth),
      icon: TrendingUp,
      colorClass: isGrowthPositive ? 'text-emerald-400' : 'text-rose-400',
      description: 'Year-over-year revenue change'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={index} 
            className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Soft decorative background dot */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-white/[0.02] rounded-bl-full pointer-events-none" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{card.title}</span>
                <div className={`p-1.5 rounded-lg bg-white/5 border border-white/5 ${card.colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className={`text-2xl font-extrabold tracking-tight ${card.colorClass}`}>
                  {card.value}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
