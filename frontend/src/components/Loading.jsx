import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 1, text: 'Fetching company profile', range: [0, 20] },
  { id: 2, text: 'Fetching financial data', range: [21, 40] },
  { id: 3, text: 'Reading latest news', range: [41, 60] },
  { id: 4, text: 'AI analyzing company', range: [61, 85] },
  { id: 5, text: 'Preparing recommendation', range: [86, 100] }
];

export default function Loading({ isDataReady, onFinished }) {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  // Smoothly increment progress
  useEffect(() => {
    let interval;
    
    if (!isDataReady) {
      // Simulate progress up to 90% slowly
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev < 90) {
            const increment = Math.random() * 8;
            const nextProgress = Math.min(prev + increment, 90);
            return nextProgress;
          }
          return prev;
        });
      }, 500);
    } else {
      // Speed up progress to 100% when backend has returned
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev < 100) {
            const nextProgress = prev + 15;
            return Math.min(nextProgress, 100);
          } else {
            clearInterval(interval);
            // Slight delay before calling complete to show 100%
            setTimeout(() => {
              onFinished();
            }, 500);
            return 100;
          }
        });
      }, 80);
    }

    return () => clearInterval(interval);
  }, [isDataReady, onFinished]);

  // Update active step based on current progress
  useEffect(() => {
    const matchedStep = STEPS.find(step => progress >= step.range[0] && progress <= step.range[1]);
    if (matchedStep) {
      setActiveStep(matchedStep.id);
    }
  }, [progress]);

  // Math for SVG ring
  const radius = 60;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4">
      <div className="absolute top-[30%] w-[350px] h-[350px] rounded-full bg-brand-blue/5 blur-[90px] pointer-events-none" />
      
      <div className="max-w-md w-full glass-card rounded-2xl p-8 relative overflow-hidden flex flex-col items-center space-y-8">
        
        {/* Glow border overlay */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent" />

        {/* Circular Progress Ring */}
        <div className="relative flex items-center justify-center w-36 h-36">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Ring */}
            <circle
              stroke="rgba(255,255,255,0.03)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius + stroke}
              cy={radius + stroke}
            />
            {/* Animated Gradient Ring */}
            <motion.circle
              stroke="url(#progressGradient)"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius + stroke}
              cy={radius + stroke}
              className="progress-ring__circle"
            />
            {/* Gradients */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-extrabold text-white font-sans">{Math.round(progress)}%</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Analysing</span>
          </div>
        </div>

        {/* Dynamic Status Title */}
        <div className="text-center w-full min-h-[28px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeStep}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-slate-300 font-medium tracking-wide flex items-center justify-center gap-2"
            >
              <Loader2 className="w-4 h-4 text-brand-blue animate-spin" />
              {STEPS[activeStep - 1]?.text}...
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Step-by-Step Checklist */}
        <div className="w-full border-t border-white/5 pt-6 space-y-4">
          {STEPS.map((step) => {
            const isCompleted = progress > step.range[1];
            const isActive = progress >= step.range[0] && progress <= step.range[1];

            return (
              <div 
                key={step.id} 
                className={`flex items-center justify-between text-sm transition-all duration-300 ${
                  isCompleted 
                    ? 'text-slate-300 font-medium' 
                    : isActive 
                      ? 'text-brand-purple font-semibold' 
                      : 'text-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.3)]" />
                    </motion.div>
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-brand-purple animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 bg-slate-900/50" />
                  )}
                  <span>{step.text}</span>
                </div>
                <div>
                  {isCompleted ? (
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Done</span>
                  ) : isActive ? (
                    <span className="text-xs text-brand-purple font-semibold animate-pulse">Running</span>
                  ) : (
                    <span className="text-xs text-slate-700">Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
