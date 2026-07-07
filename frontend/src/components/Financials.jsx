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
      iconColor: 'text-brand-blue',
      valueColor: 'text-text-primary',
      description: 'Total market value'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(revenue),
      icon: DollarSign,
      iconColor: 'text-brand-blue',
      valueColor: 'text-text-primary',
      description: 'Gross top-line (TTM)'
    },
    {
      title: 'Net Income',
      value: formatCurrency(netIncome),
      icon: Heart,
      iconColor: isIncomePositive ? 'text-brand-success' : 'text-brand-danger',
      valueColor: isIncomePositive ? 'text-brand-success' : 'text-brand-danger',
      description: 'Net bottom-line profits'
    },
    {
      title: 'P/E Ratio',
      value: peRatio ? peRatio.toFixed(2) : 'N/A',
      icon: BarChart3,
      iconColor: 'text-brand-blue',
      valueColor: 'text-text-primary',
      description: 'Earnings multiple'
    },
    {
      title: 'Revenue Growth',
      value: formatPercent(revenueGrowth),
      icon: TrendingUp,
      iconColor: isGrowthPositive ? 'text-brand-success' : 'text-brand-danger',
      valueColor: isGrowthPositive ? 'text-brand-success' : 'text-brand-danger',
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
            className="dashboard-card p-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-1">
                <span className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider leading-tight">{card.title}</span>
                <div className="shrink-0 p-1 rounded bg-bg-base border border-border-base">
                  <Icon className={`w-3.5 h-3.5 ${card.iconColor}`} />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className={`text-xl font-bold tracking-tight ${card.valueColor}`}>
                  {card.value}
                </p>
                <p className="text-[9px] text-text-secondary">
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
