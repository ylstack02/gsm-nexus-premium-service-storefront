import React from 'react';
import { Check, User, CreditCard, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
interface CheckoutStepperProps {
  currentStep: number;
}
const STEPS = [
  { id: 1, name: 'Service', icon: User },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Success', icon: CheckCircle2 },
];
export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {STEPS.map((step, idx) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                    isCompleted ? "bg-cyan-500 border-cyan-500 text-white" :
                    isActive ? "bg-white dark:bg-slate-900 border-cyan-500 text-cyan-500 shadow-lg shadow-cyan-500/20" :
                    "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />}
                </div>
                <span className={cn(
                  "mt-3 text-[10px] font-bold uppercase tracking-widest",
                  isActive ? "text-cyan-600" : isCompleted ? "text-cyan-500" : "text-muted-foreground"
                )}>
                  {step.name}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-4 -mt-6 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                  {isCompleted && (
                    <div className="absolute inset-0 bg-cyan-500 transition-all duration-700 w-full" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}