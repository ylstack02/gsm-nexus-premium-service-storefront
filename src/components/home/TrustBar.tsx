import React from 'react';
import { CheckCircle2, Users, Clock, Globe } from 'lucide-react';
export function TrustBar() {
  const metrics = [
    { icon: <CheckCircle2 className="w-5 h-5" />, label: "Orders Done", value: "150k+" },
    { icon: <Users className="w-5 h-5" />, label: "Active Clients", value: "45,000+" },
    { icon: <Clock className="w-5 h-5" />, label: "Avg Delivery", value: "12min" },
    { icon: <Globe className="w-5 h-5" />, label: "Regions", value: "Global" },
  ];
  return (
    <div className="bg-slate-900 dark:bg-slate-900 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl flex flex-wrap justify-between gap-8 md:gap-4 items-center">
      {metrics.map((m, i) => (
        <div key={i} className="flex items-center gap-4 flex-1 min-w-[140px] border-r last:border-r-0 border-white/10">
          <div className="bg-cyan-500/20 p-2.5 rounded-xl text-cyan-500">
            {m.icon}
          </div>
          <div>
            <div className="text-xl font-bold text-white leading-none mb-1">{m.value}</div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{m.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}