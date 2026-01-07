import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Search, PenTool, Activity, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
const STEPS = [
  {
    id: 1,
    title: "Service Discovery",
    desc: "Browse our dynamic catalog of 500+ secure GSM gateways.",
    icon: Search,
  },
  {
    id: 2,
    title: "Encrypted Submission",
    desc: "Submit device details via server-side encrypted order forms.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "Real-time Processing",
    desc: "Monitor status as our API cluster handles your request.",
    icon: Activity,
  }
];
export function OrderFlowGuide() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 overflow-hidden" id="pipeline">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
          <Activity className="w-3 h-3 animate-pulse" />
          Automated Infrastructure
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-foreground">
          Service <span className="text-cyan-500">Pipeline</span>
        </h2>
        <p className="text-muted-foreground mt-4 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
          From submission to delivery, our automated systems ensure maximum speed and 99.9% reliability.
        </p>
      </div>
      <LayoutGroup>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-stretch">
          {/* Desktop Connecting Lines */}
          <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-[2px] bg-slate-100 dark:bg-slate-800 -z-10">
            <motion.div 
              className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]"
              animate={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 progress-line-glow" />
          </div>
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            const isCompleted = idx < activeStep;
            return (
              <motion.div
                key={step.id}
                layout
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "relative group cursor-pointer flex flex-col items-center md:items-start text-center md:text-left p-6 md:p-8 rounded-[2rem] transition-all duration-500 border-2",
                  isActive 
                    ? "glass-premium border-cyan-500/30 cyan-glow scale-[1.02] z-20" 
                    : "bg-transparent border-transparent opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                )}
              >
                <div className="relative mb-6">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={cn(
                      "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-500",
                      isActive ? "bg-cyan-500 text-white shadow-xl shadow-cyan-500/40" :
                      isCompleted ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="w-8 h-8" /> : <Icon className={cn("w-8 h-8", isActive && "animate-pulse")} />}
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="active-ring"
                      className="absolute -inset-2 border-2 border-cyan-500/30 rounded-[1.5rem]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className={cn(
                    "text-lg md:text-xl font-bold transition-colors",
                    isActive ? "text-cyan-600 dark:text-cyan-400" : "text-foreground"
                  )}>
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-[240px]">
                    {step.desc}
                  </p>
                </div>
                {/* Mobile Connector */}
                {idx < STEPS.length - 1 && (
                  <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-200 dark:bg-slate-800" />
                )}
              </motion.div>
            );
          })}
        </div>
      </LayoutGroup>
      {/* Manual Indicator Controls (Hidden but accessible for UX) */}
      <div className="mt-12 flex justify-center gap-2">
        {STEPS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              activeStep === idx ? "w-8 bg-cyan-500" : "w-2 bg-slate-200 dark:bg-slate-800"
            )}
          />
        ))}
      </div>
    </section>
  );
}