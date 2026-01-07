import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, PenTool, Activity, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
const STEPS = [
  {
    id: 1,
    title: "1. Select Service",
    desc: "Browse our dynamic catalog of 500+ GSM gateways.",
    icon: Search,
  },
  {
    id: 2,
    title: "2. Submit Data",
    desc: "Enter device details via our encrypted order forms.",
    icon: PenTool,
  },
  {
    id: 3,
    title: "3. Global Tracking",
    desc: "Monitor real-time status as the API processes your request.",
    icon: Activity,
  }
];
export function OrderFlowGuide() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight">Automated <span className="text-cyan-500">Service Pipeline</span></h2>
        <p className="text-muted-foreground mt-4 text-sm md:text-base">Experience seamless processing from initiation to delivery.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connection Lines (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-100 dark:bg-slate-800 -z-10">
          <motion.div 
            className="h-full bg-cyan-500"
            animate={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          const isDone = activeStep > idx;
          return (
            <div key={idx} className="relative group cursor-pointer" onClick={() => setActiveStep(idx)}>
              <div className={cn(
                "flex flex-col items-center text-center p-8 rounded-3xl transition-all duration-500",
                isActive ? "glass-premium cyan-glow scale-105" : "opacity-60 hover:opacity-100"
              )}>
                <div className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500",
                  isActive ? "bg-cyan-500 text-white shadow-xl shadow-cyan-500/40" : 
                  isDone ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground"
                )}>
                  <Icon className={cn("w-8 h-8", isActive && "animate-pulse")} />
                </div>
                <h3 className={cn("text-lg font-bold mb-3 transition-colors", isActive && "text-cyan-600")}>
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
                {idx < STEPS.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6 text-slate-300">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}