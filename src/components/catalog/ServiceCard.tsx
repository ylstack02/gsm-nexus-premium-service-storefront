import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '@shared/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
interface ServiceCardProps {
  service: Service;
}
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group glass-premium border border-slate-200/60 dark:border-white/10 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col h-full rounded-2xl md:rounded-3xl overflow-hidden relative">
      {service.featured && (
        <div className="absolute top-0 right-0 overflow-hidden w-16 h-16 md:w-24 md:h-24 pointer-events-none z-10">
          <div className="bg-cyan-500 text-white text-[6px] md:text-[8px] font-bold uppercase tracking-widest py-1 w-[150%] text-center transform rotate-45 translate-x-[30%] translate-y-[50%] shadow-lg">
            Popular
          </div>
        </div>
      )}
      <CardHeader className="p-3 md:p-6 pb-2">
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600">
              <Zap className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Node Active
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
      <CardContent className="p-3 md:p-6 pt-0 md:pt-0 flex-1">
        <p className="text-[10px] md:text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 leading-relaxed">
          {service.description}
        </p>
      </CardContent>
      <CardFooter className="p-3 md:p-6 pt-3 md:pt-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/10 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[7px] md:text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Entry</span>
          <span className="text-sm md:text-2xl font-bold text-cyan-600">${service.price.toFixed(2)}</span>
        </div>
        <Link to={`/service/${service.id}`}>
          <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full group/btn px-3 md:px-6 h-8 md:h-10 shadow-lg shadow-cyan-500/20 text-[10px] md:text-sm">
            Unlock
            <ArrowRight className="ml-1 h-3 w-3 md:ml-1.5 md:h-4 md:w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}