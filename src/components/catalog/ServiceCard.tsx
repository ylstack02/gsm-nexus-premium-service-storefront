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
    <Card className="group border hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 text-[10px] uppercase tracking-wider font-bold">
            {service.deliveryTime}
          </Badge>
          {service.featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-[10px] border-none flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" />
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors line-clamp-1">
          {service.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {service.description}
        </p>
      </CardContent>
      <CardFooter className="pt-4 border-t bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Price</span>
          <span className="text-xl font-bold text-foreground">${service.price.toFixed(2)}</span>
        </div>
        <Link to={`/service/${service.id}`}>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full group/btn px-4">
            View
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}