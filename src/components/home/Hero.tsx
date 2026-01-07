import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
export function Hero() {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap className="w-3 h-3" />
              Next-Gen GSM Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] text-foreground mb-6">
              Unlock the Potential of your <span className="text-blue-600">Mobile Device</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Professional, server-side unlocking and repair services for iPhone, Samsung, Xiaomi, and more. 
              Reliable delivery, competitive rates, and 24/7 automated processing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-full h-14 group">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="outline" className="px-8 rounded-full h-14 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                  Track Existing Order
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">5,000+</span> repairs completed this month
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-2xl overflow-hidden group">
              <div className="flex items-center justify-between mb-4 border-b pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">gsm_nexus_v2.0.sh</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Terminal className="w-5 h-5 text-blue-500 mt-1" />
                  <div className="font-mono text-sm">
                    <p className="text-blue-500">$ query_service --id=iphone-15-world</p>
                    <p className="text-muted-foreground mt-1">Checking worldwide database availability...</p>
                    <p className="text-emerald-500 mt-1">[SUCCESS] Service available: Worldwide Factory Unlock</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-purple-500 mt-1" />
                  <div className="font-mono text-sm">
                    <p className="text-purple-500">$ fetch_status --order=NEX-7821</p>
                    <p className="text-muted-foreground mt-1">Status: COMPLETED</p>
                    <p className="text-slate-400 text-xs mt-1">Completed in 12m 42s</p>
                  </div>
                </div>
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-4 -right-4 bg-blue-600 p-4 rounded-2xl shadow-xl transform rotate-3 transition-transform group-hover:rotate-0">
                <p className="text-white text-xs font-bold">LIVE METRICS</p>
                <p className="text-white/80 text-[10px]">99.9% Success</p>
              </div>
            </div>
            {/* Visual Background Decoration */}
            <div className="absolute -top-10 -right-10 w-full h-full border border-blue-500/20 rounded-3xl -z-10 transform translate-x-4 translate-y-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}