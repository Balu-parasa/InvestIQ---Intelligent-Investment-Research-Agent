import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function FinancialComparisonTable({ company1, company2 }) {
  if (!company1 || !company2) return null;

  const c1 = company1.company;
  const c2 = company2.company;
  const f1 = company1.financials;
  const f2 = company2.financials;
  const a1 = company1.analysis;
  const a2 = company2.analysis;

  // Formatters
  const formatFinancial = (num) => {
    if (num === null || num === undefined || num === 'N/A' || isNaN(Number(num))) return 'N/A';
    const val = Number(num);
    const absVal = Math.abs(val);
    const sign = val < 0 ? '-' : '';
    if (absVal >= 1e12) return `${sign}$${(absVal / 1e12).toFixed(2)} T`;
    if (absVal >= 1e9) return `${sign}$${(absVal / 1e9).toFixed(2)} B`;
    if (absVal >= 1e6) return `${sign}$${(absVal / 1e6).toFixed(2)} M`;
    return `${sign}$${val.toLocaleString()}`;
  };

  const formatGrowth = (val) => {
    if (val === null || val === undefined || val === 'N/A') return 'N/A';
    const num = Number(val);
    if (isNaN(num)) return String(val);
    const pct = Math.abs(num) < 1 ? num * 100 : num;
    const sign = pct > 0 ? '+' : '';
    return `${sign}${pct.toFixed(2)}%`;
  };

  const formatPE = (val) => {
    if (val === null || val === undefined || val === 'N/A' || isNaN(Number(val))) return 'N/A';
    return Number(val).toFixed(2);
  };

  // Raw values for comparison logic
  const rawData = {
    marketCap: { label: 'Market Cap', v1: f1.marketCap, v2: f2.marketCap, display1: formatFinancial(f1.marketCap), display2: formatFinancial(f2.marketCap) },
    revenue: { label: 'Revenue', v1: f1.revenue, v2: f2.revenue, display1: formatFinancial(f1.revenue), display2: formatFinancial(f2.revenue) },
    netIncome: { label: 'Net Income', v1: f1.netIncome, v2: f2.netIncome, display1: formatFinancial(f1.netIncome), display2: formatFinancial(f2.netIncome) },
    peRatio: { label: 'P/E Ratio', v1: f1.peRatio, v2: f2.peRatio, display1: formatPE(f1.peRatio), display2: formatPE(f2.peRatio) },
    revenueGrowth: { label: 'Revenue Growth', v1: f1.revenueGrowth, v2: f2.revenueGrowth, display1: formatGrowth(f1.revenueGrowth), display2: formatGrowth(f2.revenueGrowth) },
    overallScore: { label: 'Overall Score', v1: a1.overallScore, v2: a2.overallScore, display1: `${a1.overallScore || 'N/A'}/100`, display2: `${a2.overallScore || 'N/A'}/100` },
    confidence: { label: 'Confidence', v1: a1.confidence, v2: a2.confidence, display1: `${a1.confidence || 'N/A'}%`, display2: `${a2.confidence || 'N/A'}%` },
    riskLevel: { label: 'Risk Level', v1: a1.riskLevel, v2: a2.riskLevel, display1: a1.riskLevel || 'N/A', display2: a2.riskLevel || 'N/A' },
    recommendation: { label: 'Recommendation', v1: a1.recommendation, v2: a2.recommendation, display1: a1.recommendation || 'N/A', display2: a2.recommendation || 'N/A' }
  };

  const getStrongerCompany = (key, val1, val2) => {
    if (val1 === null || val1 === undefined || val1 === 'N/A') return 2;
    if (val2 === null || val2 === undefined || val2 === 'N/A') return 1;

    const n1 = Number(val1);
    const n2 = Number(val2);

    switch (key) {
      case 'marketCap':
      case 'revenue':
      case 'netIncome':
      case 'overallScore':
      case 'confidence':
        if (isNaN(n1)) return 2;
        if (isNaN(n2)) return 1;
        if (n1 > n2) return 1;
        if (n2 > n1) return 2;
        return 0;

      case 'revenueGrowth':
        const g1 = Math.abs(n1) < 1 ? n1 * 100 : n1;
        const g2 = Math.abs(n2) < 1 ? n2 * 100 : n2;
        if (isNaN(g1)) return 2;
        if (isNaN(g2)) return 1;
        if (g1 > g2) return 1;
        if (g2 > g1) return 2;
        return 0;

      case 'peRatio':
        if (isNaN(n1)) return 2;
        if (isNaN(n2)) return 1;
        if (n1 > 0 && n2 > 0) return n1 < n2 ? 1 : (n2 < n1 ? 2 : 0);
        if (n1 > 0 && n2 <= 0) return 1;
        if (n2 > 0 && n1 <= 0) return 2;
        return n1 > n2 ? 1 : (n2 > n1 ? 2 : 0);

      case 'riskLevel':
        const rMap = { 'low': 1, 'medium': 2, 'moderate': 2, 'high': 3 };
        const r1 = rMap[String(val1).toLowerCase()] || 2;
        const r2 = rMap[String(val2).toLowerCase()] || 2;
        if (r1 < r2) return 1;
        if (r2 < r1) return 2;
        return 0;

      case 'recommendation':
        const rec1 = String(val1).toUpperCase() === 'INVEST';
        const rec2 = String(val2).toUpperCase() === 'INVEST';
        if (rec1 && !rec2) return 1;
        if (!rec1 && rec2) return 2;
        return 0;

      default:
        return 0;
    }
  };

  const rows = Object.keys(rawData).map((key) => {
    const row = rawData[key];
    const stronger = getStrongerCompany(key, row.v1, row.v2);
    return {
      key,
      label: row.label,
      display1: row.display1,
      display2: row.display2,
      stronger
    };
  });

  return (
    <div className="dashboard-card overflow-hidden">
      <div className="p-5 border-b border-border-base">
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest">
          Financial & Metric Comparison
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-base bg-[#F8F7F4]/65">
              <th className="p-4 text-[10px] font-bold text-text-secondary uppercase tracking-wider">Financial Indicator</th>
              <th className="p-4 text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider text-right">
                {c1.name} <span className="text-[9px] text-text-secondary ml-1">({c1.symbol})</span>
              </th>
              <th className="p-4 text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider text-right">
                {c2.name} <span className="text-[9px] text-text-secondary ml-1">({c2.symbol})</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-base">
            {rows.map((row) => {
              const isC1Stronger = row.stronger === 1;
              const isC2Stronger = row.stronger === 2;

              const getCellStyles = (isStronger, value, rowKey) => {
                const lowerVal = String(value).toLowerCase();
                const isNegative = lowerVal.startsWith('-') || lowerVal.includes('decline') || lowerVal.includes('pass');

                if (isStronger) {
                  return 'text-[#22C55E] bg-[#22C55E]/5 font-bold';
                }

                if (isNegative && (rowKey === 'netIncome' || rowKey === 'revenueGrowth' || rowKey === 'recommendation')) {
                  return 'text-[#EF4444]';
                }

                return 'text-text-primary';
              };

              const renderIndicator = (isStronger, value, rowKey) => {
                const lowerVal = String(value).toLowerCase();
                const isNegative = lowerVal.startsWith('-');
                
                if (isStronger) {
                  if (rowKey === 'peRatio' || rowKey === 'riskLevel') {
                    return <ArrowDownRight className="w-3.5 h-3.5 inline mr-1 text-[#22C55E]" />;
                  }
                  return <ArrowUpRight className="w-3.5 h-3.5 inline mr-1 text-[#22C55E]" />;
                }
                
                if (isNegative && (rowKey === 'netIncome' || rowKey === 'revenueGrowth')) {
                  return <ArrowDownRight className="w-3.5 h-3.5 inline mr-1 text-[#EF4444]" />;
                }

                return null;
              };

              return (
                <tr key={row.key} className="hover:bg-[#F8F7F4]/40 transition-colors">
                  <td className="p-4 text-xs font-semibold text-text-secondary">{row.label}</td>
                  <td className={`p-4 text-xs text-right ${getCellStyles(isC1Stronger, row.display1, row.key)}`}>
                    {renderIndicator(isC1Stronger, row.display1, row.key)}
                    {row.display1}
                  </td>
                  <td className={`p-4 text-xs text-right ${getCellStyles(isC2Stronger, row.display2, row.key)}`}>
                    {renderIndicator(isC2Stronger, row.display2, row.key)}
                    {row.display2}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
