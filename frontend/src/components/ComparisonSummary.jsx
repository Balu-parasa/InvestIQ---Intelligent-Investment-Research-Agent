import React from 'react';
import { BrainCircuit, Trophy, FileText, BarChart3 } from 'lucide-react';

export default function ComparisonSummary({ comparison, company1, company2 }) {
  if (!comparison) {
    return (
      <div className="dashboard-card p-6 text-center text-text-secondary text-sm">
        No comparison data available.
      </div>
    );
  }

  const { winner, reason, summary, comparisonScore } = comparison;
  const company1Score = comparisonScore?.company1;
  const company2Score = comparisonScore?.company2;

  const c1 = company1.company;
  const c2 = company2.company;

  const getPercent = (score) => {
    if (score === undefined || score === null) return 0;
    const val = Number(score);
    return val > 10 ? val : val * 10;
  };

  return (
    <div className="dashboard-card p-6 md:p-8">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 relative">
        
        {/* Left Column: Winner Callout */}
        <div className="flex flex-col justify-center gap-4 text-center lg:text-left lg:w-1/3 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-bg-base border border-border-base text-[10px] text-text-secondary font-semibold uppercase tracking-wider self-center lg:self-start">
            <BrainCircuit className="w-3.5 h-3.5 text-brand-blue" />
            AI Investment Verdict
          </div>

          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
              Investment Winner
            </h3>
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
              <Trophy className="w-5 h-5 text-brand-success shrink-0" />
              <h2 className="text-xl font-extrabold tracking-tight text-brand-success uppercase">
                {winner}
              </h2>
            </div>
          </div>

          {/* Scores bar visual */}
          <div className="space-y-3 pt-3 border-t border-border-base">
            <div className="flex items-center gap-2 text-text-secondary justify-center lg:justify-start">
              <BarChart3 className="w-3.5 h-3.5 text-brand-blue" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Comparison Score</span>
            </div>
            
            <div className="space-y-2 text-left">
              <div>
                <div className="flex justify-between text-[10px] font-semibold text-text-secondary mb-1">
                  <span>{c1.symbol}</span>
                  <span className="text-text-primary font-mono">{company1Score !== undefined ? `${company1Score}/100` : 'N/A'}</span>
                </div>
                <div className="w-full bg-bg-base border border-border-base h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-blue h-full" style={{ width: `${getPercent(company1Score)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-semibold text-text-secondary mb-1">
                  <span>{c2.symbol}</span>
                  <span className="text-text-primary font-mono">{company2Score !== undefined ? `${company2Score}/100` : 'N/A'}</span>
                </div>
                <div className="w-full bg-bg-base border border-border-base h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand-blue h-full" style={{ width: `${getPercent(company2Score)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reasoning text box */}
        <div className="flex-1 flex flex-col justify-between bg-bg-base border border-border-base rounded-xl p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-text-secondary">
              <FileText className="w-3.5 h-3.5 text-brand-blue" />
              <span className="text-[10px] font-bold uppercase tracking-wider">AI Analysis Verdict Reason</span>
            </div>
            <p className="text-sm text-text-primary leading-relaxed">
              {reason}
            </p>
          </div>

          <div className="pt-3 border-t border-border-base text-xs text-text-secondary space-y-1">
            <span className="font-bold text-text-secondary/60 uppercase text-[9px] tracking-wider block">Executive Summary</span>
            <p className="leading-relaxed text-text-secondary">
              {summary}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
