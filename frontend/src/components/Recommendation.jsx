import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Award, FileText } from 'lucide-react';

export default function Recommendation({ recommendation }) {
  const { decision, confidence, reasoning } = recommendation;
  const isInvest = decision?.toUpperCase() === 'INVEST';
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animate confidence score count-up on load
  useEffect(() => {
    const duration = 800; // ms
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const ease = progress * (2 - progress);
      setAnimatedScore(Math.round(ease * confidence));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [confidence]);

  // SVG parameters for circular confidence gauge
  const radius = 44;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className={`dashboard-card p-6 md:p-8 ${
      isInvest ? 'border-brand-success/20' : 'border-brand-danger/20'
    }`}>
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 relative">
        
        {/* Left Column: Decision Callout & Score */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left shrink-0">
          
          {/* Circular SVG Gauge */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r={radius}
                stroke="#1F2937"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <motion.circle
                cx="56"
                cy="56"
                r={radius}
                stroke={isInvest ? '#22C55E' : '#EF4444'}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold text-text-primary">{animatedScore}%</span>
              <span className="text-[8px] text-text-secondary uppercase tracking-wider font-semibold">Confidence</span>
            </div>
          </div>
 
          {/* Decision text badges */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-bg-base border border-border-base text-[10px] text-text-secondary font-semibold uppercase tracking-wider">
              <Award className="w-3 h-3 text-brand-blue" />
              Agent Opinion
            </div>
            
            <h3 className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest block">
              Investment Recommendation
            </h3>
            
            <h2 className={`text-3xl font-extrabold tracking-tight uppercase ${
              isInvest ? 'text-brand-success' : 'text-brand-danger'
            }`}>
              {decision}
            </h2>
          </div>
        </div>

        {/* Right Column: Reasoning text box */}
        <div className="flex-1 bg-bg-base border border-border-base rounded-xl p-5 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-text-secondary mb-2">
              <FileText className="w-3.5 h-3.5 text-brand-blue" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Analysis Reasoning Summary</span>
            </div>
            
            <p className="text-sm text-text-primary leading-relaxed font-normal">
              {reasoning}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-border-base text-xs text-text-secondary">
            {isInvest ? (
              <>
                <ShieldCheck className="w-4 h-4 text-brand-success shrink-0" />
                <span>Recommendation supports a long/buy bias. Perform individual target sizing.</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-brand-danger shrink-0" />
                <span>Recommendation indicates avoidance or short bias due to operational/macro headwinds.</span>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
