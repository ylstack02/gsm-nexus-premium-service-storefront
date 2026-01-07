import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { StatusTimeline } from '@/components/tracking/StatusTimeline';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getOrderByTrackingId } from '@/lib/api-client';
import { 
  Search, 
  AlertCircle, 
  FileSearch, 
  History, 
  ShieldCheck, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Order } from '@shared/types';
export function TrackingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const [searchVal, setSearchVal] = useState(initialId);
  const [history, setHistory] = useState<string[]>([]);
  const { data: order, isLoading, isError, refetch } = useQuery<Order, Error>({
    queryKey: ['order', initialId],
    queryFn: () => getOrderByTrackingId(initialId),
    enabled: !!initialId,
    retry: false
  });
  useEffect(() => {
    if (order && order.trackingId) {
      setHistory(prev => {
        if (prev.includes(order.trackingId)) return prev;
        return [order.trackingId, ...prev].slice(0, 3);
      });
    }
  }, [order]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setSearchParams({ id: searchVal.trim() });
    }
  };
  useEffect(() => {
    if (initialId) refetch();
  }, [initialId, refetch]);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Live Order <span className="text-cyan-500">Tracking</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Connect to our global server cluster for real-time processing updates on your GSM services.
          </p>
        </div>
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSearch}
          className="relative max-w-2xl mx-auto mb-20"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative flex flex-col sm:flex-row gap-2 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="NEX-123456 or IMEI"
                  className="h-16 pl-14 border-none bg-transparent text-lg font-mono focus-visible:ring-0 placeholder:text-muted-foreground/50"
                />
              </div>
              <Button type="submit" className="h-16 px-10 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-md font-bold shadow-lg shadow-cyan-500/20 transition-all">
                Track Status
              </Button>
            </div>
          </div>
        </motion.form>
        <div className="space-y-16">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-24 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
                <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-cyan-500" />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Syncing with server API...</p>
            </div>
          )}
          {isError && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-premium border-red-500/20 rounded-3xl p-10 text-center max-w-2xl mx-auto shadow-2xl shadow-red-500/5"
            >
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Transmission Interrupted</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                The specified Tracking ID could not be matched. Please ensure you copied the ID exactly as it appears in your receipt, or try searching by IMEI.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => setSearchVal('')} className="rounded-full px-8 glass-premium">Retry Search</Button>
                <Link to="/contact">
                  <Button variant="ghost" className="rounded-full px-8 text-cyan-600 font-bold">Contact Support</Button>
                </Link>
              </div>
            </motion.div>
          )}
          {order && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-cyan-500 rounded-3xl text-white shadow-2xl cyan-glow">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Simulated Cluster Node: Gamma-9</div>
                  <h2 className="text-3xl font-display font-bold">Session Overview</h2>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Current State</div>
                  <div className="text-3xl font-mono font-bold tracking-tighter">{order.status.toUpperCase()}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <StatusTimeline order={order} />
                </div>
                <div className="space-y-6">
                  <div className="glass-premium rounded-3xl p-8 shadow-sm border-cyan-500/10">
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                      <FileSearch className="w-3.5 h-3.5 text-cyan-500" />
                      Session Meta
                    </h3>
                    <div className="space-y-6 text-sm">
                      <div className="flex flex-col gap-1 border-b border-slate-100 dark:border-white/5 pb-4">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">Internal ID</span>
                        <span className="font-mono font-bold text-cyan-500">{order.trackingId}</span>
                      </div>
                      <div className="flex flex-col gap-1 border-b border-slate-100 dark:border-white/5 pb-4">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">Session Start</span>
                        <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground">Notification Endpoint</span>
                        <span className="font-medium flex items-center gap-2 truncate text-xs">
                          {order.customerEmail}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden group border border-white/5 shadow-xl">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <ExternalLink className="w-20 h-20" />
                    </div>
                    <h4 className="font-bold mb-2">Need Live Support?</h4>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      Our technical engineers are available on Telegram for enterprise escalations and API assistance.
                    </p>
                    <Button size="sm" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl h-10 border-none shadow-lg shadow-cyan-500/20 font-bold uppercase tracking-widest text-[10px]">
                      Open Telegram API
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {!initialId && !isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              {history.length > 0 && (
                <div className="w-full max-w-lg mb-12">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center justify-center gap-2">
                    <History className="w-3 h-3 text-cyan-500" />
                    Recent Activity History
                  </h3>
                  <div className="flex flex-col gap-2">
                    {history.map(id => (
                      <button 
                        key={id}
                        onClick={() => setSearchParams({ id })}
                        className="p-4 glass-premium rounded-2xl flex items-center justify-between group hover:border-cyan-500/50 transition-all border-cyan-500/10 shadow-sm"
                      >
                        <span className="font-mono text-sm font-bold text-cyan-600">{id}</span>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground group-hover:text-cyan-500 uppercase tracking-widest">
                          Re-scan
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center mt-8">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-muted-foreground mb-6 ring-1 ring-slate-200 dark:ring-slate-700">
                  <ShieldCheck className="w-10 h-10 opacity-30" />
                </div>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                  Authentication records are retained for 30 days. All tracking data is encrypted at rest in our secure cluster.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}