import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, ShieldCheck } from 'lucide-react';
const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Mobile Lab CEO",
    text: "The API latency is incredible. We've integrated GSM Nexus into our local workflow and cut turnaround times by 60%.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    name: "Chen Wei",
    role: "Service Specialist",
    text: "Finally a reliable gateway for Samsung FRP. Automated processing is a game changer for high-volume shops.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chen"
  },
  {
    name: "Marcus Thorne",
    role: "Enterprise Partner",
    text: "Technical premium support that actually knows GSM protocols. The security checks on IMEI entries are top-tier.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  },
  {
    name: "Elena Petrova",
    role: "Network Engineer",
    text: "Transparent tracking and instant status updates. It's the most professional dashboard I've used in 10 years.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
  }
];
export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, speed: 0.8, stopOnInteraction: false })
  ]);
  return (
    <section className="py-24 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Specialist <span className="text-cyan-500">Feedback</span></h2>
        <p className="text-slate-400 text-sm md:text-base">Trusted by professional repair centers and network specialists globally.</p>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8 px-4">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <div key={idx} className="flex-[0_0_350px] md:flex-[0_0_450px] min-w-0">
              <Card className="glass-premium border-white/5 bg-white/5 p-8 h-full relative group hover:border-cyan-500/30 transition-colors">
                <Quote className="absolute top-6 right-8 w-10 h-10 text-white/5 group-hover:text-cyan-500/10 transition-colors" />
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-cyan-500 text-cyan-500" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 font-medium">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden ring-2 ring-cyan-500/20">
                      <img src={t.avatar} alt={t.name} />
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold">{t.name}</div>
                      <div className="text-slate-500 text-[10px] uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                  <Badge className="bg-cyan-500/10 text-cyan-500 border-none text-[8px] font-bold uppercase tracking-widest px-2 py-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 mr-1" />
                    Verified
                  </Badge>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}