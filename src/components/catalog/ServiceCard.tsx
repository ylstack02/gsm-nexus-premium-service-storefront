import React from 'react';
import { Link } from 'react-router-dom';
import { Service } from '@shared/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, Zap } from 'lucide-react';
interface ServiceCardProps {
  service: Service;
}
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="group glass-premium border border-slate-200/60 dark:border-white/10 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col h-full rounded-3xl overflow-hidden relative">
      {/* Popular/Featured Indicator */}
      {service.featured && (
        <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none">
          <div className="bg-cyan-500 text-white text-[8px] font-bold uppercase tracking-widest py-1 w-[150%] text-center transform rotate-45 translate-x-[30%] translate-y-[50%] shadow-lg">
            Popular
          </div>
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Instant Check
            </span>
          </div>
          <Badge variant="outline" className="bg-white/50 dark:bg-slate-900/50 text-[9px] font-bold uppercase border-slate-200 dark:border-slate-800">
            {service.deliveryTime}
          </Badge>
        </div>
        <CardTitle className="text-xl font-display font-bold group-hover:text-cyan-600 transition-colors line-clamp-2">
          {service.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {service.description}
        </p>
      </CardContent>
      <CardFooter className="pt-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/10 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Entry Price</span>
          <span className="text-2xl font-bold text-cyan-600">${service.price.toFixed(2)}</span>
        </div>
        <Link to={`/service/${service.id}`}>
          <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full group/btn px-6 h-10 shadow-lg shadow-cyan-500/20">
            Unlock
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}