import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { MOCK_SERVICES } from '@shared/mock-data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
export function ServiceSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, speed: 1 })
  ]);
  return (
    <div className="relative py-12 bg-slate-50/50 dark:bg-slate-900/20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 mb-6 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Zap className="w-3 h-3 text-cyan-500" />
          Live Featured Services
        </h3>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 px-4">
          {[...MOCK_SERVICES, ...MOCK_SERVICES].map((service, idx) => (
            <div key={`${service.id}-${idx}`} className="flex-[0_0_280px] min-w-0">
              <Link to={`/service/${service.id}`}>
                <Card className="glass-premium p-5 hover:border-cyan-500/50 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-cyan-600 border-cyan-600/20">
                      {service.deliveryTime}
                    </Badge>
                    <span className="text-sm font-bold text-foreground">${service.price.toFixed(2)}</span>
                  </div>
                  <h4 className="font-bold text-sm mb-2 group-hover:text-cyan-500 transition-colors line-clamp-1">
                    {service.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}