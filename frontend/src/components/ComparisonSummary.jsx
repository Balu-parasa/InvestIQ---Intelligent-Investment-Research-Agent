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
    <div className="dashboard-card p-8 md:p-10 border-t-4 border-t-[#1E1C1A] shadow-[0_4px_24px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.015)]">
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-10 relative">
        
        {/* Left Column: Winner Callout */}
        <div className="flex flex-col justify-center gap-5 text-center lg:text-left lg:w-1/3 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCFAF7] border border-border-base text-[10px] text-text-secondary font-bold uppercase tracking-wider self-center lg:self-start shadow-sm">
            <BrainCircuit className="w-3.5 h-3.5 text-[#1E1C1A]" />
            AI Investment Verdict
          </div>

          <div className="space-y-2">
            <h3 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
              Investment Winner
            </h3>
            <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-1.5">
              <Trophy className="w-5 h-5 text-[#4A6D55] shrink-0" />
              <span className="bg-[#1E1C1A] text-white text-xs px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider shadow-sm">
                {winner}
              </span>
            </div>
          </div>

          {/* Scores bar visual */}
          <div className="space-y-4 pt-4 border-t border-border-base">
            <div className="flex items-center gap-2 text-text-secondary justify-center lg:justify-start">
              <BarChart3 className="w-3.5 h-3.5 text-[#1E1C1A]" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Comparison Score</span>
            </div>
            
            <div className="space-y-3 text-left">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-text-secondary mb-1">
                  <span>{c1.symbol}</span>
                  <span className="text-text-primary font-mono">{company1Score !== undefined ? `${company1Score}/100` : 'N/A'}</span>
                </div>
                <div className="w-full bg-[#EAE5DB] border border-border-base h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1E1C1A] h-full rounded-full" style={{ width: `${getPercent(company1Score)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold text-text-secondary mb-1">
                  <span>{c2.symbol}</span>
                  <span className="text-text-primary font-mono">{company2Score !== undefined ? `${company2Score}/100` : 'N/A'}</span>
                </div>
                <div className="w-full bg-[#EAE5DB] border border-border-base h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1E1C1A] h-full rounded-full" style={{ width: `${getPercent(company2Score)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reasoning text box */}
        <div className="flex-1 flex flex-col justify-between bg-[#FCFAF7] border border-border-base rounded-2xl p-6 space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-text-secondary">
              <FileText className="w-3.5 h-3.5 text-[#1E1C1A]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Investment Reasoning</span>
            </div>
            <p className="text-xs md:text-sm text-text-primary leading-[1.85] font-normal">
              {reason}
            </p>
          </div>

          <div className="pt-4 border-t border-border-base">
            <div className="rounded-xl bg-[#1E1C1A]/5 border border-[#1E1C1A]/15 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-3.5 h-3.5 text-[#1E1C1A] shrink-0" />
                <span className="font-bold text-[#1E1C1A] uppercase text-[9px] tracking-wider">Executive Summary</span>
              </div>
              <p className="text-xs leading-[1.75] text-text-primary font-medium">
                {summary}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
