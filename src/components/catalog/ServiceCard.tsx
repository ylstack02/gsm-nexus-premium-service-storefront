import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '@shared/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
interface ServiceCardProps {
  service: Service;
}
const getServiceTag = (service: Service) => {
  const name = service.name.toLowerCase();
  const cat = service.categoryId.toLowerCase();
  if (name.includes('imei') || name.includes('unlock') || cat.includes('unlock')) return 'IMEI';
  if (name.includes('frp') || cat.includes('frp')) return 'FRP';
  if (name.includes('gsx') || name.includes('check') || cat.includes('logs')) return 'SERVER';
  if (name.includes('mi ') || name.includes('auth') || cat.includes('xiaomi')) return 'REMOTE';
  return 'SERVICE';
};
export function ServiceCard({ service }: ServiceCardProps) {
  const tag = getServiceTag(service);
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="group glass-premium border border-slate-200/60 dark:border-white/10 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-700 flex flex-col h-full rounded-2xl md:rounded-3xl overflow-hidden relative">
        {(service.featured || tag !== 'SERVICE') && (
          <div className="absolute top-0 right-0 overflow-hidden w-20 h-20 md:w-28 md:h-28 pointer-events-none z-10">
            <div className="bg-cyan-500 text-white text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] py-1.5 w-[160%] text-center transform rotate-45 translate-x-[28%] translate-y-[35%] shadow-lg shadow-cyan-500/30 relative overflow-hidden">
              <span className="relative z-10">{tag}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer" />
            </div>
          </div>
        )}
        <CardHeader className="p-4 md:p-6 pb-2">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="flex items-center gap-2 md:gap-2.5">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600">
                <Zap className="w-3 h-3 md:w-4 md:h-4" />
              </div>
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                GSM SERVICE
              </span>
            </div>
            <Badge variant="outline" className="bg-white/50 dark:bg-slate-900/50 text-[7px] md:text-[9px] font-bold uppercase border-slate-200 dark:border-slate-800 px-1.5 py-0 md:px-2.5 md:py-0.5">
              {service.deliveryTime}
            </Badge>
          </div>
          <CardTitle className="text-sm md:text-xl font-display font-bold group-hover:text-cyan-600 transition-colors line-clamp-2 leading-tight">
            {service.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0 flex-1">
          <p className="text-[11px] md:text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 leading-relaxed">
            {service.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 md:p-6 pt-4 md:pt-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/10 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[7px] md:text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Pricing From</span>
            <span className="text-sm md:text-2xl font-bold text-cyan-600">${service.price.toFixed(2)}</span>
          </div>
          <Link to={`/service/${service.id}`}>
            <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full group/btn px-3 md:px-6 h-8 md:h-10 shadow-lg shadow-cyan-500/20 text-[10px] md:text-sm font-bold">
              Unlock
              <ArrowRight className="ml-1 h-3 w-3 md:ml-1.5 md:h-4 md:w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}