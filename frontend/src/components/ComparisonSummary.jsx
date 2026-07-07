import React from 'react';
import { BrainCircuit, Trophy, FileText, BarChart3, AlertCircle } from 'lucide-react';

export default function ComparisonSummary({ comparison, company1, company2 }) {
  if (!comparison) {
    return (
      <div className="glass-card rounded-2xl p-6 border border-white/5 text-center text-slate-400 text-sm">
        No comparison data available.
      </div>
    );
  }

  const { winner, reason, summary, comparisonScore } = comparison;
  const company1Score = comparisonScore?.company1;
  const company2Score = comparisonScore?.company2;

  const c1 = company1.company;
  const c2 = company2.company;

  // Generate character-based progress bar (scale of 10)
  const makeBlockBar = (score) => {
    if (score === undefined || score === null) return '░░░░░░░░░░';
    const val = Number(score);
    // Convert 0-100 or 0-10 to standard 10 blocks
    const normalized = val > 10 ? Math.round(val / 10) : Math.round(val);
    const fillCount = Math.max(0, Math.min(10, normalized));
    const emptyCount = 10 - fillCount;
    return '█'.repeat(fillCount) + '░'.repeat(emptyCount);
  };

  const isC1Winner = String(winner).toLowerCase() === String(c1.symbol).toLowerCase() || 
                     String(winner).toLowerCase() === String(c1.name).toLowerCase();
  
  const isC2Winner = String(winner).toLowerCase() === String(c2.symbol).toLowerCase() || 
                     String(winner).toLowerCase() === String(c2.name).toLowerCase();

  return (
    <div className="glass-card rounded-3xl relative overflow-hidden border border-brand-purple/20 p-6 md:p-8">
      {/* Decorative gradients */}
      <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full blur-[85px] bg-brand-purple/10 pointer-events-none" />
      <div className="absolute bottom-[-50%] left-[-10%] w-[300px] h-[300px] rounded-full blur-[85px] bg-brand-blue/10 pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 z-10 relative">
        {/* Left Column: Winner Callout */}
        <div className="flex flex-col justify-center gap-4 text-center lg:text-left lg:w-1/3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-brand-purple font-bold uppercase tracking-widest self-center lg:self-start">
            <BrainCircuit className="w-3.5 h-3.5 text-brand-purple" />
            AI investment verdict
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Investment Winner
            </h3>
            <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-1">
              <Trophy className="w-6 h-6 text-emerald-400 shrink-0" />
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(52,211,153,0.15)]">
                {winner}
              </h2>
            </div>
          </div>

          {/* Scores bar visual */}
          <div className="space-y-3 pt-3 border-t border-white/5">
            <div className="flex items-center gap-2 text-slate-400 justify-center lg:justify-start">
              <BarChart3 className="w-3.5 h-3.5 text-brand-blue" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Comparison Score</span>
            </div>
            
            <div className="space-y-2 text-left">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-0.5">
                  <span>{c1.symbol}</span>
                  <span className="text-brand-purple font-mono">{company1Score !== undefined ? `${company1Score}/100` : 'N/A'}</span>
                </div>
                <div className="text-xs font-mono tracking-wider text-brand-purple leading-none select-none">
                  {makeBlockBar(company1Score)}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-0.5">
                  <span>{c2.symbol}</span>
                  <span className="text-brand-blue font-mono">{company2Score !== undefined ? `${company2Score}/100` : 'N/A'}</span>
                </div>
                <div className="text-xs font-mono tracking-wider text-brand-blue leading-none select-none">
                  {makeBlockBar(company2Score)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reasoning text box */}
        <div className="flex-1 flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-5 md:p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-400">
              <FileText className="w-4 h-4 text-brand-purple" />
              <span className="text-xs font-bold uppercase tracking-wider">AI analysis verdict reason</span>
            </div>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed font-light text-justify">
              {reason}
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 text-xs text-slate-400 space-y-1">
            <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block">Executive Summary</span>
            <p className="leading-relaxed font-light text-slate-300">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
