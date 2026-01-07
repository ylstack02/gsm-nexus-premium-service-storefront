import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Shield, Zap, Cpu, Server, Globe } from 'lucide-react';
const PARTNERS = [
  { name: 'Apple Authorized', icon: Smartphone },
  { name: 'Samsung Knox', icon: Shield },
  { name: 'Qualcomm', icon: Cpu },
  { name: 'Xiaomi MI', icon: Zap },
  { name: 'AT&T Network', icon: Globe },
  { name: 'Verizon Wireless', icon: Server },
  { name: 'GSMA Registry', icon: Shield },
  { name: 'T-Mobile', icon: Globe },
];
export function Partners() {
  return (
    <div className="w-full py-12 border-y border-slate-200/60 dark:border-white/5 bg-slate-50/30 dark:bg-slate-900/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center">
          Enterprise API Partners & Integrations
        </h3>
      </div>
      <div className="relative flex">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 items-center whitespace-nowrap min-w-full"
        >
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 text-muted-foreground hover:text-cyan-500 transition-all duration-300 grayscale hover:grayscale-0 cursor-default group"
              >
                <Icon className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-display font-bold uppercase tracking-widest">{partner.name}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}