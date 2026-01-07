import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Globe, Zap, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const WORDS = ["iPhone Unlocks", "FRP Removal", "Server Checks", "MDM Bypass"];
export function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      {/* Dynamic Background Particles */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-100 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3 fill-current" />
              Trusted by 500+ Repair Centers
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-bold leading-[1.1] text-foreground mb-6">
              Next-Gen <br />
              <span className="text-gradient-cyan">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[index]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {WORDS[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Professional, server-side unlocking for major brands. 
              API-driven processing with 99.9% uptime and instant delivery for high-demand services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 rounded-full h-14 group cyan-glow">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="outline" className="px-8 rounded-full h-14 glass-premium">
                  Track Order
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=nexus-${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                <span className="font-bold text-foreground">Active Processing:</span> 42 services live
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 glass-premium rounded-3xl p-8 shadow-2xl overflow-hidden group">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-cyan-500/40" />
                </div>
                <div className="text-[10px] font-mono text-cyan-500/70">gsmnexus_v2_core.sh</div>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Terminal className="w-5 h-5 text-cyan-500 mt-1" />
                  <div className="font-mono text-sm">
                    <p className="text-cyan-500">$ nexus init --secure</p>
                    <p className="text-muted-foreground mt-1">Establishing encrypted tunnel...</p>
                    <p className="text-cyan-400 mt-1">[OK] Connection: Server Cluster-Alpha</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="w-5 h-5 text-blue-500 mt-1" />
                  <div className="font-mono text-sm">
                    <p className="text-blue-500">$ check --imei=352932...</p>
                    <p className="text-muted-foreground mt-1">Database sync in progress...</p>
                    <p className="text-emerald-500 mt-1">[ELIGIBLE] Device: Clean / Factory Unlock</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Cpu className="w-5 h-5 text-indigo-500 mt-1" />
                  <div className="font-mono text-sm">
                    <p className="text-indigo-500">$ start --service=frp-samsung</p>
                    <p className="text-muted-foreground mt-1">Status: <span className="text-amber-500 animate-pulse">Running</span></p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-cyan-500 p-5 rounded-2xl shadow-xl transform rotate-2 transition-transform group-hover:rotate-0">
                <div className="text-white text-[10px] font-bold uppercase tracking-widest mb-1">Latency</div>
                <div className="text-white text-xl font-bold">14ms</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-full h-full border border-cyan-500/20 rounded-3xl -z-10 transform translate-x-4 translate-y-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}