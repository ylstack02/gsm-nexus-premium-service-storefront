import React from 'react';
import { Order, OrderStatus } from '@shared/types';
import { CheckCircle2, Clock, Package, AlertCircle, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
interface StatusTimelineProps {
  order: Order;
}
export function StatusTimeline({ order }: StatusTimelineProps) {
  const stages = [
    {
      id: 'pending',
      label: 'Order Received',
      description: 'Your request is in the queue.',
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      id: 'verifying',
      label: 'Security Check',
      description: 'Payment and device verification.',
      icon: <Package className="w-5 h-5" />
    },
    {
      id: 'processing',
      label: 'Server API Processing',
      description: 'Request sent to carrier servers.',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      id: 'completed',
      label: 'Delivery Complete',
      description: 'Unlock code or auth sent.',
      icon: <CheckCircle2 className="w-5 h-5" />
    }
  ];
  const getStatusIndex = (status: OrderStatus) => {
    switch (status) {
      case 'completed': return 3;
      case 'processing': return 2;
      case 'verifying': return 1;
      case 'pending': return 0;
      default: return 0;
    }
  };
  const currentIndex = getStatusIndex(order.status);
  const isRejected = order.status === 'rejected';
  return (
    <div className="bg-white dark:bg-slate-900 border rounded-2xl p-8 shadow-sm">
      {isRejected && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-bold text-red-700 dark:text-red-400">Order Rejected</h5>
            <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1">This request could not be processed. Please contact technical support for details.</p>
          </div>
        </div>
      )}
      <div className="relative space-y-10">
        <div className="absolute left-[20px] top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
        {stages.map((stage, idx) => {
          const isCompleted = idx < currentIndex && !isRejected;
          const isActive = idx === currentIndex && !isRejected;
          const isFaded = isRejected || idx > currentIndex;
          return (
            <div key={stage.id} className={cn("relative flex gap-6", isFaded && !isActive && "opacity-50")}>
              <div
                className={cn(
                  "relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-500",
                  isCompleted ? "bg-emerald-500 border-emerald-500 text-white" :
                  isActive ? "bg-cyan-600 border-cyan-600 text-white shadow-lg shadow-cyan-500/30" :
                  "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-muted-foreground"
                )}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : stage.icon}
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={cn(
                    "font-bold text-sm",
                    isActive ? "text-cyan-600" : isCompleted ? "text-emerald-600" : "text-foreground"
                  )}>
                    {stage.label}
                  </h4>
                  {isActive && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 animate-pulse">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                  {stage.description}
                </p>
                {isActive && (
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-muted-foreground bg-slate-50 dark:bg-slate-800 p-2 rounded-lg border border-dashed">
                    <Clock className="w-3 h-3" />
                    Estimated completion: 15-45 minutes
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}