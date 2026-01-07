import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Star, ExternalLink, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
const RESELLERS = [
  { id: 1, name: "EuroGSM Hub", region: "Europe", score: 98, node: "EU-West", status: "Certified" },
  { id: 2, name: "Nexus Middle East", region: "Middle East", score: 95, node: "ME-Central", status: "Authorized" },
  { id: 3, name: "Americas Unlock", region: "North America", score: 99, node: "NA-East", status: "Certified" },
  { id: 4, name: "Asia-Pacific Auth", region: "Asia", score: 92, node: "AP-South", status: "Authorized" },
  { id: 5, name: "Latam Digital", region: "Latin America", score: 89, node: "SA-North", status: "Authorized" },
  { id: 6, name: "Nordic Tech Repairs", region: "Scandinavia", score: 97, node: "EU-North", status: "Certified" },
  { id: 7, name: "Afridev Solutions", region: "Africa", score: 91, node: "AF-South", status: "Certified" },
  { id: 8, name: "Oceania GSM", region: "Australia", score: 94, node: "OC-East", status: "Authorized" },
];
export function ResellerGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24" id="resellers">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-foreground">
            Global <span className="text-cyan-500">Reseller</span> Network
          </h2>
          <p className="text-muted-foreground mt-4 text-sm md:text-base leading-relaxed">
            Connect with authorized local service providers. Our certified network ensures regional payment support and localized technical assistance.
          </p>
        </div>
        <Button variant="outline" className="rounded-full px-8 glass-premium border-cyan-500/20 hover:border-cyan-500/50">
          Apply for Reseller Access
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {RESELLERS.map((reseller, idx) => (
          <motion.div
            key={reseller.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group relative flex flex-col h-full glass-premium border border-cyan-500/10 rounded-2xl md:rounded-3xl p-5 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="bg-cyan-500/5 text-cyan-600 border-cyan-500/20 text-[8px] uppercase font-bold tracking-widest">
                {reseller.region}
              </Badge>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <h4 className="font-bold text-sm md:text-base text-foreground line-clamp-1">
                  {reseller.name}
                </h4>
                {reseller.status === 'Certified' && (
                  <BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
                )}
              </div>
              <div className="flex items-center gap-4 text-muted-foreground text-[10px] uppercase font-bold tracking-wider mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>{reseller.score} Trust</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-cyan-500" />
                  <span>{reseller.node}</span>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between rounded-xl hover:bg-cyan-500/10 hover:text-cyan-600 text-[10px] font-bold uppercase tracking-widest p-0 px-3 h-10 group/btn"
            >
              Visit Store
              <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}