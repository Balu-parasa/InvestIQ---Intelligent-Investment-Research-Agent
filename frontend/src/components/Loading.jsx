import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 1, text: 'Fetching company profile...', range: [0, 20] },
  { id: 2, text: 'Reading financial statements...', range: [21, 40] },
  { id: 3, text: 'Collecting latest news...', range: [41, 60] },
  { id: 4, text: 'Generating AI investment report...', range: [61, 85] },
  { id: 5, text: 'Preparing recommendation...', range: [86, 100] }
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
            setTimeout(() => {
              onFinished();
            }, 300);
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
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="max-w-md w-full dashboard-card p-8 flex flex-col items-center space-y-8">
        
        {/* Minimal Circular Progress */}
        <div className="relative flex items-center justify-center w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Ring */}
            <circle
              stroke="#1F2937"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius + stroke}
              cy={radius + stroke}
            />
            {/* Animated Ring */}
            <motion.circle
              stroke="#3B82F6"
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
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold text-text-primary">{Math.round(progress)}%</span>
            <span className="text-[9px] text-text-secondary uppercase tracking-wider font-semibold mt-0.5">Progress</span>
          </div>
        </div>

        {/* Dynamic Status Title */}
        <div className="text-center w-full min-h-[24px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-text-primary text-sm font-medium tracking-wide flex items-center justify-center gap-2"
            >
              <Loader2 className="w-4 h-4 text-brand-blue animate-spin" />
              {STEPS[activeStep - 1]?.text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Step-by-Step Checklist */}
        <div className="w-full border-t border-border-base pt-6 space-y-3.5">
          {STEPS.map((step) => {
            const isCompleted = progress > step.range[1];
            const isActive = progress >= step.range[0] && progress <= step.range[1];

            return (
              <div 
                key={step.id} 
                className={`flex items-center justify-between text-xs transition-colors duration-200 ${
                  isCompleted 
                    ? 'text-text-primary font-medium' 
                    : isActive 
                      ? 'text-brand-blue font-semibold' 
                      : 'text-text-secondary/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.15 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-success" />
                    </motion.div>
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-brand-blue animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-border-base bg-bg-base" />
                  )}
                  <span>{step.text.replace('...', '')}</span>
                </div>
                <div>
                  {isCompleted ? (
                    <span className="text-[10px] text-brand-success font-semibold px-2 py-0.5 rounded bg-brand-success/10">Done</span>
                  ) : isActive ? (
                    <span className="text-[10px] text-brand-blue font-semibold animate-pulse">Running</span>
                  ) : (
                    <span className="text-[10px] text-text-secondary/40">Pending</span>
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
