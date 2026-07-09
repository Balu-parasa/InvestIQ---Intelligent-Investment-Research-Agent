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
      title: 'Market Cap',
      value: formatCurrency(marketCap),
      icon: Scale,
      iconColor: 'text-[#8B5CF6]',
      valueColor: 'text-text-primary',
      borderColor: 'border-t-2 border-[#8B5CF6]',
      description: 'Total market value'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(revenue),
      icon: DollarSign,
      iconColor: 'text-[#8B5CF6]',
      valueColor: 'text-text-primary',
      borderColor: 'border-t-2 border-[#8B5CF6]',
      description: 'Gross top-line (TTM)'
    },
    {
      title: 'Net Income',
      value: formatCurrency(netIncome),
      icon: Heart,
      iconColor: isIncomePositive ? 'text-[#22C55E]' : 'text-[#EF4444]',
      valueColor: isIncomePositive ? 'text-[#22C55E]' : 'text-[#EF4444]',
      borderColor: isIncomePositive ? 'border-t-2 border-[#22C55E]' : 'border-t-2 border-[#EF4444]',
      description: 'Net bottom-line profits'
    },
    {
      title: 'P/E Ratio',
      value: peRatio ? peRatio.toFixed(2) : 'N/A',
      icon: BarChart3,
      iconColor: 'text-[#A855F7]',
      valueColor: 'text-text-primary',
      borderColor: 'border-t-2 border-[#A855F7]',
      description: 'Earnings multiple'
    },
    {
      title: 'Revenue Growth',
      value: formatPercent(revenueGrowth),
      icon: TrendingUp,
      iconColor: isGrowthPositive ? 'text-[#22C55E]' : 'text-[#EF4444]',
      valueColor: isGrowthPositive ? 'text-[#22C55E]' : 'text-[#EF4444]',
      borderColor: isGrowthPositive ? 'border-t-2 border-[#22C55E]' : 'border-t-2 border-[#EF4444]',
      description: 'Year-over-year change'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={index} 
            className={`dashboard-card p-5 flex flex-col justify-between ${card.borderColor} shadow-[0_1px_3px_rgba(0,0,0,0.01),0_1px_2px_rgba(0,0,0,0.02)]`}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-1">
                <span className="text-[9px] text-text-secondary font-bold uppercase tracking-wider leading-tight">{card.title}</span>
                <div className="shrink-0 p-1.5 rounded-lg bg-[#F8F7F4] border border-border-base">
                  <Icon className={`w-3.5 h-3.5 ${card.iconColor}`} />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className={`text-lg font-bold tracking-tight ${card.valueColor}`}>
                  {card.value}
                </p>
                <p className="text-[9px] text-text-secondary leading-normal">
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
