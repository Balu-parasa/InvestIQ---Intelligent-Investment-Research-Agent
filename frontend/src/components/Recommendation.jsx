import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Award, FileText } from 'lucide-react';

export default function Recommendation({ recommendation }) {
  const { decision, confidence, reasoning, overallScore: propOverallScore } = recommendation;
  const isInvest = decision?.toUpperCase() === 'INVEST';
  const [animatedScore, setAnimatedScore] = useState(0);

  // Use prop overallScore if available, otherwise fallback to confidence
  const overallScore = propOverallScore || recommendation.overallScore || confidence || 75;

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

  // SVG parameters for circular confidence gauge (w-24 h-24, center 48, radius 36)
  const radius = 36;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className={`dashboard-card p-6 md:p-8 border-t-4 ${
      isInvest ? 'border-t-[#8B5CF6]' : 'border-t-[#EF4444]'
    } shadow-[0_4px_12px_rgba(0,0,0,0.02)]`}>
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 relative">
        
        {/* Left Column: Decision Callout & Score */}
        <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left shrink-0">
          
          {/* Circular SVG Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                stroke="#E7E5E4"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <motion.circle
                cx="48"
                cy="48"
                r={radius}
                stroke={isInvest ? '#8B5CF6' : '#EF4444'}
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
              <span className="text-lg font-bold text-text-primary">{animatedScore}%</span>
              <span className="text-[7px] text-text-secondary uppercase tracking-wider font-bold">Confidence</span>
            </div>
          </div>

          {/* Large Overall Score Number */}
          <div className="flex flex-col items-center justify-center shrink-0 px-2">
            <span className="text-4xl font-extrabold tracking-tight text-text-primary">
              {overallScore}<span className="text-text-secondary text-sm font-semibold">/100</span>
            </span>
            <span className="text-[9px] text-text-secondary uppercase tracking-widest font-bold mt-1">
              Overall Score
            </span>
          </div>
 
          {/* Decision text badges */}
          <div className="space-y-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F8F7F4] border border-border-base text-[9px] text-text-secondary font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Agent Opinion
            </div>
            
            <h3 className="text-[9px] font-bold text-text-secondary uppercase tracking-widest block">
              Investment Recommendation
            </h3>
            
            <div className="pt-0.5">
              <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#EC4899] text-white text-xs px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider shadow-sm">
                {decision}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Reasoning text box */}
        <div className="flex-1 bg-[#F8F7F4]/50 border border-border-base rounded-xl p-6 flex flex-col justify-between space-y-4 max-w-3xl">
          <div>
            <div className="flex items-center gap-2 text-text-secondary mb-3">
              <FileText className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Investment Reasoning</span>
            </div>
            
            <p className="text-xs md:text-sm text-text-primary leading-[1.85] font-normal">
              {reasoning}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-border-base text-xs text-text-secondary">
            {isInvest ? (
              <>
                <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Recommendation supports a long/buy bias. Perform individual target sizing.</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-[#EF4444] shrink-0" />
                <span>Recommendation indicates avoidance or short bias due to operational/macro headwinds.</span>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
