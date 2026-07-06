import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Award, FileText } from 'lucide-react';

export default function Recommendation({ recommendation }) {
  const { decision, confidence, reasoning } = recommendation;
  const isInvest = decision?.toUpperCase() === 'INVEST';
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate confidence score count-up on load
  useEffect(() => {
    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const ease = progress * (2 - progress);
      setAnimatedScore(Math.round(ease * confidence));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [confidence]);

  // SVG parameters for circular confidence gauge
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className={`glass-card rounded-3xl relative overflow-hidden border p-6 md:p-8 ${
      isInvest ? 'border-emerald-500/20' : 'border-rose-500/20'
    }`}>
      {/* Decorative colored glow background spots */}
      <div className={`absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-20 pointer-events-none ${
        isInvest ? 'bg-emerald-400' : 'bg-rose-400'
      }`} />
      <div className={`absolute bottom-[-50%] left-[-10%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-10 pointer-events-none ${
        isInvest ? 'bg-brand-blue' : 'bg-brand-purple'
      }`} />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 z-10 relative">
        
        {/* Left Column: Decision Callout & Score */}
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          
          {/* Circular SVG Gauge */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-slate-800"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <motion.circle
                cx="64"
                cy="64"
                r={radius}
                className={`transition-all duration-1000 ease-out ${
                  isInvest ? 'stroke-emerald-400' : 'stroke-rose-400'
                }`}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-extrabold text-white">{animatedScore}%</span>
              <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Confidence</span>
            </div>
          </div>

          {/* Decision text badges */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-slate-400 font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              Agent Opinion
            </div>
            
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
              Investment Recommendation
            </h3>
            
            <div className="overflow-hidden">
              <h2 className={`text-4xl md:text-5xl font-black tracking-tighter uppercase filter drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] ${
                isInvest 
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.25)]' 
                  : 'bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(244,63,94,0.25)]'
              }`}>
                {decision}
              </h2>
            </div>
          </div>
        </div>

        {/* Right Column: Reasoning text box */}
        <div className="flex-1 w-full lg:max-w-2xl bg-white/[0.02] border border-white/5 rounded-2xl p-5 md:p-6 space-y-3">
          <div className="flex items-center gap-2 text-slate-400">
            <FileText className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-bold uppercase tracking-wider">Analysis Reasoning Summary</span>
          </div>
          
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-light text-justify">
            {reasoning}
          </p>

          <div className="flex items-center gap-2 mt-4 pt-2 border-t border-white/5 text-xs text-slate-500">
            {isInvest ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Recommendation supports a long/buy bias. Perform individual target sizing.</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Recommendation indicates avoidance or short bias due to operational/macro headwinds.</span>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
